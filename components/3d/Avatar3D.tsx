'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';

interface Avatar3DProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  enableInteraction?: boolean;
  animationSpeed?: 'slow' | 'normal' | 'fast';
}

const sizeClasses = {
  sm: 'w-48 h-48',   // 192px
  md: 'w-64 h-64',   // 256px  
  lg: 'w-80 h-80',   // 320px
  xl: 'w-96 h-96',   // 384px
};

const animationSpeeds = {
  slow: { float: 4, rotate: 8 },
  normal: { float: 3, rotate: 6 },
  fast: { float: 2, rotate: 4 },
};

export function Avatar3D({ 
  src = '/images/avatar.png', 
  alt = 'Developer Avatar',
  size = 'lg',
  className = '',
  enableInteraction = true,
  animationSpeed = 'normal'
}: Avatar3DProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const speeds = animationSpeeds[animationSpeed];

  return (
    <div className={`perspective-1200 ${className}`}>
      <motion.div
        className={`
          avatar-3d-container avatar-responsive avatar-gpu-optimized
          ${sizeClasses[size]} 
          mx-auto cursor-pointer
          ${enableInteraction ? 'avatar-interactive' : ''}
        `}
        onHoverStart={() => enableInteraction && setIsHovered(true)}
        onHoverEnd={() => enableInteraction && setIsHovered(false)}
        onTapStart={() => enableInteraction && setIsClicked(true)}
        onTap={() => enableInteraction && setTimeout(() => setIsClicked(false), 200)}
        
        // 기본 부유 애니메이션 (미니멀하게 조절)
        animate={{
          y: [0, -6, 0],
          rotateY: [0, 2, 0, -2, 0],
        }}
        transition={{
          y: {
            duration: speeds.float,
            repeat: Infinity,
            ease: "easeInOut"
          },
          rotateY: {
            duration: speeds.rotate,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
        
        // 호버 애니메이션 (CSS와 연동)
        whileHover={enableInteraction ? {
          scale: 1.05,
          rotateY: 12,
          rotateX: 5,
          z: 25,
          transition: { 
            duration: 0.4,
            ease: "easeOut"
          }
        } : {}}
        
        // 클릭 애니메이션 
        whileTap={enableInteraction ? {
          scale: 0.95,
          rotateY: -8,
          rotateX: 3,
          transition: { 
            duration: 0.15,
            ease: "easeOut"
          }
        } : {}}
      >
        <motion.div
          className="avatar-card relative w-full h-full"
          animate={{
            // 클릭 시 미세한 진동 효과
            rotateZ: isClicked ? [0, -1, 1, -1, 0] : 0
          }}
          transition={{ duration: 0.3 }}
        >
          {/* 메인 아바타 이미지 */}
          <Image
            src={src}
            alt={alt}
            fill
            className={`
              avatar-minimal avatar-smooth
              object-cover transition-all duration-400 ease-out
              ${isHovered ? 'shadow-3d-hover glow-minimal-hover' : 'shadow-3d glow-minimal'}
            `}
            sizes="(max-width: 768px) 240px, (max-width: 1024px) 280px, 320px"
            priority
            quality={90}
          />
          
          {/* 백그라운드 글로우 효과 */}
          <motion.div
            className="
              absolute inset-0 rounded-full -z-10
              bg-gradient-to-br from-slate-200/30 to-slate-300/20
            "
            animate={{
              scale: isHovered ? 1.1 : 1.05,
              opacity: isHovered ? 0.7 : 0.4,
            }}
            transition={{ duration: 0.4 }}
          />
          
          {/* 상호작용 힌트 (호버 시에만 표시) */}
          {enableInteraction && (
            <motion.div
              className="absolute -bottom-6 left-1/2 transform -translate-x-1/2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ 
                opacity: isHovered ? 1 : 0,
                y: isHovered ? 0 : 10
              }}
              transition={{ 
                duration: 0.3,
                delay: isHovered ? 0.2 : 0
              }}
            >
              <div className="
                bg-background/90 backdrop-blur-sm 
                px-3 py-1.5 rounded-full 
                border border-border/50
                shadow-lg
              ">
                <span className="text-xs text-muted-foreground font-medium">
                  Click me! 👋
                </span>
              </div>
            </motion.div>
          )}

          {/* 클릭 시 리플 효과 */}
          {enableInteraction && isClicked && (
            <motion.div
              className="
                absolute inset-0 rounded-full border-2 border-primary/30
                pointer-events-none
              "
              initial={{ scale: 0.8, opacity: 0.8 }}
              animate={{ scale: 1.4, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}

// 고급 마우스 추적 버전 (선택사항)
export function EnhancedAvatar3D(props: Avatar3DProps) {
  // 향후 확장용 - 마우스 추적 기능 등
  return <Avatar3D {...props} />;
}
