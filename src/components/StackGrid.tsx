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

// ─── Draw functions ───────────────────────────────────────────────────────────

// React — three orbital ellipses + nucleus
const drawReact: DrawFn = (ctx, s) => {
  const cx = s / 2, cy = s / 2
  ctx.strokeStyle = 'white'; ctx.fillStyle = 'white'
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

// Box + label — shared by TS, JS, Ex
function boxLabel(label: string): DrawFn {
  return (ctx, s) => {
    const pad = s * 0.07
    ctx.strokeStyle = 'white'; ctx.fillStyle = 'white'
    ctx.lineWidth = s * 0.045
    roundedRect(ctx, pad, pad, s - pad * 2, s - pad * 2, s * 0.1)
    ctx.stroke()
    ctx.font = `bold ${Math.round(s * 0.40)}px monospace`
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
    ctx.fillText(label, s / 2, s / 2 + s * 0.02)
  }
}

// Node.js — hexagon + N
const drawNode: DrawFn = (ctx, s) => {
  const cx = s / 2, cy = s / 2, r = s * 0.43
  ctx.strokeStyle = 'white'; ctx.fillStyle = 'white'
  ctx.lineWidth = s * 0.04
  ctx.beginPath()
  for (let i = 0; i < 6; i++) {
    const a = (i * Math.PI) / 3 - Math.PI / 6
    const x = cx + r * Math.cos(a), y = cy + r * Math.sin(a)
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
  }
  ctx.closePath(); ctx.stroke()
  ctx.font = `bold ${Math.round(s * 0.38)}px monospace`
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.fillText('N', cx, cy + s * 0.02)
}

// Next.js — circle + N
const drawNext: DrawFn = (ctx, s) => {
  ctx.strokeStyle = 'white'; ctx.fillStyle = 'white'
  ctx.lineWidth = s * 0.04
  ctx.beginPath()
  ctx.arc(s / 2, s / 2, s * 0.43, 0, Math.PI * 2)
  ctx.stroke()
  ctx.font = `bold ${Math.round(s * 0.42)}px monospace`
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.fillText('N', s / 2, s / 2 + s * 0.02)
}

// Three.js — wireframe tetrahedron
const drawThree: DrawFn = (ctx, s) => {
  ctx.strokeStyle = 'white'; ctx.lineJoin = 'round'
  ctx.lineWidth = s * 0.038
  ctx.beginPath()
  ctx.moveTo(s * 0.50, s * 0.07)
  ctx.lineTo(s * 0.93, s * 0.87)
  ctx.lineTo(s * 0.07, s * 0.87)
  ctx.closePath(); ctx.stroke()
  ctx.lineWidth = s * 0.028
  ctx.beginPath()
  ctx.moveTo(s * 0.50, s * 0.30)
  ctx.lineTo(s * 0.73, s * 0.70)
  ctx.lineTo(s * 0.27, s * 0.70)
  ctx.closePath(); ctx.stroke()
  ctx.lineWidth = s * 0.022
  ctx.beginPath()
  ctx.moveTo(s * 0.50, s * 0.07); ctx.lineTo(s * 0.50, s * 0.30)
  ctx.moveTo(s * 0.93, s * 0.87); ctx.lineTo(s * 0.73, s * 0.70)
  ctx.moveTo(s * 0.07, s * 0.87); ctx.lineTo(s * 0.27, s * 0.70)
  ctx.stroke()
}

// Neovim — bold V with top bar + inner chevron
const drawNeovim: DrawFn = (ctx, s) => {
  ctx.strokeStyle = 'white'; ctx.lineJoin = 'round'; ctx.lineCap = 'round'
  ctx.lineWidth = s * 0.072
  ctx.beginPath()
  ctx.moveTo(s * 0.08, s * 0.15)
  ctx.lineTo(s * 0.50, s * 0.86)
  ctx.lineTo(s * 0.92, s * 0.15)
  ctx.stroke()
  ctx.lineWidth = s * 0.068
  ctx.beginPath()
  ctx.moveTo(s * 0.08, s * 0.15); ctx.lineTo(s * 0.92, s * 0.15)
  ctx.stroke()
  ctx.lineWidth = s * 0.038
  ctx.beginPath()
  ctx.moveTo(s * 0.30, s * 0.15)
  ctx.lineTo(s * 0.50, s * 0.56)
  ctx.lineTo(s * 0.70, s * 0.15)
  ctx.stroke()
}

// Git — fork diagram
const drawGit: DrawFn = (ctx, s) => {
  const r = s * 0.09
  ctx.strokeStyle = 'white'; ctx.fillStyle = 'white'
  ctx.lineWidth = s * 0.038; ctx.lineCap = 'round'
  ;([[s * 0.28, s * 0.80], [s * 0.28, s * 0.24], [s * 0.72, s * 0.24]] as const).forEach(([x, y]) => {
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill()
  })
  ctx.beginPath()
  ctx.moveTo(s * 0.28, s * 0.80 - r); ctx.lineTo(s * 0.28, s * 0.24 + r)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(s * 0.28, s * 0.52)
  ctx.bezierCurveTo(s * 0.28, s * 0.36, s * 0.72, s * 0.42, s * 0.72, s * 0.24 + r)
  ctx.stroke()
}

// Express — box + "Ex"
const drawExpress = boxLabel('Ex')

// GSAP — shield shape + "GS"
const drawGSAP: DrawFn = (ctx, s) => {
  ctx.strokeStyle = 'white'; ctx.fillStyle = 'white'
  ctx.lineWidth = s * 0.04; ctx.lineJoin = 'round'
  ctx.beginPath()
  ctx.moveTo(s * 0.50, s * 0.06)
  ctx.lineTo(s * 0.92, s * 0.28)
  ctx.lineTo(s * 0.92, s * 0.62)
  ctx.quadraticCurveTo(s * 0.92, s * 0.88, s * 0.50, s * 0.95)
  ctx.quadraticCurveTo(s * 0.08, s * 0.88, s * 0.08, s * 0.62)
  ctx.lineTo(s * 0.08, s * 0.28)
  ctx.closePath(); ctx.stroke()
  ctx.font = `bold ${Math.round(s * 0.32)}px monospace`
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
  ctx.fillText('GS', s / 2, s * 0.52)
}

// Strapi — diamond + upward arrow
const drawStrapi: DrawFn = (ctx, s) => {
  ctx.strokeStyle = 'white'; ctx.lineWidth = s * 0.04; ctx.lineJoin = 'round'
  ctx.beginPath()
  ctx.moveTo(s * 0.50, s * 0.06)
  ctx.lineTo(s * 0.94, s * 0.50)
  ctx.lineTo(s * 0.50, s * 0.94)
  ctx.lineTo(s * 0.06, s * 0.50)
  ctx.closePath(); ctx.stroke()
  ctx.lineWidth = s * 0.048; ctx.lineCap = 'round'
  ctx.beginPath()
  ctx.moveTo(s * 0.50, s * 0.70); ctx.lineTo(s * 0.50, s * 0.34)
  ctx.moveTo(s * 0.34, s * 0.50); ctx.lineTo(s * 0.50, s * 0.34); ctx.lineTo(s * 0.66, s * 0.50)
  ctx.stroke()
}

// Stripe — circle + flowing S
const drawStripe: DrawFn = (ctx, s) => {
  ctx.strokeStyle = 'white'; ctx.lineCap = 'round'
  ctx.lineWidth = s * 0.04
  ctx.beginPath()
  ctx.arc(s / 2, s / 2, s * 0.43, 0, Math.PI * 2)
  ctx.stroke()
  ctx.lineWidth = s * 0.068
  ctx.beginPath()
  ctx.moveTo(s * 0.61, s * 0.30)
  ctx.bezierCurveTo(s * 0.61, s * 0.20, s * 0.34, s * 0.20, s * 0.34, s * 0.38)
  ctx.bezierCurveTo(s * 0.34, s * 0.52, s * 0.66, s * 0.48, s * 0.66, s * 0.62)
  ctx.bezierCurveTo(s * 0.66, s * 0.80, s * 0.39, s * 0.80, s * 0.39, s * 0.70)
  ctx.stroke()
}

// Webpack — isometric cube wireframe
const drawWebpack: DrawFn = (ctx, s) => {
  ctx.strokeStyle = 'white'; ctx.lineJoin = 'round'; ctx.lineCap = 'round'
  ctx.lineWidth = s * 0.038
  // Top face
  ctx.beginPath()
  ctx.moveTo(s * 0.50, s * 0.08)
  ctx.lineTo(s * 0.88, s * 0.30)
  ctx.lineTo(s * 0.50, s * 0.52)
  ctx.lineTo(s * 0.12, s * 0.30)
  ctx.closePath(); ctx.stroke()
  // Right face
  ctx.beginPath()
  ctx.moveTo(s * 0.88, s * 0.30)
  ctx.lineTo(s * 0.88, s * 0.68)
  ctx.lineTo(s * 0.50, s * 0.92)
  ctx.lineTo(s * 0.50, s * 0.52)
  ctx.closePath(); ctx.stroke()
  // Left face
  ctx.beginPath()
  ctx.moveTo(s * 0.12, s * 0.30)
  ctx.lineTo(s * 0.12, s * 0.68)
  ctx.lineTo(s * 0.50, s * 0.92)
  ctx.lineTo(s * 0.50, s * 0.52)
  ctx.closePath(); ctx.stroke()
}

// Sass — circle + S double-arc
const drawSass: DrawFn = (ctx, s) => {
  ctx.strokeStyle = 'white'; ctx.lineCap = 'round'
  ctx.lineWidth = s * 0.04
  ctx.beginPath()
  ctx.arc(s / 2, s / 2, s * 0.43, 0, Math.PI * 2)
  ctx.stroke()
  ctx.lineWidth = s * 0.062
  ctx.beginPath()
  ctx.arc(s * 0.52, s * 0.36, s * 0.14, Math.PI * 1.05, Math.PI * 0.02, true)
  ctx.stroke()
  ctx.beginPath()
  ctx.arc(s * 0.48, s * 0.64, s * 0.14, Math.PI * 0.02, Math.PI * 1.05, false)
  ctx.stroke()
}

// ─── Texture factory ──────────────────────────────────────────────────────────

function makeTex(draw: DrawFn, size = 128): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = size; canvas.height = size
  const ctx = canvas.getContext('2d')!
  ctx.clearRect(0, 0, size, size)
  draw(ctx, size)
  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

// ─── 14 logos ─────────────────────────────────────────────────────────────────

const DRAW_FNS: DrawFn[] = [
  drawReact,   boxLabel('TS'), boxLabel('JS'), drawNode,
  drawNext,    drawThree,      drawNeovim,     drawGit,
  drawExpress, drawGSAP,       drawStrapi,     drawStripe,
  drawWebpack, drawSass,
]

// ─── Placements: [x, y, rotZ (rad), planeSize (world units)] ─────────────────
// All at z = -14. Spread in a ring, clearing ±5 world-unit center zone.
// Sizes reduced (1.4–1.7) and opacity lowered so they read as texture.

const PLACEMENTS: [number, number, number, number][] = [
  // Top arc
  [-12.5,  8.5, -0.14, 1.6],
  [ -6.5,  9.8,  0.09, 1.5],
  [  0.0, 10.5, -0.04, 1.5],
  [  6.5,  9.8,  0.12, 1.6],
  [ 12.5,  8.5, -0.10, 1.5],
  // Bottom arc
  [-12.0, -8.0,  0.08, 1.5],
  [ -6.0, -9.8, -0.13, 1.6],
  [  0.0,-10.5,  0.05, 1.5],
  [  6.0, -9.8,  0.07, 1.6],
  [ 12.0, -8.0, -0.09, 1.5],
  // Left column
  [-14.0,  2.5,  0.20, 1.5],
  [-14.0, -2.5, -0.11, 1.6],
  // Right column
  [ 14.0,  2.5, -0.17, 1.6],
  [ 14.0, -2.5,  0.14, 1.5],
  // Inner diagonals (slightly closer, smaller)
  [ -8.5,  5.8, -0.06, 1.4],
  [  8.5,  5.8,  0.11, 1.4],
  [ -8.5, -5.8,  0.13, 1.4],
  [  8.5, -5.8, -0.08, 1.4],
  // Extra corners for coverage
  [-14.5,  7.5, -0.22, 1.4],
  [ 14.5,  7.5,  0.18, 1.4],
  [-14.5, -7.5,  0.16, 1.4],
  [ 14.5, -7.5, -0.20, 1.4],
]

const LOGO_OPACITY = 0.065

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
