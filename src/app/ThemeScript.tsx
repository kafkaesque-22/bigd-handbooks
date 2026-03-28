import React from 'react';

const themeScript = `
  (function() {
    const el = document.documentElement;
    const meta = document.querySelector('meta[name="theme-color"]') || document.createElement('meta');
    
    if (!meta.parentNode) {
      meta.name = 'theme-color';
      document.head.appendChild(meta);
    }

    try {
      const stored = localStorage.getItem('theme');
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const theme = stored || (systemDark ? 'dark' : 'light');
      
      el.setAttribute('data-theme', theme);
      el.style.colorScheme = theme;
      meta.setAttribute('content', theme === 'dark' ? '#0d0d10' : '#fdfeff');
    } catch (e) {
      el.setAttribute('data-theme', 'light');
    }
  })();
`;

const ThemeScript = () => {
  return <script dangerouslySetInnerHTML={{ __html: themeScript }} />;
};

export default ThemeScript;