import { GetStaticPaths, GetStaticProps } from 'next'
import projects from '../../data/projects.json'
import Link from 'next/link'

type Project = {
  slug: string
  title: string
  year?: number
  description?: string
  tech?: string[]
  repo?: string
}

export default function ProjectPage({ project }: { project: Project | null })
{
  if (!project) return <div>Projet non trouvé — <Link href="/">Retour</Link></div>
  return (
    <article>
      <h2>{project.title}</h2>
      {project.year && <p><em>{project.year}</em></p>}
      <p>{project.description}</p>
      {project.tech && <p>Tech: {project.tech.join(', ')}</p>}
      {project.repo && <p><a href={project.repo} target="_blank" rel="noreferrer">Voir le repo</a></p>}
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
  const slug = context.params?.slug as string
  const project = projects.find((p) => p.slug === slug) || null
  return { props: { project } }
}
