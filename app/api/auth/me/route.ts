import { NextRequest, NextResponse } from 'next/server'
import { getSessionCookieName, verifySessionToken } from '@/lib/session'
import { findUserById } from '@/lib/userStore'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const token = request.cookies.get(getSessionCookieName())?.value
  const session = verifySessionToken(token)
  if (!session) {
    return NextResponse.json({ authenticated: false })
  }

  const user = await findUserById(session.userId)
  if (!user) {
    return NextResponse.json({ authenticated: false })
  }

  return NextResponse.json({
    authenticated: true,
    user: {
      email: user.email,
      role: user.role,
      knowledgeScore: user.knowledgeScore,
    },
  })
}
