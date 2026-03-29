import { createContext, useContext, useEffect, useState } from 'react'

import esCommon from '@/locales/es/common.json'
import enCommon from '@/locales/en/common.json'
import esHome   from '@/locales/es/home.json'
import enHome   from '@/locales/en/home.json'
import esAbout  from '@/locales/es/about.json'
import enAbout  from '@/locales/en/about.json'

export type Lang = 'es' | 'en'

const translations = {
  es: { common: esCommon, home: esHome, about: esAbout },
  en: { common: enCommon, home: enHome, about: enAbout },
} as const

type Namespace = keyof typeof translations['es']

interface LanguageContextType {
  lang: Lang
  setLang: (l: Lang) => void
  t: <N extends Namespace>(ns: N, key: keyof typeof translations['es'][N]) => string
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'es',
  setLang: () => {},
  t: (_ns, key) => String(key),
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('es')

  useEffect(() => {
    const stored = localStorage.getItem('lang') as Lang | null
    if (stored === 'es' || stored === 'en') setLangState(stored)
  }, [])

  const setLang = (l: Lang) => {
    setLangState(l)
    localStorage.setItem('lang', l)
  }

  const t = <N extends Namespace>(ns: N, key: keyof typeof translations['es'][N]): string => {
    const section = translations[lang][ns] as Record<string, unknown>
    const val = section[key as string]
    return typeof val === 'string' ? val : String(key)
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLang = () => useContext(LanguageContext)
