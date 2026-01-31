'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';
import AnimatedButton from './AnimatedButton';
// Imports dial les fichiers JSON
import fr from '@/locales/fr.json';
import en from '@/locales/en.json';

const dictionaries: any = { fr, en };

const languages = [
  { code: 'fr', name: 'FR', label: 'Français' },
  { code: 'en', name: 'EN', label: 'English' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('en'); 
  const [isPacksOpen, setIsPacksOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const langRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLang = localStorage.getItem('lang');
    if (savedLang) setCurrentLang(savedLang);
  }, []);

  useEffect(() => {
    document.documentElement.lang = currentLang;
    localStorage.setItem('lang', currentLang);
  }, [currentLang]);

  const t = dictionaries[currentLang]?.navbar || dictionaries.en.navbar;

  const navLinks = [
    { name: t.services, href: '/services' },
    { name: t.expertises, href: '/expertises' },
    { name: t.portfolio, href: '/portfolio' },
    { name: t.about, href: '/about' },
    { name: t.team, href: '/team' },
    { name: t.blog, href: '/blog' },
  ];

  const packs = [
    { name: 'Pack Web', href: '/packs/web' },
    { name: 'Pack SEO', href: '/packs/seo' },
    { name: 'Pack Vidéo', href: '/packs/video' },
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
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

  if (!mounted) return null;

  return (
    <>
      <nav className={`fixed top-6 left-0 w-full z-[100] transition-all duration-500 transform ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-[150%] opacity-0'}`}>
        <div className="max-w-[1440px] mx-auto px-4 md:px-6">
          <div className={`flex justify-between items-center bg-black/40 backdrop-blur-xl rounded-2xl py-2 px-4 md:px-6 shadow-2xl border border-white/10 transition-all duration-300 ${scrolled ? 'scale-[0.98]' : 'scale-100'}`}>
            
            {/* Logo */}
            <Link href="/" className="relative z-[110] flex items-center shrink-0" onClick={() => setIsOpen(false)}>
              <div className="w-12 h-12 md:w-16 md:h-16 overflow-hidden rounded-full bg-black">
                <video src="https://res.cloudinary.com/digfptrqs/video/upload/v1769446632/WhatsApp_Video_2026-01-26_at_17.56.30_wmqma9.mp4" autoPlay muted loop playsInline className="w-full h-full object-cover mix-blend-screen scale-[1.3]" />
              </div>
            </Link>

            {/* Desktop Nav Center - Fixed Spacing for FR */}
            <div className="hidden lg:flex items-center gap-4 xl:gap-8 absolute left-1/2 -translate-x-1/2 whitespace-nowrap">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href} className="text-[9px] xl:text-[10px] font-black uppercase tracking-[0.1em] text-white/70 hover:text-white relative group transition-colors">
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-white group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}

              <div className="relative" onMouseEnter={() => setIsPacksOpen(true)} onMouseLeave={() => setIsPacksOpen(false)}>
                <button className="text-[9px] xl:text-[10px] font-black uppercase tracking-[0.1em] flex items-center gap-1 text-white/70 hover:text-white transition-colors">
                  Packs <ChevronDown size={10} className={`${isPacksOpen ? 'rotate-180' : ''} transition-transform duration-300`} />
                </button>
                <div className={`${isPacksOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible'} absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-300`}>
                  <div className="bg-black/90 rounded-xl p-2 border border-white/10 min-w-[140px] shadow-2xl backdrop-blur-xl">
                    {packs.map((pack) => (
                      <Link key={pack.name} href={pack.href} className="block px-4 py-2 text-[9px] font-bold uppercase tracking-widest text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-all">{pack.name}</Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2 md:gap-4">
              <div ref={langRef} className="hidden md:block relative">
                <div onClick={() => setIsLangOpen(!isLangOpen)} className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group">
                  <Globe size={14} className="text-white/70 group-hover:text-white" />
                  <span className="text-[10px] font-black uppercase text-white/70">{currentLang}</span>
                  <ChevronDown size={10} className={`text-white/40 ${isLangOpen ? 'rotate-180' : ''}`} />
                </div>
                <div className={`absolute top-full right-0 pt-2 transition-all ${isLangOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible'}`}>
                  <div className="bg-black/95 rounded-2xl p-2 border border-white/10 shadow-2xl min-w-[100px]">
                    {languages.map((l) => (
                      <div key={l.code} onClick={() => { setCurrentLang(l.code); setIsLangOpen(false); }} className={`px-4 py-2 rounded-xl cursor-pointer transition-all flex items-center justify-between ${currentLang === l.code ? 'bg-accent/20' : 'hover:bg-white/5'}`}>
                        <span className="text-[10px] font-black uppercase text-white">{l.name}</span>
                        {currentLang === l.code && <div className="w-1 h-1 rounded-full bg-accent" />}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="hidden lg:block">
                <AnimatedButton href="/contact" className="px-4 xl:px-6 py-3 text-[9px]" showIcon>{t.cta}</AnimatedButton>
              </div>

              <button className="lg:hidden text-white p-2 relative z-[1001]" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Nav Overlay - Fixed Packs Inclusion */}
      <div className={`fixed inset-0 bg-black z-[90] lg:hidden transition-all duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <div className="flex flex-col items-center justify-center h-full space-y-8 px-6">
          <div className="flex flex-col items-center space-y-4">
            {navLinks.map((link, i) => (
              <Link key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="text-3xl font-black text-white uppercase tracking-tighter hover:text-accent">
                {link.name}
              </Link>
            ))}
            
            {/* Added Packs to Mobile Menu */}
            <div className="pt-4 flex flex-col items-center space-y-4">
               <span className="text-[10px] font-black text-accent tracking-[0.4em] uppercase">Packs</span>
               <div className="flex gap-4">
                 {packs.map((pack) => (
                    <Link key={pack.name} href={pack.href} onClick={() => setIsOpen(false)} className="text-xs font-bold text-white/50 hover:text-white uppercase tracking-widest">{pack.name.split(' ')[1]}</Link>
                 ))}
               </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-6 pt-10 border-t border-white/10 w-full max-w-[280px]">
            <div className="flex gap-4 p-1 bg-white/5 rounded-2xl">
              {languages.map((l) => (
                <button key={l.code} onClick={() => setCurrentLang(l.code)} className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${currentLang === l.code ? 'bg-white text-black' : 'text-white/40'}`}>
                  {l.name}
                </button>
              ))}
            </div>
            <AnimatedButton href="/contact" className="px-12 py-5 text-sm w-full text-center" onClick={() => setIsOpen(false)}>{t.cta}</AnimatedButton>
          </div>
        </div>
      </div>
    </>
  );
}