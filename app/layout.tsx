import type { Metadata } from 'next';
import { Geist, Geist_Mono, Permanent_Marker } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';

import CustomCursor from '@/components/CustomCursor';
import BackgroundScrollManager from '@/components/BackgroundScrollManager';
import ScrollToTop from '@/components/ScrollToTop';
import WhatsappContact from '@/components/WhatsappContact';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const permanentMarker = Permanent_Marker({
  variable: '--font-permanent-marker',
  weight: '400',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'C-DIGITAL | Premium Web Agency',
  description: 'Helping ambitious brands make content people actually want to watch.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${permanentMarker.variable} antialiased bg-black text-white`}
      >
        <SmoothScroll>
          <BackgroundScrollManager />
          <CustomCursor />
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <ScrollToTop />
          <WhatsappContact />
        </SmoothScroll>
      </body>
    </html>
  );
}
