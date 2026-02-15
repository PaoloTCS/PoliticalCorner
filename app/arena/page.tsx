'use client'

import { useState } from 'react'
import Link from 'next/link'
import VoiceInputButton from '@/app/components/VoiceInputButton'
import type { ArenaMode } from '@/lib/arenaOrchestrator'

type ArenaTurn = {
  round: number
  engine: 'OPENAI' | 'ANTHROPIC' | 'FALLBACK'
  agent: 'HISTORIAN' | 'LOGICIAN' | 'POLICY_ANALYST' | 'ETHICS_AUDITOR'
  side: 'THESIS' | 'COUNTER' | 'MEDIATION'
  content: string
  annotations: string[]
}

type ArenaResponse = {
  mode: ArenaMode
  thesis: string
  counterThesis: string
  engines: Array<'OPENAI' | 'ANTHROPIC' | 'FALLBACK'>
  turns: ArenaTurn[]
  synthesis: string
  relatedPhilosophy?: string
  relatedContinents: string[]
  thesisSources: Array<{
    author: string
    work: string
    year: string
    why: string
    url: string
  }>
  counterSources: Array<{
    author: string
    work: string
    year: string
    why: string
    url: string
  }>
  pedagogyNotes: string[]
}

type ArenaError = {
  error?: string
  where?: string
  violations?: Array<{ type: string; phrase: string; message: string }>
}

export default function ArenaPage() {
  const [mode, setMode] = useState<ArenaMode>('HUMAN_VS_AGENTS')
  const [thesis, setThesis] = useState('')
  const [counterThesis, setCounterThesis] = useState('')
  const [status, setStatus] = useState('')
  const [violations, setViolations] = useState<Array<{ type: string; phrase: string; message: string }>>([])
  const [result, setResult] = useState<ArenaResponse | null>(null)

  async function runDebate() {
    setStatus('Running cross-engine debate arena...')
    setViolations([])

    try {
      const response = await fetch('/api/arena/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode, thesis, counterThesis }),
      })

      const payload = (await response.json()) as ArenaResponse & ArenaError
      if (!response.ok) {
        setStatus(payload.error || 'Arena run failed.')
        setViolations(payload.violations || [])
        return
      }

      setResult(payload)
      setStatus('Arena completed. Compare engine teams and review synthesis.')
    } catch {
      setStatus('Could not run arena debate.')
    }
  }

  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-secondary-900">Debate Arena (Phase 2: Cross-Engine)</h1>
          <Link href="/" className="btn-secondary">Back Home</Link>
        </div>

        <div className="card mb-6">
          <h2 className="text-xl font-semibold mb-3">Mode</h2>
          <div className="grid md:grid-cols-2 gap-3 mb-4">
            <button
              className={`btn-secondary ${mode === 'HUMAN_VS_AGENTS' ? 'ring-2 ring-primary-500' : ''}`}
              onClick={() => setMode('HUMAN_VS_AGENTS')}
              type="button"
            >
              Human vs Multi-Engine Agent Teams
            </button>
            <button
              className={`btn-secondary ${mode === 'AGENTS_ONLY' ? 'ring-2 ring-primary-500' : ''}`}
              onClick={() => setMode('AGENTS_ONLY')}
              type="button"
            >
              Spectator: Engine vs Engine Debate
            </button>
          </div>

          <p className="text-sm text-secondary-700 mb-3">
            Ethics policy: ad hominem and rhetorical attacks are blocked before and during debate turns.
          </p>
          <div className="rounded-lg border border-primary-200 bg-primary-50 p-3 mb-4">
            <h3 className="font-semibold text-primary-900 mb-1">How to run this experiment</h3>
            <ol className="list-decimal pl-5 text-sm text-primary-900 space-y-1">
              <li>Enter a thesis and counter-thesis, or use the voice buttons.</li>
              <li>If counter-thesis is left empty, AI can still run using a generated counter position.</li>
              <li>Click <span className="font-semibold">Run AI Cross-Engine Debate</span> to invoke the engines and tribunal flow.</li>
              <li>Review the source attributions below Thesis and Counter-thesis for traceability.</li>
            </ol>
          </div>

          <div className="flex items-center justify-between gap-2 mb-2">
            <label className="block text-sm font-medium">Thesis</label>
            <VoiceInputButton currentValue={thesis} onTranscript={setThesis} label="Record Thesis (Voice)" />
          </div>
          <p className="text-xs text-secondary-600 mb-2">
            Voice button behavior: click once to start recording, click again on <span className="font-semibold">Stop Voice</span>, then transcript is inserted.
          </p>
          <textarea
            rows={4}
            value={thesis}
            onChange={(e) => setThesis(e.target.value)}
            className="w-full rounded-lg border border-secondary-300 p-3 mb-4"
            placeholder="There must be a moral or religious basis before rights-preserving political institutions can emerge."
          />

          <div className="flex items-center justify-between gap-2 mb-2">
            <label className="block text-sm font-medium">Counter-thesis</label>
            <VoiceInputButton currentValue={counterThesis} onTranscript={setCounterThesis} label="Record Counter (Voice)" />
          </div>
          <p className="text-xs text-secondary-600 mb-2">
            You can leave this blank and still run. The arena will test the thesis against an inferred counter-position.
          </p>
          <textarea
            rows={4}
            value={counterThesis}
            onChange={(e) => setCounterThesis(e.target.value)}
            className="w-full rounded-lg border border-secondary-300 p-3"
            placeholder="Institutions can create and reinforce civic morality and rights commitments over time."
          />

          <div className="mt-4">
            <button className="btn-primary" onClick={runDebate} type="button">
              Run AI Cross-Engine Debate
            </button>
          </div>

          {status && <p className="text-sm text-primary-700 mt-3">{status}</p>}

          {violations.length > 0 && (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3">
              <h3 className="font-semibold text-red-800 mb-2">Blocked By Debate Rules</h3>
              <ul className="text-sm text-red-700 space-y-1">
                {violations.map((v, idx) => (
                  <li key={`${v.type}-${idx}`}>
                    {v.type}: "{v.phrase}" - {v.message}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {result && (
          <>
            <div className="card mb-6">
              <h2 className="text-xl font-semibold mb-2">Active Engine Teams</h2>
              <p className="text-sm text-secondary-700">{result.engines.join(' vs ')}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <article className="card thesis-card">
                <h3 className="font-semibold mb-2">Thesis</h3>
                <p className="text-sm text-secondary-700">{result.thesis}</p>
                <div className="mt-3 pt-3 border-t border-secondary-200">
                  <h4 className="text-xs font-semibold uppercase tracking-wide text-secondary-700 mb-2">Attributed Sources</h4>
                  <ul className="space-y-2">
                    {result.thesisSources.map((source, idx) => (
                      <li key={`ts-${idx}`} className="text-xs text-secondary-700">
                        <p className="font-semibold">{source.author}, {source.work} ({source.year})</p>
                        <p>{source.why}</p>
                        <a className="text-primary-700 hover:text-primary-800 underline" href={source.url} target="_blank" rel="noreferrer">
                          Read source
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
              <article className="card counter-thesis-card">
                <h3 className="font-semibold mb-2">Counter-thesis</h3>
                <p className="text-sm text-secondary-700">{result.counterThesis}</p>
                <div className="mt-3 pt-3 border-t border-secondary-200">
                  <h4 className="text-xs font-semibold uppercase tracking-wide text-secondary-700 mb-2">Attributed Sources</h4>
                  <ul className="space-y-2">
                    {result.counterSources.map((source, idx) => (
                      <li key={`cs-${idx}`} className="text-xs text-secondary-700">
                        <p className="font-semibold">{source.author}, {source.work} ({source.year})</p>
                        <p>{source.why}</p>
                        <a className="text-primary-700 hover:text-primary-800 underline" href={source.url} target="_blank" rel="noreferrer">
                          Read source
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
              <article className="card synthesis-card">
                <h3 className="font-semibold mb-2">Synthesis</h3>
                <p className="text-sm text-secondary-700">{result.synthesis}</p>
              </article>
            </div>

            <div className="card mb-6">
              <h2 className="text-xl font-semibold mb-2">Matrix Linkage</h2>
              <p className="text-sm text-secondary-700 mb-1">
                Related philosophy: <span className="font-semibold">{result.relatedPhilosophy || 'General / To Classify'}</span>
              </p>
              <p className="text-sm text-secondary-700 mb-3">
                Continental scope: <span className="font-semibold">{result.relatedContinents.join(', ')}</span>
              </p>
              <div className="flex gap-3 flex-wrap">
                <Link href="/#continents" className="btn-secondary">Open Political Philosophies Across Continents</Link>
                <Link href="/resources#philosophies" className="btn-secondary">Open Resources and Primary Thinkers</Link>
              </div>
            </div>

            <div className="card mb-6">
              <h2 className="text-xl font-semibold mb-3">Round Robin Transcript</h2>
              <div className="space-y-3">
                {result.turns.map((turn, idx) => (
                  <div key={`${turn.round}-${turn.engine}-${turn.agent}-${idx}`} className="rounded-lg border border-secondary-200 p-3 bg-white">
                    <p className="text-sm text-secondary-500 mb-1">
                      Round {turn.round} · Engine {turn.engine} · Agent {turn.agent} · Side {turn.side}
                    </p>
                    <p className="text-secondary-800 text-sm mb-2">{turn.content}</p>
                    <ul className="text-xs text-secondary-600 list-disc pl-5">
                      {turn.annotations.map((note, n) => (
                        <li key={`${idx}-n-${n}`}>{note}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <h2 className="text-xl font-semibold mb-3">Didactic Notes</h2>
              <ul className="list-disc pl-5 text-sm text-secondary-700 space-y-1">
                {result.pedagogyNotes.map((note, idx) => (
                  <li key={`p-${idx}`}>{note}</li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
