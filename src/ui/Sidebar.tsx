import { motion } from 'framer-motion'
import type { TimerKind, TimerOption } from './types'
import styles from './Sidebar.module.css'

interface SidebarProps {
  items: TimerOption[]
  selected: TimerKind
  onSelect: (kind: TimerKind) => void
}

export const Sidebar = ({ items, selected, onSelect }: SidebarProps) => {
  return (
    <aside className={styles.sidebar}>
      <p className={styles.title}>TIPO DE TIMER</p>
      <div className={styles.list}>
        {items.map((item) => {
          const isSelected = item.id === selected
          return (
            <motion.button
              key={item.id}
              type="button"
              className={`${styles.item} ${isSelected ? styles.selected : ''}`}
              onClick={() => onSelect(item.id)}
              whileHover={{ x: 4 }}
              transition={{ type: 'spring', stiffness: 260, damping: 18 }}
            >
              {isSelected && <motion.span layoutId="activeSidebar" className={styles.activeBg} />}
              <span className={styles.icon}>{item.icon}</span>
              <span className={styles.label}>{item.label}</span>
            </motion.button>
          )
        })}
      </div>
    </aside>
  )
}
