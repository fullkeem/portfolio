# 프론트엔드 개발자 포트폴리오 사이트

랜딩 페이지 제작 전문 프론트엔드 개발자를 위한 브랜딩 사이트입니다.

## 🚀 시작하기

### 1. 의존성 설치

```bash
pnpm install
```

### 2. 환경 변수 설정

`.env.example` 파일을 복사하여 `.env.local` 파일을 생성하고 필요한 값들을 입력합니다:

```bash
cp .env.example .env.local
```

필요한 환경 변수:
- **Notion API**: Notion Integration 토큰과 데이터베이스 ID
- **EmailJS**: 이메일 서비스 설정
- **Giscus**: GitHub Discussions 기반 댓글 시스템

### 3. 개발 서버 실행

```bash
pnpm dev
```

[http://localhost:3000](http://localhost:3000)에서 확인할 수 있습니다.

## 📁 프로젝트 구조

```
portfolio-site/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 루트 레이아웃
│   ├── page.tsx           # 홈페이지
│   ├── about/             # About 페이지
│   ├── portfolio/         # 포트폴리오 페이지
│   ├── blog/              # 블로그 페이지
│   └── contact/           # 연락처 페이지
├── components/            # 재사용 컴포넌트
│   ├── home/             # 홈페이지 섹션 컴포넌트
│   ├── header.tsx        # 헤더 네비게이션
│   └── footer.tsx        # 푸터
├── lib/                   # 유틸리티 함수
│   ├── notion.ts         # Notion API 클라이언트
│   └── utils.ts          # 공통 유틸리티
├── store/                 # Zustand 스토어
├── types/                 # TypeScript 타입 정의
└── public/               # 정적 파일
```

## 🛠 기술 스택

- **Framework**: Next.js 15.1.x (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: GSAP, Framer Motion
- **State Management**: Zustand
- **Data Fetching**: TanStack Query
- **CMS**: Notion API
- **Deployment**: Vercel

## 📝 개발 로드맵

### Week 1: 기초 설정 및 핵심 구조
- [x] 프로젝트 초기 설정
- [x] 기본 레이아웃 및 라우팅
- [x] 다크모드 구현
- [ ] 홈페이지 히어로 섹션 완성
- [ ] About 페이지 구현

### Week 2: 포트폴리오 및 Notion 연동
- [ ] Notion API 연동
- [ ] 포트폴리오 갤러리 구현
- [ ] 포트폴리오 상세 페이지
- [ ] 필터링 기능

### Week 3: 블로그 및 연락처
- [ ] 블로그 기능 구현
- [ ] 댓글 시스템 (Giscus)
- [ ] Contact 페이지
- [ ] EmailJS 연동

### Week 4: 최적화 및 배포
- [ ] 애니메이션 추가
- [ ] SEO 최적화
- [ ] 성능 최적화
- [ ] Vercel 배포

## 🎨 디자인 시스템

- **Colors**: 미니멀한 흑백 기반 + 블루 액센트
- **Typography**: Pretendard (한글), Inter (영문)
- **Animation**: 부드러운 스크롤 효과와 마이크로 인터랙션

## 📄 라이선스

MIT License
