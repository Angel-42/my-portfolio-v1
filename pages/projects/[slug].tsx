import { GetStaticPaths, GetStaticProps } from 'next'
import projects from '../../data/projects.json'
import Link from 'next/link'
import React from 'react'
import { remark } from 'remark'
import remarkHtml from 'remark-html'
import { useLanguage } from '../../context/LanguageContext'

type LocalizedString = string | { fr?: string; en?: string; [k: string]: string | undefined }

type Project = {
  slug: string
  title: LocalizedString
  year?: number
  month?: number
  description?: LocalizedString
  tech?: string[]
  repo?: string
  screenshots?: string[]
}

// We use `remark` + `remark-html` in getStaticProps to convert README.md to HTML.

export default function ProjectPage({ project, readmeHtml }: { project: Project | null, readmeHtml?: any }) {
  const { t, lang } = useLanguage()
  if (!project) {
    return (
      <div>{t('PROJECTS.NOT_FOUND')} — <Link href="/">{t('BUTTONS.BACK')}</Link></div>
    )
  }

  const getText = (v?: LocalizedString) => {
    if (!v) return ''
    return typeof v === 'string' ? v : (v?.[lang] || v?.fr || v?.en || '')
  }

  const titleText = getText(project.title)
  const descText = getText(project.description)

  return (
    <article>
      <h2>{titleText}</h2>
      {project.year && <p><em>{project.year}{project.month ? `/${project.month}` : ''}</em></p>}
      <p>{descText}</p>

      {project.screenshots && project.screenshots.length > 0 && (
        <div className="project-gallery">
          {project.screenshots.map((s, i) => (
            <img key={i} src={s} alt={`${titleText} ${i+1}`} />
          ))}
        </div>
      )}

      {project.tech && <p><strong>{t('PROJECTS.TECH_LABEL') || 'Tech:'}</strong> {project.tech.join(', ')}</p>}
      {project.repo && <p><a href={project.repo} target="_blank" rel="noreferrer">{t('BUTTONS.VIEW_CODE')}</a></p>}

      {readmeHtml ? (
        <section className="project-readme" dangerouslySetInnerHTML={{ __html: (typeof readmeHtml === 'string' ? readmeHtml : (readmeHtml?.[lang] || readmeHtml?.fr || readmeHtml?.en || '')) }} />
      ) : (
        <p>{t('PROJECTS.NO_README')}</p>
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

  // We'll attempt to fetch both the English README (`README.md`) and the
  // French README (`README_fr.md`). The user keeps two files in the repo
  // so prefer the language-specific file when available.
  let readmeHtml: { fr?: string | null; en?: string | null } | null = null
  if (project && project.repo) {
    try {
      const m = project.repo.match(/github.com\/(.+?)\/(.+?)(?:\.git|$|\/)/)
      if (m) {
        const owner = m[1]
        const repo = m[2]

        const makeRaw = (branch: string, filename: string) => `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${filename}`
        const filenameCandidates = {
          en: [
            'README.md',
            'readme.md'
          ],
          fr: [
            'README_fr.md',
            'README-fr.md',
            'readme_fr.md',
            'readme-fr.md'
          ]
        }

        // try branches and filenames
        const branches = ['main', 'master']

        const fetchFirst = async (candidates: string[]) => {
          for (const br of branches) {
            for (const fname of candidates) {
              const url = makeRaw(br, fname)
              try {
                const res = await fetch(url)
                if (res.ok) return await res.text()
              } catch (e) {
                // ignore fetch errors for this url and continue
              }
            }
          }
          return null
        }

        const md_en = await fetchFirst(filenameCandidates.en)
        const md_fr = await fetchFirst(filenameCandidates.fr)

        const htmlObj: { fr?: string | null; en?: string | null } = {}
        if (md_en) {
          const processedEn = await remark().use(remarkHtml).process(md_en)
          htmlObj.en = processedEn.toString()
        }
        if (md_fr) {
          const processedFr = await remark().use(remarkHtml).process(md_fr)
          htmlObj.fr = processedFr.toString()
        }

        // If neither language-specific README was found, try to fall back to
        // any README.md we can find (best-effort). This keeps behavior safe
        // for repos that only have a single README.
        if (!htmlObj.en && !htmlObj.fr) {
          const fallback = await fetchFirst(['README.md', 'readme.md'])
          if (fallback) {
            const processed = await remark().use(remarkHtml).process(fallback)
            htmlObj.en = processed.toString()
          }
        }

        readmeHtml = htmlObj
      }
    } catch (e) {
      // ignore fetch/processing errors and leave readmeHtml as null
      readmeHtml = null
    }
  }

  return { props: { project, readmeHtml } }
}
