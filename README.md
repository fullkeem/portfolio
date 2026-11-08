# Fullkeem Portfolio

김충만(Fullkeem)의 한·영 포트폴리오 사이트입니다. 외주 제품 개발과 AI 활용(AX) 교육·멘토링을 실제 사례 중심으로 소개합니다.

사이트: <https://portfolio-fullkeems-projects.vercel.app> (영문은 `/en`)

## 화면 구성

- **홈**: 6장 슬라이드(INTRO · POSITION · PRACTICE · METHOD · EXPLORE · CONTACT). 휠·스와이프·방향키로 넘기고, 현재 슬라이드를 URL 해시에 남깁니다.
- **Work**: 프로젝트 사례 목록과 상세(맡은 범위·기술·이미지)
- **Resume**: 웹 이력서와 인쇄·PDF 저장
- **Writing**: 글 목록과 상세
- **공통**: 한국어(`/`)·영어(`/en`), 기본·야간 테마, 페이지별 검색·공유 메타데이터, 사이트맵

## 기술 스택

| 영역 | 사용 기술 |
| --- | --- |
| 프레임워크 | Next.js 15.5(App Router), React 19, TypeScript |
| 스타일 | Tailwind CSS 3, 직접 작성한 CSS |
| 콘텐츠 | 로컬 MDX(`@next/mdx`), Zod 검증 |
| 글꼴 | Pretendard(다이나믹 서브셋), JetBrains Mono |
| 배포 | Vercel |

데이터베이스·CMS·API 서버는 없고, 문의는 메일 링크로 받습니다.

## 시작하기

Node.js 18.18 이상과 pnpm이 필요합니다.

```bash
pnpm install
pnpm dev
```

| 명령 | 설명 |
| --- | --- |
| `pnpm dev` | 개발 서버(<http://localhost:3000>) |
| `pnpm build`, `pnpm start` | 운영 빌드와 실행 |
| `pnpm lint` | ESLint 검사 |
| `pnpm type-check` | TypeScript 검사 |
| `pnpm build:analyze` | 번들 분석 빌드 |

개발 서버와 빌드를 같은 `.next` 폴더로 동시에 실행하지 마세요.

### 환경 변수

모두 선택 사항이며 기본값이 있습니다.

| 변수 | 용도 |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | 사이트 주소(메타데이터·사이트맵 기준) |
| `NEXT_PUBLIC_SITE_NAME` | 사이트 이름 |
| `NEXT_PUBLIC_SITE_DESCRIPTION` | 사이트 설명 |
| `NEXT_PUBLIC_EMAIL` | 문의 메일 주소 |
| `NEXT_PUBLIC_GITHUB_URL` | GitHub 링크 |
| `NEXT_PUBLIC_LINKEDIN_URL` | LinkedIn 링크 |

## 폴더 구조

```text
app/          라우트(한국어는 루트, 영어는 app/en), 전역 CSS, 메타데이터
components/   홈 슬라이드(deck), 페이지 화면(pages), 공통 UI(common)
config/       언어·영문 콘텐츠·프로필·사이트·테마 설정
content/      Work·Writing MDX, 영문 스타일 가이드
lib/          콘텐츠 등록·검증, 구조화 데이터(JSON-LD)
public/       이미지, 글꼴
docs/         테마 기준과 작업 기록
```

## 콘텐츠 추가

1. `content/work/` 또는 `content/writing/`에 기존 파일과 같은 형식으로 MDX를 씁니다.
2. `lib/content.ts`에서 import해 목록에 등록합니다. 파일만 만들면 등록되지 않습니다.
3. `config/localized-content.ts`에 같은 slug의 영문 내용을 씁니다.
4. 사례 이미지는 `public/images/work/<slug>/`에 둡니다.

## 문서

- [AGENTS.md](AGENTS.md): 구조와 작업 규칙(사람과 AI 도구 공용)
- [HANDOFF.md](HANDOFF.md): 현재 상태와 남은 작업
- [docs/portfolio-theme.md](docs/portfolio-theme.md): 승인된 테마 기준
- [content/i18n/en-portfolio-guide.md](content/i18n/en-portfolio-guide.md): 영문 문체 가이드

`docs/`의 `design.md`, `checklist.md`, `demo-scenario.md`, `performance-optimization.md`, `portfolio-masonry-wireframe.*`는 이전 Notion·Supabase 구조의 기록입니다.
