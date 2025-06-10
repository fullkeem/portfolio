'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { List, ChevronRight } from 'lucide-react';

interface TOCItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  items: TOCItem[];
  className?: string;
}

export default function TableOfContents({ items, className = '' }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          // 가장 위에 있는 요소를 활성화
          const topEntry = visibleEntries.reduce((top, entry) =>
            entry.boundingClientRect.top < top.boundingClientRect.top ? entry : top
          );
          setActiveId(topEntry.target.id);
        }
      },
      {
        rootMargin: '-20% 0% -35% 0%',
        threshold: 0,
      }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [items]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // 헤더 높이를 고려한 오프셋
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      setActiveId(id);
      setIsOpen(false); // 모바일에서 클릭 후 닫기
    }
  };

  if (items.length === 0) return null;

  return (
    <div className={`${className}`}>
      {/* 모바일 토글 버튼 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mb-4 flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 text-sm font-medium md:hidden"
        aria-expanded={isOpen}
        aria-controls="table-of-contents"
      >
        <List className="h-4 w-4" />
        목차
        <ChevronRight className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
      </button>

      {/* 목차 내용 */}
      <div className="md:block">
        <AnimatePresence>
          {(isOpen || window.innerWidth >= 768) && (
            <motion.nav
              id="table-of-contents"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden md:h-auto md:opacity-100"
              aria-label="목차"
            >
              <div className="sticky top-24 rounded-lg border bg-background p-6">
                <h2 className="mb-4 text-lg font-semibold">목차</h2>
                <ul className="space-y-2">
                  {items.map((item) => {
                    const isActive = activeId === item.id;
                    const paddingLeft = (item.level - 1) * 16;

                    return (
                      <li key={item.id} style={{ paddingLeft: `${paddingLeft}px` }}>
                        <button
                          onClick={() => scrollToHeading(item.id)}
                          className={`block w-full text-left text-sm transition-colors hover:text-primary ${
                            isActive ? 'font-medium text-primary' : 'text-muted-foreground'
                          }`}
                          aria-current={isActive ? 'true' : undefined}
                        >
                          <span className="block truncate">{item.title}</span>
                          {isActive && (
                            <motion.div
                              layoutId="toc-indicator"
                              className="mt-1 h-0.5 w-full bg-primary"
                              initial={false}
                              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            />
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// 헤딩 요소에 ID를 자동으로 추가하는 유틸리티 함수
export const addHeadingIds = (content: HTMLElement) => {
  const headings = content.querySelectorAll('h1, h2, h3, h4, h5, h6');
  headings.forEach((heading, index) => {
    if (!heading.id) {
      heading.id = `heading-${index}`;
    }
  });
};
