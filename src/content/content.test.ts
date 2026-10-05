import { describe, expect, it } from 'vitest';
import { AWARDS } from './awards';
import { COMPOSER } from './contact';
import { DIAGRAMS, POST_FIGURES } from './diagrams';
import { ICONS } from './icons';
import { POSTS } from './posts';
import { PROJECTS } from './projects';
import { ROLES } from './roles';
import { GROUPS, STACK_PROJECTS } from './stack';
import { UI } from './ui';
import { duration, period, readMinutes } from '../lib/format';

const MEDIA_KEYS = ['arch', 'eatwise', 'foodhub', 'morph', 'mttl', 'plum', 'polyapps', 'splash', 'vero'];
const ALL = { UI, PROJECTS, ROLES, AWARDS, GROUPS, COMPOSER, POSTS };

/** Every string in a value, with its path, for copy checks. */
function strings(v: unknown, path = ''): [string, string][] {
  if (typeof v === 'string') return [[path, v]];
  if (Array.isArray(v)) return v.flatMap((x, i) => strings(x, `${path}[${i}]`));
  if (v && typeof v === 'object') return Object.entries(v).flatMap(([k, x]) => strings(x, path ? `${path}.${k}` : k));
  return [];
}

/** Objects that look like a localized value must carry both languages. */
function localized(v: unknown, path = ''): string[] {
  if (Array.isArray(v)) return v.flatMap((x, i) => localized(x, `${path}[${i}]`));
  if (!v || typeof v !== 'object') return [];
  const keys = Object.keys(v);
  if (keys.includes('en') || keys.includes('fr')) return keys.includes('en') && keys.includes('fr') ? [] : [path];
  return Object.entries(v).flatMap(([k, x]) => localized(x, `${path}.${k}`));
}

describe('copy rules', () => {
  it('has no em dashes, en dashes or double hyphens', () => {
    const bad = Object.entries(ALL)
      .flatMap(([name, v]) => strings(v, name))
      .filter(([, s]) => /[–—]/.test(s) || /(^|[^-])--([^-]|$)/.test(s.replace(/<[^>]+>/g, '')));
    expect(bad).toEqual([]);
  });

  it('fills both languages wherever a value is localized', () => {
    const missing = Object.entries({ PROJECTS, ROLES, AWARDS, GROUPS, COMPOSER }).flatMap(([n, v]) => localized(v, n));
    expect(missing).toEqual([]);
  });

  it('has the same UI keys in English and French', () => {
    expect(Object.keys(UI.fr).sort()).toEqual(Object.keys(UI.en).sort());
  });
});

describe('projects', () => {
  it('has unique keys, a diagram, at most three impact stats and either links or a private note', () => {
    expect(new Set(PROJECTS.map((p) => p.k)).size).toBe(PROJECTS.length);
    for (const p of PROJECTS) {
      expect(DIAGRAMS[p.ill ?? p.k], p.k).toBeTruthy();
      expect(p.stats.length, p.k).toBeLessThanOrEqual(3);
      expect(p.links.length > 0 || !!p.priv, p.k).toBe(true);
      if (p.img) expect(MEDIA_KEYS, p.k).toContain(p.img);
    }
  });

  it('points roles, awards and the globe at real projects', () => {
    const keys = new Set(PROJECTS.map((p) => p.k));
    for (const r of ROLES) for (const k of r.projects) expect(keys, r.k).toContain(k);
    for (const a of AWARDS) if (a.proj) expect(keys, a.k).toContain(a.proj);
    for (const k of STACK_PROJECTS) expect(keys).toContain(k);
  });

  it('has an icon for every tool in the stack groups', () => {
    for (const g of GROUPS) for (const [k] of g.items) expect(ICONS[k], k).toBeTruthy();
  });
});

describe('essays', () => {
  it('has unique slugs, sections, a summary and https sources', () => {
    expect(new Set(POSTS.map((p) => p.k)).size).toBe(POSTS.length);
    for (const p of POSTS) {
      expect(p.k).toMatch(/^[a-z0-9-]+$/);
      expect(p.blocks[0][0], p.k).toBe('tldr');
      expect(p.blocks.filter((b) => b[0] === 'h2').length, p.k).toBeGreaterThanOrEqual(3);
      const refs = p.blocks.find((b) => b[0] === 'refs');
      expect(refs, p.k).toBeTruthy();
      for (const [, url] of refs![1] as [string, string][]) expect(url).toMatch(/^https:\/\//);
      for (const b of p.blocks) {
        if (b[0] === 'fig') expect(POST_FIGURES[b[1]] ?? DIAGRAMS[b[1]], p.k + ' ' + b[1]).toBeTruthy();
        if (b[0] === 'img') expect(MEDIA_KEYS).toContain(b[1]);
      }
      expect(readMinutes(p.blocks)).toBeGreaterThanOrEqual(3);
    }
  });
});

describe('dates', () => {
  const role = ROLES.find((r) => r.k === 'tgnix')!;

  it('formats a period in both languages', () => {
    expect(period(role, 'en', 'Present')).toBe('Mar 2024 - Dec 2024');
    expect(period(role, 'fr', 'Aujourd’hui')).toBe('mars 2024 - déc. 2024');
  });

  it('counts months inclusively', () => {
    expect(duration(role, 'en')).toBe('10 months');
    expect(duration(role, 'fr')).toBe('10 mois');
  });
});
