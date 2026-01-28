'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { 
  User, Mail, Building2, Phone, ArrowRight, 
  ChevronLeft, Check, MapPin
} from 'lucide-react';
import SectionTitle from './SectionTitle';

const steps = ["IDENTITY", "NEEDS", "MESSAGE"];
const needOptions = ["Showcase Site", "E-Commerce", "Web App", "SEO / Ads", "Branding", "Other"];

export default function ContactSection() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '', email: '', company: '', phone: '',
    service: '', message: ''
  });

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

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isStepValid()) return;

    setIsSending(true);

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
    <section id="contact" className="relative py-32 bg-black overflow-hidden px-6">
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none"></div>
      
      {/* Background Glows */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-accent/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-accent font-black uppercase tracking-[0.4em] text-[10px] mb-6 block font-sans">Ready to scale?</span>
            <SectionTitle className="text-left mb-8">
              DÉMARREZ UN <br />
              <span className="text-gradient italic font-script lowercase">Projet avec nous.</span>
            </SectionTitle>
            <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-lg">
              De l'idée à la réalité numérique, nous vous accompagnons à chaque étape. Parlons de votre vision dès aujourd'hui.
            </p>
            
            <div className="space-y-6">
               <div className="flex gap-4 items-center group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-accent transition-all">
                    <Mail size={18} className="text-accent" />
                  </div>
                  <p className="text-sm font-bold text-gray-300">Contact@c-digital.ma</p>
               </div>
               <div className="flex gap-4 items-center group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-accent transition-all">
                    <Phone size={18} className="text-accent" />
                  </div>
                  <p className="text-sm font-bold text-gray-300">+212 720-016151</p>
               </div>
            </div>
          </motion.div>

          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white/[0.02] border border-white/10 rounded-[3rem] p-8 md:p-10 backdrop-blur-xl shadow-2xl relative overflow-hidden"
          >
            {/* Step Indicators */}
            <div className="flex items-center justify-between mb-12 relative px-2">
              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5 -z-10 -translate-y-1/2"></div>
              {steps.map((step, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                    i <= currentStep 
                      ? 'border-accent bg-accent shadow-[0_0_15px_rgba(99,102,241,0.4)]' 
                      : 'border-white/10 bg-black'
                  }`}>
                    {i < currentStep ? <Check size={14} className="text-white" /> : <span className="text-[10px] font-black">{i + 1}</span>}
                  </div>
                  <span className={`text-[7px] font-black tracking-widest uppercase ${i <= currentStep ? 'text-white' : 'text-white/20'}`}>{step}</span>
                </div>
              ))}
            </div>

            <form onSubmit={(e) => e.preventDefault()}>
              <AnimatePresence mode="wait">
                {currentStep === 0 && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} key="step0" className="space-y-5">
                    <InputBlock label="Full Name" placeholder="Mohamed Karim" value={formData.fullName} onChange={(v:string) => setFormData({...formData, fullName: v})} icon={<User size={16}/>} />
                    <InputBlock label="Work Email" placeholder="mohamed@agency.com" value={formData.email} onChange={(v:string) => setFormData({...formData, email: v})} icon={<Mail size={16}/>} />
                    <InputBlock label="Phone" placeholder="+212 6..." value={formData.phone} onChange={(v:string) => setFormData({...formData, phone: v})} icon={<Phone size={16}/>} />
                  </motion.div>
                )}

                {currentStep === 1 && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} key="step1" className="grid grid-cols-2 gap-3">
                    {needOptions.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setFormData({...formData, service: opt})}
                        className={`p-4 rounded-xl border text-left text-[10px] font-bold transition-all flex justify-between items-center ${
                          formData.service === opt ? 'border-accent bg-accent/10 text-white' : 'border-white/5 bg-white/5 text-white/40'
                        }`}
                      >
                        {opt}
                        <div className={`w-3 h-3 rounded-full border-2 flex items-center justify-center ${formData.service === opt ? 'border-accent bg-accent' : 'border-white/20'}`}>
                          {formData.service === opt && <div className="w-1 h-1 bg-white rounded-full" />}
                        </div>
                      </button>
                    ))}
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} key="step2">
                    <textarea 
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Comment pouvons-nous vous aider ?" 
                      className="w-full h-40 bg-white/5 border border-white/10 rounded-2xl p-5 text-sm focus:border-accent outline-none transition-all placeholder:text-white/10 resize-none font-sans"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-10 flex items-center justify-between">
                {currentStep > 0 ? (
                  <button type="button" onClick={prevStep} className="flex items-center gap-2 text-white/40 hover:text-white font-black text-[9px] uppercase tracking-widest transition-all">
                    <ChevronLeft size={14} /> Back
                  </button>
                ) : <div />}
                
                <button 
                  type="button"
                  onClick={currentStep === 2 ? sendEmail : nextStep}
                  disabled={!isStepValid() || isSending}
                  className={`flex items-center gap-3 px-8 py-3.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-xl disabled:opacity-30 ${
                    currentStep === 2 ? 'bg-accent text-white shadow-accent/20' : 'bg-white text-black hover:scale-105'
                  }`}
                >
                  {isSending ? 'Sending...' : (currentStep === 2 ? 'Send Now' : 'Next Step')} <ArrowRight size={14} />
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function InputBlock({ label, placeholder, value, onChange, icon }: any) {
  return (
    <div className="space-y-1.5">
      <label className="text-[8px] font-black uppercase tracking-[0.2em] text-white/20 ml-1">{label}</label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20">{icon}</div>
        <input 
          type="text" 
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder} 
          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-5 text-sm focus:border-accent outline-none transition-all placeholder:text-white/5 font-sans"
        />
      </div>
    </div>
  );
}
