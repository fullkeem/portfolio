'use client';

import { motion } from 'framer-motion';
import { useState, useCallback, useMemo, memo, KeyboardEvent } from 'react';
import Image from 'next/image';
import { Avatar3DProps } from '@/types/avatar';
import { defaultAccessibilityConfig } from '@/types/avatar';

const sizeClasses = {
  sm: 'w-48 h-48', // 192px
  md: 'w-64 h-64', // 256px
  lg: 'w-80 h-80', // 320px
  xl: 'w-96 h-96', // 384px
} as const;

const animationSpeeds = {
  slow: { float: 4, rotate: 8 },
  normal: { float: 3, rotate: 6 },
  fast: { float: 2, rotate: 4 },
} as const;

// 메모이제이션된 컴포넌트
export const Avatar3D = memo(function Avatar3D({
  alt = 'Developer Avatar',
  size = 'lg',
  className = '',
  enableInteraction = true,
  animationSpeed = 'normal',
  description,
  ariaLabel,
  focusable = true,
  onClick,
  onFocus,
  onBlur,
}: Avatar3DProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // 이미지 상태 관리: 클릭할 때마다 토글
  const [isClickedImage, setIsClickedImage] = useState(false);
  const currentImageSrc = isClickedImage ? '/images/click.png' : '/images/default.png';

  // 애니메이션 설정 메모이제이션
  const speeds = useMemo(() => animationSpeeds[animationSpeed], [animationSpeed]);

  // 이벤트 핸들러 최적화
  const handleHoverStart = useCallback(() => {
    if (enableInteraction) setIsHovered(true);
  }, [enableInteraction]);

  const handleHoverEnd = useCallback(() => {
    if (enableInteraction) setIsHovered(false);
  }, [enableInteraction]);

  const handleTapStart = useCallback(() => {
    if (enableInteraction) setIsClicked(true);
  }, [enableInteraction]);

  const handleTap = useCallback(() => {
    if (enableInteraction) {
      setTimeout(() => setIsClicked(false), 200);
      // 이미지 상태 토글
      setIsClickedImage((prev) => !prev);
      onClick?.();
    }
  }, [enableInteraction, onClick]);

  // 접근성: 키보드 이벤트 핸들러
  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (!enableInteraction) return;

      // Enter 또는 Space 키로 활성화
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        setIsClicked(true);
        setTimeout(() => setIsClicked(false), 200);
        // 이미지 상태 토글
        setIsClickedImage((prev) => !prev);
        onClick?.();
      }
    },
    [enableInteraction, onClick]
  );

  // 접근성: 포커스 이벤트 핸들러
  const handleFocus = useCallback(() => {
    setIsFocused(true);
    onFocus?.();
  }, [onFocus]);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    onBlur?.();
  }, [onBlur]);

  // 애니메이션 설정 메모이제이션
  const floatAnimation = useMemo(
    () => ({
      y: [0, -6, 0],
      rotateY: [0, 2, 0, -2, 0],
    }),
    []
  );

  const floatTransition = useMemo(
    () => ({
      y: {
        duration: speeds.float,
        repeat: Infinity,
        ease: 'easeInOut' as const,
      },
      rotateY: {
        duration: speeds.rotate,
        repeat: Infinity,
        ease: 'easeInOut' as const,
      },
    }),
    [speeds]
  );

  const hoverAnimation = useMemo(
    () =>
      enableInteraction
        ? {
            scale: 1.05,
            rotateY: 12,
            rotateX: 5,
            z: 25,
            transition: {
              duration: 0.4,
              ease: 'easeOut',
            },
          }
        : {},
    [enableInteraction]
  );

  const tapAnimation = useMemo(
    () =>
      enableInteraction
        ? {
            scale: 0.95,
            rotateY: -8,
            rotateX: 3,
            transition: {
              duration: 0.15,
              ease: 'easeOut',
            },
          }
        : {},
    [enableInteraction]
  );

  // CSS 클래스 메모이제이션
  const containerClasses = useMemo(
    () =>
      `
    avatar-3d-container avatar-responsive avatar-gpu-optimized
    ${sizeClasses[size]} 
    mx-auto 
    ${enableInteraction ? 'cursor-pointer avatar-interactive' : 'cursor-default'}
    focus:outline-none
    transition-all duration-200
  `.trim(),
    [size, enableInteraction]
  );

  const imageClasses = useMemo(
    () =>
      `
    avatar-minimal avatar-smooth
    object-cover object-[center_72%] transition-all duration-400 ease-out
    ${isHovered || isFocused ? 'shadow-3d-hover glow-minimal-hover' : 'shadow-3d glow-minimal'}
  `.trim(),
    [isHovered, isFocused]
  );

  // 접근성 속성 계산
  const accessibilityProps = useMemo(() => {
    const props: Record<string, string | number> = {
      role: enableInteraction ? 'button' : 'img',
      'aria-label':
        ariaLabel ||
        (enableInteraction ? `${alt}. ${defaultAccessibilityConfig.keyboardInstructions}` : alt),
    };

    if (description) {
      props['aria-describedby'] = 'avatar-description';
    }

    if (enableInteraction && focusable) {
      props.tabIndex = 0;
    }

    return props;
  }, [enableInteraction, focusable, ariaLabel, alt, description]);

  return (
    <div className={`perspective-1200 ${className}`}>
      <motion.div
        className={containerClasses}
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
        onTapStart={handleTapStart}
        onTap={handleTap}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...accessibilityProps}
        // 기본 부유 애니메이션 (미니멀하게 조절)
        animate={floatAnimation}
        transition={floatTransition}
        // 호버 애니메이션 (CSS와 연동)
        whileHover={hoverAnimation}
        // 클릭 애니메이션
        whileTap={tapAnimation}
      >
        <motion.div
          className="avatar-card relative h-full w-full"
          animate={{
            // 클릭 시 미세한 진동 효과
            rotateZ: isClicked ? [0, -1, 1, -1, 0] : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          {/* 메인 아바타 이미지 - 클릭에 따라 변경 */}
          <Image
            src={currentImageSrc}
            alt={isClickedImage ? '클릭된 아바타' : '기본 아바타'}
            fill
            className={imageClasses}
            sizes="(max-width: 768px) 240px, (max-width: 1024px) 280px, 320px"
            priority
            quality={85} // 품질 최적화
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          />

          {/* 백그라운드 글로우 효과 */}
          <motion.div
            className="absolute inset-0 -z-10 rounded-full bg-gradient-to-br from-slate-200/30 to-slate-300/20"
            animate={{
              scale: isHovered || isFocused ? 1.1 : 1.05,
              opacity: isHovered || isFocused ? 0.7 : 0.4,
            }}
            transition={{ duration: 0.4 }}
          />

          {/* 상호작용 힌트 (호버/포커스 시에만 표시) */}
          {enableInteraction && (
            <motion.div
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 transform"
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: isHovered || isFocused ? 1 : 0,
                y: isHovered || isFocused ? 0 : 10,
              }}
              transition={{
                duration: 0.3,
                delay: isHovered || isFocused ? 0.2 : 0,
              }}
            >
              <div className="rounded-full border border-border/50 bg-background/90 px-3 py-1.5 shadow-lg backdrop-blur-sm">
                <span className="text-xs font-medium text-muted-foreground">
                  {isFocused
                    ? 'Enter 또는 Space 키를 눌러주세요'
                    : isClickedImage
                      ? '다시 클릭해서 되돌리기! 🔄'
                      : '클릭해보세요! 👋'}
                </span>
              </div>
            </motion.div>
          )}

          {/* 클릭 시 리플 효과 */}
          {enableInteraction && isClicked && (
            <motion.div
              className="pointer-events-none absolute inset-0 rounded-full border-2 border-primary/30"
              initial={{ scale: 0.8, opacity: 0.8 }}
              animate={{ scale: 1.4, opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          )}
        </motion.div>

        {/* 접근성: 스크린 리더용 설명 */}
        {description && (
          <div id="avatar-description" className="sr-only">
            {description}
          </div>
        )}

        {/* 접근성: 모션 감소 설정 시 대체 텍스트 */}
        <div className="sr-only motion-safe:hidden">
          {defaultAccessibilityConfig.reducedMotionText}
        </div>
      </motion.div>
    </div>
  );
});

// 고급 마우스 추적 버전 (선택사항)
export const EnhancedAvatar3D = memo(function EnhancedAvatar3D(props: Avatar3DProps) {
  // 향후 확장용 - 마우스 추적 기능 등
  return <Avatar3D {...props} />;
});
