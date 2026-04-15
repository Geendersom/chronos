import type { TimerStatus } from '../core/timeEngine'

export interface TimerViewProps {
  remaining: number
  progress: number
  status: TimerStatus
}

export const formatClock = (remainingMs: number): { minutes: string; seconds: string } => {
  const totalSeconds = Math.max(0, Math.ceil(remainingMs / 1000))
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  return {
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0'),
  }
}

export const formatClockPrecise = (
  remainingMs: number,
): { minutes: string; seconds: string; centiseconds: string } => {
  const safeMs = Math.max(0, remainingMs)
  const totalSeconds = Math.floor(safeMs / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  const centiseconds = Math.floor((safeMs % 1000) / 10)

  return {
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0'),
    centiseconds: String(centiseconds).padStart(2, '0'),
  }
}
