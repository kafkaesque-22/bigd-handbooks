import Hero from '@/components/home/Hero/Hero';
import HandbookCards from '@/components/home/HandbookCards/HandbookCards';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.container}>
      <Hero />
      <HandbookCards />
    </main>
  );
}