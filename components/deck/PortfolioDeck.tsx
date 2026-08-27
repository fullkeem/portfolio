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
      block: '작동하게',
      outline: '만드는 사람',
      note: 'BUILD / GUIDE / SHIP',
      work: '작업 보기',
      resume: '이력서 보기',
    },
    position: {
      eyebrow: 'WHAT I ACTUALLY DO',
      title: '대신 만들지 않습니다.',
      accent: '끝까지 만들 수 있게 돕습니다.',
      body: '프리랜서 개발자로 제품을 직접 만들고, 프로젝트 실행 멘토로 팀이 문제 정의부터 배포까지 완주하도록 판단의 기준을 함께 세웁니다.',
      statement: 'ROUGH IDEA → WORKING PRODUCT',
    },
    practice: {
      eyebrow: 'THREE WAYS I WORK',
      title: '만들고, 구조화하고, 함께 완성합니다.',
    },
    method: {
      eyebrow: 'PROJECT EXECUTION FLOW',
      title: '막막함을 다음 행동으로 바꾸는 순서.',
      body: '교육과 멘토링에서는 정답을 전달하기보다, 팀이 스스로 다음 결정을 내릴 수 있도록 이 흐름을 함께 점검합니다.',
      steps: [
        ['01', 'PROBLEM', '실무의 고민을 한 문장의 문제로 좁힙니다.'],
        ['02', 'USER', '누가 언제 왜 사용하는지 분명히 합니다.'],
        ['03', 'FLOW', '반드시 작동해야 할 핵심 흐름을 고릅니다.'],
        ['04', 'DATA', '화면보다 먼저 필요한 데이터와 관계를 정리합니다.'],
        ['05', 'BUILD', '기간과 경험에 맞게 구현 순서를 나눕니다.'],
        ['06', 'SHIP', '배포하고 시연할 수 있는 상태까지 확인합니다.'],
      ],
    },
    explore: {
      eyebrow: 'OPEN THE APPENDIX',
      title: '더 자세히 보고 싶다면.',
      items: [
        ['WORK ARCHIVE', '직접 구현한 웹 제품과 프론트엔드 프로젝트', 'work'],
        ['WEB RESUME', '역할, 역량, 활동을 한 번에 확인하는 이력서', 'resume'],
        ['WRITING', '웹과 AI를 만들며 다시 정리한 생각과 기준', 'writing'],
      ],
      action: '열기',
    },
    contact: {
      eyebrow: 'LET’S MAKE IT REAL',
      title: '함께 만들거나,',
      accent: '함께 배우거나.',
      body: '프로젝트 목적과 현재 막혀 있는 지점을 알려주세요. 필요한 역할과 현실적인 다음 단계를 함께 정리하겠습니다.',
      links: ['채용 · 협업 문의', '외주 · 프로젝트 문의', '교육 · 멘토링 문의'],
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
      serif: 'Turn ideas',
      block: 'into working',
      outline: 'products',
      note: 'BUILD / GUIDE / SHIP',
      work: 'See selected work',
      resume: 'Review my resume',
    },
    position: {
      eyebrow: 'WHAT I ACTUALLY DO',
      title: 'I build products.',
      accent: 'I help teams ship theirs.',
      body: 'As a freelance frontend developer, I build and deploy web products. As a project execution mentor, I help teams decide what to build, how to structure the data, and what it will take to reach a working demo.',
      statement: 'FUZZY BRIEF → WORKING PRODUCT',
    },
    practice: {
      eyebrow: 'THREE WAYS I WORK',
      title: 'Build. Structure. Ship together.',
    },
    method: {
      eyebrow: 'PROJECT EXECUTION FLOW',
      title: 'A practical path from “stuck” to shipped.',
      body: 'In training and mentoring, I use this sequence to help each team make its own next decision instead of handing over a fixed answer.',
      steps: [
        ['01', 'PROBLEM', 'Reduce a broad workplace issue to one clear problem.'],
        ['02', 'USER', 'Clarify who uses it, when, and why.'],
        ['03', 'FLOW', 'Choose the one journey that must work first.'],
        ['04', 'DATA', 'Define the data and relationships before polishing screens.'],
        ['05', 'BUILD', 'Sequence the work around the team’s time and experience.'],
        ['06', 'SHIP', 'Reach a deployable, demonstrable result.'],
      ],
    },
    explore: {
      eyebrow: 'OPEN THE APPENDIX',
      title: 'Need the details?',
      items: [
        ['WORK ARCHIVE', 'Frontend products and web projects I built', 'work'],
        ['WEB RESUME', 'Roles, capabilities, and mentoring practice in one view', 'resume'],
        ['WRITING', 'Notes shaped while building web and AI products', 'writing'],
      ],
      action: 'Open',
    },
    contact: {
      eyebrow: 'LET’S MAKE IT REAL',
      title: 'Building something?',
      accent: 'Let’s make it work.',
      body: 'Tell me what you’re building and where it’s stuck. I’ll help you clarify the role, scope, and next practical step.',
      links: ['Discuss a role', 'Discuss a freelance project', 'Plan a training program'],
      direct: 'DIRECT EMAIL',
    },
  },
} as const;

export function PortfolioDeck({ locale }: { locale: Locale }) {
  const copy = deckCopy[locale];
  const localizedProfile = profileCopy[locale];
  const [current, setCurrent] = useState(0);
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
    if (Math.abs(delta) < 24 || wheelLocked.current) return;
    wheelLocked.current = true;
    goTo(current + (delta > 0 ? 1 : -1));
    window.setTimeout(() => { wheelLocked.current = false; }, 620);
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
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
                  <span>{copy.intro.serif}</span><strong>{copy.intro.block}</strong><em>{copy.intro.outline}</em>
                </h1>
                <div className="deck-intro__lens" aria-hidden="true"><span>AX</span></div>
                <div className="deck-intro__portrait">
                  <Image src="/images/default.webp" alt={locale === 'ko' ? 'Fullkeem 캐릭터 프로필' : 'Fullkeem character portrait'} width={160} height={160} priority />
                  <span>FULLKEEM / PROFILE</span>
                </div>
                <p className="deck-intro__body">{localizedProfile.introduction}</p>
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
                <span>{locale === 'ko' ? <>대신 만들지<br className="deck-mobile-break" /> 않습니다.</> : copy.position.title}</span>
                <strong>{copy.position.accent}</strong>
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
                <h2 id="deck-explore-title">{copy.explore.title}</h2>
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
              <h2 id="deck-contact-title"><span>{copy.contact.title}</span><strong>{copy.contact.accent}</strong></h2>
              <div className="deck-contact__bottom">
                <p>{copy.contact.body}</p>
                <div className="deck-contact__links">
                  <a href={buildMailto('career', locale)}>{copy.contact.links[0]} ↗</a>
                  <a href={buildMailto('project', locale)}>{copy.contact.links[1]} ↗</a>
                  <a href={buildMailto('education', locale)}>{copy.contact.links[2]} ↗</a>
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
