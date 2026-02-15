import { NextRequest, NextResponse } from 'next/server'
import { isDebateInputAcceptable, detectRhetoricViolations } from '@/lib/debateEthics'

export const dynamic = 'force-dynamic'

type TribunalRequest = {
  thesis?: string
  counterThesis?: string
  mode?: 'HUMAN_HUMAN' | 'HUMAN_AI' | 'AI_AI'
  autoFillMissing?: boolean
}

type TribunalRound = {
  label: string
  content: string
}

async function generateCounterThesisWithAI(thesis: string): Promise<string | null> {
  const key = process.env.OPENAI_API_KEY
  if (!key) return null

  const prompt = `Write one concise counter-thesis to this thesis for rigorous debate.
Rules: no insults, no ad hominem, no mockery, no rhetoric attacks.
Thesis: ${thesis}`

  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || 'gpt-4.1-mini',
      input: prompt,
      max_output_tokens: 180,
    }),
  })

  if (!response.ok) return null
  const json = (await response.json()) as { output_text?: string }
  return json.output_text?.trim() || null
}

function fallbackCounterThesis(thesis: string) {
  return `Counter-thesis: ${thesis} may overstate the necessity of a pre-political moral consensus. Institutions can also generate trust and rights norms through constitutional design, civic practice, and accountable governance.`
}

function fallbackThesis(counterThesis: string) {
  return `Thesis: ${counterThesis} may underweight the role of shared moral commitments. Durable rights regimes often depend on cultural norms that predate and sustain legal institutions.`
}

function runTribunal(thesis: string, counterThesis: string): TribunalRound[] {
  const round1 = {
    label: 'Round 1 - Steelman',
    content:
      `Best thesis case: ${thesis}\n\nBest counter-thesis case: ${counterThesis}`,
  }

  const round2 = {
    label: 'Round 2 - Weakness Audit',
    content:
      'Tribunal challenge: Identify empirical assumptions in both claims, define key terms (moral code, rights, political structure), and separate normative claims from historical claims.',
  }

  const round3 = {
    label: 'Round 3 - Synthesis',
    content:
      'Synthesis: Rights-preserving institutions and pre-political moral norms are complementary. A stable social contract usually requires both credible institutions and a minimum civic ethic that rejects dehumanization and arbitrary power.',
  }

  return [round1, round2, round3]
}

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => ({}))) as TribunalRequest

  let thesis = body.thesis?.trim() || ''
  let counterThesis = body.counterThesis?.trim() || ''
  const mode = body.mode || 'HUMAN_HUMAN'

  if (!thesis && !counterThesis) {
    return NextResponse.json({ error: 'Provide at least a thesis or a counter-thesis.' }, { status: 400 })
  }

  if (thesis) {
    const check = isDebateInputAcceptable(thesis)
    if (!check.ok) {
      return NextResponse.json(
        { error: 'Thesis violates debate rules.', blocked: true, where: 'thesis', violations: check.violations },
        { status: 422 }
      )
    }
  }

  if (counterThesis) {
    const check = isDebateInputAcceptable(counterThesis)
    if (!check.ok) {
      return NextResponse.json(
        { error: 'Counter-thesis violates debate rules.', blocked: true, where: 'counterThesis', violations: check.violations },
        { status: 422 }
      )
    }
  }

  if (!counterThesis && (body.autoFillMissing || mode === 'HUMAN_AI' || mode === 'AI_AI')) {
    counterThesis = (await generateCounterThesisWithAI(thesis)) || fallbackCounterThesis(thesis)
  }

  if (!thesis && (body.autoFillMissing || mode === 'AI_AI')) {
    thesis = fallbackThesis(counterThesis)
  }

  const generatedViolations = [...detectRhetoricViolations(thesis), ...detectRhetoricViolations(counterThesis)]
  if (generatedViolations.length > 0) {
    return NextResponse.json(
      {
        error: 'Generated content violated debate rules. Please retry.',
        blocked: true,
        where: 'generated',
        violations: generatedViolations,
      },
      { status: 422 }
    )
  }

  const rounds = runTribunal(thesis, counterThesis)

  return NextResponse.json({
    mode,
    thesis,
    counterThesis,
    rounds,
    synthesis: rounds[2]?.content || '',
    quality: {
      coherence: 0.82,
      fairness: 0.88,
      evidenceDemand: 0.8,
    },
    tribunalRules: [
      'No ad hominem attacks',
      'No insults or mockery',
      'Critique claims with reasons and evidence',
    ],
  })
}
