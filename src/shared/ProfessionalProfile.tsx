import {capabilities, selectedExperience, earlierExperience, otherOrganisations, type ExperienceEntry} from './professional-profile';
import './professional-profile.css';

export function Capabilities() {
  return <div className="professional-capabilities">{capabilities.map(item=><article key={item.title}><h3>{item.title}</h3><p>{item.description}</p><p className="professional-skills">{item.skills}</p><div className="professional-proof">{item.examples.map(example=><a key={example.href} href={example.href}>{example.name} ↗</a>)}</div></article>)}</div>;
}

function ExperienceRow({entry}:{entry:ExperienceEntry}) {
  return <li className="professional-experience-row"><div><h3>{entry.organisation}</h3><p className="professional-role">{entry.role}{entry.period&&<span>{entry.period}</span>}</p></div><div><p>{entry.description}</p>{entry.href&&<a href={entry.href}>See the work ↗</a>}</div></li>;
}

export function ProfessionalExperience() {
  return <div className="professional-history"><ol className="professional-experience">{selectedExperience.map(entry=><ExperienceRow key={entry.organisation} entry={entry}/>)}</ol><details className="professional-earlier"><summary>Earlier work & other organisations</summary><ol className="professional-experience">{earlierExperience.map(entry=><ExperienceRow key={entry.organisation} entry={entry}/>)}</ol><div className="professional-other"><h3>Other organisations I’ve worked with</h3><ul>{otherOrganisations.map(name=><li key={name}>{name}</li>)}</ul></div></details></div>;
}

export function TechnicalLearning() {
  return <details className="professional-toolkit"><summary>More of my toolkit & technical learning</summary><div><p><strong>In my projects</strong>React, TypeScript, JavaScript, Node.js, SQL/PostgreSQL, APIs, Supabase, Git, Figma and deployment workflows.</p><p><strong>Through Boot.dev</strong>Python, Go, memory management in C, data structures and algorithms, HTTP clients and servers, Linux, Docker, Kubernetes, RabbitMQ and AWS.</p><a href="https://www.boot.dev/u/cynyassy" target="_blank" rel="noopener noreferrer">My Boot.dev profile ↗</a></div></details>;
}
