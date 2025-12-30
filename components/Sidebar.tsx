import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import projects from '../data/projects.json'
import { useLanguage } from '../context/LanguageContext'

export default function Sidebar() {
  const [open, setOpen] = useState(false)
  const inProgress = projects.filter((p) => p.status === 'in-progress')
  const completed = projects.filter((p) => p.status !== 'in-progress')
  const router = useRouter()

  const isActive = (path: string) => router.pathname === path
  const { t, lang } = useLanguage()

  return (
    <aside className={`app-sidebar ${open ? 'open' : ''}`}>
      <button className="hamburger" aria-label="Toggle sidebar" onClick={() => setOpen(v => !v)}>
        <span />
        <span />
        <span />
      </button>

      <div className="sidebar-inner">
        <nav className="sidebar-nav">
          <ul>
            <li><Link href="/" className={isActive('/') ? 'active' : ''}>{t('SIDEBAR.HOME')}</Link></li>
            <li><Link href="/about" className={isActive('/about') ? 'active' : ''}>{t('SIDEBAR.ABOUT')}</Link></li>
            <li><Link href="/projects" className={isActive('/projects') ? 'active' : ''}>{t('SIDEBAR.PROJECTS')}</Link></li>
            <li><Link href="/contact" className={isActive('/contact') ? 'active' : ''}>{t('SIDEBAR.CONTACT')}</Link></li>
          </ul>
        </nav>

        <section className="whoami">
          <h4>{t('SIDEBAR.WHOAMI_TITLE')}</h4>
          <p>{t('SIDEBAR.WHOAMI_DESC')}</p>
        </section>

        <section className="sidebar-section">
          <h5>{t('SIDEBAR.IN_PROGRESS_TITLE')}</h5>
          <ul>
            {inProgress.slice(0,5).map(p => (
              <li key={p.slug}><Link href={`/projects/${p.slug}`} className={router.asPath === `/projects/${p.slug}` ? 'active' : ''}>{typeof p.title === 'string' ? p.title : (p.title?.[lang] || p.title?.fr || p.title?.en || p.slug)}</Link></li>
            ))}
            {inProgress.length > 5 && <li><Link href="/projects">{t('SIDEBAR.VIEW_ALL')}</Link></li>}
          </ul>
        </section>

        <section className="sidebar-section">
          <h5>{t('SIDEBAR.COMPLETED_TITLE')}</h5>
          <ul>
            {completed.slice(0,5).map(p => (
              <li key={p.slug}><Link href={`/projects/${p.slug}`} className={router.asPath === `/projects/${p.slug}` ? 'active' : ''}>{typeof p.title === 'string' ? p.title : (p.title?.[lang] || p.title?.fr || p.title?.en || p.slug)}</Link></li>
            ))}
            {completed.length > 5 && <li><Link href="/projects">{t('SIDEBAR.VIEW_ALL')}</Link></li>}
          </ul>
        </section>

        <section className="sidebar-section contact">
          <h5>{t('SIDEBAR.CONTACT')}</h5>
          <a href="mailto:severan.angel.pro@gmail.com">severan.angel.pro@gmail.com</a>
        </section>
      </div>
    </aside>
  )
}
