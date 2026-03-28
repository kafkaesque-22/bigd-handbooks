'use client';

import React, { memo, useEffect, useState, useCallback } from 'react';
import styles from './ThemeToggle.module.css';

const ThemeToggle = memo(() => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const root = document.documentElement;
    const currentTheme = (root.getAttribute('data-theme') as 'light' | 'dark') || 'light';
    setTheme(currentTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    const root = document.documentElement;
    const newTheme = theme === 'light' ? 'dark' : 'light';

    // 1. Enter "No Transition" mode for theme properties
    root.classList.add('is-switching-theme');

    // 2. Perform the update synchronously
    setTheme(newTheme);
    root.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    // 3. Force browser to repaint current state before re-enabling transitions
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        root.classList.remove('is-switching-theme');
      });
    });
  }, [theme]);

  return (
    <button
      className={styles.circle}
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      type="button"
    />
  );
});

ThemeToggle.displayName = 'ThemeToggle';

export default ThemeToggle;