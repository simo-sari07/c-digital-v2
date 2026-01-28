'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const logos = [
  "https://cdn.prod.website-files.com/66dabc01541a54f3b4462403/66e83367fbad93b0885af355_Aliter%20Capital.png",
  "https://cdn.prod.website-files.com/66dabc01541a54f3b4462403/66e83314faf22e9e9060902f_Tenzing.png",
  "https://cdn.prod.website-files.com/66dabc01541a54f3b4462403/66e8331e3a722ac1c1b2fa75_Sunridge%20Partners.png",
  "https://cdn.prod.website-files.com/66dabc01541a54f3b4462403/66dabc01541a54f3b446240d_Ascot-Lloyd.png",
  "https://cdn.prod.website-files.com/66dabc01541a54f3b4462403/66e8293b98c0827a54be32e3_crossword.png",
  "https://cdn.prod.website-files.com/66dabc01541a54f3b4462403/66dabc01541a54f3b4462410_TCG.png",
  "https://cdn.prod.website-files.com/66dabc01541a54f3b4462403/66e82c0a8872085aeb3f387d_PetsCorner.png"
];

export default function TrustedBy() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const totalWidth = marquee.scrollWidth / 2;
    
    const tl = gsap.to(marquee, {
      x: -totalWidth,
      duration: 40, // Slower for more elegance
      ease: "none",
      repeat: -1,
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="bg-black py-24 overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[300px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 mb-16 relative z-10">
        <div className="flex items-center justify-center gap-8">
          {/* Refined Left Decoration */}
          <div className="hidden md:block w-32 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-white/30" />

          <h2 className="text-white/30 text-[9px] md:text-[11px] font-medium uppercase tracking-[0.5em] whitespace-nowrap">
            World-class institutions <span className="text-accent/50 font-bold ml-1">trust us.</span>
          </h2>

          {/* Refined Right Decoration */}
          <div className="hidden md:block w-32 h-[1px] bg-gradient-to-l from-transparent via-white/10 to-white/30" />
        </div>
      </div>

      <div className="relative py-12 border-y border-white/[0.03] bg-white/[0.01]">
        {/* Deeper Shadow Overlays */}
        <div className="absolute inset-y-0 left-0 w-64 bg-gradient-to-r from-black via-black/90 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-64 bg-gradient-to-l from-black via-black/90 to-transparent z-10 pointer-events-none"></div>

        <div 
          ref={marqueeRef}
          className="flex whitespace-nowrap min-w-full"
        >
          {/* First set of logos */}
          <div className="flex items-center gap-24 md:gap-48 pr-24 md:pr-48">
            {logos.map((logo, i) => (
              <div key={i} className="flex-shrink-0">
                <img 
                  src={logo}
                  alt="Partner Logo"
                  className="h-5 md:h-8 w-auto opacity-20 grayscale brightness-150 hover:opacity-100 hover:grayscale-0 transition-all duration-1000 cursor-pointer object-contain"
                />
              </div>
            ))}
          </div>
          {/* Duplicate set for seamless loop */}
          <div className="flex items-center gap-24 md:gap-48 pr-24 md:pr-48">
            {logos.map((logo, i) => (
              <div key={`dup-${i}`} className="flex-shrink-0">
                <img 
                  src={logo}
                  alt="Partner Logo"
                  className="h-5 md:h-8 w-auto opacity-20 grayscale brightness-150 hover:opacity-100 hover:grayscale-0 transition-all duration-1000 cursor-pointer object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
