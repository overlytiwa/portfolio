import { useContext, useEffect, useRef } from 'react';
import { ImageSlot } from './components';
import { projects, profile } from './content';
import { RouteLink } from './navigation';
import { gsap, SceneContext, reducedMotion } from './motion';

export function Work() {
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
      const width = step * cards.length;
      const gutter = window.innerWidth <= 650 ? 8 : 16;
      cards.forEach((card, index) => {
        const x = ((index * step + current + step) % width + width) % width - step + gutter;
        card.style.transform = `translate3d(${x}px,0,0)`;
      });
    };
    const resize = () => { position.current.step = cards[0].offsetWidth + 8; draw(); };
    const tick = (time: number) => {
      const delta = Math.min(32, time - last || 16.67); last = time;
      const p = position.current;
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
    <h1 className="sr-only">{profile.name} — {profile.role} / {profile.brand}</h1>
    <div className="project-track" aria-label="Projects — drag or use arrow keys" ref={track} onDragStart={event => event.preventDefault()}>
      {[...projects, ...projects].map((project, index) => <RouteLink href={`/work/${project.slug}`} className="project-card" key={`${project.slug}-${index}`} tabIndex={index < projects.length ? 0 : -1} aria-hidden={index >= projects.length || undefined}
        onFocus={event => {
          if (event.currentTarget.matches(':focus-visible')) {
            const x = event.currentTarget.getBoundingClientRect().x;
            if (x < 0 || x > window.innerWidth - position.current.step) {
              position.current.target = position.current.current = -index * position.current.step;
              const cards = track.current!.querySelectorAll<HTMLElement>('.project-card');
              cards.forEach((card, i) => gsap.set(card, { x: ((i - index + cards.length) % cards.length) * position.current.step + (window.innerWidth <= 650 ? 8 : 16) }));
            }
          }
        }}
        onClick={event => { if (event.detail > 0 && drag.current.moved) { event.preventDefault(); drag.current.moved = false; } }}>
        <h2 className="project-card-caption micro">{project.title}</h2>
        <ImageSlot src={project.coverImage} label={`${project.title} cover`} tone={project.tone} eager />
      </RouteLink>)}
    </div>
  </main>;
}
