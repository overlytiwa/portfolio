import { useCallback, useEffect, useLayoutEffect, useRef, useState, type PointerEvent } from 'react';
import { flushSync } from 'react-dom';
import { NavigationContext, RouteLink } from './navigation';
import { Contact } from './Contact';
import { Arrow } from './components';
import { Work } from './Work';
import { About } from './About';
import { ProjectPage } from './ProjectPage';
import { PageSurface } from './PageSurface';
import { Research } from './Research';
import { ResearchGallery } from './ResearchGallery';
import { projects } from './content';
import { gsap, reducedMotion } from './motion';

const currentPath = () => window.location.pathname.replace(/\/$/, '') || '/';
const isProject = (path: string) => projects.some(p => `/work/${p.slug}` === path);
const researchPath = '/research';
const researchArticlePath = '/research/001';
const isResearchArticle = (path: string) => path === researchArticlePath;
const surfaceKey = (path: string) => isResearchArticle(path) ? 'research-article' : path === '/' || path === '/about' || path === researchPath ? path : 'project';

export default function App() {
  const [path, setPath] = useState(currentPath);
  const [projectPath, setProjectPath] = useState(currentPath);
  const [menuOpen, setMenuOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [revealing, setRevealing] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const surfaces = useRef<Record<string, HTMLDivElement | null>>({});
  const backdrop = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const runtime = useRef({ path: currentPath(), menu: false, busy: false, offset: 0 });
  const gesture = useRef({ x: 0, offset: 0, down: false, moved: false });
  const returnFocus = useRef<HTMLElement | null>(null);
  const duration = () => reducedMotion() ? 0 : 1.4;
  const tiles = () => [...['/', '/about', researchPath], ...(isProject(runtime.current.path) ? ['project'] : isResearchArticle(runtime.current.path) ? ['research-article'] : [])];
  function tileGeometry(index: number) {
    const mobile = window.innerWidth <= 650;
    const width = mobile ? 100 : ((1 / tiles().length - 0.025) / 0.75) * 100;
    return { x: window.innerWidth * (mobile ? index * 0.68 : 0.0125 + index / tiles().length) + runtime.current.offset, scale: mobile ? 0.6 : 0.75, clipPath: `inset(0 ${100 - width}% 0 0)`, '--menu-card-width': `${width}%` };
  }
  function commit(to: string, push = true) {
    runtime.current.path = to;
    if (push && currentPath() !== to) window.history.pushState({}, '', to);
    flushSync(() => setPath(to));
  }
  function settle(to: string, focus = true) {
    const key = surfaceKey(to);
    runtime.current.menu = false; runtime.current.busy = false;
    flushSync(() => { setMenuOpen(false); setBusy(false); setRevealing(false); });
    for (const [name, node] of Object.entries(surfaces.current)) {
      if (!node) continue;
      gsap.set(node, { x: 0, y: 0, scale: 1, clipPath: 'inset(0 0% 0 0)', opacity: 1, visibility: name === key ? 'visible' : 'hidden', zIndex: name === key ? 2 : 0 });
      gsap.set(node.querySelector('.menu-page-title span'), { yPercent: 110, y: 0 });
      const transient = node.querySelectorAll('.project-card-caption, .project-info, .project-hero-image, .image-slot');
      if (transient.length) gsap.set(transient, { clearProps: 'opacity,visibility' });
    }
    gsap.set(backdrop.current, { autoAlpha: 0 });
    if (focus) {
      const main = surfaces.current[key]?.querySelector<HTMLElement>('main');
      main?.focus({ preventScroll: true });
    }
  }
  function openMenu() {
    if (runtime.current.busy || runtime.current.menu) return;
    returnFocus.current = document.activeElement as HTMLElement;
    runtime.current.menu = true; runtime.current.busy = true; runtime.current.offset = 0;
    // Keep the current tile within reach on narrow screens.
    if (window.innerWidth <= 650) runtime.current.offset = -tiles().indexOf(surfaceKey(runtime.current.path)) * window.innerWidth * 0.68;
    flushSync(() => { setMenuOpen(true); setBusy(true); });
    if (reducedMotion()) {
      tiles().forEach((key, index) => { gsap.set(surfaces.current[key], { ...tileGeometry(index), visibility: 'visible', zIndex: 2 }); gsap.set(surfaces.current[key]!.querySelector('.menu-page-title span'), { yPercent: 0 }); });
      gsap.set(backdrop.current, { autoAlpha: 1 });
      runtime.current.busy = false; setBusy(false);
      surfaces.current[surfaceKey(runtime.current.path)]?.querySelector<HTMLButtonElement>('.menu-page-select')?.focus({ preventScroll: true });
      return;
    }
    const tl = gsap.timeline({ onComplete: () => {
      runtime.current.busy = false; setBusy(false);
      surfaces.current[surfaceKey(runtime.current.path)]?.querySelector<HTMLButtonElement>('.menu-page-select')?.focus({ preventScroll: true });
    } });
    timeline.current = tl;
    tl.to(backdrop.current, { autoAlpha: 1, duration: duration() * 0.5 }, 0);
    tiles().forEach((key, index) => {
      const node = surfaces.current[key]!;
      const goal = tileGeometry(index);
      if (key !== surfaceKey(runtime.current.path)) gsap.set(node, { ...goal, x: goal.x + window.innerWidth, visibility: 'visible', zIndex: 1 });
      else gsap.set(node, { visibility: 'visible', zIndex: 2 });
      tl.to(node, { ...goal, duration: duration(), ease: 'pageFlow' }, index * 0.035);
      tl.fromTo(node.querySelector('.menu-page-title span'), { yPercent: 110 }, { yPercent: 0, duration: duration(), ease: 'pageFlow' }, 0);
    });
  }
  function selectPage(to: string) {
    if (runtime.current.busy || gesture.current.moved) return;
    runtime.current.busy = true;
    const previous = runtime.current.path;
    const key = surfaceKey(to);
    const target = surfaces.current[key]!;
    const targetIndex = tiles().indexOf(key);
    const same = previous === to;
    if (!same) target.querySelector('.page-scroll')!.scrollTop = 0;
    commit(to);
    if (reducedMotion()) { settle(to, !same); if (same) returnFocus.current?.focus({ preventScroll: true }); return; }
    setBusy(true);
    const tl = gsap.timeline({ onComplete: () => { settle(to, !same); if (same) returnFocus.current?.focus({ preventScroll: true }); } });
    timeline.current = tl;
    gsap.set(target, { zIndex: 4 });
    tl.to(target, { x: 0, scale: 1, clipPath: 'inset(0 0% 0 0)', duration: duration(), ease: 'pageFlow' }, 0);
    tl.to(target.querySelector('.menu-page-title span'), { yPercent: -110, duration: duration() * 0.55, ease: 'power3.inOut' }, 0);
    tiles().forEach((otherKey, index) => {
      if (otherKey === key) return;
      tl.to(surfaces.current[otherKey], { x: (index < targetIndex ? -1 : 1) * window.innerWidth, duration: duration(), ease: 'pageFlow' }, 0);
    });
    tl.to(backdrop.current, { autoAlpha: 0, duration: duration() * 0.4 }, duration() * 0.6);
    tl.call(() => setRevealing(true), [], duration() * 0.65);
  }
  function closeMenu() { if (runtime.current.menu) selectPage(runtime.current.path); }

  const navigate = useCallback((to: string, origin?: HTMLElement) => {
    if (runtime.current.busy) return;
    if (runtime.current.menu) { selectPage(to); return; }
    if (to === runtime.current.path) { surfaces.current[surfaceKey(to)]?.querySelector('.page-scroll')?.scrollTo({ top: 0, behavior: reducedMotion() ? 'instant' : 'smooth' }); return; }
    const oldKey = surfaceKey(runtime.current.path);
    const newKey = surfaceKey(to);
    const source = surfaces.current[oldKey]!;
    if (reducedMotion()) {
      if (newKey === 'project') flushSync(() => setProjectPath(to));
      commit(to); surfaces.current[newKey]?.querySelector('.page-scroll')?.scrollTo(0, 0); settle(to); return;
    }
    const sourceImage = origin?.querySelector<HTMLElement>('.image-slot') ?? (isProject(runtime.current.path) ? source.querySelector<HTMLElement>('.project-hero-image') : null);
    // Keep a fixed image bridge while its destination is rendered and measured.
    let bridge: HTMLElement | null = null;
    let rect: DOMRect | undefined;
    if (sourceImage && !reducedMotion()) {
      rect = sourceImage.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < window.innerHeight) {
        bridge = sourceImage.cloneNode(true) as HTMLElement;
        bridge.classList.add('image-bridge'); bridge.setAttribute('aria-hidden', 'true');
        Object.assign(bridge.style, { position: 'fixed', left: `${rect.left}px`, top: `${rect.top}px`, width: `${rect.width}px`, height: `${rect.height}px`, margin: '0', zIndex: '50', pointerEvents: 'none', aspectRatio: 'auto' });
        document.body.append(bridge);
      }
    }
    if (newKey === 'project') flushSync(() => setProjectPath(to));
    const target = surfaces.current[newKey]!;
    target.querySelector('.page-scroll')!.scrollTop = 0;
    runtime.current.busy = true;
    flushSync(() => setBusy(true));
    gsap.set(target, { visibility: 'visible', zIndex: 3, x: 0, scale: 1, clipPath: 'inset(0 0% 0 0)' });
    const matchingImages = [...target.querySelectorAll<HTMLElement>(`[href="${runtime.current.path}"] .image-slot`)];
    const targetImage = newKey === 'project' ? target.querySelector<HTMLElement>('.project-hero-image') : matchingImages.find(image => { const r = image.getBoundingClientRect(); return r.left >= 0 && r.right <= window.innerWidth; }) ?? matchingImages.find(image => { const r = image.getBoundingClientRect(); return r.right > 0 && r.left < window.innerWidth; });
    const tl = gsap.timeline({ onComplete: () => { settle(to); bridge?.remove(); } });
    timeline.current = tl;
    commit(to);
    tl.call(() => setRevealing(true), [], duration() * 0.65);
    if (bridge && targetImage && rect) {
      const destination = targetImage.getBoundingClientRect();
      // Only the bridge is visible until the destination takes over.
      if (sourceImage) gsap.set(sourceImage, { visibility: 'hidden' });
      gsap.set(targetImage, { visibility: 'hidden' });
      gsap.set(target, { opacity: 0 });
      tl.to(source.querySelectorAll('.project-card-caption, .project-info'), { opacity: 0, duration: duration() * 0.3 }, 0);
      tl.to(bridge, { left: destination.left, top: destination.top, width: destination.width, height: destination.height, duration: duration(), ease: 'pageFlow' }, 0.08);
      tl.to(target, { opacity: 1, duration: duration() * 0.35 }, duration() * 0.45);
      tl.set(source.querySelectorAll('.project-card-caption, .project-info'), { clearProps: 'opacity' });
    } else {
      bridge?.remove();
      gsap.set(target, { clipPath: 'inset(100% 0 0 0)' });
      tl.to(target, { clipPath: 'inset(0% 0 0 0)', duration: duration(), ease: 'pageFlow' }, 0);
    }
  }, []);

  useLayoutEffect(() => {
    Object.entries(surfaces.current).forEach(([key, node]) => {
      gsap.set(node, { visibility: key === surfaceKey(runtime.current.path) ? 'visible' : 'hidden', zIndex: key === surfaceKey(runtime.current.path) ? 2 : 0 });
      gsap.set(node?.querySelector('.menu-page-title span') ?? [], { yPercent: 110, y: 0 });
    });
    return () => { timeline.current?.kill(); document.querySelectorAll('.image-bridge').forEach(el => el.remove()); }; }, []);
  useEffect(() => {
    const onPop = () => {
      timeline.current?.kill(); document.querySelectorAll('.image-bridge').forEach(el => el.remove());
      const to = currentPath();
      flushSync(() => { setProjectPath(to); setContactOpen(false); });
      commit(to, false); settle(to);
    };
    const onResize = () => {
      if (!runtime.current.menu) return;
      timeline.current?.kill(); runtime.current.busy = false; setBusy(false); setRevealing(false);
      runtime.current.offset = window.innerWidth <= 650 ? -tiles().indexOf(surfaceKey(runtime.current.path)) * window.innerWidth * 0.68 : 0;
      tiles().forEach((key, i) => gsap.set(surfaces.current[key], tileGeometry(i)));
    };
    window.addEventListener('popstate', onPop); window.addEventListener('resize', onResize);
    return () => { window.removeEventListener('popstate', onPop); window.removeEventListener('resize', onResize); };
  }, []);
  useEffect(() => { document.title = isResearchArticle(path) ? 'Anecdote — Research 001 / Overly' : path === researchPath ? 'Research — Ogundiji Tiwalope / Overly' : path === '/about' ? 'About — Ogundiji Tiwalope / Overly' : isProject(path) ? `${projects.find(p => path.endsWith(p.slug))!.title} — Overly` : 'Overly — Ogundiji Tiwalope'; }, [path]);
  function moveMenu(event: PointerEvent) {
    if (!gesture.current.down || runtime.current.busy) return;
    const delta = event.clientX - gesture.current.x;
    if (Math.abs(delta) < 5 && !gesture.current.moved) return;
    gesture.current.moved = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    const max = window.innerWidth <= 650 ? (tiles().length - 1) * window.innerWidth * 0.68 : 0;
    runtime.current.offset = Math.max(-max, Math.min(0, gesture.current.offset + delta));
    tiles().forEach((key, i) => gsap.set(surfaces.current[key], tileGeometry(i)));
  }
  function finishMenu() {
    gesture.current.down = false;
    if (!gesture.current.moved) return;
    const step = window.innerWidth * 0.68;
    runtime.current.offset = Math.round(runtime.current.offset / step) * step;
    tiles().forEach((key, i) => gsap.to(surfaces.current[key], { ...tileGeometry(i), duration: reducedMotion() ? 0 : 0.65, ease: 'power3.out' }));
    // A synthetic click follows pointerup; keep it from selecting a dragged page.
    window.setTimeout(() => { gesture.current.moved = false; }, 0);
  }
  const project = projects.find(p => projectPath === `/work/${p.slug}`);
  const openContact = () => { if (!runtime.current.busy) setContactOpen(true); };
  return <NavigationContext.Provider value={navigate}>
    <a className="skip-link" href="#main-content" onClick={e => { e.preventDefault(); surfaces.current[surfaceKey(path)]?.querySelector<HTMLElement>('main')?.focus(); }}>Skip to content</a>
    <div ref={backdrop} className="menu-backdrop" onClick={closeMenu} />
    <div ref={stage} className={`page-stage ${menuOpen ? 'menu-is-open' : ''}`} id="site-menu" role={menuOpen ? 'dialog' : undefined} aria-modal={menuOpen || undefined} aria-label={menuOpen ? 'Main menu' : undefined}
      onKeyDown={e => {
        if (!menuOpen) return;
        if (e.key === 'Escape') { e.preventDefault(); closeMenu(); }
        if (e.key === 'Tab') {
          const buttons = [...stage.current!.querySelectorAll<HTMLButtonElement>('.page-surface[aria-hidden="false"] .menu-page-select')];
          const index = buttons.indexOf(document.activeElement as HTMLButtonElement);
          e.preventDefault(); const next = buttons[(index + (e.shiftKey ? -1 : 1) + buttons.length) % buttons.length];
          if (window.innerWidth <= 650) { runtime.current.offset = -buttons.indexOf(next) * window.innerWidth * 0.68; tiles().forEach((key, i) => gsap.to(surfaces.current[key], { ...tileGeometry(i), duration: 0.5, ease: 'power3.out' })); }
          next.focus({ preventScroll: true });
        }
      }}
      onPointerDown={e => { if (!menuOpen || runtime.current.busy) return; gesture.current = { x: e.clientX, offset: runtime.current.offset, down: true, moved: false }; }}
      onPointerMove={moveMenu} onPointerUp={finishMenu} onPointerCancel={finishMenu}>
      {['/', '/about', researchPath, 'research-article', 'project'].map(key => <PageSurface key={key} surfaceRef={node => { surfaces.current[key] = node; }} pageKey={key} active={surfaceKey(path) === key} menu={menuOpen && (key !== 'project' || isProject(path)) && (key !== 'research-article' || isResearchArticle(path))} busy={busy} revealing={revealing} title={key === 'research-article' ? 'anecdote' : key === researchPath ? 'research' : key === '/about' ? 'about' : key === '/' ? 'cases' : project?.title.toLowerCase() ?? 'case'} onSelect={() => selectPage(key === 'project' ? projectPath : key === 'research-article' ? researchArticlePath : key)} onMenu={openMenu} onContact={openContact}>
        {key === '/' ? <Work /> : key === '/about' ? <About onContact={openContact} /> : key === researchPath ? <ResearchGallery /> : key === 'research-article' ? <Research /> : project ? <ProjectPage key={project.slug} project={project} /> : <main tabIndex={-1} className="not-found"><p className="micro">404</p><h1>Page not found.</h1><RouteLink href="/">Back to work <Arrow /></RouteLink></main>}
      </PageSurface>)}
    </div>
    <Contact open={contactOpen} close={() => setContactOpen(false)} />
  </NavigationContext.Provider>;
}
