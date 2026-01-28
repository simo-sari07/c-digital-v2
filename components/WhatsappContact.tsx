"use client"

import { useState } from "react"
import { FaWhatsapp, FaTimes } from "react-icons/fa"
import { motion, AnimatePresence } from "framer-motion"
import React from "react"

export default function WhatsappContact() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  const themeColor = "#ae52f0" // Matching your ScrollToTop color

  return (
    <>
      {/* Backdrop for when chat is open */}
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

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 md:bottom-28 right-4 md:right-8 z-50 w-80 rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#1a1a1a]"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div 
              className="p-6 text-white"
              style={{ background: `linear-gradient(135deg, ${themeColor} 0%, #6366f1 100%)` }}
            >
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-2 rounded-full backdrop-blur-md">
                  <FaWhatsapp size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Contactez-nous</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-xs text-white/80">En ligne maintenant</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat content */}
            <div className="p-6 space-y-4">
              <p className="text-gray-400 text-sm leading-relaxed">
                Besoin d'aide ? Cliquez ci-dessous pour démarrer une conversation sur WhatsApp.
              </p>

              <a
                href="https://wa.me/+212675775884"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between bg-white/5 hover:bg-white/10 p-4 rounded-xl border border-white/10 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg"
                      style={{ backgroundColor: themeColor }}
                    >
                      M.S
                    </div>
                  </div>
                  <div>
                    <span className="block font-bold text-white">C-digital</span>
                    <span className="text-xs text-gray-500">Support Client</span>
                  </div>
                </div>
                <FaWhatsapp size={24} style={{ color: themeColor }} className="group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <div className="fixed bottom-8 right-8 z-50">
        <motion.button
          onClick={toggleChat}
          className="relative w-14 h-14 rounded-full shadow-2xl flex items-center justify-center text-white overflow-hidden group"
          style={{ 
            background: isOpen ? '#ef4444' : `linear-gradient(135deg, ${themeColor} 0%, #6366f1 100%)`,
            boxShadow: isOpen ? '0 0 20px rgba(239, 68, 68, 0.4)' : `0 0 20px rgba(174, 82, 240, 0.4)`
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ y: 20, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            rotate: isOpen ? 0 : [0, -5, 5, -5, 0],
          }}
          transition={{
            y: { duration: 0.5 },
            opacity: { duration: 0.5 },
            rotate: {
              duration: 2,
              repeat: isOpen ? 0 : Infinity,
              repeatDelay: 3,
            }
          }}
        >
          {isOpen ? (
            <FaTimes size={28} />
          ) : (
            <>
              <FaWhatsapp size={28} />
              <motion.div
                className="absolute -top-1 -right-1 bg-green-500 text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold border-2 border-[#030303]"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1 }}
              >
                1
              </motion.div>
            </>
          )}
        </motion.button>
      </div>

      {/* Tooltip */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            className="fixed bottom-10 right-20 md:right-24 z-40 bg-white/5 backdrop-blur-md py-2 px-4 rounded-xl shadow-xl border border-white/10 hidden md:block"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ delay: 0.5 }}
          >
            <div className="text-white font-medium text-sm">Besoin d'aide ?</div>
            <div className="text-gray-400 text-xs">Contactez-nous ici</div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
