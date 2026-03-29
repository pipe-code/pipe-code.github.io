import { useMemo } from 'react'
import * as THREE from 'three'

// ─── Canvas draw helpers ──────────────────────────────────────────────────────

type DrawFn = (ctx: CanvasRenderingContext2D, s: number) => void

function roundedRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number, r: number
) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + r)
  ctx.lineTo(x + w, y + h - r)
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  ctx.lineTo(x + r, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - r)
  ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.closePath()
}

// React — three orbital ellipses + nucleus
const drawReact: DrawFn = (ctx, s) => {
  const cx = s / 2, cy = s / 2
  ctx.strokeStyle = 'white'
  ctx.fillStyle = 'white'
  ctx.lineWidth = s * 0.038
  for (let i = 0; i < 3; i++) {
    ctx.save()
    ctx.translate(cx, cy)
    ctx.rotate((i * Math.PI) / 3)
    ctx.beginPath()
    ctx.ellipse(0, 0, s * 0.43, s * 0.16, 0, 0, Math.PI * 2)
    ctx.stroke()
    ctx.restore()
  }
  ctx.beginPath()
  ctx.arc(cx, cy, s * 0.06, 0, Math.PI * 2)
  ctx.fill()
}

// TypeScript — rounded square + "TS"
const drawTS: DrawFn = (ctx, s) => {
  const pad = s * 0.07
  ctx.strokeStyle = 'white'
  ctx.fillStyle = 'white'
  ctx.lineWidth = s * 0.045
  roundedRect(ctx, pad, pad, s - pad * 2, s - pad * 2, s * 0.1)
  ctx.stroke()
  ctx.font = `bold ${Math.round(s * 0.4)}px monospace`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('TS', s / 2, s / 2 + s * 0.02)
}

// JavaScript — rounded square + "JS"
const drawJS: DrawFn = (ctx, s) => {
  const pad = s * 0.07
  ctx.strokeStyle = 'white'
  ctx.fillStyle = 'white'
  ctx.lineWidth = s * 0.045
  roundedRect(ctx, pad, pad, s - pad * 2, s - pad * 2, s * 0.1)
  ctx.stroke()
  ctx.font = `bold ${Math.round(s * 0.4)}px monospace`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('JS', s / 2, s / 2 + s * 0.02)
}

// Node.js — hexagon + "N"
const drawNode: DrawFn = (ctx, s) => {
  const cx = s / 2, cy = s / 2, r = s * 0.43
  ctx.strokeStyle = 'white'
  ctx.fillStyle = 'white'
  ctx.lineWidth = s * 0.04
  ctx.beginPath()
  for (let i = 0; i < 6; i++) {
    const a = (i * Math.PI) / 3 - Math.PI / 6
    const x = cx + r * Math.cos(a), y = cy + r * Math.sin(a)
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
  }
  ctx.closePath()
  ctx.stroke()
  ctx.font = `bold ${Math.round(s * 0.38)}px monospace`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('N', cx, cy + s * 0.02)
}

// Next.js — circle + "N"
const drawNext: DrawFn = (ctx, s) => {
  const cx = s / 2, cy = s / 2
  ctx.strokeStyle = 'white'
  ctx.fillStyle = 'white'
  ctx.lineWidth = s * 0.04
  ctx.beginPath()
  ctx.arc(cx, cy, s * 0.43, 0, Math.PI * 2)
  ctx.stroke()
  ctx.font = `bold ${Math.round(s * 0.42)}px monospace`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('N', cx, cy + s * 0.02)
}

// Three.js — wireframe tetrahedron (nested triangles + connectors)
const drawThree: DrawFn = (ctx, s) => {
  ctx.strokeStyle = 'white'
  ctx.lineJoin = 'round'

  // Outer triangle
  ctx.lineWidth = s * 0.038
  ctx.beginPath()
  ctx.moveTo(s * 0.50, s * 0.07)
  ctx.lineTo(s * 0.93, s * 0.87)
  ctx.lineTo(s * 0.07, s * 0.87)
  ctx.closePath()
  ctx.stroke()

  // Inner triangle
  ctx.lineWidth = s * 0.028
  ctx.beginPath()
  ctx.moveTo(s * 0.50, s * 0.30)
  ctx.lineTo(s * 0.73, s * 0.70)
  ctx.lineTo(s * 0.27, s * 0.70)
  ctx.closePath()
  ctx.stroke()

  // Connecting edges for 3D feel
  ctx.lineWidth = s * 0.022
  ctx.beginPath()
  ctx.moveTo(s * 0.50, s * 0.07); ctx.lineTo(s * 0.50, s * 0.30)
  ctx.moveTo(s * 0.93, s * 0.87); ctx.lineTo(s * 0.73, s * 0.70)
  ctx.moveTo(s * 0.07, s * 0.87); ctx.lineTo(s * 0.27, s * 0.70)
  ctx.stroke()
}

// Neovim — bold V with inner chevron (simplified logo)
const drawNeovim: DrawFn = (ctx, s) => {
  ctx.strokeStyle = 'white'
  ctx.lineJoin = 'round'
  ctx.lineCap = 'round'

  // Outer V
  ctx.lineWidth = s * 0.072
  ctx.beginPath()
  ctx.moveTo(s * 0.08, s * 0.15)
  ctx.lineTo(s * 0.50, s * 0.86)
  ctx.lineTo(s * 0.92, s * 0.15)
  ctx.stroke()

  // Top bar
  ctx.lineWidth = s * 0.068
  ctx.beginPath()
  ctx.moveTo(s * 0.08, s * 0.15)
  ctx.lineTo(s * 0.92, s * 0.15)
  ctx.stroke()

  // Inner chevron
  ctx.lineWidth = s * 0.038
  ctx.beginPath()
  ctx.moveTo(s * 0.30, s * 0.15)
  ctx.lineTo(s * 0.50, s * 0.56)
  ctx.lineTo(s * 0.70, s * 0.15)
  ctx.stroke()
}

// Git — fork diagram (3 commits + branch curve)
const drawGit: DrawFn = (ctx, s) => {
  const r = s * 0.09
  ctx.strokeStyle = 'white'
  ctx.fillStyle = 'white'
  ctx.lineWidth = s * 0.038
  ctx.lineCap = 'round'

  // Commit nodes
  const nodes: [number, number][] = [
    [s * 0.28, s * 0.80],
    [s * 0.28, s * 0.24],
    [s * 0.72, s * 0.24],
  ]
  nodes.forEach(([x, y]) => {
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fill()
  })

  // Trunk
  ctx.beginPath()
  ctx.moveTo(s * 0.28, s * 0.80 - r)
  ctx.lineTo(s * 0.28, s * 0.24 + r)
  ctx.stroke()

  // Branch curve
  ctx.beginPath()
  ctx.moveTo(s * 0.28, s * 0.52)
  ctx.bezierCurveTo(s * 0.28, s * 0.36, s * 0.72, s * 0.42, s * 0.72, s * 0.24 + r)
  ctx.stroke()
}

// ─── Texture factory ──────────────────────────────────────────────────────────

function makeTex(draw: DrawFn, size = 128): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!
  ctx.clearRect(0, 0, size, size)
  draw(ctx, size)
  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

// ─── Logo list (order determines cycling through placements) ──────────────────

const DRAW_FNS: DrawFn[] = [
  drawReact, drawTS, drawJS, drawNode,
  drawNext,  drawThree, drawNeovim, drawGit,
]

// ─── Placements: [x, y, rotZ (rad), planeSize (world units)] ─────────────────
// z = -14 for all — deep background, avoids ±4 world-unit center zone

const PLACEMENTS: [number, number, number, number][] = [
  // Top row
  [-11.5,  9.0, -0.14, 2.2],
  [ -5.5,  9.8,  0.09, 2.0],
  [  5.5,  9.8, -0.06, 2.1],
  [ 11.5,  9.0,  0.12, 2.0],
  // Bottom row
  [-11.0, -8.5,  0.08, 2.1],
  [ -5.0, -9.8, -0.13, 2.0],
  [  5.0, -9.8,  0.07, 2.2],
  [ 11.0, -8.5, -0.09, 2.0],
  // Left column
  [-13.5,  3.0,  0.21, 2.0],
  [-13.5, -3.0, -0.10, 2.1],
  // Right column
  [ 13.5,  3.0, -0.16, 2.1],
  [ 13.5, -3.0,  0.18, 2.0],
  // Diagonal fills (between center and edges)
  [ -8.0,  5.5, -0.05, 1.9],
  [  8.0,  5.5,  0.11, 2.0],
  [ -8.0, -5.5,  0.14, 1.9],
  [  8.0, -5.5, -0.08, 2.1],
]

const LOGO_OPACITY = 0.11

// ─── Component ────────────────────────────────────────────────────────────────

export default function StackGrid() {
  const materials = useMemo(() =>
    DRAW_FNS.map(fn => new THREE.MeshBasicMaterial({
      map:         makeTex(fn),
      transparent: true,
      opacity:     LOGO_OPACITY,
      depthWrite:  false,
      side:        THREE.DoubleSide,
    }))
  , [])

  return (
    <>
      {PLACEMENTS.map(([x, y, rotZ, size], i) => (
        <mesh
          key={i}
          position={[x, y, -14]}
          rotation={[0, 0, rotZ]}
          material={materials[i % materials.length]}
        >
          <planeGeometry args={[size, size]} />
        </mesh>
      ))}
    </>
  )
}
