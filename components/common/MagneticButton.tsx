'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  magneticStrength?: number;
  scaleOnHover?: number;
}

export function MagneticButton({
  children,
  className = '',
  onClick,
  href,
  magneticStrength = 0.3,
  scaleOnHover = 1.05,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    setPosition({
      x: distanceX * magneticStrength,
      y: distanceY * magneticStrength,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
  };

  const motionProps = {
    animate: {
      x: position.x,
      y: position.y,
      scale: isHovered ? scaleOnHover : 1,
    },
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 300,
      mass: 0.5,
    },
    onMouseMove: handleMouseMove,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
  };

  if (href) {
    return (
      <motion.div ref={buttonRef} className="inline-block" {...motionProps}>
        <a href={href} className={className} onClick={onClick}>
          {children}
        </a>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={buttonRef}
      className={`inline-block cursor-pointer ${className}`}
      onClick={onClick}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}

// 커스텀 커서 컴포넌트
export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const moveCursor = (e: MouseEvent) => {
    if (cursorRef.current) {
      cursorRef.current.style.left = e.clientX + 'px';
      cursorRef.current.style.top = e.clientY + 'px';
    }
  };

  const handleMouseOver = (e: Event) => {
    const target = e.target as HTMLElement;
    if (
      target.tagName.toLowerCase() === 'a' ||
      target.tagName.toLowerCase() === 'button' ||
      target.closest('button') ||
      target.closest('a')
    ) {
      setIsPointer(true);
    } else {
      setIsPointer(false);
    }
  };

  const handleMouseEnter = () => setIsHidden(false);
  const handleMouseLeave = () => setIsHidden(true);

  useEffect(() => {
    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <motion.div
      ref={cursorRef}
      className={`pointer-events-none fixed z-50 mix-blend-difference ${isHidden ? 'opacity-0' : 'opacity-100'}`}
      animate={{
        scale: isPointer ? 1.5 : 1,
        backgroundColor: isPointer ? '#ffffff' : '#000000',
      }}
      transition={{
        type: 'spring',
        damping: 30,
        stiffness: 400,
      }}
      style={{
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        backgroundColor: '#000000',
        transform: 'translate(-50%, -50%)',
      }}
    />
  );
}

// 3D 틸트 효과 컴포넌트
interface TiltCardProps {
  children: ReactNode;
  className?: string;
  tiltStrength?: number;
}

export function TiltCard({ children, className = '', tiltStrength = 15 }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const rotateY = ((e.clientX - centerX) / rect.width) * tiltStrength;
    const rotateX = ((centerY - e.clientY) / rect.height) * tiltStrength;

    setTransform({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setTransform({ rotateX: 0, rotateY: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      className={className}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      animate={{
        rotateX: transform.rotateX,
        rotateY: transform.rotateY,
      }}
      transition={{
        type: 'spring',
        damping: 20,
        stiffness: 300,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}
