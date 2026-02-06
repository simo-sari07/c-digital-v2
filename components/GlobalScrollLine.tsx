'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface GlobalScrollLineProps {
  color?: string;
  triggerRef?: React.RefObject<HTMLElement | null>;
}

const GlobalScrollLine: React.FC<GlobalScrollLineProps> = ({ color = "white", triggerRef }) => {
  const pathRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pathRef.current) return;

    const path = pathRef.current;
    const length = path.getTotalLength();

    // Set initial state: Hidden by dashoffset
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    const scrollTrigger = {
      trigger: triggerRef?.current || "main",
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      id: "global-scroll-line"
    };

    const anim = gsap.to(path, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: scrollTrigger
    });

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, [triggerRef]);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-[1] overflow-hidden min-h-full">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1000 4000" 
        preserveAspectRatio="none"
        className="opacity-50"
      >
        <defs>
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="50%" stopColor="#d946ef" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
        <path
          ref={pathRef}
          d="M 500,0 C 700,400 100,600 100,1000 C 100,1400 900,1600 900,2000 C 900,2400 100,2600 100,3000 C 100,3400 500,3600 500,4000"
          fill="none"
          stroke="url(#line-gradient)"
          strokeWidth="16"
          strokeLinecap="round"
          filter="drop-shadow(0px 0px 15px rgba(139, 92, 246, 0.4))"
        />
      </svg>
    </div>
  );
};

export default GlobalScrollLine;
