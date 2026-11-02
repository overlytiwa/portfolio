export const aduneBase = '/projects/adune-home';
export const aduneWebsite = `${aduneBase}/website/index.html`;

export interface BrandAsset {
  title: string;
  path: string;
  vector?: boolean;
}

export const aduneLogos: BrandAsset[] = [
  { title: 'Primary wordmark', path: 'logos/primary-wordmark', vector: true },
  { title: 'Reversed wordmark', path: 'logos/reversed-wordmark', vector: true },
  { title: 'Secondary lockup', path: 'logos/secondary-lockup', vector: true },
  { title: 'Brand symbol', path: 'logos/brand-symbol', vector: true },
  { title: 'Circular seal', path: 'logos/circular-seal', vector: true },
];

export const adunePatterns: BrandAsset[] = [
  { title: 'Interlaced woven pattern', path: 'patterns/interlaced-woven-pattern', vector: true },
  { title: 'Topographic contour', path: 'patterns/topographic-contour', vector: true },
];

export const adunePackaging: BrandAsset[] = [
  { title: 'Shopping bag', path: 'print-packaging/shopping-bag-front', vector: true },
  { title: 'Box sleeve', path: 'print-packaging/box-sleeve', vector: true },
  { title: 'Tissue paper', path: 'print-packaging/tissue-paper-artwork', vector: true },
  { title: 'Seal sticker', path: 'print-packaging/seal-sticker', vector: true },
  { title: 'Hang tag / front', path: 'print-packaging/hang-tag-front', vector: true },
  { title: 'Hang tag / back', path: 'print-packaging/hang-tag-back', vector: true },
  { title: 'Product label', path: 'print-packaging/product-label-template', vector: true },
  { title: 'Packing insert', path: 'print-packaging/packing-slip-card', vector: true },
  { title: 'Thank-you card / front', path: 'print-packaging/thank-you-card-front', vector: true },
  { title: 'Thank-you card / back', path: 'print-packaging/thank-you-card-back', vector: true },
  { title: 'Business card / front', path: 'print-packaging/business-card-front', vector: true },
  { title: 'Business card / back', path: 'print-packaging/business-card-back', vector: true },
];

export const aduneSocial: BrandAsset[] = [
  { title: 'Brand story', path: 'social-media/instagram-post-brand-story', vector: true },
  { title: 'Object study', path: 'social-media/instagram-post-object-study', vector: true },
  { title: 'Typographic post', path: 'social-media/instagram-post-quote', vector: true },
  { title: 'Collection story', path: 'social-media/instagram-story-collection', vector: true },
];

export const adunePalette = [
  { name: 'Parchment', hex: '#F0EDE5', ink: '#252820' },
  { name: 'Olive', hex: '#4B5140', ink: '#F8F6F0' },
  { name: 'Clay', hex: '#AB7E64', ink: '#252820' },
  { name: 'Sand', hex: '#D6C8B6', ink: '#252820' },
  { name: 'Ink', hex: '#252820', ink: '#F8F6F0' },
  { name: 'Studio White', hex: '#F8F6F0', ink: '#252820' },
];

export const aduneDocuments = [
  { title: 'Brand book', detail: '22 pages / PDF', path: 'brand-identity/previous-proposed-identity/brand-book/ADUNE_Brand_Book_Proposed_Concept.pdf' },
  { title: 'Strategy & research', detail: 'Positioning, audience, voice & research', path: 'brand-identity/previous-proposed-identity/strategy/BRAND_STRATEGY_AND_RESEARCH.md' },
  { title: 'Print & packaging notes', detail: 'Materials, formats & production guidance', path: 'brand-identity/previous-proposed-identity/print-packaging/PRODUCTION_NOTES.md' },
  { title: 'Deliverables index', detail: 'A guide to every item in the package', path: 'DELIVERABLES_CHECKLIST.md' },
  { title: 'Website documentation', detail: 'React implementation & interaction guide', path: 'react-website/README.md' },
  { title: 'Project overview', detail: 'Package contents & creative direction', path: 'README_FIRST.md' },
];
