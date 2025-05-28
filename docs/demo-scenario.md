# 프론트엔드 개발자 포트폴리오 사이트 데모 시나리오

## 1. 프로젝트 시작 및 요구사항 정의

### 시나리오
> 프론트엔드 개발자가 크몽에서 랜딩 페이지 제작 서비스를 시작하기 위해 자신을 브랜딩할 수 있는 포트폴리오 사이트를 만들려고 합니다.

**초기 요구사항:**
- 포트폴리오 전시
- 기술 블로그
- 연락처 정보
- Notion API를 통한 콘텐츠 관리
- 3-4주 내 완성

## 2. 프로젝트 초기 설정

### 2.1 프로젝트 생성 및 기본 설정
```bash
# 프로젝트 생성
cd C:\Users\cm730\Downloads
mkdir fullkeem_portfolio
cd fullkeem_portfolio

# package.json 및 기본 설정 파일 생성
pnpm init
```

### 2.2 기술 스택 설정
- Next.js 15.1.x (안정적인 최신 버전)
- TypeScript 5.x
- Tailwind CSS 3.4.x
- 필수 라이브러리 설치

### 2.3 폴더 구조 설정
```
fullkeem_portfolio/
├── app/           # Next.js App Router
├── components/    # 재사용 컴포넌트
├── lib/          # 유틸리티 함수
├── store/        # Zustand 스토어
├── types/        # TypeScript 타입
└── public/       # 정적 파일
```

## 3. Notion API 연동

### 3.1 Notion Integration 생성
1. https://www.notion.so/my-integrations 접속
2. "Portfolio Site" Integration 생성
3. API Token 발급

### 3.2 Notion 데이터베이스 생성
1. **Portfolio Database** 생성
   - Title, Description, Thumbnail, Technologies 등 속성 추가
   - Database ID: `1ffc0a73-d8bb-817b-bedd-c915afd74134`

2. **Blog Database** 생성
   - Title, Slug, Excerpt, Category, Tags 등 속성 추가
   - Database ID: `1ffc0a73-d8bb-8136-92b9-c0b3dd57d7c3`

### 3.3 환경 변수 설정
```env
NOTION_TOKEN=your_notion_integration_token
NOTION_DATABASE_ID=1ffc0a73d8bb817bbeddc915afd74134
NOTION_BLOG_DATABASE_ID=1ffc0a73d8bb813692b9c0b3dd57d7c3
```

## 4. 핵심 기능 구현

### 4.1 홈페이지 구현
1. **Hero Section**
   - GSAP 텍스트 애니메이션
   - 배경 그라데이션 효과
   - CTA 버튼 (포트폴리오 보기, 프로젝트 문의)

2. **About Section**
   - 기술 스택 시각화
   - 스크롤 트리거 애니메이션

3. **Portfolio Section**
   - Notion API에서 Featured 프로젝트 가져오기
   - 카드 호버 효과
   - 더 보기 링크

4. **Blog Section**
   - 최신 블로그 포스트 3개 표시
   - 카테고리 및 날짜 표시

5. **Contact Section**
   - 이메일/카카오톡 연락 방법
   - 간단한 안내 메시지

### 4.2 포트폴리오 페이지 구현
```typescript
// app/portfolio/page.tsx
export default async function PortfolioPage() {
  const portfolios = await getPortfolios();
  
  return (
    <div className="container mx-auto px-4 py-32">
      <PortfolioFilter portfolios={portfolios} />
      <PortfolioGrid portfolios={portfolios} />
    </div>
  );
}
```

**필터링 기능:**
- 기술 스택별 필터 (React, Next.js, TypeScript 등)
- 프로젝트 유형별 필터 (웹사이트, 랜딩페이지, 웹앱 등)
- 실시간 검색

### 4.3 블로그 기능 구현
1. **블로그 목록 페이지**
   - 카테고리별 분류
   - 태그 클라우드
   - 검색 기능

2. **블로그 상세 페이지**
   - Notion 블록을 마크다운으로 변환
   - 목차(TOC) 자동 생성
   - Giscus 댓글 시스템

### 4.4 다크모드 구현
```typescript
// components/theme-toggle.tsx
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  
  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      {theme === 'dark' ? <Sun /> : <Moon />}
    </button>
  )
}
```

## 5. 애니메이션 및 인터랙션

### 5.1 GSAP 애니메이션
```typescript
// Hero 텍스트 애니메이션
useGSAP(() => {
  gsap.timeline()
    .from('.hero-title', { 
      y: 100, 
      opacity: 0, 
      duration: 1,
      ease: 'power4.out'
    })
    .from('.hero-subtitle', { 
      y: 50, 
      opacity: 0, 
      duration: 0.8 
    }, '-=0.5');
});
```

### 5.2 Framer Motion 인터랙션
```typescript
// 포트폴리오 카드 호버 효과
<motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: "spring", stiffness: 300 }}
>
  <PortfolioCard />
</motion.div>
```

### 5.3 Lenis 스무스 스크롤
```typescript
// 부드러운 스크롤 효과
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});
```

## 6. 성능 최적화

### 6.1 이미지 최적화
- Next.js Image 컴포넌트 사용
- Notion 이미지 URL 최적화
- Blur placeholder 생성

### 6.2 코드 스플리팅
```typescript
// Dynamic import
const PortfolioDetail = dynamic(() => import('./portfolio-detail'), {
  loading: () => <Skeleton />
});
```

### 6.3 SEO 최적화
```typescript
export const metadata: Metadata = {
  title: 'Frontend Developer | fullkeem',
  description: '랜딩 페이지 제작 전문 프론트엔드 개발자',
  openGraph: {
    images: ['/og-image.png'],
  },
};
```

## 7. 배포 프로세스

### 7.1 Vercel 배포 설정
1. GitHub 저장소 연결
2. 환경 변수 설정
3. 자동 배포 활성화

### 7.2 도메인 설정
```
fullkeem.dev (예시)
www.fullkeem.dev → fullkeem.dev (리다이렉트)
```

### 7.3 Analytics 설정
- Google Analytics 4 설치
- Vercel Analytics 활성화

## 8. 데모 시연 시나리오

### 8.1 첫 방문자 경험
1. **랜딩**: 히어로 섹션의 타이핑 애니메이션
2. **스크롤**: 부드러운 스크롤과 섹션별 애니메이션
3. **포트폴리오 탐색**: 프로젝트 카드 호버 및 상세 보기
4. **연락하기**: Contact 섹션에서 이메일/카톡 연결

### 8.2 주요 기능 시연
1. **다크모드 전환**: 헤더의 테마 토글 버튼
2. **포트폴리오 필터링**: 기술 스택별 프로젝트 필터
3. **블로그 읽기**: 목차 네비게이션 및 댓글 작성
4. **반응형 디자인**: 모바일/태블릿 화면 확인

### 8.3 관리자 시연
1. **Notion에서 콘텐츠 추가**
   - 새 포트폴리오 항목 추가
   - 블로그 포스트 작성

2. **실시간 반영 확인**
   - ISR을 통한 자동 업데이트
   - 수동 재검증 트리거

## 9. 문제 해결 시나리오

### 9.1 Notion API 연결 문제
```typescript
// 에러 처리
try {
  const portfolios = await getPortfolios();
} catch (error) {
  console.error('Notion API Error:', error);
  return <ErrorMessage />;
}
```

### 9.2 성능 이슈
- Lighthouse 점수 확인
- Bundle 크기 분석
- 이미지 최적화

### 9.3 배포 이슈
- 환경 변수 확인
- 빌드 에러 로그 분석
- Vercel 함수 제한 확인

## 10. 프로젝트 완성 및 런칭

### 10.1 최종 체크리스트
- [ ] 모든 페이지 반응형 테스트
- [ ] SEO 메타데이터 확인
- [ ] 성능 지표 90점 이상
- [ ] 크로스 브라우저 테스트
- [ ] 접근성 검사

### 10.2 런칭 준비
1. **크몽 프로필 업데이트**
   - 포트폴리오 사이트 링크 추가
   - 서비스 설명 업데이트

2. **마케팅 준비**
   - SNS 공유 이미지
   - 소개 문구 작성

### 10.3 런칭 후 모니터링
- 방문자 통계 확인
- 문의 전환율 측정
- 사용자 피드백 수집

## 결론

이 데모 시나리오는 3-4주 동안 프론트엔드 개발자 포트폴리오 사이트를 구축하는 전체 과정을 보여줍니다. Notion API를 활용한 콘텐츠 관리, 현대적인 디자인과 애니메이션, 그리고 크몽 고객을 위한 최적화된 사용자 경험을 제공합니다.

주요 성과:
- ✅ Notion을 CMS로 활용한 쉬운 콘텐츠 관리
- ✅ 미니멀하면서도 인터랙티브한 디자인
- ✅ 빠른 로딩 속도와 우수한 성능
- ✅ SEO 최적화로 검색 노출 향상
- ✅ 크몽 고객을 위한 명확한 CTA
