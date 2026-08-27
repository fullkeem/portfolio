import Link from 'next/link';
import { JsonLd } from '@/components/seo/JsonLd';
import { localizedPath } from '@/config/i18n';
import { getEnglishWorkSections, localizeWorkMeta } from '@/config/localized-content';
import type { WorkEntry } from '@/types/content';
import type { Locale } from '@/types/locale';

export function WorkDetailView({ entry, locale }: { entry: WorkEntry; locale: Locale }) {
  const metadata = localizeWorkMeta(entry.metadata, locale);
  const sections = locale === 'en' ? getEnglishWorkSections(metadata.slug) : [];
  const Content = entry.Content;

  return (
    <article>
      <JsonLd type="portfolio" data={{ work: metadata }} locale={locale} />
      <header className={`case-header case-header--${metadata.accent}`}>
        <Link href={localizedPath('/work', locale)} className="case-header__back">← WORK ARCHIVE</Link>
        <div className="case-header__grid">
          <h1>{metadata.title}</h1>
          <div>
            <p className="eyebrow">{metadata.category} · {metadata.period}</p>
            <p className="case-header__summary">{metadata.summary}</p>
          </div>
        </div>
      </header>
      <dl className="case-meta">
        <div><dt>ROLE</dt><dd>{metadata.role}</dd></div>
        <div><dt>STACK</dt><dd>{metadata.technologies.join(' · ')}</dd></div>
        <div><dt>YEAR</dt><dd>{metadata.period}</dd></div>
      </dl>
      <div className="case-content">
        {locale === 'ko' ? <Content /> : sections.map((section) => (
          <section key={section.title}>
            <h2 className="content-heading">{section.title}</h2>
            {section.paragraphs?.map((paragraph) => <p className="content-paragraph" key={paragraph}>{paragraph}</p>)}
            {section.items && <ul className="content-list">{section.items.map((item) => <li key={item}>{item}</li>)}</ul>}
          </section>
        ))}
        {(metadata.liveUrl || metadata.githubUrl) && (
          <div className="case-links">
            {metadata.liveUrl && <a className="button button--blue" href={metadata.liveUrl} target="_blank" rel="noreferrer">Live site ↗</a>}
            {metadata.githubUrl && <a className="button button--paper" href={metadata.githubUrl} target="_blank" rel="noreferrer">GitHub ↗</a>}
          </div>
        )}
      </div>
    </article>
  );
}
