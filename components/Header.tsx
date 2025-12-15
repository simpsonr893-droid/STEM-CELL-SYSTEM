import React from 'react';
import { AppView } from '../types';
import { Activity, Search, Sparkles } from 'lucide-react';

interface HeaderProps {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, setCurrentView }) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center cursor-pointer" onClick={() => setCurrentView(AppView.DIRECTORY)}>
            <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-600 text-white shadow-md">
              <Activity size={24} />
            </div>
            <div className="ml-3">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">RegenDirectory</h1>
              <p className="text-xs text-slate-500 font-medium tracking-wide">STEM CELL & REGENERATIVE</p>
            </div>
          </div>
          
          <nav className="flex space-x-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setCurrentView(AppView.DIRECTORY)}
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                currentView === AppView.DIRECTORY
                  ? 'bg-white text-teal-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <Search size={16} className="mr-2" />
              Directory
            </button>
            <button
              onClick={() => setCurrentView(AppView.AI_LAB)}
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                currentView === AppView.AI_LAB
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <Sparkles size={16} className="mr-2" />
              AI Image Lab
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;