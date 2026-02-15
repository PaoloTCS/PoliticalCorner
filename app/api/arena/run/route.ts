import { NextRequest, NextResponse } from 'next/server'
import { detectRhetoricViolations } from '@/lib/debateEthics'
import { runArenaDebate, type ArenaMode } from '@/lib/arenaOrchestrator'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => ({}))) as {
    mode?: ArenaMode
    thesis?: string
    counterThesis?: string
  }

  const mode = body.mode || 'HUMAN_VS_AGENTS'
  const thesis = body.thesis?.trim() || ''
  const counterThesis = body.counterThesis?.trim() || ''

  if (mode === 'HUMAN_VS_AGENTS' && !thesis && !counterThesis) {
    return NextResponse.json({ error: 'Provide at least a thesis or counter-thesis.' }, { status: 400 })
  }

  if (thesis) {
    const violations = detectRhetoricViolations(thesis)
    if (violations.length > 0) {
      return NextResponse.json({ error: 'Thesis violates debate ethics rules.', where: 'thesis', violations }, { status: 422 })
    }
  }

  if (counterThesis) {
    const violations = detectRhetoricViolations(counterThesis)
    if (violations.length > 0) {
      return NextResponse.json({ error: 'Counter-thesis violates debate ethics rules.', where: 'counterThesis', violations }, { status: 422 })
    }
  }

  const result = await runArenaDebate(mode, thesis, counterThesis)
  return NextResponse.json(result)
}
