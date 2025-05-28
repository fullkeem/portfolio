import { cn } from '@/lib/utils/cn';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export function Container({ 
  children, 
  className,
  as: Component = 'div' 
}: ContainerProps) {
  return (
    <Component 
      className={cn(
        'container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl',
        className
      )}
    >
      {children}
    </Component>
  );
}
