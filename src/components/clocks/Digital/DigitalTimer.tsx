import { AnimatePresence, motion } from 'framer-motion'
import type { TimerViewProps } from '../../types'
import { formatClockPrecise } from '../../types'
import styles from './DigitalTimer.module.css'

const statusMap = {
  idle: 'PRONTO',
  running: 'RODANDO',
  paused: 'PAUSADO',
  finished: 'FINALIZADO',
} as const

export const DigitalTimer = ({ remaining, status }: TimerViewProps) => {
  const { minutes, seconds, centiseconds } = formatClockPrecise(remaining)
  const timeKey = `${minutes}:${seconds}:${centiseconds}`

  return (
    <div className={styles.wrap}>
      <AnimatePresence mode="popLayout">
        <motion.div
          key={timeKey}
          className={styles.time}
          initial={{ y: 18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -18, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 280, damping: 26 }}
        >
          <span className={styles.minutes}>{minutes}</span>
          <span className={styles.separator}>:</span>
          <span className={styles.seconds}>{seconds}</span>
          <span className={styles.milliseconds}>.{centiseconds}</span>
        </motion.div>
      </AnimatePresence>

      <div className={styles.status}>
        <span className={`${styles.dot} ${status === 'running' ? styles.running : ''}`} />
        <span>{statusMap[status]}</span>
      </div>
    </div>
  )
}
