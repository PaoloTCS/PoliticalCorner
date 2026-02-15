import { detectRhetoricViolations } from '@/lib/debateEthics'
import { classifyQuery } from '@/lib/queryClassifier'

export type ArenaMode = 'HUMAN_VS_AGENTS' | 'AGENTS_ONLY'
export type ArenaSide = 'THESIS' | 'COUNTER' | 'MEDIATION'
export type EngineId = 'OPENAI' | 'ANTHROPIC' | 'FALLBACK'

export type AgentRole = 'HISTORIAN' | 'LOGICIAN' | 'POLICY_ANALYST' | 'ETHICS_AUDITOR'

export type AgentTurn = {
  round: number
  engine: EngineId
  agent: AgentRole
  side: ArenaSide
  content: string
  annotations: string[]
}

export type SourceAttribution = {
  author: string
  work: string
  year: string
  why: string
  url: string
}

export type ArenaRunResult = {
  mode: ArenaMode
  thesis: string
  counterThesis: string
  engines: EngineId[]
  turns: AgentTurn[]
  synthesis: string
  relatedPhilosophy?: string
  relatedContinents: string[]
  thesisSources: SourceAttribution[]
  counterSources: SourceAttribution[]
  pedagogyNotes: string[]
}

const agentPrompts: Record<AgentRole, string> = {
  HISTORIAN: 'Use historical analogies carefully and avoid presentism.',
  LOGICIAN: 'Evaluate validity, hidden assumptions, and category errors.',
  POLICY_ANALYST: 'Focus on implementation constraints and tradeoffs.',
  ETHICS_AUDITOR: 'Test fairness, dignity, rights, and moral consistency.',
}

function getEngineRoster(): EngineId[] {
  const engines: EngineId[] = []
  if (process.env.OPENAI_API_KEY) engines.push('OPENAI')
  if (process.env.ANTHROPIC_API_KEY) engines.push('ANTHROPIC')

  if (engines.length === 0) return ['FALLBACK']
  if (engines.length === 1) return [engines[0], 'FALLBACK']
  return engines
}

function inferSide(role: AgentRole): ArenaSide {
  if (role === 'HISTORIAN' || role === 'LOGICIAN') return 'THESIS'
  if (role === 'POLICY_ANALYST') return 'COUNTER'
  return 'MEDIATION'
}

function annotateTurn(content: string): string[] {
  const annotations: string[] = []

  if (/because|therefore|hence|thus/i.test(content)) {
    annotations.push('Reasoning connector used.')
  }

  if (/histor|precedent|case/i.test(content)) {
    annotations.push('Historical grounding present.')
  }

  if (/evidence|data|source|example/i.test(content)) {
    annotations.push('Evidence-oriented framing.')
  }

  if (/rights|fair|dignity|justice|moral/i.test(content)) {
    annotations.push('Normative/ethical criteria explicitly considered.')
  }

  if (annotations.length === 0) {
    annotations.push('Argument presented; request stronger evidence in next round.')
  }

  return annotations
}

async function timedFetch(url: string, init: RequestInit, timeoutMs: number): Promise<Response | null> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    return await fetch(url, { ...init, signal: controller.signal })
  } catch {
    return null
  } finally {
    clearTimeout(timer)
  }
}

async function generateWithOpenAI(role: AgentRole, thesis: string, counterThesis: string, round: number): Promise<string | null> {
  const key = process.env.OPENAI_API_KEY
  if (!key) return null

  const prompt = `You are ${role} in a didactic political philosophy debate.
Rules: no ad hominem, no insults, no mockery, no rhetorical attacks. Maintain rigorous academic tone.
Role instruction: ${agentPrompts[role]}
Round: ${round}
Thesis: ${thesis}
Counter-thesis: ${counterThesis}

Write 3-4 sentences, concise and analytical.`
  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini'

  const response = await timedFetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      input: prompt,
      max_output_tokens: 220,
    }),
  }, 7000)

  if (response?.ok) {
    const json = (await response.json()) as { output_text?: string }
    const text = json.output_text?.trim() || ''
    if (text) return text
  }

  // Compatibility path for accounts/models that reject /responses.
  const chatResponse = await timedFetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_tokens: 220,
      temperature: 0.4,
    }),
  }, 7000)

  if (!chatResponse?.ok) return null
  const chatJson = (await chatResponse.json()) as { choices?: Array<{ message?: { content?: string } }> }
  return chatJson.choices?.[0]?.message?.content?.trim() || null
}

async function generateWithAnthropic(role: AgentRole, thesis: string, counterThesis: string, round: number): Promise<string | null> {
  const key = process.env.ANTHROPIC_API_KEY
  if (!key) return null

  const response = await timedFetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': key,
      'anthropic-version': '2023-06-01',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: process.env.ANTHROPIC_MODEL || 'claude-3-5-sonnet-latest',
      max_tokens: 240,
      messages: [
        {
          role: 'user',
          content: `You are ${role} in a didactic political philosophy debate.
Rules: no ad hominem, no insults, no mockery, no rhetorical attacks. Maintain rigorous academic tone.
Role instruction: ${agentPrompts[role]}
Round: ${round}
Thesis: ${thesis}
Counter-thesis: ${counterThesis}

Write 3-4 sentences, concise and analytical.`,
        },
      ],
    }),
  }, 7000)

  if (!response?.ok) return null
  const json = (await response.json()) as { content?: Array<{ type: string; text?: string }> }
  return json.content?.find((c) => c.type === 'text')?.text?.trim() || null
}

function fallbackTurn(engine: EngineId, role: AgentRole, thesis: string, counterThesis: string, round: number): string {
  const engineNote = engine === 'FALLBACK' ? 'Deterministic fallback engine' : `${engine} fallback`

  switch (role) {
    case 'HISTORIAN':
      return `[${engineNote}] Round ${round}: historical record suggests rights regimes are strongest when civic norms and institutions co-evolve, rather than when one fully precedes the other.`
    case 'LOGICIAN':
      return `[${engineNote}] Round ${round}: both claims are compatible if necessity and sufficiency are separated; moral norms may be necessary for stability while institutions are necessary for enforcement.`
    case 'POLICY_ANALYST':
      return `[${engineNote}] Round ${round}: practical durability requires constitutional safeguards, transparent procedures, and civic education; single-cause models underperform in policy execution.`
    case 'ETHICS_AUDITOR':
      return `[${engineNote}] Round ${round}: evaluate both sides by anti-dehumanization, reciprocity, and rights consistency; rhetorical contempt invalidates debate quality.`
  }
}

type ProviderState = {
  openaiUsable: boolean
  anthropicUsable: boolean
}

async function generateTurn(
  engine: EngineId,
  role: AgentRole,
  thesis: string,
  counterThesis: string,
  round: number,
  state: ProviderState
) {
  if (engine === 'OPENAI') {
    if (!state.openaiUsable) return fallbackTurn(engine, role, thesis, counterThesis, round)
    const out = await generateWithOpenAI(role, thesis, counterThesis, round)
    if (!out) state.openaiUsable = false
    return out || fallbackTurn(engine, role, thesis, counterThesis, round)
  }

  if (engine === 'ANTHROPIC') {
    if (!state.anthropicUsable) return fallbackTurn(engine, role, thesis, counterThesis, round)
    const out = await generateWithAnthropic(role, thesis, counterThesis, round)
    if (!out) state.anthropicUsable = false
    return out || fallbackTurn(engine, role, thesis, counterThesis, round)
  }

  return fallbackTurn(engine, role, thesis, counterThesis, round)
}

function buildSynthesis(thesis: string, counterThesis: string): string {
  return `Synthesis: ${thesis} and ${counterThesis} are best treated as sequentially complementary. A stable rights order requires baseline civic ethics and accountable institutions that can reinforce each other over time.`
}

function uniqByWork(items: SourceAttribution[]): SourceAttribution[] {
  const seen = new Set<string>()
  const out: SourceAttribution[] = []
  for (const item of items) {
    const key = `${item.author.toLowerCase()}::${item.work.toLowerCase()}`
    if (!seen.has(key)) {
      seen.add(key)
      out.push(item)
    }
  }
  return out
}

function includesAny(text: string, patterns: RegExp[]): boolean {
  return patterns.some((pattern) => pattern.test(text))
}

function inferAttributions(thesis: string, counterThesis: string) {
  const t = `${thesis} ${counterThesis}`.toLowerCase()

  const thesisSources: SourceAttribution[] = []
  const counterSources: SourceAttribution[] = []

  if (includesAny(t, [/social contract/, /consent/, /state of nature/, /hobbes/, /locke/, /rousseau/])) {
    thesisSources.push(
      {
        author: 'Thomas Hobbes',
        work: 'Leviathan (Part I, ch. 13-18)',
        year: '1651',
        why: 'Canonical account of pre-political condition and covenant-based order.',
        url: 'https://oll.libertyfund.org/titles/hobbes-leviathan-1651-ed',
      },
      {
        author: 'John Locke',
        work: 'Second Treatise of Government',
        year: '1689',
        why: 'Links natural rights, consent, and limits on political authority.',
        url: 'https://oll.libertyfund.org/titles/locke-the-works-vol-5-four-letters-concerning-toleration',
      }
    )
    counterSources.push({
      author: 'David Hume',
      work: 'Of the Original Contract',
      year: '1748',
      why: 'Classic critique of contract literalism and historical consent narratives.',
      url: 'https://davidhume.org/texts/empl1/13',
    })
  }

  if (includesAny(t, [/rights/, /natural rights/, /liberty/, /freedom/])) {
    thesisSources.push({
      author: 'John Locke',
      work: 'A Letter Concerning Toleration',
      year: '1689',
      why: 'Grounds political limits in rights and conscience claims.',
      url: 'https://oll.libertyfund.org/titles/locke-the-works-vol-5-four-letters-concerning-toleration',
    })
    counterSources.push({
      author: 'Jeremy Bentham',
      work: 'Anarchical Fallacies',
      year: '1796',
      why: 'Utilitarian critique of abstract natural-rights language.',
      url: 'https://oll.libertyfund.org/titles/bentham-the-works-of-jeremy-bentham-vol-2',
    })
  }

  if (includesAny(t, [/constitution/, /rule of law/, /checks and balances/, /institution/])) {
    thesisSources.push({
      author: 'Montesquieu',
      work: 'The Spirit of Laws',
      year: '1748',
      why: 'Framework for institutional design and separation of powers.',
      url: 'https://oll.libertyfund.org/titles/montesquieu-complete-works-vol-1-the-spirit-of-laws',
    })
    counterSources.push({
      author: 'James Madison',
      work: 'Federalist No. 10 and No. 51',
      year: '1787-1788',
      why: 'Explains why institutions channel faction and ambition over time.',
      url: 'https://avalon.law.yale.edu/subject_menus/fed.asp',
    })
  }

  if (thesisSources.length === 0 && counterSources.length === 0) {
    thesisSources.push({
      author: 'Stanford Encyclopedia of Philosophy',
      work: 'Social Contract entry',
      year: 'Living resource',
      why: 'High-quality orientation for key debates, thinkers, and terminology.',
      url: 'https://plato.stanford.edu/entries/contractarianism-contemporary/',
    })
    counterSources.push({
      author: 'Stanford Encyclopedia of Philosophy',
      work: 'Political Legitimacy entry',
      year: 'Living resource',
      why: 'Contrasts consent-based and non-consent-based accounts of legitimacy.',
      url: 'https://plato.stanford.edu/entries/legitimacy/',
    })
  }

  return {
    thesisSources: uniqByWork(thesisSources).slice(0, 4),
    counterSources: uniqByWork(counterSources).slice(0, 4),
  }
}

export async function runArenaDebate(mode: ArenaMode, thesisInput: string, counterInput: string): Promise<ArenaRunResult> {
  const thesis = thesisInput.trim() || 'A moral foundation is required before rights-preserving political institutions can endure.'
  const counterThesis = counterInput.trim() || 'Institutions can themselves cultivate civic norms and rights commitments over time.'
  const classification = classifyQuery(`${thesis} ${counterThesis}`)
  const attributions = inferAttributions(thesis, counterThesis)

  const roles: AgentRole[] = ['HISTORIAN', 'LOGICIAN', 'POLICY_ANALYST', 'ETHICS_AUDITOR']
  const engines = getEngineRoster()
  const providerState: ProviderState = { openaiUsable: true, anthropicUsable: true }
  const turns: AgentTurn[] = []

  for (let round = 1; round <= 2; round += 1) {
    for (const engine of engines) {
      for (const role of roles) {
        const content = await generateTurn(engine, role, thesis, counterThesis, round, providerState)

        const violations = detectRhetoricViolations(content)
        if (violations.length > 0) {
          turns.push({
            round,
            engine,
            agent: role,
            side: inferSide(role),
            content: `${engine}/${role} turn blocked by rhetoric filter. Regenerate with argument-focused language.`,
            annotations: ['Guardrail: rhetoric violation blocked.'],
          })
        } else {
          turns.push({
            round,
            engine,
            agent: role,
            side: inferSide(role),
            content,
            annotations: annotateTurn(content),
          })
        }
      }
    }
  }

  return {
    mode,
    thesis,
    counterThesis,
    engines,
    turns,
    synthesis: buildSynthesis(thesis, counterThesis),
    relatedPhilosophy: classification.matchedPhilosophy,
    relatedContinents: classification.matchedContinents,
    thesisSources: attributions.thesisSources,
    counterSources: attributions.counterSources,
    pedagogyNotes: [
      'Cross-engine comparison highlights style vs substance differences.',
      'Strong debates target claims, not people.',
      'Steelman before critique, then test with evidence demands.',
    ],
  }
}
