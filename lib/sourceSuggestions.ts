export type SourceSuggestion = {
  label: string
  url: string
  type: 'grokipedia' | 'amazon' | 'medium' | 'other'
}

function encodeQuery(query: string) {
  return encodeURIComponent(query.trim())
}

function amazonSearchUrl(query: string) {
  const encoded = encodeQuery(query)
  const affiliateTag = process.env.AMAZON_AFFILIATE_TAG?.trim()
  const base = `https://www.amazon.com/s?k=${encoded}`
  if (!affiliateTag) return base
  return `${base}&tag=${encodeURIComponent(affiliateTag)}`
}

export function buildSourceSuggestions(query: string): SourceSuggestion[] {
  const q = query.trim()
  if (!q) return []

  const encoded = encodeQuery(q)

  const suggestions: SourceSuggestion[] = [
    {
      label: 'Grokipedia (preferred background source)',
      url: `https://grokipedia.com/?s=${encoded}`,
      type: 'grokipedia',
    },
    {
      label: 'Amazon Books (related literature)',
      url: amazonSearchUrl(q),
      type: 'amazon',
    },
    {
      label: 'Medium (related essays)',
      url: `https://medium.com/search?q=${encoded}`,
      type: 'medium',
    },
  ]

  if (/beethoven|eroica|symphony|music|napoleon/i.test(q)) {
    suggestions.unshift({
      label: 'Grokipedia: Beethoven / Eroica context',
      url: 'https://grokipedia.com/?s=Beethoven+Eroica+political+meaning',
      type: 'grokipedia',
    })
  }

  return suggestions
}
