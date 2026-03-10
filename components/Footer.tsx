import React from 'react';
import { Rocket } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Rocket className="w-5 h-5 text-orb-600" />
            <span className="text-xl font-bold font-display text-slate-900">ORBILEX</span>
        </div>
        
        <div className="text-slate-500 text-sm text-center md:text-right">
          <p>&copy; {new Date().getFullYear()} Orbilex. All rights reserved.</p>
          <p className="mt-1">Designed & Engineered for Performance.</p>
        </div>
      </div>
    </footer>
  );
};
