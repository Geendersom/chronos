import { useCallback, useEffect, useReducer, useRef } from 'react'
import { createInitialTimerState, timerReducer, type TimerStatus } from '../core/timeEngine'

interface UseTimerApi {
  remaining: number
  progress: number
  status: TimerStatus
  duration: number
  start: () => void
  pause: () => void
  reset: () => void
  setDuration: (duration: number) => void
}

export const useTimer = (initialDuration = 20 * 60 * 1000): UseTimerApi => {
  const [state, dispatch] = useReducer(timerReducer, createInitialTimerState(initialDuration))
  const frameRef = useRef<number | null>(null)
  const stateRef = useRef(state)

  useEffect(() => {
    stateRef.current = state
  }, [state])

  useEffect(() => {
    const tick = (now: number): void => {
      dispatch({ type: 'TICK', now })

      if (stateRef.current.status === 'running') {
        frameRef.current = requestAnimationFrame(tick)
      }
    }

    if (state.status === 'running') {
      frameRef.current = requestAnimationFrame(tick)
    } else if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current)
      frameRef.current = null
    }

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current)
        frameRef.current = null
      }
    }
  }, [state.status])

  const start = useCallback(() => {
    dispatch({ type: 'START', now: performance.now() })
  }, [])

  const pause = useCallback(() => {
    dispatch({ type: 'PAUSE', now: performance.now() })
  }, [])

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' })
  }, [])

  const setDuration = useCallback((duration: number) => {
    dispatch({ type: 'SET_DURATION', duration })
  }, [])

  return {
    remaining: state.remainingTime,
    progress: state.progress,
    status: state.status,
    duration: state.duration,
    start,
    pause,
    reset,
    setDuration,
  }
}
