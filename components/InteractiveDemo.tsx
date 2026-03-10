import React from 'react';
import { motion } from 'framer-motion';
import { Maximize2, ArrowRight, ShoppingBasket, Star, Leaf } from 'lucide-react';

interface InteractiveDemoProps {
  onLaunch: () => void;
}

export const InteractiveDemo: React.FC<InteractiveDemoProps> = ({ onLaunch }) => {
  return (
    <section id="demo" className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Visual Showcase (Static but Animated Container) */}
          {/* Mobile: Order 1 (Top), Desktop: Order 2 (Right) */}
          <motion.div
             initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
             whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
             transition={{ duration: 0.8 }}
             viewport={{ once: true }}
             className="relative order-1 lg:order-2"
          >
             {/* Abstract Background Blobs */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] md:w-[120%] md:h-[120%] bg-gradient-to-tr from-orb-100 to-green-100 rounded-full blur-3xl opacity-50 -z-10 animate-pulse-slow"></div>

             {/* Device Frame */}
             <div className="relative bg-white rounded-3xl shadow-2xl border-4 border-slate-100 overflow-hidden max-w-[320px] sm:max-w-sm mx-auto transform rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
                {/* Fake Header */}
                <div className="bg-white border-b border-slate-100 p-4 flex items-center justify-between">
                   <div className="flex items-center gap-2">
                     <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white">
                        <ShoppingBasket size={16} />
                     </div>
                     <span className="font-bold text-slate-900 text-sm sm:text-base">Orbilex<span className="text-green-600">Market</span></span>
                   </div>
                   <div className="w-6 h-6 rounded-full bg-slate-100"></div>
                </div>
                
                {/* Hero Item Content */}
                <div className="p-1 pb-0">
                  <div className="relative rounded-2xl overflow-hidden bg-slate-50 aspect-square">
                     <img 
                       src="https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80" 
                       alt="Potatoes" 
                       className="w-full h-full object-cover"
                     />
                     <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm">
                       <Leaf size={10} /> Farm Fresh
                     </div>
                  </div>
                </div>

                <div className="p-5 sm:p-6">
                   <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-xl sm:text-2xl text-slate-900">Yukon Potatoes</h4>
                      <span className="font-bold text-lg text-slate-900">$3.99</span>
                   </div>
                   <p className="text-slate-500 text-sm mb-6 leading-relaxed">Versatile gold potatoes with a buttery texture. Perfect for roasting or mashing (5lb bag).</p>
                   
                   <div className="flex items-center gap-3">
                      <div className="h-12 w-28 sm:w-32 bg-slate-100 rounded-xl flex items-center justify-around px-2">
                         <span className="text-slate-400 font-bold">-</span>
                         <span className="text-slate-900 font-bold">1</span>
                         <span className="text-slate-900 font-bold">+</span>
                      </div>
                      <div className="h-12 flex-1 bg-green-600 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-green-200 cursor-pointer hover:bg-green-700 transition-colors">
                        Add to Cart
                      </div>
                   </div>
                </div>
             </div>

             {/* Floating Badge */}
             <motion.div 
               animate={{ y: [0, -10, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="absolute top-4 -right-2 sm:top-10 sm:-right-4 md:right-0 bg-white p-2 sm:p-3 rounded-2xl shadow-xl flex items-center gap-2 sm:gap-3 border border-slate-50 max-w-[140px] sm:max-w-none"
             >
                <div className="bg-yellow-100 p-1.5 sm:p-2 rounded-full text-yellow-600 shrink-0">
                  <Star size={16} className="sm:w-5 sm:h-5" fill="currentColor" />
                </div>
                <div className="min-w-0">
                   <div className="font-bold text-slate-900 text-sm truncate">Best Seller</div>
                   <div className="text-[10px] sm:text-xs text-slate-500 truncate">Local Farm</div>
                </div>
             </motion.div>
          </motion.div>

          {/* Text Content */}
          {/* Mobile: Order 2 (Bottom), Desktop: Order 1 (Left) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-center lg:text-left order-2 lg:order-1"
          >
            <h2 className="font-bold tracking-widest uppercase text-xs sm:text-sm mb-3">
              <motion.span
                className="bg-clip-text text-transparent bg-gradient-to-r from-orb-600 via-green-400 to-orb-600 bg-[length:200%_100%]"
                animate={{ backgroundPosition: ['100% 0', '-100% 0'] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 5, ease: "linear" }}
              >
                Interactive Showcase
              </motion.span>
            </h2>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-slate-900 mb-4 sm:mb-6 leading-tight">
              Experience the <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orb-600 to-accent-600">Future of Shopping.</span>
            </h3>
            <p className="text-slate-600 text-base sm:text-lg mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Try our high-performance grocery kiosk application. Built for speed, inventory management, and seamless checkout.
              Fresh produce to your door in seconds.
            </p>

            <div className="flex flex-col items-center lg:items-start space-y-4">
                <button
                onClick={onLaunch}
                className="relative overflow-hidden inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-full font-bold hover:bg-orb-600 transition-all hover:scale-105 shadow-2xl shadow-orb-200 group w-full sm:w-auto justify-center"
                >
                  {/* Sheen Effect */}
                  <motion.div
                    className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                    animate={{ left: ['-100%', '200%'] }}
                    transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
                  />
                  
                  {/* Subtle Pulse Glow */}
                  <div className="absolute inset-0 rounded-full bg-orb-400/0 group-hover:bg-orb-400/10 animate-pulse transition-colors"></div>

                  <Maximize2 size={18} className="relative z-10" />
                  <span className="relative z-10">Launch Market Demo</span>
                  <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <p className="text-xs text-slate-400 font-medium">
                * Launches full-screen interactive experience
                </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};