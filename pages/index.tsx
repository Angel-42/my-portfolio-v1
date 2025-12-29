import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import projects from '../data/projects.json'
import ProjectCard from '../components/ProjectCard'

export default function Home() {
  // split projects into 'en cours' and 'réalisés'
  const inProgressRaw = projects.filter((p) => p.status === 'in-progress')
  const completedRaw = projects.filter((p) => p.status !== 'in-progress')

  const router = useRouter()

  // per-section sort params in query: sort_in / order_in and sort_done / order_done
  const [sortModeIn, setSortModeIn] = useState<'default' | 'alpha' | 'year'>('default')
  const [sortOrderIn, setSortOrderIn] = useState<'desc' | 'asc'>('desc')
  const [sortModeDone, setSortModeDone] = useState<'default' | 'alpha' | 'year'>('default')
  const [sortOrderDone, setSortOrderDone] = useState<'desc' | 'asc'>('desc')

  // initialize from query on mount / when router ready
  useEffect(() => {
    if (!router.isReady) return
    const q = router.query
    const sIn = (q.sort_in as string) || 'default'
    const oIn = (q.order_in as string) || 'desc'
    const sDone = (q.sort_done as string) || 'default'
    const oDone = (q.order_done as string) || 'desc'
    if (sIn === 'alpha' || sIn === 'year' || sIn === 'default') setSortModeIn(sIn)
    setSortOrderIn(oIn === 'asc' ? 'asc' : 'desc')
    if (sDone === 'alpha' || sDone === 'year' || sDone === 'default') setSortModeDone(sDone)
    setSortOrderDone(oDone === 'asc' ? 'asc' : 'desc')
  }, [router.isReady])

  // when any mode/order change, update query string (shallow)
  useEffect(() => {
    if (!router.isReady) return
    const query = {
      ...router.query,
      sort_in: sortModeIn,
      order_in: sortOrderIn,
      sort_done: sortModeDone,
      order_done: sortOrderDone,
    }
    router.replace({ pathname: router.pathname, query }, undefined, { shallow: true })
  }, [sortModeIn, sortOrderIn, sortModeDone, sortOrderDone, router.isReady])

  const sortList = (list: any[], mode: string, order: 'desc' | 'asc') => {
    if (mode === 'alpha') return [...list].sort((a, b) => (a.title || '').localeCompare(b.title || ''))
    if (mode === 'year') return [...list].sort((a, b) => {
      const diff = (b.year || 0) - (a.year || 0)
      return order === 'desc' ? diff : -diff
    })
    return list
  }

  const inProgress = sortList(inProgressRaw, sortModeIn, sortOrderIn)
  const completed = sortList(completedRaw, sortModeDone, sortOrderDone)

  return (
    <div>
      <section>
        <h2>Bonjour — je suis Angel SEVERAN</h2>
        <p>Étudiant à Epitech Montpellier. Voici une sélection de mes projets — d'abord ceux en cours, puis les projets réalisés.</p>
      </section>

      <section style={{marginTop: '1.5rem'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <h3 style={{margin: 0}}>Projets en cours</h3>
          <div className="projects-controls">
            <label htmlFor="sort">Trier : </label>
            <select id="sort" value={sortModeIn} onChange={(e) => setSortModeIn(e.target.value as any)}>
              <option value="default">Par défaut</option>
              <option value="alpha">Alphabetique (A→Z)</option>
              <option value="year">Année</option>
            </select>
            <button className="sort-order-btn" title="Inverser l'ordre" onClick={() => setSortOrderIn(s => s === 'desc' ? 'asc' : 'desc')}>{sortOrderIn === 'desc' ? '↓' : '↑'}</button>
          </div>
        </div>

        {inProgress.length ? (
          <div className="projects-grid">
            {inProgress.map((p: any) => <ProjectCard key={p.slug} project={p} />)}
          </div>
        ) : (<p>Aucun projet en cours pour le moment.</p>)}
      </section>

      <section style={{marginTop: '1.5rem'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <h3 style={{margin: 0}}>Projets réalisés</h3>
          <div className="projects-controls">
            <label htmlFor="sort2">Trier : </label>
            <select id="sort2" value={sortModeDone} onChange={(e) => setSortModeDone(e.target.value as any)}>
              <option value="default">Par défaut</option>
              <option value="alpha">Alphabetique (A→Z)</option>
              <option value="year">Année</option>
            </select>
            <button className="sort-order-btn" title="Inverser l'ordre" onClick={() => setSortOrderDone(s => s === 'desc' ? 'asc' : 'desc')}>{sortOrderDone === 'desc' ? '↓' : '↑'}</button>
          </div>
        </div>

        {completed.length ? (
          <div className="projects-grid">
            {completed.map((p: any) => <ProjectCard key={p.slug} project={p} />)}
          </div>
        ) : (<p>Aucun projet réalisé listé.</p>)}
      </section>
    </div>
  )
}
