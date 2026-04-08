'use client';

import React, { memo } from 'react';
import Link from 'next/link';
import styles from './HandbookCards.module.css';

const cardData = [
  { 
    id: 'card1', 
    title: 'Editorial Styles', 
    description: 'Mechanics of house style.',
    href: '/handbook/editorial-styles' 
  },
  { 
    id: 'card2', 
    title: 'Writing Principles', 
    description: 'Fundamentals of effective prose.',
    href: '/handbook/writing-principles' 
  },
  { 
    id: 'card3', 
    title: 'Web Management', 
    description: 'Practices for digital knowledge hub.',
    href: '/handbook/web-management' 
  }
];

const HandbookCards = memo(() => {
  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        {cardData.map((card, index) => (
          <Link 
            key={card.id} 
            href={card.href}
            className={`${styles.cardWrapper} ${styles[`pos${index + 1}`]}`}
          >
            <div className={styles.borderEffect} />
            
            <div className={styles.cardInner}>
              <div className={styles.content}>
                <h2 className={styles.cardTitle}>{card.title}</h2>
                <p className={styles.cardDescription}>{card.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
});

HandbookCards.displayName = 'HandbookCards';

export default HandbookCards;