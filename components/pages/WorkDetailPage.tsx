import Link from 'next/link';
import Image from 'next/image';
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
    <article className={metadata.clientWork ? 'case-study--client' : undefined}>
      <JsonLd type="portfolio" data={{ work: metadata }} locale={locale} />
      <header className={`case-header case-header--${metadata.accent}`}>
        <Link href={localizedPath('/work', locale)} className="case-header__back">← WORK ARCHIVE</Link>
        <div className="case-header__grid">
          <h1>{metadata.title}</h1>
          <div>
            <p className="eyebrow">{metadata.clientWork && 'CLIENT WORK · '}{metadata.category} · {metadata.period}</p>
            <p className="case-header__summary">{metadata.summary}</p>
          </div>
        </div>
      </header>
      <dl className="case-meta">
        <div><dt>ROLE</dt><dd>{metadata.role}</dd></div>
        <div><dt>STACK</dt><dd>{metadata.technologies.join(' · ')}</dd></div>
        <div><dt>{metadata.duration ? 'DURATION' : 'YEAR'}</dt><dd>{metadata.duration?.[locale] ?? metadata.period}</dd></div>
      </dl>
      {metadata.media && metadata.media.length > 0 && (
        <section className="case-gallery" aria-label={locale === 'ko' ? '프로젝트 실제 화면' : 'Project screenshots'}>
          {metadata.media.map((media) => (
            <figure className="case-gallery__item" key={media.src}>
              <a
                className="case-gallery__preview"
                href={media.src}
                target="_blank"
                rel="noreferrer"
                aria-label={locale === 'ko' ? `${media.alt.ko} 크게 보기 (새 창)` : `View ${media.alt.en} in full size (new tab)`}
              >
                <Image
                  src={media.src}
                  alt={media.alt[locale]}
                  width={media.width}
                  height={media.height}
                  sizes="(min-width: 1280px) 584px, (min-width: 700px) 45vw, calc(100vw - 40px)"
                />
                <span className="case-gallery__expand">{locale === 'ko' ? '크게 보기' : 'View full size'} ↗</span>
              </a>
              <figcaption>{media.caption[locale]}</figcaption>
            </figure>
          ))}
        </section>
      )}
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
            {metadata.liveUrl && <a className="button button--blue" href={metadata.liveUrl} target="_blank" rel="noreferrer">{metadata.liveLabel?.[locale] ?? (locale === 'ko' ? '운영 사이트' : 'Live site')} ↗</a>}
            {metadata.githubUrl && <a className="button button--paper" href={metadata.githubUrl} target="_blank" rel="noreferrer">GitHub ↗</a>}
          </div>
        )}
      </div>
    </article>
  );
}
