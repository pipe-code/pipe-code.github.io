# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build (static export → out/)
npm run lint     # ESLint
```

## Project Purpose

Personal GitHub Page at `pipe-code.github.io` — primary portfolio and professional introduction. Aesthetic mirrors the owner's daily dev environment: **Catppuccin Mocha** (Neovim colorscheme) + **JetBrains Mono** (iTerm font). Everything feels like a natural extension of their terminal setup.

## Deployment

- **Branch workflow:** develop (local work) → merge to `main` → GH Action builds → deploys to Pages
- **GH Action:** `.github/workflows/deploy.yml` — triggers on push to `main`, builds with Node LTS, uploads `out/` artifact via `actions/deploy-pages`
- **Pages config:** Settings → Pages → Source → "GitHub Actions"
- `next.config.ts`: `output: "export"`, `trailingSlash: true`, `images: { unoptimized: true }`

## Routing

Hash-based — required for GitHub Pages static hosting. URL is the **single source of truth** for both language and route. Format:

| URL | Lang | Route |
|-----|------|-------|
| `/#/` | es | home |
| `/#/en/` | en | home |
| `/#/about/` | es | about |
| `/#/en/about/` | en | about |
| `/#/anything-unknown` | es | not-found |

**All routes render inside `pages/index.tsx`** — there are no separate Next.js page files per section. `pages/404.tsx` exists only for HTTP-level 404s (direct URL navigation without `#`).

## Architecture

### LanguageContext (`src/context/LanguageContext.tsx`)
Central state for the entire app. Provides:
- `lang: Lang` (`'es' | 'en'`)
- `route: Route` (`'home' | 'about' | 'not-found'`)
- `setLang(l)` — updates hash, preserving current route
- `navigate(r)` — updates hash, preserving current lang
- `href(r)` — returns hash string for use in `<a href>`
- `t(namespace, key)` — type-safe translation helper
- `buildHash(route, lang)` — exported utility for use outside context

`parseHash()` reads `window.location.hash` and returns `{ lang, route }`. Unknown route segments → `'not-found'`.

### i18n (`src/locales/{es,en}/{namespace}.json`)
Flat JSON keys only — nested objects break the typed `t()`. One file per namespace per language:
- `common.json` — nav, lang selector, copyright, 404 strings, gyro prompt
- `home.json` — meta_title, meta_description
- `about.json` — meta_title, meta_description, heading, role

### GlassLogo (`src/components/GlassLogo.tsx`)
Home scene. Loaded dynamically (`ssr: false`). Key details:
- SVG paths extruded into 3D geometry, merged by color group (2 meshes: blue + white) to avoid multi-mesh `MeshTransmissionMaterial` interference
- **Desktop:** `mousemove` → updates `mouseRef` (normalized -1 to 1)
- **Mobile/touch:** gyroscope via `DeviceOrientationEvent` → same `mouseRef`. iOS 13+ shows explicit "activar movimiento por giroscopio" button (permission requires direct user gesture). Android: direct listener, no permission gate.
- `useFrame` lerps `PointLight` + glow plane position and logo parallax tilt toward `mouseRef`
- Glow is a canvas-baked `CanvasTexture` (not ShaderMaterial — must be captured by transmission buffer)
- `CanvasTexture.colorSpace = THREE.SRGBColorSpace` required to prevent double color conversion

### StatusBar (`src/components/StatusBar.tsx`)
Neovim lualine-style bar. Fixed, `bottom: 0`, `height: 28px`, `z-index: 1000`. Powerline separators via CSS border trick. Responsive: sections collapse outside-in on narrow viewports. Reads `route` from `useLang()`.

### Cursor (`src/components/Cursor.tsx`)
Dot + lagging ring in `#3D92CB`. Rendered only on non-touch devices (`navigator.maxTouchPoints === 0`). `globals.css` scopes `cursor: none` to `@media (pointer: fine)`.

### Sidebar + Hamburger
Hamburger fixed top-right (`z-index: 600`). Sidebar slides from right (`z-index: 500`), backdrop at 499. Contains: language selector, nav links (use `href()` from context), social links. Width 240px.

### StackGrid (`src/components/StackGrid.tsx`)
14 tech logos as Three.js planes at `z = -14`, `opacity: 0.065`. All logos are canvas-baked `CanvasTexture` (128×128). 22 placements in a ring avoiding the center ±5 world units.

### NotFoundView (`src/components/NotFoundView.tsx`)
Shared component used by both `pages/404.tsx` and `pages/index.tsx` (when `route === 'not-found'`). Neovim buffer aesthetic: line number gutter with `~` tildes, large `404`, red error, `:e #/` link. Enter key navigates home. Cmdline hint hidden on narrow screens (`< 540px`).

## Design System

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

`#3D92CB` is used exclusively in the Three.js canvas (glass material, cursor, glow). `#89b4fa` (Catppuccin Blue) is the accent for all DOM UI.

### Typography
**JetBrains Mono** for all UI text. Loaded via Google Fonts `@import` in components that need it (StatusBar, NotFoundView, Sidebar). No global font loading — Canvas components don't need it.
