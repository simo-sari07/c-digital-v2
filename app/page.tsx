'use client';

import Hero from '@/components/Hero';
// import TrustedBy from '@/components/TrustedBy';
import AboutPreview from '@/components/AboutPreview';
import ServicesPreview from '@/components/ServicesPreview';
import TechStack from '@/components/TechStack';
import WhyUs from '@/components/WhyUs';
import Testimonials from '@/components/Testimonials';
import ContactSection from '@/components/ContactSection';

export default function Home() {
  return (
    <div>
      <Hero />
      {/* <TrustedBy /> */}
      <AboutPreview />
      <WhyUs />
      <ServicesPreview />
      <TechStack />
      <Testimonials />
      <ContactSection />
    </div>
  );
}
