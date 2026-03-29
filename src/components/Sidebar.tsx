import { useState } from 'react'
import { useLang, type Lang } from '@/context/LanguageContext'

const C = {
  crust:    '#11111b',
  surface0: '#313244',
  surface1: '#45475a',
  overlay1: '#7f849c',
  text:     '#cdd6f4',
  blue:     '#89b4fa',
}

const font: React.CSSProperties = {
  fontFamily: '"JetBrains Mono", "Cascadia Code", monospace',
}

function NavLink({ href, label, onClick }: { href: string; label: string; onClick: () => void }) {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...font,
        display:        'flex',
        alignItems:     'center',
        gap:            10,
        textDecoration: 'none',
        color:          hovered ? C.blue : C.text,
        fontSize:       14,
        letterSpacing:  '0.02em',
        transition:     'color 0.15s ease',
        padding:        '4px 0',
      }}
    >
      <span style={{
        color:      C.blue,
        fontSize:   16,
        lineHeight: 1,
        opacity:    hovered ? 1 : 0,
        transform:  hovered ? 'translateX(0)' : 'translateX(-4px)',
        transition: 'opacity 0.15s ease, transform 0.15s ease',
        width:      12,
        flexShrink: 0,
      }}>›</span>
      {label}
    </a>
  )
}

function LangButton({ code, active, onClick }: {
  code: Lang; active: boolean; onClick: () => void
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...font,
        background:    'none',
        border:        'none',
        cursor:        'none',
        padding:       '2px 0',
        fontSize:      12,
        letterSpacing: '0.05em',
        color:         active ? C.blue : (hovered ? C.text : C.overlay1),
        fontWeight:    active ? 700 : 400,
        transition:    'color 0.15s ease',
      }}
    >
      {code}
    </button>
  )
}

interface Props {
  open: boolean
  onClose: () => void
}

export default function Sidebar({ open, onClose }: Props) {
  const { lang, setLang, t } = useLang()

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position:      'fixed',
          inset:         0,
          background:    'rgba(0,0,0,0.45)',
          zIndex:        499,
          opacity:       open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition:    'opacity 0.3s ease',
        }}
      />

      {/* Panel */}
      <div style={{
        position:      'fixed',
        top:           0,
        right:         0,
        bottom:        28,
        width:         240,
        background:    C.crust,
        borderLeft:    `1px solid ${C.surface0}`,
        zIndex:        500,
        transform:     open ? 'translateX(0)' : 'translateX(100%)',
        transition:    'transform 0.3s cubic-bezier(0.4,0,0.2,1)',
        display:       'flex',
        flexDirection: 'column',
        padding:       '72px 32px 32px',
      }}>

        {/* ── Language selector ── */}
        <div style={{ marginBottom: 32 }}>
          <p style={{
            ...font,
            fontSize:      10,
            letterSpacing: '0.1em',
            color:         C.overlay1,
            textTransform: 'uppercase',
            marginBottom:  10,
          }}>
            {t('common', 'lang')}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <LangButton code="es" active={lang === 'es'} onClick={() => setLang('es')} />
            <span style={{ color: C.surface0, fontSize: 12 }}>·</span>
            <LangButton code="en" active={lang === 'en'} onClick={() => setLang('en')} />
          </div>
        </div>

        {/* ── Divider ── */}
        <div style={{ height: 1, background: C.surface0, marginBottom: 32 }} />

        {/* ── Navigation ── */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <p style={{
            ...font,
            fontSize:      10,
            letterSpacing: '0.1em',
            color:         C.overlay1,
            textTransform: 'uppercase',
            marginBottom:  10,
          }}>
            nav
          </p>
          <NavLink href="#home"  label={t('common', 'nav_home')}  onClick={onClose} />
          <NavLink href="#about" label={t('common', 'nav_about')} onClick={onClose} />
        </nav>

      </div>
    </>
  )
}
