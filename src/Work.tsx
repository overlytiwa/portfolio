import { useContext, useEffect, useRef } from 'react';
import { ImageSlot } from './components';
import { projects, profile } from './content';
import { RouteLink } from './navigation';
import { SceneContext, reducedMotion } from './motion';

function limitOffset(value: number, step: number, count: number, viewport: number, gutter: number) {
  const end = Math.min(0, viewport - (count * step - 8 + gutter * 2));
  return Math.max(end, Math.min(0, value));
}

export interface GalleryItem {
  href: string;
  title: string;
  coverImage: string;
  tone?: string;
}

export function CardGallery({ items, heading, label }: { items: GalleryItem[]; heading: string; label: string }) {
  const track = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, x: 0, start: 0, time: 0, velocity: 0, moved: false });
  const position = useRef({ current: 0, target: 0, step: 0 });
  const { active } = useContext(SceneContext);
  useEffect(() => {
    const node = track.current!;
    const cards = [...node.querySelectorAll<HTMLElement>('.project-card')];
    const wheelArea = node.closest('main')!;
    let frame = 0;
    let last = 0;
    const draw = () => {
      const { current, step } = position.current;
      const gutter = window.innerWidth <= 650 ? 8 : 16;
      cards.forEach((card, index) => {
        const x = index * step + current + gutter;
        card.style.transform = `translate3d(${x}px,0,0)`;
      });
    };
    const clamp = (value: number) => limitOffset(value, position.current.step, cards.length, node.clientWidth, window.innerWidth <= 650 ? 8 : 16);
    const resize = () => {
      const p = position.current;
      p.step = (cards[0]?.offsetWidth ?? 0) + 8;
      p.current = clamp(p.current); p.target = clamp(p.target);
      draw();
    };
    const tick = (time: number) => {
      const delta = Math.min(32, time - last || 16.67); last = time;
      const p = position.current;
      p.target = clamp(p.target);
      p.current += (p.target - p.current) * (reducedMotion() ? 1 : 1 - Math.pow(drag.current.down ? 0.76 : 0.88, delta / 16.67));
      draw();
      if (Math.abs(p.target - p.current) > 0.05) frame = requestAnimationFrame(tick);
      else { p.current = p.target; draw(); frame = 0; }
    };
    const run = () => { if (!frame) { last = 0; frame = requestAnimationFrame(tick); } };
    const wheel = (event: WheelEvent) => {
      if (!active || event.ctrlKey) return;
      event.preventDefault();
      const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      position.current.target -= delta * (event.deltaMode === 1 ? 16 : 1); run();
    };
    const down = (event: PointerEvent) => {
      if (!active || event.button !== 0) return;
      position.current.target = position.current.current;
      drag.current = { down: true, x: event.clientX, start: event.clientX, time: performance.now(), velocity: 0, moved: false };
    };
    const move = (event: PointerEvent) => {
      const d = drag.current;
      if (!d.down) return;
      const now = performance.now();
      const distance = event.clientX - d.x;
      d.velocity = d.velocity * 0.35 + distance / Math.max(8, now - d.time) * 0.65;
      if (Math.abs(event.clientX - d.start) > 5) { d.moved = true; node.classList.add('is-dragging'); }
      position.current.target += distance;
      d.x = event.clientX; d.time = now; run();
    };
    const up = () => {
      const d = drag.current;
      if (!d.down) return;
      d.down = false;
      if (performance.now() - d.time < 100 && !reducedMotion()) position.current.target += Math.max(-3, Math.min(3, d.velocity)) * 210;
      node.classList.remove('is-dragging'); run();
    };
    const key = (event: KeyboardEvent) => {
      if (!active || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
      event.preventDefault(); position.current.target += position.current.step * (event.key === 'ArrowLeft' ? 1 : -1); run();
    };
    const observer = new ResizeObserver(resize); observer.observe(node); resize();
    wheelArea.addEventListener('wheel', wheel, { passive: false }); node.addEventListener('pointerdown', down);
    node.addEventListener('keydown', key); window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up); window.addEventListener('pointercancel', up); window.addEventListener('blur', up);
    if (!active) { position.current.target = position.current.current; drag.current.down = false; }
    return () => {
      cancelAnimationFrame(frame); observer.disconnect();
      wheelArea.removeEventListener('wheel', wheel); node.removeEventListener('pointerdown', down); node.removeEventListener('keydown', key);
      window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); window.removeEventListener('pointercancel', up); window.removeEventListener('blur', up);
    };
  }, [active]);
  return <main id="main-content" tabIndex={-1} className="work-page">
    <h1 className="sr-only">{heading}</h1>
    <div className="project-track" aria-label={label} ref={track} onDragStart={event => event.preventDefault()}>
      {items.map((item, index) => <RouteLink href={item.href} className="project-card" key={item.href}
        onFocus={event => {
          if (event.currentTarget.matches(':focus-visible')) {
            const x = event.currentTarget.getBoundingClientRect().x;
            const gutter = window.innerWidth <= 650 ? 8 : 16;
            if (x < gutter || x > window.innerWidth - position.current.step) {
              position.current.target = position.current.current = limitOffset(-index * position.current.step, position.current.step, items.length, track.current!.clientWidth, gutter);
              const cards = track.current!.querySelectorAll<HTMLElement>('.project-card');
              cards.forEach((card, i) => { card.style.transform = `translate3d(${i * position.current.step + position.current.current + gutter}px,0,0)`; });
            }
          }
        }}
        onClick={event => { if (event.detail > 0 && drag.current.moved) { event.preventDefault(); drag.current.moved = false; } }}>
        <h2 className="project-card-caption micro">{item.title}</h2>
        <ImageSlot src={item.coverImage} label={`${item.title} cover`} tone={item.tone} eager />
      </RouteLink>)}
    </div>
  </main>;
}

const projectCards: GalleryItem[] = projects.map(project => ({ href: `/work/${project.slug}`, title: project.title, coverImage: project.coverImage, tone: project.tone }));

export function Work() {
  return <CardGallery items={projectCards} heading={`${profile.name} — ${profile.role} / ${profile.brand}`} label="Projects — drag or use arrow keys" />;
}
