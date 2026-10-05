import { scrollBehavior } from '../lib/env';
import { useI18n } from '../lib/i18n';
import { useOverlay } from '../lib/overlay';
import { Jump, Sym } from './ui';

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="ft wrap">
      <div className="max ft-card">
        <div className="grid-bg" aria-hidden="true"></div>
        <div className="ft-l">
          <Jump className="mk" to="top">
            SG
          </Jump>
          <span className="mono">&copy; 2026 Steve Gwade</span>
        </div>
        <button className="btn ghost sm" type="button" onClick={() => scrollTo({ top: 0, behavior: scrollBehavior })}>
          <span>{t('ft.top')}</span>
          <span className="bi">
            <Sym id="up" />
          </span>
        </button>
      </div>
    </footer>
  );
}

export function Toast() {
  const { toast, toastOn } = useOverlay();
  return (
    <div className={toastOn ? 'toast on' : 'toast'} role="status" aria-live="polite">
      <i>&#10003;</i>
      {toast}
    </div>
  );
}
