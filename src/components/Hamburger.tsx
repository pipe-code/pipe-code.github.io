const BLUE = '#89b4fa'
const LINE_W = 22
const LINE_H = 2
const GAP    = 6
// distance each outer line travels to meet center: gap + line height
const TRAVEL = GAP + LINE_H

interface Props {
  open: boolean
  onToggle: () => void
}

export default function Hamburger({ open, onToggle }: Props) {
  const base: React.CSSProperties = {
    display:       'block',
    width:         LINE_W,
    height:        LINE_H,
    background:    BLUE,
    borderRadius:  1,
    transformOrigin: 'center',
    transition:    'transform 0.28s cubic-bezier(0.4,0,0.2,1), opacity 0.2s ease',
  }

  return (
    <button
      onClick={onToggle}
      aria-label={open ? 'cerrar menú' : 'abrir menú'}
      style={{
        position:   'fixed',
        top:        16,
        right:      16,
        zIndex:     600,
        background: 'none',
        border:     'none',
        padding:    8,
        display:    'flex',
        flexDirection: 'column',
        gap:        GAP,
        cursor:     'none',
        outline:    'none',
      }}
    >
      {/* Line 1 */}
      <span style={{
        ...base,
        transform: open
          ? `translateY(${TRAVEL}px) rotate(45deg)`
          : 'none',
      }} />

      {/* Line 2 */}
      <span style={{
        ...base,
        opacity:   open ? 0 : 1,
        transform: open ? 'scaleX(0.4)' : 'none',
      }} />

      {/* Line 3 */}
      <span style={{
        ...base,
        transform: open
          ? `translateY(-${TRAVEL}px) rotate(-45deg)`
          : 'none',
      }} />
    </button>
  )
}
