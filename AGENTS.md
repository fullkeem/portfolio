# AGENTS.md

김충만(Fullkeem)의 한영 포트폴리오 사이트다. Codex·Cursor는 이 파일을, Claude Code는 이 파일을 불러오는 `CLAUDE.md`를 읽는다. 진행 상황과 결정 기록은 `HANDOFF.md`, 영문 문체는 `content/i18n/en-portfolio-guide.md`를 따른다.

## 스택

- Next.js 15.5(App Router), React 19, TypeScript strict, pnpm
- 스타일: Tailwind CSS 3과 직접 작성한 CSS(`app/globals.css`, `app/deck.css`, `app/content-theme.css`)
- 콘텐츠: 로컬 MDX(`@next/mdx`)와 Zod 검증. DB·CMS·API 라우트는 없고, 문의는 메일 링크(`config/profile.ts`의 `buildMailto`)다.

## 명령

```bash
pnpm dev
pnpm lint
pnpm type-check
pnpm build
```

- 테스트 스크립트는 없다. 변경 후 lint·type-check·build를 실행하고, 화면 변경은 한영 × 기본/야간 × 데스크톱/모바일을 브라우저에서 확인한다.
- 개발 서버와 빌드를 같은 `.next`로 동시에 실행하지 않는다.

## 구조

- `app/`: 한국어는 루트(`/`, `/work`, `/resume`, `/writing`), 영어는 `app/en/` 아래에 있고 루트 레이아웃 하나를 함께 쓴다.
- `components/deck/PortfolioDeck.tsx`: 6장 슬라이드 홈과 한영 홈 문구
- `components/pages/`: Work·Writing 목록과 상세, Resume 화면
- `config/i18n.ts`: 언어 경로·메뉴·공통 문구 / `config/localized-content.ts`: 영문 사례·글 본문과 한영 프로필 문구 / `config/site.ts`: 사이트 메타데이터 / `config/theme.ts`: 테마 저장 키와 초기화 스크립트
- `lib/content.ts`: MDX 등록·검증·조회 / `types/content.ts`: 콘텐츠 타입
- `public/images/work/<slug>/`: 사례 이미지 / `public/fonts/`: JetBrains Mono, Pretendard 다이나믹 서브셋(`pretendard/`)
- `next.config.ts`: MDX 설정, 보안 헤더, 옛 Notion 시절 주소의 리다이렉트

## 콘텐츠 추가·수정

1. `content/work/` 또는 `content/writing/`에 기존 파일과 같은 형식(`export const metadata`)으로 MDX를 쓴다.
2. `lib/content.ts`에서 import하고 entries 배열에 등록한다. 파일만 만들면 등록되지 않는다.
3. `config/localized-content.ts`에 같은 slug의 영문 메타데이터와 본문을 쓴다.
4. 이미지는 `public/images/work/<slug>/`에 두고 `media`에 크기와 한영 alt·caption을 적는다.
5. 목록·상세·웹 이력서·언어 전환·사이트맵을 함께 확인한다.

Work의 category는 `types/content.ts`의 `workCategories`, accent는 `cobalt`·`lime`·`orange`·`ink` 중 하나다. Writing은 `draft: true`면 목록·상세에서 모두 빠진다. Work에는 draft 필드가 없다.

## 문구 원칙

- 역할은 `Developer, AX Tutor/Mentor`, 홈 제목은 "아이디어를 구현하다." / "Ideas, implemented."이다.
- 소개는 고객이 받는 결과 → 맡은 범위 → 실제 사례 → 제작 정보 순서로 쓴다.
- 직접 개발한 범위와 멘토로 조언한 범위를 구분한다. 멘티의 결과물을 본인이 만든 것처럼 쓰지 않고, PBL·해커톤을 AX와 같은 뜻으로 쓰지 않는다.
- 추상적인 자기소개, 과장된 성과, 근거 없는 수치, 직함 나열을 피한다.
- 영어는 의미와 기여 범위를 유지한 자연스러운 미국식 영어로 쓴다.

## 디자인 원칙

- 홈의 6장 슬라이드 구조와 타이포그래피를 유지한다. 긴 스크롤에 묶인 강한 애니메이션은 쓰지 않는다.
- 색은 `app/deck.css`의 테마 변수(`--blue` 등)로 정의되어 `html[data-theme]`에 따라 기본/야간이 함께 전환된다. 직접 쓴 색은 이 전환에서 빠진다. 승인 팔레트는 `docs/portfolio-theme.md`에 있다.
- 글꼴은 본문 Pretendard(`--font-pretendard`), 작은 라벨 JetBrains Mono(`--font-mono`)다.
- 키보드 이동, ARIA, 색 대비 같은 접근성을 유지한다.

## 메타데이터

- 페이지마다 `title`, `description`, `alternates`(canonical·hreflang)를 둔다.
- 루트 레이아웃의 `openGraph`·`twitter`에 title·description·url을 넣지 않는다. 하위 페이지가 통째로 물려받아 모든 공유 미리보기가 홈 내용이 된다.
- `<html lang>`은 서버에서 `ko`로 렌더링되고, `config/i18n.ts`의 `localeInitScript`와 `Header`가 브라우저에서 바로잡는다.

## 코드 규칙

- Prettier(작은따옴표, 세미콜론, 2칸, 폭 100, Tailwind 클래스 정렬)와 ESLint(`next/core-web-vitals`, `next/typescript`)를 따른다.
- 컴포넌트 파일은 PascalCase(`Header.tsx`), 그 밖의 모듈은 소문자·kebab-case(`localized-content.ts`)다. import는 `@/` 별칭을 쓴다.
- 서버 컴포넌트를 기본으로 하고, 상태·브라우저 API·경로 훅이 필요할 때만 `'use client'`를 쓴다.
- 이미지는 `next/image`로 넣는다.

## 하지 말 것

- `README.md`와 `docs/`의 옛 문서(`design.md`, `checklist.md`, `demo-scenario.md`, `performance-optimization.md`, `portfolio-masonry-wireframe.*`)는 예전 Notion·Supabase 구조 기록이다. 현재 구조의 근거로 쓰지 않는다.
- 커밋되지 않았거나 git에 없는 파일을 불필요하다고 판단해 지우거나 되돌리지 않는다.
- `output/`과 `.playwright-mcp/`는 git에서 제외된 로컬 산출물이다.
- ZEN SERIF 폰트 파일은 라이선스상 수정·재배포가 금지되어 있다. `public/`이나 저장소에 다시 넣지 않는다.
- 비밀값을 코드나 문서에 쓰지 않는다.
