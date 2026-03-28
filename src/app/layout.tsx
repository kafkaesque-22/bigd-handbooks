import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import ThemeScript from './ThemeScript';
import { PreloaderScript } from '@/app/PreloaderScript';
import '@/styles/tokens.css';
import '@/styles/themes.css';
import '@/styles/globals.css';

import Header from '@/components/layout/Header/Header';
import Shell from '@/components/layout/Shell/Shell';
import Footer from '@/components/layout/Footer/Footer';
import Preloader from '@/components/layout/Preloader/Preloader';

const helvetica = localFont({
  src: [
    { path: '../../public/fonts/HelveticaNowVar.woff2', style: 'normal', weight: '100 900' },
    { path: '../../public/fonts/HelveticaNowVarItalic.woff2', style: 'italic', weight: '100 900' },
  ],
  variable: '--font-primary-local',
  display: 'swap',
  preload: true,
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#fdfeff',
};

export const metadata: Metadata = {
  title: { default: 'BIGD Handbooks', template: '%s | BIGD Handbooks' },
  description: 'A guide by Mihid Hasan.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={helvetica.variable} suppressHydrationWarning>
      <head>
        <ThemeScript />
        <PreloaderScript />
      </head>
      <body>
        <Preloader />
        <Header />
        <Shell>{children}</Shell>
        <Footer />
      </body>
    </html>
  );
}