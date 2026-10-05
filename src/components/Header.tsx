import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { cx, scrollToId } from '../lib/env';
import { useScrollFrame } from '../lib/hooks';
import { useI18n } from '../lib/i18n';
import { useTheme } from '../lib/theme';
import { pad2 } from '../lib/format';
import { Jump, Sym } from './ui';
import type { Lang } from '../content/types';

export const SECTIONS = ['work', 'awards', 'journey', 'stack', 'writing', 'contact'] as const;

export function Header() {
  const { t, lang, setLang } = useI18n();
  const { toggle } = useTheme();
  const [active, setActive] = useState(-1);
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const prog = useRef<HTMLElement>(null);
  const pill = useRef<HTMLElement>(null);
  const links = useRef<(HTMLAnchorElement | null)[]>([]);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuBtn = useRef<HTMLButtonElement>(null);

  useScrollFrame(() => {
    const max = document.documentElement.scrollHeight - innerHeight;
    setScrolled(scrollY > 20);
    if (prog.current) prog.current.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    const mid = innerHeight * 0.4;
    let idx = -1;
    SECTIONS.forEach((id, i) => {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top < mid) idx = i;
    });
    setActive(idx);
  });

  useLayoutEffect(() => {
    const p = pill.current;
    const a = links.current[active];
    if (!p) return;
    if (!a) {
      p.style.opacity = '0';
      return;
    }
    p.style.width = a.offsetWidth + 'px';
    p.style.transform = `translateX(${a.offsetLeft}px)`;
    p.style.opacity = '1';
  }, [active, lang]);

  useEffect(() => {
    if (!menu) return;
    const outside = (e: PointerEvent) => {
      const n = e.target as Node;
      if (!menuRef.current?.contains(n) && !menuBtn.current?.contains(n)) setMenu(false);
    };
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setMenu(false);
    document.addEventListener('pointerdown', outside);
    document.addEventListener('keydown', esc);
    return () => {
      document.removeEventListener('pointerdown', outside);
      document.removeEventListener('keydown', esc);
    };
  }, [menu]);

  const close = () => setMenu(false);

  return (
    <header className={cx('head', scrolled && 'scrolled')} id="head">
      <div className="in wrap max">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Jump className="brand" to="top">
            <span className="mk">SG</span>
            <b>
              Steve
              <br />
              Gwade<i>.</i>
            </b>
          </Jump>
          <span className={cx('cursec', active > -1 && 'on')} aria-hidden="true">
            <i></i>
            <span>{active > -1 ? t('nav.' + SECTIONS[active]) : ''}</span>
          </span>
        </div>
        <nav className="nav" aria-label="Sections">
          <i className="pill" ref={pill}></i>
          {SECTIONS.map((id, i) => (
            <a
              key={id}
              ref={(el) => {
                links.current[i] = el;
              }}
              href={'#' + id}
              className={cx(i === active && 'on')}
              aria-current={i === active ? 'true' : undefined}
              onClick={(e) => {
                e.preventDefault();
                scrollToId(id);
              }}
            >
              {t('nav.' + id)}
            </a>
          ))}
        </nav>
        <div className="tools">
          <div className="lang" role="group" aria-label="Language">
            {(['en', 'fr'] as Lang[]).map((l) => (
              <button key={l} type="button" aria-pressed={lang === l} onClick={() => setLang(l)}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <button className="tbtn" type="button" aria-label={t('theme')} onClick={toggle}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <use className="sun" href="#i-sun" />
              <use className="moon" href="#i-moon" />
            </svg>
          </button>
          <Jump className="btn acc sm cta" to="contact">
            <span>{t('cta.talk')}</span>
            <span className="bi">
              <Sym id="arrow" />
            </span>
          </Jump>
          <button
            ref={menuBtn}
            className="tbtn mbtn"
            type="button"
            aria-expanded={menu}
            aria-controls="mmenu"
            aria-label={t('menu')}
            onClick={() => setMenu((m) => !m)}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <use href="#i-menu" />
            </svg>
          </button>
        </div>
      </div>
      <div className="mmenu" id="mmenu" ref={menuRef} hidden={!menu}>
        {SECTIONS.map((id, i) => (
          <Jump key={id} to={id} onJump={close}>
            <span>{t('nav.' + id)}</span>
            <span>{pad2(i + 1)}</span>
          </Jump>
        ))}
      </div>
      <i className="prog" ref={prog}></i>
    </header>
  );
}
