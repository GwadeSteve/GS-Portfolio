import { MONTHS } from '../content/ui';
import type { Block, Lang, Role, YearMonth } from '../content/types';

/** The month the site considers "now" for running durations. */
export const NOW: [number, number] = [2026, 10];

function ym(d: YearMonth, lang: Lang) {
  return d.length > 1 ? MONTHS[lang][d[1]! - 1] + ' ' + d[0] : String(d[0]);
}

export function period(r: Role, lang: Lang, present: string) {
  return ym(r.from, lang) + ' - ' + (r.to ? ym(r.to, lang) : present);
}

export function duration(r: Role, lang: Lang) {
  const to = r.to ?? NOW;
  if (r.from.length < 2 || to.length < 2) return '';
  const m = (to[0] - r.from[0]) * 12 + to[1]! - r.from[1]! + 1;
  const y = Math.floor(m / 12);
  const mm = m % 12;
  const Y = lang === 'fr' ? (y > 1 ? ' ans' : ' an') : y > 1 ? ' years' : ' year';
  const M = lang === 'fr' ? ' mois' : mm > 1 ? ' months' : ' month';
  return (y ? y + Y : '') + (y && mm ? ' ' : '') + (mm ? mm + M : '');
}

export function postDate(d: [number, number, number], lang: Lang) {
  return lang === 'fr' ? `${d[2]} ${MONTHS.fr[d[1] - 1]} ${d[0]}` : `${MONTHS.en[d[1] - 1]} ${d[2]}, ${d[0]}`;
}

/** Minutes to read at 200 words a minute, never under three. */
export function readMinutes(blocks: Block[]) {
  const words = blocks
    .map((b) => JSON.stringify(b.slice(1)))
    .join(' ')
    .replace(/<[^>]+>/g, ' ')
    .split(/\s+/).length;
  return Math.max(3, Math.round(words / 200));
}

export const pad2 = (n: number) => String(n).padStart(2, '0');
