import { promises as fs } from 'fs'
import path from 'path'
import crypto from 'crypto'
import { dbQuery, hasDatabase } from '@/lib/db'

type UsageRecord = {
  key: string
  date: string
  count: number
}

type UsageStore = {
  usage: UsageRecord[]
}

const dataFilePath = path.join(process.cwd(), 'data', 'usage.json')

function todayUtc() {
  return new Date().toISOString().slice(0, 10)
}

function hash(value: string) {
  return crypto.createHash('sha256').update(value).digest('hex').slice(0, 24)
}

function getIdentityFromHeaders(headers: Headers) {
  const ip =
    headers.get('cf-connecting-ip') ||
    headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    headers.get('x-real-ip') ||
    'unknown'

  const ua = headers.get('user-agent') || 'unknown'
  return hash(`${ip}:${ua}`)
}

async function readStore(): Promise<UsageStore> {
  const raw = await fs.readFile(dataFilePath, 'utf8')
  return JSON.parse(raw) as UsageStore
}

async function writeStore(store: UsageStore) {
  await fs.writeFile(dataFilePath, JSON.stringify(store, null, 2) + '\n', 'utf8')
}

export async function checkAndIncrementAnonymousQuota(headers: Headers) {
  const dailyLimit = Number(process.env.ANON_DAILY_QUERY_LIMIT || '5')
  const date = todayUtc()
  const identity = getIdentityFromHeaders(headers)
  const key = `anon:${identity}`

  if (hasDatabase()) {
    const existing = await dbQuery<{ count: number }>('SELECT count FROM usage_counters WHERE key = $1 AND date = $2 LIMIT 1', [key, date])
    const row = existing.rows[0]

    if (!row) {
      await dbQuery('INSERT INTO usage_counters (key, date, count) VALUES ($1, $2, 1)', [key, date])
      return { allowed: true, remaining: Math.max(0, dailyLimit - 1) }
    }

    if (row.count >= dailyLimit) {
      return { allowed: false, remaining: 0 }
    }

    const nextCount = row.count + 1
    await dbQuery('UPDATE usage_counters SET count = $3 WHERE key = $1 AND date = $2', [key, date, nextCount])
    return { allowed: true, remaining: Math.max(0, dailyLimit - nextCount) }
  }

  const store = await readStore()
  const existing = store.usage.find((entry) => entry.key === key && entry.date === date)

  if (!existing) {
    store.usage.push({ key, date, count: 1 })
    await writeStore(store)
    return { allowed: true, remaining: Math.max(0, dailyLimit - 1) }
  }

  if (existing.count >= dailyLimit) {
    return { allowed: false, remaining: 0 }
  }

  existing.count += 1
  await writeStore(store)
  return { allowed: true, remaining: Math.max(0, dailyLimit - existing.count) }
}
