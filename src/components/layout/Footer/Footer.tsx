import React, { memo } from 'react';
import styles from './Footer.module.css';

const Footer = memo(() => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.text}>
          A website by Mihid Hasan. © MMXXVI
        </p>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;