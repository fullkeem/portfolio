'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { commonCopy, localeFromPath, localizedPath, navigationByLocale, stripLocale } from '@/config/i18n';

export function Header() {
  const pathname = usePathname();
  const locale = localeFromPath(pathname);
  const copy = commonCopy[locale];
  const [hash, setHash] = useState('');

  useEffect(() => {
    const syncHash = () => setHash(window.location.hash);
    syncHash();
    document.documentElement.lang = locale;
    window.addEventListener('hashchange', syncHash);
    return () => window.removeEventListener('hashchange', syncHash);
  }, [locale, pathname]);

  const currentPath = stripLocale(pathname);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href={localizedPath('/', locale)} className="wordmark" aria-label={copy.homeLabel}>
          <span className="wordmark__mark" aria-hidden="true">FK</span>
          <span>
            <strong>FULLKEEM</strong>
            <small>KIM CHOONGMAN</small>
          </span>
        </Link>
        <div className="site-header__actions">
          <nav className="site-nav" aria-label={copy.navigationLabel}>
            {navigationByLocale[locale].map((item) => {
              const itemPath = stripLocale(item.href);
              const isActive = itemPath === '/' ? currentPath === '/' : currentPath.startsWith(itemPath);
              return <Link key={item.href} href={item.href} aria-current={isActive ? 'page' : undefined}>{item.name}</Link>;
            })}
          </nav>
          <nav className="language-switch" aria-label={copy.languageLabel}>
            <Link href={`${localizedPath(pathname, 'ko')}${hash}`} hrefLang="ko" aria-current={locale === 'ko' ? 'true' : undefined}>KR</Link>
            <Link href={`${localizedPath(pathname, 'en')}${hash}`} hrefLang="en" aria-current={locale === 'en' ? 'true' : undefined}>EN</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
