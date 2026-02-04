'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { 
  User, Mail, Phone, ArrowRight, 
  ChevronLeft, Check, CheckCircle, XCircle 
} from 'lucide-react';
import SectionTitle from './SectionTitle';
// Imports dial les fichiers JSON
import fr from '@/locales/fr.json';
import en from '@/locales/en.json';

const dictionaries: any = { fr, en };

const needOptions = [
  "Pack Web: Starter", "Pack Web: Business", "Pack Web: E-Commerce", "Pack Web: Sur Mesure",
  "Pack SEO: Standard", "Pack SEO: Pro", "Pack SEO: Ultimate",
  "Pack Vidéo: Starter", "Pack Vidéo: Pro", "Pack Vidéo: Elite",
  "Autre / Branding"
];

export default function ContactSection() {
  const [lang, setLang] = useState('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Fix: Initilisation dial EmailJS
    emailjs.init("PNpdrC3y_Z3sSvbj9");
    
    const updateLang = () => {
      setLang(document.documentElement.lang || 'en');
    };
    updateLang();
    const observer = new MutationObserver(updateLang);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
    return () => observer.disconnect();
  }, []);

  const t = dictionaries[lang]?.contact_section || dictionaries.en.contact_section;

  const [currentStep, setCurrentStep] = useState(0);
  const [isSending, setIsSending] = useState(false);
  const [showPopup, setShowPopup] = useState<{show: boolean, success: boolean}>({ show: false, success: true });
  const [formData, setFormData] = useState({
    fullName: '', email: '', company: 'Home Section Inquiry', phone: '',
    service: '', message: ''
  });

  const isStepValid = () => {
    if (currentStep === 0) return formData.fullName.length > 2 && formData.email.includes('@') && formData.phone.length > 8;
    if (currentStep === 1) return formData.service !== '';
    if (currentStep === 2) return formData.message.length > 10;
    return false;
  };

  const nextStep = () => isStepValid() && setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);

  const sendInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isStepValid()) return;
    setIsSending(true);

    try {
      // 1. Logic dial EmailJS
      const emailPromise = emailjs.send(
        "service_website", 
        "template_mv86q69", 
        {
          from_name: formData.fullName,
          from_email: formData.email,
          company: formData.company,
          phone: formData.phone,
          service_requested: formData.service,
          message: formData.message,
          to_name: "Responsable C-Digital",
        }
      );

      // 2. Logic dial Google Sheets
      const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbzLFTtLcKNIuEZpox8rKeTFnWE8Urzh6lA2Pb9vmmF-yNlAmVH1U-Zzxs-AKoFl9UcjcQ/exec';
      
      const sheetPromise = fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      // Synchronisation dial l-envoi
      await Promise.all([emailPromise, sheetPromise]);
      
      setShowPopup({ show: true, success: true });
      setFormData({ fullName: '', email: '', company: 'Home Section Inquiry', phone: '', service: '', message: '' });
      setCurrentStep(0);
    } catch (error) {
      setShowPopup({ show: true, success: false });
    } finally {
      setIsSending(false);
    }
  };

  if (!mounted) return null;

  return (
    <section id="contact" className="relative py-24 md:py-32 bg-black overflow-hidden px-6 font-sans">
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="text-left">
            <span className="text-accent font-black uppercase tracking-[0.4em] text-[10px] mb-6 block">{t.badge}</span>
            <SectionTitle className="text-left mb-8">
              {t.title_main} <br />
              <span className="text-gradient italic font-script lowercase text-6xl tracking-normal">{t.title_italic}</span>
            </SectionTitle>
            <div className="space-y-6 mt-10">
               <ContactItemSimple icon={<Mail size={18}/>} content="Contact@c-digital.ma" />
               <ContactItemSimple icon={<Phone size={18}/>} content="+212 720-016151" />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} className="bg-white/[0.02] border border-white/10 rounded-[3rem] p-8 md:p-10 backdrop-blur-xl shadow-2xl relative">
            
            {/* Indicators */}
            <div className="flex items-center justify-between mb-12 relative px-2">
              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5 -z-10 -translate-y-1/2"></div>
              {t.steps.map((step: string, i: number) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                    i <= currentStep ? (currentStep === 2 && i === 2 ? 'border-green-500 bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.3)]' : 'border-accent bg-accent shadow-[0_0_10px_rgba(99,102,241,0.3)]') : 'border-white/10 bg-black'
                  }`}>
                    {i < currentStep ? <Check size={14} className="text-white" /> : <span className="text-[10px] font-black">{i + 1}</span>}
                  </div>
                  <span className={`text-[7px] font-black tracking-[0.2em] uppercase ${i <= currentStep ? 'text-white' : 'text-white/20'}`}>{step}</span>
                </div>
              ))}
            </div>

            <form onSubmit={(e) => e.preventDefault()}>
              <AnimatePresence mode="wait">
                {currentStep === 0 && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} key="step0" className="space-y-5">
                    <InputBlock label={t.form.full_name} placeholder={t.form.placeholder_name} value={formData.fullName} onChange={(v:string) => setFormData({...formData, fullName: v})} icon={<User size={16}/>} />
                    <InputBlock label={t.form.email} placeholder="mohamed@agency.com" value={formData.email} onChange={(v:string) => setFormData({...formData, email: v})} icon={<Mail size={16}/>} />
                    <InputBlock label={t.form.phone} placeholder="+212 6..." value={formData.phone} onChange={(v:string) => setFormData({...formData, phone: v})} icon={<Phone size={16}/>} />
                  </motion.div>
                )}

                {currentStep === 1 && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} key="step1" className="grid grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    {needOptions.map((opt) => (
                      <button key={opt} type="button" onClick={() => setFormData({...formData, service: opt})} className={`p-4 rounded-xl border text-left text-[10px] font-black transition-all flex justify-between items-center ${formData.service === opt ? 'border-accent bg-accent/10 text-white shadow-[0_0_10px_rgba(99,102,241,0.1)]' : 'border-white/5 bg-white/5 text-white/40 hover:border-white/20'}`}>
                        {opt}
                        <div className={`w-3 h-3 rounded-full border-2 flex items-center justify-center shrink-0 ml-2 ${formData.service === opt ? 'border-accent bg-accent' : 'border-white/20'}`}>
                          {formData.service === opt && <div className="w-1 h-1 bg-white rounded-full" />}
                        </div>
                      </button>
                    ))}
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} key="step2">
                    <textarea value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} placeholder={t.form.placeholder_message} className="w-full h-40 bg-white/5 border border-white/10 rounded-2xl p-5 text-sm focus:border-green-500 outline-none transition-all placeholder:text-white/10 resize-none font-sans" />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-10 flex items-center justify-between">
                {currentStep > 0 ? (
                  <button type="button" onClick={prevStep} className="flex items-center gap-2 text-white/40 hover:text-white font-black text-[9px] uppercase tracking-widest transition-all">
                    <ChevronLeft size={14} /> {t.form.btn_back}
                  </button>
                ) : <div />}
                
                <button 
                  type="button" 
                  onClick={currentStep === 2 ? sendInquiry : nextStep} 
                  disabled={!isStepValid() || isSending} 
                  className={`flex items-center gap-3 px-8 py-3.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-xl ${currentStep === 2 ? 'bg-green-500 text-black shadow-green-500/20' : 'bg-white text-black hover:scale-105'}`}
                >
                  {isSending ? '...' : (currentStep === 2 ? t.form.btn_send : t.form.btn_next)} <ArrowRight size={14} />
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Popup optimized for conversion */}
      <AnimatePresence>
        {showPopup.show && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowPopup({ ...showPopup, show: false })} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-black border border-white/10 p-10 rounded-[3rem] max-w-sm w-full text-center shadow-2xl backdrop-blur-2xl">
               <div className={`w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center ${showPopup.success ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                  {showPopup.success ? <CheckCircle size={40} className="text-green-500" /> : <XCircle size={40} className="text-red-500" />}
               </div>
               <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">{showPopup.success ? t.popup.success_title : t.popup.error_title}</h3>
               <p className="text-gray-400 text-sm mb-8 leading-relaxed font-medium">
                 {showPopup.success ? t.popup.success_text : 'Erreur technique. Veuillez réessayer.'}
               </p>
               <button onClick={() => setShowPopup({ ...showPopup, show: false })} className="w-full py-4 bg-white text-black font-black uppercase text-[10px] tracking-widest rounded-2xl hover:bg-gray-200 transition-colors">{t.popup.btn_close}</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

function ContactItemSimple({ icon, content }: any) {
  return (
    <div className="flex gap-4 items-center group">
      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-accent transition-all shrink-0">{icon}</div>
      <p className="text-sm font-black text-gray-300 uppercase tracking-tight">{content}</p>
    </div>
  );
}

function InputBlock({ label, placeholder, value, onChange, icon }: any) {
  return (
    <div className="space-y-1.5 text-left">
      <label className="text-[8px] font-black uppercase tracking-[0.3em] text-white/20 ml-1 uppercase tracking-widest">{label}</label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20">{icon}</div>
        <input 
          type="text" 
          value={value} 
          onChange={(e) => onChange(e.target.value)} 
          placeholder={placeholder} 
          className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-5 text-sm focus:border-accent outline-none transition-all placeholder:text-white/10 font-sans" 
        />
      </div>
    </div>
  );
}