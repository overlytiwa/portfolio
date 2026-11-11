import { Arrow, ImageSlot } from './components';
import { type Project } from './content';
import { Reveal } from './motion';
import { RouteLink } from './navigation';
import { AduneCaseStudy } from './AduneCaseStudy';
import { MioladCaseStudy, mioladWebsite } from './MioladCaseStudy';
import { aduneWebsite } from './aduneProject';
import { LasgidiCaseStudy } from './LasgidiCaseStudy';
import { DiscArchiveCaseStudy } from './DiscArchiveCaseStudy';
import { PolaroidCaseStudy } from './PolaroidCaseStudy';
import { ListeningShelfCaseStudy } from './ListeningShelfCaseStudy';

export function ProjectPage({ project }: { project: Project }) {
  const website = project.websiteUrl ?? (project.caseStudy === 'miolad-hotels' ? mioladWebsite : aduneWebsite);
  const previewAnchor = project.previewAnchor ?? (project.caseStudy === 'miolad-hotels' ? 'miolad-website' : 'adune-website');
  return <main tabIndex={-1} className={`project-page ${project.caseStudy === 'polaroid' ? 'project-page--polaroid' : project.caseStudy === 'listening-shelf' ? 'project-page--listening-shelf' : ''}`}>
    <section className="project-hero">
      <div className="project-info">
        <Reveal as="h1">{project.title.toLowerCase()}</Reveal>
        {(project.category || project.year) && <div className="project-meta micro"><span>{project.category}</span><span>{project.year}</span></div>}
        {project.description && <p className="project-description">{project.description}</p>}
        {project.caseStudy && <div className="project-actions"><a href={website} target="_blank" rel="noopener noreferrer">Open live website <Arrow /></a><a href={`#${previewAnchor}`}>Live preview <Arrow direction="right" /></a></div>}
        <RouteLink href="/" className="back-link micro">All work <Arrow direction="left" /></RouteLink>
      </div>
      <ImageSlot src={project.coverImage} label={`${project.title} main image`} tone={project.tone} className="project-hero-image" eager />
    </section>
    {project.caseStudy === 'listening-shelf' ? <ListeningShelfCaseStudy website={website} /> : project.caseStudy === 'polaroid' ? <PolaroidCaseStudy website={website} /> : project.caseStudy === 'disc-archive' ? <DiscArchiveCaseStudy website={website} /> : project.caseStudy === 'lasgidi' ? <LasgidiCaseStudy website={website} /> : project.caseStudy === 'adune-home' ? <AduneCaseStudy /> : project.caseStudy === 'miolad-hotels' ? <MioladCaseStudy /> : <section className="project-detail-images" aria-label="Project gallery">{project.images.map((image, index) => <ImageSlot key={index} src={image} label={`${project.title} detail ${index + 1}`} tone={index === 0 ? 'stone' : 'sand'} />)}</section>}
  </main>;
}
