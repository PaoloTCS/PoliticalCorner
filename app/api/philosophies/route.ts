import { promises as fs } from 'fs'
import path from 'path'
import { NextRequest, NextResponse } from 'next/server'
import { dbQuery, hasDatabase } from '@/lib/db'

export const dynamic = 'force-dynamic'

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

type PhilosophyStore = {
  philosophies: PhilosophyRecord[]
}

const dataFilePath = path.join(process.cwd(), 'data', 'philosophies.json')

const defaultTopics = {
  Asia: 'Emerging Discussion',
  Americas: 'Emerging Discussion',
  Europe: 'Emerging Discussion',
  Africa: 'Emerging Discussion',
}

async function readStore(): Promise<PhilosophyStore> {
  if (hasDatabase()) {
    const { rows } = await dbQuery<{ name: string; source: 'core' | 'user'; by_continent: PhilosophyRecord['byContinent'] }>(
      'SELECT name, source, by_continent FROM philosophies ORDER BY source ASC, name ASC'
    )
    return {
      philosophies: rows.map((row) => ({ name: row.name, source: row.source, byContinent: row.by_continent })),
    }
  }

  const raw = await fs.readFile(dataFilePath, 'utf8')
  return JSON.parse(raw) as PhilosophyStore
}

async function writeStore(store: PhilosophyStore) {
  if (hasDatabase()) {
    for (const entry of store.philosophies) {
      await dbQuery(
        `INSERT INTO philosophies (name, source, by_continent)
         VALUES ($1, $2, $3::jsonb)
         ON CONFLICT (name) DO UPDATE
         SET source = EXCLUDED.source,
             by_continent = EXCLUDED.by_continent`,
        [entry.name, entry.source, JSON.stringify(entry.byContinent)]
      )
    }
    return
  }

  await fs.writeFile(dataFilePath, JSON.stringify(store, null, 2) + '\n', 'utf8')
}

export async function GET() {
  const store = await readStore()
  return NextResponse.json(store)
}

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => ({}))) as {
    name?: string
    continents?: string[]
  }

  const name = body.name?.trim()
  if (!name || name.length < 3) {
    return NextResponse.json({ error: 'A philosophy name with at least 3 characters is required.' }, { status: 400 })
  }

  const requestedContinents = new Set(body.continents ?? [])

  if (hasDatabase()) {
    const dup = await dbQuery<{ name: string }>('SELECT name FROM philosophies WHERE LOWER(name) = LOWER($1) LIMIT 1', [name])
    if (dup.rows.length > 0) {
      return NextResponse.json({ error: 'Philosophy already exists in the matrix.' }, { status: 409 })
    }

    const byContinent = {
      Asia: requestedContinents.has('Asia') ? 'New submission pending review' : defaultTopics.Asia,
      Americas: requestedContinents.has('Americas') ? 'New submission pending review' : defaultTopics.Americas,
      Europe: requestedContinents.has('Europe') ? 'New submission pending review' : defaultTopics.Europe,
      Africa: requestedContinents.has('Africa') ? 'New submission pending review' : defaultTopics.Africa,
    }

    const next: PhilosophyRecord = {
      name,
      source: 'user',
      byContinent,
    }

    await dbQuery(
      'INSERT INTO philosophies (name, source, by_continent) VALUES ($1, $2, $3::jsonb)',
      [name, 'user', JSON.stringify(byContinent)]
    )

    return NextResponse.json({ ok: true, philosophy: next }, { status: 201 })
  }

  const store = await readStore()
  const duplicate = store.philosophies.find((entry) => entry.name.toLowerCase() === name.toLowerCase())
  if (duplicate) {
    return NextResponse.json({ error: 'Philosophy already exists in the matrix.' }, { status: 409 })
  }

  const next: PhilosophyRecord = {
    name,
    source: 'user',
    byContinent: {
      Asia: requestedContinents.has('Asia') ? 'New submission pending review' : defaultTopics.Asia,
      Americas: requestedContinents.has('Americas') ? 'New submission pending review' : defaultTopics.Americas,
      Europe: requestedContinents.has('Europe') ? 'New submission pending review' : defaultTopics.Europe,
      Africa: requestedContinents.has('Africa') ? 'New submission pending review' : defaultTopics.Africa,
    },
  }

  store.philosophies.push(next)
  await writeStore(store)

  return NextResponse.json({ ok: true, philosophy: next }, { status: 201 })
}
