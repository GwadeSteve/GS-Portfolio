import { useEffect, useRef, useState } from 'react';
import { ROLES } from '../content/roles';
import { TOOL_NAMES } from '../lib/data';
import { cx, reduceMotion } from '../lib/env';
import { duration, period } from '../lib/format';
import { useScrollFrame } from '../lib/hooks';
import { useI18n } from '../lib/i18n';
import { useOverlay } from '../lib/overlay';
import { BrandIcon, Reveal, SectionHead, Sym } from './ui';

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

/** Year shown as rolling digits. */
function YearRoller({ year }: { year: number }) {
  return (
    <div className="num">
      {[...String(year)].map((d, i) => (
        <span className="dg" key={i}>
          <span style={{ transform: `translateY(${-Number(d) * 10}%)` }}>
            {DIGITS.map((x) => (
              <i key={x}>{x}</i>
            ))}
          </span>
        </span>
      ))}
    </div>
  );
}

export function Journey() {
  const { t, l, lang } = useI18n();
  const { openRole } = useOverlay();
  const [idx, setIdx] = useState(0);
  const [label, setLabel] = useState(0);
  const [swap, setSwap] = useState(false);
  const list = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLElement>(null);
  const items = useRef<(HTMLButtonElement | null)[]>([]);

  useScrollFrame(() => {
    const mid = innerHeight * 0.5;
    let best = 0;
    items.current.forEach((it, j) => {
      if (it && it.getBoundingClientRect().top < mid) best = j;
    });
    setIdx(best);
    const box = list.current?.getBoundingClientRect();
    if (box && fill.current) fill.current.style.transform = `scaleY(${Math.min(1, Math.max(0, (mid - box.top) / box.height))})`;
  });

  // The text beside the year fades out, changes, then fades back in.
  useEffect(() => {
    if (idx === label) return;
    if (reduceMotion) {
      setLabel(idx);
      return;
    }
    setSwap(true);
    const id = setTimeout(() => {
      setLabel(idx);
      setSwap(false);
    }, 200);
    return () => clearTimeout(id);
  }, [idx, label]);

  const r = ROLES[label];
  const dur = duration(r, lang);

  return (
    <section className="sec wrap max" id="journey">
      <SectionHead kicker={t('jy.k')} title={t('jy.h')} lede={t('jy.p')} />
      <div className="jy">
        <Reveal as="aside" className={cx('jy-side', swap && 'swap')} aria-hidden="true">
          <span className="mono lab">{t('jy.year')}</span>
          <YearRoller year={ROLES[idx].from[0]} />
          <div className="txt">
            <div className="co">{r.short ?? r.co}</div>
            <div className="ro">{l(r.role)}</div>
            <div className="pe">{period(r, lang, t('present')) + (dur ? ' · ' + dur : '')}</div>
          </div>
          <div className="steps">
            {ROLES.map((x, j) => (
              <i key={x.k} className={cx(j <= idx && 'on')}></i>
            ))}
          </div>
        </Reveal>
        <div className="jy-list" ref={list}>
          <i className="rail"></i>
          <i className="fill" ref={fill}></i>
          {ROLES.map((role, i) => {
            const d = duration(role, lang);
            return (
              <button
                key={role.k}
                ref={(el) => {
                  items.current[i] = el;
                }}
                className={cx('jc', !role.to && 'live', i <= idx && 'on')}
                type="button"
                onClick={() => openRole(role.k)}
              >
                <span className="l1">
                  <span className="mo">{role.mo}</span>
                  <span>
                    <h3>{l(role.role)}</h3>
                    <div className="co">
                      {role.short ?? role.co}
                      {role.sub && ' · ' + l(role.sub)}
                    </div>
                  </span>
                  <span className="pe">
                    <b>{period(role, lang, t('present'))}</b>
                    {d || l(role.type)}
                  </span>
                </span>
                <p>{l(role.sum)}</p>
                <span className="l3">
                  <span className="stk">
                    {role.stack.slice(0, 5).map((s) => (
                      <span key={s} title={TOOL_NAMES[s] ?? s}>
                        <BrandIcon name={s} />
                      </span>
                    ))}
                  </span>
                  <span className="more">
                    {t('jy.view')} <Sym id="right" />
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
