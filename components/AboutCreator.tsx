import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Rocket } from 'lucide-react';

import creatorImage from '/michaela.png';
export const AboutCreator: React.FC = () => {
  return (
    <section id="creator" className="py-24 bg-slate-50 border-t border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Image Content with Modern Frame */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative max-w-md mx-auto lg:max-w-none w-full"
          >
            {/* Decorative Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-gradient-to-tr from-orb-200 to-slate-200 rounded-full blur-3xl -z-10 opacity-60"></div>
            
            {/* Modern Frame */}
            <div className="relative aspect-[3/4] rounded-[2.5rem] p-3 bg-white shadow-2xl border border-slate-100 transform md:-rotate-2 hover:rotate-0 transition-transform duration-500 ease-out">
              <div className="w-full h-full rounded-[2rem] overflow-hidden relative bg-slate-100">
                <img 
                  src={creatorImage}
                  alt="Michael A." 
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
                {/* Subtle inner shadow/overlay for premium feel */}
                <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-[2rem]"></div>
              </div>
            </div>
            
            {/* Floating Status Badge */}
            <div className="absolute -bottom-5 -right-5 md:-right-8 bg-white py-3 px-5 rounded-2xl shadow-xl border border-slate-100 z-10">
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-sm font-bold text-slate-900 tracking-wide">Available for work</span>
              </div>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <h2 className="text-orb-600 font-bold tracking-widest uppercase text-sm mb-3">Who Built This?</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-2">
              Michael A.
            </h3>
            <p className="text-xl text-slate-500 font-medium mb-8">
              Full stack AI-assisted developer
            </p>
            
            <div className="space-y-6 text-slate-600 text-lg leading-relaxed mb-10">
              <p>
                Traditional developers write code line-by-line. I act as an AI Engineer and Architect, engineering prompts to generate, assemble, and deliver high-quality web applications in days, not months.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="flex flex-col gap-3">
                <div className="w-12 h-12 bg-white rounded-xl text-orb-600 flex items-center justify-center border border-slate-200 shadow-sm">
                  <Code2 size={24} />
                </div>
                <div>
                  <h5 className="font-bold text-slate-900">Rapid Prototyping</h5>
                  <p className="text-sm text-slate-500 mt-1">From concept to functional app at lightspeed.</p>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="w-12 h-12 bg-white rounded-xl text-orb-600 flex items-center justify-center border border-slate-200 shadow-sm">
                  <Rocket size={24} />
                </div>
                <div>
                  <h5 className="font-bold text-slate-900">Production Ready</h5>
                  <p className="text-sm text-slate-500 mt-1">Scalable, secure, and performant architectures.</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
