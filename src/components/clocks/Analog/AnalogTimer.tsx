import { lazy, Suspense, useMemo, useState } from 'react'
import type { TimerViewProps } from '../../types'
import { AnalogWatchRealistic } from './AnalogWatchRealistic'
import styles from './AnalogTimer.module.css'

const AnalogWatch3D = lazy(() =>
  import('./AnalogWatch3D').then((module) => ({ default: module.AnalogWatch3D })),
)

export const AnalogTimer = ({ remaining, progress }: TimerViewProps) => {
  const elapsedSeconds = progress * 3600
  const secondAngle = (elapsedSeconds % 60) * 6
  const minuteAngle = ((elapsedSeconds / 60) % 60) * 6
  const [viewMode, setViewMode] = useState<'2d' | '3d'>('2d')

  const timeLabel = useMemo(() => `${Math.ceil(remaining / 1000)} s`, [remaining])

  return (
    <div className={styles.clock}>
      <div className={styles.switch}>
        <button
          type="button"
          className={viewMode === '2d' ? styles.active : ''}
          onClick={() => setViewMode('2d')}
        >
          2D Realista
        </button>
        <button
          type="button"
          className={viewMode === '3d' ? styles.active : ''}
          onClick={() => setViewMode('3d')}
        >
          3D
        </button>
      </div>

      {viewMode === '2d' ? (
        <AnalogWatchRealistic minuteAngle={minuteAngle} secondAngle={secondAngle} />
      ) : (
        <Suspense fallback={<div className={styles.loading3d}>Carregando relogio 3D...</div>}>
          <AnalogWatch3D minuteAngle={minuteAngle} secondAngle={secondAngle} />
        </Suspense>
      )}

      <p className={styles.label}>{timeLabel}</p>
    </div>
  )
}
