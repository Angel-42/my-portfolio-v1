import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'

type Props = { projects: any[] }

const base = process.env.NEXT_PUBLIC_BASE_PATH || ''

export default function ProjectCarousel({ projects }: Props) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const intervalRef = useRef<number | null>(null)
  const { lang } = useLanguage()

  useEffect(() => {
    if (paused || projects.length === 0) return
    intervalRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % projects.length)
    }, 5000)
    return () => { if (intervalRef.current) window.clearInterval(intervalRef.current) }
  }, [paused, projects.length])

  useEffect(() => {
    if (index >= projects.length) setIndex(0)
  }, [projects.length])

  const go = (to: number) => setIndex((to + projects.length) % projects.length)

  return (
    <div className="carousel" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="carousel-viewport">
        <div className="carousel-slides" style={{ transform: `translateX(-${index * 100}%)` }}>
          {projects.map((p) => {
            const base = process.env.NEXT_PUBLIC_BASE_PATH || ''
            // keep `src` as a site-root relative path (e.g. `/images/...`)
            // and prefix `base` only when rendering to avoid double-prefixes
            const src = p.screenshots?.[0] ? p.screenshots[0] : `/images/${p.slug}.svg`
            const titleText = typeof p.title === 'string' ? p.title : (p.title?.[lang] || p.title?.fr || p.title?.en || '')
            return (
              <div className="slide" key={p.slug}>
                    <a href={`${base}/projects/${p.slug}`} className="carousel-link">
                      {p.screenshots?.[0] ? (
                        <img className="carousel-image" src={`${base}${src}`} alt={titleText} loading="lazy" />
                      ) : (
                        <div className="carousel-fallback" aria-hidden>
                          <div className="fallback-gradient" />
                        </div>
                      )}

                      <div className="carousel-caption">
                        <h4>{(titleText || '').replace(' (placeholder)','')}</h4>
                        {p.year && <small className="muted">{p.year}</small>}
                        {p.tech && p.tech.length ? (
                          <div className="carousel-techs">
                            {p.tech.slice(0,4).map((t:string) => (
                              <span key={t} className="tech-badge">{t}</span>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    </a>
                  </div>
            )
          })}
        </div>
      </div>

      <div className="carousel-controls">
        <button aria-label="Prev" className="carousel-btn" onClick={() => go(index - 1)}>‹</button>
        <div className="carousel-indicators">
          {projects.map((_, i) => (
            <button key={i} onClick={() => go(i)} className={`indicator ${i === index ? 'active' : ''}`} aria-label={`Slide ${i+1}`} />
          ))}
        </div>
        <button aria-label="Next" className="carousel-btn" onClick={() => go(index + 1)}>›</button>
      </div>
    </div>
  )
}
