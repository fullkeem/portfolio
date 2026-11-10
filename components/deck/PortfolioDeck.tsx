'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { PointerEvent, WheelEvent } from 'react';
import { profile, buildMailto } from '@/config/profile';
import { profileCopy } from '@/config/localized-content';
import { localizedPath } from '@/config/i18n';
import type { Locale } from '@/types/locale';

const deckCopy = {
  ko: {
    slides: ['INTRO', 'POSITION', 'PRACTICE', 'METHOD', 'EXPLORE', 'CONTACT'],
    status: '현재 슬라이드',
    previous: '이전 슬라이드',
    next: '다음 슬라이드',
    keyboard: '휠 · 스와이프 · 방향키로 이동',
    intro: {
      kicker: 'KIM CHOONGMAN PRESENTS',
      serif: '아이디어를',
      block: '구현하다.',
      summaryLabel: 'BUILD PRODUCTS. TEACH WHAT YOU PRACTICE.',
      summaryNote: '웹사이트·CMS 개발 · AI 교육·멘토링',
      note: 'BUILD / MANAGE / GUIDE',
      work: '작업 보기',
      resume: '이력서 보기',
    },
    position: {
      eyebrow: 'WHAT I ACTUALLY DO',
      title: '고객의 웹을 만들고,',
      accent: 'AI 활용을 가르칩니다.',
      body: '상담이 접수되는 웹사이트부터 직접 내용을 수정하는 CMS까지, 고객이 쓰고 관리할 수 있는 결과물을 만듭니다. 요구사항 정리, 화면·서버 개발과 배포, 공개 이후의 개선을 연결합니다. 교육에서는 AI 업무 적용과 프로젝트 구현을 지도합니다.',
      statement: 'DEVELOPMENT × EDUCATION',
    },
    practice: {
      eyebrow: 'THREE WAYS I WORK',
      title: '제품 개발, AI 적용, 교육과 멘토링.',
    },
    method: {
      eyebrow: 'PROJECT EXECUTION FLOW',
      title: '문제 정의부터 배포까지.',
      body: '각 단계에서 결정할 내용과 남길 결과물을 정리합니다. 교육과 멘토링에서도 같은 기준으로 프로젝트를 점검합니다.',
      steps: [
        ['01', 'PROBLEM', '해결할 문제와 목표를 한 문장으로 정리합니다.'],
        ['02', 'USER', '대상 사용자와 실제 사용 상황을 정리합니다.'],
        ['03', 'FLOW', '핵심 사용자 흐름과 필요한 기능을 고릅니다.'],
        ['04', 'DATA', '필요한 데이터와 관계를 구조로 남깁니다.'],
        ['05', 'BUILD', '기능의 우선순위와 구현 순서를 정합니다.'],
        ['06', 'SHIP', '배포 주소와 시연 흐름으로 동작을 확인합니다.'],
      ],
    },
    explore: {
      eyebrow: 'OPEN THE APPENDIX',
      title: '작업으로 확인하기.',
      items: [
        ['WORK ARCHIVE', '꼼꼼환경의 견적 접수 웹사이트와 강사 프로필·CMS. 실제 화면과 개발·운영 범위를 확인하세요.', 'work'],
        ['WEB RESUME', '개발 역량과 기업교육·PBL·해커톤의 지도 범위를 정리했습니다.', 'resume'],
        ['WRITING', 'SEO·AEO·GEO: 웹 콘텐츠의 발견과 이해를 위한 기준을 기록합니다.', 'writing'],
      ],
      action: '열기',
    },
    contact: {
      eyebrow: 'LET’S MAKE IT REAL',
      title: '함께할 프로젝트,',
      accent: '필요한 교육.',
      body: '개발은 목적·일정·필요한 기능을, 교육은 대상·주제·요청 역할을 알려주세요. 함께할 수 있는 범위를 확인하겠습니다.',
      links: ['개발 프로젝트 문의', '교육 · 멘토링 문의', '채용 · 기타 협업 문의'],
      direct: 'DIRECT EMAIL',
    },
  },
  en: {
    slides: ['INTRO', 'POSITION', 'PRACTICE', 'METHOD', 'EXPLORE', 'CONTACT'],
    status: 'Current slide',
    previous: 'Previous slide',
    next: 'Next slide',
    keyboard: 'Use wheel · swipe · arrow keys',
    intro: {
      kicker: 'KIM CHOONGMAN PRESENTS',
      serif: 'Ideas,',
      block: 'implemented.',
      summaryLabel: 'BUILD PRODUCTS. TEACH WHAT YOU PRACTICE.',
      summaryNote: 'Websites & CMS · AI training & mentoring',
      note: 'BUILD / MANAGE / GUIDE',
      work: 'See selected work',
      resume: 'Review my resume',
    },
    position: {
      eyebrow: 'WHAT I ACTUALLY DO',
      title: 'I build for clients.',
      accent: 'I teach AI in practice.',
      body: 'I connect websites to real work: a quote request that reaches the business, or a profile the client can update through a CMS. My scope spans requirements, frontend and backend development, deployment, and improvements after launch. I also teach AI use and mentor project implementation.',
      statement: 'DEVELOPMENT × EDUCATION',
    },
    practice: {
      eyebrow: 'THREE WAYS I WORK',
      title: 'Development. AI practice. Mentoring.',
    },
    method: {
      eyebrow: 'PROJECT EXECUTION FLOW',
      title: 'From problem to deployment.',
      body: 'Each step has a decision to make and an output to review. I use the same checkpoints in training and mentoring.',
      steps: [
        ['01', 'PROBLEM', 'Write down the problem and goal in one sentence.'],
        ['02', 'USER', 'Describe the intended user and their situation.'],
        ['03', 'FLOW', 'Map the core user journey and required features.'],
        ['04', 'DATA', 'Document the data structure and relationships.'],
        ['05', 'BUILD', 'Set feature priorities and the order of implementation.'],
        ['06', 'SHIP', 'Verify the deployed product with a working demo.'],
      ],
    },
    explore: {
      eyebrow: 'OPEN THE APPENDIX',
      title: 'See the work.',
      items: [
        ['WORK ARCHIVE', 'Ggomggom’s quote request website and an instructor profile with a CMS. See the screens, implementation, and work after launch.', 'work'],
        ['WEB RESUME', 'Development skills and my scope in corporate training, PBL, and hackathons.', 'resume'],
        ['WRITING', 'SEO, AEO, and GEO: notes on helping people and search systems discover web content.', 'writing'],
      ],
      action: 'Open',
    },
    contact: {
      eyebrow: 'LET’S MAKE IT REAL',
      title: 'Your next project.',
      accent: 'Your next workshop.',
      body: 'For development, share the goal, timeline, and features. For training, share the audience, topic, and role you need. We can then define the scope.',
      links: ['Discuss a development project', 'Plan training or mentoring', 'Discuss a role or collaboration'],
      direct: 'DIRECT EMAIL',
    },
  },
} as const;

export function PortfolioDeck({ locale }: { locale: Locale }) {
  const copy = deckCopy[locale];
  const localizedProfile = profileCopy[locale];
  const [current, setCurrent] = useState(0);
  const [isGreeting, setIsGreeting] = useState(false);
  const wheelLocked = useRef(false);
  const pointerStart = useRef<{ x: number; y: number } | null>(null);

  const goTo = useCallback((nextIndex: number) => {
    const bounded = Math.max(0, Math.min(copy.slides.length - 1, nextIndex));
    setCurrent(bounded);
    const hash = `#${copy.slides[bounded].toLowerCase()}`;
    window.history.replaceState(null, '', `${window.location.pathname}${hash}`);
    window.dispatchEvent(new Event('hashchange'));
  }, [copy.slides]);

  useEffect(() => {
    document.body.classList.add('deck-open');
    const syncHash = () => {
      const hash = window.location.hash.slice(1).toUpperCase();
      const hashIndex = copy.slides.findIndex((slide) => slide === hash);
      if (hashIndex >= 0) setCurrent(hashIndex);
    };
    syncHash();
    window.addEventListener('hashchange', syncHash);

    return () => {
      document.body.classList.remove('deck-open');
      window.removeEventListener('hashchange', syncHash);
    };
  }, [copy.slides]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      if (event.target instanceof HTMLElement && event.target.closest('a, button, input, textarea, select, [contenteditable]')) return;
      if (event.key === 'ArrowRight' || event.key === 'PageDown') {
        event.preventDefault();
        goTo(current + 1);
      }
      if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
        event.preventDefault();
        goTo(current - 1);
      }
      if (event.key === 'Home') goTo(0);
      if (event.key === 'End') goTo(copy.slides.length - 1);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [copy.slides.length, current, goTo]);

  const onWheel = (event: WheelEvent<HTMLDivElement>) => {
    const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    const slide = event.currentTarget.querySelector<HTMLElement>('.deck-slide[aria-hidden="false"]');
    if (Math.abs(event.deltaY) > Math.abs(event.deltaX) && slide && slide.scrollHeight > slide.clientHeight + 1) return;
    if (Math.abs(delta) < 24 || wheelLocked.current) return;
    wheelLocked.current = true;
    goTo(current + (delta > 0 ? 1 : -1));
    window.setTimeout(() => { wheelLocked.current = false; }, 620);
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    if (event.target instanceof Element && event.target.closest('a, button')) return;
    pointerStart.current = { x: event.clientX, y: event.clientY };
  };

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (!pointerStart.current) return;
    const deltaX = pointerStart.current.x - event.clientX;
    const deltaY = pointerStart.current.y - event.clientY;
    pointerStart.current = null;
    if (Math.abs(deltaX) < 42 || Math.abs(deltaX) < Math.abs(deltaY)) return;
    goTo(current + (deltaX > 0 ? 1 : -1));
  };

  return (
    <div
      className="deck"
      onWheel={onWheel}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={() => { pointerStart.current = null; }}
    >
      <p className="sr-only" aria-live="polite">{copy.status}: {current + 1} / {copy.slides.length}, {copy.slides[current]}</p>
      <div className="deck__viewport">
        <div className="deck__track" style={{ transform: `translate3d(-${current * 100}%, 0, 0)` }}>
          <section className="deck-slide deck-slide--intro" aria-labelledby="deck-intro-title" aria-hidden={current !== 0} inert={current !== 0}>
            <div className="deck-slide__frame">
              <div className="deck-slide__meta"><span>PORTFOLIO · 2026</span><span>SEOUL · KOREA</span><span>{copy.intro.note}</span></div>
              <div className={`deck-intro__stage deck-intro__stage--${locale}`}>
                <p className="deck-kicker">{copy.intro.kicker}</p>
                <h1 id="deck-intro-title" className={locale === 'en' ? 'deck-intro__title deck-intro__title--en' : 'deck-intro__title'}>
                  <span>{copy.intro.serif}</span><strong className="deck-accent">{copy.intro.block}</strong>
                </h1>
                <button
                  type="button"
                  className={`deck-intro__portrait${isGreeting ? ' deck-intro__portrait--greeting' : ''}`}
                  aria-label={locale === 'ko' ? 'Fullkeem에게 인사하기' : 'Say hello to Fullkeem'}
                  aria-pressed={isGreeting}
                  onClick={() => setIsGreeting((greeting) => !greeting)}
                  onMouseLeave={() => setIsGreeting(false)}
                  onBlur={() => setIsGreeting(false)}
                >
                  <span className="deck-intro__portrait-images" aria-hidden="true">
                    <Image className="deck-intro__portrait-image deck-intro__portrait-image--default" src="/images/default.webp" alt="" fill sizes="(max-width: 900px) 92px, 128px" priority />
                    <Image className="deck-intro__portrait-image deck-intro__portrait-image--hello" src="/images/hello.webp" alt="" fill sizes="(max-width: 900px) 92px, 128px" priority />
                  </span>
                  <span>FULLKEEM / PROFILE</span>
                </button>
                <div className="deck-intro__summary">
                  <p className="deck-intro__summary-label">{copy.intro.summaryLabel}</p>
                  <p className="deck-intro__body">{localizedProfile.introduction}</p>
                  <p className="deck-intro__summary-note">{copy.intro.summaryNote}</p>
                </div>
                <div className="deck-intro__roles" aria-label={locale === 'ko' ? '주요 역할' : 'Primary roles'}>
                  {localizedProfile.roles.map((role) => <span key={role}>{role}</span>)}
                </div>
                <div className="deck-intro__actions">
                  <Link href={localizedPath('/work', locale)} className="button button--blue">{copy.intro.work}</Link>
                  <Link href={localizedPath('/resume', locale)} className="button button--paper">{copy.intro.resume}</Link>
                </div>
              </div>
            </div>
          </section>

          <section className="deck-slide deck-slide--position" aria-labelledby="deck-position-title" aria-hidden={current !== 1} inert={current !== 1}>
            <div className={`deck-position deck-position--${locale}`}>
              <p className="deck-kicker">02 · {copy.position.eyebrow}</p>
              <h2 id="deck-position-title">
                <span>{copy.position.title}</span>
                <strong className="deck-accent">{copy.position.accent}</strong>
              </h2>
              <div className="deck-position__footer">
                <p>{copy.position.body}</p>
                <div aria-hidden="true">{copy.position.statement}</div>
              </div>
            </div>
          </section>

          <section className="deck-slide deck-slide--practice" aria-labelledby="deck-practice-title" aria-hidden={current !== 2} inert={current !== 2}>
            <div className="deck-practice">
              <div className="deck-practice__heading">
                <p className="deck-kicker">03 · {copy.practice.eyebrow}</p>
                <h2 id="deck-practice-title">{copy.practice.title}</h2>
              </div>
              <div className="deck-practice__grid">
                {localizedProfile.focus.map((item, index) => (
                  <article key={item.label}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <p className="deck-kicker">{item.label}</p>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="deck-slide deck-slide--method" aria-labelledby="deck-method-title" aria-hidden={current !== 3} inert={current !== 3}>
            <div className="deck-method">
              <div className="deck-method__intro">
                <p className="deck-kicker">04 · {copy.method.eyebrow}</p>
                <h2 id="deck-method-title">{copy.method.title}</h2>
                <p>{copy.method.body}</p>
              </div>
              <ol className="deck-method__steps">
                {copy.method.steps.map(([number, title, description]) => (
                  <li key={number}><span>{number}</span><strong>{title}</strong><p>{description}</p></li>
                ))}
              </ol>
            </div>
          </section>

          <section className="deck-slide deck-slide--explore" aria-labelledby="deck-explore-title" aria-hidden={current !== 4} inert={current !== 4}>
            <div className="deck-explore">
              <div>
                <p className="deck-kicker">05 · {copy.explore.eyebrow}</p>
                <h2 id="deck-explore-title" className="deck-accent">{copy.explore.title}</h2>
              </div>
              <div className="deck-explore__list">
                {copy.explore.items.map(([title, description, href], index) => (
                  <Link href={localizedPath(`/${href}`, locale)} key={title}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <div><strong>{title}</strong><p>{description}</p></div>
                    <em>{copy.explore.action} ↗</em>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className="deck-slide deck-slide--contact" aria-labelledby="deck-contact-title" aria-hidden={current !== 5} inert={current !== 5}>
            <div className="deck-contact">
              <p className="deck-kicker">06 · {copy.contact.eyebrow}</p>
              <h2 id="deck-contact-title"><span>{copy.contact.title}</span><strong className="deck-accent">{copy.contact.accent}</strong></h2>
              <div className="deck-contact__bottom">
                <p>{copy.contact.body}</p>
                <div className="deck-contact__links">
                  <a href={buildMailto('project', locale)}>{copy.contact.links[0]} ↗</a>
                  <a href={buildMailto('education', locale)}>{copy.contact.links[1]} ↗</a>
                  <a className="deck-contact__secondary" href={buildMailto('career', locale)}>{copy.contact.links[2]} ↗</a>
                </div>
                <a className="deck-contact__email" href={`mailto:${profile.email}`}><span>{copy.contact.direct}</span>{profile.email}</a>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="deck-controls" aria-label={locale === 'ko' ? '슬라이드 탐색' : 'Slide navigation'}>
        <button type="button" onClick={() => goTo(current - 1)} disabled={current === 0} aria-label={copy.previous}>← <span>PREV</span></button>
        <div className="deck-controls__progress">
          {copy.slides.map((slide, index) => (
            <button key={slide} type="button" onClick={() => goTo(index)} aria-label={`${index + 1}. ${slide}`} aria-current={current === index ? 'step' : undefined}>
              <span>{String(index + 1).padStart(2, '0')}</span>
            </button>
          ))}
        </div>
        <p>{copy.keyboard}</p>
        <button type="button" onClick={() => goTo(current + 1)} disabled={current === copy.slides.length - 1} aria-label={copy.next}><span>NEXT</span> →</button>
      </div>
    </div>
  );
}
