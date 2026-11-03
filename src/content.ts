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
  caseStudy?: 'adune-home' | 'miolad-hotels';
}

export const projects: Project[] = [
  { slug: 'project-03', title: 'Project 03', category: '', year: '', description: '', coverImage: '', images: ['', ''], tone: 'sage' },
];
