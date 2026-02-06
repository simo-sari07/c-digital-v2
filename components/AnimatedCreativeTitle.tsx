'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface AnimatedCreativeTitleProps {
  title: string;
  accentTitle?: string;
  accentColorClass: string;
  className?: string;
}

const AnimatedCreativeTitle: React.FC<AnimatedCreativeTitleProps> = ({ 
  title, 
  accentTitle, 
  accentColorClass,
  className = "" 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const letters = containerRef.current?.querySelectorAll('.letter');
      const linePath = containerRef.current?.querySelector('.wavy-line-path');
      if (!letters || letters.length === 0) return;

      const tl = gsap.timeline({
        defaults: { ease: "power4.out" }
      });

      // 1. Initial Reveal of all letters
      tl.fromTo(letters,
        { y: 100, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1.2, 
          stagger: 0.05,
          ease: "expo.out"
        }
      );

      // 2. Draw the Wavy Line
      if (linePath) {
        const pathLength = (linePath as SVGPathElement).getTotalLength();
        tl.fromTo(linePath,
          { strokeDasharray: pathLength, strokeDashoffset: pathLength },
          { 
            strokeDashoffset: 0, 
            duration: 1.5, 
            ease: "power2.inOut" 
          },
          "-=0.8" // Start while letters are still revealing
        );
      }

      // 3. The Signature Awwwards Animation for the second-to-last letter
      const targetIdx = letters.length - 2;
      if (targetIdx >= 0) {
        const targetLetter = letters[targetIdx];
        
        const loopTl = gsap.timeline({
          repeat: -1,
          delay: 1,
          repeatDelay: 2
        });

        loopTl.to(targetLetter, {
          y: -40,
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut"
        })
        .set(targetLetter, { y: 40 })
        .to(targetLetter, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power4.out"
        });
      }

      // Initial reveal of the script accent part if it exists
      gsap.fromTo(".accent-part",
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1.5, 
          delay: 0.8, 
          ease: "power3.out" 
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [title]);

  const splitLetters = (text: string) => {
    return text.split('').map((char, i) => {
      const isTarget = i === text.length - 2;
      return (
        <span 
          key={i} 
          className={`letter inline-block whitespace-pre translate-y-full opacity-0 ${isTarget ? 'text-violet-500' : ''}`}
        >
          {char}
        </span>
      );
    });
  };

  return (
    <div ref={containerRef} className={`flex flex-col items-center select-none relative ${className}`}>
      <div className="relative">
        <h1 className="text-6xl md:text-[8rem] font-black uppercase tracking-tighter leading-none flex flex-row flex-nowrap justify-center overflow-hidden py-8 text-white font-anton relative z-10">
          {splitLetters(title)}
        </h1>

        {/* Wavy Line SVG Overlay */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none z-20"
          viewBox="0 0 1000 100"
          preserveAspectRatio="none"
        >
          <path 
            className="wavy-line-path fill-none stroke-violet-400 stroke-[4]"
            d="M 0,50 L 300,50 C 400,50 400,20 500,20 C 600,20 600,80 700,80 C 800,80 800,50 1100,50"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="drop-shadow(0px 0px 8px rgba(167, 139, 250, 0.6))"
          />
        </svg>
      </div>
      
      {accentTitle && (
        <span className={`accent-part block mt-2 font-script normal-case tracking-normal text-transparent bg-clip-text bg-gradient-to-r ${accentColorClass} text-3xl md:text-5xl opacity-0`}>
          {accentTitle}
        </span>
      )}
    </div>
  );
};

export default AnimatedCreativeTitle;
