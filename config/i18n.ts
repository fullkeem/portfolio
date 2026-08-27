import type { Locale } from '@/types/locale';

export const locales = ['ko', 'en'] as const;

export function localeFromPath(pathname: string): Locale {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'ko';
}

export function stripLocale(pathname: string) {
  if (pathname === '/en') return '/';
  return pathname.replace(/^\/en(?=\/)/, '') || '/';
}

export function localizedPath(pathname: string, locale: Locale) {
  const basePath = stripLocale(pathname);
  if (locale === 'ko') return basePath;
  return basePath === '/' ? '/en' : `/en${basePath}`;
}

export const navigationByLocale = {
  ko: [
    { name: 'Index', href: '/' },
    { name: 'Work', href: '/work' },
    { name: 'Resume', href: '/resume' },
    { name: 'Writing', href: '/writing' },
  ],
  en: [
    { name: 'Index', href: '/en' },
    { name: 'Work', href: '/en/work' },
    { name: 'Resume', href: '/en/resume' },
    { name: 'Writing', href: '/en/writing' },
  ],
} as const;

export const commonCopy = {
  ko: {
    homeLabel: '김충만 Fullkeem 홈',
    navigationLabel: '주요 메뉴',
    languageLabel: '언어 선택',
    footerLabel: '하단 메뉴',
    externalLabel: '외부 채널',
    availableFor: 'AVAILABLE FOR',
    availableValue: 'AX · WEB · EDUCATION',
    print: '인쇄 · PDF 저장',
  },
  en: {
    homeLabel: 'Kim Choongman Fullkeem home',
    navigationLabel: 'Primary navigation',
    languageLabel: 'Select language',
    footerLabel: 'Footer navigation',
    externalLabel: 'External channels',
    availableFor: 'AVAILABLE FOR',
    availableValue: 'AX · WEB · EDUCATION',
    print: 'Print · Save PDF',
  },
} as const;
