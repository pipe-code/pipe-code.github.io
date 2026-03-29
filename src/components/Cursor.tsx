import { useEffect, useRef, useState } from 'react'

export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    // No custom cursor on touch devices
    if (navigator.maxTouchPoints > 0) { setVisible(false); return }

    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mx = window.innerWidth  / 2
    let my = window.innerHeight / 2
    let rx = mx, ry = my
    let rafId: number

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
    }

    const tick = () => {
      dot.style.transform = `translate(${mx}px, ${my}px)`
      rx += (mx - rx) * 0.1
      ry += (my - ry) * 0.1
      ring.style.transform = `translate(${rx}px, ${ry}px)`
      rafId = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove)
    rafId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  if (!visible) return null

  return (
    <>
      <div ref={dotRef} style={{
        position: 'fixed', top: -3, left: -3,
        width: 6, height: 6, borderRadius: '50%',
        background: '#3D92CB',
        boxShadow: '0 0 6px 1px #3D92CB',
        pointerEvents: 'none', zIndex: 9999, willChange: 'transform',
      }} />
      <div ref={ringRef} style={{
        position: 'fixed', top: -16, left: -16,
        width: 32, height: 32, borderRadius: '50%',
        border: '1px solid rgba(61,146,203,0.55)',
        boxShadow: '0 0 8px 0px rgba(61,146,203,0.3), inset 0 0 8px 0px rgba(61,146,203,0.08)',
        pointerEvents: 'none', zIndex: 9999, willChange: 'transform',
      }} />
    </>
  )
}
