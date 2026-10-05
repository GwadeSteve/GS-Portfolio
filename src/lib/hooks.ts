import { useEffect, useRef, useState } from 'react';

const listeners = new Set<() => void>();
let queued = false;

function frame() {
  if (queued) return;
  queued = true;
  requestAnimationFrame(() => {
    queued = false;
    listeners.forEach((fn) => fn());
  });
}

/** Runs the callback once per animation frame while the page scrolls or resizes. */
export function useScrollFrame(fn: () => void) {
  const latest = useRef(fn);
  latest.current = fn;
  useEffect(() => {
    const run = () => latest.current();
    if (!listeners.size) {
      addEventListener('scroll', frame, { passive: true });
      addEventListener('resize', frame);
    }
    listeners.add(run);
    run();
    return () => {
      listeners.delete(run);
      if (!listeners.size) {
        removeEventListener('scroll', frame);
        removeEventListener('resize', frame);
      }
    };
  }, []);
}

function yaoundeTime() {
  try {
    return new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Africa/Douala' }).format(new Date());
  } catch {
    return '';
  }
}

/** Local time in Yaounde, refreshed every 20 seconds. */
export function useClock() {
  const [time, setTime] = useState(yaoundeTime);
  useEffect(() => {
    const id = setInterval(() => setTime(yaoundeTime()), 20000);
    return () => clearInterval(id);
  }, []);
  return time;
}

/** Keeps an element mounted while its closing transition plays. */
export function usePresence(open: boolean, exitMs = 450) {
  const [mounted, setMounted] = useState(open);
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (open) {
      setMounted(true);
      const id = requestAnimationFrame(() => requestAnimationFrame(() => setOn(true)));
      return () => cancelAnimationFrame(id);
    }
    setOn(false);
    const id = setTimeout(() => setMounted(false), exitMs);
    return () => clearTimeout(id);
  }, [open, exitMs]);
  return { mounted, on };
}

/** Adds a class for a moment, for copied and similar confirmations. */
export function useFlash(ms: number) {
  const [on, setOn] = useState(false);
  const t = useRef(0);
  useEffect(() => () => clearTimeout(t.current), []);
  return [
    on,
    () => {
      setOn(true);
      clearTimeout(t.current);
      t.current = window.setTimeout(() => setOn(false), ms);
    },
  ] as const;
}
