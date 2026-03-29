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

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p style={{
    ...font,
    fontSize:      10,
    letterSpacing: '0.1em',
    color:         C.overlay1,
    textTransform: 'uppercase',
    marginBottom:  10,
  }}>
    {children}
  </p>
)

const Divider = () => (
  <div style={{ height: 1, background: C.surface0, marginBottom: 32 }} />
)

// ── SVG icons ────────────────────────────────────────────────────

const IconGitHub = ({ color }: { color: string }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill={color} style={{ flexShrink: 0 }}>
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
)

const IconLinkedIn = ({ color }: { color: string }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill={color} style={{ flexShrink: 0 }}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const IconCodePen = ({ color }: { color: string }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill={color} style={{ flexShrink: 0 }}>
    <path d="M24 8.182l-.018-.087-.017-.05c-.01-.024-.018-.05-.03-.075-.003-.018-.015-.034-.02-.05l-.035-.067-.03-.05-.044-.06-.046-.045-.06-.045-.046-.03-.06-.044-.044-.04-.015-.02L12.58.19c-.347-.232-.796-.232-1.142 0L.453 7.502l-.015.015-.044.035-.06.05-.038.04-.05.056-.037.045-.05.06c-.02.017-.03.03-.03.046l-.05.06-.02.06c-.02.01-.02.04-.03.07l-.01.05C0 8.18 0 8.24 0 8.29v7.418c0 .06 0 .12.02.18l.015.06.01.024c.005.06.01.12.03.18l.01.06c.015.06.03.12.05.17l.03.06.05.09.04.07.04.06.05.06.04.06.05.07.035.05.06.07.04.04.06.07.04.04.06.04.04.02.06.04.046.02.06.02.06.01.06.01H23.99l.06-.01.06-.01.06-.02.046-.02.06-.04.02-.01.06-.04.04-.03.06-.04.04-.04.06-.07.04-.04.04-.07.05-.06.03-.05.04-.07.05-.09.03-.06.05-.11c.02-.04.03-.08.04-.12l.01-.06c.02-.06.02-.12.03-.18l.01-.06c.02-.06.02-.12.02-.18V8.29c0-.06 0-.12-.01-.11zM13.101 2.373l8.758 5.84-3.925 2.62-4.833-3.23V2.373zm-2.198 0v5.23L6.07 10.833l-3.928-2.62 8.76-5.84zM2.062 12l2.903-1.937 2.255 1.506-2.255 1.506L2.062 12zm9.24 9.627L2.544 15.787l3.927-2.62 4.831 3.226v5.234zm1.1-7.133L9.156 12l3.245-2.165L15.648 12l-3.245 2.165v-.001zm1.099 7.133V16.39l4.833-3.226 3.927 2.62-8.76 5.84v.001zm4.48-7.754L15.73 12.57l2.255-1.506 2.903 1.936-2.903 1.937v-.001z" />
  </svg>
)

// ── Reusable link row ─────────────────────────────────────────────

type IconComponent = typeof IconGitHub

function LinkRow({
  href,
  label,
  Icon,
  external = false,
  onClick,
}: {
  href: string
  label: string
  Icon: IconComponent
  external?: boolean
  onClick?: () => void
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
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
      <Icon color={hovered ? C.blue : C.overlay1} />
      {label}
    </a>
  )
}

// ── Language button ───────────────────────────────────────────────

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

// ── Nav link (hash) ───────────────────────────────────────────────

function NavLink({ href, label, onClick }: { href: string; label: string; onClick: () => void }) {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href={href}
      onClick={(e) => { e.preventDefault(); onClick() }}
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
        width:      15,
        flexShrink: 0,
      }}>›</span>
      {label}
    </a>
  )
}

// ── Main component ────────────────────────────────────────────────

interface Props {
  open: boolean
  onClose: () => void
}

export default function Sidebar({ open, onClose }: Props) {
  const { lang, setLang, navigate, href, t } = useLang()

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
        overflowY:     'auto',
      }}>

        {/* ── Language selector ── */}
        <div style={{ marginBottom: 32 }}>
          <SectionLabel>{t('common', 'lang')}</SectionLabel>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <LangButton code="es" active={lang === 'es'} onClick={() => setLang('es')} />
            <span style={{ color: C.surface1, fontSize: 12 }}>·</span>
            <LangButton code="en" active={lang === 'en'} onClick={() => setLang('en')} />
          </div>
        </div>

        <Divider />

        {/* ── Navigation ── */}
        <div style={{ marginBottom: 32 }}>
          <SectionLabel>nav</SectionLabel>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <NavLink href={href('home')}  label={t('common', 'nav_home')}  onClick={() => { navigate('home');  onClose() }} />
            <NavLink href={href('about')} label={t('common', 'nav_about')} onClick={() => { navigate('about'); onClose() }} />
          </nav>
        </div>

        <Divider />

        {/* ── Social / Redes ── */}
        <div>
          <SectionLabel>{t('common', 'social')}</SectionLabel>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <LinkRow href="https://github.com/pipe-code"                    label="github"   Icon={IconGitHub}   external />
            <LinkRow href="https://codepen.io/pipe-pen"                     label="codepen"  Icon={IconCodePen}  external />
            <LinkRow href="https://www.linkedin.com/in/andres-felipe-amaya/" label="linkedin" Icon={IconLinkedIn} external />
          </div>
        </div>

      </div>
    </>
  )
}
