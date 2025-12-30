import { GetStaticPaths, GetStaticProps } from 'next'
import projects from '../../data/projects.json'
import Link from 'next/link'
import React from 'react'
import { remark } from 'remark'
import remarkHtml from 'remark-html'

type Project = {
  slug: string
  title: string
  year?: number
  month?: number
  description?: string
  tech?: string[]
  repo?: string
  screenshots?: string[]
}

// We use `remark` + `remark-html` in getStaticProps to convert README.md to HTML.

export default function ProjectPage({ project, readmeHtml }: { project: Project | null, readmeHtml?: string | null })
{
  if (!project) return <div>Projet non trouvé — <Link href="/">Retour</Link></div>
  return (
    <article>
      <h2>{project.title}</h2>
      {project.year && <p><em>{project.year}{project.month ? `/${project.month}` : ''}</em></p>}
      <p>{project.description}</p>

      {project.screenshots && project.screenshots.length > 0 && (
        <div className="project-gallery">
          {project.screenshots.map((s, i) => (
            <img key={i} src={s} alt={`${project.title} ${i+1}`} />
          ))}
        </div>
      )}

      {project.tech && <p><strong>Tech:</strong> {project.tech.join(', ')}</p>}
      {project.repo && <p><a href={project.repo} target="_blank" rel="noreferrer">Voir le repo</a></p>}

      {readmeHtml ? (
        <section className="project-readme" dangerouslySetInnerHTML={{ __html: readmeHtml }} />
      ) : (
        <p>Aucun README disponible pour ce projet.</p>
      )}
    </article>
  )
}

export const getStaticPaths: GetStaticPaths = async () =>
{
  const paths = projects.map((p) => ({ params: { slug: p.slug } }))
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async (context) =>
{
  const fs = await import('fs')
  const path = await import('path')

  const slug = context.params?.slug as string
  const project = projects.find((p) => p.slug === slug) || null

  // collect available images from public/images matching the naming convention: slug-<n>.*
  if (project) {
    try {
      const imagesDir = path.resolve(process.cwd(), 'public', 'images')
      if (fs.existsSync(imagesDir)) {
        const files = fs.readdirSync(imagesDir)
        const matched = files.filter((f) => new RegExp(`^${slug}-\\d+\\.(png|jpe?g|gif|webp|svg)$`, 'i').test(f))
        if (matched.length > 0) {
          // sort by numeric index (slug-1, slug-2...)
          matched.sort((a, b) => {
            const na = Number((a.match(/-(\\d+)\./) || [0,0])[1] || 0)
            const nb = Number((b.match(/-(\\d+)\./) || [0,0])[1] || 0)
            return na - nb
          })
          // map to public paths
          project.screenshots = matched.map((f) => `/images/${f}`)
        }
      }
    } catch (e) {
      // ignore filesystem errors and fallback to existing screenshots
    }
  }

  let readmeHtml: string | null = null
  if (project && project.repo) {
    try {
      // try to parse a GitHub repo URL like https://github.com/owner/repo
      const m = project.repo.match(/github.com\/(.+?)\/(.+?)(?:\.git|$|\/)/)
      if (m) {
        const owner = m[1]
        const repo = m[2]
        // attempt to fetch README from raw.githubusercontent (default branch main/master)
        // try main then master
        const tryUrls = [
          `https://raw.githubusercontent.com/${owner}/${repo}/main/README.md`,
          `https://raw.githubusercontent.com/${owner}/${repo}/master/README.md`,
          `https://raw.githubusercontent.com/${owner}/${repo}/main/readme.md`,
          `https://raw.githubusercontent.com/${owner}/${repo}/master/readme.md`,
        ]
        let md: string | null = null
        for (const u of tryUrls) {
          const res = await fetch(u)
          if (res.ok) {
            md = await res.text()
            break
          }
        }
        if (md) {
          const processed = await remark().use(remarkHtml).process(md)
          readmeHtml = processed.toString()
        }
      }
    } catch (e) {
      // ignore fetch errors
      readmeHtml = null
    }
  }

  return { props: { project, readmeHtml } }
}
