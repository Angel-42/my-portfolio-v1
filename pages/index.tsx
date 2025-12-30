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
      // sort by year, then by month when year is equal
      const ay = a.year || 0
      const by = b.year || 0
      if (ay !== by) {
        return order === 'desc' ? (by - ay) : (ay - by)
      }
      // months may be missing; default to 0
      const am = a.month || 0
      const bm = b.month || 0
      return order === 'desc' ? (bm - am) : (am - bm)
    })
    return list
  }

  const inProgress = sortList(inProgressRaw, sortModeIn, sortOrderIn)
  const completed = sortList(completedRaw, sortModeDone, sortOrderDone)

  // Home: short about and featured projects
  const featured = projects.slice(0, 3)
  return (
    <div>
      <section>
        <h2>Bonjour — je suis Angel SEVERAN</h2>
        <p>
          Étudiant à Epitech Montpellier. Recherche de stage 4-6 mois à partir d'avril 2026.
        </p>
        <p>
          Compétences : C / C++ / TypeScript / Flutter / Linux / Git
        </p>
      </section>

      <section style={{marginTop: '1.2rem'}}>
        <h3>À l'affiche</h3>
        <p>Projets récents et en cours — un échantillon rapide.</p>
        <div className="projects-grid">
          {featured.map((p:any) => <ProjectCard key={p.slug} project={p} />)}
        </div>
        <p style={{marginTop: '0.8rem'}}>Voir la liste complète des <a href="/projects">projets</a> ou <a href="/about">en savoir plus</a> sur moi.</p>
      </section>
    </div>
  )
}
