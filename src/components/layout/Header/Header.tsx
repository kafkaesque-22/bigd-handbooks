'use client';

import React, { useState, useEffect, useCallback, memo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Hamburger from '@/components/ui/Hamburger';
import ThemeToggle from '@/components/ui/ThemeToggle';
import MobileOverlay from './MobileOverlay';
import styles from './Header.module.css';

const Header = memo(() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
  }, [isMenuOpen]);

  const navLinks = [
    { name: 'Editorial Styles', href: '/handbook/editorial-styles' },
    { name: 'Writing Principles', href: '/handbook/writing-principles' },
    { name: 'Web Management', href: '/handbook/web-management' },
  ];

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.brand}>
            <Link href="/">BIGD Handbooks</Link>
          </div>

          <nav className={styles.desktopNav}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.navLink} ${pathname === link.href ? styles.active : ''}`}
              >
                {link.name}
              </Link>
            ))}
            <div className={styles.toggleWrapper}>
              <ThemeToggle />
            </div>
          </nav>

          <div className={styles.mobileActions}>
            <Hamburger isOpen={isMenuOpen} onClick={toggleMenu} />
          </div>
        </div>
      </header>

      {isMenuOpen && <MobileOverlay isOpen={isMenuOpen} />}
    </>
  );
});

Header.displayName = 'Header';

export default Header;