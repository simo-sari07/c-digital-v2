'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function BackgroundScrollManager() {
  const isTransitioning = useRef(false);

  useEffect(() => {
    // Slight delay to ensure all components are mounted and rendered by React
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        const sections = document.querySelectorAll('[data-bgcolor]');
        const body = document.body;

        sections.forEach((section) => {
          const bgColor = section.getAttribute('data-bgcolor');
          if (!bgColor) return;

          ScrollTrigger.create({
            trigger: section,
            start: 'top 50%',
            end: 'bottom 50%',
            onEnter: () => {
              gsap.to(body, {
                backgroundColor: bgColor,
                duration: 1.2,
                ease: 'power3.out',
                overwrite: 'auto'
              });
            },
            onEnterBack: () => {
              gsap.to(body, {
                backgroundColor: bgColor,
                duration: 1.2,
                ease: 'power3.out',
                overwrite: 'auto'
              });
            }
          });
        });
      });

      return () => {
        ctx.revert();
      };
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return null; 
}
