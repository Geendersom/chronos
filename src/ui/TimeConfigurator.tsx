import { motion } from 'framer-motion'
import type { SoundType } from '../audio/alarm'
import styles from './TimeConfigurator.module.css'

interface TimeConfiguratorProps {
  duration: number
  sound: SoundType
  onChangeDuration: (duration: number) => void
  onSoundChange: (sound: SoundType) => void
}

const presets = [
  { label: '5 min', value: 5 * 60 * 1000 },
  { label: '25 min', value: 25 * 60 * 1000 },
  { label: '45 min', value: 45 * 60 * 1000 },
  { label: '1 hora', value: 60 * 60 * 1000 },
  { label: '1.5 h', value: 90 * 60 * 1000 },
]

const soundOptions: SoundType[] = ['bell', 'beep', 'chime', 'vibrate']

const normalizeTime = (duration: number): { hours: number; minutes: number } => {
  const totalMinutes = Math.max(1, Math.floor(duration / 60000))
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  return { hours, minutes }
}

export const TimeConfigurator = ({
  duration,
  sound,
  onChangeDuration,
  onSoundChange,
}: TimeConfiguratorProps) => {
  const { hours, minutes } = normalizeTime(duration)

  const update = (nextHours: number, nextMinutes: number): void => {
    const totalMinutes = Math.max(1, nextHours * 60 + nextMinutes)
    onChangeDuration(totalMinutes * 60 * 1000)
  }

  return (
    <aside className={styles.panel}>
      <h3>CONFIGURAR TEMPO</h3>

      <div className={styles.row}>
        <span>Horas</span>
        <div className={styles.stepper}>
          <button type="button" onClick={() => update(Math.max(0, hours - 1), minutes)}>
            -
          </button>
          <strong>{hours}</strong>
          <button type="button" onClick={() => update(hours + 1, minutes)}>
            +
          </button>
        </div>
      </div>

      <div className={styles.row}>
        <span>Minutos</span>
        <div className={styles.stepper}>
          <button type="button" onClick={() => update(hours, Math.max(0, minutes - 1))}>
            -
          </button>
          <strong>{minutes}</strong>
          <button type="button" onClick={() => update(hours, Math.min(59, minutes + 1))}>
            +
          </button>
        </div>
      </div>

      <div className={styles.section}>
        <p>Presets rapidos</p>
        <div className={styles.presetGrid}>
          {presets.map((preset) => (
            <motion.button
              key={preset.label}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() => onChangeDuration(preset.value)}
            >
              {preset.label}
            </motion.button>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <p>Sinal sonoro</p>
        <div className={styles.soundList}>
          {soundOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => onSoundChange(option)}
              className={sound === option ? styles.active : ''}
            >
              {option === 'vibrate' ? 'Vibrar' : option[0].toUpperCase() + option.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </aside>
  )
}
