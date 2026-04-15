import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import {
  getSandBottomAnimation,
  getSandStreamAnimation,
  getSandTopAnimation,
  sandSpring,
  sandStreamTransition,
} from '../../../animations/sandPhysics'
import type { TimerViewProps } from '../../types'
import styles from './HourglassTimer.module.css'

export const HourglassTimer = ({ progress, status }: TimerViewProps) => {
  const isRunning = status === 'running'
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const width = 180
    const height = 250
    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    ctx.scale(dpr, dpr)

    const particles = Array.from({ length: 110 }, () => ({
      x: 90 + (Math.random() - 0.5) * 16,
      y: 120 + Math.random() * 6,
      vx: (Math.random() - 0.5) * 0.35,
      vy: 1.2 + Math.random() * 1.1,
      radius: 1 + Math.random() * 1.4,
    }))

    let frame = 0
    let rafId = 0

    const draw = (): void => {
      frame += 1
      ctx.clearRect(0, 0, width, height)

      const topFill = (1 - progress) * 68
      const bottomFill = progress * 68

      ctx.fillStyle = 'rgba(248, 213, 140, 0.88)'
      ctx.beginPath()
      ctx.moveTo(90 - topFill, 40)
      ctx.lineTo(90 + topFill, 40)
      ctx.lineTo(90, 112)
      ctx.closePath()
      ctx.fill()

      ctx.fillStyle = 'rgba(248, 213, 140, 0.95)'
      ctx.beginPath()
      ctx.moveTo(90, 138)
      ctx.lineTo(90 + bottomFill, 210)
      ctx.lineTo(90 - bottomFill, 210)
      ctx.closePath()
      ctx.fill()

      if (isRunning) {
        ctx.fillStyle = 'rgba(248, 213, 140, 0.95)'
        particles.forEach((p) => {
          p.x += p.vx
          p.y += p.vy
          if (p.y > 208 || Math.abs(p.x - 90) > 74) {
            p.x = 90 + (Math.random() - 0.5) * 14
            p.y = 118 + Math.random() * 4
            p.vx = (Math.random() - 0.5) * 0.32
            p.vy = 1.25 + Math.random() * 1.05
          }

          const pulse = 0.78 + Math.sin((frame + p.x) * 0.08) * 0.22
          ctx.globalAlpha = pulse
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
          ctx.fill()
        })
        ctx.globalAlpha = 1
      }

      rafId = requestAnimationFrame(draw)
    }

    rafId = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(rafId)
  }, [isRunning, progress])

  return (
    <div className={styles.wrap}>
      <div className={styles.glass}>
        <canvas ref={canvasRef} className={styles.canvas} />
        <motion.div className={styles.sandTop} animate={getSandTopAnimation(progress)} transition={sandSpring} />

        <motion.div
          className={styles.stream}
          animate={getSandStreamAnimation(isRunning)}
          transition={sandStreamTransition}
        />

        <motion.div
          className={styles.sandBottom}
          animate={getSandBottomAnimation(progress)}
          transition={sandSpring}
        />
      </div>
    </div>
  )
}
