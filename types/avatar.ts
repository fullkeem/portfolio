// Avatar 3D 컴포넌트 관련 타입 정의

export interface Avatar3DProps {
  /** 아바타 이미지 소스 경로 */
  src?: string;
  /** 이미지 alt 텍스트 */
  alt?: string;
  /** 아바타 크기 옵션 */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** 추가 CSS 클래스명 */
  className?: string;
  /** 인터랙티브 기능 활성화 여부 */
  enableInteraction?: boolean;
  /** 애니메이션 속도 설정 */
  animationSpeed?: 'slow' | 'normal' | 'fast';
  /** 접근성을 위한 추가 설명 */
  description?: string;
  /** ARIA 라벨 */
  ariaLabel?: string;
  /** 키보드 포커스 가능 여부 */
  focusable?: boolean;
  /** 클릭 이벤트 핸들러 */
  onClick?: () => void;
  /** 포커스 이벤트 핸들러 */
  onFocus?: () => void;
  /** 블러 이벤트 핸들러 */
  onBlur?: () => void;
}

export interface AvatarAnimationConfig {
  /** 호버 애니메이션 설정 */
  hover: {
    scale: number;
    rotateY: number;
    rotateX: number;
    duration: number;
  };
  /** 부유 애니메이션 설정 */
  float: {
    yRange: number[];
    duration: number;
  };
  /** 회전 애니메이션 설정 */
  rotate: {
    yRange: number[];
    duration: number;
  };
}

export interface AvatarSizeConfig {
  /** 아바타 크기별 CSS 클래스 */
  [key: string]: string;
}

export interface AvatarSpeedConfig {
  /** 애니메이션 속도별 설정 */
  [key: string]: {
    float: number;
    rotate: number;
  };
}

// 아바타 테마 관련 타입
export interface AvatarTheme {
  /** 글로우 색상 */
  glowColor: string;
  /** 배경 그라데이션 */
  backgroundGradient: string;
  /** 그림자 색상 */
  shadowColor: string;
}

// 접근성 관련 타입
export interface AvatarAccessibilityConfig {
  /** 스크린 리더용 설명 */
  screenReaderText: string;
  /** 키보드 내비게이션 설명 */
  keyboardInstructions: string;
  /** 모션 감소 시 대체 텍스트 */
  reducedMotionText: string;
}

// 기본 아바타 테마들
export const avatarThemes: Record<string, AvatarTheme> = {
  minimal: {
    glowColor: 'rgba(71, 85, 105, 0.15)',
    backgroundGradient: 'from-slate-200/30 to-slate-300/20',
    shadowColor: 'rgba(0, 0, 0, 0.1)'
  },
  primary: {
    glowColor: 'rgba(59, 130, 246, 0.2)',
    backgroundGradient: 'from-primary/20 to-primary/10',
    shadowColor: 'rgba(59, 130, 246, 0.15)'
  },
  accent: {
    glowColor: 'rgba(168, 85, 247, 0.2)',
    backgroundGradient: 'from-accent/20 to-accent/10',
    shadowColor: 'rgba(168, 85, 247, 0.15)'
  }
};

// 기본 접근성 설정
export const defaultAccessibilityConfig: AvatarAccessibilityConfig = {
  screenReaderText: '개발자 아바타. 인터랙티브한 3D 효과가 있습니다.',
  keyboardInstructions: 'Enter 또는 Space 키를 눌러 상호작용할 수 있습니다.',
  reducedMotionText: '정적인 개발자 아바타 이미지입니다.'
};
