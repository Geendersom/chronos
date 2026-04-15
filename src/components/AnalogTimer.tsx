import { motion } from 'framer-motion'
import type { TimerViewProps } from './types'
import styles from './AnalogTimer.module.css'

export const AnalogTimer = ({ remaining, progress }: TimerViewProps) => {
  const elapsedSeconds = progress * 3600
  const secondAngle = (elapsedSeconds % 60) * 6
  const minuteAngle = ((elapsedSeconds / 60) % 60) * 6

  return (
    <div className={styles.clock}>
      <div className={styles.face}>
        {Array.from({ length: 12 }).map((_, idx) => (
          <span
            key={idx}
            className={styles.tick}
            style={{ transform: `rotate(${idx * 30}deg) translateY(-128px)` }}
          />
        ))}

        <motion.div
          className={styles.minuteHand}
          animate={{ rotate: minuteAngle }}
          transition={{ type: 'spring', stiffness: 80, damping: 16 }}
        />
        <motion.div
          className={styles.secondHand}
          animate={{ rotate: secondAngle }}
          transition={{ type: 'spring', stiffness: 110, damping: 18 }}
        />
        <span className={styles.center} />
      </div>
      <p className={styles.label}>{Math.ceil(remaining / 1000)} s</p>
    </div>
  )
}
