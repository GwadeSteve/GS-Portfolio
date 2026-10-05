import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { AWARD_BY, PROJECT_BY } from '../lib/data';
import { cx, finePointer, reduceMotion } from '../lib/env';
import { useI18n } from '../lib/i18n';
import { useOverlay } from '../lib/overlay';
import { Reveal, SectionHead, Sym } from './ui';

const ORDER = ['huawei', 'jcia1', 'msc', 'odc', 'jcia2'];
/** Bubble x, y and size on a 540 unit field. */
const POS = [
  [0, 120, 236],
  [180, 0, 150],
  [340, 110, 190],
  [250, 300, 180],
  [20, 380, 140],
];

const shortEvent = (ev: string) => ev.replace('Huawei ICT Competition', 'Huawei ICT').replace('Orange Digital Center', 'ODC');

export function Awards() {
  const { t, l, lang } = useI18n();
  const { openProject } = useOverlay();
  const [sel, setSel] = useState(0);
  const [shown, setShown] = useState(0);
  const [out, setOut] = useState(false);
  const hoverT = useRef(0);

  useEffect(() => {
    if (sel === shown) return;
    if (reduceMotion) {
      setShown(sel);
      return;
    }
    setOut(true);
    const id = setTimeout(() => {
      setShown(sel);
      setOut(false);
    }, 200);
    return () => clearTimeout(id);
  }, [sel, shown]);

  useEffect(() => () => clearTimeout(hoverT.current), []);

  const a = AWARD_BY[ORDER[shown]];

  return (
    <section className="sec wrap max" id="awards">
      <SectionHead kicker={t('aw.k')} title={t('aw.h')} lede={t(finePointer ? 'aw.p' : 'aw.pt')} />
      <Reveal className="awx has">
        <div className="awx-field" role="group">
          {ORDER.map((k, i) => {
            const aw = AWARD_BY[k];
            const [x, y, s] = POS[i];
            return (
              <button
                key={k}
                className={cx('bub', aw.cls)}
                type="button"
                aria-pressed={sel === i}
                style={{ '--x': x / 5.4, '--y': y / 5.4, '--s': s / 5.4, animationDelay: `-${i * 1.4}s` } as CSSProperties}
                onClick={() => setSel(i)}
                onFocus={() => setSel(i)}
                onPointerOver={
                  finePointer
                    ? () => {
                        clearTimeout(hoverT.current);
                        hoverT.current = window.setTimeout(() => setSel(i), 90);
                      }
                    : undefined
                }
              >
                <div>
                  <b>{l(aw.rk)}</b>
                  <span>
                    {l(aw.bl)}
                    <br />
                    {shortEvent(aw.ev)}
                  </span>
                </div>
              </button>
            );
          })}
          <div className="bub deco" aria-hidden="true" style={{ '--x': 81.5, '--y': 71.3, '--s': 18.5, animationDelay: '-3s' } as CSSProperties}>
            <div>
              <b>179</b>
              <span>{lang === 'fr' ? 'équipes' : 'teams'}</span>
            </div>
          </div>
        </div>
        <div className={cx('awx-panel', out && 'out')} aria-live="polite">
          <div className="dots">
            {ORDER.map((k, i) => (
              <i key={k} className={cx(i === sel && 'on')}></i>
            ))}
          </div>
          <div className="swap">
            <div className="meta">
              <span className={cx('badge', a.cls === 'acc' && 'hot')}>{a.ev}</span>
              <span className="badge">{l(a.date)}</span>
            </div>
            <span className="rk">{l(a.rk)}</span>
            <h3>{l(a.t)}</h3>
            <p>{l(a.d)}</p>
            <span className="mono" style={{ display: 'block', marginTop: 14 }}>
              {l(a.tr)}
            </span>
          </div>
          <div className="bot swap">
            <div className="nums">
              {a.st.map((x, i) => (
                <div key={i}>
                  <b>{l(x[0])}</b>
                  <span>{l(x[1])}</span>
                </div>
              ))}
            </div>
            {a.proj && (
              <button className="btn ghost sm" type="button" onClick={() => openProject(a.proj!)}>
                <span>{t('aw.see', { p: PROJECT_BY[a.proj].t })}</span>
                <span className="bi">
                  <Sym id="arrow" />
                </span>
              </button>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
