export async function verifyTurnstileToken(token: string, remoteIp?: string | null) {
  const secretKey = process.env.TURNSTILE_SECRET_KEY
  if (!secretKey) {
    return { success: true, bypassed: true as const }
  }

  if (!token) {
    return { success: false, bypassed: false as const, error: 'Missing Turnstile token.' }
  }

  const formData = new URLSearchParams()
  formData.append('secret', secretKey)
  formData.append('response', token)
  if (remoteIp) formData.append('remoteip', remoteIp)

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: formData.toString(),
  })

  if (!response.ok) {
    return { success: false, bypassed: false as const, error: 'Turnstile verification request failed.' }
  }

  const payload = (await response.json()) as {
    success?: boolean
    'error-codes'?: string[]
  }

  if (!payload.success) {
    return {
      success: false,
      bypassed: false as const,
      error: `Turnstile verification failed: ${(payload['error-codes'] ?? []).join(', ') || 'unknown'}`,
    }
  }

  return { success: true, bypassed: false as const }
}
