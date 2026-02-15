import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  const key = process.env.OPENAI_API_KEY
  if (!key) {
    return NextResponse.json({ error: 'Speech transcription is not configured. Missing OPENAI_API_KEY.' }, { status: 503 })
  }

  const form = await request.formData().catch(() => null)
  const file = form?.get('audio')
  const language = String(form?.get('language') || 'en')

  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'Audio file is required.' }, { status: 400 })
  }

  const upstream = new FormData()
  upstream.append('file', file, file.name || 'speech.webm')
  upstream.append('model', process.env.OPENAI_STT_MODEL || 'whisper-1')
  upstream.append('language', language)

  const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
    },
    body: upstream,
  })

  if (!response.ok) {
    const details = await response.text().catch(() => '')
    return NextResponse.json({ error: 'Transcription failed.', details }, { status: 502 })
  }

  const json = (await response.json()) as { text?: string }
  const text = json.text?.trim() || ''

  if (!text) {
    return NextResponse.json({ error: 'No speech detected. Try speaking more clearly.' }, { status: 422 })
  }

  return NextResponse.json({ text })
}
