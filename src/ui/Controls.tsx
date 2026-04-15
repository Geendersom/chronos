import { motion } from 'framer-motion'
import type { TimerStatus } from '../engine/TimerEngine'
import styles from './Controls.module.css'

interface ControlsProps {
  status: TimerStatus
  onReset: () => void
  onToggle: () => void
  onSound: () => void
}

export const Controls = ({ status, onReset, onToggle, onSound }: ControlsProps) => {
  const playLabel = status === 'running' ? 'Pausar' : 'Play'

  return (
    <div className={styles.controls}>
      <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className={styles.ghost} onClick={onReset}>
        Reset
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className={styles.primary}
        onClick={onToggle}
      >
        {playLabel}
      </motion.button>
      <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className={styles.ghost} onClick={onSound}>
        Som
      </motion.button>
    </div>
  )
}
