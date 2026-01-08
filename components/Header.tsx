import React from 'react';

interface HeaderProps {
  onClear: () => void;
  hasMessages: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onClear, hasMessages }) => {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-slate-800 glass-panel sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-white">
              <path d="M12 12c-2-2.3-4-3.5-6-3.5-2.6 0-4.6 2.3-4.6 5.3 0 2.8 2.2 5.2 5.3 5.2C9.5 19 11 17 12 14c1 3 2.5 5 5.3 5 3.1 0 5.3-2.4 5.3-5.2 0-3-2-5.3-4.6-5.3-2 0-4 1.2-6 3.5z"/>
            </svg>
          </div>
          <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-slate-900"></div>
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight font-display text-white">INFINITE</h1>
          <p className="text-xs text-slate-400 font-medium tracking-wide">KNOWLEDGE COMPANION</p>
        </div>
      </div>
      
      {hasMessages && (
        <button 
          onClick={onClear}
          className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors"
          title="Clear Conversation"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6h18"></path>
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
          </svg>
        </button>
      )}
    </header>
  );
};