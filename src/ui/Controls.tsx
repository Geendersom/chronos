import type { TimerStatus } from '../core/timeEngine'
import { Button } from './Button'
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
      <Button onClick={onReset}>Reset</Button>
      <Button variant="primary" onClick={onToggle}>
        {playLabel}
      </Button>
      <Button onClick={onSound}>Som</Button>
    </div>
  )
}
