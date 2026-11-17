import { useEffect, useRef } from 'react'

export default function EmberCanvas({ density = 42, className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const ctx = canvas.getContext('2d')
    let raf = 0
    let particles = []
    let width = 0
    let height = 0

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.max(14, Math.round((width * height) / 26000))
      particles = Array.from({ length: Math.min(count, density) }, () => spawn(true))
    }

    const spawn = (initial = false) => ({
      x: Math.random() * width,
      y: initial ? Math.random() * height : height + Math.random() * 60,
      r: 0.5 + Math.random() * 1.6,
      speed: 0.12 + Math.random() * 0.42,
      drift: (Math.random() - 0.5) * 0.28,
      phase: Math.random() * Math.PI * 2,
      alpha: 0.15 + Math.random() * 0.55,
      warm: Math.random() > 0.22,
    })

    const draw = (time) => {
      ctx.clearRect(0, 0, width, height)
      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i]
        p.y -= p.speed
        p.x += p.drift + Math.sin(time * 0.0006 + p.phase) * 0.12
        if (p.y < -10 || p.x < -20 || p.x > width + 20) {
          particles[i] = spawn(false)
          continue
        }
        const flicker = 0.55 + Math.sin(time * 0.002 + p.phase) * 0.35
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.warm
          ? `rgba(232, 174, 105, ${p.alpha * flicker})`
          : `rgba(196, 214, 205, ${p.alpha * flicker * 0.55})`
        ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }

    resize()
    raf = requestAnimationFrame(draw)
    const observer = new ResizeObserver(resize)
    observer.observe(canvas)
    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
    }
  }, [density])

  return <canvas ref={ref} className={`ember-canvas ${className}`} aria-hidden="true" />
}
