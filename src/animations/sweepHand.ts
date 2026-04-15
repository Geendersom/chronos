import type { Transition } from 'framer-motion'

export const minuteSweepTransition: Transition = {
  type: 'spring',
  stiffness: 80,
  damping: 16,
}

export const secondSweepTransition: Transition = {
  type: 'spring',
  stiffness: 110,
  damping: 18,
}
