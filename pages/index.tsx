import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import projects from '../data/projects.json'
import ProjectCard from '../components/ProjectCard'
import ProjectCarousel from '../components/ProjectCarousel'
import type { NewsItem } from '../lib/news'
import { useLanguage } from '../context/LanguageContext'

export default function Home({ latest }: { latest?: NewsItem[] }) {
  const [projectsState, setProjectsState] = useState(() => projects)
  const { t, lang } = useLanguage()

  // on mount, try to discover public images named slug-1, slug-2... and attach them to projects
  useEffect(() => {
    let mounted = true
    const exts = ['.png', '.jpg', '.jpeg', '.webp', '.svg']
    ;(async () => {
      const updated = await Promise.all(projects.map(async (p:any) => {
        const slug = p.slug
        const found: string[] = []
        for (let i = 1; i <= 4; i++) {
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
  // split projects into 'en cours' and 'réalisés'
  const inProgressRaw = projectsState.filter((p) => p.status === 'in-progress')
  const completedRaw = projectsState.filter((p) => p.status !== 'in-progress')

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
    if (mode === 'alpha') return [...list].sort((a, b) => {
      const ta = typeof a.title === 'string' ? a.title : (a.title?.[lang] || a.title?.fr || a.title?.en || '')
      const tb = typeof b.title === 'string' ? b.title : (b.title?.[lang] || b.title?.fr || b.title?.en || '')
      return ta.localeCompare(tb)
    })
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

  // const { t, lang } = useLanguage() -- moved above

  // Home: short about and featured projects
  const featured = projectsState.slice(0, 3)
  return (
    <div>
      <section className="site-hero">
        <div className="hero-inner">
          <div style={{flex: '0 0 36%'}}>
            <h1 className="hero-title">Angel SEVERAN</h1>
            <p style={{fontSize: '1.05rem', color: 'rgba(255,255,255,0.92)'}}>{t('HOME.HERO_SUBTITLE')}</p>

            <div style={{marginTop: 18, display: 'flex', gap: 10}} className="hero-cta">
              <a href="/cv.pdf" className="btn btn-primary">{t('HOME.HERO_CV')}</a>
              <Link href="/contact" className="btn btn-ghost">{t('HOME.HERO_CONTACT')}</Link>
            </div>
          </div>

          <div className="hero-grid small" aria-hidden>
            {featured.concat(projectsState.slice(3,6)).map((p:any, i:number) => {
              const titleText = typeof p.title === 'string' ? p.title : (p.title?.[lang] || p.title?.fr || p.title?.en || p.slug)
              return <img key={p.slug + i} src={p.screenshots?.[0] || `/images/${p.slug}.svg`} alt={titleText} />
            })}
          </div>
        </div>
      </section>

      <section style={{marginTop: '1.2rem'}}>
        <h3 style={{ color:'rgba(255,255,255,0.85)' }}>{t('HOME.FEATURED_TITLE')}</h3>
        <ProjectCarousel projects={featured} />
        <p style={{marginTop: '0.8rem', color:'rgba(255,255,255,0.85)'}}>{t('HOME.FEATURED_MORE')}</p>
      </section>

      {/* move latest news to bottom, styled consistently with content */}
      <section className="latest-news corporate bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl" style={{marginTop: '2.4rem'}}>
        <h3 className="text-white font-bold mb-2">{t('NEWS.LATEST_TITLE')}</h3>
        {latest && latest.length ? (
          <div>
            <strong style={{color: 'white'}}>{latest && latest[0] ? (typeof latest[0].title === 'string' ? latest[0].title : (latest[0].title?.[lang] || latest[0].title?.fr || latest[0].title?.en || '')) : ''}</strong>
            <div style={{color:'rgba(255,255,255,0.85)', marginTop:6}}>{latest && latest[0] ? (typeof latest[0].summary === 'string' ? latest[0].summary : (latest[0].summary?.[lang] || latest[0].summary?.fr || latest[0].summary?.en || '')) : ''}</div>
            <div style={{marginTop:8}}><a href="/news">{t('NEWS.SEE_ALL_NEWS')}</a></div>
          </div>
        ) : (
          <p style={{margin:0}}><strong>{t('ABOUT.SEARCH_TITLE') || 'Recherche de stage'}</strong> — {t('ABOUT.SEARCH_DESC')}</p>
        )}
      </section>
    </div>
  )
}

export async function getStaticProps() {
  // server-side news aggregation
  let latest: NewsItem[] = []
  try {
    const { getLatestNews } = await import('../lib/news')
    latest = await getLatestNews(1, 'NEWS')
  } catch (e) {
    latest = []
  }
  return { props: { latest } }
}
