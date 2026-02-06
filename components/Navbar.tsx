"use client";

import Link from "next/link";
import TransitionLink from "./TransitionLink";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Globe } from "lucide-react";
import AnimatedButton from "./AnimatedButton";
// Imports dial les fichiers JSON
import fr from "@/locales/fr.json";
import en from "@/locales/en.json";

const dictionaries: any = { fr, en };

const languages = [
  { code: "fr", name: "FR", label: "Français" },
  { code: "en", name: "EN", label: "English" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("en");
  const [isPacksOpen, setIsPacksOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const langRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLang = localStorage.getItem("lang");
    if (savedLang) setCurrentLang(savedLang);
  }, []);

  useEffect(() => {
    document.documentElement.lang = currentLang;
    localStorage.setItem("lang", currentLang);
  }, [currentLang]);

  const t = dictionaries[currentLang]?.navbar || dictionaries.en.navbar;

  const navLinks = [
    // Services moved to separate dropdown
    { name: t.expertises, href: "/expertises" },
    { name: t.portfolio, href: "/portfolio" },
    { name: t.about, href: "/about" },
    { name: t.team, href: "/team" },
    { name: t.blog, href: "/blog" },
  ];

  const packs = [
    { name: "Pack Web", href: "/packs/web" },
    { name: "Pack SEO", href: "/packs/seo" },
    { name: "Pack Vidéo", href: "/packs/video" },
  ];

  const isActive = (path: string) => pathname === path;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  useEffect(() => {
    // Close menus when route changes
    setIsServicesOpen(false);
    setIsPacksOpen(false);
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Close desktop menus on scroll
      if (Math.abs(currentScrollY - lastScrollY.current) > 10) {
        setIsServicesOpen(false);
        setIsPacksOpen(false);
      }

      if (isOpen) return;
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setScrolled(currentScrollY > 50);
      lastScrollY.current = currentScrollY;
    };

    const handleClickOutside = () => {
      setIsServicesOpen(false);
      setIsPacksOpen(false);
      // Don't close language or main menu implicitly unless desired, but usually good for dropdowns
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("click", handleClickOutside);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  if (!mounted) return null;

  return (
    <>
      <nav
        className={`fixed left-0 w-full z-[100] transition-all duration-500 transform ${scrolled ? "top-6" : "top-0"} ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-[150%] opacity-0"}`}
      >
        <div className={`mx-auto transition-all duration-500 ${scrolled ? "max-w-[1440px] px-4 md:px-6" : "max-w-full px-0"}`}>
          <div
            className={`flex justify-between items-center bg-black/40 backdrop-blur-xl py-2 px-4 md:px-8 shadow-2xl border-white/10 transition-all duration-500 ${scrolled ? "rounded-2xl border mx-4 md:mx-0 shadow-2xl scale-[0.98]" : "rounded-none border-b shadow-none scale-100"}`}
          >
            {/* Logo */}
            <Link
              href="/"
              className="relative z-[110] flex items-center shrink-0"
              onClick={() => setIsOpen(false)}
            >
              <div className="w-12 h-12 md:w-16 md:h-16 overflow-hidden rounded-full bg-black">
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

            {/* Desktop Nav Center - Fixed Spacing for FR */}
            <div className="hidden lg:flex items-center gap-4 xl:gap-8 absolute left-1/2 -translate-x-1/2 whitespace-nowrap">
              
              {/* SERVICES DROPDOWN - Click Trigger */}
              <div className="relative">
                <button
                  className={`cursor-pointer text-[9px] xl:text-[10px] font-black uppercase tracking-[0.1em] flex items-center gap-1 transition-colors ${isActive('/services') || isServicesOpen ? "text-white" : "text-white/70 hover:text-white"}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsServicesOpen(!isServicesOpen);
                    setIsPacksOpen(false); // Close other menu
                  }}
                >
                  {t.services}
                  <ChevronDown
                    size={10}
                    className={`${isServicesOpen ? "rotate-180" : ""} transition-transform duration-300`}
                  />
                </button>
                
                {/* Mega Menu Dropdown */}
                <div
                  className={`${isServicesOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-2 invisible"} absolute top-full -left-10 pt-6 transition-all duration-300 w-[600px]`}
                  onClick={(e) => e.stopPropagation()} 
                >
                  <div className="bg-black/95 backdrop-blur-2xl rounded-3xl p-6 border border-white/10 shadow-2xl grid grid-cols-2 gap-4">
                    {dictionaries[currentLang]?.services_page?.list?.map((service: any, idx: number) => (
                      <Link
                        key={idx}
                        href="/services"
                        className="group block p-4 rounded-2xl hover:bg-white/5 transition-all border border-transparent hover:border-white/5"
                        onClick={() => setIsServicesOpen(false)}
                      >
                        <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-1 group-hover:text-accent transition-colors flex items-center gap-2">
                           <span className="w-1.5 h-1.5 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity"/>
                           {service.title}
                        </h4>
                        <p className="text-white/50 text-[10px] leading-relaxed line-clamp-2">
                          {service.desc}
                        </p>
                      </Link>
                    ))}
                    
                    {/* Call to Action in Menu */}
                    <div className="col-span-2 mt-2 pt-4 border-t border-white/5 flex justify-between items-center px-2">
                      <span className="text-white/40 text-[9px] uppercase tracking-widest font-bold">Discover our expertise</span>
                      <AnimatedButton href="/services" className="py-2 px-4 text-[9px]" showIcon onClick={() => setIsServicesOpen(false)}>
                        View All Services
                      </AnimatedButton>
                    </div>
                  </div>
                </div>
              </div>

              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`cursor-pointer text-[9px] xl:text-[10px] font-black uppercase tracking-[0.1em] relative group transition-colors ${isActive(link.href) ? "text-white" : "text-white/70 hover:text-white"}`}
                >
                  {link.name}
                  <span
                    className={`absolute -bottom-1 left-0 h-[1.5px] bg-white transition-all duration-300 ${isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"}`}
                  ></span>
                </Link>
              ))}

              <div className="relative">
                <button
                  className={`cursor-pointer text-[9px] xl:text-[10px] font-black uppercase tracking-[0.1em] flex items-center gap-1 transition-colors ${packs.some((p) => isActive(p.href)) || isPacksOpen ? "text-white" : "text-white/70 hover:text-white"}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsPacksOpen(!isPacksOpen);
                    setIsServicesOpen(false); // Close other menu
                  }}
                >
                  Packs{" "}
                  <ChevronDown
                    size={10}
                    className={`${isPacksOpen ? "rotate-180" : ""} transition-transform duration-300`}
                  />
                </button>
                <div
                  className={`${isPacksOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-2 invisible"} absolute top-full left-1/2 -translate-x-1/2 pt-6 transition-all duration-300`}
                >
                  <div className="bg-black/95 rounded-xl p-2 border border-white/10 min-w-[140px] shadow-2xl backdrop-blur-xl">
                    {packs.map((pack) => (
                      <Link
                        key={pack.name}
                        href={pack.href}
                        className={`block px-4 py-2 text-[9px] font-bold uppercase tracking-widest rounded-lg transition-all ${isActive(pack.href) ? "text-white bg-white/10" : "text-white/60 hover:text-white hover:bg-white/5"}`}
                        onClick={() => setIsPacksOpen(false)}
                      >
                        {pack.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2 md:gap-4">
              <div ref={langRef} className="hidden md:block relative">
                <div
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group"
                >
                  <Globe
                    size={14}
                    className="text-white/70 group-hover:text-white"
                  />
                  <span className="text-[10px] font-black uppercase text-white/70">
                    {currentLang}
                  </span>
                  <ChevronDown
                    size={10}
                    className={`text-white/40 ${isLangOpen ? "rotate-180" : ""}`}
                  />
                </div>
                <div
                  className={`absolute top-full right-0 pt-2 transition-all ${isLangOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-2 invisible"}`}
                >
                  <div className="bg-black/95 rounded-2xl p-2 border border-white/10 shadow-2xl min-w-[100px]">
                    {languages.map((l) => (
                      <div
                        key={l.code}
                        onClick={() => {
                          setCurrentLang(l.code);
                          setIsLangOpen(false);
                        }}
                        className={`px-4 py-2 rounded-xl cursor-pointer transition-all flex items-center justify-between ${currentLang === l.code ? "bg-accent/20" : "hover:bg-white/5"}`}
                      >
                        <span className="text-[10px] font-black uppercase text-white">
                          {l.name}
                        </span>
                        {currentLang === l.code && (
                          <div className="w-1 h-1 rounded-full bg-accent" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="hidden lg:block">
                <AnimatedButton
                  href="/contact"
                  className="px-4 xl:px-6 py-3 text-[9px]"
                  showIcon
                  active={isActive("/contact")}
                >
                  {t.cta}
                </AnimatedButton>
              </div>

              <button
                className="lg:hidden text-white p-2 relative z-[1001]"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Nav Overlay - Fixed Packs Inclusion */}
      <div
        className={`fixed inset-0 bg-black z-[90] lg:hidden transition-all duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] overflow-y-auto ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
      >
        <div className="flex flex-col items-center justify-start min-h-full space-y-8 px-6 pt-32 pb-20">
          <div className="flex flex-col items-center space-y-4">
            {/* Services Link - Mobile Only */}
            <Link
              href="/services"
              onClick={() => setIsOpen(false)}
              className={`text-3xl font-black uppercase tracking-tighter hover:text-accent transition-colors ${isActive('/services') ? "text-accent" : "text-white"}`}
            >
              {t.services}
            </Link>

            {navLinks.map((link, i) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-3xl font-black uppercase tracking-tighter hover:text-accent transition-colors ${isActive(link.href) ? "text-accent" : "text-white"}`}
              >
                {link.name}
              </Link>
            ))}

            {/* Added Packs to Mobile Menu */}
            <div className="pt-4 flex flex-col items-center space-y-4">
              <span className="text-[10px] font-black text-accent tracking-[0.4em] uppercase">
                Packs
              </span>
              <div className="flex gap-4">
                {packs.map((pack) => (
                  <Link
                    key={pack.name}
                    href={pack.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-xs font-bold uppercase tracking-widest transition-colors ${isActive(pack.href) ? "text-white" : "text-white/50 hover:text-white"}`}
                  >
                    {pack.name.split(" ")[1]}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-6 pt-10 border-t border-white/10 w-full max-w-[280px]">
            <div className="flex gap-4 p-1 bg-white/5 rounded-2xl">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setCurrentLang(l.code)}
                  className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${currentLang === l.code ? "bg-white text-black" : "text-white/40"}`}
                >
                  {l.name}
                </button>
              ))}
            </div>
            <AnimatedButton
              href="/contact"
              className="px-12 py-5 text-sm w-full text-center"
              onClick={() => setIsOpen(false)}
              active={isActive("/contact")}
            >
              {t.cta}
            </AnimatedButton>
          </div>
        </div>
      </div>
    </>
  );
}
