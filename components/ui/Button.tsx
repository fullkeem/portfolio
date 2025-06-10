'use client';

import { forwardRef, ReactNode } from 'react';
import { motion, MotionProps } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'magnetic';
type ButtonSize = 'sm' | 'md' | 'lg';

interface BaseButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

interface MotionButtonProps extends BaseButtonProps, Omit<MotionProps, 'children'> {
  animated?: true;
}

interface RegularButtonProps extends BaseButtonProps {
  animated?: false;
  type?: 'button' | 'submit' | 'reset';
}

type ButtonProps = MotionButtonProps | RegularButtonProps;

const buttonVariants = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:ring-secondary',
  ghost: 'hover:bg-accent hover:text-accent-foreground focus:ring-accent',
  outline:
    'border border-input bg-background hover:bg-accent hover:text-accent-foreground focus:ring-accent',
  magnetic: 'bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary',
};

const buttonSizes = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-10 px-4 py-2',
  lg: 'h-11 px-8 text-lg',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled = false,
      icon,
      iconPosition = 'left',
      className = '',
      animated = false,
      onClick,
      ...props
    },
    ref
  ) => {
    const baseClasses = cn(
      'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium',
      'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
      'disabled:pointer-events-none disabled:opacity-50',
      buttonVariants[variant],
      buttonSizes[size],
      className
    );

    const content = (
      <>
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {!loading && icon && iconPosition === 'left' && icon}
        {children}
        {!loading && icon && iconPosition === 'right' && icon}
      </>
    );

    if (animated) {
      const motionProps = props as Omit<MotionProps, 'children'>;
      return (
        <motion.button
          ref={ref}
          className={baseClasses}
          disabled={disabled || loading}
          onClick={onClick}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
          {...motionProps}
        >
          {content}
        </motion.button>
      );
    }

    const regularProps = props as Omit<RegularButtonProps, 'children' | 'animated'>;
    return (
      <button
        ref={ref}
        className={baseClasses}
        disabled={disabled || loading}
        onClick={onClick}
        {...regularProps}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';
