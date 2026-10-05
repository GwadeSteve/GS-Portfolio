import { AWARDS } from '../content/awards';
import { POSTS } from '../content/posts';
import { PROJECTS } from '../content/projects';
import { GROUPS } from '../content/stack';
import { readMinutes } from './format';
import type { Award, Post, Project } from '../content/types';

export const PROJECT_BY: Record<string, Project> = Object.fromEntries(PROJECTS.map((p) => [p.k, p]));
export const FEATURED = PROJECTS.filter((p) => p.feat);
export const MORE = PROJECTS.filter((p) => !p.feat);

export const AWARD_BY: Record<string, Award> = Object.fromEntries(AWARDS.map((a) => [a.k, a]));

/** Display names for tool keys, e.g. postgresql to PostgreSQL. */
export const TOOL_NAMES: Record<string, string> = Object.fromEntries(GROUPS.flatMap((g) => g.items));

/** Every tool once, in group order. */
export const TOOLS = Object.entries(TOOL_NAMES).map(([k, n]) => ({ k, n }));

export type PostEntry = Post & { min: number };

/** Newest first, with reading time. */
export const ESSAYS: PostEntry[] = POSTS.map((p) => ({ ...p, min: readMinutes(p.blocks) })).sort(
  (a, b) => b.date[0] - a.date[0] || b.date[1] - a.date[1] || b.date[2] - a.date[2],
);
export const ESSAY_BY: Record<string, PostEntry> = Object.fromEntries(ESSAYS.map((p) => [p.k, p]));
