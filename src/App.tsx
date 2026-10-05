import { useEffect } from 'react';
import { Awards } from './components/Awards';
import { Contact } from './components/Contact';
import { Drawer } from './components/Drawer';
import { Footer, Toast } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Journey } from './components/Journey';
import { Reader } from './components/Reader';
import { Stack } from './components/Stack';
import { Work } from './components/Work';
import { Writing } from './components/Writing';
import { useI18n } from './lib/i18n';
import { useOverlay } from './lib/overlay';

export function App() {
  const { lang } = useI18n();
  const { closeLayer } = useOverlay();

  // Switching language closes an open drawer, its content would change under the reader.
  useEffect(() => closeLayer(), [lang, closeLayer]);

  return (
    <>
      <Toast />
      <Reader />
      <Drawer />
      <Header />
      <main>
        <Hero />
        <Work />
        <Awards />
        <Journey />
        <Stack />
        <Writing />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
