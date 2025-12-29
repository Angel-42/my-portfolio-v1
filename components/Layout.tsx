import Link from 'next/link'

type Props = {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <div>
      <header style={{padding: '1rem 2rem', borderBottom: '1px solid #eee'}}>
        <nav style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
          <h1 style={{margin: 0}}><Link href="/">Angel SEVERAN</Link></h1>
          <div style={{marginLeft: 'auto'}}>
            <Link href="/">Accueil</Link>
            <span style={{padding: '0 0.6rem'}}>|</span>
            <a href="/cv.pdf" target="_blank" rel="noreferrer">CV</a>
          </div>
        </nav>
      </header>
      <main style={{padding: '2rem'}}>{children}</main>
      <footer style={{padding: '1rem 2rem', borderTop: '1px solid #eee', marginTop: '2rem'}}>
        © {new Date().getFullYear()} Angel SEVERAN — <a href="mailto:severan.angel.pro@gmail.com">Contact</a>
      </footer>
    </div>
  )
}
