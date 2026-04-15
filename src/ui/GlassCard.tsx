import type { ReactNode } from 'react'
import styles from './GlassCard.module.css'

interface GlassCardProps {
  children: ReactNode
  className?: string
}

export const GlassCard = ({ children, className = '' }: GlassCardProps) => {
  return <section className={`${styles.card} ${className}`.trim()}>{children}</section>
}
