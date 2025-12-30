import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useLanguage } from '../context/LanguageContext'

type Props = {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  const router = useRouter()
  const isHome = router.pathname === '/' || router.asPath === '/'

  useEffect(() => {
    const header = document.querySelector('.top-header') as HTMLElement | null
    const hero = document.querySelector('.site-hero') as HTMLElement | null
    if (!header) return

    const update = () => {
      if (!hero) {
        header.classList.add('solid')
        header.classList.remove('over-hero')
        return
      }
      const heroRect = hero.getBoundingClientRect()
      const headerHeight = header.offsetHeight
      // if hero still extends below header, we are overlapping hero
      if (heroRect.bottom > headerHeight) {
        header.classList.add('over-hero')
        header.classList.remove('solid')
      } else {
        header.classList.remove('over-hero')
        header.classList.add('solid')
      }
    }

    // set body padding to avoid content jump under fixed header
    const setBodyPadding = () => {
      document.body.style.paddingTop = `${header.offsetHeight}px`
    }

    update()
    setBodyPadding()
    window.addEventListener('scroll', update)
    window.addEventListener('resize', () => { update(); setBodyPadding() })
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', () => { update(); setBodyPadding() })
      document.body.style.paddingTop = ''
    }
  }, [])

  const { lang, toggle, t } = useLanguage()
  const base = process.env.NEXT_PUBLIC_BASE_PATH || ''

  return (
    <div className={`app-root ${isHome ? 'home-page' : ''}`}>
      <header className="top-header">
        <div className="top-inner">
          <div className="top-left">
            <Link href="/">
              <picture>
                <source srcSet={`${base}/logo.png`} type="image/png" />
                <img src={`${base}/logo.svg`} alt="logo" className="site-logo large" />
              </picture>
            </Link>
          </div>

          <nav className="top-nav">
            <Link href="/about" className="nav-link">{t('NAV.ABOUT').toUpperCase()}</Link>
            <Link href="/projects" className="nav-link">{t('NAV.WORK').toUpperCase()}</Link>
            <Link href="/news" className="nav-link">{t('NAV.CHRONICLES').toUpperCase()}</Link>
            <Link href="/contact" className="nav-link">{t('NAV.CONTACT').toUpperCase()}</Link>
          </nav>

          <div className="top-right">
            <button
              className="lang-toggle"
              onClick={toggle}
              aria-label={lang === 'en' ? t('HEADER.TOGGLE_TO_FR') : t('HEADER.TOGGLE_TO_EN')}
              title={lang === 'en' ? t('HEADER.TOGGLE_TO_FR') : t('HEADER.TOGGLE_TO_EN')}
            >
              {lang === 'en' ? 'EN' : 'FR'}
            </button>
          </div>
        </div>
      </header>

      <main className="app-content">{children}</main>

      <footer className="app-footer">
        © {new Date().getFullYear()} Angel SEVERAN — <a href="mailto:severan.angel.pro@gmail.com">{t('FOOTER.CONTACT')}</a>
      </footer>
    </div>
  )
}
