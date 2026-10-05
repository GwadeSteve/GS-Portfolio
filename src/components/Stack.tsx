import { useEffect, useLayoutEffect, useMemo, useRef, useState, type PointerEvent } from 'react';
import { GROUPS, STACK_PROJECTS } from '../content/stack';
import { PROJECTS } from '../content/projects';
import { PROJECT_BY, TOOLS, TOOL_NAMES } from '../lib/data';
import { cx, finePointer, reduceMotion } from '../lib/env';
import { useI18n } from '../lib/i18n';
import { useOverlay } from '../lib/overlay';
import { BrandIcon, Html, Reveal, SectionHead } from './ui';

type Vec = [number, number, number];
type Sel = { type: 'g' | 'p'; k: string };
type Caption = { kind: 'idle' } | { kind: 'g' | 'p'; k: string } | { kind: 'tool'; i: number };

const GOLD = Math.PI * (3 - Math.sqrt(5));
/** Tools spread evenly over a unit sphere. */
const POINTS: Vec[] = TOOLS.map((_, i) => {
  const y = 1 - ((i + 0.5) / TOOLS.length) * 2;
  const r = Math.sqrt(1 - y * y);
  return [Math.cos(i * GOLD) * r, y, Math.sin(i * GOLD) * r];
});

/** Six meridians and five parallels for the wireframe. */
const WIRE: Vec[][] = [];
for (let m = 0; m < 6; m++) {
  const ph = (m * Math.PI) / 6;
  const line: Vec[] = [];
  for (let s = 0; s <= 64; s++) {
    const a = (s / 64) * Math.PI * 2;
    line.push([Math.sin(a) * Math.cos(ph), Math.cos(a), Math.sin(a) * Math.sin(ph)]);
  }
  WIRE.push(line);
}
for (const y of [-0.7, -0.38, 0, 0.38, 0.7]) {
  const r = Math.sqrt(1 - y * y);
  const line: Vec[] = [];
  for (let s = 0; s <= 64; s++) {
    const a = (s / 64) * Math.PI * 2;
    line.push([r * Math.cos(a), y, r * Math.sin(a)]);
  }
  WIRE.push(line);
}

const wrapAngle = (d: number) => Math.atan2(Math.sin(d), Math.cos(d));
const clampPitch = (p: number) => Math.max(-1.15, Math.min(1.15, p));
const dist = (a: Vec, b: Vec) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);

function keysFor(sel: Sel | null): string[] | null {
  if (!sel) return null;
  if (sel.type === 'g') return GROUPS.find((g) => g.k === sel.k)!.items.map((t) => t[0]);
  return PROJECT_BY[sel.k].stack.filter((k): k is string => typeof k === 'string' && k in TOOL_NAMES);
}

/** Minimum spanning tree over the selected tools, so the links read as one network. */
function spanningLinks(idx: number[]) {
  const links: [number, number][] = [];
  const tree = [idx[0]];
  const rest = idx.slice(1);
  while (rest.length) {
    let best: [number, number, number] | null = null;
    for (const a of tree) for (const b of rest) {
      const d = dist(POINTS[a], POINTS[b]);
      if (!best || d < best[2]) best = [a, b, d];
    }
    links.push([best![0], best![1]]);
    tree.push(best![1]);
    rest.splice(rest.indexOf(best![1]), 1);
  }
  return links;
}

function stars(W: number, H: number) {
  let seed = 7;
  const rnd = () => ((seed = (seed * 9301 + 49297) % 233280), seed / 233280);
  const out: string[] = [];
  for (let k = 0; k < 90; k++) {
    const x = Math.round(rnd() * W);
    const y = Math.round(rnd() * H);
    const o = Math.round(10 + rnd() * 40);
    const sz = rnd() > 0.9 ? 1 : 0;
    out.push(`${x}px ${y}px 0 ${sz}px color-mix(in srgb,var(--fg) ${o}%,transparent)`);
  }
  return out.join(',');
}

export function Stack() {
  const { t, l } = useI18n();
  const { openProject } = useOverlay();
  const [mode, setMode] = useState<'g' | 'p'>('g');
  const [lock, setLock] = useState<Sel | null>(null);
  const [preview, setPreview] = useState<Sel | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [spun, setSpun] = useState(false);
  const [dragging, setDragging] = useState(false);
  const sel = preview ?? lock;
  const keys = useMemo(() => keysFor(sel), [sel]);
  const links = useMemo(() => {
    if (!keys) return [];
    return spanningLinks(TOOLS.map((tl, i) => (keys.includes(tl.k) ? i : -1)).filter((i) => i > -1));
  }, [keys]);

  const stage = useRef<HTMLDivElement>(null);
  const starsEl = useRef<HTMLElement>(null);
  const nodes = useRef<(HTMLSpanElement | null)[]>([]);
  const front = useRef<SVGPathElement>(null);
  const back = useRef<SVGPathElement>(null);
  const shade = useRef<SVGCircleElement>(null);
  const rim = useRef<SVGCircleElement>(null);
  const lineGroup = useRef<SVGGElement>(null);
  const tabs = useRef<HTMLDivElement>(null);
  const pill = useRef<HTMLElement>(null);

  const gx = useRef({
    yaw: 0.6,
    pitch: -0.3,
    vy: 0.0026,
    vp: 0,
    target: null as [number, number] | null,
    drag: null as { x: number; y: number } | null,
    act: null as string[] | null,
    hover: null as number | null,
    links: [] as [number, number][],
    visible: false,
    raf: 0,
    dims: [0, 0],
  });
  const kick = useRef(() => {});

  // Animation loop: runs only while the globe is on screen and the tab is visible.
  useEffect(() => {
    const G = gx.current;
    const el = stage.current!;
    const f = 2.8;

    const frame = () => {
      const W = el.clientWidth;
      const H = el.clientHeight;
      const cx = W / 2;
      const cy = H / 2;
      const R0 = Math.min(W, H) * (W < 560 ? 0.33 : 0.34);
      if (W !== G.dims[0] || H !== G.dims[1]) {
        G.dims = [W, H];
        if (starsEl.current) starsEl.current.style.boxShadow = stars(W, H);
        for (const c of [shade.current, rim.current]) {
          c?.setAttribute('cx', String(cx));
          c?.setAttribute('cy', String(cy));
          c?.setAttribute('r', (R0 * 1.07).toFixed(1));
        }
      }
      if (!G.drag) {
        if (G.target) {
          G.yaw += wrapAngle(G.target[0] - G.yaw) * 0.075;
          G.pitch += (G.target[1] - G.pitch) * 0.075;
        } else {
          G.yaw += G.vy;
          G.pitch = clampPitch(G.pitch + G.vp);
          const cruise = reduceMotion || G.act || G.hover !== null ? 0 : 0.0026;
          G.vy += (cruise - G.vy) * (G.hover !== null ? 0.12 : 0.03);
          G.vp *= 0.92;
        }
      }
      const cY = Math.cos(G.yaw);
      const sY = Math.sin(G.yaw);
      const cP = Math.cos(G.pitch);
      const sP = Math.sin(G.pitch);
      const project = (p: Vec) => {
        const x1 = p[0] * cY + p[2] * sY;
        const z1 = -p[0] * sY + p[2] * cY;
        const y = p[1] * cP - z1 * sP;
        const z = p[1] * sP + z1 * cP;
        const s = f / (f - z);
        return [cx + x1 * R0 * s, cy + y * R0 * s, z, s];
      };

      const pts = POINTS.map(project);
      pts.forEach((q, i) => {
        const node = nodes.current[i];
        if (!node) return;
        const d = (q[2] + 1) / 2;
        const hit = !!G.act && G.act.includes(TOOLS[i].k);
        const op = G.act ? (hit ? 0.6 + 0.4 * d : 0.05 + 0.12 * d) : 0.25 + 0.75 * d;
        node.style.transform = `translate3d(${q[0].toFixed(1)}px,${q[1].toFixed(1)}px,0) scale(${(q[3] * (W < 560 ? 0.74 : 0.7)).toFixed(3)})`;
        node.style.opacity = op.toFixed(3);
        node.style.zIndex = String(Math.round(d * 100) + (hit ? 100 : 0));
        node.style.filter = !hit && d < 0.42 ? `blur(${((0.42 - d) * 5).toFixed(2)}px)` : 'none';
      });

      let fr = '';
      let bk = '';
      for (const line of WIRE) {
        let prev: boolean | null = null;
        for (const p of line) {
          const q = project(p);
          const isFront = q[2] >= 0;
          const seg = (prev === isFront ? 'L' : 'M') + q[0].toFixed(1) + ' ' + q[1].toFixed(1);
          if (isFront) fr += seg;
          else bk += seg;
          prev = isFront;
        }
      }
      front.current?.setAttribute('d', fr);
      back.current?.setAttribute('d', bk);

      const lines = lineGroup.current?.children;
      G.links.forEach(([a, b], k) => {
        const e = lines?.[k] as SVGLineElement | undefined;
        if (!e) return;
        const A = pts[a];
        const B = pts[b];
        e.setAttribute('x1', A[0].toFixed(1));
        e.setAttribute('y1', A[1].toFixed(1));
        e.setAttribute('x2', B[0].toFixed(1));
        e.setAttribute('y2', B[1].toFixed(1));
        e.style.strokeOpacity = (0.25 + (0.7 * ((A[2] + B[2]) / 2 + 1)) / 2).toFixed(2);
      });
    };

    const loop = () => {
      G.raf = 0;
      frame();
      if (G.visible && !document.hidden) G.raf = requestAnimationFrame(loop);
    };
    kick.current = () => {
      if (!G.raf && G.visible) G.raf = requestAnimationFrame(loop);
    };

    const io = new IntersectionObserver(([e]) => {
      G.visible = e.isIntersecting;
      kick.current();
    });
    io.observe(el);
    const vis = () => kick.current();
    document.addEventListener('visibilitychange', vis);
    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', vis);
      cancelAnimationFrame(G.raf);
      G.raf = 0;
    };
  }, []);

  useEffect(() => {
    const G = gx.current;
    G.act = keys;
    G.links = links;
    if (keys) {
      let x = 0;
      let y = 0;
      let z = 0;
      TOOLS.forEach((tl, i) => {
        if (!keys.includes(tl.k)) return;
        x += POINTS[i][0];
        y += POINTS[i][1];
        z += POINTS[i][2];
      });
      G.target = [Math.atan2(-x, z), clampPitch(Math.atan2(y, Math.hypot(x, z)))];
    } else G.target = null;
    kick.current();
  }, [keys, links]);

  useEffect(() => {
    gx.current.hover = hover;
    kick.current();
  }, [hover]);

  useLayoutEffect(() => {
    const place = () => {
      const b = tabs.current?.querySelector<HTMLButtonElement>('button[aria-pressed="true"]');
      if (!b || !pill.current) return;
      pill.current.style.width = b.offsetWidth + 'px';
      pill.current.style.transform = `translateX(${b.offsetLeft}px)`;
    };
    place();
    addEventListener('resize', place);
    return () => removeEventListener('resize', place);
  }, [mode, l]);

  // The caption fades out, swaps, then fades back in.
  const want: Caption = hover !== null ? { kind: 'tool', i: hover } : sel ? { kind: sel.type, k: sel.k } : { kind: 'idle' };
  const wantKey = JSON.stringify(want);
  const [cap, setCap] = useState<Caption>(want);
  const [capOut, setCapOut] = useState(false);
  useEffect(() => {
    if (JSON.stringify(cap) === wantKey) return;
    setCapOut(true);
    const id = setTimeout(
      () => {
        setCap(JSON.parse(wantKey));
        setCapOut(false);
      },
      reduceMotion ? 0 : 140,
    );
    return () => clearTimeout(id);
  }, [wantKey, cap]);

  const caption = () => {
    if (cap.kind === 'idle') return <Html html={t('st.idle')} />;
    if (cap.kind === 'g') {
      const g = GROUPS.find((x) => x.k === cap.k)!;
      return (
        <>
          <b>{l(g.n)}</b>
          {l(g.v)}
        </>
      );
    }
    if (cap.kind === 'p') {
      const p = PROJECT_BY[cap.k];
      return (
        <>
          <b>{p.t}</b>
          {l(p.d)}{' '}
          <button className="gx-open" type="button" onClick={() => openProject(p.k)}>
            {t('st.open')} {'→'}
          </button>
        </>
      );
    }
    if (cap.kind !== 'tool') return null;
    const tool = TOOLS[cap.i];
    const used = PROJECTS.filter((p) => p.stack.includes(tool.k)).map((p) => p.t);
    const areas = GROUPS.filter((g) => g.items.some((x) => x[0] === tool.k)).map((g) => l(g.n));
    return (
      <>
        <b>{tool.n}</b>
        {used.length ? t('st.used') + ' ' + used.join(', ') : areas.join(', ')}
      </>
    );
  };

  const choose = (s: Sel) => {
    const next = lock && lock.type === s.type && lock.k === s.k ? null : s;
    setLock(next);
    if (!finePointer) setPreview(null);
  };

  const down = (e: PointerEvent<HTMLDivElement>) => {
    const G = gx.current;
    G.drag = { x: e.clientX, y: e.clientY };
    G.target = null;
    setSpun(true);
    setDragging(true);
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Capture is a nicety; dragging still works without it.
    }
    kick.current();
  };
  const move = (e: PointerEvent<HTMLDivElement>) => {
    const G = gx.current;
    if (!G.drag) return;
    const dx = e.clientX - G.drag.x;
    const dy = e.clientY - G.drag.y;
    G.drag = { x: e.clientX, y: e.clientY };
    G.yaw += dx * 0.008;
    G.pitch = clampPitch(G.pitch - dy * 0.008);
    G.vy = dx * 0.008;
    G.vp = -dy * 0.008;
  };
  const up = () => {
    if (!gx.current.drag) return;
    gx.current.drag = null;
    setDragging(false);
  };

  const rowItems: Sel[] = mode === 'g' ? [...GROUPS].reverse().map((g) => ({ type: 'g', k: g.k })) : STACK_PROJECTS.map((k) => ({ type: 'p', k }));

  return (
    <section className="sec wrap max" id="stack">
      <SectionHead kicker={t('st.k')} title={t('st.h')} lede={t('st.hint')} />
      <div className={cx('gx', keys && 'act', hover !== null && 'hovering', spun && 'spun')}>
        <Reveal
          className="gx-dock"
          onPointerLeave={finePointer ? () => setPreview(null) : undefined}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node)) setPreview(null);
          }}
        >
          <div className="gx-tabs" ref={tabs} role="group">
            <i className="pill" ref={pill}></i>
            {(['g', 'p'] as const).map((m) => (
              <button
                key={m}
                type="button"
                aria-pressed={mode === m}
                onClick={() => {
                  if (m === mode) return;
                  setMode(m);
                  setLock(null);
                  setPreview(null);
                }}
              >
                {t(m === 'g' ? 'st.groups' : 'st.projects')}
              </button>
            ))}
          </div>
          <div className="gx-row" role="group">
            {rowItems.map((s) => {
              const name = s.type === 'g' ? l(GROUPS.find((g) => g.k === s.k)!.n) : PROJECT_BY[s.k].t;
              const count = keysFor(s)!.length;
              return (
                <button
                  key={s.type + s.k}
                  type="button"
                  aria-pressed={!!sel && sel.type === s.type && sel.k === s.k}
                  onPointerOver={finePointer ? () => setPreview(s) : undefined}
                  onFocus={() => setPreview(s)}
                  onClick={() => choose(s)}
                >
                  {name}
                  <small>{count}</small>
                </button>
              );
            })}
          </div>
        </Reveal>
        <div className={cx('gx-cap', capOut && 'out')} aria-live="polite">
          {caption()}
        </div>
        <Reveal
          className={cx('gx-stage', dragging && 'dragging')}
          aria-label="Globe of tools"
          ref={stage}
          onPointerDown={down}
          onPointerMove={move}
          onPointerUp={up}
          onPointerCancel={up}
          onLostPointerCapture={up}
        >
          <i className="gx-stars" ref={starsEl} aria-hidden="true"></i>
          <svg className="gx-wire" aria-hidden="true">
            <defs>
              <radialGradient id="gxShade" cx="34%" cy="28%" r="78%">
                <stop offset="0" style={{ stopColor: 'var(--acc)', stopOpacity: 0.07 }} />
                <stop offset=".5" style={{ stopColor: 'var(--acc)', stopOpacity: 0.015 }} />
                <stop offset="1" style={{ stopColor: 'var(--acc)', stopOpacity: 0 }} />
              </radialGradient>
              <linearGradient id="gxRim" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" style={{ stopColor: 'var(--acc)', stopOpacity: 0.75 }} />
                <stop offset=".5" style={{ stopColor: 'var(--acc)', stopOpacity: 0.04 }} />
                <stop offset="1" style={{ stopColor: 'var(--acc)', stopOpacity: 0.3 }} />
              </linearGradient>
            </defs>
            <circle ref={shade} fill="url(#gxShade)" />
            <path className="bk" ref={back} />
            <path className="fr" ref={front} />
            <circle ref={rim} fill="none" stroke="url(#gxRim)" strokeWidth="1.5" />
            <g id="gwL" ref={lineGroup}>
              {links.map(([a, b]) => (
                <line key={a + '-' + b} />
              ))}
            </g>
          </svg>
          <div
            className="gx-nodes"
            aria-hidden="true"
            onPointerOver={
              finePointer
                ? (e) => {
                    const n = (e.target as Element).closest<HTMLElement>('.gn');
                    if (n && !gx.current.drag) setHover(Number(n.dataset.i));
                  }
                : undefined
            }
            onPointerOut={
              finePointer
                ? (e) => {
                    const n = (e.target as Element).closest('.gn');
                    if (n && !(e.relatedTarget && n.contains(e.relatedTarget as Node))) setHover(null);
                  }
                : undefined
            }
            onClick={
              finePointer
                ? undefined
                : (e) => {
                    const n = (e.target as Element).closest<HTMLElement>('.gn');
                    if (!n) return;
                    const i = Number(n.dataset.i);
                    setHover((h) => (h === i ? null : i));
                  }
            }
          >
            {TOOLS.map((tool, i) => (
              <span
                key={tool.k}
                ref={(el) => {
                  nodes.current[i] = el;
                }}
                className={cx('gn', !!keys && keys.includes(tool.k) && 'hit', hover === i && 'hov')}
                data-i={i}
              >
                <BrandIcon name={tool.k} />
                <em>{tool.n}</em>
              </span>
            ))}
          </div>
          <span className="gx-drag mono">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
              <path d="M5 8H1.5M3 6.5 1.5 8 3 9.5M11 8h3.5M13 6.5 14.5 8 13 9.5" />
            </svg>
            <span>{t('st.drag')}</span>
          </span>
        </Reveal>
      </div>
    </section>
  );
}
