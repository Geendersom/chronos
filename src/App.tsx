import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { playClickSound, playSelectedSound, type SoundType } from './audio/alarm'
import { AlarmTimer } from './components/clocks/Alarm/AlarmTimer'
import { AnalogTimer } from './components/clocks/Analog/AnalogTimer'
import { CircularTimer } from './components/clocks/Circular/CircularTimer'
import { DigitalTimer } from './components/clocks/Digital/DigitalTimer'
import { HourglassTimer } from './components/clocks/Hourglass/HourglassTimer'
import { PomodoroTimer } from './components/clocks/Pomodoro/PomodoroTimer'
import { useTimer } from './hooks/useTimer'
import { ClockSelector } from './layout/ClockSelector'
import { TopBar } from './layout/TopBar'
import type { TimerKind, TimerOption } from './layout/types'
import { ControlPanel } from './ui/ControlPanel'
import { GlassCard } from './ui/GlassCard'
import styles from './App.module.css'

const timerOptions: TimerOption[] = [
  { id: 'digital', label: 'Cronometro digital', title: 'CRONOMETRO DIGITAL' },
  { id: 'circular', label: 'Timer circular', title: 'TIMER CIRCULAR' },
  { id: 'analog', label: 'Relogio analogico', title: 'RELOGIO ANALOGICO' },
  { id: 'hourglass', label: 'Ampulheta', title: 'AMPULHETA' },
  { id: 'alarm', label: 'Despertador', title: 'DESPERTADOR' },
  { id: 'pomodoro', label: 'Pomodoro', title: 'POMODORO' },
]

const App = () => {
  const [selectedTimer, setSelectedTimer] = useState<TimerKind>('digital')
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [sound, setSound] = useState<SoundType>('bell')
  const { remaining, progress, status, duration, start, pause, reset, setDuration } = useTimer(20 * 60 * 1000)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    if (status === 'finished') playSelectedSound(sound)
  }, [status, sound])

  const activeTitle = useMemo(
    () => timerOptions.find((timer) => timer.id === selectedTimer)?.title ?? 'CRONOMETRO DIGITAL',
    [selectedTimer],
  )

  const renderTimer = () => {
    const props = { remaining, progress, status }
    if (selectedTimer === 'circular') return <CircularTimer {...props} />
    if (selectedTimer === 'analog') return <AnalogTimer {...props} />
    if (selectedTimer === 'hourglass') return <HourglassTimer {...props} />
    if (selectedTimer === 'alarm') return <AlarmTimer {...props} />
    if (selectedTimer === 'pomodoro') return <PomodoroTimer {...props} />
    return <DigitalTimer {...props} />
  }

  const handleTimerSelection = (timer: TimerKind): void => {
    if (timer === selectedTimer) return
    playClickSound()
    setSelectedTimer(timer)
  }

  const handleToggle = (): void => {
    playClickSound()
    if (status === 'running') pause()
    else start()
  }

  const handleReset = (): void => {
    playClickSound()
    reset()
  }

  const handleDurationChange = (nextDuration: number): void => {
    playClickSound()
    setDuration(nextDuration)
  }

  const handleSoundChange = (nextSound: SoundType): void => {
    if (nextSound !== sound) {
      playSelectedSound(nextSound)
    }
    setSound(nextSound)
  }

  return (
    <div className={styles.app}>
      <TopBar theme={theme} onThemeChange={setTheme} />

      <div className={styles.content}>
        <ClockSelector items={timerOptions} selected={selectedTimer} onSelect={handleTimerSelection} />

        <main className={styles.main}>
          <GlassCard className={styles.timerCard}>
            <p className={styles.timerTitle}>{activeTitle}</p>

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedTimer}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ type: 'spring', stiffness: 200, damping: 22 }}
                className={styles.timerView}
              >
                {renderTimer()}
              </motion.div>
            </AnimatePresence>

            <ControlPanel
              status={status}
              duration={duration}
              sound={sound}
              onReset={handleReset}
              onToggle={handleToggle}
              onSound={() => playSelectedSound(sound)}
              onChangeDuration={handleDurationChange}
              onSoundChange={handleSoundChange}
            />
          </GlassCard>
        </main>
      </div>
    </div>
  )
}

export default App
