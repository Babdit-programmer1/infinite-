import React from 'react';
import { Message, Role } from '../types';

interface MessageItemProps {
  message: Message;
}

// Simple helper to process text: preserves newlines, highlights bold, code blocks, and blockquotes
const formatContent = (text: string): React.ReactNode[] => {
  const parts = text.split(/(```[\s\S]*?```|\*\*[^*]+\*\*|`[^`]+`|^>.*$)/gm);
  
  return parts.map((part, index) => {
    if (part.startsWith('```') && part.endsWith('```')) {
      // Code block
      const content = part.slice(3, -3).replace(/^([a-z]+)?\n/, ''); // remove language and first newline
      return (
        <pre key={index} className="my-3 p-3 bg-slate-950 rounded-lg overflow-x-auto border border-slate-800 text-xs sm:text-sm text-cyan-100 font-mono">
          <code>{content}</code>
        </pre>
      );
    } else if (part.startsWith('`') && part.endsWith('`')) {
      // Inline code
      return (
        <code key={index} className="px-1.5 py-0.5 mx-0.5 bg-slate-800 rounded text-cyan-200 font-mono text-sm">
          {part.slice(1, -1)}
        </code>
      );
    } else if (part.startsWith('**') && part.endsWith('**')) {
      // Bold
      return <strong key={index} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
    } else if (part.trim().startsWith('>')) {
      // Blockquote (Did You Know section)
      const content = part.replace(/^>\s?/, '');
      return (
        <blockquote key={index} className="mt-4 mb-2 pl-4 border-l-4 border-cyan-500 bg-slate-900/30 p-3 rounded-r-lg italic text-slate-300 shadow-sm">
          {formatContent(content)}
        </blockquote>
      );
    } else {
      // Regular text (handle newlines)
      return <span key={index}>{part}</span>;
    }
  });
};

export const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const isBot = message.role === Role.ASSISTANT;

  return (
    <div className={`flex w-full message-enter ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div className={`flex gap-3 max-w-[85%] sm:max-w-[75%] ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
        
        {/* Avatar */}
        <div className="flex-shrink-0 mt-1">
          {isBot ? (
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-900/50">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-white">
                 <path d="M12 12c-2-2.3-4-3.5-6-3.5-2.6 0-4.6 2.3-4.6 5.3 0 2.8 2.2 5.2 5.3 5.2C9.5 19 11 17 12 14c1 3 2.5 5 5.3 5 3.1 0 5.3-2.4 5.3-5.2 0-3-2-5.3-4.6-5.3-2 0-4 1.2-6 3.5z"/>
              </svg>
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center border border-slate-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-300">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
          )}
        </div>

        {/* Bubble */}
        <div 
          className={`
            relative p-4 rounded-2xl shadow-sm text-sm sm:text-base leading-relaxed whitespace-pre-wrap
            ${isBot 
              ? 'bg-slate-800/80 border border-slate-700/50 text-slate-200 rounded-tl-none' 
              : 'bg-indigo-600 text-white rounded-tr-none shadow-indigo-500/20'}
          `}
        >
          {formatContent(message.content)}
          
          {/* Cursor for streaming */}
          {isBot && message.isStreaming && (
             <span className="inline-block w-1.5 h-4 ml-1 align-middle bg-cyan-400 animate-pulse rounded-full" />
          )}
        </div>
      </div>
    </div>
  );
};