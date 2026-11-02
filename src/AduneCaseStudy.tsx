import { useState, type ReactNode } from 'react';
import { Arrow } from './components';
import { Reveal } from './motion';
import {
  aduneBase, aduneWebsite, aduneLogos, adunePatterns, adunePackaging,
  aduneSocial, adunePalette, aduneDocuments, type BrandAsset,
} from './aduneProject';
import './case-study.css';

function SectionHeading({ number, title, children }: { number: string; title: string; children: ReactNode }) {
  return <div className="case-section-heading">
    <p className="micro">{number} / {title}</p>
    <div>{children}</div>
  </div>;
}

function AssetGallery({ assets, className = '' }: { assets: BrandAsset[]; className?: string }) {
  return <div className={`case-asset-grid ${className}`}>
    {assets.map(asset => {
      const base = `${aduneBase}/brand-identity/previous-proposed-identity/${asset.path}`;
      const image = `${base}.${asset.vector ? 'svg' : 'png'}`;
      return <figure className="case-asset" key={asset.path}>
        <a className="case-asset-image" href={image} target="_blank" rel="noopener noreferrer" aria-label={`View ${asset.title.toLowerCase()} at full size`}>
          <img src={image} alt={asset.title} loading="lazy" decoding="async" />
        </a>
        <figcaption><span>{asset.title}</span>{asset.vector && <a href={`${base}.svg`} download aria-label={`Download ${asset.title.toLowerCase()} SVG`}>SVG <Arrow /></a>}</figcaption>
      </figure>;
    })}
  </div>;
}

function WebsitePreview() {
  const [device, setDevice] = useState<'full' | 'phone'>('full');
  return <section className="case-section" id="adune-website" aria-labelledby="adune-website-heading">
    <SectionHeading number="02" title="Digital experience">
      <Reveal as="h2" id="adune-website-heading">A place to explore.<br />A reason to stay.</Reveal>
      <p>An editorial React website with room-led collections, product details, saved pieces, a brand story and a journal.</p>
    </SectionHeading>
    <div className="case-preview-toolbar">
      <div className="case-device-options" aria-label="Website preview width">
        <button type="button" aria-pressed={device === 'full'} onClick={() => setDevice('full')}>Full width</button>
        <button type="button" aria-pressed={device === 'phone'} onClick={() => setDevice('phone')}>Phone</button>
      </div>
      <a href={aduneWebsite} target="_blank" rel="noopener noreferrer">Open website <Arrow /></a>
    </div>
    <div className="case-preview-stage" data-lenis-prevent>
      <div className="case-preview-viewport" data-device={device}>
        <iframe src={aduneWebsite} title="ADUNÉ Home website preview" loading="lazy" sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox" referrerPolicy="no-referrer" />
      </div>
    </div>
    <p className="case-preview-note">Scroll and interact inside the preview, or open the website in a separate tab.</p>
    <div className="case-website-boards">


    </div>
  </section>;
}

export function AduneCaseStudy() {
  return <div className="case-study">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Playfair+Display:ital,wght@0,400;1,400&display=swap" />
    <section className="case-section case-overview" aria-labelledby="adune-overview-heading">
      <SectionHeading number="01" title="The rebrand">
        <Reveal as="h2" id="adune-overview-heading">Objects of belonging.</Reveal>
        <p>A warmer, more cohesive identity for ADUNÉ Home. The rebrand connects its visual language, packaging and website through tactile materials, expressive typography and the small rituals of everyday living.</p>
        <dl className="case-facts">
          <div><dt>Scope</dt><dd>Brand strategy<br />Creative direction<br />Visual identity<br />Packaging & print<br />Social design<br />React website</dd></div>
          <div><dt>Direction</dt><dd>The lived-in gallery.<br />Warm, tactile, quietly expressive.</dd></div>
        </dl>
      </SectionHeading>
    </section>

    <WebsitePreview />

    <section className="case-section" aria-labelledby="adune-direction-heading">
      <SectionHeading number="03" title="Creative direction">
        <Reveal as="h2" id="adune-direction-heading">Collected.<br />Never just decorated.</Reveal>
        <p>Sunlit interiors, woven surfaces and sculptural forms. A palette drawn from natural materials, with space for each object to be seen.</p>
      </SectionHeading>

    </section>

    <section className="case-section" aria-labelledby="adune-identity-heading">
      <SectionHeading number="04" title="Visual identity">
        <Reveal as="h2" id="adune-identity-heading">Proposed identity.<br />Many expressions.</Reveal>
        <p>A primary and reversed wordmark, a secondary lockup, an abstract A-and-leaf symbol and a circular seal form the identity system.</p>
      </SectionHeading>
      <AssetGallery assets={aduneLogos.slice(0, 2)} />
      <AssetGallery assets={aduneLogos.slice(2)} className="case-asset-grid--three" />
      <div className="case-palette" aria-label="Brand colour palette">
        {adunePalette.map(colour => <div key={colour.hex} style={{ backgroundColor: colour.hex, color: colour.ink }}><span>{colour.name}</span><span>{colour.hex}</span></div>)}
      </div>
      <div className="case-type-system">
        <div><span className="micro">Playfair Display / Regular & Italic</span><p className="case-serif">A feeling<br />of <em>home.</em></p><span>Editorial headlines</span></div>
        <div><span className="micro">DM Sans / Regular, Medium & Semibold</span><p className="case-sans">A thoughtful<br />everyday.</p><span>Navigation, body copy & product information</span></div>
      </div>
      <AssetGallery assets={adunePatterns} className="case-patterns" />
    </section>

    <section className="case-section" aria-labelledby="adune-packaging-heading">
      <SectionHeading number="05" title="Packaging & print">
        <Reveal as="h2" id="adune-packaging-heading">The identity,<br />in your hands.</Reveal>
        <p>The system extends from shopping bags and box sleeves to tissue, seals, product labels, hang tags, packing inserts and stationery.</p>
      </SectionHeading>

      <details className="case-artwork-details">
        <summary><span>View all 12 print & packaging pieces</span><span className="case-details-symbol" aria-hidden="true" /></summary>
        <AssetGallery assets={adunePackaging} className="case-asset-grid--three" />
      </details>
    </section>

    <section className="case-section" aria-labelledby="adune-social-heading">
      <SectionHeading number="06" title="Social expression">
        <Reveal as="h2" id="adune-social-heading">A recognisable<br />rhythm.</Reveal>
        <p>Brand stories, object studies and typographic posts carry the same visual language into the feed, supported by a collection story format.</p>
      </SectionHeading>

      <AssetGallery assets={aduneSocial} className="case-social-grid" />
    </section>

    <section className="case-section" aria-labelledby="adune-files-heading">
      <SectionHeading number="07" title="Brand guidelines & files">
        <Reveal as="h2" id="adune-files-heading">Guidelines & source.</Reveal>
        <p>The revised package includes the React website and the previous proposed identity artwork, with its brand book, editable SVGs and PNG exports.</p>
      </SectionHeading>
      <div className="case-resources">
        <a className="case-brand-book" href={`${aduneBase}/brand-identity/previous-proposed-identity/brand-book/ADUNE_Brand_Book_Proposed_Concept.pdf`} target="_blank" rel="noopener noreferrer" aria-label="Open the 22-page ADUNÉ Home brand book">
          <img src={`${aduneBase}/brand-book-cover.png`} alt="ADUNÉ Home brand book: Objects of Belonging" loading="lazy" decoding="async" />
          <span>View brand book <Arrow /></span>
        </a>
        <div className="case-document-list">
          {aduneDocuments.map(doc => <a key={doc.path} href={`${aduneBase}/${doc.path}`} download={doc.path.endsWith('.md') || undefined} target={doc.path.endsWith('.pdf') ? '_blank' : undefined} rel="noopener noreferrer"><span>{doc.title}<small>{doc.detail}</small></span><Arrow /></a>)}
        </div>
      </div>
      <a className="case-download" href={`${aduneBase}/ADUNE_HOME_Rebrand.zip`} download><span>Download the complete rebrand<span className="micro">Brand identity, guidelines & React source / ZIP</span></span><Arrow /></a>
    </section>
  </div>;
}
