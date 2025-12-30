import Link from 'next/link'
import Sidebar from './Sidebar'

type Props = {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <div className="app-root">
      <Sidebar />
      <div className="app-main">
        <header className="app-header">
          <nav className="nav-bar">
            <h1 className="brand"><Link href="/">Angel SEVERAN</Link></h1>
            <div className="nav-actions">
              <Link href="/">Accueil</Link>
              <span className="sep">|</span>
              <a href="/cv.pdf" target="_blank" rel="noreferrer">CV</a>
            </div>
          </nav>
        </header>

        <main className="app-content">{children}</main>

        <footer className="app-footer">
          © {new Date().getFullYear()} Angel SEVERAN — <a href="mailto:severan.angel.pro@gmail.com">Contact</a>
        </footer>
      </div>
    </div>
  )
}
