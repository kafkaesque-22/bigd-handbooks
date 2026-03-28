'use client';

import React, { memo } from 'react';
import styles from './Shell.module.css';

interface ShellProps {
  children: React.ReactNode;
}

const Shell: React.FC<ShellProps> = memo(({ children }) => {
  return (
    <div className={styles.root}>
      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
});

Shell.displayName = 'Shell';

export default Shell;