import React from 'react';
import { Monitor, Smartphone, Database, Zap, Globe, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

const services = [
  {
    icon: <Globe className="w-8 h-8 text-orb-600" />,
    title: 'High-Performance Websites',
    description: "Marketing sites, portfolios, and landing pages optimized for SEO and conversion. We build the face of your brand with speed and precision.",
    tags: ['React', 'Next.js', 'Tailwind']
  },
  {
    icon: <Monitor className="w-8 h-8 text-purple-600" />,
    title: 'Web Applications',
    description: "Complex SaaS platforms, dashboards, and internal tools. We replace spreadsheets with powerful, secure, and scalable web software.",
    tags: ['Dashboard', 'SaaS', 'Cloud']
  },
  {
    icon: <Smartphone className="w-8 h-8 text-pink-600" />,
    title: 'Mobile App Development',
    description: "Cross-platform mobile experiences that feel native. We bring your product to iOS and Android without the bloat.",
    tags: ['iOS', 'Android', 'React Native']
  },
  {
    icon: <Database className="w-8 h-8 text-emerald-600" />,
    title: 'Custom Backend Solutions',
    description: "Robust API development and database architecture. We ensure your data is secure, accessible, and structured for growth.",
    tags: ['API', 'PostgreSQL', 'Node.js']
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-orb-600 font-bold tracking-widest uppercase text-sm mb-3">Our Expertise</h2>
          <h3 className="text-3xl md:text-5xl font-display font-bold text-slate-900 mb-6">What We Build</h3>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            We focus strictly on what delivers value to your business today. 
            No over-engineering, just solid, scalable digital products.
          </p>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {services.map((service, idx) => (
            <motion.div 
              key={idx}
              variants={item}
              className="group relative p-8 bg-slate-50 border border-slate-200 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orb-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="mb-6 p-3 bg-white rounded-lg inline-block border border-slate-200 group-hover:border-slate-300 shadow-sm">
                  {service.icon}
                </div>
                <h4 className="text-2xl font-bold text-slate-900 mb-4">{service.title}</h4>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-white text-slate-600 text-xs rounded-full border border-slate-200 font-medium">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};