import { motion } from 'framer-motion'
import type { TimerViewProps } from './types'
import styles from './HourglassTimer.module.css'

export const HourglassTimer = ({ progress, status }: TimerViewProps) => {
  return (
    <div className={styles.wrap}>
      <div className={styles.glass}>
        <motion.div
          className={styles.sandTop}
          animate={{ scaleY: 1 - progress }}
          transition={{ type: 'spring', stiffness: 80, damping: 20 }}
        />

        <motion.div
          className={styles.stream}
          animate={{
            opacity: status === 'running' ? [0.6, 1, 0.6] : 0.2,
            y: status === 'running' ? [0, 4, 0] : 0,
          }}
          transition={{ duration: 0.7, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
        />

        <motion.div
          className={styles.sandBottom}
          animate={{ scaleY: progress }}
          transition={{ type: 'spring', stiffness: 80, damping: 20 }}
        />
      </div>
    </div>
  )
}
