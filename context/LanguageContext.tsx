import React, { createContext, useContext, useEffect, useState } from 'react'
import translationsFile from '../locales/translations'

type Lang = 'en' | 'fr'

type LanguageContextType = {
  lang: Lang
  toggle: () => void
  t: (key: string) => string
}

// Choose a stable server-side default to avoid hydration mismatches.
// Do not access `navigator` at module evaluation time (server has no navigator).
const SERVER_DEFAULT_LANG: Lang = 'en'

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

function resolveKey(obj: any, path: string): string | undefined {
  // support dot notation like 'NAV.ABOUT'
  const parts = path.split('.')
  let cur: any = obj
  for (const p of parts) {
    if (cur && typeof cur === 'object' && p in cur) cur = cur[p]
    else return undefined
  }
  return typeof cur === 'string' ? cur : undefined
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    // Use the server default for the initial render (both SSR and during hydration)
    // and defer reading `localStorage`/`navigator` until after mount to avoid
    // rendering mismatches between server and client.
    return SERVER_DEFAULT_LANG
  })

  // On mount, synchronize the language from stored preference or navigator.
  useEffect(() => {
    try {
      const stored = localStorage.getItem('site-lang')
      if (stored === 'en' || stored === 'fr') {
        setLang(stored as Lang)
        return
      }
      // infer from browser language
      const navLang = typeof navigator !== 'undefined' && navigator.language?.startsWith('fr') ? 'fr' : 'en'
      setLang(navLang as Lang)
    } catch (e) {
      // ignore
    }
  }, [])

  useEffect(() => {
    try { localStorage.setItem('site-lang', lang) } catch (e) { /* ignore */ }
  }, [lang])

  const toggle = () => setLang((l) => l === 'en' ? 'fr' : 'en')

  const t = (key: string) => {
    const langSet = (translationsFile as any)[lang]
    // try dot-notation
    const found = resolveKey(langSet, key)
    if (found) return found
    // fallback: try top-level key direct
    return (langSet && (langSet as any)[key]) ?? key
  }

  return (
    <LanguageContext.Provider value={{ lang, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}

export default LanguageProvider
