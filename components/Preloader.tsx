'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const shutterTopRef = useRef<HTMLDivElement>(null);
  const shutterBottomRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsLoading(false);
          document.body.style.overflow = 'auto';
        }
      });

      // Disable scroll while loading
      document.body.style.overflow = 'hidden';

      // 1. Counter Animation
      const obj = { value: 0 };
      tl.to(obj, {
        value: 100,
        duration: 2.5,
        ease: "power2.inOut",
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.textContent = Math.floor(obj.value).toString().padStart(2, '0');
          }
          if (progressRef.current) {
            progressRef.current.style.width = `${obj.value}%`;
          }
        }
      });

      // 2. Text Reveal
      tl.from(textRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power4.out"
      }, "-=1.5");

      // 3. Shutter Transition
      tl.to(counterRef.current, {
        opacity: 0,
        y: -100,
        duration: 0.6,
        ease: "power4.in"
      }, "+=0.2");

      tl.to(textRef.current, {
        scale: 1.5,
        opacity: 0,
        filter: "blur(20px)",
        duration: 0.8,
        ease: "power2.in"
      }, "-=0.4");

      tl.to(shutterTopRef.current, {
        yPercent: -100,
        duration: 1.2,
        ease: "power4.inOut"
      }, "-=0.2");

      tl.to(shutterBottomRef.current, {
        yPercent: 100,
        duration: 1.2,
        ease: "power4.inOut"
      }, "-=1.2");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  if (!isLoading) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden">
      {/* Background Shutters */}
      <div 
        ref={shutterTopRef}
        className="absolute top-0 left-0 w-full h-1/2 bg-black z-0 border-b border-white/[0.05]"
      />
      <div 
        ref={shutterBottomRef}
        className="absolute bottom-0 left-0 w-full h-1/2 bg-black z-0 border-t border-white/[0.05]"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        <h2 ref={textRef} className="text-4xl md:text-6xl font-black uppercase tracking-[0.2em] mb-4">
          <span className="text-white">C</span>
          <span className="text-gradient">DIGITAL</span>
        </h2>
        
        <div className="flex items-baseline gap-2 overflow-hidden px-4 py-2">
            <span 
              ref={counterRef} 
              className="text-7xl md:text-[120px] font-black text-white/10 leading-none select-none italic"
            >
              00
            </span>
            <span className="text-xl md:text-2xl font-bold text-accent italic -ml-2">%</span>
        </div>

        {/* Minimal Progress Bar */}
        <div className="w-40 md:w-60 h-[2px] bg-white/5 mt-8 rounded-full overflow-hidden">
          <div 
            ref={progressRef}
            className="h-full bg-gradient-to-r from-accent to-secondary w-0"
          />
        </div>
      </div>

      {/* Dynamic Background Auras */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 blur-[150px] rounded-full z-[-1] animate-pulse" />
    </div>
  );
}
