import { motion } from 'framer-motion'
import {
  getSandBottomAnimation,
  getSandStreamAnimation,
  getSandTopAnimation,
  sandSpring,
  sandStreamTransition,
} from '../../../animations/sandPhysics'
import type { TimerViewProps } from '../../types'
import styles from './HourglassTimer.module.css'

export const HourglassTimer = ({ progress, status }: TimerViewProps) => {
  const isRunning = status === 'running'

  return (
    <div className={styles.wrap}>
      <div className={styles.glass}>
        <motion.div className={styles.sandTop} animate={getSandTopAnimation(progress)} transition={sandSpring} />

        <motion.div
          className={styles.stream}
          animate={getSandStreamAnimation(isRunning)}
          transition={sandStreamTransition}
        />

        <motion.div
          className={styles.sandBottom}
          animate={getSandBottomAnimation(progress)}
          transition={sandSpring}
        />
      </div>
    </div>
  )
}
