import { CardGallery, type GalleryItem } from './Work';

const researchCards: GalleryItem[] = [
  { href: '/research/001', title: 'Anecdote / Research 001', coverImage: '/research/001/cover.png', tone: 'sand' },
];

export function ResearchGallery() {
  return <CardGallery items={researchCards} heading="Research — Ogundiji Tiwalope" label="Research papers — drag or use arrow keys" />;
}
