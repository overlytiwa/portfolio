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
import { SideQuests, SRemoteProject, sideQuestsPath, sRemotePath } from './SideQuests';
import { projects } from './content';
import { gsap, reducedMotion } from './motion';
import { menuLayout, clampMenuOffset, revealMenuTile, snapMenuOffset, menuTilePosition } from './menuLayout';

const currentPath = () => window.location.pathname.replace(/\/$/, '') || '/';
const isProject = (path: string) => projects.some(p => `/work/${p.slug}` === path);
const researchPath = '/research';
const researchArticlePath = '/research/001';
const isResearchArticle = (path: string) => path === researchArticlePath;
const basePages = ['/', '/about', researchPath, sideQuestsPath];
const surfaceKey = (path: string) => path === sRemotePath ? 's-remote' : isResearchArticle(path) ? 'research-article' : basePages.includes(path) ? path : 'project';

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
  const gesture = useRef({ x: 0, offset: 0, down: false, moved: false, pointerId: -1 });
  const returnFocus = useRef<HTMLElement | null>(null);
  const duration = () => reducedMotion() ? 0 : 1.4;
  const tiles = () => [...basePages, ...(isProject(runtime.current.path) ? ['project'] : isResearchArticle(runtime.current.path) ? ['research-article'] : runtime.current.path === sRemotePath ? ['s-remote'] : [])];
  const layout = () => menuLayout(window.innerWidth, tiles().length);
  function tileGeometry(index: number) {
    return menuTilePosition(index, runtime.current.offset, layout());
  }
  function positionMenu(offset: number, animate = false) {
    runtime.current.offset = clampMenuOffset(offset, layout());
    tiles().forEach((key, index) => {
      const node = surfaces.current[key];
      gsap.killTweensOf(node);
      if (animate && !reducedMotion()) gsap.to(node, { ...tileGeometry(index), duration: 0.45, ease: 'power3.out' });
      else gsap.set(node, tileGeometry(index));
    });
  }
  function focusMenuTile(button: HTMLButtonElement, index: number) {
    positionMenu(revealMenuTile(index, runtime.current.offset, layout()), true);
    button.focus({ preventScroll: true });
  }
  function commit(to: string, push = true) {
    runtime.current.path = to;
    if (push && currentPath() !== to) window.history.pushState({}, '', to);
    flushSync(() => setPath(to));
  }
  function settle(to: string, focus = true) {
    const key = surfaceKey(to);
    runtime.current.menu = false; runtime.current.busy = false;
    gesture.current.down = false; gesture.current.moved = false;
    stage.current?.classList.remove('is-dragging');
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
    runtime.current.offset = revealMenuTile(tiles().indexOf(surfaceKey(runtime.current.path)), 0, layout());
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
    const menuTiles = tiles();
    const targetIndex = menuTiles.indexOf(key);
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
    menuTiles.forEach((otherKey, index) => {
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
    const sourceImage = newKey === 's-remote' || oldKey === 's-remote' ? null : origin?.querySelector<HTMLElement>('.image-slot') ?? (isProject(runtime.current.path) ? source.querySelector<HTMLElement>('.project-hero-image') : null);
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
    const targetImage = newKey === 'project' || newKey === 's-remote' ? target.querySelector<HTMLElement>('.project-hero-image') : matchingImages.find(image => { const r = image.getBoundingClientRect(); return r.left >= 0 && r.right <= window.innerWidth; }) ?? matchingImages.find(image => { const r = image.getBoundingClientRect(); return r.right > 0 && r.left < window.innerWidth; });
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
      gesture.current.down = false; gesture.current.moved = false;
      stage.current?.classList.remove('is-dragging');
      positionMenu(revealMenuTile(tiles().indexOf(surfaceKey(runtime.current.path)), runtime.current.offset, layout()));
    };
    window.addEventListener('popstate', onPop); window.addEventListener('resize', onResize);
    return () => { window.removeEventListener('popstate', onPop); window.removeEventListener('resize', onResize); };
  }, []);
  useEffect(() => {
    if (!menuOpen) return;
    const node = stage.current!;
    const wheel = (event: WheelEvent) => {
      if (event.ctrlKey || runtime.current.busy || gesture.current.down) return;
      event.preventDefault();
      const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      positionMenu(runtime.current.offset - delta * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerWidth : 1));
    };
    const blur = () => {
      if (!gesture.current.down) return;
      gesture.current.down = false;
      stage.current?.classList.remove('is-dragging');
      positionMenu(snapMenuOffset(runtime.current.offset, layout()), true);
      gesture.current.moved = false;
    };
    node.addEventListener('wheel', wheel, { passive: false });
    window.addEventListener('blur', blur);
    return () => { node.removeEventListener('wheel', wheel); window.removeEventListener('blur', blur); };
  }, [menuOpen]);
  useEffect(() => { document.title = path === sRemotePath ? 'S-Remote — Side Quests / Overly' : path === sideQuestsPath ? 'Side Quests — Ogundiji Tiwalope / Overly' : isResearchArticle(path) ? 'Anecdote — Research 001 / Overly' : path === researchPath ? 'Research — Ogundiji Tiwalope / Overly' : path === '/about' ? 'About — Ogundiji Tiwalope / Overly' : isProject(path) ? `${projects.find(p => path.endsWith(p.slug))!.title} — Overly` : 'Overly — Ogundiji Tiwalope'; }, [path]);
  function moveMenu(event: PointerEvent) {
    if (!gesture.current.down || runtime.current.busy || event.pointerId !== gesture.current.pointerId) return;
    const delta = event.clientX - gesture.current.x;
    if (Math.abs(delta) < 5 && !gesture.current.moved) return;
    gesture.current.moved = true;
    stage.current?.classList.add('is-dragging');
    event.currentTarget.setPointerCapture(event.pointerId);
    positionMenu(gesture.current.offset + delta);
  }
  function finishMenu(event: PointerEvent) {
    if (!gesture.current.down || event.pointerId !== gesture.current.pointerId) return;
    gesture.current.down = false;
    stage.current?.classList.remove('is-dragging');
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    if (!gesture.current.moved) return;
    positionMenu(snapMenuOffset(runtime.current.offset, layout()), true);
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
        if (['Tab', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) {
          const buttons = [...stage.current!.querySelectorAll<HTMLButtonElement>('.page-surface[aria-hidden="false"] .menu-page-select')];
          if (!buttons.length || runtime.current.busy) { e.preventDefault(); return; }
          const index = buttons.indexOf(document.activeElement as HTMLButtonElement);
          const nextIndex = e.key === 'Home' ? 0 : e.key === 'End' ? buttons.length - 1 : e.key === 'Tab' ? (index + (e.shiftKey ? -1 : 1) + buttons.length) % buttons.length : Math.max(0, Math.min(buttons.length - 1, index + (e.key === 'ArrowLeft' ? -1 : 1)));
          e.preventDefault(); focusMenuTile(buttons[nextIndex], nextIndex);
        }
      }}
      onPointerDown={e => { if (!menuOpen || runtime.current.busy || e.button !== 0 || !e.isPrimary) return; positionMenu(runtime.current.offset); gesture.current = { x: e.clientX, offset: runtime.current.offset, down: true, moved: false, pointerId: e.pointerId }; }}
      onClickCapture={e => { if (gesture.current.moved && e.detail > 0) { e.preventDefault(); e.stopPropagation(); } }}
      onClick={e => { if (menuOpen && e.target === stage.current) closeMenu(); }}
      onPointerMove={moveMenu} onPointerUp={finishMenu} onPointerCancel={finishMenu}>
      {[...basePages, 'research-article', 's-remote', 'project'].map(key => <PageSurface key={key} surfaceRef={node => { surfaces.current[key] = node; }} pageKey={key} active={surfaceKey(path) === key} menu={menuOpen && tiles().includes(key)} busy={busy} revealing={revealing} title={key === 's-remote' ? 'S-Remote' : key === sideQuestsPath ? 'Side Quests' : key === 'research-article' ? 'anecdote' : key === researchPath ? 'research' : key === '/about' ? 'about' : key === '/' ? 'cases' : project?.title.toLowerCase() ?? 'case'} onSelect={() => selectPage(key === 'project' ? projectPath : key === 'research-article' ? researchArticlePath : key === 's-remote' ? sRemotePath : key)} onMenu={openMenu} onContact={openContact}>
        {key === '/' ? <Work /> : key === '/about' ? <About onContact={openContact} /> : key === sideQuestsPath ? <SideQuests /> : key === 's-remote' ? <SRemoteProject /> : key === researchPath ? <ResearchGallery /> : key === 'research-article' ? <Research /> : project ? <ProjectPage key={project.slug} project={project} /> : <main tabIndex={-1} className="not-found"><p className="micro">404</p><h1>Page not found.</h1><RouteLink href="/">Back to work <Arrow /></RouteLink></main>}
      </PageSurface>)}
    </div>
    <Contact open={contactOpen} close={() => setContactOpen(false)} />
  </NavigationContext.Provider>;
}
