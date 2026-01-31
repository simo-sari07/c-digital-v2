"use client"

import { useState, useEffect } from "react"
import { FaWhatsapp, FaTimes } from "react-icons/fa"
import { motion, AnimatePresence } from "framer-motion"
import React from "react"
// Imports dial les fichiers JSON
import fr from '@/locales/fr.json';
import en from '@/locales/en.json';

const dictionaries: any = { fr, en };

export default function WhatsappContact() {
  const [isOpen, setIsOpen] = useState(false)
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

  const t = dictionaries[lang]?.whatsapp || dictionaries.en.whatsapp;

  const toggleChat = () => setIsOpen(!isOpen);
  const themeColor = "#ae52f0";

  if (!mounted) return null;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleChat}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 md:bottom-28 right-4 md:right-8 z-50 w-80 rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#1a1a1a] font-sans"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
          >
            <div className="p-6 text-white" style={{ background: `linear-gradient(135deg, ${themeColor} 0%, #6366f1 100%)` }}>
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-2 rounded-full backdrop-blur-md"><FaWhatsapp size={24} /></div>
                <div>
                  <h3 className="text-lg font-bold">{t.title}</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-xs text-white/80">{t.status}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-gray-400 text-sm leading-relaxed">{t.description}</p>
              <a href="https://wa.me/+212675775884" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between bg-white/5 hover:bg-white/10 p-4 rounded-xl border border-white/10 transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg" style={{ backgroundColor: themeColor }}>M.S</div>
                  <div>
                    <span className="block font-bold text-white">C-digital</span>
                    <span className="text-xs text-gray-500">{t.role}</span>
                  </div>
                </div>
                <FaWhatsapp size={24} style={{ color: themeColor }} className="group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-8 right-8 z-50">
        <motion.button
          onClick={toggleChat}
          className="relative w-14 h-14 rounded-full shadow-2xl flex items-center justify-center text-white overflow-hidden"
          style={{ background: isOpen ? '#ef4444' : `linear-gradient(135deg, ${themeColor} 0%, #6366f1 100%)` }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{ rotate: isOpen ? 0 : [0, -5, 5, -5, 0] }}
          transition={{ rotate: { duration: 2, repeat: isOpen ? 0 : Infinity, repeatDelay: 3 } }}
        >
          {isOpen ? <FaTimes size={28} /> : <FaWhatsapp size={28} />}
        </motion.button>
      </div>

      <AnimatePresence>
        {!isOpen && (
          <motion.div
            className="fixed bottom-10 right-20 md:right-24 z-40 bg-white/5 backdrop-blur-md py-2 px-4 rounded-xl shadow-xl border border-white/10 hidden md:block font-sans"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ delay: 0.5 }}
          >
            <div className="text-white font-medium text-sm">{t.tooltip_title}</div>
            <div className="text-gray-400 text-xs">{t.tooltip_sub}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}