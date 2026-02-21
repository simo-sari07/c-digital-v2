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
  // Title m-optimiz-i ktar fih l-khidamat l-asasiya
  title: 'C-DIGITAL | Société de Développement Web, Mobile & SEO au Maroc',
  description: 'C-DIGITAL : Agence digitale experte en création de sites web (Next.js, Laravel), applications mobiles et référencement SEO à Marrakech, Casablanca, Rabat et Agadir. Boostez votre ROI dès aujourd’hui.',
  
  keywords: [
    'société de développement maroc', 
    'agence web marrakech', 
    'création site web casablanca', 
    'développement application mobile maroc',
    'expert SEO marrakech', 
    'marketing digital maroc',
    'développement Next.js Laravel maroc', // Zid l-techno bach t-t-ranka 3nd les connaisseurs
    'C-DIGITAL',
    'agence digitale rabat',
    'e-commerce maroc'
  ],
  
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
    // Title dial l-partage khass i-koun "Catchy"
    title: 'C-DIGITAL | Transformez votre vision en réalité numérique au Maroc',
    description: 'De la création de sites web au SEO, nous bâtissons des expériences digitales qui convertissent. Découvrez nos packs expert.',
    siteName: 'C-DIGITAL',
    images: [
      {
        url: '/og-image.jpg', 
        width: 1200,
        height: 630,
        alt: 'C-DIGITAL Agence de Développement Web Marrakech',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'C-DIGITAL | Premium Web & Mobile Agency Maroc',
    description: 'Expertise en développement Next.js, Laravel et SEO pour entreprises ambitieuses au Maroc.',
    images: ['/og-image.jpg'],
  },

  icons: {
    icon: '/favicon.ico', 
    apple: '/favicon.ico', 
  },

  verification: {
    google: 'I42sCPR4NxgnW8nguoJ_TmUS8H0_B5HeX4hUEs0o6G8', 
  },
  
  // Darori f Next.js 15 bach robots i-choufou kolchi
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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