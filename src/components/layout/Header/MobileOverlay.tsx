'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from '@/components/ui/ThemeToggle';
import styles from './MobileOverlay.module.css';

interface MobileOverlayProps {
  isOpen: boolean;
}

const MobileOverlay: React.FC<MobileOverlayProps> = ({ isOpen }) => {
  const pathname = usePathname();

  const navLinks = [
    { name: 'Editorial Styles', href: '/handbook/editorial-styles' },
    { name: 'Writing Principles', href: '/handbook/writing-principles' },
    { name: 'Web Management', href: '/handbook/web-management' },
  ];

  return (
    <div 
      className={`${styles.overlay} ${isOpen ? styles.open : ''}`}
      role="dialog"
      aria-modal="true"
      aria-hidden={!isOpen}
    >
      <div className={styles.content}>
        <nav className={styles.nav}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.link} ${pathname === link.href ? styles.active : ''}`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className={styles.footer}>
          <div className={styles.toggleLarge}>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileOverlay;