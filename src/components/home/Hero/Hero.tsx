'use client';

import React, { useState, useEffect } from 'react';
import styles from './Hero.module.css';

const TYPING_WORDS = ['Editorial Styles', 'Writing Principles', 'Web Management'];
const TYPING_SPEED = 60;
const DELETING_SPEED = 30;
const PAUSE_DURATION = 4000;

const Hero = () => {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const currentWord = TYPING_WORDS[wordIndex];
    const typingTimeout = setTimeout(() => {
      if (!isDeleting && charIndex <= currentWord.length) {
        setCharIndex((prev) => prev + 1);
      } else if (isDeleting && charIndex > 0) {
        setCharIndex((prev) => prev - 1);
      } else if (!isDeleting && charIndex > currentWord.length) {
        setIsPaused(true);
        setTimeout(() => {
          setIsPaused(false);
          setIsDeleting(true);
        }, PAUSE_DURATION);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % TYPING_WORDS.length);
      }
    }, isDeleting ? DELETING_SPEED : TYPING_SPEED);

    return () => clearTimeout(typingTimeout);
  }, [charIndex, isDeleting, isPaused, wordIndex]);

  return (
    <section className={styles.hero}>
      <div className={styles.grid}>
        <h1 className={styles.title}>
          BIGD Handbook of <br />
          <span className={styles.dynamicText}>
            {TYPING_WORDS[wordIndex].substring(0, charIndex)}
            <span className={`${styles.cursor} ${isPaused ? styles.blink : ''}`}>|</span>
          </span>
        </h1>

        <div className={styles.introOne}>
          <p>
            The BIGD Handbooks serve as the definitive guide for the social science research institute’s communication standards. It ensures that every piece of content we produce is aligned with our institutional voice and technical excellence.
          </p>
        </div>
        <div className={styles.introTwo}>
          <p>
            Designed for clarity and consistency, these handbooks help BIGD navigate complex editorial decisions and maintain a seamless identity across all platforms.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;