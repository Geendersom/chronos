import { motion } from 'framer-motion'
import type { TimerViewProps } from '../../types'
import { formatClock } from '../../types'
import styles from './PomodoroTimer.module.css'

export const PomodoroTimer = ({ progress, remaining }: TimerViewProps) => {
  const { minutes, seconds } = formatClock(remaining)

  return (
    <div className={styles.wrap}>
      <motion.div
        className={styles.tomato}
        animate={{ scale: [1, 1.03, 1], boxShadow: ['0 0 20px rgba(220, 38, 38, 0.4)', '0 0 36px rgba(239, 68, 68, 0.58)', '0 0 20px rgba(220, 38, 38, 0.4)'] }}
        transition={{ duration: 2.2, repeat: Number.POSITIVE_INFINITY, ease: 'easeInOut' }}
      >
        <span className={styles.leaf} />
      </motion.div>
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
