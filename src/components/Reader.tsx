import { useEffect, useRef, useState, type ReactNode } from 'react';
import arch from '../assets/media/arch.jpg';
import { DIAGRAMS, POST_FIGURES } from '../content/diagrams';
import { ESSAYS, ESSAY_BY, type PostEntry } from '../lib/data';
import { cx, scrollBehavior } from '../lib/env';
import { pad2, postDate } from '../lib/format';
import { useFlash, usePresence } from '../lib/hooks';
import { useI18n } from '../lib/i18n';
import { copyText, useOverlay } from '../lib/overlay';
import { Cover } from './covers';
import { MEDIA } from './media';
import { Html, Sym } from './ui';
import { PostMeta } from './Writing';
import type { Block } from '../content/types';

function Body({ blocks }: { blocks: Block[] }) {
  const { t } = useI18n();
  let n = 0;
  return (
    <div className="rd-body">
      {blocks.map((b, i): ReactNode => {
        switch (b[0]) {
          case 'p':
            return <Html as="p" key={i} html={b[1]} />;
          case 'h2':
            n++;
            return (
              <h2 key={i} id={'rd-h' + i}>
                <span className="n">{pad2(n)}</span>
                <Html html={b[1]} />
              </h2>
            );
          case 'ul':
          case 'ol': {
            const List = b[0];
            return (
              <List key={i}>
                {b[1].map((x, j) => (
                  <Html as="li" key={j} html={x} />
                ))}
              </List>
            );
          }
          case 'quote':
            return <Html as="blockquote" key={i} html={b[1]} />;
          case 'tldr':
            return (
              <div className="tldr" key={i}>
                <b>{t('wr.tldr')}</b>
                <Html as="p" html={b[1]} />
              </div>
            );
          case 'math':
            return (
              <div className="math" key={i}>
                <Html as="div" className="eq" html={b[1]} />
                <Html as="small" html={b[2]} />
              </div>
            );
          case 'code':
            return (
              <pre key={i}>
                <Html as="code" html={b[1]} />
              </pre>
            );
          case 'fig':
            return (
              <figure key={i}>
                <div className="fig">
                  <div className="diag" dangerouslySetInnerHTML={{ __html: POST_FIGURES[b[1]] ?? DIAGRAMS[b[1]] ?? '' }} />
                </div>
                <figcaption>{b[2]}</figcaption>
              </figure>
            );
          case 'img':
            return (
              <figure key={i}>
                <img src={MEDIA[b[1]]} alt={b[2]} loading="lazy" />
                <figcaption>{b[2]}</figcaption>
              </figure>
            );
          case 'table':
            return (
              <figure key={i}>
                <div className="tbl">
                  <table>
                    <thead>
                      <tr>
                        {b[1].map((h) => (
                          <th key={h}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {b[2].map((r, j) => (
                        <tr key={j} className={r[4] ? 'win' : undefined}>
                          {r.slice(0, 4).map((c, k) => (
                            <Html as="td" key={k} html={String(c)} />
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <figcaption>{b[3]}</figcaption>
              </figure>
            );
          case 'take':
            return (
              <div className="take" key={i}>
                <b>{t('wr.take')}</b>
                <ul>
                  {b[1].map((x, j) => (
                    <Html as="li" key={j} html={x} />
                  ))}
                </ul>
              </div>
            );
          case 'refs':
            return (
              <div className="refs" key={i}>
                <b>{t('wr.refs')}</b>
                <ol>
                  {b[1].map(([text, url]) => (
                    <li key={url + text}>
                      <a href={url} target="_blank" rel="noopener">
                        {text}
                        <Sym id="arrow" />
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            );
        }
      })}
    </div>
  );
}

function StepCard({ p, dir }: { p: PostEntry; dir: 'prev' | 'next' }) {
  const { t } = useI18n();
  const { openPost } = useOverlay();
  const arrow = (
    <span className="ar">
      <Sym id={dir === 'prev' ? 'left' : 'right'} />
    </span>
  );
  return (
    <button className={cx('rd-pn', dir)} type="button" onClick={() => openPost(p.k)}>
      {dir === 'prev' && arrow}
      <span className="tx">
        <small>{t(dir === 'prev' ? 'wr.prev' : 'wr.nextp')}</small>
        <b>{p.t}</b>
        <span className="d">
          {p.min} {t('wr.min')}
        </span>
      </span>
      {dir === 'next' && arrow}
    </button>
  );
}

/** Full screen essay reader with contents, progress and previous and next essays. */
export function Reader() {
  const { t, lang } = useI18n();
  const { post, closePost, say } = useOverlay();
  const { mounted, on } = usePresence(post !== null);
  const [linked, flashLinked] = useFlash(1600);
  const [scrolled, setScrolled] = useState(false);
  const [current, setCurrent] = useState<string | null>(null);
  const [tocOpen, setTocOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const prog = useRef<HTMLElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const shown = useRef<string | null>(null);
  if (post) shown.current = post;
  const p = shown.current ? ESSAY_BY[shown.current] : null;

  const onScroll = () => {
    const el = root.current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    if (prog.current) prog.current.style.transform = `scaleX(${max > 0 ? el.scrollTop / max : 0})`;
    setScrolled(el.scrollTop > 220);
    let cur: string | null = null;
    el.querySelectorAll('.rd-body h2').forEach((h) => {
      if (h.getBoundingClientRect().top < 170) cur = h.id;
    });
    setCurrent(cur);
  };

  useEffect(() => {
    if (!post) return;
    if (!lastFocus.current) lastFocus.current = document.activeElement as HTMLElement;
    document.body.style.overflow = 'hidden';
    root.current?.scrollTo(0, 0);
    setTocOpen(false);
    onScroll();
    const id = setTimeout(() => root.current?.focus({ preventScroll: true }), 80);
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && closePost();
    document.addEventListener('keydown', esc);
    return () => {
      clearTimeout(id);
      document.removeEventListener('keydown', esc);
    };
  }, [post, closePost]);

  useEffect(() => {
    if (post) return;
    document.body.style.overflow = '';
    lastFocus.current?.focus({ preventScroll: true });
    lastFocus.current = null;
  }, [post]);

  if (!mounted || !p) return null;

  const i = ESSAYS.indexOf(p);
  const prev = ESSAYS[(i - 1 + ESSAYS.length) % ESSAYS.length];
  const next = ESSAYS[(i + 1) % ESSAYS.length];
  const heads = p.blocks.flatMap((b, j) => (b[0] === 'h2' ? [{ id: 'rd-h' + j, text: b[1] }] : []));

  const jump = (id: string) => {
    const target = document.getElementById(id);
    if (target) root.current?.scrollTo({ top: target.offsetTop - 84, behavior: scrollBehavior });
    setTocOpen(false);
  };
  const toc = heads.map((h, n) => (
    <a
      key={h.id}
      href={'#' + h.id}
      className={cx(current === h.id && 'on')}
      onClick={(e) => {
        e.preventDefault();
        jump(h.id);
      }}
    >
      <span>{pad2(n + 1)}</span>
      <Html html={h.text} />
    </a>
  ));
  const copyLink = () => {
    const url = location.href.split('#')[0] + '#post-' + p.k;
    copyText(
      url,
      () => {
        say(t('wr.linked'));
        flashLinked();
      },
      () => say(url),
    );
  };

  return (
    <div
      className={cx('rd', on && 'on', scrolled && 'scrolled')}
      role="dialog"
      aria-modal="true"
      aria-labelledby="rdTitle"
      tabIndex={-1}
      ref={root}
      onScroll={onScroll}
    >
      <div className="rd-bar">
        <button className="rd-ic" type="button" aria-label={t('wr.back')} onClick={closePost}>
          <Sym id="left" />
        </button>
        <span className="mono rd-lab">{t('wr.k')}</span>
        <span className="rd-t">{p.t}</span>
        <button className={cx('rd-ic', linked && 'done')} type="button" aria-label={t('wr.link')} onClick={copyLink}>
          <Sym id="link" />
        </button>
        <i className="rd-prog" ref={prog}></i>
      </div>
      <div key={p.k + lang}>
        <div className="rd-wrap">
          <nav className="rd-toc" aria-label={t('wr.contents')}>
            <span className="mono">{t('wr.contents')}</span>
            {toc}
          </nav>
          <article className="rd-art">
            <header className="rd-head">
              <PostMeta p={p} />
              <h1 id="rdTitle">{p.t}</h1>
              <p className="dek">{p.dek}</p>
              <div className="rd-by">
                <img src={arch} alt="" />
                <span>
                  <b>{t('wr.by')}</b>
                  <span>
                    {postDate(p.date, lang)} &middot; {p.min} {t('wr.min')}
                  </span>
                </span>
              </div>
            </header>
            <div className="rd-cv">
              <Cover kind={p.cover} />
            </div>
            <details className="rd-mtoc" open={tocOpen} onToggle={(e) => setTocOpen(e.currentTarget.open)}>
              <summary>
                {t('wr.contents')} <span>{t('wr.secs', { n: heads.length })}</span>
                <Sym id="down" />
              </summary>
              <nav>{toc}</nav>
            </details>
            <Body blocks={p.blocks} />
            <nav className="rd-end" aria-label={t('wr.more')}>
              <StepCard p={prev} dir="prev" />
              <StepCard p={next} dir="next" />
            </nav>
          </article>
          <span className="rd-side"></span>
        </div>
        <footer className="rd-ft">
          <div className="max ft-card">
            <div className="grid-bg" aria-hidden="true"></div>
            <div className="ft-l">
              <button className="mk" type="button" aria-label="Steve Gwade" onClick={closePost}>
                SG
              </button>
              <span className="mono">&copy; 2026 Steve Gwade</span>
            </div>
            <button className="btn ghost sm" type="button" onClick={() => root.current?.scrollTo({ top: 0, behavior: scrollBehavior })}>
              <span>{t('ft.top')}</span>
              <span className="bi">
                <Sym id="up" />
              </span>
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
