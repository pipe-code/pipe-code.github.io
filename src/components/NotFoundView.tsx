import { useEffect, useState } from 'react'
import { useLang, buildHash } from '@/context/LanguageContext'

const C = {
  base:     '#1e1e2e',
  crust:    '#11111b',
  surface0: '#313244',
  surface1: '#45475a',
  overlay0: '#6c7086',
  overlay1: '#7f849c',
  blue:     '#89b4fa',
  red:      '#f38ba8',
}

const font = '"JetBrains Mono", "Cascadia Code", monospace'
const LINE_H = 22

export default function NotFoundView() {
  const { lang, t } = useLang()
  const [lineCount, setLineCount] = useState(50)
  const [width, setWidth] = useState(1200)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const calc = () => {
      setLineCount(Math.ceil(window.innerHeight / LINE_H) + 4)
      setWidth(window.innerWidth)
    }
    calc()
    window.addEventListener('resize', calc)
    return () => window.removeEventListener('resize', calc)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter') window.location.hash = buildHash('home', lang)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lang])

  const REAL_LINES = 4

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap');
        @keyframes blink    { 0%, 100% { opacity: 1 } 50% { opacity: 0 } }
        @keyframes fade-in  { from { opacity: 0; transform: translateY(6px) } to { opacity: 1; transform: translateY(0) } }
      `}</style>

      {/* Buffer area */}
      <div style={{
        position:   'fixed',
        top: 0, left: 0, right: 0,
        bottom:     52,
        display:    'flex',
        background: C.base,
        fontFamily: font,
        overflow:   'hidden',
      }}>

        {/* Gutter */}
        <div style={{
          width:        56,
          flexShrink:   0,
          paddingTop:   4,
          textAlign:    'right',
          paddingRight: 14,
          color:        C.overlay0,
          fontSize:     13,
          lineHeight:   `${LINE_H}px`,
          userSelect:   'none',
          borderRight:  `1px solid ${C.surface0}`,
        }}>
          {Array.from({ length: lineCount }, (_, i) => (
            <div key={i}>{i < REAL_LINES ? i + 1 : '~'}</div>
          ))}
        </div>

        {/* Content */}
        <div style={{
          flex:           1,
          display:        'flex',
          flexDirection:  'column',
          alignItems:     'center',
          justifyContent: 'center',
          paddingBottom:  32,
        }}>

          <div style={{
            fontSize:      'clamp(72px, 16vw, 180px)',
            fontWeight:    700,
            color:         C.surface1,
            lineHeight:    1,
            letterSpacing: '-0.04em',
            userSelect:    'none',
            animation:     'fade-in 0.4s ease both',
          }}>
            404
          </div>

          <div style={{
            color:         C.red,
            fontSize:      14,
            marginTop:     20,
            letterSpacing: '0.03em',
            animation:     'fade-in 0.4s ease 0.15s both',
          }}>
            {t('common', 'not_found')}
          </div>

          <a
            href={buildHash('home', lang)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
              display:        'inline-flex',
              alignItems:     'center',
              gap:            8,
              marginTop:      40,
              fontFamily:     font,
              fontSize:       13,
              textDecoration: 'none',
              color:          hovered ? C.blue : C.overlay1,
              transition:     'color 0.15s ease',
              animation:      'fade-in 0.4s ease 0.3s both',
              letterSpacing:  '0.02em',
            }}
          >
            <span style={{ color: hovered ? C.blue : C.surface1 }}>:e</span>
            {' #/ '}
            <span style={{ fontSize: 11 }}>— {t('common', 'not_found_go')}</span>
          </a>

        </div>
      </div>

      {/* Cmdline */}
      <div style={{
        position:   'fixed',
        bottom:     28,
        left: 0, right: 0,
        height:     24,
        background: C.crust,
        borderTop:  `1px solid ${C.surface0}`,
        display:    'flex',
        alignItems: 'center',
        padding:    '0 14px',
        fontFamily: font,
        fontSize:   12,
        color:      C.red,
      }}>
        {t('common', 'not_found')}
        {width >= 540 && (
          <span style={{ color: C.overlay0, marginLeft: 16, fontSize: 11 }}>
            {t('common', 'not_found_hint')}
          </span>
        )}
        <span style={{
          display:       'inline-block',
          width:         7,
          height:        13,
          background:    C.red,
          marginLeft:    4,
          verticalAlign: 'middle',
          animation:     'blink 1.1s step-end infinite',
        }} />
      </div>
    </>
  )
}
