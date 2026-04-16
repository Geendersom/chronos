import { motion } from 'framer-motion'
import { Sidebar } from './Sidebar'
import type { TimerKind, TimerOption } from './types'
import styles from './ClockSelector.module.css'

interface ClockSelectorProps {
  items: TimerOption[]
  selected: TimerKind
  onSelect: (kind: TimerKind) => void
}

export const ClockSelector = ({ items, selected, onSelect }: ClockSelectorProps) => {
  const renderIcon = (type: TimerKind) => {
    if (type === 'digital') {
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <circle cx="12" cy="13" r="8" />
          <path d="M12 9v4l2.5 2.5" strokeLinecap="round" />
          <path d="M9 2h6M12 2v3" strokeLinecap="round" />
          <path d="M19 5l1.5-1.5" strokeLinecap="round" />
        </svg>
      )
    }

    if (type === 'circular') {
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
          <path d="M12 3a9 9 0 0 1 9 9" stroke="var(--accent-blue)" strokeWidth="2" strokeLinecap="round" />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
        </svg>
      )
    }

    if (type === 'analog') {
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <circle cx="12" cy="12" r="9" />
          <line x1="12" y1="7" x2="12" y2="12" strokeLinecap="round" strokeWidth="2" />
          <line x1="12" y1="12" x2="15.5" y2="13.5" strokeLinecap="round" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
          <line x1="12" y1="4" x2="12" y2="5" strokeWidth="2" />
          <line x1="12" y1="19" x2="12" y2="20" strokeWidth="2" />
          <line x1="4" y1="12" x2="5" y2="12" strokeWidth="2" />
          <line x1="19" y1="12" x2="20" y2="12" strokeWidth="2" />
        </svg>
      )
    }

    if (type === 'hourglass') {
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <path d="M5 3h14M5 21h14" strokeLinecap="round" strokeWidth="2" />
          <path d="M6 3c0 5 6 6 6 9s-6 4-6 9" strokeLinecap="round" />
          <path d="M18 3c0 5-6 6-6 9s6 4 6 9" strokeLinecap="round" />
          <path d="M9 15.5c1-0.5 2-0.7 3-0.5s2 0.5 3 0.5" strokeLinecap="round" opacity="0.5" />
        </svg>
      )
    }

    if (type === 'alarm') {
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <circle cx="12" cy="13" r="7" />
          <path d="M12 10v3l2 2" strokeLinecap="round" />
          <path d="M5 6.5 3.5 5M19 6.5 20.5 5" strokeLinecap="round" strokeWidth="2" />
          <path d="M9 20.5l-1 2M15 20.5l1 2" strokeLinecap="round" />
        </svg>
      )
    }

    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="12" cy="13" r="8" fill="#ef4444" opacity="0.9" />
        <path d="M12 5v-2M10 4c0-1 4-2 4 0" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path
          d="M9 11 Q12 9 15 11"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    )
  }

  return (
    <Sidebar title="TIPO DE TIMER">
      <div className={styles.list}>
        {items.map((item) => {
          const isSelected = item.id === selected
          return (
            <motion.button
              key={item.id}
              type="button"
              className={`${styles.item} ${isSelected ? styles.selected : ''}`}
              onClick={() => onSelect(item.id)}
              whileHover={{ x: 4, y: -1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 18 }}
            >
              {isSelected && <motion.span layoutId="activeSidebar" className={styles.activeBg} />}
              <span className={styles.iconWrap}>{renderIcon(item.id)}</span>
              <span className={styles.label}>{item.label}</span>
            </motion.button>
          )
        })}
      </div>
    </Sidebar>
  )
}
