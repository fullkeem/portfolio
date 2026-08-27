import Link from 'next/link';
import { localizedPath } from '@/config/i18n';
import { localizeWorkMeta } from '@/config/localized-content';
import type { WorkMeta } from '@/types/content';
import type { Locale } from '@/types/locale';

export function WorkCard({ work, index, locale = 'ko' }: { work: WorkMeta; index: number; locale?: Locale }) {
  const localizedWork = localizeWorkMeta(work, locale);

  return (
    <article className={`work-card work-card--${localizedWork.accent}`}>
      <Link href={localizedPath(`/work/${localizedWork.slug}`, locale)} className="work-card__link">
        <div className="work-card__visual" aria-hidden="true">
          <span className="work-card__number">{String(index + 1).padStart(2, '0')}</span>
          <span className="work-card__category">{localizedWork.category}</span>
          <strong>{localizedWork.title}</strong>
          <span className="work-card__orb" />
        </div>
        <div className="work-card__body">
          <div>
            <p className="eyebrow">{localizedWork.role} · {localizedWork.period}</p>
            <h3>{localizedWork.title}</h3>
          </div>
          <p>{localizedWork.summary}</p>
          <div className="tag-list" aria-label={locale === 'ko' ? '사용 기술' : 'Technologies'}>
            {localizedWork.technologies.slice(0, 4).map((technology) => (
              <span key={technology}>{technology}</span>
            ))}
          </div>
          <span className="text-link">{locale === 'ko' ? '케이스 스터디' : 'Case study'} <span aria-hidden="true">↗</span></span>
        </div>
      </Link>
    </article>
  );
}
