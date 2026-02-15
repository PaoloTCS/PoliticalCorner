export type QueryKind = 'EXISTING_PHILOSOPHY' | 'NEW_PHILOSOPHY' | 'TOPIC_DISCUSSION' | 'UNCLEAR'

export type ClassificationResult = {
  kind: QueryKind
  matchedPhilosophy?: string
  matchedContinents: string[]
  suggestedPhilosophy?: string
}

export type DialecticResult = {
  thesis: string
  counterThesis: string
  synthesis: string
}

export type AIClassificationResponse = {
  classification: ClassificationResult
  dialectic: DialecticResult
  source: 'ai' | 'rules'
}

type PhilosophyEntry = {
  name: string
  keywords: string[]
  continents: string[]
}

const philosophyIndex: PhilosophyEntry[] = [
  {
    name: 'Natural Rights',
    keywords: ['natural rights', 'rights', 'individual rights', 'liberty'],
    continents: ['Asia', 'Americas', 'Europe', 'Africa'],
  },
  {
    name: 'Classical Republicanism',
    keywords: ['classical republicanism', 'republicanism', 'civic virtue', 'participation'],
    continents: ['Asia', 'Americas', 'Europe', 'Africa'],
  },
  {
    name: 'Constitutionalism',
    keywords: ['constitutionalism', 'constitution', 'rule of law', 'checks and balances'],
    continents: ['Asia', 'Americas', 'Europe', 'Africa'],
  },
  {
    name: 'Social Contract',
    keywords: ['social contract', 'consent of the governed', 'collective agreement'],
    continents: ['Asia', 'Americas', 'Europe', 'Africa'],
  },
]

const continentHints: Record<string, string[]> = {
  Asia: ['asia', 'asian', 'india', 'china', 'japan', 'korea', 'asean'],
  Americas: ['america', 'americas', 'usa', 'united states', 'canada', 'latin'],
  Europe: ['europe', 'european', 'eu', 'uk', 'france', 'germany', 'italy'],
  Africa: ['africa', 'african', 'pan-african', 'nigeria', 'kenya', 'south africa'],
}

function normalize(value: string) {
  return value.toLowerCase().replace(/\s+/g, ' ').trim()
}

function inferContinents(query: string): string[] {
  const lowered = normalize(query)
  const matches = Object.entries(continentHints)
    .filter(([, hints]) => hints.some((hint) => lowered.includes(hint)))
    .map(([continent]) => continent)
  return matches.length > 0 ? matches : ['Global / Cross-continental']
}

function extractProposedPhilosophy(query: string): string | undefined {
  const quoted = query.match(/["']([^"']+)["']/)
  if (quoted?.[1]) return quoted[1].trim()

  const afterAdd = query.match(/(?:add|include|introduce)\s+([a-zA-Z\s-]{4,60})/i)
  if (afterAdd?.[1]) return afterAdd[1].trim()

  return undefined
}

export function classifyQuery(rawQuery: string): ClassificationResult {
  const query = normalize(rawQuery)
  if (!query) {
    return { kind: 'UNCLEAR', matchedContinents: [] }
  }

  const existing = philosophyIndex.find((entry) =>
    entry.keywords.some((kw) => query.includes(kw.toLowerCase()))
  )

  if (existing) {
    return {
      kind: 'EXISTING_PHILOSOPHY',
      matchedPhilosophy: existing.name,
      matchedContinents: inferContinents(rawQuery),
    }
  }

  const requestsNew = /(new philosophy|add|include|introduce|should we add|create a new)/i.test(rawQuery)
  if (requestsNew) {
    return {
      kind: 'NEW_PHILOSOPHY',
      matchedContinents: inferContinents(rawQuery),
      suggestedPhilosophy: extractProposedPhilosophy(rawQuery),
    }
  }

  const hasDebateIntent = /(should|why|how|debate|thesis|counter|synthesis|question)/i.test(rawQuery)
  if (hasDebateIntent) {
    return {
      kind: 'TOPIC_DISCUSSION',
      matchedContinents: inferContinents(rawQuery),
    }
  }

  return {
    kind: 'UNCLEAR',
    matchedContinents: inferContinents(rawQuery),
  }
}

export function buildDialectic(result: ClassificationResult, query: string): DialecticResult {
  if (result.kind === 'EXISTING_PHILOSOPHY') {
    return {
      thesis: `${result.matchedPhilosophy} offers a coherent framework to interpret this query through rights, legitimacy, and institutional design.`,
      counterThesis:
        `A strict ${result.matchedPhilosophy} reading may ignore local historical context and alternative traditions.`,
      synthesis:
        `Use ${result.matchedPhilosophy} as the baseline lens, then compare continental adaptations to build a more context-aware conclusion.`,
    }
  }

  if (result.kind === 'NEW_PHILOSOPHY') {
    const name = result.suggestedPhilosophy ?? 'New Proposed Philosophy'
    return {
      thesis: `${name} appears to introduce a valuable new framing for your matrix and can expand current continental comparisons.`,
      counterThesis:
        `Adding ${name} without criteria may fragment the taxonomy and create overlaps with existing philosophies.`,
      synthesis:
        `Pilot ${name} as a candidate entry with definition, key principles, and one mapped discussion per continent before formal adoption.`,
    }
  }

  if (result.kind === 'TOPIC_DISCUSSION') {
    return {
      thesis: `Primary claim extracted from your query: "${query}".`,
      counterThesis:
        'A strong opposing argument should challenge assumptions, evidence quality, and historical transferability.',
      synthesis:
        'A balanced synthesis should preserve the best normative principle while adapting implementation to each region.',
    }
  }

  return {
    thesis: 'Please enter a clearer political-philosophy query.',
    counterThesis: 'If your intent is classification, include a philosophy name or ask to add a new one.',
    synthesis: 'Once clarified, the system can route your query to an existing philosophy or propose a new entry.',
  }
}

export function classifyWithRules(query: string): AIClassificationResponse {
  const classification = classifyQuery(query)
  return {
    classification,
    dialectic: buildDialectic(classification, query),
    source: 'rules',
  }
}
