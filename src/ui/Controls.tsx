import { AnimatePresence, motion } from 'framer-motion'
import type { TimerStatus } from '../core/timeEngine'
import styles from './Controls.module.css'

interface ControlsProps {
  status: TimerStatus
  onReset: () => void
  onToggle: () => void
  onSound: () => void
}

export const Controls = ({ status, onReset, onToggle, onSound }: ControlsProps) => {
  const isRunning = status === 'running'

  return (
    <div className={styles.controls}>
      <motion.button
        type="button"
        className={styles.iconBtn}
        onClick={onReset}
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.96 }}
        aria-label="Resetar timer"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
          <path d="M20 11a8 8 0 1 1-2.34-5.65" strokeLinecap="round" />
          <path d="M20 4v5h-5" strokeLinecap="round" />
        </svg>
      </motion.button>

      <motion.button
        type="button"
        className={styles.playBtn}
        onClick={onToggle}
        whileHover={{ scale: 0.97 }}
        whileTap={{ scale: 0.94 }}
        aria-label={isRunning ? 'Pausar timer' : 'Iniciar timer'}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isRunning ? (
            <motion.svg
              key="pause"
              viewBox="0 0 24 24"
              fill="none"
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.75 }}
              transition={{ duration: 0.16 }}
              aria-hidden
            >
              <rect x="7" y="6" width="3.6" height="12" rx="1" fill="currentColor" />
              <rect x="13.4" y="6" width="3.6" height="12" rx="1" fill="currentColor" />
            </motion.svg>
          ) : (
            <motion.svg
              key="play"
              viewBox="0 0 24 24"
              fill="none"
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.75 }}
              transition={{ duration: 0.16 }}
              aria-hidden
            >
              <path d="M9 7.2v9.6a.8.8 0 0 0 1.25.66l7.2-4.8a.8.8 0 0 0 0-1.32l-7.2-4.8A.8.8 0 0 0 9 7.2Z" fill="currentColor" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>

      <motion.button
        type="button"
        className={styles.iconBtn}
        onClick={onSound}
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.96 }}
        aria-label="Tocar som"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
          <path d="M5 10v4h3l4 3V7l-4 3H5Z" strokeLinejoin="round" />
          <path d="M16 9a4 4 0 0 1 0 6" strokeLinecap="round" />
          <path d="M18.5 6.5a7.5 7.5 0 0 1 0 11" strokeLinecap="round" />
        </svg>
      </motion.button>
    </div>
  )
}
