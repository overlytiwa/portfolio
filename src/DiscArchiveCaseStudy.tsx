import { useContext, useState, type ReactNode } from 'react';
import { Arrow } from './components';
import { Reveal, SceneContext } from './motion';
import './case-study.css';
import './disc-archive-case-study.css';

function Section({ number, id, title, children }: { number: string; id: string; title: string; children: ReactNode }) {
  return <section className="case-section" id={id} aria-labelledby={`${id}-heading`}><div className="case-section-heading"><span className="micro">{number} / The Disc Archive</span><Reveal as="h2" id={`${id}-heading`}>{title}</Reveal></div>{children}</section>;
}

export function DiscArchiveCaseStudy({ website }: { website: string }) {
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');
  const { active } = useContext(SceneContext);
  return <div className="case-study disc-archive-case">
    <Section number="01" id="disc-archive-overview" title="A collection you can handle.">
      <div className="disc-archive-intro"><p className="disc-archive-lead">The Disc Archive makes browsing a discography feel physical. A collection of floating CDs becomes the interface: move between records, bring one into focus, then turn it over and explore its story.</p><div className="disc-archive-copy"><p>The experience brings together seventeen solo, collaborative and compilation releases in an independent Kanye West archive. Each record has a distinct visual identity, while a consistent editorial system keeps dates, genres, selected songs and contextual information easy to follow.</p><p>The central design tension is between spectacle and clarity. Expressive 3D objects invite curiosity; warm white space, fine rules and large serif typography give the information a quieter place to land.</p></div></div>
      <dl className="case-facts disc-archive-facts"><div><dt>Focus</dt><dd>Creative development<br />Interaction & interface design</dd></div><div><dt>Technology</dt><dd>Three.js / WebGL<br />HTML, CSS & JavaScript</dd></div><div><dt>Experience</dt><dd>17-record collection<br />Responsive editorial archive</dd></div></dl>
    </Section>

    <Section number="02" id="disc-archive-preview" title="Pick a record. Turn it over.">
      <p className="disc-archive-preview-intro">Explore the live archive below. Use the arrows to browse, select the centred disc to enter an album, and use “Turn the disc” to discover its reverse.</p>
      <div className="case-preview-toolbar"><div className="case-device-options" role="group" aria-label="Disc Archive preview size"><button type="button" aria-pressed={device === 'desktop'} aria-controls="disc-archive-live-frame" onClick={() => setDevice('desktop')}>Desktop</button><button type="button" aria-pressed={device === 'mobile'} aria-controls="disc-archive-live-frame" onClick={() => setDevice('mobile')}>Mobile</button></div><a href={website} target="_blank" rel="noopener noreferrer">Open website <Arrow /></a></div>
      <div className="disc-archive-preview-stage" data-lenis-prevent><div className="disc-archive-browser" data-device={device}><div className="disc-archive-browser-bar"><span className="disc-archive-dots" aria-hidden="true"><i /><i /><i /></span><span>kw-seven.vercel.app</span><span className="micro">Live</span></div>{active ? <iframe id="disc-archive-live-frame" src={website} title="The Disc Archive — live interactive 3D album collection" loading="lazy" sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox" referrerPolicy="strict-origin-when-cross-origin" /> : <div className="disc-archive-preview-placeholder" />}</div></div>
      <p className="case-preview-note">Scroll and interact inside the preview, or <a href={website} target="_blank" rel="noopener noreferrer">open the full archive <Arrow /></a>.</p>
    </Section>

    <Section number="03" id="disc-archive-interaction" title="From the object to the story.">
      <div className="disc-archive-journey"><article><span className="micro">01 / Browse</span><h3>Bring the collection into focus.</h3><p>The home view arranges the discs in a spatial sequence. Scrolling, arrow controls and keyboard navigation move the selection through the collection, updating the album caption and release information alongside it.</p></article><article><span className="micro">02 / Inspect</span><h3>Give the object another side.</h3><p>An album opens with its own disc and a deliberate flip control. Printed artwork faces a reflective reverse, making the CD feel like an object to inspect rather than a flat thumbnail.</p></article><article><span className="micro">03 / Continue</span><h3>Keep the story moving.</h3><p>Album pages unfold into context, full artwork, selected songs and figures. The next release appears at the end, with a scroll transition that carries the visitor into the following record.</p></article></div>
    </Section>

    <Section number="04" id="disc-archive-direction" title="Metal, paper and negative space.">
      <div className="disc-archive-direction"><div className="disc-archive-type-board"><span className="micro">An editorial frame for a physical collection</span><p>ON THE<br /><em>RECORD.</em></p><div className="disc-archive-rule"><span>Seventeen objects</span><span>One visual system</span></div></div><div className="disc-archive-copy"><p>The restrained palette lets the album artwork supply the colour. Oversized serif headings sit beside small, precise metadata, while hairline rules create a familiar catalogue structure around the more expressive scene.</p><p>Material contrast does the rest: illustrated labels, dark disc edges and a metallic back make each turn legible. The same language continues through the collection, individual album pages and the About section.</p><div className="disc-archive-palette" aria-label="Website palette"><span style={{ background: '#f2f1ee', color: '#171715' }}>Paper<br />#F2F1EE</span><span style={{ background: '#686760', color: '#fff' }}>Muted<br />#686760</span><span style={{ background: '#171715', color: '#fff' }}>Ink<br />#171715</span></div></div></div>
    </Section>

    <Section number="05" id="disc-archive-build" title="A considered layer of complexity.">
      <div className="disc-archive-build"><article><h3>Manage the scene, not just the image.</h3><p>The Three.js implementation loads nearby records as the selection changes. Shared texture and geometry resources are pooled, and album resources are released when no longer needed. Rendering pauses when the document is hidden.</p></article><article><h3>Keep the archive usable.</h3><p>Accessible disc buttons, keyboard controls, live selection announcements and reduced-motion handling support alternative ways to browse. A flat artwork fallback keeps the collection available when the 3D scene cannot initialise.</p></article><article><h3>Give the figures their context.</h3><p>Streaming totals and purchase estimates are presented as different measures, with source notes and a stated reporting date. Unavailable totals are labelled “Unverified”, preserving the distinction between a visual archive and a claim of complete commercial data.</p></article></div>
    </Section>

    <div className="disc-archive-closing"><span className="micro">Independent music archive / Creative development</span><a href={website} target="_blank" rel="noopener noreferrer">Explore the Disc Archive <Arrow /></a><p>An independent, unofficial project, unaffiliated with Kanye West or his labels. Album artwork belongs to its respective rights holders; disc labels are the archive’s unofficial artwork concepts. <a href={`${website}#about`} target="_blank" rel="noopener noreferrer">About the archive & sources <Arrow /></a></p></div>
  </div>;
}
