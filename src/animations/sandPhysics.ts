export const sandSpring = {
  type: 'spring',
  stiffness: 80,
  damping: 20,
} as const

export const getSandTopAnimation = (progress: number) => ({ scaleY: 1 - progress })

export const getSandBottomAnimation = (progress: number) => ({ scaleY: progress })

export const getSandStreamAnimation = (isRunning: boolean) => ({
  opacity: isRunning ? [0.6, 1, 0.6] : 0.2,
  y: isRunning ? [0, 4, 0] : 0,
})

export const sandStreamTransition = {
  duration: 0.7,
  repeat: Number.POSITIVE_INFINITY,
  ease: 'linear',
} as const
