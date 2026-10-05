import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { ESSAY_BY } from './lib/data';
import { LangProvider } from './lib/i18n';
import { OverlayProvider } from './lib/overlay';
import { ThemeProvider } from './lib/theme';
import './styles/global.css';

// A refresh always starts at the top. Only a link to an essay opens something.
const hashPost = location.hash.match(/^#post-([a-z0-9-]+)$/)?.[1] ?? null;
const initialPost = hashPost && ESSAY_BY[hashPost] ? hashPost : null;
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
if (location.hash && !initialPost) history.replaceState(null, '', location.pathname + location.search);
scrollTo(0, 0);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <LangProvider>
        <OverlayProvider initialPost={initialPost}>
          <App />
        </OverlayProvider>
      </LangProvider>
    </ThemeProvider>
  </StrictMode>,
);
