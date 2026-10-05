import { useEffect, useRef, useState } from 'react';
import { reduceMotion } from './env';

/*
 * One shared observer reveals elements slightly before they enter the viewport.
 * A scroll sweep catches anything a fast jump skipped over, and elements already
 * on screen at load get a short stagger.
 */
const pending = new Map<Element, () => void>();
let io: IntersectionObserver | null = null;
let stagger = 0;
let staggerReset = 0;
let sweepQueued = false;

function show(el: Element) {
  const cb = pending.get(el);
  if (!cb) return;
  pending.delete(el);
  io?.unobserve(el);
  cb();
}

function sweep() {
  if (sweepQueued) return;
  sweepQueued = true;
  requestAnimationFrame(() => {
    sweepQueued = false;
    for (const el of [...pending.keys()]) if (el.getBoundingClientRect().top < innerHeight) show(el);
  });
}

function ensureObserver() {
  if (io) return;
  io = new IntersectionObserver(
    (entries) => entries.forEach((e) => (e.isIntersecting || e.boundingClientRect.top < 0) && show(e.target)),
    { rootMargin: '0px 0px 12% 0px', threshold: 0 },
  );
  addEventListener('scroll', sweep, { passive: true });
  setTimeout(sweep, 700);
}

function watch(el: HTMLElement, cb: () => void) {
  if (reduceMotion || typeof IntersectionObserver === 'undefined') {
    cb();
    return () => {};
  }
  ensureObserver();
  if (el.getBoundingClientRect().top < innerHeight) {
    el.style.transitionDelay = Math.min(stagger++ * 60, 240) + 'ms';
    clearTimeout(staggerReset);
    staggerReset = window.setTimeout(() => (stagger = 0), 800);
    setTimeout(() => (el.style.transitionDelay = ''), 800);
  }
  pending.set(el, cb);
  io!.observe(el);
  return () => {
    pending.delete(el);
    io?.unobserve(el);
  };
}

/** Returns a ref and whether the element has been revealed. Pair with the `reveal` class. */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    return watch(ref.current, () => setShown(true));
  }, []);
  return [ref, shown] as const;
}
