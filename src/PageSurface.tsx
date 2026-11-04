import { useEffect, useRef, type ReactNode, type RefCallback } from 'react';
import Lenis from 'lenis';
import { SceneContext, reducedMotion } from './motion';
import { Header } from './components';

export function PageSurface({ surfaceRef, pageKey, active, menu, busy, revealing, title, onSelect, onMenu, onContact, children }: {
  surfaceRef: RefCallback<HTMLDivElement>; pageKey: string; active: boolean; menu: boolean; busy: boolean; revealing: boolean;
  title: string; onSelect: () => void; onMenu: () => void; onContact: () => void; children: ReactNode;
}) {
  const scroll = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!active || menu || busy || reducedMotion() || !scroll.current || !content.current) return;
    const lenis = new Lenis({ wrapper: scroll.current, content: content.current, autoRaf: true, duration: 1.15, smoothWheel: true, syncTouch: false });
    return () => lenis.destroy();
  }, [active, menu, busy]);
  return <div ref={surfaceRef} className={`page-surface ${active ? 'is-active' : ''} ${menu ? 'is-menu' : ''} ${revealing && active ? 'is-revealing' : ''}`} data-page={pageKey} aria-hidden={!active && !menu}>
    <div className="surface-content" inert={menu || !active || busy}>
      <Header menuOpen={menu} onMenu={onMenu} onContact={onContact} />
      <div className="page-scroll" ref={scroll}><div ref={content}>
        <SceneContext.Provider value={{ active: active && ((!menu && !busy) || revealing), delay: 0.05 }}>{children}</SceneContext.Provider>
      </div></div>
    </div>
    <div className="menu-page-title" aria-hidden="true"><span>{title}</span></div>
    <button className="menu-page-select" aria-label={pageKey === '/' ? 'View cases' : pageKey === '/about' ? 'About Tiwalope' : pageKey === '/research' ? 'View all research' : pageKey === 'research-article' ? 'Return to research paper' : 'Return to project'} onClick={onSelect} tabIndex={menu ? 0 : -1} aria-hidden={!menu} />
  </div>;
}
