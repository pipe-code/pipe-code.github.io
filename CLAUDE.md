# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run lint     # ESLint
```

## Project Purpose

This is the owner's personal GitHub Page — their primary public portfolio and professional introduction. The aesthetic is drawn directly from their daily developer environment: **Catppuccin Mocha** (Neovim colorscheme) + **JetBrains Mono** (iTerm font). Everything should feel like a natural extension of their terminal setup.

## Navigation

Hash-based routing (`/#about`, `/#work`, etc.) — required for GitHub Pages static hosting. No Next.js dynamic routes for top-level sections.

## Pages / Sections

- **`/` (Home)** — The 3D glass logo scene (`GlassLogo`). Already built.
- **Subpages** (About, Work, etc.) — Use Catppuccin Mocha palette + JetBrains Mono. Hash navigation.

## Design System

### Typography
- **Font:** `JetBrains Mono` — used for all text in subpages/UI
- Load via `next/font` or a `<link>` from Google Fonts / self-hosted

### Color Palette — Catppuccin Mocha
| Role | Name | Hex |
|---|---|---|
| Background | Base | `#1e1e2e` |
| Background alt | Mantle | `#181825` |
| Background deep | Crust | `#11111b` |
| Surface 0 | Surface0 | `#313244` |
| Surface 1 | Surface1 | `#45475a` |
| Muted text | Overlay1 | `#7f849c` |
| Subtext | Subtext1 | `#bac2de` |
| Primary text | Text | `#cdd6f4` |
| Accent blue | Blue | `#89b4fa` |
| Accent sky | Sky | `#89dceb` |
| Accent lavender | Lavender | `#b4befe` |
| Accent mauve | Mauve | `#cba6f7` |
| Accent teal | Teal | `#94e2d5` |
| Accent green | Green | `#a6e3a1` |
| Warning | Yellow | `#f9e2af` |
| Error | Red | `#f38ba8` |

The logo/3D scene accent color (`#3D92CB`) bridges the Catppuccin blues with the Three.js glass material — keep it for the Home canvas, use Catppuccin Blue (`#89b4fa`) as the primary accent in DOM UI.

### Custom Cursor
`src/components/Cursor.tsx` — dot + lagging ring in `#3D92CB`, DOM overlay via `requestAnimationFrame`. Active on all pages.

## Architecture

**`src/components/GlassLogo.tsx`** — The Home scene. Loaded dynamically with `ssr: false`. It:
- Parses `src/assets/pipe.svg` at runtime and extrudes each path group into 3D geometry
- Uses `MeshTransmissionMaterial` (Drei) for glass — geometries are merged by color group (2 meshes) to avoid multi-mesh transmission buffer interference
- Mouse tracking moves a `PointLight` + glow plane (both blue, `#3D92CB`) behind the crystal, and applies parallax tilt to the logo group
- Radial glow is a canvas-baked `CanvasTexture` on a `PlaneGeometry` — required because `ShaderMaterial` with additive blending is not captured by the transmission buffer

**Key stack:** Next.js 16 (Pages Router) · React 19 · React Three Fiber · Drei · Three.js 0.183

**Layout:** `globals.css` — full-screen, `overflow: hidden`, `cursor: none`, background `#06060f`.
