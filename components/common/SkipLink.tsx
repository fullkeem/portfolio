'use client';

import { usePathname } from 'next/navigation';
import { localeFromPath } from '@/config/i18n';

export function SkipLink() {
  const locale = localeFromPath(usePathname());
  return <a href="#main-content" className="skip-link">{locale === 'ko' ? '본문 바로가기' : 'Skip to content'}</a>;
}
