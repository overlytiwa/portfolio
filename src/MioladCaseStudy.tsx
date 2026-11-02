import { useState, type ReactNode } from 'react';
import { Arrow } from './components';
import { Reveal } from './motion';
import './case-study.css';

const base = '/projects/miolad-hotels';
export const mioladWebsite = `${base}/website/index.html`;
function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return <section className="case-section" id={id} aria-labelledby={`${id}-heading`}><div className="case-section-heading"><span /><div><Reveal as="h2" id={`${id}-heading`}>{title}</Reveal></div></div>{children}</section>;
}
function Board({ path, title }: { path: string; title: string }) {
  return <figure className="case-board"><a href={`${base}/${path}`} target="_blank" rel="noopener noreferrer"><img src={`${base}/${path}`} alt={title} loading="lazy" /></a><figcaption className="micro">{title}<span>View full size <Arrow /></span></figcaption></figure>;
}
function Gallery({ folder, items, social = false }: { folder: string; items: [string, string][]; social?: boolean }) {
  return <div className={`case-asset-grid ${social ? 'case-social-grid' : ''}`}>{items.map(([file, title]) => <figure className="case-asset" key={file}><a className="case-asset-image" style={file.includes('white') ? { background: '#172b4d' } : undefined} href={`${base}/brand/${folder}/${file}.svg`} target="_blank" rel="noopener noreferrer"><img src={`${base}/brand/${folder}/${file}.svg`} alt={title} loading="lazy" /></a><figcaption><span>{title}</span><a href={`${base}/brand/${folder}/${file}.svg`} download>SVG <Arrow /></a></figcaption></figure>)}</div>;
}
export function MioladCaseStudy() {
  const [device, setDevice] = useState<'full' | 'phone'>('full');
  return <div className="case-study">
    <Section id="miolad-overview" title="A considered welcome.">
      <p className="project-description">A cohesive hospitality identity, from the first online impression to the details that greet a guest. The project brings together brand direction, a flexible logo family, print collateral, social templates and a responsive website.</p>
      <dl className="case-facts"><div><dt>Scope</dt><dd>Brand identity<br />Website design & development<br />Stationery & social design</dd></div><div><dt>Typography</dt><dd>Cormorant Garamond<br />Manrope</dd></div></dl>
    </Section>
    <Section id="miolad-website" title="Explore the stay.">
      <div className="case-preview-toolbar"><div className="case-device-options" aria-label="MIOLAD preview width"><button type="button" aria-pressed={device === 'full'} onClick={() => setDevice('full')}>Full width</button><button type="button" aria-pressed={device === 'phone'} onClick={() => setDevice('phone')}>Phone</button></div><a href={mioladWebsite} target="_blank" rel="noopener noreferrer">Open website <Arrow /></a></div>
      <div className="case-preview-stage" data-lenis-prevent><div className="case-preview-viewport" data-device={device}><iframe src={mioladWebsite} title="MIOLAD Hotels website preview" loading="lazy" sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-downloads" /></div></div>
      <p className="case-preview-note">Explore the website and stay planner. The planner prepares an enquiry or downloads a stay summary; it does not confirm a reservation or process payment.</p>
      <div className="case-website-boards"><Board path="designs/website-desktop.png" title="Desktop website design" /><Board path="designs/website-mobile.png" title="Mobile website design" /></div>
    </Section>
    <Section id="miolad-direction" title="The visual direction."><Board path="brand/moodboard/miolad-moodboard.png" title="MIOLAD moodboard" /></Section>
    <Section id="miolad-identity" title="A distinctive signature."><Gallery folder="logos" items={[
      ['miolad-primary-blue', 'Primary wordmark / blue'], ['miolad-primary-white', 'Primary wordmark / white'], ['miolad-primary-black', 'Primary wordmark / black'],
      ['miolad-secondary-blue', 'Secondary lockup / blue'], ['miolad-secondary-white', 'Secondary lockup / white'], ['miolad-secondary-black', 'Secondary lockup / black'],
      ['miolad-symbol-blue', 'Symbol / blue'], ['miolad-symbol-white', 'Symbol / white'], ['miolad-symbol-black', 'Symbol / black'],
    ]} /></Section>
    <Section id="miolad-stationery" title="Details that welcome."><div className="case-asset-grid"><Board path="brand/mockups/stationery-study.png" title="Stationery application study" /><Board path="brand/mockups/welcome-study.png" title="Reception sign & key-card study" /></div><Gallery folder="stationery" items={[
      ['business-card-front', 'Business card / front'], ['business-card-back', 'Business card / back'], ['thank-you-front', 'Thank-you card / front'], ['thank-you-back', 'Thank-you card / back'],
    ]} /></Section>
    <Section id="miolad-social" title="An inviting presence."><Gallery folder="social" social items={[
      ['01-meet-miolad', 'Meet MIOLAD'], ['02-room-rate', 'Room rate'], ['03-settle-in', 'Settle in'], ['04-announcement-template', 'Announcement template'], ['05-story-welcome', 'Welcome story'], ['06-story-stay-template', 'Stay story template'],
    ]} /></Section>
    <Section id="miolad-guidelines" title="The complete identity."><div className="case-resources"><a className="case-brand-book" href={`${base}/brand/guidelines/MIOLAD-Brand-Book.pdf`} target="_blank" rel="noopener noreferrer"><img src={`${base}/brand/guidelines/editable-pages/01-cover.svg`} alt="MIOLAD brand book cover" loading="lazy" /><span>View the 18-page brand book <Arrow /></span></a><div className="case-document-list">{[
      ['Brand guidelines', 'brand/guidelines/MIOLAD-Brand-Book.pdf'], ['Business cards / print PDF', 'brand/stationery/business-cards-print.pdf'], ['Thank-you cards / print PDF', 'brand/stationery/thank-you-cards-print.pdf'],
    ].map(([title, path]) => <a key={path} href={`${base}/${path}`} target="_blank" rel="noopener noreferrer"><span>{title}</span><Arrow /></a>)}</div></div><a className="case-download" href={`${base}/MIOLAD-Website-and-Brand.zip`} download><span>Download website & brand files<span className="micro">Website source, editable artwork & guidelines / ZIP</span></span><Arrow /></a></Section>
  </div>;
}
