import React, { useRef, useEffect } from 'react';
import { Message } from '../types';
import { MessageItem } from './MessageItem';

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

export const MessageList: React.FC<MessageListProps> = ({ messages, isLoading }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, messages.length, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 scroll-smooth">
      {messages.map((msg) => (
        <MessageItem key={msg.id} message={msg} />
      ))}
      
      {/* Invisible element to scroll to */}
      <div ref={bottomRef} className="h-4" />
    </div>
  );
};