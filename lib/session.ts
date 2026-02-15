import crypto from 'crypto'

const COOKIE_NAME = 'pc_session'
const ONE_WEEK_SECONDS = 60 * 60 * 24 * 7

type SessionPayload = {
  userId: string
  email: string
  role: 'user' | 'admin'
  iat: number
}

function base64url(input: Buffer | string) {
  return Buffer.from(input)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
}

function sign(value: string, secret: string) {
  return base64url(crypto.createHmac('sha256', secret).update(value).digest())
}

function getSecret() {
  const secret = process.env.SESSION_SECRET
  
  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('SESSION_SECRET environment variable is required in production')
    }
    console.warn('⚠️  Using insecure session secret in development. Set SESSION_SECRET for production.')
    return 'dev-insecure-session-secret-change-me'
  }
  
  return secret
}

export function getSessionCookieName() {
  return COOKIE_NAME
}

export function createSessionToken(payload: SessionPayload) {
  const serialized = JSON.stringify(payload)
  const encoded = base64url(serialized)
  const signature = sign(encoded, getSecret())
  return `${encoded}.${signature}`
}

export function verifySessionToken(token?: string | null): SessionPayload | null {
  if (!token) return null
  const [encoded, signature] = token.split('.')
  if (!encoded || !signature) return null

  const expected = sign(encoded, getSecret())
  if (expected !== signature) return null

  try {
    const payload = JSON.parse(Buffer.from(encoded, 'base64').toString('utf8')) as SessionPayload
    if (!payload.userId || !payload.email || !payload.role || !payload.iat) return null
    return payload
  } catch {
    return null
  }
}

export function getSessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: ONE_WEEK_SECONDS,
  }
}
