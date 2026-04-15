export type TimerStatus = 'idle' | 'running' | 'paused' | 'finished'

export interface TimerState {
  duration: number
  remainingTime: number
  progress: number
  startTimestamp: number | null
  pausedTimestamp: number | null
  status: TimerStatus
}

export type TimerAction =
  | { type: 'START'; now: number }
  | { type: 'PAUSE'; now: number }
  | { type: 'RESET' }
  | { type: 'SET_DURATION'; duration: number }
  | { type: 'TICK'; now: number }

const MIN_DURATION = 1000

const clamp = (value: number, min = 0, max = 1): number =>
  Math.min(max, Math.max(min, value))

const normalizeDuration = (duration: number): number => Math.max(MIN_DURATION, Math.floor(duration))

const getProgress = (duration: number, remainingTime: number): number =>
  clamp((duration - remainingTime) / duration)

export const createInitialTimerState = (duration: number): TimerState => {
  const normalizedDuration = normalizeDuration(duration)

  return {
    duration: normalizedDuration,
    remainingTime: normalizedDuration,
    progress: 0,
    startTimestamp: null,
    pausedTimestamp: null,
    status: 'idle',
  }
}

export const timerReducer = (state: TimerState, action: TimerAction): TimerState => {
  switch (action.type) {
    case 'START': {
      if (state.status === 'running') {
        return state
      }

      const elapsed = state.duration - state.remainingTime

      return {
        ...state,
        status: 'running',
        pausedTimestamp: null,
        startTimestamp: action.now - elapsed,
      }
    }
    case 'PAUSE': {
      if (state.status !== 'running') {
        return state
      }

      return {
        ...state,
        status: 'paused',
        pausedTimestamp: action.now,
      }
    }
    case 'RESET': {
      return {
        ...state,
        remainingTime: state.duration,
        progress: 0,
        startTimestamp: null,
        pausedTimestamp: null,
        status: 'idle',
      }
    }
    case 'SET_DURATION': {
      const nextDuration = normalizeDuration(action.duration)

      return {
        duration: nextDuration,
        remainingTime: nextDuration,
        progress: 0,
        startTimestamp: null,
        pausedTimestamp: null,
        status: 'idle',
      }
    }
    case 'TICK': {
      if (state.status !== 'running' || state.startTimestamp === null) {
        return state
      }

      const elapsed = action.now - state.startTimestamp
      const remainingTime = Math.max(0, state.duration - elapsed)
      const progress = getProgress(state.duration, remainingTime)

      if (remainingTime <= 0) {
        return {
          ...state,
          remainingTime: 0,
          progress: 1,
          pausedTimestamp: action.now,
          status: 'finished',
        }
      }

      return {
        ...state,
        remainingTime,
        progress,
      }
    }
    default:
      return state
  }
}
