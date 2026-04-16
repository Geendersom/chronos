import { motion } from 'framer-motion'
import { bellShakeAnimation, bellShakeTransition } from '../../../animations/bellShake'
import type { TimerViewProps } from '../../types'
import { formatClock } from '../../types'
import styles from './AlarmTimer.module.css'

export const AlarmTimer = ({ remaining, status }: TimerViewProps) => {
  const { minutes, seconds } = formatClock(remaining)
  const isRinging = status === 'finished'

  return (
    <div className={styles.wrap}>
      <motion.div
        className={styles.clock}
        animate={isRinging ? bellShakeAnimation.ringing : bellShakeAnimation.idle}
        transition={isRinging ? bellShakeTransition.ringing : bellShakeTransition.idle}
      >
        <span className={styles.bellLeft} />
        <span className={styles.bellRight} />
        <span className={styles.face}>
          {minutes}:{seconds}
        </span>
        <span className={styles.footLeft} />
        <span className={styles.footRight} />
      </motion.div>
      <p className={styles.label}>{isRinging ? 'ALARME ATIVO' : 'ALARME PRONTO'}</p>
    </div>
  )
}
