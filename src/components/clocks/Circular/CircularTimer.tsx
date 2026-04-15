import { motion } from 'framer-motion'
import { getProgressOffset, progressRingTransition } from '../../../animations/progressRing'
import type { TimerViewProps } from '../../types'
import { formatClock } from '../../types'
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
          animate={{ strokeDashoffset: getProgressOffset(circumference, progress) }}
          transition={progressRingTransition}
        />
      </svg>
      <div className={styles.content}>
        <span className={styles.minutes}>{minutes}</span>
        <span className={styles.seconds}>:{seconds}</span>
      </div>
    </div>
  )
}
