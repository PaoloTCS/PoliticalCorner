'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import type { SourceSuggestion } from '@/lib/sourceSuggestions'

type Thread = {
  id: string
  title: string
  query: string
  classification: string
  thesis: string
  counterThesis: string
  synthesis: string
  sources: SourceSuggestion[]
  createdAt: string
  createdBy: string
}

export default function ThreadsPage() {
  const [threads, setThreads] = useState<Thread[]>([])

  useEffect(() => {
    let cancelled = false

    async function load() {
      const response = await fetch('/api/threads', { cache: 'no-store' })
      if (!response.ok) return
      const payload = (await response.json()) as { threads?: Thread[] }
      if (!cancelled && payload.threads) setThreads(payload.threads)
    }

    void load()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-secondary-900">Permanent Threads</h1>
          <Link href="/" className="btn-secondary">Back Home</Link>
        </div>

        {threads.length === 0 ? (
          <div className="card">No permanent threads yet.</div>
        ) : (
          <div className="space-y-4">
            {threads.map((thread) => (
              <article key={thread.id} className="card">
                <h2 className="text-xl font-semibold text-secondary-900 mb-2">{thread.title}</h2>
                <p className="text-sm text-secondary-600 mb-3">
                  {new Date(thread.createdAt).toLocaleString()} by {thread.createdBy} · {thread.classification}
                </p>
                <p className="text-secondary-700 mb-3">{thread.query}</p>
                <div className="grid md:grid-cols-3 gap-3 mb-3">
                  <div className="thesis-card card"><strong>Thesis:</strong> {thread.thesis}</div>
                  <div className="counter-thesis-card card"><strong>Counter-thesis:</strong> {thread.counterThesis}</div>
                  <div className="synthesis-card card"><strong>Synthesis:</strong> {thread.synthesis}</div>
                </div>
                {thread.sources?.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-secondary-900 mb-1">Suggested Sources</h3>
                    <ul className="text-sm space-y-1">
                      {thread.sources.map((source) => (
                        <li key={`${source.type}-${source.url}`}>
                          <a className="text-primary-700 hover:underline" href={source.url} target="_blank" rel="noreferrer">
                            {source.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
