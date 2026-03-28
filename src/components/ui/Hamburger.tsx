'use client';

import React, { memo } from 'react';
import styles from './Hamburger.module.css';

interface HamburgerProps {
  isOpen: boolean;
  onClick: () => void;
}

const Hamburger: React.FC<HamburgerProps> = memo(({ isOpen, onClick }) => {
  return (
    <button
      className={`${styles.pill} ${isOpen ? styles.open : ''}`}
      onClick={onClick}
      aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
      aria-expanded={isOpen}
      type="button"
    >
      <div className={styles.lineWrapper}>
        <span className={styles.lineTop} />
        <span className={styles.lineBottom} />
      </div>
    </button>
  );
});

Hamburger.displayName = 'Hamburger';

export default Hamburger;