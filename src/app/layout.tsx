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
  title: { 
    default: 'BIGD Handbooks', 
    template: '%s | BIGD Handbooks' 
  },
  description: 'The official digital repository for BIGD’s Editorial Style, Writing Principles, and Web Management guidelines. Developed and maintained by Mihid Hasan.',
  metadataBase: new URL('https://bigd-handbooks.vercel.app'),
  alternates: {
    canonical: 'https://bigd-handbooks.vercel.app',
  },
  authors: [{ name: 'Mihid Hasan' }],
  // This points to the file you just created
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'BIGD Handbooks',
    description: 'The official digital repository for BIGD’s Editorial Style, Writing Principles, and Web Management guidelines. Developed and maintained by Mihid Hasan.',
    url: 'https://bigd-handbooks.vercel.app',
    siteName: 'BIGD Handbooks',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'BIGD Handbooks: Editorial Style, Writing Principles, and Web Management',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BIGD Handbooks',
    description: 'The official digital repository for BIGD’s Editorial Style, Writing Principles, and Web Management guidelines. Developed and maintained by Mihid Hasan.',
    images: ['/og.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
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