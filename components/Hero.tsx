import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Hero: React.FC = () => {
  const words = ["Software", "Websites", "Mobile Apps"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16">
      {/* Background Effects */}
      <div className="absolute inset-0 w-full h-full bg-slate-50">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-orb-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-accent-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 brightness-100 contrast-150"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-slate-200 bg-white/50 backdrop-blur-sm mb-8 shadow-sm">
            <span className="flex h-2 w-2 relative mr-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-slate-600 text-sm font-medium">Accepting New Clients for Q4</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold text-slate-900 tracking-tight leading-[1.1] mb-8">
            <span className="block mb-2">We Build Custom</span>
            
            {/* Animated Text Container */}
            <div className="relative inline-grid grid-cols-1 place-items-center h-[1.3em] overflow-hidden my-2 px-2 align-middle">
               {/* Ghost element to reserve width for the longest word */}
               <span className="col-start-1 row-start-1 invisible opacity-0 select-none font-bold">Mobile Apps</span>
               
               <AnimatePresence mode="popLayout">
                  <motion.span
                    key={index}
                    initial={{ y: "100%", opacity: 0, filter: "blur(4px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: "-100%", opacity: 0, filter: "blur(4px)" }}
                    transition={{
                      y: { type: "spring", stiffness: 280, damping: 25 },
                      opacity: { duration: 0.2 },
                      filter: { duration: 0.2 }
                    }}
                    className="col-start-1 row-start-1 text-transparent bg-clip-text bg-gradient-to-r from-orb-600 to-accent-600 pb-1 text-center w-full"
                  >
                    {words[index]}
                  </motion.span>
               </AnimatePresence>
            </div>

            <span className="block text-slate-600 mt-4 text-2xl md:text-4xl font-medium tracking-normal leading-tight">
              For You & Your Business.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 mb-10 leading-relaxed px-4">
            Whether you need a new website, custom software, or a mobile app, we are here to help. Tell us about your project, and our team will bring it to life.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#contact"
              className="w-full sm:w-auto px-8 py-4 bg-orb-600 text-white rounded-full font-bold text-lg hover:bg-orb-700 transition-all shadow-xl shadow-orb-200 flex items-center justify-center gap-2 group"
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#process"
              className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-full font-bold text-lg hover:bg-slate-50 transition-all shadow-sm flex items-center justify-center gap-2"
            >
              How We Work
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};