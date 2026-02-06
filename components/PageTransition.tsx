'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useTransition } from '@/context/TransitionContext';
import { usePathname } from 'next/navigation';

export default function PageTransition() {
  const { isTransitioning, setIsTransitioning } = useTransition();
  const pathname = usePathname();
  
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Handle Entrance (Slide Up to Reveal) on Check of Pathname or Mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Logic: 
      // 1. If transitioning (Exit): Slide Down to Cover
      // 2. If NOT transitioning (Entrance): Slide Up to Reveal
      
      if (isTransitioning) {
        // EXIT: Slide Down
        gsap.to(panelRef.current, {
          yPercent: 0,
          duration: 0.8,
          ease: 'power3.inOut',
          pointerEvents: 'all'
        });
      } else {
        // ENTER: Slide Up
        // Ensure it starts from covered position if we just navigated
        // Actually, since this component persists in Layout, "isTransitioning" flips.
        // We need to detect "Navigation Complete".
        
        gsap.to(panelRef.current, {
          yPercent: -100,
          duration: 1,
          ease: 'power3.inOut',
          delay: 0.2,
          pointerEvents: 'none'
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isTransitioning]);

  // Reset Transition State after Navigation
  // When pathname changes, we are on the "New Page".
  // `isTransitioning` helps us wait. 
  // We need to ensure `isTransitioning` is set to false to trigger the "Enter" animation above.
  useEffect(() => {
    if(isTransitioning) {
      setIsTransitioning(false);
    }
  }, [pathname]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[9990] pointer-events-none flex flex-col justify-end">
        {/* The Transition Panel - Initial State: Translated Up (-100%) or Down?
            Start: -100% (Hidden Top).
            Exit: 0% (Cover Content).
            Enter: -100% (Slide Up again? Or slide down/away?)
            User Request: "Slide down from top to cover... Then reveal next with smooth UPWARD transition"
            So:
            1. Start: -100% (top)
            2. Click: Slide to 0% (Cover)
            3. Router Navigates
            4. New Page: Slide to -100%? No, "Reveal Upward" usually means the Cover slides UP (away).
            Yes.
            
            Panel should be BG color (Black or Brand).
         */}
        <div 
          ref={panelRef}
          className="absolute inset-0 bg-black w-full h-full -translate-y-full z-50"
        >
          {/* Optional: Add Logo or Loader inside the transition panel */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
             <span className="text-white font-black text-2xl tracking-[0.2em] animate-pulse">LOADING</span>
          </div>
        </div>
    </div>
  );
}
