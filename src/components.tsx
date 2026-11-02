import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { gsap, reducedMotion } from './motion';
import { profile } from './content';
import { RouteLink } from './navigation';

export function Arrow({ direction = 'diagonal', className = '' }: { direction?: 'left' | 'right' | 'diagonal'; className?: string }) {
  return <svg className={`arrow arrow--${direction} ${className}`} width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14" stroke="currentColor" strokeWidth="1.2" /></svg>;
}

export function Wordmark({ className = '' }: { className?: string }) {
  return <img className={`wordmark ${className}`} src="/twa-wordmark.svg" width="150" height="83" alt="Twa" />;
}

export function ImageSlot({ src, label, tone = 'sand', className = '', eager = false }: { src?: string; label: string; tone?: string; className?: string; eager?: boolean }) {
  return <div className={`image-slot image-slot--${tone} ${className}`}>
    {src ? <img src={src} alt={label} loading={eager ? 'eager' : 'lazy'} decoding="async" /> : <span className="sr-only">{label} — image to be added</span>}
  </div>;
}

function Clock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 10000);
    return () => window.clearInterval(timer);
  }, []);
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone: profile.timeZone, hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(now);
  const hours = parts.find(p => p.type === 'hour')?.value ?? '00';
  const minutes = parts.find(p => p.type === 'minute')?.value ?? '00';
  return <div className="header-clock">
    <div className="clock-copy"><span>Local time</span><time dateTime={now.toISOString()} aria-label={`${hours}:${minutes}, Lagos local time`}>{hours}<span className="clock-separator">:</span>{minutes}</time></div>
  </div>;
}

export function Header({ menuOpen, onMenu, onContact }: { menuOpen: boolean; onMenu: () => void; onContact: () => void }) {
  return <header className="site-header">
    <RouteLink href="/" className="identity" aria-label="Ogundiji Tiwalope — home"><span>{profile.firstLine}</span><span>{profile.secondLine}</span></RouteLink>
    <RouteLink href="/" className="header-wordmark" aria-label="Twa — home"><Wordmark /></RouteLink>
    <nav className="header-navigation" aria-label="Main navigation">
      <button className="text-control roll-link" onClick={onMenu} aria-expanded={menuOpen} aria-controls="site-menu"><span>Menu</span><span aria-hidden="true">Menu</span></button>
      <button className="text-control roll-link" onClick={onContact} aria-haspopup="dialog"><span>Contact</span><span aria-hidden="true">Contact</span></button>
    </nav>
    <Clock />
  </header>;
}

export function Dialog({ open, onClose, label, id, className, children }: { open: boolean; onClose: () => void; label: string; id: string; className: string; children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  useLayoutEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const duration = reducedMotion() ? 0 : 1.15;
    let animation: gsap.core.Timeline;
    if (open) {
      if (!dialog.open) dialog.showModal();
      dialog.scrollTop = 0;
      if (reducedMotion()) { gsap.set(dialog, { y: 0, '--shade': 1 }); gsap.set(dialog.querySelectorAll('[data-contact-reveal]'), { yPercent: 0 }); return; }
      animation = gsap.timeline();
      animation.fromTo(dialog, { y: window.innerHeight + 100, '--shade': 0 }, { y: 0, '--shade': 1, duration, ease: 'power3.out' }, 0);
      animation.fromTo(dialog.querySelectorAll('[data-contact-reveal]'), { yPercent: 110 }, { yPercent: 0, duration: duration * 0.8, stagger: 0.07, ease: 'power4.out' }, duration * 0.4);
      const fields = dialog.querySelectorAll('fieldset, .contact-fields label, .contact-submit');
      if (fields.length) animation.fromTo(fields, { y: 35, opacity: 0 }, { y: 0, opacity: 1, duration: duration * 0.7, stagger: 0.06, ease: 'power3.out' }, duration * 0.6);
    } else if (dialog.open) {
      if (reducedMotion()) { dialog.close(); return; }
      animation = gsap.timeline({ onComplete: () => dialog.close() });
      animation.to(dialog, { y: window.innerHeight + 100, '--shade': 0, duration: duration * 0.8, ease: 'power3.inOut' });
    } else return;
    return () => { animation.kill(); };
  }, [open]);
  return <dialog ref={ref} id={id} className={className} aria-label={label} onCancel={event => { event.preventDefault(); onClose(); }} onClose={onClose} onClick={event => { if (event.target === event.currentTarget) onClose(); }}>{children}</dialog>;
}
