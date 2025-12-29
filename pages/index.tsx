import Link from 'next/link'
import projects from '../data/projects.json'

export default function Home()
{
  return (
    <div>
      <section>
        <h2>Bonjour — je suis Angel SEVERAN</h2>
        <p>Étudiant à Epitech Montpellier. Voici une sélection de mes projets.</p>
      </section>

      <section style={{marginTop: '2rem'}}>
        <h3>Projets</h3>
        <ul style={{listStyle: 'none', padding: 0}}>
          {projects.map((p) => (
            <li key={p.slug} style={{padding: '0.8rem 0', borderBottom: '1px solid #f0f0f0'}}>
              <h4 style={{margin: 0}}><Link href={`/projects/${p.slug}`}>{p.title}</Link></h4>
              <p style={{margin: '0.25rem 0'}}>{p.description}</p>
              <small>{p.tech.join(' · ')} — <a href={p.repo} target="_blank" rel="noreferrer">repo</a></small>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
