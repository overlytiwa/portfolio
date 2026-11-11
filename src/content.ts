/** Edit this file to update the portfolio. Image paths may be local (/images/...) or HTTPS URLs. */
export const profile = {
  name: 'Ogundiji Tiwalope',
  firstLine: 'Ogundiji',
  secondLine: 'Tiwalope',
  brand: 'Overly',
  role: 'Front End Developer',
  email: 'tiwaogundiji@gmail.com',
  location: 'Lagos, Nigeria',
  timeZone: 'Africa/Lagos',
  bio: 'I’m a Nigerian front end developer and creative based in Lagos, working globally. With a background in computer science, I approach design beyond aesthetics. Form follows meaning.',
  philosophy: 'My work centers on minimalism because clarity produces stronger experiences. I remove what distracts so the core message is felt, not just seen.',
  network: 'When projects need to scale, I draw on a trusted network I’ve built over 5 years.',
  portrait: '/images/tiwalope-portrait.jpg',
  services: ['Creative Direction', 'Brand design', 'Digital and UI design', 'Campaign and AI content'],
  signature: [
    { title: 'Projection', image: '/images/projection.jpg', labelTone: 'light' },
    { title: 'Semantics', image: '/images/semantics.jpg', labelTone: 'dark' },
    { title: 'Perfectionism', image: '/images/perfectionism.jpg', labelTone: 'light' },
  ],
};

export interface Project {
  slug: string;
  title: string;
  category: string;
  year: string;
  description: string;
  coverImage: string;
  images: [string, string];
  tone: 'sand' | 'stone' | 'sage';
  caseStudy?: 'adune-home' | 'miolad-hotels' | 'lasgidi' | 'disc-archive' | 'polaroid' | 'listening-shelf';
  websiteUrl?: string;
  previewAnchor?: string;
}

export const projects: Project[] = [
  { slug: 'lasgidi', title: 'Lasgidi', category: 'Web design / Front-end development', year: '2026', description: 'An immersive portrait of Lagos. A digital city guide that brings together the coastline, culture and architecture of a place always in motion.', coverImage: '/projects/lasgidi/lagos-marina.jpg', images: ['', ''], tone: 'stone', caseStudy: 'lasgidi', websiteUrl: 'https://lasgidi-blush.vercel.app/', previewAnchor: 'lasgidi-preview' },
  { slug: 'disc-archive', title: 'The Disc Archive', category: 'Creative development / 3D web', year: '2026', description: 'An independent discography experience that turns seventeen Kanye West releases into a tactile collection of three-dimensional CDs, with album stories just beyond the surface.', coverImage: '/projects/disc-archive/cover.svg', images: ['', ''], tone: 'sand', caseStudy: 'disc-archive', websiteUrl: 'https://kw-seven.vercel.app/', previewAnchor: 'disc-archive-preview' },
  { slug: 'polaroid', title: 'Polaroid', category: 'Web app / Creative development', year: '2026', description: 'A camera and photographic scrapbook for the browser. Capture or import a photograph, find its character, and turn it into something worth keeping.', coverImage: '/projects/polaroid/cover.svg', images: ['', ''], tone: 'sand', caseStudy: 'polaroid', websiteUrl: 'https://polaroid.overly.cc/', previewAnchor: 'polaroid-preview' },
  { slug: 'listening-shelf', title: 'The Listening Shelf', category: 'Creative development / Interactive web', year: '2026', description: 'The music that stays with me. A personal collection of 37 albums and EPs, brought together as a shelf of worn VHS sleeves to browse, open and revisit.', coverImage: '/projects/listening-shelf/cover.webp', images: ['', ''], tone: 'sand', caseStudy: 'listening-shelf', websiteUrl: 'https://the-listening-shelf.vercel.app/', previewAnchor: 'listening-shelf-preview' },
];
