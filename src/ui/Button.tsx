import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import styles from './Button.module.css'

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: 'ghost' | 'primary'
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

export const Button = ({
  children,
  onClick,
  variant = 'ghost',
  className = '',
  type = 'button',
}: ButtonProps) => {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      whileHover={variant === 'primary' ? { scale: 1.03 } : { y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`${styles.button} ${variant === 'primary' ? styles.primary : styles.ghost} ${className}`.trim()}
    >
      {children}
    </motion.button>
  )
}
