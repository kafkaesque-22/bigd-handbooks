'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import TOCSidebar from './TOCSidebar/TOCSidebar';
import TOCDock from './TOCDock/TOCDock';
import styles from '@/app/handbook/[slug]/HandbookLayout.module.css';

interface Section {
  id: string;
  title: string;
}

interface HandbookContentWrapperProps {
  sections: Section[];
  children: React.ReactNode;
}

export default function HandbookContentWrapper({ sections, children }: HandbookContentWrapperProps) {
  const [activeId, setActiveId] = useState<string>('');
  const isManualScrolling = useRef(false);

  useEffect(() => {
    if (sections.length > 0) {
      const hash = window.location.hash.replace('#', '');
      setActiveId(hash && sections.find(s => s.id === hash) ? hash : sections[0].id);
    }
  }, [sections]);

  const handleManualScroll = useCallback((id: string) => {
    isManualScrolling.current = true;
    setActiveId(id);
    
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isManualScrolling.current) return;

        let mostVisible: IntersectionObserverEntry | null = null;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (!mostVisible || entry.intersectionRatio > mostVisible.intersectionRatio) {
              mostVisible = entry;
            }
          }
        }

        if (mostVisible) {
          const newId = mostVisible.target.id;
          setActiveId((prev) => (prev !== newId ? newId : prev));
        }
      },
      {
        rootMargin: '-20% 0% -70% 0%',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  useEffect(() => {
    const handleScrollEnd = () => {
      isManualScrolling.current = false;
    };
    window.addEventListener('scrollend', handleScrollEnd);
    return () => window.removeEventListener('scrollend', handleScrollEnd);
  }, []);

  return (
    <div className={styles.container}>
      <aside className={styles.columnOne}>
        <TOCSidebar
          sections={sections}
          activeId={activeId}
          onManualScroll={handleManualScroll}
        />
      </aside>

      <div className={styles.columnTwo} />

      <main className={styles.columnThree}>
        {children}
      </main>

      <TOCDock sections={sections} activeId={activeId} onManualScroll={handleManualScroll} />
    </div>
  );
}