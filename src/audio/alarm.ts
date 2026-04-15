type SoundType = 'bell' | 'beep' | 'chime' | 'vibrate'

const getAudioContext = (): AudioContext | null => {
  const Context = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
  return Context ? new Context() : null
}

const createTone = (
  context: AudioContext,
  frequency: number,
  duration: number,
  startAt: number,
  type: OscillatorType = 'sine',
): void => {
  const oscillator = context.createOscillator()
  const gainNode = context.createGain()

  oscillator.type = type
  oscillator.frequency.setValueAtTime(frequency, startAt)
  gainNode.gain.setValueAtTime(0.0001, startAt)
  gainNode.gain.exponentialRampToValueAtTime(0.28, startAt + 0.02)
  gainNode.gain.exponentialRampToValueAtTime(0.0001, startAt + duration)

  oscillator.connect(gainNode)
  gainNode.connect(context.destination)

  oscillator.start(startAt)
  oscillator.stop(startAt + duration)
}

export const playBell = async (): Promise<void> => {
  const context = getAudioContext()
  if (!context) return

  const now = context.currentTime
  createTone(context, 880, 0.5, now, 'triangle')
  createTone(context, 1320, 0.32, now + 0.1, 'sine')
  createTone(context, 1760, 0.18, now + 0.18, 'sine')
}

export const playBeep = async (): Promise<void> => {
  const context = getAudioContext()
  if (!context) return

  const now = context.currentTime
  createTone(context, 980, 0.14, now, 'square')
  createTone(context, 980, 0.14, now + 0.2, 'square')
}

export const playChime = async (): Promise<void> => {
  const context = getAudioContext()
  if (!context) return

  const now = context.currentTime
  createTone(context, 523.25, 0.3, now, 'sine')
  createTone(context, 659.25, 0.3, now + 0.16, 'sine')
  createTone(context, 783.99, 0.5, now + 0.32, 'sine')
}

export const playSound = async (sound: SoundType): Promise<void> => {
  if (sound === 'vibrate') {
    if ('vibrate' in navigator) navigator.vibrate([120, 40, 120])
    return
  }

  if (sound === 'bell') await playBell()
  if (sound === 'beep') await playBeep()
  if (sound === 'chime') await playChime()
}

export type { SoundType }
