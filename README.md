# 🚀 Full-Stack Developer Portfolio

> **Next.js 15** 기반의 모던한 포트폴리오 웹사이트

GitHub 계정이 없는 사용자도 댓글을 작성할 수 있는 **하이브리드 댓글 시스템**과 **Notion CMS**를 활용한 동적 콘텐츠 관리 기능을 제공합니다.

## ✨ 주요 기능

### 🏠 **홈페이지**

- **GSAP 기반 타이핑 애니메이션**
- **스크롤 트리거 애니메이션**
- **반응형 Hero Section**
- **기술 스택 시각화**
- **포트폴리오/블로그 미리보기**

### 💼 **포트폴리오**

- **Notion Database 연동** (실시간 동기화)
- **고급 필터링 시스템** (기술 스택별, 검색어)
- **인터랙티브 카드 UI** (3D 호버 효과)
- **동적 상세 페이지** (Notion 블록 렌더링)
- **GitHub/Live 링크 연동**

### 📝 **블로그**

- **Notion CMS 기반** 콘텐츠 관리
- **실시간 검색** (디바운스 적용)
- **카테고리/태그 필터링**
- **스마트 페이지네이션**
- **인터랙티브 목차** (스크롤 스파이)
- **관련 포스트 추천** (AI 기반)
- **코드 하이라이팅** (Shiki)

### 💬 **하이브리드 댓글 시스템**

- **GitHub 사용자**: Giscus (GitHub Discussions)
- **일반 사용자**: Supabase + 이메일 인증
- **시스템 선택 UI** (통계 표시)
- **실시간 좋아요/답글** 기능
- **스팸 신고 시스템**
- **다크모드 자동 연동**

### 🎨 **UX/UI**

- **다크/라이트 모드** (시스템 테마 감지)
- **스무스 스크롤** (Lenis)
- **마이크로 인터랙션** (Framer Motion)
- **반응형 디자인** (모바일 우선)
- **접근성 지원** (WCAG 2.2 AA)

---

## 🛠 기술 스택

### **Frontend**

- **Framework**: Next.js 15.1.x (App Router, RSC)
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 3.x
- **Animation**: GSAP, Framer Motion, Lenis
- **State**: Zustand
- **Forms**: React Hook Form

### **Backend & Database**

- **BaaS**: Supabase (PostgreSQL)
- **CMS**: Notion API
- **Auth**: Row Level Security (RLS)
- **Real-time**: WebSocket subscriptions

### **Deployment & Tools**

- **Platform**: Vercel
- **Package Manager**: pnpm
- **Linting**: ESLint, Prettier
- **Version Control**: Git

---

## 🚀 빠른 시작

### **1. 저장소 클론**

```bash
git clone https://github.com/your-username/portfolio.git
cd portfolio
```

### **2. 의존성 설치**

```bash
pnpm install
```

### **3. 환경 변수 설정**

```bash
cp .env.example .env.local
```

필수 환경 변수:

```env
# Notion API
NOTION_API_KEY=your_notion_integration_token
NOTION_PORTFOLIO_DATABASE_ID=your_portfolio_database_id
NOTION_BLOG_DATABASE_ID=your_blog_database_id

# Supabase (댓글 시스템)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Giscus (GitHub 댓글)
NEXT_PUBLIC_GISCUS_REPO=your-username/your-repo
NEXT_PUBLIC_GISCUS_REPO_ID=your_repo_id
NEXT_PUBLIC_GISCUS_CATEGORY=Announcements
NEXT_PUBLIC_GISCUS_CATEGORY_ID=your_category_id
```

### **4. 데이터베이스 설정**

```bash
# Supabase 댓글 시스템 스키마 적용
# Supabase Dashboard > SQL Editor에서 lib/supabase/schema.sql 실행
```

### **5. 개발 서버 실행**

```bash
pnpm dev
```

🎉 [http://localhost:3000](http://localhost:3000)에서 확인하세요!

---

## 📁 프로젝트 구조

```
fullkeem_portfolio/
├── app/                      # Next.js App Router
│   ├── (routes)/            # 라우트 그룹
│   │   ├── portfolio/       # 포트폴리오 페이지
│   │   ├── blog/           # 블로그 페이지
│   │   └── contact/        # 연락처 페이지
│   ├── api/                # API Routes
│   │   └── comments/       # 댓글 API
│   ├── globals.css         # 전역 스타일
│   ├── layout.tsx          # 루트 레이아웃
│   └── page.tsx            # 홈페이지
├── components/              # 재사용 컴포넌트
│   ├── home/               # 홈페이지 섹션들
│   ├── portfolio/          # 포트폴리오 컴포넌트
│   ├── blog/               # 블로그 컴포넌트
│   ├── common/             # 공통 컴포넌트
│   └── ui/                 # UI 기본 컴포넌트
├── lib/                    # 유틸리티 & 설정
│   ├── notion/             # Notion API 클라이언트
│   ├── supabase/           # Supabase 설정 & 스키마
│   └── utils.ts            # 공통 유틸리티
├── store/                  # Zustand 상태 관리
├── types/                  # TypeScript 타입 정의
├── hooks/                  # 커스텀 훅
└── docs/                   # 프로젝트 문서
```

---

## 🎯 핵심 기능 상세

### **📊 Notion CMS 연동**

```typescript
// 포트폴리오 자동 동기화
const portfolios = await notionClient.getPortfolios({
  filter: { tech: 'React' },
  sort: 'created_time',
});

// 블로그 포스트 실시간 업데이트
const posts = await notionClient.getBlogPosts({
  category: 'Development',
  published: true,
});
```

### **💬 하이브리드 댓글 시스템**

```typescript
// 시스템 선택 기반 댓글 렌더링
<Comments slug="blog-post-1" title="포스트 제목">
  {/* GitHub 사용자: Giscus */}
  {/* 일반 사용자: Supabase + 이메일 */}
</Comments>

// 실시간 댓글 구독
const unsubscribe = commentService.subscribeToComments(
  postSlug,
  (payload) => setComments(payload.new)
);
```

### **🎨 애니메이션 시스템**

```typescript
// GSAP 타이핑 애니메이션
gsap.to('.typing-text', {
  text: 'Full-Stack Developer',
  duration: 2,
  ease: 'none',
});

// 스크롤 트리거 애니메이션
ScrollTrigger.create({
  trigger: '.portfolio-section',
  start: 'top 80%',
  animation: gsap.from('.portfolio-card', {
    y: 100,
    opacity: 0,
    stagger: 0.2,
  }),
});
```

---

## 🔧 개발 가이드

### **새로운 포트폴리오 추가**

1. Notion Database에 새 페이지 생성
2. 필수 속성 입력 (제목, 기술스택, 링크 등)
3. 자동으로 사이트에 반영 ✨

### **블로그 포스트 작성**

1. Notion에서 새 페이지 생성
2. `published: true` 체크박스 활성화
3. 실시간으로 블로그에 게시 📝

### **댓글 시스템 관리**

```sql
-- 댓글 승인 (관리자)
SELECT approve_comment('comment-uuid');

-- 스팸 댓글 삭제
SELECT delete_comment('comment-uuid');

-- 통계 조회
SELECT * FROM comment_stats WHERE post_slug = 'blog-post';
```

---

## 📈 성능 & SEO

### **성능 최적화**

- ⚡ **이미지 최적화**: Next.js Image + WebP
- 🚀 **코드 분할**: Dynamic Imports
- 📦 **번들 최적화**: Tree Shaking
- 🎯 **캐싱 전략**: ISR + SWR

### **SEO 최적화**

- 📊 **구조화된 데이터**: JSON-LD
- 🏷️ **메타 태그**: Open Graph, Twitter Card
- 🗺️ **사이트맵**: 자동 생성
- 🤖 **robots.txt**: 크롤링 최적화

### **접근성**

- ♿ **WCAG 2.2 AA** 준수
- ⌨️ **키보드 네비게이션** 지원
- 📱 **스크린 리더** 최적화
- 🎨 **색상 대비** 4.5:1 이상

---

## 🧪 테스트

### **댓글 시스템 테스트**

```bash
# 테스트 페이지 접속
http://localhost:3000/test-comments

# API 테스트
curl -X GET "http://localhost:3000/api/comments?slug=test-post"
curl -X POST "http://localhost:3000/api/comments" \
  -H "Content-Type: application/json" \
  -d '{"post_slug":"test","author_name":"테스터","author_email":"test@example.com","content":"테스트 댓글"}'
```
## 🚀 배포

### **Vercel 배포**

```bash
# Vercel CLI 설치
npm i -g vercel

# 프로젝트 배포
vercel --prod

# 환경 변수 설정
vercel env add NOTION_API_KEY
vercel env add NEXT_PUBLIC_SUPABASE_URL
```

### **도메인 연결**

1. Vercel Dashboard에서 도메인 추가
2. DNS 설정 (A 레코드/CNAME)
3. SSL 인증서 자동 발급 🔒

---

## 📚 API 문서

### **댓글 API**

```typescript
// 댓글 목록 조회
GET /api/comments?slug=post-slug

// 댓글 작성
POST /api/comments
{
  "post_slug": "string",
  "author_name": "string",
  "author_email": "string",
  "content": "string",
  "reply_to": "uuid" // 선택사항
}

// 좋아요 토글
POST /api/comments/[id]/like

// 댓글 통계
GET /api/comments/custom-stats?slug=post-slug
```

---

## 📞 연락처

- **이메일**: cm730712@gmail.com
- **GitHub**: [@fullkeem](https://github.com/fullkeem)
<!-- - **블로그**: [개발 블로그](https://fullkeem.dev) -->

---

## 📄 라이선스

MIT License - 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

---

<!-- <div align="center">

**⭐ 이 프로젝트가 도움이 되었다면 스타를 눌러주세요!**

Made with ❤️ by [FullKeem](https://github.com/fullkeem)

</div> -->
