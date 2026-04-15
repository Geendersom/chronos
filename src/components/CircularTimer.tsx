import { motion } from 'framer-motion'
import type { TimerViewProps } from './types'
import { formatClock } from './types'
import styles from './CircularTimer.module.css'

const radius = 120
const circumference = 2 * Math.PI * radius

export const CircularTimer = ({ progress, remaining }: TimerViewProps) => {
  const { minutes, seconds } = formatClock(remaining)

  return (
    <div className={styles.wrap}>
      <svg viewBox="0 0 300 300" className={styles.svg}>
        <circle cx="150" cy="150" r={radius} className={styles.track} />
        <motion.circle
          cx="150"
          cy="150"
          r={radius}
          className={styles.progress}
          strokeDasharray={circumference}
          animate={{ strokeDashoffset: circumference * (1 - progress) }}
          transition={{ type: 'spring', stiffness: 120, damping: 28 }}
        />
      </svg>
      <div className={styles.content}>
        <span className={styles.minutes}>{minutes}</span>
        <span className={styles.seconds}>:{seconds}</span>
      </div>
    </div>
  )
}
