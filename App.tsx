import React, { useState } from 'react';
import Header from './components/Header';
import OfficeCard from './components/OfficeCard';
import ImageEditor from './components/ImageEditor';
import { AppView } from './types';
import { OFFICES } from './data/offices';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DIRECTORY);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header currentView={currentView} setCurrentView={setCurrentView} />

      <main className="flex-grow">
        {currentView === AppView.DIRECTORY ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
                Top Stem Cell Centers
              </h2>
              <p className="mt-4 max-w-2xl text-xl text-slate-500 mx-auto">
                A curated directory of leading regenerative medicine facilities across the top 10 states.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {OFFICES.map((office) => (
                <OfficeCard key={office.id} office={office} />
              ))}
            </div>
            
            <div className="mt-16 bg-white rounded-2xl p-8 border border-slate-200 shadow-sm text-center">
              <h3 className="text-lg font-medium text-slate-900 mb-2">Are you a provider?</h3>
              <p className="text-slate-500 mb-4">Join our directory to reach patients looking for regenerative therapies.</p>
              <button className="inline-flex items-center px-4 py-2 border border-slate-300 shadow-sm text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50">
                Contact Support
              </button>
            </div>
          </div>
        ) : (
          <ImageEditor />
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 mt-auto">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-slate-400">
            &copy; {new Date().getFullYear()} RegenDirectory. All rights reserved. <br/>
            <span className="text-xs">Disclaimer: This directory is for informational purposes only. Consult a doctor for medical advice.</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;