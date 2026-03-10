import React from 'react';
import { Zap, ShieldCheck, Clock, Award } from 'lucide-react';
import { motion } from 'framer-motion';

export const WhyUs: React.FC = () => {
  return (
    <section className="py-24 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-orb-600 font-bold tracking-widest uppercase text-sm mb-3">Why Choose Us</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6 leading-tight">
              Speed meets <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orb-600 to-accent-600">Quality.</span>
            </h3>
            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
              We focus on one thing: building software that helps your business grow. 
              We work quickly to deliver your project, ensuring it is secure, fast, and easy to use.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-orb-100 p-2 rounded-lg text-orb-600">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900">Fast Delivery</h4>
                  <p className="text-slate-600">We work quickly. You will see results in weeks, not months.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-purple-100 p-2 rounded-lg text-purple-600">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900">High Standard</h4>
                  <p className="text-slate-600">We build carefully. We use clean code so your software works perfectly.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="relative"
          >
             <div className="absolute inset-0 bg-gradient-to-r from-orb-500 to-accent-500 blur-3xl opacity-10 rounded-full"></div>
             <div className="relative bg-white border border-slate-200 p-8 rounded-2xl grid grid-cols-2 gap-4 shadow-xl">
                <div className="col-span-2 bg-slate-50 p-6 rounded-xl border border-slate-100">
                   <div className="text-4xl font-bold text-slate-900 mb-2">100%</div>
                   <div className="text-slate-500">Client Satisfaction</div>
                </div>
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                   <div className="text-4xl font-bold text-slate-900 mb-2">2x</div>
                   <div className="text-slate-500">Faster Delivery</div>
                </div>
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                   <div className="text-4xl font-bold text-slate-900 mb-2">24/7</div>
                   <div className="text-slate-500">System Uptime</div>
                </div>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};