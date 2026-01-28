'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ children, className = '' }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;

    gsap.fromTo(el, 
      { 
        y: 50, 
        opacity: 0 
      },
      {
        y: 0,
        opacity: 1,
        duration: 1.5, // Slower duration
        ease: "power2.out", // Smoother ease
        scrollTrigger: {
          trigger: el,
          start: "top 85%", 
          toggleActions: "play none none reverse" 
        }
      }
    );
  }, []);

  return (
    <h2 ref={titleRef} className={`text-4xl md:text-6xl font-black text-white uppercase text-center mb-16 ${className}`}>
      {children}
    </h2>
  );
};

export default SectionTitle;
