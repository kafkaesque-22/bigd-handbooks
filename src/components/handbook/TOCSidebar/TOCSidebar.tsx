'use client';

import React, { useLayoutEffect, useState, useRef, memo, useCallback } from 'react';
import styles from './TOCSidebar.module.css';

interface Section {
  id: string;
  title: string;
}

interface TOCSidebarProps {
  sections: Section[];
  activeId: string;
  onManualScroll?: (id: string) => void;
}

const TOCSidebar = memo(({ sections, activeId, onManualScroll }: TOCSidebarProps) => {
  const [pillStyle, setPillStyle] = useState({ top: 0, height: 0 });
  const [isReady, setIsReady] = useState(false);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const activeIndex = sections.findIndex((s) => s.id === activeId);
    const element = itemRefs.current[activeIndex];

    if (element) {
      setPillStyle({
        top: element.offsetTop,
        height: element.offsetHeight,
      });

      element.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });

      setIsReady(true);
    }
  }, [activeId, sections]);

  const handleClick = useCallback((id: string) => {
    onManualScroll?.(id);
  }, [onManualScroll]);

  return (
    <nav className={`${styles.nav} toc-sidebar-stable`}>
      <p className={styles.label}>ON THIS PAGE</p>
      <div className={styles.listContainer} ref={scrollContainerRef}>
        {isReady && (
          <div
            className={styles.slidingPill}
            style={{
              transform: `translateY(${pillStyle.top}px)`,
              height: `${pillStyle.height}px`,
            }}
          />
        )}

        <div className={styles.list}>
          {sections.map((section, index) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              onClick={() => handleClick(section.id)}
              className={`${styles.pill} ${activeId === section.id ? styles.active : ''}`}
            >
              {section.title}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
});

TOCSidebar.displayName = 'TOCSidebar';

export default TOCSidebar;