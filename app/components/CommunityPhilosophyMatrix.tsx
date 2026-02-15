'use client'

import { useEffect, useState } from 'react'

type PhilosophyRecord = {
  name: string
  source: 'core' | 'user'
  byContinent: {
    Asia: string
    Americas: string
    Europe: string
    Africa: string
  }
}

export default function CommunityPhilosophyMatrix() {
  const [entries, setEntries] = useState<PhilosophyRecord[]>([])

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const response = await fetch('/api/philosophies', { cache: 'no-store' })
        if (!response.ok) return

        const payload = (await response.json()) as { philosophies?: PhilosophyRecord[] }
        if (!cancelled && payload.philosophies) {
          setEntries(payload.philosophies.filter((entry) => entry.source === 'user'))
        }
      } catch {
        // No-op; matrix remains hidden if data is unavailable.
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  if (entries.length === 0) return null

  return (
    <div className="mt-10">
      <h3 className="text-2xl font-bold text-secondary-900 mb-4">Community-added Philosophies</h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-secondary-100">
              <th className="text-left p-4 border border-secondary-200 font-semibold">Political Philosophy</th>
              <th className="text-center p-4 border border-secondary-200 font-semibold">Asia</th>
              <th className="text-center p-4 border border-secondary-200 font-semibold">Americas</th>
              <th className="text-center p-4 border border-secondary-200 font-semibold">Europe</th>
              <th className="text-center p-4 border border-secondary-200 font-semibold">Africa</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry.name} className="hover:bg-secondary-50">
                <td className="p-4 border border-secondary-200 font-medium text-primary-700">{entry.name}</td>
                <td className="p-4 border border-secondary-200 text-center text-secondary-700">{entry.byContinent.Asia}</td>
                <td className="p-4 border border-secondary-200 text-center text-secondary-700">{entry.byContinent.Americas}</td>
                <td className="p-4 border border-secondary-200 text-center text-secondary-700">{entry.byContinent.Europe}</td>
                <td className="p-4 border border-secondary-200 text-center text-secondary-700">{entry.byContinent.Africa}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
