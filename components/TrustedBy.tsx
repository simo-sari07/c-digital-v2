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
    <section id="trusted-by" className="bg-[#030303] py-12 border-y border-white/5 overflow-hidden w-full relative">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-8 md:gap-0">
        
        {/* Left: Text & Separator */}
        <div className="flex items-center w-full md:w-auto z-10 relative">
          <p className="text-white/60 font-bold text-sm md:text-base leading-tight max-w-[160px]">
            Trusted by 150+ top brands worldwide.
          </p>
          <div className="hidden md:block w-[1px] h-8 bg-white/10 mx-8"></div>
        </div>

        {/* Right: Marquee */}
        <div className="flex-1 w-full overflow-hidden relative">
           {/* Side Gradients for smooth fade */}
           <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#030303] to-transparent z-10 pointer-events-none"></div>
           <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#030303] to-transparent z-10 pointer-events-none"></div>

          <div 
            ref={marqueeRef}
            className="flex whitespace-nowrap min-w-full items-center"
          >
            {/* First set of logos */}
            <div className="flex items-center gap-16 md:gap-24 pr-16 md:pr-24">
              {logos.map((logo, i) => (
                <div key={i} className="flex-shrink-0 group">
                  <img 
                    src={logo}
                    alt="Partner Logo"
                    className="h-6 md:h-8 w-auto opacity-40 grayscale brightness(0) invert(1) group-hover:opacity-100 group-hover:grayscale-0 group-hover:filter-none transition-all duration-300 cursor-pointer object-contain"
                  />
                </div>
              ))}
            </div>
            {/* Duplicate set for seamless loop */}
            <div className="flex items-center gap-16 md:gap-24 pr-16 md:pr-24">
              {logos.map((logo, i) => (
                <div key={`dup-${i}`} className="flex-shrink-0 group">
                  <img 
                    src={logo}
                    alt="Partner Logo"
                    className="h-6 md:h-8 w-auto opacity-40 grayscale brightness(0) invert(1) group-hover:opacity-100 group-hover:grayscale-0 group-hover:filter-none transition-all duration-300 cursor-pointer object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
