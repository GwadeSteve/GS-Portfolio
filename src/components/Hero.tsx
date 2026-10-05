import { useEffect, useLayoutEffect, useRef, useState, type PointerEvent, type ReactNode } from 'react';
import arch from '../assets/media/arch.jpg';
import { ROLE_LINES } from '../content/ui';
import { cx, finePointer, reduceMotion } from '../lib/env';
import { useClock } from '../lib/hooks';
import { useI18n } from '../lib/i18n';
import { useReveal } from '../lib/reveal';
import { Html, Jump, Reveal, Sym } from './ui';

/** Rotates through short role lines, letter by letter, with an underline sized to the active line. */
function RollingLine() {
  const { lang } = useI18n();
  const lines = ROLE_LINES[lang];
  const [i, setI] = useState(0);
  const current = useRef(0);
  current.current = i;
  const [out, setOut] = useState(-1);
  const words = useRef<(HTMLSpanElement | null)[]>([]);
  const under = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    setI(0);
    setOut(-1);
  }, [lang]);

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => {
      if (document.hidden) return;
      setOut(current.current);
      setI((current.current + 1) % lines.length);
    }, 2800);
    return () => clearInterval(id);
  }, [lines.length]);

  useEffect(() => {
    if (out < 0) return;
    const id = setTimeout(() => setOut(-1), 700);
    return () => clearTimeout(id);
  }, [out]);

  useLayoutEffect(() => {
    const measure = () => {
      const w = words.current[i];
      if (!w || !under.current) return;
      let total = 0;
      w.querySelectorAll('span').forEach((s) => (total += s.getBoundingClientRect().width));
      under.current.style.width = Math.max(40, total * 0.5) + 'px';
    };
    measure();
    addEventListener('resize', measure);
    return () => removeEventListener('resize', measure);
  }, [i, lang]);

  return (
    <>
      <span className="roll" aria-live="polite">
        {lines.map((w, n) => (
          <span
            key={lang + n}
            ref={(el) => {
              words.current[n] = el;
            }}
            className={cx('w', n === i && 'on', n === out && 'out')}
            aria-hidden={n !== i}
          >
            {[...w].map((c, j) => (
              <span key={j} style={{ transitionDelay: j * 20 + 'ms' }}>
                {c === ' ' ? ' ' : c}
              </span>
            ))}
          </span>
        ))}
      </span>
      <span className="under" ref={under}></span>
    </>
  );
}

/** The arch portrait. Dark by default; on a mouse, a light follows the pointer over the photo. */
function Portrait() {
  const { t } = useI18n();
  const [ref, shown] = useReveal<HTMLDivElement>();
  const [spot, setSpot] = useState(false);
  const [seen, setSeen] = useState(false);

  const move = (e: PointerEvent<HTMLDivElement>) => {
    const f = e.currentTarget.getBoundingClientRect();
    ref.current?.style.setProperty('--sx', e.clientX - f.left + 'px');
    ref.current?.style.setProperty('--sy', e.clientY - f.top + 'px');
  };
  const leave = () => {
    setSpot(false);
    ref.current?.style.removeProperty('--sx');
    ref.current?.style.removeProperty('--sy');
  };

  return (
    <div className={cx('arch reveal', shown && 'in', spot && 'spot', seen && 'seen')} ref={ref}>
      <div className="ring" aria-hidden="true"></div>
      <div className="orb" aria-hidden="true"></div>
      <div
        className="frame"
        onPointerEnter={
          finePointer
            ? () => {
                setSpot(true);
                setSeen(true);
              }
            : undefined
        }
        onPointerMove={finePointer ? move : undefined}
        onPointerLeave={finePointer ? leave : undefined}
      >
        <img className="dim" src={arch} alt="" />
        <img className="lit" src={arch} alt="Steve Gwade, black and white portrait" />
        <span className="rim"></span>
        <span className="hint">
          <i></i>
          <span>{t('hero.hint')}</span>
        </span>
      </div>
    </div>
  );
}

function Fact({ icon, acc, label, value, note }: { icon: string; acc?: boolean; label: string; value: string; note: ReactNode }) {
  return (
    <div className="fact">
      <span className={cx('fi', acc && 'acc')}>
        <Sym id={icon} />
      </span>
      <span>
        <span className="l1">{label}</span>
        <b>{value}</b>
        <small>{note}</small>
      </span>
    </div>
  );
}

export function Hero() {
  const { t } = useI18n();
  const time = useClock();
  const glow = (e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', e.clientX - r.left + 'px');
    e.currentTarget.style.setProperty('--my', e.clientY - r.top + 'px');
  };

  return (
    <section className="hero wrap" id="top" onPointerMove={finePointer ? glow : undefined}>
      <div className="grid-bg" aria-hidden="true"></div>
      <div className="grid-lit" aria-hidden="true"></div>
      <div className="glow" aria-hidden="true"></div>
      <div className="intro">
        <Reveal as="span" className="status">
          <i></i>
          <Html html={t('hero.status')} />
        </Reveal>
        <Reveal as="h1" className="h1">
          <span>{t('hero.hi')}</span>
          <RollingLine />
        </Reveal>
        <Reveal as="p" className="sub" dangerouslySetInnerHTML={{ __html: t('hero.sub') }} />
        <Reveal className="ctas">
          <Jump className="btn acc" to="contact">
            <span>{t('cta.talk')}</span>
            <span className="bi">
              <Sym id="arrow" />
            </span>
          </Jump>
          <Jump className="btn ghost" to="work">
            <span>{t('cta.work')}</span>
            <span className="bi">
              <Sym id="down" />
            </span>
          </Jump>
        </Reveal>
      </div>
      <div className="stage">
        <Reveal className="facts l">
          <Fact icon="pin" label={t('f.loc')} value={t('f.locv')} note={<><span>{time}</span> <span>{t('f.time')}</span></>} />
          <Fact icon="cal" label={t('f.exp')} value={t('f.expv')} note={t('f.expd')} />
          <Fact icon="cap" label={t('f.edu')} value={t('f.eduv')} note={t('f.edud')} />
        </Reveal>
        <Portrait />
        <Reveal className="facts r">
          <Fact icon="bag" acc label={t('f.now')} value="Sawego Digital" note={t('f.nowd')} />
          <Fact icon="trophy" label={t('f.win')} value={t('f.winv')} note={t('f.wind')} />
          <Fact icon="code" label={t('f.stack')} value="Python, TypeScript" note="Kotlin, PostgreSQL" />
        </Reveal>
      </div>
    </section>
  );
}
