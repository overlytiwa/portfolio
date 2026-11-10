import { useContext, useState } from 'react';
import { SceneContext } from './motion';
import './polaroid-case-study.css';

export function PolaroidCaseStudy({ website }: { website: string }) {
  const { active } = useContext(SceneContext);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');
  return <div className="polaroid-case">
    <section className="polaroid-section polaroid-overview" aria-labelledby="polaroid-overview">
      <h2 id="polaroid-overview">A little of the analogue, in your browser</h2>
      <div className="polaroid-copy"><p>Polaroid starts with the camera. The viewfinder is the centre of the experience, with filters, adjustments, layouts and the gallery tucked into compact controls. There’s a short path from seeing a moment to saving it.</p><p>The visual language follows the photographs: warm paper, quiet olive accents and simple controls. Handwriting, print edges and more expressive compositions belong to the finished artwork, giving the interface room to stay calm.</p></div>
    </section>

    <section className="polaroid-section" aria-labelledby="polaroid-workflow">
      <h2 id="polaroid-workflow">From a moment to a keepsake</h2>
      <div className="polaroid-columns"><article><h3>Capture or bring a photo</h3><p>Use a front or rear camera, or import an existing image. Captures save to the gallery while the viewfinder stays ready for the next photograph.</p></article><article><h3>Find its character</h3><p>Browse 133 looks, search by name, explore categories and save favourites. Adjust intensity, light, colour and texture while keeping the source photograph intact.</p></article><article><h3>Make it yours</h3><p>Download the photo, give it an instant-print frame, or combine it with others in a scrapbook. Crop and arrange images, write a note and choose the typography.</p></article></div>
    </section>

    <section className="polaroid-section" id="polaroid-preview" aria-labelledby="polaroid-preview-heading">
      <div className="polaroid-preview-heading"><h2 id="polaroid-preview-heading">Try Polaroid</h2><a href={website} target="_blank" rel="noopener noreferrer">Open the full app</a></div>
      <p className="polaroid-preview-intro">Explore the filters and scrapbook layouts below. Open the full app to use your camera and keep working with your photographs.</p>
      <div className="polaroid-preview-controls" role="group" aria-label="Polaroid preview size"><button type="button" aria-pressed={device === 'desktop'} onClick={() => setDevice('desktop')}>Desktop</button><button type="button" aria-pressed={device === 'mobile'} onClick={() => setDevice('mobile')}>Mobile</button></div>
      <div className="polaroid-preview-stage" data-lenis-prevent><div className="polaroid-preview-window" data-device={device}>{previewOpen && active ? <iframe src={website} title="Polaroid — live camera and photographic scrapbook app" sandbox="allow-scripts allow-same-origin allow-downloads allow-popups allow-popups-to-escape-sandbox" referrerPolicy="strict-origin-when-cross-origin" /> : <div className="polaroid-preview-placeholder"><p>A camera for the sentimental</p><button type="button" onClick={() => setPreviewOpen(true)}>Load live preview</button></div>}</div></div>
    </section>

    <section className="polaroid-section" aria-labelledby="polaroid-layouts"><h2 id="polaroid-layouts">More than a single print</h2><div className="polaroid-layouts"><article><h3>Bali Postcards</h3><p>Five overlapping travel photographs and a typewritten note.</p></article><article><h3>Mixtape Memories</h3><p>Three instant prints, a cassette label and handwritten details.</p></article><article><h3>Joyride Journal</h3><p>Two photographs in a portrait journal with room for a heading and caption.</p></article><article><h3>Handwritten Moment</h3><p>A single landscape photograph paired with a personal message.</p></article></div><p className="polaroid-layout-note">Each layout is editable. Saved drafts retain the photographs, crops, treatments and text, so an unfinished composition can wait until later.</p></section>

    <section className="polaroid-section polaroid-build" aria-labelledby="polaroid-build"><h2 id="polaroid-build">Made to stay with you</h2><div className="polaroid-copy"><p>React and TypeScript connect the camera, gallery and editor. Live previews use a GPU rendering path with a worker fallback; still photographs follow a separate, full-resolution processing path. The same canvas renderer draws the scrapbook preview and its exported image.</p><p>Photos and drafts are stored in the browser with IndexedDB. The app adds no account or photo-upload backend. PNG and JPEG downloads let the work leave the browser; keeping a backup matters because clearing browser data can remove the local collection.</p><p className="polaroid-small">The film and camera looks are creative interpretations rather than calibrated stock simulations.</p><a href="https://github.com/overlytiwa/Polaroid" target="_blank" rel="noopener noreferrer">View the source on GitHub</a></div></section>
  </div>;
}
