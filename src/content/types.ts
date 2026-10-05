export type Lang = 'en' | 'fr';

/** A string that is the same in both languages, or one per language. */
export type Loc = string | { en: string; fr: string };

export type Dict = Record<string, string>;

/** [value, label] */
export type Stat = [Loc, Loc];

export interface Project {
  k: string;
  t: string;
  feat?: boolean;
  yr?: string;
  hot?: boolean;
  badge: Loc;
  /** One line tagline. */
  d: Loc;
  where: Loc;
  role: Loc;
  /** The problem the project answers. */
  pb: Loc;
  /** What changed thanks to it. */
  sum: Loc;
  stats: Stat[];
  /** Tool keys from the icon set, or free text for tools without an icon. */
  stack: Loc[];
  /** [label, url] */
  links: [Loc, string][];
  /** Shown instead of links when the work is private. */
  priv?: Loc;
  /** Diagram key when it differs from the project key. */
  ill?: string;
  /** Screenshot key from the media folder. */
  img?: string;
}

/** [year, month] with month from 1 to 12, or [year] alone. */
export type YearMonth = [number, number] | [number];

export interface Role {
  k: string;
  /** Two letter monogram. */
  mo: string;
  role: Loc;
  co: string;
  short?: string;
  sub?: Loc;
  place: Loc;
  type: Loc;
  from: YearMonth;
  to: YearMonth | null;
  edu?: boolean;
  projects: string[];
  sum: Loc;
  pts: { en: string[]; fr: string[] };
  stack: string[];
}

export interface Award {
  k: string;
  /** Rank, shown big in the bubble. */
  rk: Loc;
  /** Bubble label. */
  bl: Loc;
  t: Loc;
  ev: string;
  date: Loc;
  /** Track or category. */
  tr: Loc;
  /** Bubble style: 'acc', 'inv' or ''. */
  cls: string;
  proj?: string;
  d: Loc;
  st: Stat[];
}

export interface ToolGroup {
  k: string;
  n: Loc;
  /** What the group is good for, one line. */
  v: Loc;
  /** [icon key, display name] */
  items: [string, string][];
}

/** [key, chip label, phrase used in the drafted message] */
export type ComposerOption = [string, Loc, Loc];

type Row = [string, string, string, string] | [string, string, string, string, number];

/**
 * Essay blocks. Strings may contain inline HTML (em, sub, sup, code spans).
 * A table row with a fifth element is highlighted as the winner.
 */
export type Block =
  | ['tldr' | 'h2' | 'p' | 'quote' | 'code', string]
  | ['ul' | 'ol' | 'take', string[]]
  | ['math', string, string]
  | ['fig' | 'img', string, string]
  | ['table', string[], Row[], string]
  | ['refs', [string, string][]];

export interface Post {
  k: string;
  t: string;
  /** Standfirst shown under the title. */
  dek: string;
  feat?: boolean;
  date: [number, number, number];
  tags: string[];
  cover: string;
  blocks: Block[];
}
