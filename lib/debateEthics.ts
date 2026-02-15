export type RhetoricViolationType =
  | 'AD_HOMINEM'
  | 'INSULT'
  | 'MOCKERY'
  | 'POISONING_THE_WELL'
  | 'GUILT_BY_ASSOCIATION'

export type RhetoricViolation = {
  type: RhetoricViolationType
  phrase: string
  message: string
}

const ruleSet: Array<{ type: RhetoricViolationType; pattern: RegExp; message: string }> = [
  {
    type: 'AD_HOMINEM',
    pattern: /\b(you\s+are|he\s+is|she\s+is|they\s+are)\s+(an\s+)?(idiot|moron|stupid|ignorant|evil|trash|garbage)\b/i,
    message: 'Ad hominem attack detected. Critique arguments, not people.',
  },
  {
    type: 'INSULT',
    pattern: /\b(idiot|moron|dumb|stupid|lunatic|retard|clown|buffoon)\b/i,
    message: 'Insulting language is not allowed in intellectual debate.',
  },
  {
    type: 'MOCKERY',
    pattern: /\b(lol|lmao|what a joke|pathetic|ridiculous fool)\b/i,
    message: 'Mockery detected. Keep tone analytical and respectful.',
  },
  {
    type: 'POISONING_THE_WELL',
    pattern: /\b(anyone who believes this is|only a fool would|before you listen to them)\b/i,
    message: 'Poisoning the well detected. Engage arguments directly.',
  },
  {
    type: 'GUILT_BY_ASSOCIATION',
    pattern: /\b(because they support .* they are .*|associated with .* therefore .* is false)\b/i,
    message: 'Guilt-by-association pattern detected. Provide direct reasoning.',
  },
]

export function detectRhetoricViolations(text: string): RhetoricViolation[] {
  const trimmed = text.trim()
  if (!trimmed) return []

  const violations: RhetoricViolation[] = []

  for (const rule of ruleSet) {
    const match = trimmed.match(rule.pattern)
    if (match?.[0]) {
      violations.push({
        type: rule.type,
        phrase: match[0],
        message: rule.message,
      })
    }
  }

  return violations
}

export function isDebateInputAcceptable(text: string) {
  const violations = detectRhetoricViolations(text)
  return {
    ok: violations.length === 0,
    violations,
  }
}
