'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';
import AnimatedButton from './AnimatedButton';

const packs = [
  { name: 'Pack Web', href: '/packs/web' },
  { name: 'Pack SEO', href: '/packs/seo' },
  { name: 'Pack Vidéo', href: '/packs/video' },
];

const navLinks = [
  { name: 'Services', href: '/services' },
  { name: 'Expertises', href: '/expertises' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'About', href: '/about' },
  { name: 'Team', href: '/team' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isPacksOpen, setIsPacksOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fix: Bloquer le scroll quand le menu est ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Ne pas cacher la nav si le menu est ouvert
      if (isOpen) return;

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setScrolled(currentScrollY > 50);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <nav
        className={`fixed top-6 left-0 w-full z-[100] transition-all duration-500 transform ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-[150%] opacity-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div
            className={`flex justify-between items-center bg-black/40 backdrop-blur-xl rounded-2xl py-2 px-6 shadow-[0_8px_32px_rgba(0,0,0,0.5)] border border-white/10 transition-all duration-300 ${
              scrolled ? 'scale-[0.98]' : 'scale-100'
            }`}
          >
            {/* Logo */}
            <Link href="/" className="relative z-[110] flex items-center shrink-0" onClick={() => setIsOpen(false)}>
              <div className="w-14 h-14 md:w-16 md:h-16 overflow-hidden rounded-full bg-black">
                <video
                  src="https://res.cloudinary.com/digfptrqs/video/upload/v1769446632/WhatsApp_Video_2026-01-26_at_17.56.30_wmqma9.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover mix-blend-screen scale-[1.3]"
                />
              </div>
            </Link>

            {/* Desktop Nav Center */}
            <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-[10px] font-black uppercase tracking-[0.15em] text-white/70 hover:text-white relative group transition-colors"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-white group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}

              <div
                className="relative"
                onMouseEnter={() => setIsPacksOpen(true)}
                onMouseLeave={() => setIsPacksOpen(false)}
              >
                <button className="text-[10px] font-black uppercase tracking-[0.15em] flex items-center gap-1 text-white/70 hover:text-white transition-colors">
                  Packs
                  <ChevronDown size={10} className={`${isPacksOpen ? 'rotate-180' : ''} transition-transform duration-300`} />
                </button>

                <div className={`${isPacksOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible'} absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-300`}>
                  <div className="bg-black/90 rounded-xl p-2 border border-white/10 min-w-[140px] shadow-2xl backdrop-blur-xl">
                    {packs.map((pack) => (
                      <Link
                        key={pack.name}
                        href={pack.href}
                        className="block px-4 py-2 text-[9px] font-bold uppercase tracking-widest text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                      >
                        {pack.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-4">
              {/* Language Switcher */}
              <div 
                ref={langRef}
                className="hidden md:block relative"
              >
                <div 
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group"
                >
                  <Globe size={16} className="text-white/70 group-hover:text-white transition-colors" />
                  <span className="text-[12px] font-black uppercase tracking-widest text-white/70 group-hover:text-white transition-colors">EN</span>
                  <ChevronDown size={12} className={`text-white/40 group-hover:text-white transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`} />
                </div>

                {/* Dropdown menu */}
                <div className={`absolute top-full right-0 pt-2 transition-all duration-300 ${isLangOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible'}`}>
                  <div className="bg-black/95 backdrop-blur-xl rounded-2xl p-3 border border-white/10 shadow-2xl min-w-[80px] flex flex-col items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors border border-white/5" onClick={() => setIsLangOpen(false)}>
                      <span className="text-[12px] font-black text-white/70">FR</span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center cursor-pointer border border-accent/40 shadow-[0_0_15px_rgba(99,102,241,0.3)]" onClick={() => setIsLangOpen(false)}>
                      <span className="text-[12px] font-black text-white">EN</span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors border border-white/5" onClick={() => setIsLangOpen(false)}>
                      <span className="text-[12px] font-black text-white/70">AR</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="hidden md:block">
                <AnimatedButton href="/contact" className="px-6 py-3 text-[10px]" showIcon>
                  Contact Us
                </AnimatedButton>
              </div>

              {/* Hamburger Button */}
              <button
                className="md:hidden text-white p-2 ml-2 relative z-[1001]"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* --- Mobile Nav Overlay (PRO FIX: 100% Solid Black) --- */}
      <div 
        className={`fixed inset-0 bg-black z-[90] md:hidden transition-all duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] ${
          isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        {/* Glow Effect Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full glow-purple opacity-20 blur-[120px] -z-10" />

        <div className="flex flex-col items-center justify-center h-full w-full space-y-10">
          {/* Logo inside Mobile Menu */}
          <div className={`mb-4 transition-all duration-700 delay-200 ${isOpen ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
            <div className="w-28 h-28 overflow-hidden rounded-full border border-white/10 bg-black flex items-center justify-center shadow-[0_0_50px_rgba(0,0,0,0.8)]">
              <video 
                src="https://res.cloudinary.com/digfptrqs/video/upload/v1769446632/WhatsApp_Video_2026-01-26_at_17.56.30_wmqma9.mp4" 
                autoPlay muted loop playsInline 
                className="w-full h-full object-cover mix-blend-screen scale-[1.3]" 
              />
            </div>
          </div>

          {/* Links mapping */}
          <div className="flex flex-col items-center space-y-6">
            {navLinks.map((link, i) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)} 
                className={`text-4xl font-black text-white uppercase tracking-tighter transition-all hover:text-accent transform ${
                  isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${300 + (i * 100)}ms` }}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Bottom Packs & CTA */}
          <div className={`flex flex-col items-center gap-6 pt-10 border-t border-white/10 w-full max-w-[280px] transition-all duration-700 delay-700 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex gap-4 items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/5">
                <span className="text-[11px] font-black text-white/70">FR</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center shadow-[0_0_10px_rgba(99,102,241,0.2)]">
                <span className="text-[11px] font-black text-white">EN</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/5">
                <span className="text-[11px] font-black text-white/70">AR</span>
              </div>
            </div>
            <AnimatedButton href="/contact" className="px-12 py-5 text-sm w-full text-center" onClick={() => setIsOpen(false)}>
              CONTACT US
            </AnimatedButton>
          </div>
        </div>
      </div>
    </>
  );
}