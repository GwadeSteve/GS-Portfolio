import type { PointerEvent } from 'react';
import { FEATURED, MORE } from '../lib/data';
import { cx, finePointer } from '../lib/env';
import { useI18n } from '../lib/i18n';
import { useOverlay } from '../lib/overlay';
import { Diagram, SectionHead, Sym } from './ui';

function glow(e: PointerEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', e.clientX - r.left + 'px');
  e.currentTarget.style.setProperty('--my', e.clientY - r.top + 'px');
}

export function Work() {
  const { t, l } = useI18n();
  const { openProject } = useOverlay();

  return (
    <section className="sec wrap max" id="work">
      <SectionHead kicker={t('work.k')} title={t('work.h')} lede={t('work.p')} />
      <div className="bento">
        {FEATURED.map((p) => (
          <button
            key={p.k}
            className={cx('bt', 's-' + p.k, p.k === 'nexus' && 'big', 'reveal in')}
            type="button"
            aria-label={p.t}
            onClick={() => openProject(p.k)}
            onPointerMove={finePointer ? glow : undefined}
          >
            <Diagram k={p.ill ?? p.k} />
            <div className="top">
              <span className={cx('badge', p.hot && 'hot')}>{l(p.badge)}</span>
              <span className="yr">{p.yr ?? ''}</span>
            </div>
            <div className="info">
              <div>
                <h3>{p.t}</h3>
                <p>{l(p.d)}</p>
              </div>
              <span className="go">
                <Sym id="right" />
              </span>
            </div>
          </button>
        ))}
      </div>
      <div className="more-h">
        <h3>{t('more.h')}</h3>
        <span className="mono">{t('more.n', { n: MORE.length })}</span>
      </div>
      <div className="more-grid">
        {MORE.map((p) => (
          <button key={p.k} className="mc reveal in" type="button" onClick={() => openProject(p.k)}>
            <Diagram k={p.ill ?? p.k} />
            <span className="mc-b">
              <span className="l1">
                <b>{p.t}</b>
                <span className={cx('badge', p.hot && 'hot')}>{l(p.badge)}</span>
              </span>
              <span className="d">{l(p.d)}</span>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
