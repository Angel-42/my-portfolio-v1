import Link from 'next/link'
import { useLanguage } from '../context/LanguageContext'

type Project = {
  slug: string
  title: any
  year?: number
  description?: any
  tech?: string[]
  repo?: string
  screenshots?: string[]
  status?: string
}

const base = process.env.NEXT_PUBLIC_BASE_PATH || ''

export default function ProjectCard({ project, variant }: { project: Project, variant?: 'large' | 'small' }) {
  const { t, lang } = useLanguage()
  const imgSrc = `${base}${project.screenshots?.[0] || `/images/${project.slug}.svg`}`
  const isLive = project.status === 'in-progress' || project.status === 'in development' || project.status === 'ongoing'

  const stackIcons = (project.tech || []).map((t) => {
    const key = t.toLowerCase().replace(/[^a-z0-9]/g, '-')
    const path = `${base}/images/${key}.svg`
    return { name: t, src: path }
  })

  const titleText = typeof project.title === 'string' ? project.title : (project.title?.[lang] || project.title?.fr || project.title?.en || '')
  const descText = typeof project.description === 'string' ? project.description : (project.description?.[lang] || project.description?.fr || project.description?.en || '')

  return (
    <article className={`project-card ${variant === 'large' ? 'large' : 'small'}`}>
      <div className="project-thumb">
        <img src={imgSrc} alt={`${titleText} thumbnail`} loading="lazy" />
        <div className="thumb-overlay">
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', gap:12}}>
            <div className="thumb-title">{titleText}</div>
          </div>
          {isLive && <span className="status-badge small"><span className="pulse" /> {t('PROJECTS.IN_PROGRESS')}</span>}
        </div>
      </div>
      <div className="project-body card-body glass">
        <div className="body-top">
          <h4>{titleText} <small className="muted">{project.year}</small></h4>
          <p className="desc">{descText}</p>
        </div>

        <div className="body-bottom">
          <div className="stacks">
            {stackIcons.map(s => (
              <img key={s.name} src={s.src} alt={s.name} title={s.name} className="stack-icon" onError={(e:any)=>{e.currentTarget.style.display='none'}} />
            ))}
          </div>
          <div className="actions">
            <Link href={`/projects/${project.slug}`} className="btn btn-ghost">{t('BUTTONS.DETAILS')}</Link>
          </div>
        </div>
      </div>
    </article>
  )
}
