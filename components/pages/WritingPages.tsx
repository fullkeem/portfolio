import Link from 'next/link';
import { JsonLd } from '@/components/seo/JsonLd';
import { localizedPath } from '@/config/i18n';
import { writingEnglish } from '@/config/localized-content';
import { getWritingEntries } from '@/lib/content';
import type { WritingEntry, WritingMeta } from '@/types/content';
import type { Locale } from '@/types/locale';

function getMetadata(entry: WritingEntry, locale: Locale): WritingMeta {
  return locale === 'en' ? writingEnglish[entry.metadata.slug]?.metadata ?? entry.metadata : entry.metadata;
}

export function WritingArchiveView({ locale }: { locale: Locale }) {
  const entries = getWritingEntries();
  const lead = locale === 'ko'
    ? '만들며 배운 것을 더 오래 남기기 위해, 복잡한 개념을 다시 이해하기 위해 씁니다.'
    : 'I write to make lessons from building last longer—and to understand complex ideas by explaining them clearly.';

  return (
    <>
      <header className="page-hero page-hero--lime">
        <div className="page-hero__meta"><span>03 · WRITING</span><span>{entries.length} ARTICLE</span></div>
        <h1>Notes for<br />making.</h1>
        <p>{lead}</p>
      </header>
      <section className="writing-list" aria-label={locale === 'ko' ? '글 목록' : 'Articles'}>
        {entries.map((entry) => {
          const metadata = getMetadata(entry, locale);
          return (
            <Link href={localizedPath(`/writing/${metadata.slug}`, locale)} className="writing-row" key={metadata.slug}>
              <span>{metadata.publishedAt}</span>
              <div><h2>{metadata.title}</h2><p>{metadata.summary}</p></div>
              <span>{metadata.category} ↗</span>
            </Link>
          );
        })}
      </section>
    </>
  );
}

export function WritingDetailView({ entry, locale }: { entry: WritingEntry; locale: Locale }) {
  const metadata = getMetadata(entry, locale);
  const english = writingEnglish[entry.metadata.slug];
  const Content = entry.Content;

  return (
    <article>
      <JsonLd type="article" data={{ writing: metadata }} locale={locale} />
      <header className="article-header">
        <Link href={localizedPath('/writing', locale)} className="case-header__back">← WRITING</Link>
        <div className="article-header__meta"><span>{metadata.category}</span><span>{metadata.publishedAt}</span></div>
        <h1>{metadata.title}</h1>
        <p>{metadata.summary}</p>
        <div className="tag-list">{metadata.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
      </header>
      <div className="case-content article-content">
        {locale === 'ko' ? <Content /> : english?.sections.map((section) => (
          <section key={section.title}>
            <h2 className="content-heading">{section.title}</h2>
            {section.paragraphs?.map((paragraph) => <p className="content-paragraph" key={paragraph}>{paragraph}</p>)}
            {section.items && <ul className="content-list">{section.items.map((item) => <li key={item}>{item}</li>)}</ul>}
            {section.quote && <blockquote className="content-quote">{section.quote}</blockquote>}
          </section>
        ))}
      </div>
    </article>
  );
}
