import { motion } from 'framer-motion'
import type { TimerViewProps } from './types'
import { formatClock } from './types'
import styles from './PomodoroTimer.module.css'

export const PomodoroTimer = ({ progress, remaining }: TimerViewProps) => {
  const { minutes, seconds } = formatClock(remaining)

  return (
    <div className={styles.wrap}>
      <div className={styles.tomato}>
        <span className={styles.leaf} />
      </div>
      <p className={styles.time}>
        {minutes}:{seconds}
      </p>
      <div className={styles.barTrack}>
        <motion.div
          className={styles.barFill}
          animate={{ width: `${progress * 100}%` }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        />
      </div>
    </div>
  )
}
