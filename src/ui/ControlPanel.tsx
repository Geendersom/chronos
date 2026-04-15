import type { SoundType } from '../audio/alarm'
import type { TimerStatus } from '../core/timeEngine'
import { Controls } from './Controls'
import { TimeConfigurator } from './TimeConfigurator'
import styles from './ControlPanel.module.css'

interface ControlPanelProps {
  status: TimerStatus
  duration: number
  sound: SoundType
  onReset: () => void
  onToggle: () => void
  onSound: () => void
  onChangeDuration: (duration: number) => void
  onSoundChange: (sound: SoundType) => void
}

export const ControlPanel = ({
  status,
  duration,
  sound,
  onReset,
  onToggle,
  onSound,
  onChangeDuration,
  onSoundChange,
}: ControlPanelProps) => {
  return (
    <div className={styles.panel}>
      <Controls status={status} onReset={onReset} onToggle={onToggle} onSound={onSound} />
      <TimeConfigurator
        duration={duration}
        sound={sound}
        onChangeDuration={onChangeDuration}
        onSoundChange={onSoundChange}
      />
    </div>
  )
}
