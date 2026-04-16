import { motion } from 'framer-motion'
import type { TimerViewProps } from '../../types'
import styles from './HourglassTimer.module.css'

export const HourglassTimer = ({ progress, status }: TimerViewProps) => {
  const isRunning = status === 'running'

  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <svg viewBox="0 0 100 160" className={styles.svg}>
          <rect x="20" y="4" width="60" height="6" rx="3" className={styles.bar} />
          <rect x="20" y="150" width="60" height="6" rx="3" className={styles.bar} />
          <path d="M28 10c0 25 22 25 22 40s-22 15-22 50M72 10c0 25-22 25-22 40s22 15 22 50" className={styles.frame} />

          <polygon
            points={`${50 - progress * 22},22 ${50 + progress * 22},22 50,68`}
            className={styles.topSand}
            style={{ opacity: 1 - progress * 0.7 }}
          />
          <polygon
            points={`${50 - progress * 22},138 ${50 + progress * 22},138 50,92`}
            className={styles.bottomSand}
            style={{ opacity: 0.3 + progress * 0.7 }}
          />
          <motion.line
            x1="50"
            y1="72"
            x2="50"
            y2="92"
            className={styles.stream}
            animate={isRunning ? { opacity: [1, 0.4, 1], y: [0, 2, 0] } : { opacity: 0.2, y: 0 }}
            transition={{ duration: 0.6, repeat: Infinity }}
          />
        </svg>
      </div>
    </div>
  )
}
