import { createElement, useMemo, type ElementType, type HTMLAttributes, type MouseEvent, type ReactNode, type Ref } from 'react';
import { DIAGRAMS } from '../content/diagrams';
import { ICONS } from '../content/icons';
import { TOOL_NAMES } from '../lib/data';
import { cx, scrollToId } from '../lib/env';
import { useI18n } from '../lib/i18n';
import { useReveal } from '../lib/reveal';
import type { Loc } from '../content/types';

type HtmlProps = { as?: ElementType; html: string } & HTMLAttributes<HTMLElement>;

/** Renders authored copy that carries inline markup such as <b> or <em>. */
export function Html({ as = 'span', html, ...rest }: HtmlProps) {
  return createElement(as, { ...rest, dangerouslySetInnerHTML: { __html: html } });
}

/** An icon from the sprite in index.html. */
export function Sym({ id, className }: { id: string; className?: string }) {
  return (
    <svg className={className} aria-hidden="true">
      <use href={'#i-' + id} />
    </svg>
  );
}

export function BrandIcon({ name }: { name: string }) {
  if (!ICONS[name]) return null;
  return (
    <svg className="ic" viewBox="0 0 24 24" aria-hidden="true">
      <path d={ICONS[name]} />
    </svg>
  );
}

export function Diagram({ k, className }: { k: string; className?: string }) {
  return <div className={cx('diag', className)} dangerouslySetInnerHTML={{ __html: DIAGRAMS[k] ?? '' }} />;
}

export function Chip({ tool }: { tool: Loc }) {
  const { l } = useI18n();
  const k = l(tool);
  return (
    <span className="chip">
      <BrandIcon name={k} />
      {TOOL_NAMES[k] ?? k}
    </span>
  );
}

/** In-page link that scrolls smoothly and keeps the URL clean. */
export function Jump({ to, className, children, onJump }: { to: string; className?: string; children: ReactNode; onJump?: () => void }) {
  const go = (e: MouseEvent) => {
    e.preventDefault();
    onJump?.();
    scrollToId(to);
  };
  return (
    <a className={className} href={'#' + to} onClick={go}>
      {children}
    </a>
  );
}

type RevealProps = { as?: ElementType; className?: string; children?: ReactNode; ref?: Ref<HTMLDivElement> } & HTMLAttributes<HTMLElement>;

/** Wraps any element with the reveal on scroll behaviour. */
export function Reveal({ as = 'div', className, children, ref: outer, ...rest }: RevealProps) {
  const [ref, shown] = useReveal<HTMLDivElement>();
  const both = (el: HTMLDivElement | null) => {
    ref.current = el;
    if (typeof outer === 'function') outer(el);
    else if (outer) outer.current = el;
  };
  return createElement(as, { ...rest, ref: both, className: cx(className, 'reveal', shown && 'in') }, children);
}

function splitWords(html: string) {
  const doc = new DOMParser().parseFromString('<div>' + html + '</div>', 'text/html');
  let out = '';
  let i = 0;
  const walk = (node: Node, open: string, close: string) => {
    node.childNodes.forEach((n) => {
      if (n.nodeType === Node.TEXT_NODE) {
        for (const w of (n.textContent ?? '').split(/(\s+)/)) {
          if (!w) continue;
          if (/^\s+$/.test(w)) out += ' ';
          else out += `<span class="w"><span style="transition-delay:${i++ * 60}ms">${open}${w}${close}</span></span>`;
        }
      } else if (n.nodeName === 'BR') out += '<br>';
      else {
        const tag = n.nodeName.toLowerCase();
        walk(n, open + '<' + tag + '>', '</' + tag + '>' + close);
      }
    });
  };
  walk(doc.body.firstChild!, '', '');
  return out;
}

/** Kicker, split heading and a short lede, shared by every section. */
export function SectionHead({ kicker, title, lede }: { kicker: string; title: string; lede: string }) {
  return (
    <div className="sechead">
      <div>
        <span className="mono kicker">{kicker}</span>
        <SplitHeading className="h2" html={title} />
      </div>
      <Reveal as="p">{lede}</Reveal>
    </div>
  );
}

/** A heading whose words rise into place when it scrolls into view. */
export function SplitHeading({ as = 'h2', className, html }: { as?: ElementType; className?: string; html: string }) {
  const [ref, shown] = useReveal<HTMLElement>();
  const words = useMemo(() => splitWords(html), [html]);
  return createElement(as, { ref, className: cx(className, 'split', shown && 'in'), dangerouslySetInnerHTML: { __html: words } });
}
