import { useEffect, useMemo, useState } from 'react'
import type { TimerViewProps } from '../../types'
import styles from './AnalogTimer.module.css'

export const AnalogTimer = ({ remaining, progress, status }: TimerViewProps) => {
  const elapsedSeconds = progress * 3600
  const timerSecondAngle = (elapsedSeconds % 60) * 6
  const timerMinuteAngle = ((elapsedSeconds / 60) % 60) * 6
  const timerHourAngle = timerMinuteAngle / 12
  const [viewMode, setViewMode] = useState<'2d' | '3d'>('2d')
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  const liveSecondAngle = now.getSeconds() * 6
  const liveMinuteAngle = (now.getMinutes() + now.getSeconds() / 60) * 6
  const liveHourAngle = ((now.getHours() % 12) + now.getMinutes() / 60) * 30

  const angles = status === 'idle'
    ? { second: liveSecondAngle, minute: liveMinuteAngle, hour: liveHourAngle }
    : { second: timerSecondAngle, minute: timerMinuteAngle, hour: timerHourAngle }

  const timeLabel = useMemo(() => `${Math.ceil(remaining / 1000)} s`, [remaining])
  const hourMarks = Array.from({ length: 12 }, (_, index) => index)
  const minuteMarks = Array.from({ length: 60 }, (_, index) => index)

  return (
    <div className={styles.clock}>
      <div className={styles.switch}>
        <button
          type="button"
          className={viewMode === '2d' ? styles.active : ''}
          onClick={() => setViewMode('2d')}
        >
          2D Realista
        </button>
        <button
          type="button"
          className={viewMode === '3d' ? styles.active : ''}
          onClick={() => setViewMode('3d')}
        >
          3D
        </button>
      </div>

      <svg viewBox="0 0 220 220" className={`${styles.face} ${viewMode === '3d' ? styles.face3d : ''}`}>
        <circle cx="110" cy="110" r="104" className={styles.outer} />
        <circle cx="110" cy="110" r="96" className={styles.inner} />

        {minuteMarks.map((mark) => {
          const angle = (mark * Math.PI * 2) / 60
          const x1 = 110 + Math.cos(angle) * 88
          const y1 = 110 + Math.sin(angle) * 88
          const x2 = 110 + Math.cos(angle) * 92
          const y2 = 110 + Math.sin(angle) * 92
          return <line key={`m-${mark}`} x1={x1} y1={y1} x2={x2} y2={y2} className={styles.minuteMark} />
        })}

        {hourMarks.map((mark) => {
          const angle = (mark * Math.PI * 2) / 12
          const x1 = 110 + Math.cos(angle) * 78
          const y1 = 110 + Math.sin(angle) * 78
          const x2 = 110 + Math.cos(angle) * 92
          const y2 = 110 + Math.sin(angle) * 92
          const isQuarter = mark % 3 === 0
          return (
            <line
              key={`h-${mark}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              className={isQuarter ? styles.hourMarkStrong : styles.hourMark}
            />
          )
        })}

        <line
          x1="110"
          y1="110"
          x2="110"
          y2="60"
          className={styles.hourHand}
          style={{ transform: `rotate(${angles.hour}deg)` }}
        />
        <line
          x1="110"
          y1="110"
          x2="110"
          y2="42"
          className={styles.minuteHand}
          style={{ transform: `rotate(${angles.minute}deg)` }}
        />
        <line
          x1="110"
          y1="125"
          x2="110"
          y2="30"
          className={styles.secondHand}
          style={{ transform: `rotate(${angles.second}deg)` }}
        />
        <circle cx="110" cy="110" r="6" className={styles.pivot} />
      </svg>

      <p className={styles.label}>{timeLabel}</p>
    </div>
  )
}
