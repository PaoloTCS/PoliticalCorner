import { NextRequest, NextResponse } from 'next/server'
import { createSessionToken, getSessionCookieName, getSessionCookieOptions } from '@/lib/session'
import { createUser } from '@/lib/userStore'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => ({}))) as { email?: string; password?: string }
  const email = body.email?.trim().toLowerCase()
  const password = body.password?.trim()

  if (!email || !password || password.length < 8) {
    return NextResponse.json({ error: 'Valid email and password (min 8 chars) are required.' }, { status: 400 })
  }

  try {
    const user = await createUser(email, password)
    const token = createSessionToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      iat: Date.now(),
    })

    const response = NextResponse.json({ ok: true, user: { email: user.email, role: user.role, knowledgeScore: user.knowledgeScore } })
    response.cookies.set(getSessionCookieName(), token, getSessionCookieOptions())
    return response
  } catch (error) {
    if (error instanceof Error && error.message === 'EMAIL_EXISTS') {
      return NextResponse.json({ error: 'Email is already registered.' }, { status: 409 })
    }
    return NextResponse.json({ error: 'Registration failed.' }, { status: 500 })
  }
}
