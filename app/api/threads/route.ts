import { promises as fs } from 'fs'
import path from 'path'
import { NextRequest, NextResponse } from 'next/server'
import { getSessionCookieName, verifySessionToken } from '@/lib/session'
import { findUserById } from '@/lib/userStore'
import type { QueryKind } from '@/lib/queryClassifier'
import type { SourceSuggestion } from '@/lib/sourceSuggestions'
import { dbQuery, hasDatabase } from '@/lib/db'

export const dynamic = 'force-dynamic'

type PermanentThread = {
  id: string
  title: string
  query: string
  classification: QueryKind
  thesis: string
  counterThesis: string
  synthesis: string
  sources: SourceSuggestion[]
  createdAt: string
  createdBy: string
}

type ThreadStore = {
  threads: PermanentThread[]
}

const dataFilePath = path.join(process.cwd(), 'data', 'threads.json')

async function ensureDataFile() {
  const dir = path.dirname(dataFilePath)
  try {
    await fs.access(dir)
  } catch {
    await fs.mkdir(dir, { recursive: true })
  }
  
  try {
    await fs.access(dataFilePath)
  } catch {
    await fs.writeFile(dataFilePath, JSON.stringify({ threads: [] }, null, 2) + '\n', 'utf8')
  }
}

async function readStore(): Promise<ThreadStore> {
  if (hasDatabase()) {
    const { rows } = await dbQuery<{
      id: string
      title: string
      query: string
      classification: QueryKind
      thesis: string
      counter_thesis: string
      synthesis: string
      sources: SourceSuggestion[]
      created_at: string
      created_by: string
    }>('SELECT id, title, query, classification, thesis, counter_thesis, synthesis, sources, created_at, created_by FROM threads ORDER BY created_at DESC')

    return {
      threads: rows.map((row) => ({
        id: row.id,
        title: row.title,
        query: row.query,
        classification: row.classification,
        thesis: row.thesis,
        counterThesis: row.counter_thesis,
        synthesis: row.synthesis,
        sources: row.sources || [],
        createdAt: row.created_at,
        createdBy: row.created_by,
      })),
    }
  }

  await ensureDataFile()
  const raw = await fs.readFile(dataFilePath, 'utf8')
  return JSON.parse(raw) as ThreadStore
}

async function writeStore(store: ThreadStore) {
  if (hasDatabase()) {
    for (const t of store.threads) {
      await dbQuery(
        `INSERT INTO threads (id, title, query, classification, thesis, counter_thesis, synthesis, sources, created_at, created_by)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8::jsonb,$9,$10)
         ON CONFLICT (id) DO UPDATE
         SET title = EXCLUDED.title,
             query = EXCLUDED.query,
             classification = EXCLUDED.classification,
             thesis = EXCLUDED.thesis,
             counter_thesis = EXCLUDED.counter_thesis,
             synthesis = EXCLUDED.synthesis,
             sources = EXCLUDED.sources,
             created_at = EXCLUDED.created_at,
             created_by = EXCLUDED.created_by`,
        [t.id, t.title, t.query, t.classification, t.thesis, t.counterThesis, t.synthesis, JSON.stringify(t.sources), t.createdAt, t.createdBy]
      )
    }
    return
  }

  await ensureDataFile()
  await fs.writeFile(dataFilePath, JSON.stringify(store, null, 2) + '\n', 'utf8')
}

function buildTitleFromQuery(query: string) {
  const clean = query.trim().replace(/\s+/g, ' ')
  return clean.length > 100 ? `${clean.slice(0, 97)}...` : clean
}

function canCreateThread(knowledgeScore: number, role: 'user' | 'admin') {
  if (role === 'admin') return true
  const threshold = Number(process.env.KNOWLEDGE_THREAD_THRESHOLD || '20')
  return knowledgeScore >= threshold
}

export async function GET() {
  const store = await readStore()
  return NextResponse.json(store)
}

export async function POST(request: NextRequest) {
  const token = request.cookies.get(getSessionCookieName())?.value
  const session = verifySessionToken(token)

  if (!session) {
    return NextResponse.json({ error: 'Login required to create permanent threads.' }, { status: 401 })
  }

  const user = await findUserById(session.userId)
  if (!user) {
    return NextResponse.json({ error: 'Invalid session user.' }, { status: 401 })
  }

  if (!canCreateThread(user.knowledgeScore, user.role)) {
    return NextResponse.json(
      {
        error: `Knowledge threshold not reached. Required: ${process.env.KNOWLEDGE_THREAD_THRESHOLD || '20'}.`,
      },
      { status: 403 }
    )
  }

  const body = (await request.json().catch(() => ({}))) as {
    title?: string
    query?: string
    classification?: QueryKind
    thesis?: string
    counterThesis?: string
    synthesis?: string
    sources?: SourceSuggestion[]
  }

  const query = body.query?.trim()
  if (!query) {
    return NextResponse.json({ error: 'Query is required.' }, { status: 400 })
  }

  const thread: PermanentThread = {
    id: crypto.randomUUID(),
    title: body.title?.trim() || buildTitleFromQuery(query),
    query,
    classification: body.classification ?? 'UNCLEAR',
    thesis: body.thesis?.trim() || '',
    counterThesis: body.counterThesis?.trim() || '',
    synthesis: body.synthesis?.trim() || '',
    sources: Array.isArray(body.sources) ? body.sources : [],
    createdAt: new Date().toISOString(),
    createdBy: user.email,
  }

  if (hasDatabase()) {
    await dbQuery(
      `INSERT INTO threads (id, title, query, classification, thesis, counter_thesis, synthesis, sources, created_at, created_by)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8::jsonb,$9,$10)`,
      [thread.id, thread.title, thread.query, thread.classification, thread.thesis, thread.counterThesis, thread.synthesis, JSON.stringify(thread.sources), thread.createdAt, thread.createdBy]
    )
    return NextResponse.json({ ok: true, thread }, { status: 201 })
  }

  const store = await readStore()
  store.threads.unshift(thread)
  await writeStore(store)

  return NextResponse.json({ ok: true, thread }, { status: 201 })
}
