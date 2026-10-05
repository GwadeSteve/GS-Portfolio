import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from 'react';

export type Layer = { kind: 'project' | 'role'; k: string } | null;

interface Overlay {
  layer: Layer;
  post: string | null;
  openProject: (k: string) => void;
  openRole: (k: string) => void;
  closeLayer: () => void;
  openPost: (k: string) => void;
  closePost: () => void;
  toast: string;
  toastOn: boolean;
  say: (msg: string) => void;
}

const Ctx = createContext<Overlay | null>(null);

function postHash(k: string | null) {
  try {
    history.replaceState(null, '', k ? '#post-' + k : location.pathname + location.search);
  } catch {
    // Some embedded browsers refuse history changes; the reader still works.
  }
}

export function OverlayProvider({ children, initialPost }: { children: ReactNode; initialPost: string | null }) {
  const [layer, setLayer] = useState<Layer>(null);
  const [post, setPost] = useState<string | null>(initialPost);
  const [toast, setToast] = useState('');
  const [toastOn, setToastOn] = useState(false);
  const toastT = useRef(0);

  const openProject = useCallback((k: string) => setLayer({ kind: 'project', k }), []);
  const openRole = useCallback((k: string) => setLayer({ kind: 'role', k }), []);
  const closeLayer = useCallback(() => setLayer(null), []);
  const openPost = useCallback((k: string) => {
    setLayer(null);
    setPost(k);
    postHash(k);
  }, []);
  const closePost = useCallback(() => {
    setPost(null);
    postHash(null);
  }, []);
  const say = useCallback((msg: string) => {
    setToast(msg);
    setToastOn(true);
    clearTimeout(toastT.current);
    toastT.current = window.setTimeout(() => setToastOn(false), 2200);
  }, []);

  const value = useMemo(
    () => ({ layer, post, openProject, openRole, closeLayer, openPost, closePost, toast, toastOn, say }),
    [layer, post, openProject, openRole, closeLayer, openPost, closePost, toast, toastOn, say],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useOverlay(): Overlay {
  const v = useContext(Ctx);
  if (!v) throw new Error('useOverlay outside OverlayProvider');
  return v;
}

/** Copies text, then confirms with the callback, or shows the text in a toast if the clipboard is blocked. */
export async function copyText(text: string, onDone: () => void, onFail: () => void) {
  try {
    await navigator.clipboard.writeText(text);
    onDone();
  } catch {
    onFail();
  }
}
