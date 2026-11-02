import { createContext, useContext, useLayoutEffect, useRef, type ElementType, type ReactNode } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(SplitText, CustomEase);
// A fast middle with a long, quiet landing, measured against the reference frames.
CustomEase.create('pageFlow', '0.4,0,0,1');
export { gsap };
export const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const SceneContext = createContext({ active: true, delay: 0 });

export function Reveal({ as: Tag = 'div', className, children, id }: { as?: ElementType; className?: string; children: ReactNode; id?: string }) {
  const element = useRef<HTMLElement>(null);
  const { active, delay } = useContext(SceneContext);
  useLayoutEffect(() => {
    const node = element.current;
    if (!node || !active || reducedMotion()) return;
    let observer: IntersectionObserver | undefined;
    const split = SplitText.create(node, {
      type: 'lines', mask: 'lines', linesClass: 'reveal-line', autoSplit: true,
      onSplit(self) {
        observer?.disconnect();
        const animation = gsap.fromTo(self.lines, { yPercent: 105 }, { yPercent: 0, duration: 1.15, stagger: 0.075, ease: 'power4.out', paused: true });
        observer = new IntersectionObserver(entries => {
          if (entries.some(entry => entry.isIntersecting)) {
            animation.delay(delay).play();
            observer?.disconnect();
          }
        }, { root: node.closest('.page-scroll'), threshold: 0.06 });
        observer.observe(node);
        return animation;
      },
    });
    return () => { observer?.disconnect(); split.revert(); };
  }, [active, delay]);
  // An incoming surface becomes visible before its reveal cue. Keep its
  // unsplit text hidden until the layout effect has prepared the line masks.
  return <Tag ref={element} className={className} id={id} data-reveal-pending={!active || undefined}>{children}</Tag>;
}
