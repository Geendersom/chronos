export const bellShakeAnimation = {
  idle: { rotate: 0 },
  ringing: { rotate: [-6, 6, -6] },
}

export const bellShakeTransition = {
  idle: { duration: 0.3 },
  ringing: { duration: 0.2, repeat: Number.POSITIVE_INFINITY as number },
}
