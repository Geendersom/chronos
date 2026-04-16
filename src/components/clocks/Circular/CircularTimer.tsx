import { motion } from 'framer-motion'
import { getProgressOffset, progressRingTransition } from '../../../animations/progressRing'
import type { TimerViewProps } from '../../types'
import { formatClock } from '../../types'
import styles from './CircularTimer.module.css'

const radius = 90
const circumference = 2 * Math.PI * radius

export const CircularTimer = ({ progress, remaining }: TimerViewProps) => {
  const { minutes, seconds } = formatClock(remaining)

  return (
    <div className={styles.wrap}>
      <svg viewBox="0 0 200 200" className={styles.svg}>
        <defs>
          <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
          <filter id="ringGlow">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>
        <circle cx="100" cy="100" r={radius} className={styles.track} />
        <motion.circle
          cx="100"
          cy="100"
          r={radius}
          className={styles.glow}
          strokeDasharray={circumference}
          animate={{ strokeDashoffset: getProgressOffset(circumference, progress) }}
          transition={progressRingTransition}
        />
        <motion.g animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}>
          <motion.circle
            cx="100"
            cy="100"
            r={radius}
            className={styles.progress}
            strokeDasharray={circumference}
            animate={{ strokeDashoffset: getProgressOffset(circumference, progress) }}
            transition={progressRingTransition}
          />
        </motion.g>
      </svg>
      <div className={styles.content}>
        <span className={styles.minutes}>{minutes}</span>
        <span className={styles.seconds}>:{seconds}</span>
        <span className={styles.label}>restante</span>
      </div>
    </div>
  )
}
