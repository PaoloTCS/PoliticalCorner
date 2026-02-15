'use client'

import { useRef, useState } from 'react'

type VoiceInputButtonProps = {
  onTranscript: (text: string) => void
  language?: string
  append?: boolean
  currentValue?: string
  label?: string
}

function pickMimeType() {
  if (typeof window === 'undefined' || typeof MediaRecorder === 'undefined') return ''
  const candidates = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4']
  for (const type of candidates) {
    if (MediaRecorder.isTypeSupported(type)) return type
  }
  return ''
}

export default function VoiceInputButton({
  onTranscript,
  language = 'en',
  append = true,
  currentValue = '',
  label = 'Voice Input',
}: VoiceInputButtonProps) {
  const recorderRef = useRef<MediaRecorder | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const chunksRef = useRef<BlobPart[]>([])

  const [recording, setRecording] = useState(false)
  const [status, setStatus] = useState('')

  async function startRecording() {
    if (typeof window === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
      setStatus('Microphone capture is not supported in this browser.')
      return
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream

      const mimeType = pickMimeType()
      const recorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream)
      recorderRef.current = recorder
      chunksRef.current = []

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunksRef.current.push(event.data)
      }

      recorder.onstop = async () => {
        setRecording(false)
        setStatus('Transcribing...')

        try {
          const blob = new Blob(chunksRef.current, { type: recorder.mimeType || 'audio/webm' })
          const file = new File([blob], 'speech.webm', { type: blob.type })

          const form = new FormData()
          form.append('audio', file)
          form.append('language', language)

          const response = await fetch('/api/speech/transcribe', {
            method: 'POST',
            body: form,
          })

          const payload = (await response.json()) as { text?: string; error?: string }
          if (!response.ok) {
            setStatus(payload.error || 'Transcription failed.')
            return
          }

          const text = payload.text?.trim() || ''
          if (!text) {
            setStatus('No speech detected.')
            return
          }

          if (append && currentValue.trim()) {
            onTranscript(`${currentValue.trim()} ${text}`)
          } else {
            onTranscript(text)
          }

          setStatus('Voice captured.')
        } catch {
          setStatus('Could not transcribe audio.')
        } finally {
          if (streamRef.current) {
            streamRef.current.getTracks().forEach((t) => t.stop())
            streamRef.current = null
          }
        }
      }

      recorder.start()
      setRecording(true)
      setStatus('Recording... click Stop when done.')
    } catch {
      setStatus('Microphone permission denied or unavailable.')
    }
  }

  function stopRecording() {
    recorderRef.current?.stop()
    setStatus('Stopping...')
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {!recording ? (
        <button type="button" className="btn-secondary" onClick={startRecording}>
          {label}
        </button>
      ) : (
        <button type="button" className="btn-secondary" onClick={stopRecording}>
          Stop Voice
        </button>
      )}
      {status && <span className="text-xs text-secondary-600">{status}</span>}
    </div>
  )
}
