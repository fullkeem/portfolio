'use client';

import { useEffect, useSyncExternalStore } from 'react';
import { themeChangeEvent, themeStorageKey } from '@/config/theme';
import type { Theme } from '@/config/theme';
import type { Locale } from '@/types/locale';

function getTheme(): Theme {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

function subscribe(onChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key !== themeStorageKey && event.key !== null) return;
    document.documentElement.dataset.theme = event.newValue === 'dark' ? 'dark' : 'light';
    onChange();
  };
  window.addEventListener(themeChangeEvent, onChange);
  window.addEventListener('storage', onStorage);
  return () => {
    window.removeEventListener(themeChangeEvent, onChange);
    window.removeEventListener('storage', onStorage);
  };
}

function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  window.dispatchEvent(new Event(themeChangeEvent));
  try {
    localStorage.setItem(themeStorageKey, theme);
  } catch {
    // The current session still works when browser storage is unavailable.
  }
}

export function ThemeToggle({ locale }: { locale: Locale }) {
  const theme = useSyncExternalStore(subscribe, getTheme, () => 'light');

  useEffect(() => {
    // Avoid animating initial hydration. Subsequent changes can reverse mid-transition.
    let secondFrame = 0;
    const firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(() => {
        document.documentElement.dataset.themeReady = 'true';
      });
    });
    return () => {
      cancelAnimationFrame(firstFrame);
      cancelAnimationFrame(secondFrame);
      delete document.documentElement.dataset.themeReady;
    };
  }, []);

  return (
    <div className="theme-toggle" role="group" aria-label={locale === 'ko' ? '화면 모드' : 'Color mode'}>
      <span className="theme-toggle__indicator" aria-hidden="true" />
      {(['light', 'dark'] as const).map((value) => (
        <button key={value} type="button" aria-pressed={theme === value} onClick={() => setTheme(value)}>
          {locale === 'ko' ? (value === 'light' ? '기본' : '야간') : (value === 'light' ? 'Light' : 'Dark')}
        </button>
      ))}
    </div>
  );
}
