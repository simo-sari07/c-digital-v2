'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Instagram, Linkedin, Youtube, ArrowRight, MapPin, Mail } from 'lucide-react';
// Imports dial les fichiers JSON
import fr from '@/locales/fr.json';
import en from '@/locales/en.json';

const dictionaries: any = { fr, en };

export default function Footer() {
  const [lang, setLang] = useState('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateLang = () => {
      setLang(document.documentElement.lang || 'en');
    };
    updateLang();
    const observer = new MutationObserver(updateLang);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
    return () => observer.disconnect();
  }, []);

  const t = dictionaries[lang]?.footer || dictionaries.en.footer;

  if (!mounted) return null;

  return (
    <footer className="w-full bg-black pt-32 relative overflow-hidden font-sans">
      <style jsx>{`
        @keyframes slide-pattern { 0% { background-position: 0 0; } 100% { background-position: 40px 0; } }
        .glass-card { background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.05); transition: all 0.3s ease; }
        .glass-card:hover { background: rgba(255, 255, 255, 0.05); border-color: rgba(167, 139, 250, 0.3); transform: translateY(-5px); }
      `}</style>

      <div className="max-w-[1400px] mx-auto px-6">
        {/* Large Header Section */}
        <div className="mb-24 text-center">
          <h2 className="text-[12vw] md:text-[10vw] font-black text-[#1A1A1A] uppercase tracking-tighter leading-[0.8] relative inline-block">
            C <span className="text-violet-500">●</span> DIGITAL
          </h2>
          <p className="text-white text-lg md:text-2xl font-bold tracking-[0.3em] uppercase mt-4">
            {t.tagline_main} <span className="text-violet-500">{t.tagline_highlight}</span> {t.tagline_end}
          </p>
        </div>

        {/* Floating CTA Banner Section */}
        <div className="relative group bg-violet-500 rounded-[2.5rem] p-8 md:p-14 overflow-hidden border border-white/10 shadow-[0_20px_100px_rgba(167,139,250,0.3)] mb-20">
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-10 text-black text-left">
            <div className="max-w-3xl">
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.8] tracking-tighter mb-8">{t.cta.title}</h2>
              <p className="font-medium text-sm md:text-base max-w-xl leading-snug">{t.cta.desc}</p>
            </div>
            <div className="flex-shrink-0">
              <Link href="/contact" className="inline-flex items-center gap-2 font-black italic text-4xl lg:text-5xl hover:translate-x-4 transition-transform uppercase">
                {t.cta.btn} <ArrowRight size={48} className="mt-2" />
              </Link>
            </div>
          </div>
        </div>

        {/* Main Content Grid Dynamique */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          <div className="glass-card rounded-3xl p-8 text-left">
            <div className="flex items-center gap-2 mb-8">
              <span className="text-violet-500 font-bold text-xs">01</span>
              <h4 className="text-xs font-black text-white uppercase tracking-[0.2em]">{t.expertises.title}</h4>
            </div>
            <ul className="space-y-4">
              {t.expertises.items.map((item: string) => (
                <li key={item}><Link href="#" className="text-sm font-bold text-gray-400 hover:text-white transition-colors">{item}</Link></li>
              ))}
            </ul>
          </div>

          <div className="glass-card rounded-3xl p-8 text-left">
            <div className="flex items-center gap-2 mb-8">
              <span className="text-violet-500 font-bold text-xs">02</span>
              <h4 className="text-xs font-black text-white uppercase tracking-[0.2em]">{t.agency.title}</h4>
            </div>
            <ul className="space-y-4">
              {t.agency.items.map((item: string) => (
                <li key={item}><Link href="#" className="text-sm font-bold text-gray-400 hover:text-white transition-colors">{item}</Link></li>
              ))}
            </ul>
          </div>

          <div className="glass-card rounded-3xl p-8 text-left">
            <div className="flex items-center gap-2 mb-8">
              <Mail className="text-violet-500" size={16} />
              <h4 className="text-xs font-black text-white uppercase tracking-[0.2em]">{t.contact.title}</h4>
            </div>
            <div className="space-y-6">
              <div><p className="text-[10px] text-gray-500 font-bold uppercase mb-1">{t.contact.support}</p><p className="text-white font-black">+212 720-016151</p></div>
              <div><p className="text-[10px] text-gray-500 font-bold uppercase mb-1">{t.contact.email_label}</p><p className="text-white font-black break-all text-xs">contact@c-digital.ma</p></div>
              <div className="flex gap-3">
                {[Linkedin, Youtube, Instagram].map((Icon, i) => (
                  <Link key={i} href="#" className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl text-white hover:text-violet-500 transition-all"><Icon size={18} /></Link>
                ))}
              </div>
            </div>
          </div>

          <div className="glass-card rounded-3xl p-8 text-left">
            <div className="p-2 bg-white/5 rounded-lg w-fit mb-12"><MapPin size={24} className="text-violet-500" /></div>
            <h3 className="text-2xl font-medium text-white uppercase leading-tight mb-8">{t.location.address}</h3>
            <Link href="#" className="inline-flex items-center justify-center w-full bg-violet-500 text-black py-4 rounded-2xl font-black text-xs uppercase tracking-widest gap-2 hover:bg-white transition-colors">
              <MapPin size={14} /> {t.location.btn_map}
            </Link>
          </div>
        </div>

        {/* Bottom Bar Dynamique */}
        <div className="pt-8 pb-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold text-gray-500 uppercase tracking-widest gap-4">
          <div className="flex items-center gap-4"><span className="text-violet-500">●</span><p>© 2026 C-DIGITAL. {t.bottom.rights}</p></div>
          <div className="flex gap-8">
            {t.bottom.links.map((link: string) => (<Link key={link} href="#" className="hover:text-white transition-colors">{link}</Link>))}
          </div>
          <div className="flex items-center gap-2 text-violet-500/50"><span className="w-1.5 h-1.5 bg-violet-500 rounded-full animate-pulse"></span>{t.bottom.protocol} V.2.5</div>
        </div>
      </div>

      <div className="w-full h-12 border-t border-white/5 overflow-hidden bg-black relative">
        <div className="w-full h-full opacity-30" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'20\' viewBox=\'0 0 40 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0 L10 10 L0 20 L10 20 L20 10 L10 0 Z M20 0 L30 10 L20 20 L30 20 L40 10 L30 0 Z\' fill=\'%238b5cf6\' fill-rule=\'evenodd\'/%3E%3Cpath d=\'M10 0 L20 10 L10 20 L20 20 L30 10 L20 0 Z\' fill=\'%23FFFFFF\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")', backgroundSize: '40px 100%', animation: 'slide-pattern 2s linear infinite' }} />
      </div>
    </footer>
  );
}