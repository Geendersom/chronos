type SoundType = 'bell' | 'beep' | 'chime' | 'vibrate'
type AudioName = Exclude<SoundType, 'vibrate'> | 'click'

const soundAssets = import.meta.glob('../assets/audio/*.{mp3,wav,ogg}', {
  eager: true,
  import: 'default',
}) as Record<string, string>

const audioCache = new Map<string, HTMLAudioElement>()
let audioContextRef: AudioContext | null = null

const getAudioContext = (): AudioContext | null => {
  if (audioContextRef) return audioContextRef

  const Context =
    window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext

  if (!Context) return null
  audioContextRef = new Context()
  return audioContextRef
}

const resolveSoundUrl = (sound: AudioName): string | null => {
  const normalized = `/${sound}.`
  const entry = Object.entries(soundAssets).find(([key]) => key.includes(normalized))
  return entry?.[1] ?? null
}

const getAudioElement = (src: string): HTMLAudioElement => {
  const cached = audioCache.get(src)
  if (cached) return cached

  const audio = new Audio(src)
  audio.preload = 'auto'
  audioCache.set(src, audio)
  return audio
}

const playFromAsset = async (sound: AudioName, volume: number): Promise<boolean> => {
  const src = resolveSoundUrl(sound)
  if (!src) return false

  const audio = getAudioElement(src)
  audio.volume = volume
  audio.currentTime = 0

  try {
    await audio.play()
    return true
  } catch {
    return false
  }
}

const createTone = (
  context: AudioContext,
  frequency: number,
  duration: number,
  startAt: number,
  type: OscillatorType = 'sine',
  peakGain = 0.24,
): void => {
  const oscillator = context.createOscillator()
  const gainNode = context.createGain()

  oscillator.type = type
  oscillator.frequency.setValueAtTime(frequency, startAt)
  gainNode.gain.setValueAtTime(0.0001, startAt)
  gainNode.gain.exponentialRampToValueAtTime(peakGain, startAt + 0.015)
  gainNode.gain.exponentialRampToValueAtTime(0.0001, startAt + duration)

  oscillator.connect(gainNode)
  gainNode.connect(context.destination)

  oscillator.start(startAt)
  oscillator.stop(startAt + duration)
}

const playClickSynth = (): void => {
  const context = getAudioContext()
  if (!context) return
  const now = context.currentTime
  createTone(context, 720, 0.06, now, 'triangle', 0.09)
}

const playBellSynth = (): void => {
  const context = getAudioContext()
  if (!context) return
  const now = context.currentTime
  createTone(context, 880, 0.5, now, 'triangle')
  createTone(context, 1320, 0.32, now + 0.1, 'sine')
  createTone(context, 1760, 0.18, now + 0.18, 'sine')
}

const playBeepSynth = (): void => {
  const context = getAudioContext()
  if (!context) return
  const now = context.currentTime
  createTone(context, 980, 0.14, now, 'square')
  createTone(context, 980, 0.14, now + 0.2, 'square')
}

const playChimeSynth = (): void => {
  const context = getAudioContext()
  if (!context) return
  const now = context.currentTime
  createTone(context, 523.25, 0.3, now, 'sine')
  createTone(context, 659.25, 0.3, now + 0.16, 'sine')
  createTone(context, 783.99, 0.5, now + 0.32, 'sine')
}

export const playClickSound = async (): Promise<void> => {
  const played = await playFromAsset('click', 0.35)
  if (!played) playClickSynth()
}

export const playSelectedSound = async (sound: SoundType): Promise<void> => {
  if (sound === 'vibrate') {
    if ('vibrate' in navigator) navigator.vibrate([120, 40, 120])
    return
  }

  const played = await playFromAsset(sound, 0.75)
  if (played) return

  if (sound === 'bell') playBellSynth()
  if (sound === 'beep') playBeepSynth()
  if (sound === 'chime') playChimeSynth()
}

// Compatibilidade com o restante do app.
export const playSound = playSelectedSound

export type { SoundType }
