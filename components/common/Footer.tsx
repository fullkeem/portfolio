'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { commonCopy, localeFromPath, navigationByLocale, stripLocale } from '@/config/i18n';
import { profile } from '@/config/profile';

export function Footer() {
  const pathname = usePathname();
  const locale = localeFromPath(pathname);
  const copy = commonCopy[locale];

  if (stripLocale(pathname) === '/') return null;

  return (
    <footer className="site-footer">
      <div className="site-footer__lead">
        <p className="eyebrow">{copy.availableFor}</p>
        <p>{copy.availableValue}</p>
      </div>
      <div className="site-footer__grid">
        <p>© {new Date().getFullYear()} {locale === 'ko' ? profile.name : 'Kim Choongman'} · {profile.brandName}</p>
        <nav aria-label={copy.footerLabel}>
          {navigationByLocale[locale].filter((link) => stripLocale(link.href) !== '/').map((link) => (
            <Link key={link.href} href={link.href}>{link.name}</Link>
          ))}
        </nav>
        <nav aria-label={copy.externalLabel}>
          <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={`mailto:${profile.email}`}>Email</a>
        </nav>
      </div>
    </footer>
  );
}
