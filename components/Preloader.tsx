'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Elements
  const logoRef = useRef<HTMLDivElement>(null);
  const panel1Ref = useRef<HTMLDivElement>(null);
  const panel2Ref = useRef<HTMLDivElement>(null);
  const panel3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if visited (Session Storage)
    // const hasVisited = sessionStorage.getItem('c-digital-visited');
    // if (hasVisited) {
    //   setIsLoading(false);
    //   return;
    // }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsLoading(false);
          document.body.style.overflow = 'auto';
          sessionStorage.setItem('c-digital-visited', 'true');
        }
      });

      // Init
      document.body.style.overflow = 'hidden';

      // 1. Logo Reveal (Fade + Scale)
      tl.to(logoRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "power3.out"
      });

      // Wait a beat
      tl.to({}, { duration: 0.5 });

      // 2. Logo Exit
      tl.to(logoRef.current, {
        y: -50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.in"
      }, "exit");

      // 3. 3-Panel Wipe (Upward)
      // Panels start at bottom (translateY 100%) or top?
      // "Slide upward from the bottom"
      
      // Indigo Panel
      tl.to(panel1Ref.current, {
        height: "100%",
        duration: 1,
        ease: "power3.inOut"
      }, "exit-=0.4");

      // Fuchsia Panel
      tl.to(panel2Ref.current, {
        height: "100%",
        duration: 1,
        ease: "power3.inOut"
      }, "-=0.8");

      // White/Black Panel (Final Reveal)
      // Actually, to reveal the site, the panels need to move UP and AWAY?
      // Or they cover the screen, then slide away?
      // "Reveal 3 horizontal color panels that slide upward..."
      // Usually this means they wipe the screen. 
      // To reveal the content underneath, we effectively wipe THE PRELOADER away.
      
      // Let's interpret: 
      // Screen is Black (Preloader BG).
      // Logo animates.
      // Panels slide UP covering the logo/black bg?
      // Or Panels slide UP REVEALING the content? 
      
      // "Slide upward from the bottom" -> Usually covers screen.
      // Then we need to reveal content.
      
      // Let's do:
      // Panels slide UP to cover screen (Transition).
      // Then the whole container slides UP to reveal content?
      // Or Panels slide UP and then vanish?
      
      // Refined Effect:
      // Panels slide UP from bottom. 
      // Panel 1 (Indigo) covers.
      // Panel 2 (Fuchsia) covers Panel 1.
      // Panel 3 (Black or Transparent) covers Panel 2?
      
      // Let's try:
      // Panels are at Bottom (height 0 or y: 100%).
      // Animate Height to 100% (Slide Up).
      // Stagger them.
      // Last panel should be the "Unveil" or just end the preloader?
      // If we want to reveal the site, the last panel should probably be the one that wipes away the preloader, 
      // OR the preloader itself slides up.
      
      // Let's go with:
      // Panel 1 (Indigo) Slides Up.
      // Panel 2 (Fuchsia) Slides Up.
      // Panel 3 (White) Slides Up.
      // Then Container fades out? Or Container Slides Up?
      
      // Awwwards Style:
      // Logo.
      // Panel 1 covers.
      // Panel 2 covers.
      // Panel 3 covers. 
      // Then Panel 3 slides UP (revealing content) or dissolves.
      
      // Let's do:
      // Panel 1 (Indigo) Slides Up (Covering).
      // Panel 2 (Fuchsia) Slides Up (Covering).
      // Then... Preloader disappears? 
      // To reveal content "Underneath", we usually slide the "Curtain" UP.
      
      // Correct Flow:
      // 1. Logo on Black.
      // 2. Indigo Panel Slides Up (Covers Black).
      // 3. Fuchsia Panel Slides Up (Covers Indigo).
      // 4. White Panel Slides Up (Covers Fuchsia).
      // 5. White Panel Slides UP (Away) revealing site? 
      //    Or effectively, the preloader IS the shutter.
      
      // Implementation:
      // Panels are absolute bottom, width 100%, height 0.
      tl.to(panel1Ref.current, { height: "100%", duration: 0.8, ease: "power3.inOut" }, "-=0.3");
      tl.to(panel2Ref.current, { height: "100%", duration: 0.8, ease: "power3.inOut" }, "-=0.6");
      tl.to(panel3Ref.current, { height: "100%", duration: 0.8, ease: "power3.inOut" }, "-=0.6");
      
      // Reveal Site (Slide Panel 3 Away Upwards)
      tl.to(panel3Ref.current, {
        yPercent: -100,
        duration: 1,
        ease: "power3.inOut"
      });
      // And hide others in case
      tl.set(containerRef.current, { display: 'none' });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  if (!isLoading) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black overflow-hidden">
      
      {/* Logo */}
      <div 
        ref={logoRef} 
        className="opacity-0 scale-75 z-20 flex flex-col items-center"
      >
         <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mix-blend-difference">
            C DIGITAL
         </h1>
      </div>

      {/* Panels (Reversed order in DOM for stacking, or z-index) */}
      <div 
        ref={panel1Ref} 
        className="absolute bottom-0 left-0 w-full h-0 bg-accent z-30"
      />
      <div 
        ref={panel2Ref} 
        className="absolute bottom-0 left-0 w-full h-0 bg-secondary z-40"
      />
      <div 
        ref={panel3Ref} 
        className="absolute bottom-0 left-0 w-full h-0 bg-white z-50 flex items-center justify-center"
      >
        {/* Optional: Final flash content or just white */}
      </div>

    </div>
  );
}
