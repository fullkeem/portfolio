import Link from 'next/link';
import { PrintButton } from '@/components/common/PrintButton';
import { commonCopy, localizedPath } from '@/config/i18n';
import { localizeWorkMeta, profileCopy } from '@/config/localized-content';
import { buildMailto, profile } from '@/config/profile';
import { getWorkEntries } from '@/lib/content';
import type { Locale } from '@/types/locale';

const resumeCopy = {
  ko: {
    name: <>김충만<br /><span>Fullkeem</span></>,
    contact: ['채용 · 협업 문의', '프로젝트 문의', '교육 · 멘토링 문의'],
  },
  en: {
    name: <>Kim Choongman<br /><span>Fullkeem</span></>,
    contact: ['Career · collaboration', 'Project inquiry', 'Training · mentoring'],
  },
} as const;

export function ResumeView({ locale }: { locale: Locale }) {
  const copy = profileCopy[locale];
  const work = getWorkEntries();

  return (
    <article className="resume">
      <header className="resume__masthead">
        <div><p className="eyebrow">RESUME · 2026</p><h1>{resumeCopy[locale].name}</h1></div>
        <PrintButton label={commonCopy[locale].print} />
      </header>

      <section className="resume__summary">
        <p>{copy.introduction}</p>
        <div className="resume__contacts">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
          <span>Seoul, Korea</span>
        </div>
      </section>

      <section className="resume-section">
        <h2>CURRENT PRACTICE</h2>
        <div>
          {copy.focus.map((item, index) => (
            <div className="resume-role" key={item.label}>
              <span>{String(index + 1).padStart(2, '0')} · {item.label}</span>
              <div><h3>{item.title}</h3><p>{item.description}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section className="resume-section">
        <h2>MENTORING METHOD</h2>
        <div>
          {copy.activities.map((activity) => (
            <div className="resume-role" key={activity.type}>
              <span>{activity.type}</span>
              <div><h3>{activity.role}</h3><p>{activity.description}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section className="resume-section">
        <h2>SELECTED WORK</h2>
        <div>
          {work.map(({ metadata: original }) => {
            const metadata = localizeWorkMeta(original, locale);
            return (
              <div className="resume-role" key={metadata.slug}>
                <span>{metadata.period} · {metadata.role}</span>
                <div>
                  <h3><Link href={localizedPath(`/work/${metadata.slug}`, locale)}>{metadata.title} ↗</Link></h3>
                  <p>{metadata.summary}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="resume-section">
        <h2>CAPABILITIES</h2>
        <div className="capability-cloud">
          {profile.capabilities.map((capability) => <span key={capability}>{capability}</span>)}
        </div>
      </section>

      <section className="resume-section resume-section--contact">
        <h2>CONTACT</h2>
        <div className="case-links">
          <a href={buildMailto('career', locale)} className="button button--blue">{resumeCopy[locale].contact[0]}</a>
          <a href={buildMailto('project', locale)} className="button button--paper">{resumeCopy[locale].contact[1]}</a>
          <a href={buildMailto('education', locale)} className="button button--paper">{resumeCopy[locale].contact[2]}</a>
        </div>
      </section>
    </article>
  );
}
