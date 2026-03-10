import React from 'react';
import { MessageSquare, PenTool, Code, Rocket } from 'lucide-react';

const steps = [
  {
    Icon: MessageSquare,
    title: 'Discovery',
    desc: 'We define the scope, goals, and requirements of your project.'
  },
  {
    Icon: PenTool,
    title: 'Design',
    desc: 'We craft intuitive interfaces focused on user experience.'
  },
  {
    Icon: Code,
    title: 'Development',
    desc: 'We write clean, efficient, and scalable code.'
  },
  {
    Icon: Rocket,
    title: 'Launch',
    desc: 'We deploy your product and monitor its performance.'
  }
];

export const Process: React.FC = () => {
  return (
    <section id="process" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-orb-600 font-bold tracking-widest uppercase text-sm mb-3">How We Work</h2>
          <h3 className="text-3xl md:text-5xl font-display font-bold text-slate-900">From Concept to Code</h3>
        </div>

        <div className="relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="bg-white p-6 rounded-xl border border-slate-200 flex flex-col items-center text-center group hover:border-orb-400 hover:shadow-lg transition-all">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-orb-600 mb-6 border-4 border-white shadow-lg group-hover:scale-110 transition-transform">
                  <step.Icon size={28} />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h4>
                <p className="text-slate-600 text-sm">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};