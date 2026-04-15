import type { ReactNode } from 'react'
import styles from './Sidebar.module.css'

interface SidebarProps {
  title: string
  children: ReactNode
}

export const Sidebar = ({ title, children }: SidebarProps) => {
  return (
    <aside className={styles.sidebar}>
      <p className={styles.title}>{title}</p>
      {children}
    </aside>
  )
}
