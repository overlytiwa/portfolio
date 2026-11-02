import { ImageSlot } from './components';
import { Reveal } from './motion';
import { profile } from './content';

export function About({ onContact }: { onContact: () => void }) {
  return <main tabIndex={-1} className="about-page">
    <Reveal as="h1" className="about-heading">I build refined brands and<br className="desktop-break" /> experiences across digital<br className="desktop-break" /> and physical spaces</Reveal>
    <section className="about-grid" aria-label="About Tiwalope">
      <div className="about-portrait"><ImageSlot src={profile.portrait} label="Portrait of Ogundiji Tiwalope" tone="stone" eager /></div>
      <div className="about-copy">
        <section className="about-block"><Reveal as="h2">About me</Reveal><Reveal as="p">{profile.bio}</Reveal></section>
        <section className="about-block"><Reveal as="h2">Philosophy</Reveal><Reveal as="p">{profile.philosophy}</Reveal></section>
        <section className="about-block services"><Reveal as="h2">What I do</Reveal><ol>{profile.services.map((service, index) => <li key={service}><span>0{index + 1}.</span>{service}</li>)}</ol></section>
        <section className="about-block"><Reveal as="h2">Global network</Reveal><Reveal as="p">{profile.network}</Reveal><button className="network-link" onClick={onContact}>Reach out</button></section>
      </div>
    </section>
    <section className="signature-section" aria-labelledby="signature-heading">
      <Reveal as="h2" id="signature-heading">my signature<br className="desktop-break" /> approach is guided<br className="desktop-break" /> by core values</Reveal>
      <div className="signature-grid">{profile.signature.map((value, index) => <article key={value.title} className="signature-card" data-label-tone={value.labelTone}><h3><span>0{index + 1}.</span> {value.title}</h3><ImageSlot src={value.image} label={value.title} tone={['sand', 'stone', 'sage'][index]} /></article>)}</div>
    </section>
  </main>;
}
