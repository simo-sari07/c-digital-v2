import type { Metadata } from 'next';
import { Geist, Geist_Mono, Permanent_Marker, Anton } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';
import { GoogleAnalytics } from '@next/third-parties/google';
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

const anton = Anton({
  variable: '--font-anton',
  weight: '400',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'C-DIGITAL | Agence Web & Marketing Digital à Marrakech',
    template: '%s | C-DIGITAL'
  },
  description: 'C-DIGITAL est une agence web premium à Marrakech spécialisée dans la création de sites web, le SEO et le marketing digital. Boostez votre visibilité en ligne.',
  keywords: ['Agence Web Marrakech', 'Marketing Digital Maroc', 'Création site web Marrakech', 'SEO Maroc', 'C-DIGITAL'],
  authors: [{ name: 'C-DIGITAL Team' }],
  creator: 'C-DIGITAL',
  metadataBase: new URL('https://cdigital.ma'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://cdigital.ma',
    title: 'C-DIGITAL | Agence Web & Marketing Digital Premium',
    description: 'Créez un impact digital réel avec notre agence basée à Marrakech.',
    siteName: 'C-DIGITAL',
    images: [
      {
        url: '/og-image.jpg', // T-akked blli 7titi tswira b had smiya f folder 'public'
        width: 1200,
        height: 630,
        alt: 'C-DIGITAL Agence Web Marrakech',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'C-DIGITAL | Premium Web Agency',
    description: 'Digital Marketing & Web Development at its finest.',
    images: ['/og-image.jpg'],
  },
  verification: {
    google: 'I42sCPR4NxgnW8nguoJ_TmUS8H0_B5HeX4hUEs0o6G8', // Had l-koud ni-chan
  },
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${permanentMarker.variable} ${anton.variable} antialiased bg-black text-white`}
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
        
       
        <GoogleAnalytics gaId="G-31JCG7LWLK" /> 
      </body>
    </html>
  );
}