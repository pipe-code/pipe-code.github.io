import { useEffect, useState } from 'react'

const C = {
  blue:     '#89b4fa',
  surface0: '#313244',
  base:     '#1e1e2e',
  text:     '#cdd6f4',
  overlay1: '#7f849c',
  dark:     '#1e1e2e',
}

const H = 28
const T = H / 2

function SepRight({ from, to }: { from: string; to: string }) {
  return (
    <div style={{
      width: 0, height: 0, flexShrink: 0,
      borderTop:    `${T}px solid transparent`,
      borderBottom: `${T}px solid transparent`,
      borderLeft:   `${T - 4}px solid ${from}`,
      background:   to,
    }} />
  )
}

function SepLeft({ from, to }: { from: string; to: string }) {
  return (
    <div style={{
      width: 0, height: 0, flexShrink: 0,
      borderTop:    `${T}px solid transparent`,
      borderBottom: `${T}px solid transparent`,
      borderRight:  `${T - 4}px solid ${to}`,
      background:   from,
    }} />
  )
}

export default function StatusBar() {
  const [section, setSection] = useState('home')
  // SSR-safe: start wide so first render matches desktop, avoids layout shift on hydration
  const [width, setWidth] = useState(1200)

  useEffect(() => {
    const onHash = () => {
      setSection(window.location.hash.replace('#', '') || 'home')
    }
    const onResize = () => setWidth(window.innerWidth)

    onHash()
    onResize()

    window.addEventListener('hashchange', onHash)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('hashchange', onHash)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  // Progressive collapse — outside-in, mirroring lualine behavior
  const showB = width >= 680   // year
  const showY = width >= 680   // #section
  const showZ = width >= 520   // ~/portfolio

  // Separator colors depend on what sections are adjacent
  const leftEdge  = showB ? C.surface0 : C.base
  const rightEdge = showY ? C.surface0 : C.base

  const copyright =
    width >= 520 ? '© 2026 pipe-code · All rights reserved' :
    width >= 380 ? '© 2026 pipe-code' :
                   '© pipe-code'

  const brand = width >= 380 ? 'λ\u00a0\u00a0pipe-code' : 'λ'

  const font: React.CSSProperties = {
    fontFamily: '"JetBrains Mono", "Cascadia Code", monospace',
    fontSize:   12,
    lineHeight: 1,
  }

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap');`}</style>

      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        height: H, background: C.base,
        display: 'flex', alignItems: 'stretch',
        zIndex: 1000, userSelect: 'none',
        ...font,
      }}>

        {/* ── A: brand ── */}
        <div style={{
          background: C.blue, color: C.dark,
          display: 'flex', alignItems: 'center',
          padding: '0 14px 0 12px',
          fontWeight: 700, whiteSpace: 'nowrap', letterSpacing: '0.03em',
        }}>
          {brand}
        </div>

        {/* A → B (or A → C when B hidden) */}
        <SepRight from={C.blue} to={leftEdge} />

        {/* ── B: year (≥640px) ── */}
        {showB && <>
          <div style={{
            background: C.surface0, color: C.text,
            display: 'flex', alignItems: 'center',
            padding: '0 13px', whiteSpace: 'nowrap',
          }}>
            2026
          </div>
          <SepRight from={C.surface0} to={C.base} />
        </>}

        {/* ── C: copyright — fills remaining space ── */}
        <div style={{
          flex: 1, minWidth: 0, background: C.base, color: C.overlay1,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          whiteSpace: 'nowrap', overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>
          {copyright}
        </div>

        {/* ── Y: current section (≥640px) ── */}
        {showY && <>
          <SepLeft from={C.base} to={C.surface0} />
          <div style={{
            background: C.surface0, color: C.text,
            display: 'flex', alignItems: 'center',
            padding: '0 13px', whiteSpace: 'nowrap',
          }}>
            #{section}
          </div>
        </>}

        {/* C (or Y) → Z */}
        {showZ && <SepLeft from={rightEdge} to={C.blue} />}

        {/* ── Z: path (≥480px) ── */}
        {showZ && (
          <div style={{
            background: C.blue, color: C.dark,
            display: 'flex', alignItems: 'center',
            padding: '0 12px 0 14px',
            fontWeight: 700, whiteSpace: 'nowrap', letterSpacing: '0.03em',
          }}>
            ~/portfolio
          </div>
        )}

      </div>
    </>
  )
}
