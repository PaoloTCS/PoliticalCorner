'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import Script from 'next/script'
import { buildDialectic, classifyWithRules, type AIClassificationResponse } from '@/lib/queryClassifier'
import type { SourceSuggestion } from '@/lib/sourceSuggestions'

type AuthUser = {
  email: string
  role: 'user' | 'admin'
  knowledgeScore: number
}

type ApiError = {
  error?: string
  code?: string
}

type ClassifyPayload = AIClassificationResponse & {
  suggestedSources?: SourceSuggestion[]
  humanVerified?: boolean
}

const THREAD_THRESHOLD = 20
const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''

export default function AIQueryPanel() {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState<AIClassificationResponse>(classifyWithRules(''))
  const [suggestedSources, setSuggestedSources] = useState<SourceSuggestion[]>([])
  const [status, setStatus] = useState('')
  const [adding, setAdding] = useState(false)

  const [authUser, setAuthUser] = useState<AuthUser | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [turnstileToken, setTurnstileToken] = useState('')
  const [turnstileRendered, setTurnstileRendered] = useState(false)

  useEffect(() => {
    void refreshMe()
  }, [])

  useEffect(() => {
    if (!turnstileSiteKey) return
    if (turnstileRendered) return

    const maybeRender = () => {
      const widgetTarget = document.getElementById('turnstile-widget')
      const turnstile = (window as any).turnstile
      if (!widgetTarget || !turnstile) return

      turnstile.render('#turnstile-widget', {
        sitekey: turnstileSiteKey,
        callback: (token: string) => {
          setTurnstileToken(token)
        },
        'expired-callback': () => setTurnstileToken(''),
      })

      setTurnstileRendered(true)
    }

    const id = window.setTimeout(maybeRender, 50)
    return () => window.clearTimeout(id)
  }, [turnstileRendered])

  async function refreshMe() {
    const response = await fetch('/api/auth/me', { cache: 'no-store' })
    if (!response.ok) return

    const payload = (await response.json()) as { authenticated?: boolean; user?: AuthUser }
    if (payload.authenticated && payload.user) {
      setAuthUser(payload.user)
      return
    }

    setAuthUser(null)
  }

  async function handleRegister() {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    const payload = (await response.json()) as ApiError
    if (!response.ok) {
      setStatus(payload.error ?? 'Registration failed.')
      return
    }

    setStatus('Registration complete. You are logged in.')
    await refreshMe()
  }

  async function handleLogin() {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    const payload = (await response.json()) as ApiError
    if (!response.ok) {
      setStatus(payload.error ?? 'Login failed.')
      return
    }

    setStatus('Logged in.')
    await refreshMe()
  }

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    setStatus('Logged out.')
    setAuthUser(null)
  }

  async function analyzeQuery() {
    const trimmed = query.trim()
    if (!trimmed) {
      setResult(classifyWithRules(''))
      setSuggestedSources([])
      setStatus('Enter a query to classify.')
      return
    }

    if (turnstileSiteKey && !turnstileToken) {
      setStatus('Please complete human verification before submitting your query.')
      return
    }

    setStatus('Analyzing...')

    try {
      const response = await fetch('/api/ai/classify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: trimmed, turnstileToken }),
      })

      const payload = (await response.json()) as ClassifyPayload & ApiError

      if (!response.ok) {
        if (payload.code === 'ANON_LIMIT_REACHED') {
          setStatus('Anonymous limit reached. Please register or login to continue asking questions.')
          return
        }
        setStatus(payload.error ?? 'Classification failed.')
        return
      }

      setResult(payload)
      setSuggestedSources(payload.suggestedSources ?? [])
      setStatus(payload.source === 'ai' ? 'AI classification complete.' : 'Rule-based classification complete (AI key not configured).')
      await refreshMe()
    } catch {
      const fallback = classifyWithRules(trimmed)
      setResult({ ...fallback, dialectic: buildDialectic(fallback.classification, trimmed) })
      setSuggestedSources([])
      setStatus('API unavailable, used local fallback classification.')
    }
  }

  async function addPhilosophyToMatrix() {
    const name = result.classification.suggestedPhilosophy?.trim()
    if (!name) {
      setStatus('No proposed philosophy found to add.')
      return
    }

    setAdding(true)
    setStatus('Saving new philosophy...')

    try {
      const response = await fetch('/api/philosophies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          continents: result.classification.matchedContinents,
        }),
      })

      const payload = (await response.json()) as ApiError
      if (!response.ok) {
        setStatus(payload.error ?? 'Unable to add philosophy.')
        return
      }

      setStatus(`Added "${name}" to the matrix. Reloading page...`)
      window.location.reload()
    } catch {
      setStatus('Save failed. Try again.')
    } finally {
      setAdding(false)
    }
  }

  async function createPermanentThread() {
    setAdding(true)
    setStatus('Creating permanent thread...')

    try {
      const response = await fetch('/api/threads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: query.trim(),
          classification: result.classification.kind,
          thesis: result.dialectic.thesis,
          counterThesis: result.dialectic.counterThesis,
          synthesis: result.dialectic.synthesis,
          sources: suggestedSources,
        }),
      })

      const payload = (await response.json()) as ApiError
      if (!response.ok) {
        setStatus(payload.error ?? 'Unable to create permanent thread.')
        return
      }

      setStatus('Permanent thread created. Visit the Threads page.')
      await refreshMe()
    } catch {
      setStatus('Could not create thread.')
    } finally {
      setAdding(false)
    }
  }

  const canCreateThread = useMemo(() => {
    return Boolean(authUser && (authUser.role === 'admin' || authUser.knowledgeScore >= THREAD_THRESHOLD))
  }, [authUser])

  return (
    <section className="py-16 bg-secondary-50">
      {turnstileSiteKey && (
        <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" />
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card">
          <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
            <h2 className="text-3xl font-bold text-secondary-900">AI Query Classifier</h2>
            <Link href="/threads" className="btn-secondary">View Permanent Threads</Link>
          </div>

          <p className="text-secondary-600 mb-6">
            Public users can ask limited questions daily. Register to continue. Permanent threads unlock after knowledge score reaches {THREAD_THRESHOLD}.
          </p>

          {!authUser ? (
            <div className="card mb-6">
              <h3 className="text-lg font-semibold text-secondary-900 mb-3">Register or Login</h3>
              <div className="grid md:grid-cols-3 gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="rounded-lg border border-secondary-300 p-2"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password (min 8 chars)"
                  className="rounded-lg border border-secondary-300 p-2"
                />
                <div className="flex gap-2">
                  <button type="button" onClick={handleRegister} className="btn-primary">Register</button>
                  <button type="button" onClick={handleLogin} className="btn-secondary">Login</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="card mb-6 flex items-center justify-between gap-3 flex-wrap">
              <div>
                <p className="text-secondary-800 text-sm">Logged in as <strong>{authUser.email}</strong></p>
                <p className="text-secondary-600 text-sm">Knowledge score: {authUser.knowledgeScore} / {THREAD_THRESHOLD} (thread unlock)</p>
              </div>
              <button type="button" onClick={handleLogout} className="btn-secondary">Logout</button>
            </div>
          )}

          {turnstileSiteKey ? (
            <div className="mb-4">
              <p className="text-sm text-secondary-600 mb-2">Human verification</p>
              <div id="turnstile-widget" />
            </div>
          ) : (
            <p className="text-sm text-amber-700 mb-4">
              Turnstile is not configured. Set `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY` in production.
            </p>
          )}

          <label htmlFor="ai-query" className="block text-sm font-medium text-secondary-800 mb-2">Your query</label>
          <textarea
            id="ai-query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            rows={4}
            className="w-full rounded-lg border border-secondary-300 p-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Example: Beethoven's Eroica and political heroism in the US today"
          />

          <div className="mt-4 flex flex-wrap gap-3">
            <button type="button" onClick={analyzeQuery} className="btn-primary">Analyze Query</button>
            {result.classification.kind === 'NEW_PHILOSOPHY' && result.classification.suggestedPhilosophy && (
              <button type="button" onClick={addPhilosophyToMatrix} className="btn-secondary" disabled={adding}>
                {adding ? 'Adding...' : 'Add To Matrix'}
              </button>
            )}
            <button type="button" onClick={createPermanentThread} className="btn-secondary" disabled={adding || !canCreateThread}>
              {adding ? 'Saving...' : 'Create Permanent Thread'}
            </button>
          </div>

          {!canCreateThread && authUser && (
            <p className="text-sm text-secondary-600 mt-2">
              Permanent threads are locked until your knowledge score reaches {THREAD_THRESHOLD}.
            </p>
          )}

          {suggestedSources.length > 0 && (
            <div className="mt-6 card">
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">Suggested Sources</h3>
              <ul className="space-y-1 text-sm">
                {suggestedSources.map((source) => (
                  <li key={`${source.type}-${source.url}`}>
                    <a className="text-primary-700 hover:underline" href={source.url} target="_blank" rel="noreferrer">
                      {source.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-8 grid md:grid-cols-3 gap-4">
            <article className="card thesis-card">
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">Thesis</h3>
              <p className="text-secondary-700 text-sm">{result.dialectic.thesis}</p>
            </article>
            <article className="card counter-thesis-card">
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">Counter-thesis</h3>
              <p className="text-secondary-700 text-sm">{result.dialectic.counterThesis}</p>
            </article>
            <article className="card synthesis-card">
              <h3 className="text-lg font-semibold text-secondary-900 mb-2">Synthesis</h3>
              <p className="text-secondary-700 text-sm">{result.dialectic.synthesis}</p>
            </article>
          </div>

          <div className="mt-6 rounded-lg border border-secondary-200 bg-white p-4">
            <p className="text-sm text-secondary-700">
              <span className="font-semibold">Classification:</span> {result.classification.kind}
            </p>
            {result.classification.matchedPhilosophy && (
              <p className="text-sm text-secondary-700 mt-1">
                <span className="font-semibold">Matched philosophy:</span> {result.classification.matchedPhilosophy}
              </p>
            )}
            {result.classification.suggestedPhilosophy && (
              <p className="text-sm text-secondary-700 mt-1">
                <span className="font-semibold">Suggested new philosophy:</span> {result.classification.suggestedPhilosophy}
              </p>
            )}
            {result.classification.matchedContinents.length > 0 && (
              <p className="text-sm text-secondary-700 mt-1">
                <span className="font-semibold">Continent routing:</span> {result.classification.matchedContinents.join(', ')}
              </p>
            )}
            {status && <p className="text-sm text-primary-700 mt-2">{status}</p>}
          </div>
        </div>
      </div>
    </section>
  )
}
