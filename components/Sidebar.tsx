import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import projects from '../data/projects.json'

export default function Sidebar() {
  const [open, setOpen] = useState(false)
  const inProgress = projects.filter((p) => p.status === 'in-progress')
  const completed = projects.filter((p) => p.status !== 'in-progress')
  const router = useRouter()

  const isActive = (path: string) => router.pathname === path

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
            <li><Link href="/" className={isActive('/') ? 'active' : ''}>Accueil</Link></li>
            <li><Link href="/about" className={isActive('/about') ? 'active' : ''}>À propos</Link></li>
            <li><Link href="/projects" className={isActive('/projects') ? 'active' : ''}>Projets</Link></li>
            <li><Link href="/contact" className={isActive('/contact') ? 'active' : ''}>Contact</Link></li>
          </ul>
        </nav>

        <section className="whoami">
          <h4>Qui suis‑je ?</h4>
          <p>Angel SEVERAN — étudiant 3ème année Epitech. Dév C/C++, TypeScript & mobile.</p>
        </section>

        <section className="sidebar-section">
          <h5>Projets en cours</h5>
          <ul>
            {inProgress.slice(0,5).map(p => (
              <li key={p.slug}><Link href={`/projects/${p.slug}`} className={router.asPath === `/projects/${p.slug}` ? 'active' : ''}>{p.title}</Link></li>
            ))}
            {inProgress.length > 5 && <li><Link href="/projects">Voir tous</Link></li>}
          </ul>
        </section>

        <section className="sidebar-section">
          <h5>Projets réalisés</h5>
          <ul>
            {completed.slice(0,5).map(p => (
              <li key={p.slug}><Link href={`/projects/${p.slug}`} className={router.asPath === `/projects/${p.slug}` ? 'active' : ''}>{p.title}</Link></li>
            ))}
            {completed.length > 5 && <li><Link href="/projects">Voir tous</Link></li>}
          </ul>
        </section>

        <section className="sidebar-section contact">
          <h5>Contact</h5>
          <a href="mailto:severan.angel.pro@gmail.com">severan.angel.pro@gmail.com</a>
        </section>
      </div>
    </aside>
  )
}
