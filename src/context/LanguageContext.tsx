import { createContext, useContext, useEffect, useState } from 'react'

import esCommon from '@/locales/es/common.json'
import enCommon from '@/locales/en/common.json'
import esHome   from '@/locales/es/home.json'
import enHome   from '@/locales/en/home.json'
import esAbout  from '@/locales/es/about.json'
import enAbout  from '@/locales/en/about.json'

export type Lang  = 'es' | 'en'
export type Route = 'home' | 'about' | 'not-found'

const KNOWN_ROUTES = new Set(['about'])

const translations = {
  es: { common: esCommon, home: esHome, about: esAbout },
  en: { common: enCommon, home: enHome, about: enAbout },
} as const

type Namespace = keyof typeof translations['es']

// ─── Hash utilities ───────────────────────────────────────────────────────────

function parseHash(): { lang: Lang; route: Route } {
  if (typeof window === 'undefined') return { lang: 'es', route: 'home' }
  const path = window.location.hash.replace(/^#\/?/, '')
  const segments = path.split('/').filter(Boolean)
  let lang: Lang = 'es', i = 0
  if (segments[i] === 'en') { lang = 'en'; i++ }
  const seg = segments[i]
  let route: Route
  if (!seg) route = 'home'
  else if (KNOWN_ROUTES.has(seg)) route = seg as Route
  else route = 'not-found'
  return { lang, route }
}

export function buildHash(route: Route, lang: Lang): string {
  const effectiveRoute = route === 'not-found' ? 'home' : route
  const l = lang === 'en' ? 'en/' : ''
  const r = effectiveRoute !== 'home' ? `${effectiveRoute}/` : ''
  return `#/${l}${r}`
}

// ─── Context ──────────────────────────────────────────────────────────────────

interface LanguageContextType {
  lang:     Lang
  route:    Route
  setLang:  (l: Lang) => void
  navigate: (r: Route) => void
  href:     (r: Route) => string
  t:        <N extends Namespace>(ns: N, key: keyof typeof translations['es'][N]) => string
}

const LanguageContext = createContext<LanguageContextType>({
  lang:     'es',
  route:    'home',
  setLang:  () => {},
  navigate: () => {},
  href:     () => '#/',
  t:        (_ns, key) => String(key),
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang,  setLangState]  = useState<Lang>('es')
  const [route, setRouteState] = useState<Route>('home')

  // URL is the single source of truth — sync on mount and hash changes
  useEffect(() => {
    const sync = () => {
      const parsed = parseHash()
      setLangState(parsed.lang)
      setRouteState(parsed.route)
    }
    sync()
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [])

  const setLang = (l: Lang) => {
    window.location.hash = buildHash(route, l)
  }

  const navigate = (r: Route) => {
    window.location.hash = buildHash(r, lang)
  }

  const href = (r: Route) => buildHash(r, lang)

  const t = <N extends Namespace>(ns: N, key: keyof typeof translations['es'][N]): string => {
    const section = translations[lang][ns] as Record<string, unknown>
    const val = section[key as string]
    return typeof val === 'string' ? val : String(key)
  }

  return (
    <LanguageContext.Provider value={{ lang, route, setLang, navigate, href, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLang = () => useContext(LanguageContext)
