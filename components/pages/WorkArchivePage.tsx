import { WorkCard } from '@/components/work/WorkCard';
import { getWorkEntries } from '@/lib/content';
import type { Locale } from '@/types/locale';

const copy = {
  ko: {
    lead: '문제를 정의하고, 사용자 흐름을 정리하고, 실제로 사용할 수 있는 웹 경험까지 만든 작업입니다.',
    label: '전체 프로젝트',
  },
  en: {
    lead: 'Selected products shaped from problem definition and user flow through implementation and a usable web experience.',
    label: 'All projects',
  },
} as const;

export function WorkArchivePage({ locale }: { locale: Locale }) {
  const entries = getWorkEntries();

  return (
    <>
      <header className="page-hero page-hero--blue">
        <div className="page-hero__meta"><span>01 · WORK ARCHIVE</span><span>{entries.length} PROJECTS</span></div>
        <h1>Built to<br />be used.</h1>
        <p>{copy[locale].lead}</p>
      </header>
      <section className="archive-grid" aria-label={copy[locale].label}>
        {entries.map((entry, index) => (
          <WorkCard key={entry.metadata.slug} work={entry.metadata} index={index} locale={locale} />
        ))}
      </section>
    </>
  );
}
