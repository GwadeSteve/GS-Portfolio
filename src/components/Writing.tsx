import { Fragment } from 'react';
import { ESSAYS, type PostEntry } from '../lib/data';
import { pad2, postDate } from '../lib/format';
import { useI18n } from '../lib/i18n';
import { useOverlay } from '../lib/overlay';
import { Cover } from './covers';
import { Reveal, SectionHead, Sym } from './ui';

const TAGS_FR: Record<string, string> = { AI: 'IA', Research: 'Recherche', Search: 'Moteurs de recherche', Systems: 'Systèmes' };

export function useTagLabel() {
  const { lang } = useI18n();
  return (tag: string) => (lang === 'fr' ? (TAGS_FR[tag] ?? tag) : tag);
}

/** Tags, date, reading time, and a sample marker while essays are placeholders. */
export function PostMeta({ p }: { p: PostEntry }) {
  const { t, lang } = useI18n();
  const tag = useTagLabel();
  return (
    <span className="wr-meta">
      {p.tags.map((x, i) => (
        <Fragment key={x}>
          {i > 0 && <i></i>}
          <span className="tg">{tag(x)}</span>
        </Fragment>
      ))}
      <i></i>
      <span>{postDate(p.date, lang)}</span>
      <i></i>
      <span>
        {p.min} {t('wr.min')}
      </span>
      {lang === 'fr' && (
        <>
          <i></i>
          <span>EN</span>
        </>
      )}
      <span className="smp">{t('wr.sample')}</span>
    </span>
  );
}

function ReadLabel() {
  const { t } = useI18n();
  return (
    <span className="wr-go">
      {t('wr.read')}{' '}
      <i>
        <Sym id="right" />
      </i>
    </span>
  );
}

export function Writing() {
  const { t } = useI18n();
  const { openPost } = useOverlay();
  const tag = useTagLabel();
  const feat = ESSAYS.find((p) => p.feat) ?? ESSAYS[0];
  const rest = ESSAYS.filter((p) => p !== feat);

  return (
    <section className="sec wrap max" id="writing">
      <SectionHead kicker={t('wr.k')} title={t('wr.h')} lede={t('wr.p')} />
      <Reveal>
        <button className="wr-feat" type="button" onClick={() => openPost(feat.k)}>
          <span className="cv">
            <Cover kind={feat.cover} />
          </span>
          <span className="tx">
            <PostMeta p={feat} />
            <h3>{feat.t}</h3>
            <p>{feat.dek}</p>
            <ReadLabel />
          </span>
        </button>
      </Reveal>
      <Reveal className="wr-grid">
        {rest.slice(0, 3).map((p) => (
          <button key={p.k} className="wr-card" type="button" onClick={() => openPost(p.k)}>
            <span className="cv">
              <Cover kind={p.cover} />
            </span>
            <span className="tx">
              <PostMeta p={p} />
              <h4>{p.t}</h4>
              <p>{p.dek}</p>
              <ReadLabel />
            </span>
          </button>
        ))}
      </Reveal>
      {rest.length > 3 && (
        <Reveal className="wr-list">
          <span className="mono">{t('wr.more')}</span>
          {rest.slice(3).map((p, n) => (
            <button key={p.k} className="wr-row" type="button" onClick={() => openPost(p.k)}>
              <span className="n">{pad2(n + 5)}</span>
              <span className="t">
                <b>{p.t}</b>
                <span>{p.dek}</span>
              </span>
              <span className="m">
                {p.tags.map(tag).join(' · ')}
                <i></i>
                {p.min} {t('wr.min')}
              </span>
              <span className="ar">
                <Sym id="right" />
              </span>
            </button>
          ))}
        </Reveal>
      )}
    </section>
  );
}
