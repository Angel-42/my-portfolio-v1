import { useMemo, useState, useEffect } from 'react'
import projects from '../../data/projects.json'
import ProjectCard from '../../components/ProjectCard'

export default function ProjectsPage() {
  const [sortMode, setSortMode] = useState<'alpha' | 'date'>('date')
  const [order, setOrder] = useState<'desc' | 'asc'>('desc')
  const [projectsState, setProjectsState] = useState(() => projects)

  // discover images named slug-1, slug-2, ... in public/images and attach to project data
  useEffect(() => {
    let mounted = true
    const exts = ['.png', '.jpg', '.jpeg', '.webp', '.svg']
    ;(async () => {
      const updated = await Promise.all(projects.map(async (p:any) => {
        const slug = p.slug
        const found: string[] = []
        for (let i = 1; i <= 6; i++) {
          let got = false
          for (const ext of exts) {
            try {
              const url = `/images/${slug}-${i}${ext}`
              const res = await fetch(url, { method: 'GET' })
              if (res.ok) { found.push(url); got = true; break }
            } catch (e) {
              // ignore
            }
          }
          if (!got) break
        }
        if (found.length) return { ...p, screenshots: found }
        return p
      }))
      if (mounted) setProjectsState(updated)
    })()
    return () => { mounted = false }
  }, [])

  const sorted = useMemo(() => {
    const list = [...projectsState]
    if (sortMode === 'alpha') {
      list.sort((a:any,b:any) => (a.title||'').localeCompare(b.title||''))
    } else {
      list.sort((a:any,b:any) => {
        const ay = a.year || 0
        const by = b.year || 0
        if (ay !== by) return order === 'desc' ? by - ay : ay - by
        const am = a.month || 0
        const bm = b.month || 0
        return order === 'desc' ? bm - am : am - bm
      })
    }
    if (order === 'asc' && sortMode === 'alpha') list.reverse()
    return list
  }, [sortMode, order, projectsState])

  const inProgress = sorted.filter(p => p.status === 'in-progress')
  const others = sorted.filter(p => p.status !== 'in-progress')

  return (
    <div>
      <h2>Tous mes projets</h2>

      <div style={{marginTop: '1rem', display: 'flex', gap: 12, alignItems: 'center'}}>
        <div className="projects-controls">
          <label> Trier par: </label>
          <select value={sortMode} onChange={(e) => setSortMode(e.target.value as any)}>
            <option value="date">Date</option>
            <option value="alpha">Alphabet</option>
          </select>
          <button className="sort-order-btn" onClick={() => setOrder(o => o === 'desc' ? 'asc' : 'desc')}>{order === 'desc' ? 'Desc' : 'Asc'}</button>
        </div>
      </div>

      <section style={{marginTop: '1.6rem'}}>
        <h3>En cours</h3>
        <p>Projets actuellement en développement.</p>
        <div className="bento-grid" style={{marginTop: '1rem'}}>
          {inProgress.length ? inProgress.map((p:any) => (
            <ProjectCard key={p.slug} project={p} variant={(p.screenshots && p.screenshots.length > 0) ? 'large' : 'small'} />
          )) : <div>Aucun projet en cours pour l'instant.</div>}
        </div>
      </section>

      <section style={{marginTop: '2rem'}}>
        <h3>Autres projets</h3>
        <p>Projets terminés ou archivés.</p>
        <div className="bento-grid" style={{marginTop: '1rem'}}>
          {others.map((p:any) => (
            <ProjectCard key={p.slug} project={p} variant={(p.screenshots && p.screenshots.length > 0) ? 'large' : 'small'} />
          ))}
        </div>
      </section>
    </div>
  )
}
