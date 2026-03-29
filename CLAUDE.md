# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run lint     # ESLint
```

## Architecture

Single-page Next.js app (Pages Router) that renders an interactive 3D glass logo. The entire UI lives in one component:

**`src/components/GlassLogo.tsx`** — The core component. Loaded dynamically with `ssr: false` in `pages/index.tsx` because it depends on browser APIs. It:
- Parses `src/assets/pipe.svg` path data at runtime
- Extrudes the SVG paths into 3D geometry using Three.js `ExtrudeGeometry`
- Applies `meshPhysicalMaterial` with transmission/IOR for the glass effect
- Tracks mouse position to move a point light and apply subtle parallax rotation to the mesh
- Creates a radial glow via an offscreen `<canvas>` baked into a `PlaneGeometry` texture

**Key stack:** Next.js 16 (Pages Router) · React 19 · React Three Fiber (`@react-three/fiber`) · Drei (`@react-three/drei`) · Three.js 0.183

**Layout:** `globals.css` sets the body to full-screen with `overflow: hidden` and a dark background (`#06060f`) — the canvas fills the viewport.

The SVG has two path groups by fill color (`#3D92CB` blue vs. white), which map to two different material instances on the extruded mesh.
