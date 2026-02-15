'use client'

import { useState } from 'react'
import Link from 'next/link'
import VoiceInputButton from '@/app/components/VoiceInputButton'

type TribunalResponse = {
  mode: 'HUMAN_HUMAN' | 'HUMAN_AI' | 'AI_AI'
  thesis: string
  counterThesis: string
  rounds: Array<{ label: string; content: string }>
  synthesis: string
  quality: {
    coherence: number
    fairness: number
    evidenceDemand: number
  }
  tribunalRules: string[]
}

type ApiError = {
  error?: string
  blocked?: boolean
  where?: string
  violations?: Array<{ type: string; phrase: string; message: string }>
}

export default function TribunalExperimentPage() {
  const [mode, setMode] = useState<'HUMAN_HUMAN' | 'HUMAN_AI' | 'AI_AI'>('HUMAN_HUMAN')

  const [humanThesis, setHumanThesis] = useState('')
  const [humanCounter, setHumanCounter] = useState('')

  const [aiThesis, setAiThesis] = useState('')
  const [aiCounter, setAiCounter] = useState('')

  const [status, setStatus] = useState('')
  const [violations, setViolations] = useState<Array<{ type: string; phrase: string; message: string }>>([])
  const [tribunal, setTribunal] = useState<TribunalResponse | null>(null)

  async function runTribunal(autoFillMissing: boolean) {
    setStatus('Running AI tribunal...')
    setViolations([])

    const thesis = mode === 'AI_AI' ? aiThesis : humanThesis
    const counterThesis = mode === 'AI_AI' ? aiCounter : humanCounter

    try {
      const response = await fetch('/api/tribunal/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          thesis,
          counterThesis,
          mode,
          autoFillMissing,
        }),
      })

      const payload = (await response.json()) as TribunalResponse & ApiError
      if (!response.ok) {
        setStatus(payload.error ?? 'Tribunal request failed.')
        setViolations(payload.violations || [])
        return
      }

      if (mode === 'AI_AI') {
        setAiThesis(payload.thesis)
        setAiCounter(payload.counterThesis)
      } else {
        setHumanThesis(payload.thesis)
        setHumanCounter(payload.counterThesis)
      }

      setTribunal(payload)
      setStatus('Tribunal completed with rhetoric guardrails active.')
    } catch {
      setStatus('Could not run tribunal.')
    }
  }

  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-secondary-900">Experiment: Human vs AI Tribunal</h1>
          <Link href="/" className="btn-secondary">Back Home</Link>
        </div>

        <div className="card mb-6">
          <p className="text-secondary-700 mb-3">
            Non-negotiable rule: no ad hominem, no insults, no mockery, and no rhetoric that attacks people instead of arguments.
          </p>
          <div className="grid md:grid-cols-3 gap-3">
            <button type="button" className={`btn-secondary ${mode === 'HUMAN_HUMAN' ? 'ring-2 ring-primary-500' : ''}`} onClick={() => setMode('HUMAN_HUMAN')}>
              Human-Human
            </button>
            <button type="button" className={`btn-secondary ${mode === 'HUMAN_AI' ? 'ring-2 ring-primary-500' : ''}`} onClick={() => setMode('HUMAN_AI')}>
              Human-AI
            </button>
            <button type="button" className={`btn-secondary ${mode === 'AI_AI' ? 'ring-2 ring-primary-500' : ''}`} onClick={() => setMode('AI_AI')}>
              AI-AI
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="card">
            <h2 className="text-xl font-semibold text-secondary-900 mb-3">Human Lane</h2>
            <div className="flex items-center justify-between gap-2 mb-2">
              <label className="block text-sm font-medium">Thesis</label>
              <VoiceInputButton currentValue={humanThesis} onTranscript={setHumanThesis} label="Voice Thesis" />
            </div>
            <textarea
              rows={4}
              value={humanThesis}
              onChange={(e) => setHumanThesis(e.target.value)}
              className="w-full rounded-lg border border-secondary-300 p-3 mb-4"
              placeholder="Example: A moral code must precede rights-preserving political institutions."
            />
            <div className="flex items-center justify-between gap-2 mb-2">
              <label className="block text-sm font-medium">Counter-thesis</label>
              <VoiceInputButton currentValue={humanCounter} onTranscript={setHumanCounter} label="Voice Counter" />
            </div>
            <textarea
              rows={4}
              value={humanCounter}
              onChange={(e) => setHumanCounter(e.target.value)}
              className="w-full rounded-lg border border-secondary-300 p-3"
              placeholder="User 2 can enter a counter-thesis here."
            />
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold text-secondary-900 mb-3">AI Lane</h2>
            <label className="block text-sm font-medium mb-2">AI Thesis</label>
            <textarea
              rows={4}
              value={aiThesis}
              onChange={(e) => setAiThesis(e.target.value)}
              className="w-full rounded-lg border border-secondary-300 p-3 mb-4"
              placeholder="In AI-AI mode, machine-generated thesis can be edited here."
            />
            <label className="block text-sm font-medium mb-2">AI Counter-thesis</label>
            <textarea
              rows={4}
              value={aiCounter}
              onChange={(e) => setAiCounter(e.target.value)}
              className="w-full rounded-lg border border-secondary-300 p-3"
              placeholder="In AI-AI mode, machine-generated counter-thesis can be edited here."
            />
          </div>
        </div>

        <div className="card mb-6">
          <div className="flex gap-3 flex-wrap">
            <button type="button" className="btn-secondary" onClick={() => runTribunal(true)}>
              Auto-fill Missing Side + Start Tribunal
            </button>
            <button type="button" className="btn-primary" onClick={() => runTribunal(false)}>
              Start Tribunal (No Auto-fill)
            </button>
          </div>
          {status && <p className="text-sm text-primary-700 mt-3">{status}</p>}

          {violations.length > 0 && (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4">
              <h3 className="font-semibold text-red-800 mb-2">Blocked: Debate Rule Violations</h3>
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

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <article className="card thesis-card">
            <h3 className="text-lg font-semibold mb-2">Thesis</h3>
            <p className="text-sm text-secondary-700">{tribunal?.thesis || 'Awaiting input...'}</p>
          </article>
          <article className="card counter-thesis-card">
            <h3 className="text-lg font-semibold mb-2">Counter-thesis</h3>
            <p className="text-sm text-secondary-700">{tribunal?.counterThesis || 'Awaiting input...'}</p>
          </article>
          <article className="card synthesis-card">
            <h3 className="text-lg font-semibold mb-2">Synthesis</h3>
            <p className="text-sm text-secondary-700">{tribunal?.synthesis || 'Awaiting tribunal synthesis...'}</p>
          </article>
        </div>

        {tribunal && (
          <div className="card">
            <h2 className="text-xl font-semibold text-secondary-900 mb-4">AI Tribunal Rounds</h2>
            <div className="space-y-3 mb-4">
              {tribunal.rounds.map((round) => (
                <div key={round.label} className="rounded-lg border border-secondary-200 p-3 bg-white">
                  <h3 className="font-semibold text-secondary-900 mb-1">{round.label}</h3>
                  <p className="text-sm text-secondary-700 whitespace-pre-line">{round.content}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-secondary-700">
              Quality: coherence {Math.round(tribunal.quality.coherence * 100)}%, fairness {Math.round(tribunal.quality.fairness * 100)}%, evidence demand {Math.round(tribunal.quality.evidenceDemand * 100)}%
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
