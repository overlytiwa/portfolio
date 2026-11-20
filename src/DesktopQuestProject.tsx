import { ImageSlot } from './components';
import { RouteLink } from './navigation';
import { Reveal } from './motion';
import { sideQuestsPath } from './SideQuests';
import { type DesktopQuest } from './sideQuestData';

export function DesktopQuestProject({ project }: { project: DesktopQuest }) {
  return <main tabIndex={-1} className="side-quest-page">
    <section className="side-quest-hero">
      <div className="project-info">
        <Reveal as="h1">{project.title}</Reveal>
        <p className="side-quest-intro">{project.intro}</p>
        <p className="side-quest-summary">{project.summary}</p>
        <div className="side-quest-links"><a href={project.repository} target="_blank" rel="noopener noreferrer">View on GitHub</a>{project.screenshot && <a href={project.screenshot} target="_blank" rel="noopener noreferrer">View full screenshot</a>}</div>
        <RouteLink href={sideQuestsPath} className="side-quest-back">All Side Quests</RouteLink>
      </div>
      <figure className="side-quest-preview">
        <ImageSlot src={project.screenshot ?? `/side-quests/${project.slug}/cover.svg`} label={project.imageLabel} className="project-hero-image" eager />
        <figcaption>{project.caption}</figcaption>
      </figure>
    </section>

    <dl className="side-quest-facts">{project.facts.map(fact => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}</dl>

    <section className="side-quest-section" aria-labelledby={`${project.slug}-features`}>
      <h2 id={`${project.slug}-features`}>{project.featuresTitle}</h2>
      <div className="side-quest-features">{project.features.map(feature => <article key={feature.title}><h3>{feature.title}</h3><p>{feature.text}</p></article>)}</div>
    </section>

    <section className="side-quest-section" aria-labelledby={`${project.slug}-workflow`}>
      <h2 id={`${project.slug}-workflow`}>{project.workflowTitle}</h2>
      <div className="side-quest-steps">{project.steps.map(step => <article key={step.title}><h3>{step.title}</h3><p>{step.text}</p></article>)}</div>
      <p className="side-quest-requirements">{project.note}</p>
    </section>

    <footer className="side-quest-footer"><a href={project.repository} target="_blank" rel="noopener noreferrer">Explore {project.title} on GitHub</a><RouteLink href={sideQuestsPath}>Back to Side Quests</RouteLink></footer>
  </main>;
}
