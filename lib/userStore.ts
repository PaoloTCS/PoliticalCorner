import { promises as fs } from 'fs'
import path from 'path'
import crypto from 'crypto'
import { dbQuery, hasDatabase } from '@/lib/db'

export type UserRole = 'user' | 'admin'

export type UserRecord = {
  id: string
  email: string
  passwordHash: string
  salt: string
  role: UserRole
  knowledgeScore: number
  createdAt: string
}

type UserStore = {
  users: UserRecord[]
}

const dataFilePath = path.join(process.cwd(), 'data', 'users.json')

export async function readUsers(): Promise<UserStore> {
  if (hasDatabase()) {
    const { rows } = await dbQuery<{
      id: string
      email: string
      password_hash: string
      salt: string
      role: UserRole
      knowledge_score: number
      created_at: string
    }>('SELECT id, email, password_hash, salt, role, knowledge_score, created_at FROM users ORDER BY created_at DESC')

    return {
      users: rows.map((row) => ({
        id: row.id,
        email: row.email,
        passwordHash: row.password_hash,
        salt: row.salt,
        role: row.role,
        knowledgeScore: row.knowledge_score,
        createdAt: row.created_at,
      })),
    }
  }

  const raw = await fs.readFile(dataFilePath, 'utf8')
  return JSON.parse(raw) as UserStore
}

export async function writeUsers(store: UserStore) {
  if (hasDatabase()) {
    for (const user of store.users) {
      await dbQuery(
        `INSERT INTO users (id, email, password_hash, salt, role, knowledge_score, created_at)
         VALUES ($1,$2,$3,$4,$5,$6,$7)
         ON CONFLICT (id) DO UPDATE SET
           email = EXCLUDED.email,
           password_hash = EXCLUDED.password_hash,
           salt = EXCLUDED.salt,
           role = EXCLUDED.role,
           knowledge_score = EXCLUDED.knowledge_score,
           created_at = EXCLUDED.created_at`,
        [user.id, user.email, user.passwordHash, user.salt, user.role, user.knowledgeScore, user.createdAt]
      )
    }
    return
  }

  await fs.writeFile(dataFilePath, JSON.stringify(store, null, 2) + '\n', 'utf8')
}

function scryptHash(password: string, salt: string): Promise<string> {
  return new Promise((resolve, reject) => {
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) {
        reject(err)
        return
      }
      resolve(derivedKey.toString('hex'))
    })
  })
}

export async function hashPassword(password: string) {
  const salt = crypto.randomBytes(16).toString('hex')
  const passwordHash = await scryptHash(password, salt)
  return { salt, passwordHash }
}

export async function verifyPassword(password: string, user: UserRecord) {
  const passwordHash = await scryptHash(password, user.salt)
  return crypto.timingSafeEqual(Buffer.from(passwordHash, 'hex'), Buffer.from(user.passwordHash, 'hex'))
}

export async function createUser(email: string, password: string) {
  const normalized = email.trim().toLowerCase()

  if (hasDatabase()) {
    const existing = await findUserByEmail(normalized)
    if (existing) throw new Error('EMAIL_EXISTS')

    const { salt, passwordHash } = await hashPassword(password)
    const user: UserRecord = {
      id: crypto.randomUUID(),
      email: normalized,
      salt,
      passwordHash,
      role: 'user',
      knowledgeScore: 0,
      createdAt: new Date().toISOString(),
    }

    await dbQuery(
      `INSERT INTO users (id, email, password_hash, salt, role, knowledge_score, created_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7)`,
      [user.id, user.email, user.passwordHash, user.salt, user.role, user.knowledgeScore, user.createdAt]
    )

    return user
  }

  const store = await readUsers()
  if (store.users.some((u) => u.email === normalized)) {
    throw new Error('EMAIL_EXISTS')
  }

  const { salt, passwordHash } = await hashPassword(password)
  const user: UserRecord = {
    id: crypto.randomUUID(),
    email: normalized,
    salt,
    passwordHash,
    role: 'user',
    knowledgeScore: 0,
    createdAt: new Date().toISOString(),
  }

  store.users.push(user)
  await writeUsers(store)
  return user
}

export async function findUserByEmail(email: string) {
  const normalized = email.trim().toLowerCase()

  if (hasDatabase()) {
    const { rows } = await dbQuery<{
      id: string
      email: string
      password_hash: string
      salt: string
      role: UserRole
      knowledge_score: number
      created_at: string
    }>('SELECT id, email, password_hash, salt, role, knowledge_score, created_at FROM users WHERE email = $1 LIMIT 1', [normalized])

    const row = rows[0]
    if (!row) return null

    return {
      id: row.id,
      email: row.email,
      passwordHash: row.password_hash,
      salt: row.salt,
      role: row.role,
      knowledgeScore: row.knowledge_score,
      createdAt: row.created_at,
    }
  }

  const store = await readUsers()
  return store.users.find((u) => u.email === normalized) ?? null
}

export async function findUserById(id: string) {
  if (hasDatabase()) {
    const { rows } = await dbQuery<{
      id: string
      email: string
      password_hash: string
      salt: string
      role: UserRole
      knowledge_score: number
      created_at: string
    }>('SELECT id, email, password_hash, salt, role, knowledge_score, created_at FROM users WHERE id = $1 LIMIT 1', [id])

    const row = rows[0]
    if (!row) return null

    return {
      id: row.id,
      email: row.email,
      passwordHash: row.password_hash,
      salt: row.salt,
      role: row.role,
      knowledgeScore: row.knowledge_score,
      createdAt: row.created_at,
    }
  }

  const store = await readUsers()
  return store.users.find((u) => u.id === id) ?? null
}

export async function incrementKnowledgeScore(userId: string, points: number) {
  if (hasDatabase()) {
    const { rows } = await dbQuery<{
      id: string
      email: string
      password_hash: string
      salt: string
      role: UserRole
      knowledge_score: number
      created_at: string
    }>(
      `UPDATE users
       SET knowledge_score = knowledge_score + $2
       WHERE id = $1
       RETURNING id, email, password_hash, salt, role, knowledge_score, created_at`,
      [userId, points]
    )

    const row = rows[0]
    if (!row) return null

    return {
      id: row.id,
      email: row.email,
      passwordHash: row.password_hash,
      salt: row.salt,
      role: row.role,
      knowledgeScore: row.knowledge_score,
      createdAt: row.created_at,
    }
  }

  const store = await readUsers()
  const user = store.users.find((u) => u.id === userId)
  if (!user) return null
  user.knowledgeScore += points
  await writeUsers(store)
  return user
}
