import Link from 'next/link';
import React, { useRef, useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';

type AnimatedButtonProps = {
  children: React.ReactNode;
  href?: string;
  className?: string;
  showIcon?: boolean;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  scramble?: boolean;
  active?: boolean;
};

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+?><';

export default function AnimatedButton({
  children,
  href,
  className = '',
  showIcon = true,
  onClick,
  variant = 'primary',
  active = false,
}: AnimatedButtonProps) {
  const buttonRef = useRef<HTMLDivElement | HTMLAnchorElement | null>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLSpanElement>(null);
  const text2Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    const icon = iconRef.current;
    const t1 = text1Ref.current;
    const t2 = text2Ref.current;

    if (!button) return;

    const onMouseEnter = () => {
      // Rolling text animation
      if (t1 && t2) {
        gsap.to(t1, { yPercent: -100, duration: 0.4, ease: "power2.inOut" });
        gsap.to(t2, { yPercent: -100, duration: 0.4, ease: "power2.inOut" });
      }
      
      if (icon) {
        gsap.to(icon, {
          x: 5,
          rotate: -45,
          duration: 0.4,
          ease: 'power2.out',
        });
      }
    };

    const onMouseLeave = () => {
      if (t1 && t2) {
        gsap.to(t1, { yPercent: 0, duration: 0.4, ease: "power2.inOut" });
        gsap.to(t2, { yPercent: 0, duration: 0.4, ease: "power2.inOut" });
      }

      if (icon) {
        gsap.to(icon, {
          x: 0,
          rotate: 0,
          duration: 0.4,
          ease: 'power2.inOut',
        });
      }
    };

    button.addEventListener('mouseenter', onMouseEnter);
    button.addEventListener('mouseleave', onMouseLeave);

    return () => {
      button.removeEventListener('mouseenter', onMouseEnter);
      button.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  const variants = {
    primary: `${active ? 'shadow-[0_0_20px_rgba(174,82,240,0.4)] border-white/50' : 'border-transparent'} bg-gradient-to-r from-accent to-secondary text-white hover:shadow-[0_8px_25px_-5px_rgba(99,102,241,0.4)]`,
    secondary: `${active ? 'bg-white/10 border-white/40' : 'bg-transparent border-white/20'} text-white hover:border-white/40`,
  };

  const commonClasses = `relative inline-flex items-center justify-center px-8 py-3.5 font-button font-bold uppercase tracking-widest rounded-xl overflow-hidden border transition-all duration-300 group ${variants[variant]} ${className}`;

  const innerContent = (
    <div className="relative z-10 flex items-center gap-4">
      <div 
        ref={textContainerRef}
        className="relative overflow-hidden h-5 md:h-5.5"
      >
        <div className="flex flex-col">
          <span ref={text1Ref} className="block whitespace-nowrap text-sm md:text-[15px]">
            {children}
          </span>
          <span ref={text2Ref} className="block whitespace-nowrap text-sm md:text-[15px] absolute top-full left-0">
            {children}
          </span>
        </div>
      </div>
      
      {showIcon && (
        <div ref={iconRef} className="flex items-center transition-transform">
          <ArrowRight size={18} />
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        ref={buttonRef as React.Ref<HTMLAnchorElement>}
        onClick={onClick}
        className={commonClasses}
      >
        {innerContent}
      </Link>
    );
  }

  return (
    <button
      ref={buttonRef as React.Ref<HTMLButtonElement>}
      onClick={onClick}
      className={commonClasses}
    >
      {innerContent}
    </button>
  );
}


