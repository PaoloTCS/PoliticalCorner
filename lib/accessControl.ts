import { headers } from 'next/headers'

const CF_ACCESS_EMAIL_HEADER = 'cf-access-authenticated-user-email'
const DEV_EMAIL_HEADER = 'x-user-email'

export function getAllowedCuratorEmails(): string[] {
  const raw = process.env.THREAD_CURATOR_EMAILS ?? ''
  return raw
    .split(',')
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean)
}

export function getRequesterEmailFromHeader(requestHeaders: Headers): string | null {
  const cfEmail = requestHeaders.get(CF_ACCESS_EMAIL_HEADER)?.trim().toLowerCase()
  if (cfEmail) return cfEmail

  // Dev-only fallback so local testing works without Cloudflare Access.
  if (process.env.NODE_ENV !== 'production') {
    const devEmail = requestHeaders.get(DEV_EMAIL_HEADER)?.trim().toLowerCase()
    if (devEmail) return devEmail
  }

  return null
}

export function canCreatePermanentThread(requestHeaders: Headers) {
  const requesterEmail = getRequesterEmailFromHeader(requestHeaders)
  if (!requesterEmail) {
    return { allowed: false, requesterEmail: null }
  }

  const allowed = getAllowedCuratorEmails().includes(requesterEmail)
  return { allowed, requesterEmail }
}

export function getServerComponentRequesterEmail(): string | null {
  const h = headers()
  const cfEmail = h.get(CF_ACCESS_EMAIL_HEADER)?.trim().toLowerCase()
  if (cfEmail) return cfEmail

  if (process.env.NODE_ENV !== 'production') {
    const devEmail = h.get(DEV_EMAIL_HEADER)?.trim().toLowerCase()
    if (devEmail) return devEmail
  }

  return null
}
