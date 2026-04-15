import { motion } from 'framer-motion'
import type { TimerViewProps } from './types'
import { formatClock } from './types'
import styles from './AlarmTimer.module.css'

export const AlarmTimer = ({ remaining, status }: TimerViewProps) => {
  const { minutes, seconds } = formatClock(remaining)
  const isRinging = status === 'finished'

  return (
    <div className={styles.wrap}>
      <motion.div
        className={styles.clock}
        animate={isRinging ? { rotate: [-6, 6, -6] } : { rotate: 0 }}
        transition={isRinging ? { duration: 0.2, repeat: Number.POSITIVE_INFINITY } : { duration: 0.3 }}
      >
        <span className={styles.bellLeft} />
        <span className={styles.bellRight} />
        <span className={styles.face}>
          {minutes}:{seconds}
        </span>
      </motion.div>
      <p className={styles.label}>{isRinging ? 'ALARME ATIVO' : 'ALARME PRONTO'}</p>
    </div>
  )
}
