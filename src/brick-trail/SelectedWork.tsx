import {projects, type Project} from './data';
import {ProjectCover,presentation} from './ProjectCover';

// Editorial order is deliberately independent of the game world's stable IDs and positions.
const select=(ids:string[])=>ids.map(id=>projects.find(project=>project.id===id)!).filter(Boolean);
const featured=select(['algotest','brew','reset']);
const stories=select(['chaddiman','perspectives','book']);
const experiments=select(['adventure','emotions','school','film']);

function ProjectCard({project,onOpen,compact=false}:{project:Project;onOpen:()=>void;compact?:boolean}) {
  const copy=presentation[project.id];
  return <article className={`project-card${compact?' project-card-compact':''}`}><a className="project-link" href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`${project.name}: ${copy.action}. Opens in a new tab.`} onClick={onOpen}><div className="project-image"><ProjectCover id={project.id}/></div><div className="project-copy"><p className="project-evidence"><span className="project-category">{copy.category}</span><span>{copy.proof}</span></p><h3>{project.name}</h3><p>{copy.summary}</p><div className="project-footer"><span className="project-role">{copy.role}</span><span className="project-action">{copy.action} <span aria-hidden="true">↗</span></span></div></div></a></article>;
}

export function SelectedWork({onOpen}:{onOpen:()=>void}) {
  return <section id="projects" className="work-section curated-work" aria-labelledby="work-title"><span id="work" className="anchor-alias"/><span id="featured-work" className="anchor-alias"/><div className="section-heading"><div><span className="eyebrow">PRODUCTS, STORIES & GAMES</span><h2 id="work-title">Selected work.</h2></div><p>Client work, independent products and games.</p></div><div className="project-grid featured-project-grid">{featured.map(project=><ProjectCard key={project.id} project={project} onOpen={onOpen}/>)}</div><div className="work-group-heading"><h3>Stories and games.</h3><p>Original work in writing, illustration and game design.</p></div><div className="project-grid compact-project-grid">{stories.map(project=><ProjectCard key={project.id} project={project} onOpen={onOpen} compact/>)}</div><details className="more-work"><summary>More to try <span>{experiments.length} tools & experiments</span></summary><div className="project-grid compact-project-grid">{experiments.map(project=><ProjectCard key={project.id} project={project} onOpen={onOpen} compact/>)}</div></details></section>;
}
