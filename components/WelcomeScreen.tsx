import React from 'react';
import { Suggestion } from '../types';

interface WelcomeScreenProps {
  onSuggestionClick: (text: string) => void;
}

const SUGGESTIONS: Suggestion[] = [
  { id: '1', text: "Why is the sky blue?", category: "Science" },
  { id: '2', text: "Explain quantum computing simply", category: "Technology" },
  { id: '3', text: "Who was Leonardo da Vinci?", category: "History" },
  { id: '4', text: "How do plants make food?", category: "Nature" },
];

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onSuggestionClick }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center animate-fadeIn">
      <div className="mb-8 relative">
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-2xl shadow-cyan-500/30 mb-6 mx-auto animate-pulse-slow">
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12 text-white">
              <path d="M12 12c-2-2.3-4-3.5-6-3.5-2.6 0-4.6 2.3-4.6 5.3 0 2.8 2.2 5.2 5.3 5.2C9.5 19 11 17 12 14c1 3 2.5 5 5.3 5 3.1 0 5.3-2.4 5.3-5.2 0-3-2-5.3-4.6-5.3-2 0-4 1.2-6 3.5z"/>
           </svg>
        </div>
        <h2 className="text-3xl font-display font-bold text-white mb-3">Hello, I'm Infinite.</h2>
        <p className="text-slate-400 max-w-md mx-auto leading-relaxed">
          I'm here to answer your questions, explain complex topics, and explore the universe of knowledge with you.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
        {SUGGESTIONS.map((suggestion) => (
          <button
            key={suggestion.id}
            onClick={() => onSuggestionClick(suggestion.text)}
            className="group p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 hover:bg-slate-800 hover:border-cyan-500/30 transition-all duration-300 text-left flex flex-col gap-1"
          >
            <span className="text-[10px] font-bold tracking-wider text-cyan-400 uppercase">{suggestion.category}</span>
            <span className="text-slate-200 group-hover:text-white font-medium">{suggestion.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
};