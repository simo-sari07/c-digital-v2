'use client';

import dynamic from 'next/dynamic';
import Hero from '@/components/Hero';

// 1. Hero khllih import 3adi hit hwa LCP (Above the fold)
// 2. L-b9iya d-der lihom Lazy Loading bach n-hbtou TBT

const AboutPreview = dynamic(() => import('@/components/AboutPreview'), {
  ssr: false,
  loading: () => <div className="h-[50vh] bg-black opacity-0" /> 
});

const WhyUs = dynamic(() => import('@/components/WhyUs'), {
  ssr: false
});

const ServicesPreview = dynamic(() => import('@/components/ServicesPreview'), {
  ssr: false
});

const TechStack = dynamic(() => import('@/components/TechStack'), {
  ssr: false
});

const Testimonials = dynamic(() => import('@/components/Testimonials'), {
  ssr: false
});

const ContactSection = dynamic(() => import('@/components/ContactSection'), {
  ssr: false
});

export default function Home() {
  return (
    <main className="bg-black">
      {/* Hero k-i-ban f 0.1s hit ma-3ndouch mouchkil dial JS block */}
      <Hero />
      
      {/* Had l-sections ghadi i-t-chargeaw ghir mlli l-browser i-koun ready */}
      <AboutPreview />
      <WhyUs />
      <ServicesPreview />
      <TechStack />
      <Testimonials />
      <ContactSection />
    </main>
  );
}