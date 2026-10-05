import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { UI } from '../content/ui';
import type { Lang, Loc } from '../content/types';

interface I18n {
  lang: Lang;
  setLang: (l: Lang) => void;
  /** UI string by key, with {name} placeholders filled from vars. */
  t: (key: string, vars?: Record<string, string | number>) => string;
  /** Picks the current language from a localized value. */
  l: (v: Loc | undefined) => string;
}

const Ctx = createContext<I18n | null>(null);

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem('gw-lang');
    if (saved === 'en' || saved === 'fr') return saved;
  } catch {
    // Storage can be blocked; fall back to the browser language.
  }
  return navigator.language.slice(0, 2) === 'fr' ? 'fr' : 'en';
}

export function pick<T>(v: T | { en: T; fr: T }, lang: Lang): T {
  return v && typeof v === 'object' && !Array.isArray(v) && 'en' in v ? v[lang] : (v as T);
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem('gw-lang', lang);
    } catch {
      // Not persisted, the choice still applies to this visit.
    }
  }, [lang]);

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>) => {
      let s = UI[lang][key] ?? UI.en[key] ?? key;
      if (vars) for (const [k, v] of Object.entries(vars)) s = s.replace('{' + k + '}', String(v));
      return s;
    },
    [lang],
  );
  const l = useCallback((v: Loc | undefined) => (v === undefined ? '' : pick(v, lang)), [lang]);
  const value = useMemo(() => ({ lang, setLang: setLangState, t, l }), [lang, t, l]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useI18n(): I18n {
  const v = useContext(Ctx);
  if (!v) throw new Error('useI18n outside LangProvider');
  return v;
}
