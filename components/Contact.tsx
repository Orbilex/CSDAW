import React from 'react';
import { Mail, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
       {/* Background accent */}
       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full bg-orb-500/5 blur-[100px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold text-slate-900 mb-8">
            Ready to build the future?
          </h2>
          <p className="text-xl text-slate-600 mb-12">
            Let's turn your vision into a high-performance digital reality. 
            Contact us today to discuss your project.
          </p>

          <div className="bg-white/70 backdrop-blur-md p-8 rounded-2xl border border-slate-200 shadow-xl inline-block w-full max-w-2xl">
             <div className="flex flex-col items-center justify-center space-y-6">
                <div className="p-4 bg-orb-100 rounded-full">
                  <Mail className="w-10 h-10 text-orb-600" />
                </div>
                <div>
                   <p className="text-sm text-slate-500 uppercase tracking-widest mb-2">Email Us Directly</p>
                   <a 
                     href="mailto:orbilexexample@gmail.com" 
                     className="text-3xl md:text-5xl font-bold text-slate-900 hover:text-orb-600 transition-colors break-all"
                   >
                     orbilex@gmail.com
                   </a>
                </div>
                <div className="w-full h-px bg-slate-200"></div>
                <div className="flex items-center text-slate-500 text-sm">
                   <span className="flex items-center gap-2">
                     <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                     </span>
                     Typical response time: &lt; 24 hours
                   </span>
                </div>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
