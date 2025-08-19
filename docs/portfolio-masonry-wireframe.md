# Portfolio Image Gallery - Masonry Layout Wireframe

## 개요

react-masonry-css를 활용한 이미지 중심 포트폴리오 갤러리의 Masonry 레이아웃 와이어프레임 (Pinterest 스타일)

## 레이아웃 구조

### 1. Header Section

- **Page Title**: "Portfolio Gallery" (중앙 정렬)
- **Description**: "Image-focused Portfolio Layout" (중앙 정렬)
- **Spacing**: 상단 패딩 80px, 하단 마진 40px

### 2. Masonry Grid Section

- **Grid Configuration**:
  - Desktop (1200px+): 3열
  - Tablet (768px-1199px): 2열
  - Mobile (768px 미만): 1열
- **Gap**: 카드 간 간격 32px
- **Image Aspect Ratios**: 다양한 비율 (가로형/정사각형/세로형/긴세로형)

### 3. Image Card Structure

각 이미지 카드는 다음과 같이 구성:

- **Image Only**: 텍스트 콘텐츠 없이 이미지만 표시
- **Card Style**:
  - 둥근 테두리 (border-radius: 8px)
  - 얇은 테두리 (stroke: #ced4da)
  - 호버 시 컬러 테두리 애니메이션 효과
- **Interactive Elements**: 클릭 시 상세 페이지 이동

### 4. Results Counter

- **Position**: 그리드 하단
- **Content**: "총 N개의 이미지"
- **Style**: 작은 텍스트, 중앙 정렬

## Masonry 레이아웃 특징

### 이미지 비율 패턴

1. **Landscape Image** (~200px 높이):

   - 가로형 이미지 (16:9, 4:3 비율)
   - 상대적으로 낮은 높이로 수평 공간 효율성 증대

2. **Square Image** (~280px 높이):

   - 정사각형 이미지 (1:1 비율)
   - 균형잡힌 시각적 안정감 제공

3. **Portrait Image** (~350px 높이):

   - 세로형 이미지 (3:4, 2:3 비율)
   - 세로 공간을 효과적으로 활용

4. **Tall Portrait** (~420px 높이):
   - 긴 세로형 이미지 (9:16, 2:5 비율)
   - 강한 시각적 임팩트와 다이나믹한 레이아웃

### 반응형 동작

- **Desktop**: 3열, 이미지 너비 280px 고정
- **Tablet**: 2열, 이미지 너비 ~340px
- **Mobile**: 1열, 이미지 너비 전체 너비

### 애니메이션 효과

- **Page Load**: 이미지들이 순차적으로 fadeIn
- **Hover**: 컬러 테두리 애니메이션 (파란색/녹색/빨간색 순환)
- **Click**: 상세 페이지로 부드러운 전환

## Pinterest 스타일 UX 고려사항

### 장점

- **시각적 임팩트**: 이미지가 주는 즉각적인 시각적 만족
- **자연스러운 브라우징**: 스크롤하며 자연스럽게 콘텐츠 탐색
- **효율적 공간 활용**: 다양한 비율로 빈 공간 최소화
- **모바일 친화적**: 세로 스크롤에 최적화된 레이아웃

### 주의사항

- **이미지 품질 관리**: 고해상도 이미지로 품질 유지 필수
- **로딩 성능**: 이미지 lazy loading 및 최적화 필수
- **접근성**: alt 텍스트 및 키보드 네비게이션 고려
- **SEO**: 이미지 기반이므로 메타데이터 최적화 중요

## 기술적 구현 포인트

### Masonry 설정

```javascript
const breakpointColumns = {
  default: 3, // Desktop: 3열
  1100: 2, // Tablet: 2열
  700: 1, // Mobile: 1열
};
```

### CSS 스타일링

```css
.masonry-grid {
  display: flex;
  margin-left: -2rem; /* gap 조절 */
}
.masonry-grid-column {
  padding-left: 2rem; /* 32px gap */
  background-clip: padding-box;
}
.image-card {
  margin-bottom: 2rem;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
}
.image-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}
```

### 이미지 최적화

- **Next.js Image 컴포넌트**: 자동 최적화 및 lazy loading
- **반응형 이미지**: sizes 속성으로 디바이스별 최적 크기 제공
- **Blur Placeholder**: 이미지 로딩 중 블러 효과
- **포맷 최적화**: AVIF → WebP → JPEG 순서로 fallback

### 성능 최적화

```javascript
// 이미지 lazy loading with Intersection Observer
const useImageLazyLoading = () => {
  const [inView, setInView] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, []);

  return { imgRef, inView };
};
```

### 사용자 경험 개선

- **Infinite Scroll**: 사용자가 스크롤하면서 자연스럽게 더 많은 이미지 로드
- **Image Preview**: 클릭 시 라이트박스 또는 오버레이로 큰 이미지 표시
- **Smooth Transitions**: Framer Motion으로 부드러운 페이지 전환
- **Loading States**: 이미지 로딩 중 스켈레톤 UI 표시
