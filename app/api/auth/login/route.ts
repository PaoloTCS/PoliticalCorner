import { NextRequest, NextResponse } from 'next/server'
import { createSessionToken, getSessionCookieName, getSessionCookieOptions } from '@/lib/session'
import { findUserByEmail, verifyPassword } from '@/lib/userStore'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => ({}))) as { email?: string; password?: string }
  const email = body.email?.trim().toLowerCase()
  const password = body.password?.trim()

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 })
  }

  const user = await findUserByEmail(email)
  if (!user) {
    return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 })
  }

  const valid = await verifyPassword(password, user)
  if (!valid) {
    return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 })
  }

  const token = createSessionToken({
    userId: user.id,
    email: user.email,
    role: user.role,
    iat: Date.now(),
  })

  const response = NextResponse.json({ ok: true, user: { email: user.email, role: user.role, knowledgeScore: user.knowledgeScore } })
  response.cookies.set(getSessionCookieName(), token, getSessionCookieOptions())
  return response
}
