'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';
import { Logo } from './Logo';
import { cn } from '@/lib/utils/cn';
import { mainNavigation } from '@/config/navigation';

const navigation = mainNavigation;

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 모바일 메뉴 열릴 때 스크롤 방지 및 ESC 키 이벤트
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';

      // ESC 키로 메뉴 닫기
      const handleEscKey = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          setIsMobileMenuOpen(false);
        }
      };

      document.addEventListener('keydown', handleEscKey);

      return () => {
        document.body.style.overflow = 'unset';
        document.removeEventListener('keydown', handleEscKey);
      };
    } else {
      document.body.style.overflow = 'unset';
    }

    // 컴포넌트 언마운트 시 정리
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={cn(
        'fixed top-0 z-50 w-full transition-all duration-300',
        isScrolled ? 'border-b bg-background/80 backdrop-blur-md' : 'bg-transparent'
      )}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <h1 className="text-l flex items-center gap-1 font-bold">
            <Logo
              size="lg"
              href="/"
              ariaLabel="fullkeem 홈페이지로 이동"
              className="text-xl font-bold"
            />
            Fullkeem
          </h1>
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'relative text-sm font-medium transition-colors hover:text-primary',
                  pathname === item.href ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                {item.name}
                {pathname === item.href && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 top-full h-[2px] w-full bg-primary"
                  />
                )}
              </Link>
            ))}
            <ThemeToggle />
          </div>
          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                'ml-4 inline-flex items-center justify-center rounded-md p-2 transition-all duration-200',
                isMobileMenuOpen
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                  : 'text-foreground hover:bg-secondary'
              )}
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
            >
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  {isMobileMenuOpen ? (
                    <motion.path
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <motion.path
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  )}
                </svg>
              </motion.div>
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 top-16 z-40 bg-background/95 backdrop-blur-md md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Menu */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="fixed left-0 right-0 top-16 z-50 mx-4 rounded-lg border bg-background/95 shadow-lg backdrop-blur-md md:hidden"
            >
              <div className="p-4">
                <div className="space-y-2">
                  {navigation.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          'flex items-center rounded-md px-4 py-3 text-base font-medium transition-colors',
                          pathname === item.href
                            ? 'bg-primary text-primary-foreground shadow-sm'
                            : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                        )}
                      >
                        {item.name}
                        {pathname === item.href && (
                          <motion.div
                            layoutId="mobile-active"
                            className="ml-auto h-2 w-2 rounded-full bg-primary-foreground"
                          />
                        )}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </nav>
    </header>
  );
}
