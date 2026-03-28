'use client';

import React, { useEffect, useLayoutEffect, useState, useRef, memo } from 'react';
import { createPortal } from 'react-dom';
import styles from './TOCDock.module.css';

interface Section {
  id: string;
  title: string;
}

interface TOCDockProps {
  sections: Section[];
  activeId: string;
  onManualScroll?: (id: string) => void;
}

const TOCDock = memo(({ sections, activeId, onManualScroll }: TOCDockProps) => {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });
  
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);
    const footer = document.querySelector('footer');
    if (!footer) return;

    const checkVisibility = () => {
      const rect = footer.getBoundingClientRect();
      setIsVisible(rect.top > window.innerHeight);
    };

    checkVisibility();

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(!entry.isIntersecting),
      { threshold: 0, rootMargin: '-10px 0px 0px 0px' }
    );

    observer.observe(footer);
    window.addEventListener('resize', checkVisibility);
    
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', checkVisibility);
    };
  }, []);

  useLayoutEffect(() => {
    const activeIndex = sections.findIndex((s) => s.id === activeId);
    const element = itemRefs.current[activeIndex];
    const container = navRef.current;

    if (element && container) {
      setPillStyle({ 
        left: element.offsetLeft, 
        width: element.offsetWidth 
      });
      
      container.scrollTo({ 
        left: element.offsetLeft - container.offsetWidth / 2 + element.offsetWidth / 2, 
        behavior: 'smooth' 
      });
    }
  }, [activeId, sections]);

  if (!mounted) return null;

  const handleScrollClick = (id: string) => {
    onManualScroll?.(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const dockContent = (
    <div className={`${styles.dockWrapper} ${isVisible ? styles.show : styles.hide}`}>
      <nav className={styles.dock} ref={navRef}>
        <div 
          className={styles.slidingPill} 
          style={{ 
            transform: `translateX(${pillStyle.left}px)`, 
            width: `${pillStyle.width}px` 
          }} 
        />
        {sections.map((s, i) => (
          <a 
            key={s.id} 
            href={`#${s.id}`} 
            ref={(el) => { itemRefs.current[i] = el; }}
            onClick={(e) => { e.preventDefault(); handleScrollClick(s.id); }}
            className={`${styles.pill} ${activeId === s.id ? styles.active : ''}`}
          >
            {s.title}
          </a>
        ))}
      </nav>
    </div>
  );

  return createPortal(dockContent, document.body);
});

TOCDock.displayName = 'TOCDock';

export default TOCDock;