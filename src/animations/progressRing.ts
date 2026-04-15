import type { Transition } from 'framer-motion'

export const progressRingTransition: Transition = {
  type: 'spring',
  stiffness: 120,
  damping: 28,
}

export const getProgressOffset = (circumference: number, progress: number): number =>
  circumference * (1 - progress)
