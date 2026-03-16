import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { InteractiveDemo } from './components/InteractiveDemo';
import { CatalogApp } from './components/CatalogApp';
import { WhyUs } from './components/WhyUs';
import { Process } from './components/Process';
import { AboutCreator } from './components/AboutCreator';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  const [showCatalog, setShowCatalog] = useState(false);

  // If Catalog is active, we unmount the rest of the site to ensure maximum performance
  // and a true "app" feel.
  const content = showCatalog ? (
    <CatalogApp onBack={() => setShowCatalog(false)} />
  ) : (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <InteractiveDemo onLaunch={() => setShowCatalog(true)} />
        <WhyUs />
        <Process />
        <AboutCreator />
        <Contact />
      </main>
      <Footer />
    </>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-orb-200 selection:text-orb-900 flex flex-col">
      <div className="flex-grow">
        {content}
      </div>
      
      {/* Sample Site Note Bar */}
      <div className="bg-slate-900 py-3 px-4 border-t border-slate-800">
        <p className="text-center text-slate-400 text-[10px] sm:text-xs font-medium tracking-wider uppercase">
          Note: This is a sample site created to showcase my current skill set and workflow. - Michael
        </p>
      </div>
    </div>
  );
};

export default App;
