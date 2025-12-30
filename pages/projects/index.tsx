import { useMemo, useState, useEffect } from 'react'
import projects from '../../data/projects.json'
import ProjectCard from '../../components/ProjectCard'
import { useLanguage } from '../../context/LanguageContext'

export default function ProjectsPage() {
  const [sortMode, setSortMode] = useState<'alpha' | 'date'>('date')
  const [order, setOrder] = useState<'desc' | 'asc'>('desc')
  const [projectsState, setProjectsState] = useState(() => projects)
  const { t, lang } = useLanguage()

  // discover images named slug-1, slug-2, ... in public/images and attach to project data
  useEffect(() => {
    let mounted = true
    const exts = ['.png', '.jpg', '.jpeg', '.webp', '.svg']
    const base = process.env.NEXT_PUBLIC_BASE_PATH || ''
    ;(async () => {
      const updated = await Promise.all(projects.map(async (p:any) => {
        const slug = p.slug
        const found: string[] = []
        for (let i = 1; i <= 6; i++) {
          let got = false
          for (const ext of exts) {
            try {
              const url = `${base}/images/${slug}-${i}${ext}`
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
      list.sort((a:any,b:any) => {
        const ta = typeof a.title === 'string' ? a.title : (a.title?.[lang] || a.title?.fr || a.title?.en || '')
        const tb = typeof b.title === 'string' ? b.title : (b.title?.[lang] || b.title?.fr || b.title?.en || '')
        return ta.localeCompare(tb)
      })
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
      <h2>{t('PROJECTS.TITLE')}</h2>

      <div style={{marginTop: '1rem', display: 'flex', gap: 12, alignItems: 'center'}}>
        <div className="projects-controls">
          <label> {t('PROJECTS.SORT_BY')}: </label>
          <select value={sortMode} onChange={(e) => setSortMode(e.target.value as any)}>
            <option value="date">{t('PROJECTS.SORT_DATE')}</option>
            <option value="alpha">{t('PROJECTS.SORT_ALPHA')}</option>
          </select>
          <button className="sort-order-btn" onClick={() => setOrder(o => o === 'desc' ? 'asc' : 'desc')}>{order === 'desc' ? t('PROJECTS.ORDER_DESC') : t('PROJECTS.ORDER_ASC')}</button>
        </div>
      </div>

      <section style={{marginTop: '1.6rem'}}>
        <h3>{t('PROJECTS.IN_PROGRESS')}</h3>
        <p>{t('PROJECTS.IN_PROGRESS_DESC')}</p>
        <div className="bento-grid" style={{marginTop: '1rem'}}>
          {inProgress.length ? inProgress.map((p:any) => (
            <ProjectCard key={p.slug} project={p} variant={(p.screenshots && p.screenshots.length > 0) ? 'large' : 'small'} />
          )) : <div>{t('PROJECTS.NONE_IN_PROGRESS')}</div>}
        </div>
      </section>

      <section style={{marginTop: '2rem'}}>
        <h3>{t('PROJECTS.OTHER_PROJECTS')}</h3>
        <p>{t('PROJECTS.OTHER_DESC')}</p>
        <div className="bento-grid" style={{marginTop: '1rem'}}>
          {others.map((p:any) => (
            <ProjectCard key={p.slug} project={p} variant={(p.screenshots && p.screenshots.length > 0) ? 'large' : 'small'} />
          ))}
        </div>
      </section>
    </div>
  )
}
