import { useEffect, useRef } from 'react';
import { ROLES } from '../content/roles';
import { PROJECTS } from '../content/projects';
import { PROJECT_BY } from '../lib/data';
import { cx } from '../lib/env';
import { duration, period } from '../lib/format';
import { usePresence } from '../lib/hooks';
import { pick, useI18n } from '../lib/i18n';
import { useOverlay, type Layer } from '../lib/overlay';
import { BrandIcon, Chip, Diagram, Sym } from './ui';
import type { Project, Role } from '../content/types';
import { MEDIA } from './media';

function ProjectDetail({ p }: { p: Project }) {
  const { t, l } = useI18n();
  return (
    <>
      <div className="dt-media">
        <Diagram k={p.ill ?? p.k} />
      </div>
      <div className="dt-body">
        <div className="dt-top">
          <span className={cx('badge', p.hot && 'hot')}>{l(p.badge)}</span>
          {p.yr && <span className="badge">{p.yr}</span>}
        </div>
        <div>
          <h3 id="dtTitle">
            {p.t}
            <i>.</i>
          </h3>
          <p className="tag">{l(p.d)}</p>
        </div>
        {p.stats.length > 0 && (
          <section className="dt-impact">
            <span className="dt-k">{t('dt.impact')}</span>
            <div className="dt-stats" data-n={p.stats.length}>
              {p.stats.map((s, i) => (
                <div key={i}>
                  <b>{l(s[0])}</b>
                  <span>{l(s[1])}</span>
                </div>
              ))}
            </div>
          </section>
        )}
        <div className="dt-story">
          <div>
            <span className="dt-k">{t('dt.pb')}</span>
            <p>{l(p.pb)}</p>
          </div>
          <div>
            <span className="dt-k">{t('dt.sum')}</span>
            <p className="sum">{l(p.sum)}</p>
          </div>
        </div>
        {p.links.length ? (
          <div className="dt-links">
            {p.links.map(([label, url], i) => {
              const text = l(label);
              const github = url.includes('github.com/GwadeSteve/') && text.includes('GitHub');
              return (
                <a key={url} className={cx('btn', i === 0 ? 'acc' : 'ghost', 'sm')} href={url} target="_blank" rel="noopener">
                  <span>
                    {github && <BrandIcon name="github" />} {text}
                  </span>
                  <span className="bi">
                    <Sym id="arrow" />
                  </span>
                </a>
              );
            })}
          </div>
        ) : (
          <div className="dt-private">
            <Sym id="lock" />
            {l(p.priv)}
          </div>
        )}
        <dl className="dt-facts">
          <div>
            <dt>{t('dt.role')}</dt>
            <dd>{l(p.role)}</dd>
          </div>
          <div>
            <dt>{t('dt.where')}</dt>
            <dd>{l(p.where)}</dd>
          </div>
          <div className="w">
            <dt>{t('dt.built')}</dt>
            <dd>
              {p.stack.map((s, i) => (
                <Chip key={i} tool={s} />
              ))}
            </dd>
          </div>
        </dl>
        {p.img && (
          <figure className="dt-shot">
            <img src={MEDIA[p.img]} alt={p.t} loading="lazy" />
            <figcaption>{t('dt.shot')}</figcaption>
          </figure>
        )}
      </div>
    </>
  );
}

function RoleDetail({ r }: { r: Role }) {
  const { t, l, lang } = useI18n();
  const { openProject } = useOverlay();
  const dur = duration(r, lang);
  return (
    <>
      <div className="dt-hero">
        <span className="mono">{l(r.type)}</span>
        <h3 id="dtTitle" style={{ fontSize: 'clamp(1.9rem,4.4vw,2.8rem)', lineHeight: 1, letterSpacing: '-.045em' }}>
          {l(r.role)}
        </h3>
        <p style={{ color: 'var(--fg2)', fontSize: '1.05rem' }}>
          {r.co}
          {r.sub && ', ' + l(r.sub)}
        </p>
        <div className="dt-period">
          <span className="badge hot">{period(r, lang, t('present'))}</span>
          {dur && <span className="badge">{dur}</span>}
          <span className="badge">{l(r.place)}</span>
        </div>
      </div>
      <div className="dt-body">
        <p className="sum">{l(r.sum)}</p>
        <ul className="dt-list">
          {pick(r.pts, lang).map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {r.stack.map((s) => (
            <Chip key={s} tool={s} />
          ))}
        </div>
        {r.projects.length > 0 && (
          <div style={{ display: 'grid', gap: 10 }}>
            <span className="mono">{t('dt.rel')}</span>
            <div className="dt-rel">
              {r.projects.map((k) => {
                const p = PROJECT_BY[k];
                return (
                  <button key={k} type="button" onClick={() => openProject(k)}>
                    <i>
                      <Diagram k={p.ill ?? p.k} />
                    </i>
                    {p.t}
                    <Sym id="arrow" className="ic" />
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

/** Side drawer for project and role details, with previous and next for projects. */
export function Drawer() {
  const { t } = useI18n();
  const { layer, closeLayer, openProject } = useOverlay();
  const { mounted, on } = usePresence(layer !== null);
  const shown = useRef<Layer>(null);
  const scroll = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  if (layer) shown.current = layer;
  const cur = shown.current;

  const step = (d: number) => {
    if (layer?.kind !== 'project') return;
    const i = PROJECTS.findIndex((p) => p.k === layer.k);
    openProject(PROJECTS[(i + d + PROJECTS.length) % PROJECTS.length].k);
  };

  useEffect(() => {
    if (!layer) return;
    if (!lastFocus.current) lastFocus.current = document.activeElement as HTMLElement;
    document.body.style.overflow = 'hidden';
    const id = setTimeout(() => closeBtn.current?.focus({ preventScroll: true }), 60);
    return () => clearTimeout(id);
  }, [layer]);

  useEffect(() => {
    if (layer) return;
    document.body.style.overflow = '';
    lastFocus.current?.focus({ preventScroll: true });
    lastFocus.current = null;
  }, [layer]);

  useEffect(() => {
    scroll.current?.scrollTo(0, 0);
  }, [layer?.k]);

  useEffect(() => {
    if (!layer) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLayer();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    document.addEventListener('keydown', key);
    return () => document.removeEventListener('keydown', key);
  });

  if (!mounted || !cur) return null;
  const project = cur.kind === 'project' ? PROJECT_BY[cur.k] : null;
  const role = cur.kind === 'role' ? ROLES.find((r) => r.k === cur.k) : null;
  const i = project ? PROJECTS.indexOf(project) : -1;
  const prev = PROJECTS[(i - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(i + 1) % PROJECTS.length];

  return (
    <>
      <div className={cx('scrim', on && 'on')} onClick={closeLayer}></div>
      <aside className={cx('drawer', on && 'on')} role="dialog" aria-modal="true" aria-labelledby="dtTitle">
        <button ref={closeBtn} className="lx" type="button" aria-label={t('close')} onClick={closeLayer}>
          <Sym id="x" />
        </button>
        <div className="scroll" ref={scroll}>
          {project && <ProjectDetail p={project} />}
          {role && <RoleDetail r={role} />}
        </div>
        {project && (
          <div className="dt-foot">
            <button type="button" onClick={() => step(-1)}>
              <i>
                <Sym id="left" />
              </i>
              <span>
                <small>{t('dt.prev')}</small>
                <b>{prev.t}</b>
              </span>
            </button>
            <button type="button" onClick={() => step(1)}>
              <span>
                <small>{t('dt.next')}</small>
                <b>{next.t}</b>
              </span>
              <i>
                <Sym id="right" />
              </i>
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
