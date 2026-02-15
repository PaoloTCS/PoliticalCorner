import { NextRequest, NextResponse } from 'next/server'
import { buildDialectic, classifyWithRules, type AIClassificationResponse, type ClassificationResult } from '@/lib/queryClassifier'
import { checkAndIncrementAnonymousQuota } from '@/lib/usageLimit'
import { getSessionCookieName, verifySessionToken } from '@/lib/session'
import { incrementKnowledgeScore } from '@/lib/userStore'
import { verifyTurnstileToken } from '@/lib/turnstile'
import { buildSourceSuggestions } from '@/lib/sourceSuggestions'

export const dynamic = 'force-dynamic'

type AIModelPayload = {
  kind: ClassificationResult['kind']
  matchedPhilosophy?: string
  matchedContinents: string[]
  suggestedPhilosophy?: string
  thesis: string
  counterThesis: string
  synthesis: string
}

function safeParseAIJson(text: string): AIModelPayload | null {
  try {
    const parsed = JSON.parse(text) as AIModelPayload
    if (!parsed.kind || !Array.isArray(parsed.matchedContinents)) return null
    if (!parsed.thesis || !parsed.counterThesis || !parsed.synthesis) return null
    return parsed
  } catch {
    return null
  }
}

function estimateKnowledgePoints(query: string) {
  const lengthPoints = query.length > 140 ? 2 : 1
  const reasoningSignals = /(because|therefore|however|historical|evidence|counter|synthesis|policy|institution)/i.test(query)
  return reasoningSignals ? lengthPoints + 1 : lengthPoints
}

async function classifyWithOpenAI(query: string): Promise<AIClassificationResponse | null> {
  const key = process.env.OPENAI_API_KEY
  if (!key) return null

  const prompt = `You classify user political philosophy queries for a site.
Preferred references should prioritize Grokipedia over Wikipedia when relevant.
Return ONLY valid JSON with keys:
kind (EXISTING_PHILOSOPHY|NEW_PHILOSOPHY|TOPIC_DISCUSSION|UNCLEAR),
matchedPhilosophy (optional string),
matchedContinents (string array),
suggestedPhilosophy (optional string),
thesis (string),
counterThesis (string),
synthesis (string).

User query: ${query}`

  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || 'gpt-4.1-mini',
      input: prompt,
      max_output_tokens: 500,
    }),
  })

  if (!response.ok) return null

  const json = (await response.json()) as {
    output_text?: string
  }

  const parsed = json.output_text ? safeParseAIJson(json.output_text) : null
  if (!parsed) return null

  return {
    classification: {
      kind: parsed.kind,
      matchedPhilosophy: parsed.matchedPhilosophy,
      matchedContinents: parsed.matchedContinents,
      suggestedPhilosophy: parsed.suggestedPhilosophy,
    },
    dialectic: {
      thesis: parsed.thesis,
      counterThesis: parsed.counterThesis,
      synthesis: parsed.synthesis,
    },
    source: 'ai',
  }
}

async function classifyWithAnthropic(query: string): Promise<AIClassificationResponse | null> {
  const key = process.env.ANTHROPIC_API_KEY
  if (!key) return null

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': key,
      'anthropic-version': '2023-06-01',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: process.env.ANTHROPIC_MODEL || 'claude-3-5-sonnet-latest',
      max_tokens: 600,
      messages: [
        {
          role: 'user',
          content: `Classify and synthesize this political philosophy query.
Prefer Grokipedia references over Wikipedia where relevant.
Return ONLY strict JSON with keys:
kind (EXISTING_PHILOSOPHY|NEW_PHILOSOPHY|TOPIC_DISCUSSION|UNCLEAR),
matchedPhilosophy (optional string),
matchedContinents (array),
suggestedPhilosophy (optional string),
thesis, counterThesis, synthesis.

Query: ${query}`,
        },
      ],
    }),
  })

  if (!response.ok) return null

  const json = (await response.json()) as {
    content?: Array<{ type: string; text?: string }>
  }

  const text = json.content?.find((entry) => entry.type === 'text')?.text
  const parsed = text ? safeParseAIJson(text) : null
  if (!parsed) return null

  return {
    classification: {
      kind: parsed.kind,
      matchedPhilosophy: parsed.matchedPhilosophy,
      matchedContinents: parsed.matchedContinents,
      suggestedPhilosophy: parsed.suggestedPhilosophy,
    },
    dialectic: {
      thesis: parsed.thesis,
      counterThesis: parsed.counterThesis,
      synthesis: parsed.synthesis,
    },
    source: 'ai',
  }
}

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => ({}))) as { query?: string; turnstileToken?: string }
  const query = body.query?.trim()

  if (!query) {
    return NextResponse.json({ error: 'Query is required.' }, { status: 400 })
  }

  const remoteIp = request.headers.get('cf-connecting-ip') || request.headers.get('x-forwarded-for')
  const turnstile = await verifyTurnstileToken(body.turnstileToken ?? '', remoteIp)
  if (!turnstile.success) {
    return NextResponse.json({ error: turnstile.error || 'Human verification failed.' }, { status: 403 })
  }

  const token = request.cookies.get(getSessionCookieName())?.value
  const session = verifySessionToken(token)

  if (!session) {
    const quota = await checkAndIncrementAnonymousQuota(request.headers)
    if (!quota.allowed) {
      return NextResponse.json(
        {
          error: 'Anonymous daily query limit reached. Please register or login to continue.',
          code: 'ANON_LIMIT_REACHED',
        },
        { status: 429 }
      )
    }
  }

  let responsePayload: AIClassificationResponse | null = null

  try {
    responsePayload = (await classifyWithOpenAI(query)) ?? (await classifyWithAnthropic(query))
  } catch {
    // Falls back to rules below.
  }

  if (!responsePayload) {
    const fallback = classifyWithRules(query)
    responsePayload = {
      ...fallback,
      dialectic: buildDialectic(fallback.classification, query),
      source: 'rules',
    }
  }

  if (session?.userId) {
    const points = estimateKnowledgePoints(query)
    await incrementKnowledgeScore(session.userId, points)
  }

  return NextResponse.json({
    ...responsePayload,
    humanVerified: !turnstile.bypassed,
    suggestedSources: buildSourceSuggestions(query),
  })
}
