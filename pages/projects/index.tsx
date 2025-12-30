import projects from '../../data/projects.json'
import ProjectCard from '../../components/ProjectCard'

export default function ProjectsPage() {
  // show all projects in a grid
  return (
    <div>
      <h2>Tous mes projets</h2>
      <p>Liste complète de mes projets — cliquez sur un projet pour les détails.</p>
      <div style={{marginTop: '1rem'}} className="projects-grid">
        {projects.map((p:any) => <ProjectCard key={p.slug} project={p} />)}
      </div>
    </div>
  )
}
