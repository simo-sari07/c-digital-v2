'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { 
  User, Mail, Building2, Phone, ArrowRight, 
  ChevronLeft, Send, MapPin, CheckCircle, Check
} from 'lucide-react';

const steps = ["IDENTITY", "NEEDS", "MESSAGE"];
const needOptions = ["Showcase Site", "E-Commerce", "Web App", "SEO / Ads", "Branding", "Other"];

export default function ContactPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '', email: '', company: '', phone: '',
    service: '', message: ''
  });

  // Check if current step is valid
  const isStepValid = () => {
    if (currentStep === 0) {
      return formData.fullName.length > 2 && formData.email.includes('@') && formData.phone.length > 8;
    }
    if (currentStep === 1) {
      return formData.service !== '';
    }
    if (currentStep === 2) {
      return formData.message.length > 10;
    }
    return false;
  };

  const nextStep = () => isStepValid() && setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);

  // --- Fonction dial l'envoi Gmail ---
  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isStepValid()) return;

    setIsSending(true);

    // TODO: Beddel had les IDs b l-IDs dialk mn EmailJS dashboard
    const SERVICE_ID = "service_website";
    const TEMPLATE_ID = "template_mv86q69";
    const PUBLIC_KEY = "PNpdrC3y_Z3sSvbj9";

    try {
      const templateParams = {
        from_name: formData.fullName,
        from_email: formData.email,
        company: formData.company,
        phone: formData.phone,
        service_requested: formData.service,
        message: formData.message,
        to_name: "Responsable C-Digital",
      };

      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      
      alert("Votre message a été envoyé avec succès !");
      setFormData({ fullName: '', email: '', company: '', phone: '', service: '', message: '' });
      setCurrentStep(0);
    } catch (error) {
      console.error("FAILED...", error);
      alert("Désolé, une erreur est survenue lors de l'envoi.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden pb-32 pt-44 px-6">
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none"></div>

      <main className="relative z-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20">
          
          {/* --- Info Section --- */}
          <div>
            <span className="text-accent font-black uppercase tracking-[0.4em] text-[10px] mb-6 block font-sans">Contact Us</span>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-tight mb-8 font-sans">
              <span>DÉMARREZ LA</span> <br />
              <span className="text-gradient italic font-script lowercase">Conversation.</span>
            </h1>
            <div className="space-y-8 mt-12">
              <ContactItem icon={<MapPin size={20}/>} title="Bureau" content="48 Lot IGUIDER Allal El Fasi Marrakech" />
              <ContactItem icon={<Mail size={20}/>} title="E-mail" content="Contact@c-digital.ma" />
              <ContactItem icon={<Phone size={20}/>} title="Phone" content="+212 720-016151" />
            </div>
          </div>

          {/* --- Multi-Step Form --- */}
          <div className="bg-muted/30 border border-white/5 rounded-[3rem] p-8 md:p-12 backdrop-blur-xl shadow-2xl relative">
            
            {/* Progress Bar (Glow Logic) */}
            <div className="flex items-center justify-between mb-16 relative px-4">
              <div className="absolute top-5 left-0 w-full h-[1px] bg-white/5 -z-10"></div>
              {steps.map((step, i) => (
                <div key={i} className="flex flex-col items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                    i <= currentStep 
                      ? (currentStep === 2 ? 'border-green-500 bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.3)]' : 'border-accent bg-accent shadow-[0_0_20px_rgba(99,102,241,0.3)]') 
                      : 'border-white/10 bg-black'
                  }`}>
                    {i < currentStep ? <Check size={18} className="text-white" /> : <span className="text-xs font-black">{i + 1}</span>}
                  </div>
                  <span className={`text-[8px] font-black tracking-widest ${i <= currentStep ? 'text-white' : 'text-white/20'}`}>{step}</span>
                </div>
              ))}
            </div>

            <form onSubmit={(e) => e.preventDefault()}>
              <AnimatePresence mode="wait">
                {currentStep === 0 && (
                  <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} key="step0" className="space-y-6">
                    <h3 className="text-xl font-black uppercase mb-8 font-sans">
                      <span>Tell us about you</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <InputBlock label="Full Name" placeholder="Mohamed Karim" value={formData.fullName} onChange={(v:string) => setFormData({...formData, fullName: v})} icon={<User size={16}/>} />
                      <InputBlock label="Work Email" placeholder="mohamed@agency.com" value={formData.email} onChange={(v:string) => setFormData({...formData, email: v})} icon={<Mail size={16}/>} />
                      <InputBlock label="Company" placeholder="C-Digital" value={formData.company} onChange={(v:string) => setFormData({...formData, company: v})} icon={<Building2 size={16}/>} />
                      <InputBlock label="Phone" placeholder="+212 6..." value={formData.phone} onChange={(v:string) => setFormData({...formData, phone: v})} icon={<Phone size={16}/>} />
                    </div>
                  </motion.div>
                )}

                {currentStep === 1 && (
                  <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} key="step1">
                    <h3 className="text-xl font-black uppercase mb-8 font-sans text-accent">
                      <span>Select your needs</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {needOptions.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setFormData({...formData, service: opt})}
                          className={`p-5 rounded-2xl border text-left text-xs font-bold transition-all flex justify-between items-center ${
                            formData.service === opt ? 'border-accent bg-accent/10 text-white shadow-[0_0_15px_rgba(99,102,241,0.1)]' : 'border-white/5 bg-white/5 text-white/40 hover:border-white/20'
                          }`}
                        >
                          {opt}
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${formData.service === opt ? 'border-accent bg-accent' : 'border-white/20'}`}>
                            {formData.service === opt && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} key="step2">
                    <h3 className="text-xl font-black uppercase mb-8 font-sans text-green-500">
                      <span>Tell us about your project</span>
                    </h3>
                    <textarea 
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Context, goals, deadlines, estimated budget..." 
                      className="w-full h-48 bg-white/5 border border-white/10 rounded-3xl p-6 text-sm focus:border-green-500 outline-none transition-all placeholder:text-white/10 resize-none"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="mt-12 flex items-center justify-between">
                {currentStep > 0 ? (
                  <button type="button" onClick={prevStep} className="flex items-center gap-2 text-white/40 hover:text-white font-black text-[10px] uppercase tracking-widest transition-all">
                    <ChevronLeft size={16} /> Back
                  </button>
                ) : <div />}
                
                <button 
                  type="button"
                  onClick={currentStep === 2 ? sendEmail : nextStep}
                  disabled={!isStepValid() || isSending}
                  className={`flex items-center gap-3 px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-xl disabled:opacity-30 disabled:cursor-not-allowed ${
                    currentStep === 2 ? 'bg-green-500 text-black shadow-green-500/20' : 'bg-white text-black hover:scale-105'
                  }`}
                >
                  {isSending ? 'Sending...' : (currentStep === 2 ? 'SEND MESSAGE' : 'Next Step')} <ArrowRight size={16} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

// Sub-components
function InputBlock({ label, placeholder, value, onChange, icon }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[9px] font-black uppercase tracking-widest text-white/20 ml-2">{label}</label>
      <div className="relative">
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20">{icon}</div>
        <input 
          type="text" 
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder} 
          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-sm focus:border-accent outline-none transition-all placeholder:text-white/10"
        />
      </div>
    </div>
  );
}

function ContactItem({ icon, title, content }: any) {
  return (
    <div className="flex gap-5 items-center group">
      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-accent transition-all">
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">{title}</p>
        <p className="text-sm font-bold">{content}</p>
      </div>
    </div>
  );
}