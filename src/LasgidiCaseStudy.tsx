import { useState, type ReactNode } from 'react';
import { Arrow } from './components';
import { Reveal } from './motion';
import './case-study.css';
import './lasgidi-case-study.css';

function Section({ number, id, title, children }: { number: string; id: string; title: string; children: ReactNode }) {
  return <section className="case-section" id={id} aria-labelledby={`${id}-heading`}>
    <div className="case-section-heading"><span className="micro">{number} / Lasgidi</span><Reveal as="h2" id={`${id}-heading`}>{title}</Reveal></div>
    {children}
  </section>;
}

export function LasgidiCaseStudy({ website }: { website: string }) {
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');
  return <div className="case-study lasgidi-case">
    <Section number="01" id="lasgidi-story" title="A city to feel. A place to discover.">
      <div className="lasgidi-overview">
        <p className="lasgidi-lead">Lasgidi turns a city guide into a journey. It introduces Lagos through its atmosphere first, then invites visitors into the places and stories that give the city its character.</p>
        <div className="lasgidi-copy"><p>The central design challenge is balance: capture the energy of Lagos while giving every story room to breathe. Film, generous typography and an open editorial grid establish the mood; clear navigation makes it easy to move from inspiration to exploration.</p><p>The experience moves from the skyline to the seasons, into cultural destinations and landmark buildings, before locating Lagos in the wider world.</p></div>
      </div>
      <dl className="case-facts lasgidi-facts"><div><dt>Project</dt><dd>Digital city guide<br />Lagos, Nigeria</dd></div><div><dt>Focus</dt><dd>Art direction, interface design<br />Front-end interactions</dd></div><div><dt>Format</dt><dd>Responsive website<br />Editorial storytelling</dd></div></dl>
    </Section>

    <Section number="02" id="lasgidi-preview" title="Step into Lasgidi.">
      <p className="lasgidi-preview-intro">Explore the actual website below. Follow the scroll, switch seasons and discover a place, or open the full experience in a new tab.</p>
      <div className="case-preview-toolbar">
        <div className="case-device-options" role="group" aria-label="Preview size"><button type="button" aria-controls="lasgidi-live-frame" aria-pressed={device === 'desktop'} onClick={() => setDevice('desktop')}>Desktop</button><button type="button" aria-controls="lasgidi-live-frame" aria-pressed={device === 'mobile'} onClick={() => setDevice('mobile')}>Mobile</button></div>
        <a href={website} target="_blank" rel="noopener noreferrer">Open website <Arrow /></a>
      </div>
      <div className="lasgidi-preview-stage" data-lenis-prevent>
        <div className="lasgidi-browser" data-device={device}>
          <div className="lasgidi-browser-bar"><span className="lasgidi-browser-dots" aria-hidden="true"><i /><i /><i /></span><span>lasgidi-blush.vercel.app</span><span className="lasgidi-live-label">Live</span></div>
          <iframe id="lasgidi-live-frame" src={website} title="Lasgidi live website — explore Lagos" loading="lazy" allow="autoplay; fullscreen" allowFullScreen sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox" referrerPolicy="strict-origin-when-cross-origin" />
        </div>
      </div>
      <p className="case-preview-note">Scroll inside the preview to explore. <a href={website} target="_blank" rel="noopener noreferrer">Open the full website <Arrow /></a></p>
    </Section>

    <Section number="03" id="lasgidi-direction" title="Space for the city to speak.">
      <div className="lasgidi-direction"><figure><img src="/projects/lasgidi/atlantic-coast.jpg" alt="Lagos coastline, with Atlantic water and the city beyond" loading="lazy" width="3840" height="2880" /><figcaption className="micro">The coast / A quieter side of Lagos</figcaption></figure><div className="lasgidi-direction-panel"><span className="micro">The visual language</span><p className="lasgidi-statement">A city like<br /><em>no other.</em></p><p>Soft whites, deep green and charcoal let the photography lead. Cormorant Garamond brings an expressive, editorial voice; Manrope keeps the detail clear; Barlow Condensed gives the largest city lettering its presence.</p><div className="lasgidi-swatches" aria-label="Lasgidi website palette"><span style={{ background: '#f8f8f4', color: '#252b2c' }}>Paper<br />#F8F8F4</span><span style={{ background: '#233f3b', color: '#fff' }}>Green<br />#233F3B</span><span style={{ background: '#252b2c', color: '#fff' }}>Ink<br />#252B2C</span></div></div></div>
    </Section>

    <Section number="04" id="lasgidi-experience" title="Movement with a sense of place.">
      <div className="lasgidi-features">
        <article><span className="micro">01 / Arrival</span><h3>A cinematic opening.</h3><p>Aerial film, oversized Lagos lettering and a cloud transition create a strong first impression, then reveal the city’s story as the visitor scrolls.</p></article>
        <article><span className="micro">02 / Discovery</span><h3>Stories that open up.</h3><p>Season tabs introduce the changing atmosphere. Expanding place cards lead into dedicated destination pages, while a horizontal architecture sequence gives the landmarks a rhythm of their own.</p></article>
        <article><span className="micro">03 / Consideration</span><h3>Room to explore at your pace.</h3><p>Mobile layouts bring the place cards into a vertical flow. Keyboard navigation, a pause control for the opening film and reduced-motion alternatives support different ways of exploring.</p></article>
      </div>
    </Section>

    <div className="lasgidi-closing"><span className="micro">Lagos, in motion.</span><a href={website} target="_blank" rel="noopener noreferrer">Experience Lasgidi <Arrow /></a><p>Skyline: <a href="https://commons.wikimedia.org/wiki/File:Lagos_skyline.jpg" target="_blank" rel="noopener noreferrer">Clara Sanchiz</a> / <a href="https://creativecommons.org/licenses/by-sa/2.0/" target="_blank" rel="noopener noreferrer">CC BY-SA 2.0</a>. Coast: <a href="https://commons.wikimedia.org/wiki/File:Tarkwa_bay_beach,_Lagos,_Nigeria.jpg" target="_blank" rel="noopener noreferrer">OfficialKOL</a> / <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a>. Images displayed with responsive crops.<br /><a href={`${website}credits/`} target="_blank" rel="noopener noreferrer">Full photography & film credits <Arrow /></a></p></div>
  </div>;
}
