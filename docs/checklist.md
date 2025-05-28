# 프론트엔드 개발자 포트폴리오 사이트 개발 체크리스트

## 📅 개발 일정: 3-4주

### Week 1: 기초 설정 및 메인 구조 (Day 1-5)

#### Day 1-2: 프로젝트 초기 설정
- [x] Next.js 15.1.x 프로젝트 생성 (pnpm 사용)
- [x] TypeScript 설정
- [x] Tailwind CSS 설정
- [x] ESLint, Prettier 설정
- [x] 기본 폴더 구조 생성
- [x] Git 저장소 초기화
- [x] 환경 변수 파일 설정 (.env.local, .env.example)
- [x] README.md 작성

#### Day 3-4: 레이아웃 및 공통 컴포넌트
- [x] 루트 레이아웃 구현 (app/layout.tsx)
- [x] Header 컴포넌트 구현
  - [x] 네비게이션 메뉴
  - [x] 모바일 햄버거 메뉴
  - [x] 스크롤 시 배경 변화
- [x] Footer 컴포넌트 구현
- [x] ThemeToggle 컴포넌트 (다크모드)
  - [x] next-themes 설정
  - [x] 시스템 테마 감지
  - [x] localStorage 저장

#### Day 5: 홈페이지 구조
- [x] Hero Section 구현
  - [x] 기본 레이아웃
  - [ ] GSAP 텍스트 애니메이션
  - [ ] 배경 그라데이션 효과
- [x] About Section 구현
  - [x] 기본 구조
  - [ ] 기술 스택 시각화
- [x] Portfolio Section 구현 (임시 데이터)
- [x] Blog Section 구현 (임시 데이터)
- [x] Contact Section 구현

### Week 2: 포트폴리오 및 Notion 연동 (Day 6-10)

#### Day 6-7: Notion API 설정
- [x] Notion Integration 생성
- [x] Portfolio Database 생성
  - [x] 필요한 속성 추가
  - [x] Integration 연결
- [x] Blog Database 생성
  - [x] 필요한 속성 추가
  - [x] Integration 연결
- [x] lib/notion.ts 구현
  - [x] 기본 클라이언트 설정
  - [x] getPortfolios 함수
  - [x] getBlogPosts 함수
- [ ] lib/notion-blocks.ts 구현
  - [ ] Notion 블록 → 마크다운 변환
  - [ ] 이미지 처리

#### Day 8-9: 포트폴리오 기능
- [ ] Portfolio 페이지 구현
  - [ ] 서버 컴포넌트로 데이터 페칭
  - [ ] 포트폴리오 그리드 레이아웃
  - [ ] 로딩 상태 처리
- [ ] PortfolioCard 컴포넌트
  - [ ] 이미지 최적화
  - [ ] 호버 효과
  - [ ] 기술 스택 태그
- [ ] 필터링 기능
  - [x] FilterStore (Zustand) 구현
  - [ ] 기술별 필터 UI
  - [ ] 프로젝트 유형별 필터
  - [ ] 실시간 필터링 로직

#### Day 10: 포트폴리오 상세 페이지
- [ ] Dynamic Route 설정 ([id])
- [ ] 상세 페이지 레이아웃
- [ ] Notion 콘텐츠 렌더링
- [ ] 이미지 갤러리
- [ ] GitHub/Live 링크

### Week 3: 블로그 및 부가 기능 (Day 11-15)

#### Day 11-12: 블로그 기능
- [ ] Blog 페이지 구현
  - [ ] 블로그 포스트 목록
  - [ ] 카테고리 필터
  - [ ] 검색 기능
  - [ ] 페이지네이션
- [ ] BlogCard 컴포넌트
  - [ ] 커버 이미지
  - [ ] 읽기 시간 표시
  - [ ] 태그 표시

#### Day 13: 블로그 상세 페이지
- [ ] Dynamic Route 설정 ([slug])
- [ ] 마크다운 렌더링 설정
  - [ ] react-markdown 설정
  - [ ] 코드 하이라이팅 (Shiki)
- [ ] 목차(TOC) 구현
  - [ ] 헤딩 추출
  - [ ] 스크롤 스파이
  - [ ] 모바일 토글
- [ ] 관련 포스트 표시

#### Day 14: 댓글 시스템
- [ ] Giscus 설정
  - [ ] GitHub 저장소 설정
  - [ ] Discussions 활성화
  - [ ] 컴포넌트 통합
- [ ] 다크모드 연동
- [ ] 반응형 레이아웃

#### Day 15: Contact 페이지
- [ ] Contact 페이지 레이아웃
- [ ] 연락 방법 안내
  - [ ] 이메일 링크
  - [ ] 카카오톡 오픈채팅
  - [ ] GitHub, LinkedIn 등
- [ ] EmailJS 설정 (선택사항)
  - [ ] 문의 폼 구현
  - [ ] 유효성 검증
  - [ ] 전송 피드백

### Week 4: 최적화 및 배포 (Day 16-20)

#### Day 16-17: 애니메이션 및 인터랙션
- [ ] GSAP 설정 및 구현
  - [ ] ScrollTrigger 설정
  - [ ] Hero 텍스트 애니메이션
  - [ ] 섹션 진입 애니메이션
- [ ] Framer Motion 애니메이션
  - [ ] 페이지 전환 효과
  - [ ] 컴포넌트 애니메이션
  - [ ] 호버 인터랙션
- [ ] Lenis 스무스 스크롤

#### Day 18: 성능 최적화
- [ ] 이미지 최적화
  - [ ] Next/Image 설정
  - [ ] Blur placeholder
  - [ ] 적절한 사이즈 제공
- [ ] 코드 스플리팅
  - [ ] Dynamic imports
  - [ ] Suspense boundaries
- [ ] 번들 크기 최적화
  - [ ] Tree shaking
  - [ ] 불필요한 의존성 제거

#### Day 19: SEO 및 메타데이터
- [ ] Metadata API 활용
  - [ ] 각 페이지 메타데이터
  - [ ] Open Graph 태그
  - [ ] Twitter Card
- [ ] 구조화된 데이터
  - [ ] JSON-LD 스키마
  - [ ] 사이트맵 생성
  - [ ] robots.txt
- [ ] 성능 지표 확인
  - [ ] Lighthouse 테스트
  - [ ] Core Web Vitals

#### Day 20: 테스트 및 배포
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
- 프로젝트 초기 설정 완료
- 기본 레이아웃 및 라우팅 구현
- 공통 컴포넌트 구현 (Header, Footer, ThemeToggle)
- 홈페이지 기본 구조 구현
- Notion API 연동 준비 완료
- Notion 데이터베이스 생성 완료
- 문서화 작업 (requirements, design, demo-scenario)

### 🔄 진행 중인 작업
- GSAP 애니메이션 구현
- Notion API 데이터 페칭 테스트

### 📋 다음 작업
- Portfolio 페이지 Notion 연동
- 포트폴리오 필터링 기능 구현
- Blog 페이지 구현

## 📊 진행률: 35%

### Week 1: ████████░░ 80%
### Week 2: ██░░░░░░░░ 20%
### Week 3: ░░░░░░░░░░ 0%
### Week 4: ░░░░░░░░░░ 0%

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

- [ ] 모든 페이지 구현 완료
- [ ] Notion API 연동 정상 작동
- [ ] 반응형 디자인 완벽 구현
- [ ] 다크모드 전체 페이지 지원
- [ ] 애니메이션 자연스럽게 작동
- [ ] Lighthouse 점수 90점 이상
- [ ] 실제 포트폴리오 항목 3개 이상
- [ ] 블로그 포스트 1개 이상
- [ ] Vercel 배포 완료
- [ ] 도메인 연결 (선택사항)
