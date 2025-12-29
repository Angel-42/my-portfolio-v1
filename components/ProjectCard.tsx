type Project = {
  slug: string
  title: string
  year?: number
  description?: string
  tech?: string[]
  repo?: string
  screenshots?: string[]
}

import { useState } from 'react'
const base = process.env.NEXT_PUBLIC_BASE_PATH || ''

function PreviewModal({ project, open, onClose }: { project: Project, open: boolean, onClose: () => void }) {
  if (!open) return null
  const screenshots = project.screenshots || []
  return (
    <div className="preview-modal" role="dialog" aria-modal="true">
      <div className="preview-inner">
        <button className="close-btn" onClick={onClose} aria-label="Close">✕</button>
        <h3>{project.title} <small className="muted">{project.year}</small></h3>
        <p>{project.description}</p>
        <div className="preview-gallery">
          {screenshots.map((s, i) => (
            <img key={i} src={`${base}${s}`} alt={`${project.title} ${i+1}`} loading="lazy" />
          ))}
        </div>
        {project.repo && <p><a href={project.repo} target="_blank" rel="noreferrer">Voir le repo</a></p>}
      </div>
      <div className="preview-backdrop" onClick={onClose} />
    </div>
  )
}

export default function ProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = useState(false)
  const imgSrc = `${base}${project.screenshots?.[0] || `/images/${project.slug}.svg`}`
  return (
    <article className="project-card">
      <div className="project-thumb">
        <img src={imgSrc} alt={`${project.title} thumbnail`} loading="lazy" />
      </div>
      <div className="project-body">
        <h4>{project.title} <small className="muted">{project.year}</small></h4>
        <p className="desc">{project.description}</p>
        <p className="meta">{project.tech?.join(' · ')} {project.repo && (<span> — <a href={project.repo} target="_blank" rel="noreferrer">repo</a></span>)}</p>
        <div style={{marginTop: '0.6rem'}}>
          <button onClick={() => setOpen(true)} style={{marginRight: '0.5rem'}}>Aperçu</button>
          <a href={`/projects/${project.slug}`}>Détails</a>
        </div>
      </div>
      <PreviewModal project={project} open={open} onClose={() => setOpen(false)} />
    </article>
  )
}
