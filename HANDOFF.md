# Fullkeem 포트폴리오 인수인계

작성일: 2026-11-06 · 갱신: 2026-11-08 · 시간대: Asia/Seoul  
작업 폴더: `/Users/fullkeem/fullkeem_portfolio`  
목적: 다음 작업자가 기존 대화를 다시 읽지 않고도 현재 상태, 결정 이유, 남은 일을 이어받을 수 있도록 정리한다.

## 1. 가장 먼저 알아둘 현재 상태

- **현재 사이트는 Next.js + 로컬 MDX 기반의 한·영 포트폴리오다.** 홈은 6장 슬라이드이고, Work·Resume·Writing은 일반 문서형 페이지다.
- 포지셔닝은 **`Developer, AX Tutor/Mentor`**. 외주 제품 개발과 AI 활용 교육·멘토링을 함께 소개한다. 직접 개발한 범위와 멘티에게 조언한 범위를 구분한다.
- Work는 **7건**, 공개 Writing은 **1건**이다. 꼼꼼환경과 강사 프로필 + CMS를 기존 5개 프로젝트 앞에 추가했다.
- 기본/야간 테마, 전체 영문화, 외주 사례 이미지 갤러리가 구현되어 있다.
- 현재 브랜치는 **`develop`**이다. 마지막으로 푸시된 커밋은 **`f3d799c`** (`feat: rebuild portfolio as bilingual slide deck`, 2026-08-27)이고, 이후의 테마·콘텐츠·이미지 작업과 2026-11-06~08 정리 작업은 2026-11-08에 **로컬 커밋했다(푸시·배포 전)**.
- 로컬의 `origin/develop` 참조도 같은 커밋이다. 이번 정리에서는 fetch나 원격 배포 상태 확인을 하지 않았으므로 원격의 최신 상태를 보증하지 않는다.
- 일부 docs는 **폐기된 Notion·Supabase 기반 구조**를 설명한다. README는 2026-11-08에 현재 구조로 다시 썼다. 현재 구현 판단은 소스와 이 문서, 최근 계획서를 우선한다.

전체 대화별 진행 기록과 결정 변화는 [프로젝트 작업 이력](docs/project-history.md)에 정리했다.

## 2. 조사 범위와 근거

Codex의 로컬 활성·보관 대화 목록을 끝까지 조회하고, 프로젝트 ID 또는 작업 폴더가 일치하는 과거 대화 **4개, 총 46개 턴**을 이전 페이지까지 읽었다. 이번 문서화 대화는 별도다. 제목만 보고 요약하지 않고 사용자 요청과 실제 응답·작업 기록을 현재 파일과 대조했다.

| 대화 | 범위 | 핵심 내용 |
| --- | --- | --- |
| 포트폴리오 사이트 리디자인 계획 | 2026-08-13~09-01, 28턴 | 재설계, Git 연결 복구, MDX 이전, 폰트, 슬라이드·영문화, 커밋·푸시, 인사 인터랙션, 콘텐츠 관리 제안 |
| 영문 포트폴리오 번역 스킬 찾기 | 2026-08-27, 1턴 | translation → copywriting 작업 방식 선정 |
| 포트폴리오 개편 계획 수립 | 2026-09-08~10-15, 12턴 | 역할·문구 개편, 기본/야간 테마, 전 페이지 확장, 영문 PDF, Upwork 프로필 상담 |
| ggomggom 스레드 결과물 접근 확인 | 2026-10-16~10-22, 5턴 | 외주 2건 조사·계획·구현, CMS 캡처의 인물 사진 교체 |

대화 식별자는 이력 문서에 보관했다. 조회 가능한 대화 기록을 기준으로 하며, 삭제된 대화·다른 호스트·다른 앱의 대화까지 복원했다는 의미는 아니다. ggomggom·강사 CMS 원본 프로젝트의 별도 대화 전체를 이번에 다시 조사하지는 않았다. 해당 프로젝트의 사실은 포트폴리오 대화 및 이미 작성된 조사 문서의 범위로 인용한다.

상태 표현은 다음처럼 구분한다.

- **구현 확인:** 현재 소스·파일에서 확인할 수 있음.
- **당시 검증 기록:** 과거 대화나 문서에 성공 기록이 있음. 오늘 재실행한 결과와 다름.
- **제안/보류:** 대화에서 논의했지만 현재 구현에는 없음.
- **미확인:** 원격 배포, 외부 서비스 운영 상태 등 이번 작업에서 확인하지 않음.

## 3. 확정된 제품·콘텐츠 방향

### 방문자와 역할

외주 고객, 채용 담당자, 기업교육·PBL·해커톤 운영자가 대상이다. 프론트엔드만 하는 사람으로 제한하지 않고 요구사항 정리부터 화면·서버·CMS·배포·공개 이후 개선까지 실제 맡은 범위를 보여준다.

멘토링에서는 문제 정의, 사용자 흐름, 기능 범위, 데이터 관계, 구현 우선순위, 배포·시연에 대한 조언을 설명한다. 멘티가 직접 만든 결과물을 본인이 전부 개발한 것처럼 소개하지 않는다. PBL·해커톤 자체를 AX와 동일한 의미로 취급하지 않는다.

### 승인된 표현과 시각 방향

- 홈 제목: **“아이디어를 구현하다.” / “Ideas, implemented.”**
- 역할: **`Developer, AX Tutor/Mentor`**.
- 소개 순서: **고객이 받는 결과 → 맡은 범위 → 실제 사례 → 제작 정보**.
- “~하는 사람” 같은 추상적인 소개, 과장된 성과, 불필요한 직함 나열을 피한다.
- 홈의 슬라이드 구조와 개성 있는 타이포그래피를 유지한다. 긴 스크롤에 묶인 강한 연출은 사용자가 선호하지 않았다.
- 01·02·05·06은 중립 배경과 제목의 색상 강조, 03·04는 색면 구성을 유지한다. 야간 발광은 큰 제목·핵심 단어 위주다.
- 디자인은 SVG 기반 기본/야간 시안을 확인한 뒤 승인되었다. 당시 `/private/tmp` 시안은 임시 산출물이므로 영구 자료로 의존하지 않는다.
- 한영 번역은 의미·기여 범위를 유지하고 자연스러운 미국식 영어로 편집한다. 세부 기준은 [영문 가이드](content/i18n/en-portfolio-guide.md)를 따른다.

## 4. 현재 기술 구조

`package.json` 기준 Next.js **15.5.23**, React **19.0.0**, TypeScript **^5.7.2**, Tailwind CSS **^3.4.16**, MDX 3 계열, Zod 3 계열을 사용한다. 최신 버전 추천이 아니라 저장소에 선언된 버전이다.

| 위치 | 현재 역할 |
| --- | --- |
| `app/page.tsx`, `app/en/page.tsx` | 한영 홈 진입점 |
| `components/deck/PortfolioDeck.tsx` | 홈 6장, 한영 홈 문구, 슬라이드 이동, 프로필 인사 |
| `components/pages/` | Work 목록·상세, Resume, Writing 공통 렌더러 |
| `components/common/Header.tsx` | 공통 탐색·언어·테마 전환 |
| `components/common/ThemeToggle.tsx`, `config/theme.ts` | 테마 선택·저장·첫 페인트 전 초기화 |
| `app/globals.css` | 공통 레이아웃·기존 기본 스타일 |
| `app/deck.css` | 홈 슬라이드, 테마 토큰, 전환과 반응형 |
| `app/content-theme.css` | 콘텐츠 페이지 테마, 제작 정보, 갤러리·인쇄 스타일 |
| `content/work/*.mdx`, `content/writing/*.mdx` | 한국어 메타데이터와 본문 |
| `lib/content.ts` | MDX 명시적 import·등록, Zod 검증, 정렬·조회 |
| `types/content.ts` | Work·Writing·다국어 미디어 타입 |
| `config/localized-content.ts` | 영문 사례·글 본문, 한영 프로필 데이터 |
| `config/profile.ts`, `config/i18n.ts`, `config/site.ts` | 프로필·문의, 언어 경로·공통 문구, 사이트 메타데이터 |
| `lib/utils/seo.ts`, `components/seo/JsonLd.tsx` | SEO·구조화 데이터 |
| `app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.tsx` | 사이트맵·검색 안내·공유 이미지 |
| `next.config.ts` | MDX, 이미지, 보안 헤더, 이전 주소 리다이렉트 |
| `public/fonts/`, `public/images/` | 로컬 폰트·캐릭터·사례 이미지 |

주요 경로는 `/`, `/work`, `/work/[slug]`, `/resume`, `/writing`, `/writing/[slug]`와 각각의 `/en` 버전이다. 예전 `/portfolio`, `/blog` 및 알려진 개별 프로젝트 주소의 리다이렉트가 설정되어 있다. 삭제된 모든 옛 경로가 자동 대응된다고 가정하지 않는다.

Notion API, Supabase 댓글, Giscus, EmailJS 문의 폼, GSAP·Framer Motion·Lenis는 현재 구조에서 제거되었다. 포트폴리오 자체는 CMS 관리자나 접수 서버가 없으며 문의는 이메일 링크를 사용한다. 사례로 소개하는 외주 CMS의 기능과 이 저장소의 기능을 혼동하지 않는다.

폰트는 JetBrains Mono만 `next/font/local`로 등록한다. Pretendard는 2026-11-06부터 공식 다이나믹 서브셋(pretendard@1.3.9의 CSS·woff2 92개·OFL 라이선스, `public/fonts/pretendard/`)을 `app/layout.tsx`에서 불러오며, `--font-pretendard`와 대체 글꼴 보정은 `app/globals.css`에 있다. 쓰지 않게 된 기존 `public/fonts/PretendardVariable.woff2`는 2026-11-08에 지웠다. ZEN SERIF는 화면에서 쓰지 않아 같은 날 등록을 뺐고, 폰트에 들어 있는 라이선스가 수정·재배포를 금지하므로 TTF·OTF·WOFF2를 git 제외 폴더 `output/fonts/`로 옮겼다. 이미 푸시된 `f3d799c` 기록에는 남아 있다.

## 5. 구현된 주요 동작

- 홈: INTRO → POSITION → PRACTICE → METHOD → EXPLORE → CONTACT.
- 버튼·방향키·휠·포인터 스와이프/드래그로 이동하며 URL 해시를 저장·복원한다. 언어 전환 시 대응 경로와 홈 해시를 유지한다.
- 작은 화면의 세로로 넘치는 슬라이드는 내부 내용을 스크롤할 수 있다.
- 프로필: `default.webp`에서 hover·키보드 focus 시 `hello.webp`로 전환한다. 모바일에서는 탭으로 인사 상태를 토글한다.
- 한국어 테마 버튼은 **기본 / 야간**, 영어는 **Light / Dark**. 첫 방문은 기본 모드이며 시스템 테마 자동 선택이 아니다.
- `fullkeem-theme` 저장값을 첫 페인트 전에 복원한다. 저장소 접근 실패 시 기본 모드를 사용한다.
- `--theme-progress`로 배경·글자·테두리·강조·발광을 520ms 동안 함께 전환한다. 모션 줄이기 설정에서는 즉시 전환한다.
- Work 상세는 선택적 제작 기간, 외주 여부, 공개 링크 이름, 한영 이미지 설명·캡션을 지원한다. 갤러리는 데스크톱 2열·모바일 1열이며 원본 크게 보기를 제공한다.
- Resume는 인쇄/PDF 저장 버튼이 있으며 현재 **Work 7건 전체**를 표시한다. `featured`만 보여주는 방식은 아직 제안이다.

## 6. 콘텐츠 현황

| 표시 순서 | 프로젝트 / 슬러그 | 분류·연도 | 현재 상태 |
| --- | --- | --- | --- |
| 1 | 꼼꼼환경 / `ggomggom` | Product · 2026 | 외주, 한영 사례·이미지 2장, 제작 2주·1인 전 범위 |
| 2 | 강사 프로필 + CMS / `instructor-profile-cms` | Product · 2026 | 외주, 한영 사례·이미지 2장, 공개 데모 |
| 3 | MagPlus / `magplus` | Frontend · 2025 | 기존 프로젝트 유지 |
| 4 | Shoong! / `shoong` | Product · 2025 | 기존 프로젝트 유지 |
| 5 | 서울렛 / `seoullette` | Product · 2025 | 기존 프로젝트 유지 |
| 6 | At the Place / `at-the-place` | Frontend · 2025 | 기존 프로젝트 유지 |
| 7 | Seojae-check / `seojae-check` | Frontend · 2025 | 기존 프로젝트 유지 |

Writing은 `seo-aeo-geo` 1건이다. 기존 프로젝트 일괄 삭제는 논의했지만 실행하지 않았다. AX·교육 카테고리는 타입상 가능하나 현재 등록된 Work에는 해당 분류의 구체적인 사례가 없다.

### 꼼꼼환경의 사실 기준

사용자가 **1인·모든 범위·제작 기간 2주**를 확인했다. 이후 유지보수는 제작 2주와 구분한다. 서비스 안내, 3단계 견적 신청, 서버 검증, Turnstile, Resend 접수 메일, 실제 접수 성공 기준의 전환 추적을 설명한다.

등록 링크는 [gomgom2.kr](https://gomgom2.kr/)다. 저장소는 당시 비공개로 확인해 공개 GitHub 버튼을 생략했다. 문의·매출 증가율은 확인된 성과가 아니다. 기본 접수 메일 수신 확인과 후속 참조 수신자 기능의 실제 수신 미확인은 구분한다. 상세 근거는 [초기 조사](docs/ggomggom-case-study-plan.md)에 있다.

### 강사 프로필 + CMS의 사실 기준

React 관리자, Hono 공개 사이트/API, D1 게시 데이터, R2 미디어를 사용한 외주 결과물이다. 임시저장·미리보기·게시, 편집 충돌 감지, 이미지 공개 범위와 인증을 설명한다.

등록 링크는 [공개 데모](https://profile.kentoas.workers.dev/)이며 샘플 데이터다. 클라이언트 실서비스라고 표기하지 않는다. 인원·제작 기간을 임의로 확정하지 않는다. 저장소 공개 버튼은 생략한다.

2026-10-22에 요청받은 인물 사진으로 **포트폴리오용 홈 캡처**를 교체했다. 현재 참조는 `public/images/work/instructor-profile-cms/home-kim-gaebal.webp`이다. 교체 전 `home.webp`는 공개 자산에 섞이지 않도록 2026-11-06에 `output/client-projects-20261020/instructor-home-old.webp`로 옮겼다. 이는 캡처용 화면의 사진 교체이며 원본 CMS 데이터 변경·재배포를 의미하지 않는다.

## 7. 콘텐츠를 추가하거나 수정하는 방법

1. Work는 `content/work/`, Writing은 `content/writing/`에 기존 형식의 MDX를 작성한다.
2. `lib/content.ts`에서 import하고 해당 entries 배열에 등록한다. **파일만 생성하면 자동 등록되지 않는다.**
3. `config/localized-content.ts`에 같은 slug의 영문 메타데이터와 본문을 작성한다.
4. Work 이미지가 있다면 `public/images/work/<slug>/`에 두고 `media`에 크기·한영 alt·caption을 지정한다.
5. 목록·상세·웹 이력서·언어 전환·사이트맵을 함께 확인한다. 홈 EXPLORE 문구는 별도 편집 대상이다.

Work의 필수/선택 필드는 `lib/content.ts`와 `types/content.ts`가 기준이다. category는 `AX`, `Product`, `Frontend`, `Education`; accent는 `cobalt`, `lime`, `orange`, `ink` 중 하나다. Writing은 `draft: true`일 때 공개 목록에서 제외된다. **Work에는 아직 draft 필드가 없다.**

콘텐츠 관리의 남은 제약:

- 프로필 문구가 `localized-content.ts`, `PortfolioDeck.tsx`에 나뉘어 있어 동기화 확인이 필요하다. `profile.ts`에는 화면에 쓰이지 않던 문구 사본을 2026-11-08에 지우고 이름·연락처·`capabilities`·`buildMailto`만 남겼다.
- 한국어 MDX와 영어 본문이 다른 위치에 있다. 번역 누락을 자동으로 숨기는 구조는 아직 구현되지 않았다.
- CMS와 MagPlus의 `order`가 둘 다 1이다. 현재 배열 등록 순서로 CMS가 먼저 나오므로 등록·정렬 변경 시 표시 순서를 확인한다.
- 자동 등록, 콘텐츠 생성 명령어, `ko.mdx/en.mdx` 동거 구조, Resume 대표작 제한은 제안 단계다.

## 8. 실행과 검증

저장소에 정의된 명령은 다음과 같다.

```bash
pnpm install
pnpm dev
pnpm lint
pnpm type-check
pnpm build
pnpm start
```

`build:analyze`도 정의되어 있다. 별도 `test` 스크립트나 프로젝트 테스트 파일은 이번 조사에서 발견하지 못했다. 기존 검증 방식은 lint·타입 검사·빌드·브라우저 확인이다.

설정 덮어쓰기가 필요하면 `config/site.ts`, `config/profile.ts`의 `NEXT_PUBLIC_*` 이름을 확인한다. 주요 항목은 사이트 URL·이름·설명·이메일·GitHub·LinkedIn이며 기본값이 있다. 예전 README에 있던 Notion·Supabase 비밀키 설정은 현재 앱에 필요 없다. 비밀값 자체는 이 문서에 기록하지 않는다.

**개발 서버와 빌드는 같은 `.next`를 동시에 사용하지 않도록 실행한다.** 과거 청크 누락 오류(`./503.js`, `./717.js`)는 동시 실행에 따른 캐시 충돌 가능성으로 설명되었다. 문제가 재발하면 관련 프로세스와 생성 파일 상태부터 확인하며 소스를 되돌리지 않는다.

| 확인 시점 | 결과 |
| --- | --- |
| 2026-08-27 당시 | 한영 슬라이드, 27개 정적 페이지 빌드, lint·타입 검사, 데스크톱 1440×900·모바일 390×844 확인 기록 |
| 2026-08-31 당시 | 인사 인터랙션, 한영 PRACTICE 제목 한 줄, 모바일 넘침, lint·타입 검사 확인 기록 |
| 2026-09-08 당시 | 홈·콘텐츠 페이지 테마, 저장·언어 이동, lint·타입 검사·빌드 및 데스크톱·모바일 확인 기록 |
| 2026-10-20 당시 | 외주 사례 2건, 31개 정적 페이지, lint·타입 검사·빌드; 신규 상세 4경로 × 2폭 × 2테마 16조합과 홈·Work·Resume 12조합 확인 기록 |
| 2026-10-22 당시 | 교체 사진의 영문 상세 1440px·390px 갤러리 표시, 이미지 로딩·원본 링크·넘침 확인 및 타입 검사 통과 기록 |
| 2026-11-06 이번 문서화 | 현재 코드의 `pnpm type-check`, `pnpm lint` 통과. ESLint 경고·오류 없음. 실행 도구에서 `next lint` 폐기 예정 안내 출력. 앱 UI 변경 없음. 빌드·브라우저 검증은 재실행하지 않음 |

과거 정적 페이지 수·브라우저 성공 결과를 현재 운영 사이트 검증으로 해석하지 않는다. 현재 기능을 수정할 때는 한영·기본/야간·데스크톱/모바일과 관련 인터랙션을 다시 확인한다.

## 9. 산출물과 문서 우선순위

| 파일 | 용도·유효 범위 |
| --- | --- |
| [프로젝트 작업 이력](docs/project-history.md) | 대화별 경과·결정·미실행 제안 |
| [테마 문서](docs/portfolio-theme.md) | 승인 테마·동작 기준. EXPLORE의 옛 사례 설명 등 문구 일부는 10월 작업으로 변경됨 |
| [외주 2건 통합 계획](docs/client-projects-implementation-plan.md) | 2026-10-20 구현 범위와 당시 검증 결과 |
| [꼼꼼환경 초기 계획](docs/ggomggom-case-study-plan.md) | 2026-10-16 조사 근거. 소개 초안은 통합 계획에 의해 대체됨 |
| [영문 스타일 가이드](content/i18n/en-portfolio-guide.md) | 역할·용어·문체 규칙 |
| [AGENTS.md](AGENTS.md) (`CLAUDE.md`가 불러옴) | Codex·Cursor·Claude Code 공용 프로젝트 지침. 2026-11-08에 옛 구조를 가리키던 `.cursor/rules` 5개를 지우고 대체 |
| [영문 이력서 PDF](output/pdf/Choongman_Kim_Resume_EN.pdf) | 2026-10-15에 만든 1페이지 제출용 파일. 당시 기존 5개 프로젝트 기준이므로 외주 2건 반영 재생성 필요 |
| `output/client-projects-20261020/` | 외주 사례 추가 전후와 브라우저 검증 화면 |
| `output/client-projects-20261022/` | 교체 사진 캡처와 데스크톱·모바일 갤러리 검증 화면 |
| `.playwright-mcp/` | 과거 브라우저 도구 로그·스냅샷·임시 캡처. 공개 사이트 자산 아님 |
| `docs/design.md`, `docs/checklist.md`, `docs/demo-scenario.md`, `docs/performance-optimization.md` | 이전 구조의 설계·작업 기록. 현재 기능·완료율·설치법으로 사용하지 않음 |
| `docs/portfolio-masonry-wireframe.md`, 같은 이름의 SVG | 예전 Masonry 갤러리 시안. 현재 슬라이드/Work 설계 기준 아님 |

## 10. 작업 반영 상태와 다음 단계

2026-11-08에 아래 변경과 이후 정리 작업을 모두 `develop`에 커밋했다. 로컬 미리보기 설정 `.claude/launch.json`만 커밋하지 않았다.

문서 작성 시작 시 수정된 추적 파일은 15개였다.

```text
app/en/layout.tsx, app/en/page.tsx
app/globals.css, app/layout.tsx, app/opengraph-image.tsx
components/common/Header.tsx
components/deck/PortfolioDeck.tsx
components/pages/WorkDetailPage.tsx
components/work/WorkCard.tsx
config/localized-content.ts, config/profile.ts, config/site.ts
lib/content.ts, lib/utils/seo.ts, types/content.ts
```

미추적 파일에는 새 테마 CSS·ThemeToggle·theme 설정, 외주 MDX 2건, 최근 계획서 3개, 외주 이미지, PDF·검증 화면·브라우저 로그가 포함된다. 미추적이라고 불필요한 파일로 판단하거나 삭제하면 안 된다. 이 문서와 이력 문서는 이번에 추가했다.

아래는 이어서 할 수 있는 작업 목록이며 이번에 추가 구현하거나 배포한 항목은 아니다.

| 우선순위 | 남은 일 | 완료 판단 |
| --- | --- | --- |
| 1 | 푸시·배포 확인 | 2026-11-08 로컬 커밋 완료(로그·출력물은 `.gitignore`로 제외). 푸시 후 배포 사이트에서 한영·기본/야간·데스크톱/모바일 화면과 공유 미리보기 확인 |
| 1 | 실제 기업교육·멘토링 사례 2~3건 확보 | 기관/익명명·기간·대상·역할·막힌 문제·조언·팀 구현·결과·공개 허용 범위 확보 |
| 1 | Resume 경력 데이터 보강 | 실제 활동 이력·기간·담당 역할을 확인 가능한 사실로 구성 |
| 2 | 영문 PDF 갱신 | 새 외주 사례 및 현재 소개와 일치하는 제출용 PDF 재생성·렌더 확인 |
| 2 | 구문서 정리 | README는 2026-11-08에 현재 구조로 다시 씀. 옛 docs(`design.md` 등)의 보관 위치나 삭제 여부 결정 |
| 2 | 콘텐츠 중복·번역 관리 개선 | 프로필 공통화, 홈 문구 분리, 번역 누락 처리·수동 등록 방식 개선 |
| 3 | 기존 프로젝트 선별·Writing 확충 | 지금 맡으려는 일과 기여 근거에 따라 선별. 단순히 오래되었다는 이유로 삭제하지 않음 |
| 3 | 폰트·도구 유지보수 | 폰트 최적화는 2026-11-06 반영(Pretendard 다이나믹 서브셋, 전송량 실측). 필요 시 lint 실행 방식 정비 |

이번 작업에서는 문서만 추가하며 기존 사용자 변경을 보존한다. 원격 푸시·운영 배포·외주 원본 수정·PDF 재생성은 수행하지 않는다.
