import { useContext, useEffect, useRef, useState } from 'react';
import { Arrow } from './components';
import { SceneContext } from './motion';
import { RouteLink } from './navigation';
import './research.css';

const paper = '/research/001/anecdote-research.pdf';
const words = ['CONTEXT', 'LANGUAGE', 'CARE', 'SIGNAL', 'RESEARCH', 'TRUST', 'PATTERN', 'MEANING', 'HUMAN', 'LOCAL', 'TEXT', 'LISTEN', 'VISION', 'QUESTION', 'NOTICE', 'UNDERSTAND'];
const clamp = (n: number, min = 0, max = 1) => Math.max(min, Math.min(max, n));

function WordField({ paused, reduced }: { paused: boolean; reduced: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const elapsed = useRef(0);
  const { active } = useContext(SceneContext);
  useEffect(() => {
    const node = canvas.current;
    const context = node?.getContext('2d');
    if (!node || !context) return;
    const ctx = context;
    const host = node.parentElement!;
    const scrollArea = host.closest<HTMLElement>('.page-scroll');
    const pointer = { x: -1000, y: -1000, clientX: -1000, clientY: -1000, inside: false };
    let width = 0, height = 0, frame = 0, previous = 0, phase = elapsed.current;
    let fade = 1;
    let points: { x: number; y: number; word: string; shade: number }[] = [];
    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      ctx.font = `600 ${width < 650 ? 8 : 10}px "Courier New", monospace`;
      ctx.textBaseline = 'middle';
      for (const point of points) {
        const nx = point.x / width, ny = point.y / height;
        const wave = Math.sin(ny * 10 + time * 0.23) * Math.cos(nx * 6 - time * 0.12);
        const x = point.x + Math.sin(ny * 11 + time * 0.28) * 20 + wave * 12;
        const y = point.y + Math.sin(nx * 9 - time * 0.2) * 16;
        const body = 1 - Math.pow((nx - 0.65) / 0.65, 2) - Math.pow((ny - 0.5) / 0.85, 2);
        const texture = Math.sin(nx * 13 + Math.cos(ny * 8 + time * 0.1)) * 0.3 + Math.cos(ny * 19 - nx * 7 + time * 0.13) * 0.2;
        const ink = clamp((body * 0.7 + texture - 0.04) * (0.65 + point.shade * 0.75) * 1.25, 0, 0.92);
        const base = ink * 0.24 * (0.4 + 0.6 * clamp(nx));
        const dx = x + point.word.length * (width < 650 ? 2.4 : 3) - pointer.x;
        const dy = y - pointer.y;
        const spotlight = active && pointer.inside ? Math.exp(-(dx * dx + dy * dy) / (2 * 125 * 125)) : 0;
        const opacity = base + (0.9 - base) * spotlight;
        if (opacity < 0.012) continue;
        ctx.fillStyle = `rgba(24, 28, 25, ${opacity})`;
        ctx.fillText(point.word, x, y);
      }
    };
    const updateFade = () => {
      const rect = host.getBoundingClientRect();
      const viewportTop = scrollArea?.getBoundingClientRect().top ?? 0;
      const progress = clamp((viewportTop - rect.top) / Math.max(1, height * 0.8));
      fade = 1 - progress * progress * (3 - 2 * progress);
      node.style.opacity = String(fade);
      pointer.x = pointer.clientX - rect.left; pointer.y = pointer.clientY - rect.top;
    };
    const resize = () => {
      width = host.clientWidth; height = host.clientHeight;
      if (!width || !height) return;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      node.width = Math.round(width * ratio); node.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      points = [];
      const small = width < 650, gap = small ? 48 : 62, line = small ? 11 : 14;
      for (let row = -2; row < height / line + 2; row++) {
        for (let col = -2; col < width / gap + 2; col++) {
          const seed = Math.abs(Math.sin(row * 127.1 + col * 311.7) * 43758.5453) % 1;
          points.push({ x: col * gap + (row % 2) * 8, y: row * line, word: words[Math.floor(seed * words.length)], shade: 0.35 + seed * 0.65 });
        }
      }
      updateFade(); draw(phase);
    };
    const shouldAnimate = () => active && !paused && !reduced && !document.hidden && fade > 0;
    const tick = (time: number) => {
      if (time - previous >= 1000 / 30) {
        phase += Math.min((time - previous) / 1000, 0.05); elapsed.current = phase; previous = time;
        draw(phase);
      }
      frame = shouldAnimate() ? requestAnimationFrame(tick) : 0;
    };
    const sync = () => {
      if (shouldAnimate()) {
        if (!frame) { previous = performance.now(); frame = requestAnimationFrame(tick); }
      } else { cancelAnimationFrame(frame); frame = 0; }
      draw(phase);
    };
    const move = (event: PointerEvent) => {
      if (!active || event.pointerType === 'touch') return;
      const rect = host.getBoundingClientRect();
      pointer.clientX = event.clientX; pointer.clientY = event.clientY;
      pointer.x = event.clientX - rect.left; pointer.y = event.clientY - rect.top;
      pointer.inside = true; draw(phase);
    };
    const leave = () => { pointer.inside = false; draw(phase); };
    const scroll = () => { updateFade(); sync(); };
    const visibility = () => { if (document.hidden) pointer.inside = false; sync(); };
    const observer = new ResizeObserver(resize); observer.observe(host); resize(); sync();
    host.addEventListener('pointermove', move); host.addEventListener('pointerleave', leave);
    scrollArea?.addEventListener('scroll', scroll, { passive: true });
    window.addEventListener('blur', leave);
    document.addEventListener('visibilitychange', visibility);
    return () => {
      cancelAnimationFrame(frame); observer.disconnect();
      host.removeEventListener('pointermove', move); host.removeEventListener('pointerleave', leave);
      scrollArea?.removeEventListener('scroll', scroll);
      window.removeEventListener('blur', leave);
      document.removeEventListener('visibilitychange', visibility);
    };
  }, [active, paused, reduced]);
  return <canvas ref={canvas} className="research-word-field" aria-hidden="true" />;
}

export function Research() {
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const change = () => setReduced(query.matches);
    query.addEventListener('change', change);
    return () => query.removeEventListener('change', change);
  }, []);
  return <main tabIndex={-1} className="research-page">
    <div className="research-content">
      <section className="research-hero" aria-labelledby="research-title">
        <WordField paused={paused} reduced={reduced} />
        <div className="research-topline micro"><RouteLink href="/research" className="research-back"><Arrow direction="left" /> All research / 001</RouteLink><button type="button" onClick={() => setPaused(value => !value)} aria-pressed={paused || reduced} disabled={reduced}>{reduced ? 'Reduced motion' : paused ? 'Resume background' : 'Pause background'}</button></div>
        <div className="research-hero-title"><span className="micro">Language. Context. Safeguarding.</span><h1 id="research-title">Anecdote<span aria-hidden="true">.</span></h1><p>A study of local, multimodal detection of child grooming indicators in short conversational text.</p></div>
        <div className="research-hero-bottom"><a href="#research-paper" className="micro">Explore the paper <Arrow direction="right" /></a><span className="micro">Ogundiji Tiwalope Testimony<br />Research paper / 8 pages</span></div>
      </section>
      <section className="research-paper" id="research-paper" aria-labelledby="research-paper-title">
        <span className="micro">001 / The paper</span>
        <div className="research-paper-body"><h2 id="research-paper-title">Development of a Lightweight Interpretable Model for Early Stage Detection of Child Grooming Indicators in Short Conversational Text</h2>
          <p>Anecdote brings local language reasoning, explicit image screening and optical character recognition into a shared safeguarding pipeline. The research examines contextual risk in short messages, session risk tracking and the tradeoffs between detection quality, privacy and inference cost.</p>
          <p>The paper reports a preliminary evaluation using 30 text cases and 16 image cases. It discusses threshold calibration alongside the limits of the small evaluation sets and the need for stronger independent testing and faster inference.</p>
          <dl className="research-facts"><div><dt>Author</dt><dd>Ogundiji Tiwalope Testimony</dd></div><div><dt>Area</dt><dd>Applied AI / Digital safeguarding</dd></div><div><dt>Document</dt><dd>Research paper / PDF / 8 pages</dd></div></dl>
          <a className="research-download" href={paper} download="Anecdote_Research.pdf"><span>Download the paper<small>PDF / 425 KB</small></span><Arrow /></a>
          <a className="research-read" href={paper} target="_blank" rel="noopener noreferrer">Read the PDF in your browser <Arrow /></a>
        </div>
      </section>
    </div>
  </main>;
}
