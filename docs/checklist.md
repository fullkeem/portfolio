# 프론트엔드 개발자 포트폴리오 사이트 개발 체크리스트

## 📅 개발 일정: 3-4주

### Week 1: 기초 설정 및 메인 구조 (Day 1-5)

#### Day 1-2: 프로젝트 초기 설정 ✅ COMPLETED

- [x] Next.js 15.1.x 프로젝트 생성 (pnpm 사용)
- [x] TypeScript 설정
- [x] Tailwind CSS 설정
- [x] ESLint, Prettier 설정
- [x] 기본 폴더 구조 생성
- [x] Git 저장소 초기화
- [x] 환경 변수 파일 설정 (.env.local, .env.example)
- [x] README.md 작성

#### Day 3-4: 레이아웃 및 공통 컴포넌트 ✅ COMPLETED

- [x] 루트 레이아웃 구현 (app/layout.tsx)
- [x] Header 컴포넌트 구현
  - [x] 네비게이션 메뉴
  - [x] 모바일 햄버거 메뉴
  - [x] 스크롤 시 배경 변화
  - [x] 라우트 active 상태 표시
- [x] Footer 컴포넌트 구현
- [x] ThemeToggle 컴포넌트 (다크모드)
  - [x] next-themes 설정
  - [x] 시스템 테마 감지
  - [x] localStorage 저장
- [x] 공통 컴포넌트들
  - [x] Container 컴포넌트
  - [x] Skeleton 로딩 컴포넌트

#### Day 5: 홈페이지 구조 ✅ COMPLETED

- [x] Hero Section 구현
  - [x] 기본 레이아웃
  - [x] GSAP 텍스트 애니메이션
  - [x] 배경 그라데이션 효과
  - [x] 타이핑 효과
- [x] About Section 구현
  - [x] 기본 구조
  - [x] 기술 스택 시각화
  - [x] 애니메이션 효과
- [x] Portfolio Section 구현
  - [x] Notion API 연동
  - [x] 카드 형태 미리보기
  - [x] 로딩 상태 처리
- [x] Blog Section 구현
  - [x] 임시 데이터로 구조 구현
  - [x] 카드 형태 레이아웃
- [x] Contact Section 구현
  - [x] 연락 방법 안내
  - [x] 애니메이션 효과

### Week 2: 포트폴리오 및 Notion 연동 (Day 6-10)

#### Day 6-7: Notion API 설정 ✅ COMPLETED

- [x] Notion Integration 생성
- [x] Portfolio Database 생성
  - [x] 필요한 속성 추가
  - [x] Integration 연결
- [x] Blog Database 생성
  - [x] 필요한 속성 추가
  - [x] Integration 연결
- [x] lib/notion/client.ts 구현
  - [x] 기본 클라이언트 설정
  - [x] getPortfolios 함수
  - [x] getPortfolioById 함수
  - [x] getPageContent 함수
  - [x] getBlogPosts 함수
- [x] lib/notion/blocks.tsx 구현
  - [x] Notion 블록 → React 컴포넌트 변환
  - [x] 이미지, 코드, 텍스트 블록 처리
  - [x] Syntax highlighting 적용

#### Day 8-9: 포트폴리오 기능 ✅ COMPLETED

- [x] Portfolio 페이지 구현
  - [x] Notion API 데이터 페칭
  - [x] 포트폴리오 그리드 레이아웃
  - [x] 로딩 상태 처리
  - [x] 검색 결과 없음 상태
- [x] PortfolioCard 컴포넌트
  - [x] 이미지 최적화
  - [x] 호버 효과
  - [x] 기술 스택 태그
  - [x] 외부 링크 처리
- [x] 필터링 기능
  - [x] FilterStore (Zustand) 구현
  - [x] 기술별 필터 UI
  - [x] 검색어 필터
  - [x] 실시간 필터링 로직
  - [x] 모바일 필터 UI
  - [x] 필터 토글 기능 (toggleTechnology)

#### Day 10: 포트폴리오 상세 페이지 ✅ COMPLETED

- [x] Dynamic Route 설정 ([id])
- [x] 상세 페이지 레이아웃
- [x] Notion 콘텐츠 렌더링
- [x] 메타데이터 생성
- [x] GitHub/Live 링크
- [x] 정적 경로 생성 (generateStaticParams)
- [x] 뒤로가기 네비게이션

### Week 3: 블로그 및 부가 기능 (Day 11-15)

#### Day 11-12: 블로그 기능 ✅ COMPLETED

- [x] Blog 페이지 구현
  - [x] Notion API 연동
  - [x] 블로그 포스트 목록
  - [x] 카테고리 필터
  - [x] 검색 기능
  - [x] 페이지네이션
- [x] BlogCard 컴포넌트
  - [x] 커버 이미지
  - [x] 읽기 시간 표시
  - [x] 태그 표시
  - [x] 발행일 표시
- [x] BlogFilters 컴포넌트
  - [x] 실시간 검색 (디바운스)
  - [x] 카테고리 필터링
  - [x] 태그 필터링 (토글)
  - [x] 필터 초기화
- [x] BlogPagination 컴포넌트
  - [x] 스마트한 페이지 번호 표시
  - [x] 이전/다음 버튼
  - [x] 접근성 지원

#### Day 13: 블로그 상세 페이지 ✅ COMPLETED

- [x] Dynamic Route 설정 ([slug])
- [x] 마크다운 렌더링 설정
  - [x] Notion 블록 렌더링
  - [x] 코드 하이라이팅 (Shiki)
  - [x] 블록 단위 렌더링
- [x] 목차(TOC) 구현
  - [x] 헤딩 추출
  - [x] 스크롤 스파이
  - [x] 모바일 토글
  - [x] 부드러운 스크롤 이동
- [x] 관련 포스트 표시
  - [x] 카테고리/태그 기반 추천
  - [x] 관련 포스트 카드
- [x] 메타데이터 생성
- [x] 공유 기능 (네이티브 API + 클립보드)
- [x] 접근성 향상 (Skip to content, ARIA)

#### Day 14: 댓글 시스템 ✅ COMPLETED

- [x] Giscus 설정
  - [x] GitHub 저장소 설정
  - [x] Discussions 활성화
  - [x] 컴포넌트 통합
- [x] 다크모드 연동
- [x] 반응형 레이아웃

#### Day 14+: 하이브리드 댓글 시스템 ✅ COMPLETED

- [x] **Supabase 댓글 시스템 구축**
  - [x] Supabase 프로젝트 설정 및 환경변수 구성
  - [x] PostgreSQL 데이터베이스 스키마 설계 및 적용
  - [x] Row Level Security (RLS) 정책 구현
  - [x] 인덱스 및 트리거 최적화
- [x] **데이터베이스 테이블 구조**
  - [x] comments 테이블 (댓글 기본 정보, 승인 워크플로우)
  - [x] comment_likes 테이블 (IP 기반 좋아요 시스템)
  - [x] comment_reports 테이블 (스팸 신고 기능)
- [x] **Stored Procedures 구현**
  - [x] create_comment (자동 승인 기능 포함)
  - [x] toggle_comment_like (중복 방지)
  - [x] approve_comment (관리자용)
  - [x] delete_comment (소프트 삭제)
- [x] **API 엔드포인트 구축**
  - [x] GET /api/comments (댓글 목록 조회)
  - [x] POST /api/comments (댓글 작성)
  - [x] POST /api/comments/[id]/like (좋아요 토글)
  - [x] GET /api/comments/custom-stats (통계 조회)
- [x] **프론트엔드 컴포넌트**
  - [x] Comments 하이브리드 선택 UI
  - [x] CustomComments 이메일 기반 댓글
  - [x] GiscusComments GitHub 계정 댓글
  - [x] 실시간 UI 업데이트 및 로딩 상태
- [x] **테스트 및 검증**
  - [x] Supabase MCP 도구로 데이터베이스 검증
  - [x] API 엔드포인트 기능 테스트
  - [x] 테스트 페이지 생성 (/test-comments)
  - [x] 댓글 작성/조회/좋아요 기능 검증
- [x] **문제 해결 및 최적화**
  - [x] 댓글 자동 승인 기능 구현
  - [x] IP 기반 중복 좋아요 방지
  - [x] 스키마 파일 문서화 및 관리 방안 수립

#### Day 15: Contact 페이지 ✅ COMPLETED

- [x] Contact 페이지 레이아웃
  - [x] ContactHero 컴포넌트 (페이지 제목, 서브타이틀, 애니메이션)
  - [x] 반응형 디자인 (모바일/데스크톱)
  - [x] 다크모드 완전 지원
- [x] 연락 방법 안내
  - [x] 이메일 링크 (mailto: 즉시 연결)
  - [x] 카카오톡 오픈채팅 버튼
  - [x] GitHub, LinkedIn SNS 링크
  - [x] 응답 시간 및 위치 정보 표시
- [x] EmailJS 설정 및 문의 폼
  - [x] 문의 폼 구현 (ContactForm 컴포넌트)
  - [x] 유효성 검증 (Zod + react-hook-form)
  - [x] 폼 필드: 이름, 이메일, 프로젝트 유형, 예산, 희망일정, 상세내용
  - [x] 전송 피드백 (로딩, 성공, 실패 상태)
  - [x] 환경변수 기반 EmailJS 연동
- [x] FAQ 섹션 (ContactFAQ 컴포넌트)
  - [x] 아코디언 형태 7개 질문/답변
  - [x] 프로젝트 기간, 비용, 반응형, 수정, SEO, 기술스택, 호스팅
  - [x] 부드러운 열기/닫기 애니메이션
  - [x] 접근성 지원 (aria-expanded, aria-controls)
- [x] 작업 프로세스 소개 (ContactProcess 컴포넌트)
  - [x] 4단계 프로세스 시각화 (상담→디자인→개발→배포)
  - [x] 각 단계별 소요시간 표시
  - [x] 반응형 그리드 레이아웃
- [x] 애니메이션 효과
  - [x] Framer Motion 진입 애니메이션
  - [x] 스태거 효과 (순차적 요소 등장)
  - [x] 호버 효과 및 마이크로 인터랙션

### Week 4: 최적화 및 배포 (Day 16-20)

#### Day 16-17: 애니메이션 및 인터랙션 ✅ COMPLETED

- [x] GSAP 설정 및 구현
  - [x] TextPlugin 설정
  - [x] Hero 텍스트 애니메이션
  - [x] ScrollTrigger 설정
  - [x] 섹션 진입 애니메이션
  - [x] 패럴랙스 효과
  - [x] 스크롤 기반 애니메이션
- [x] Framer Motion 애니메이션
  - [x] 컴포넌트 애니메이션
  - [x] 호버 인터랙션
  - [x] 스태거 애니메이션
  - [x] 페이지 전환 효과
- [x] 고급 인터랙션 구현
  - [x] 마그네틱 버튼 효과
  - [x] 3D 틸트 카드 효과
  - [x] 부드러운 호버 애니메이션
- [x] Lenis 스무스 스크롤

#### Day 18: 성능 최적화 🔄 IN PROGRESS

- [x] 이미지 최적화
  - [x] Next/Image 설정
  - [x] 적절한 사이즈 제공
  - [x] sizes 속성 최적화
  - [ ] Blur placeholder
- [ ] 코드 스플리팅
  - [ ] Dynamic imports
  - [ ] Suspense boundaries
- [ ] 번들 크기 최적화
  - [ ] Tree shaking
  - [ ] 불필요한 의존성 제거

#### Day 19: SEO 및 메타데이터 🔄 IN PROGRESS

- [x] Metadata API 활용
  - [x] 루트 레이아웃 메타데이터
  - [x] 포트폴리오 상세 페이지 메타데이터
  - [x] Open Graph 태그
  - [x] Twitter Card
  - [x] 블로그 페이지 메타데이터 (기본)
- [ ] 구조화된 데이터
  - [ ] JSON-LD 스키마
  - [x] 사이트맵 생성
  - [x] robots.txt
- [ ] 성능 지표 확인
  - [ ] Lighthouse 테스트
  - [ ] Core Web Vitals

#### Day 20: 테스트 및 배포 📋 PENDING

- [ ] 크로스 브라우저 테스트
  - [ ] Chrome, Firefox, Safari
  - [ ] Edge
- [ ] 반응형 테스트
  - [ ] 모바일 (320px~)
  - [ ] 태블릿 (768px~)
  - [ ] 데스크톱 (1024px~)
- [ ] Vercel 배포
  - [ ] GitHub 연결
  - [ ] 환경 변수 설정
  - [ ] 도메인 설정
  - [ ] Analytics 설정

## 🎯 현재 진행 상황

### ✅ 완료된 작업

- **기초 설정**: 프로젝트 초기 설정 완료 (TypeScript, Tailwind, ESLint 등)
- **레이아웃**: Header, Footer, ThemeToggle 등 공통 컴포넌트 완료
- **홈페이지**: 모든 섹션 구현 완료 (Hero, About, Portfolio, Blog, Contact)
- **Notion 연동**: API 클라이언트 및 블록 렌더링 완료
- **포트폴리오**: 목록, 상세 페이지, 필터링 기능 완료
- **블로그 기능**: 목록, 상세 페이지, 필터링, 검색, 페이지네이션, 목차, 관련 포스트 완료
- **Contact 페이지**: 완전한 문의 시스템 (연락처 정보, EmailJS 폼, FAQ, 작업 프로세스) 완료
- **애니메이션**: GSAP, Framer Motion, Lenis 기본 설정 완료
- **상태 관리**: Zustand store 구현 (filter, theme) 완료
- **타입 정의**: Portfolio, Blog 등 필요한 타입 정의 완료

### 🔄 진행 중인 작업

- **성능 최적화**: 이미지 최적화 부분 완료, 코드 스플리팅 작업 예정
- **SEO 최적화**: 기본 메타데이터 완료, 구조화된 데이터 작업 예정

### 📋 다음 우선순위 작업

1. ✅ **Contact 페이지 완성** (EmailJS 연동 및 연락처 정보) - Day 15 ✅ COMPLETED
2. **성능 최적화 완성** (코드 스플리팅, 번들 최적화)
3. **SEO 최적화 완성** (구조화된 데이터, Lighthouse 테스트)
4. **테스트 및 배포**
5. **About 페이지 독립 구현** (홈 섹션을 확장하여 독립 페이지로) - 선택사항

## 📊 진행률: 95%

### Week 1: ██████████ 100% ✅

### Week 2: ██████████ 100% ✅

### Week 3: ██████████ 100% ✅

### Week 4: ████████░░ 80% 🔄

## 🎉 최근 완성된 기능들

### ✅ 새로 완성된 컴포넌트들:

- **Contact 페이지 완전 구현**: Day 15 완료 🎉

  - **ContactHero**: 페이지 제목, 서브타이틀, 그라데이션 배경 애니메이션
  - **ContactInfo**: 연락 방법 카드 (이메일, 카톡, SNS), 응답시간/위치 정보
  - **ContactForm**: EmailJS 연동 문의 폼, Zod 유효성 검증, 상태별 피드백
  - **ContactFAQ**: 아코디언 형태 7개 FAQ, 부드러운 애니메이션
  - **ContactProcess**: 4단계 작업 프로세스 시각화

- **Comments**: 하이브리드 댓글 시스템 (Giscus + Supabase)

  - GitHub 사용자: Giscus (GitHub Discussions)
  - 일반 사용자: Custom (Supabase + 이메일 인증)
  - 시스템 선택 UI, 통계 표시, 자동 테마 연동

- **BlogCard**: 커버 이미지, 메타 정보, 태그 표시
- **BlogFilters**: 검색, 카테고리, 태그 필터링 (디바운스 적용)
- **BlogPagination**: 스마트한 페이지네이션 (최대 7페이지 표시)
- **TableOfContents**: 인터랙티브 목차 (스크롤 스파이, 모바일 토글)
- **RelatedPosts**: 카테고리/태그 기반 관련 포스트 추천

### ✅ 댓글 시스템 구현:

- **Giscus 연동**: GitHub Discussions 기반 댓글 시스템
- **다크모드 연동**: 테마 변경 시 자동으로 댓글 테마도 변경
- **환경변수 검증**: 필수 설정값 누락 시 사용자 친화적 에러 메시지
- **접근성**: ARIA 라벨링, 키보드 네비게이션 지원
- **CSP 설정**: Giscus iframe 허용을 위한 보안 헤더 설정

### ✅ 블로그 핵심 기능들:

- **고급 필터링**: 카테고리, 태그, 검색어 (디바운스)
- **페이지네이션**: 9개 포스트씩, 스마트한 페이지 표시
- **목차 기능**: 자동 헤딩 감지, 스크롤 스파이, 부드러운 이동
- **관련 포스트**: 같은 카테고리/태그 기반 추천
- **공유 기능**: 네이티브 공유 API + 클립보드 복사
- **접근성**: WCAG 2.2 준수, ARIA 라벨링, 키보드 네비게이션

## 🔧 최근 해결된 이슈

- [x] FilterStore toggleBlogTag 함수 누락 → 추가 구현
- [x] 블로그 필터링 로직 구현 → 카테고리, 태그, 검색어 지원
- [x] 페이지네이션 로직 구현 → 스마트한 페이지 번호 표시
- [x] 목차 스크롤 스파이 구현 → IntersectionObserver 활용
- [x] 블로그 상세 페이지 레이아웃 → 사이드바 목차, 관련 포스트
- [x] 컴포넌트 모듈화 → 재사용 가능한 구조로 분리

## 🚨 주의사항

1. **Notion API 제한**

   - Rate limit 고려 (초당 3개 요청)
   - 응답 크기 제한 (페이지당 100개 블록)
   - 캐싱 전략 필수

2. **성능 목표**

   - Lighthouse 점수 90점 이상
   - FCP < 1.8s
   - LCP < 2.5s
   - CLS < 0.1

3. **접근성**

   - WCAG 2.1 AA 준수
   - 키보드 네비게이션
   - 스크린 리더 지원

4. **SEO**
   - 모든 페이지 메타데이터
   - 구조화된 데이터
   - 적절한 heading 구조

## 🎉 프로젝트 완료 기준

- [x] 홈페이지 구현 완료
- [x] 포트폴리오 기능 완료 (목록, 상세, 필터링)
- [x] 블로그 기능 완료 (목록, 상세, 필터링, 검색, 페이지네이션, 목차)
- [x] Notion API 연동 정상 작동
- [x] 반응형 디자인 기본 구현
- [x] 다크모드 전체 페이지 지원
- [x] 애니메이션 기본 구현
- [x] Contact 페이지 완료
- [x] 댓글 시스템 구현 (하이브리드: Giscus + Supabase)
- [ ] Lighthouse 점수 90점 이상
- [ ] 실제 포트폴리오 항목 3개 이상
- [ ] 블로그 포스트 1개 이상
- [ ] Vercel 배포 완료
- [ ] 도메인 연결 (선택사항)
