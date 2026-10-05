import { useEffect, useRef, useState } from 'react';
import { COMPOSER, EMAIL } from '../content/contact';
import { cx, reduceMotion } from '../lib/env';
import { useClock, useFlash } from '../lib/hooks';
import { useI18n } from '../lib/i18n';
import { copyText, useOverlay } from '../lib/overlay';
import { BrandIcon, Html, Reveal, SplitHeading, Sym } from './ui';
import type { Lang } from '../content/types';

type Pick = { about: string; area: string };

function draft(pick: Pick, lang: Lang, mark: (s: string) => string) {
  const phrase = (q: keyof Pick) => {
    const o = COMPOSER[q].find((x) => x[0] === pick[q])!;
    return typeof o[2] === 'string' ? o[2] : o[2][lang];
  };
  if (pick.about === 'hi') {
    const proj = mark(pick.area === 'ai' ? 'LINA' : pick.area === 'mobile' ? 'Nexus' : 'VERO');
    return lang === 'fr'
      ? `Bonjour Steve, je suis tombé sur votre portfolio et je voulais simplement vous saluer. Bravo pour ${proj}.`
      : `Hi Steve, I came across your portfolio and wanted to say hi. Great work on ${proj}.`;
  }
  return lang === 'fr'
    ? `Bonjour Steve, je vous contacte pour ${mark(phrase('about'))}, plutôt côté ${mark(phrase('area'))}. Seriez-vous disponible pour un court appel cette semaine ?`
    : `Hi Steve, I’m reaching out about ${mark(phrase('about'))}, mostly around ${mark(phrase('area'))}. Would you have time for a short call this week?`;
}

const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

/** Drafts a short email from two choices, typed out like someone is writing it. */
function Composer() {
  const { t, l, lang } = useI18n();
  const { say } = useOverlay();
  const [pick, setPick] = useState<Pick>({ about: 'role', area: 'back' });
  const [typed, setTyped] = useState<number | null>(null);
  const [copied, flashCopied] = useFlash(1800);
  const animate = useRef(false);

  const plain = draft(pick, lang, (s) => s);
  const marked = draft(pick, lang, (s) => '<mark>' + escape(s) + '</mark>');
  const subject = encodeURIComponent(lang === 'fr' ? 'Bonjour depuis votre portfolio' : 'Hello from your portfolio');
  const body = encodeURIComponent(plain);

  useEffect(() => {
    if (!animate.current || reduceMotion) {
      setTyped(null);
      return;
    }
    let i = 0;
    setTyped(0);
    const id = setInterval(() => {
      i += 3;
      if (i >= plain.length) {
        clearInterval(id);
        setTyped(-1);
        return;
      }
      setTyped(i);
    }, 16);
    return () => clearInterval(id);
  }, [plain]);

  const preview =
    typed === null ? marked : typed === -1 ? marked + '<span class="caret"></span>' : escape(plain.slice(0, typed)) + '<span class="caret"></span>';

  const choose = (q: keyof Pick, v: string) => {
    animate.current = true;
    setPick((p) => ({ ...p, [q]: v }));
  };

  return (
    <div className="cmp">
      <div className="bar">
        <span>{t('ct.to')}</span> <b>Steve Gwade</b>
      </div>
      <div className="body">
        {(['about', 'area'] as const).map((q) => (
          <div className="q" key={q}>
            <span className="mono">{t(q === 'about' ? 'ct.about' : 'ct.area')}</span>
            <div className="opts">
              {COMPOSER[q].map((o) => (
                <button key={o[0]} type="button" aria-pressed={pick[q] === o[0]} onClick={() => choose(q, o[0])}>
                  {l(o[1])}
                </button>
              ))}
            </div>
          </div>
        ))}
        <Html as="div" className="preview" aria-live="polite" html={preview} />
        <div className="acts">
          <span className="alt">
            <span>{t('ct.or')}</span>{' '}
            <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(EMAIL)}&su=${subject}&body=${body}`} target="_blank" rel="noopener">
              {t('ct.gmail')}
            </a>{' '}
            <i>&middot;</i>{' '}
            <button
              type="button"
              id="cmpCopy"
              className={cx(copied && 'done')}
              onClick={() => copyText(plain + '\n\n' + EMAIL, flashCopied, () => say(EMAIL))}
            >
              <span className="a">{t('ct.copy')}</span>
              <span className="b">{t('ct.copied')}</span>
            </button>
          </span>
          <a className="btn acc sm" href={`mailto:${EMAIL}?subject=${subject}&body=${body}`}>
            <span>{t('ct.send')}</span>
            <span className="bi">
              <Sym id="arrow" />
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

const LINKS = [
  { href: 'https://github.com/GwadeSteve', brand: 'github', title: 'GitHub', note: '@GwadeSteve' },
  { href: 'https://www.linkedin.com/in/gwadesteve', brand: 'linkedin', title: 'LinkedIn', note: 'in/gwadesteve' },
  { href: '/resume/GwadeSteve_AIEngineer.pdf', sym: 'doc', title: 'ct.cv', note: 'ct.cvd', translate: true, download: 'Steve_Gwade_CV.pdf' },
  { href: 'https://wa.me/237683647400', sym: 'wa', title: 'WhatsApp', note: '+237 683 647 400' },
];

export function Contact() {
  const { t } = useI18n();
  const { say } = useOverlay();
  const time = useClock();
  const [copied, flashCopied] = useFlash(2000);

  return (
    <section className="sec wrap max" id="contact">
      <Reveal className="oc">
        <div className="ct">
          <div className="ct-l">
            <span className="mono kicker" style={{ margin: 0 }}>
              {t('ct.k')}
            </span>
            <SplitHeading className="ct-h" html={t('ct.h')} />
            <p>{t('ct.p')}</p>
            <button
              className={cx('mailrow', copied && 'done')}
              type="button"
              aria-live="polite"
              onClick={() =>
                copyText(
                  EMAIL,
                  () => {
                    say(t('mail.copied'));
                    flashCopied();
                  },
                  () => say(EMAIL),
                )
              }
            >
              <span className="mt">
                <span className="a">{EMAIL}</span>
                <span className="b">{t('mail.done')}</span>
              </span>
              <i>
                <Sym id="copy" className="cp" />
                <svg className="ck" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m3.5 8.5 3 3 6-7" />
                </svg>
              </i>
            </button>
            <div className="local">
              <span className="status" style={{ padding: '6px 12px 6px 8px' }}>
                <i></i>
                <span>{t('ct.now')}</span>
              </span>
              <span>
                Yaounde <b>{time}</b>
              </span>
            </div>
          </div>
          <Composer />
        </div>
        <div className="oc-links">
          {LINKS.map((x) => (
            <a key={x.href} className="oc-link" href={x.href} download={x.download}>
              {x.brand ? <BrandIcon name={x.brand} /> : <Sym id={x.sym!} className="ic" />}
              <span>
                <b>{x.translate ? t(x.title) : x.title}</b>
                <small>{x.translate ? t(x.note) : x.note}</small>
              </span>
              <span className="ar">
                <Sym id="arrow" />
              </span>
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
