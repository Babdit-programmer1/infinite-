import { useState, useRef, useEffect } from 'react';
import { Header } from './components/Header';
import { MessageList } from './components/MessageList';
import { InputArea } from './components/InputArea';
import { WelcomeScreen } from './components/WelcomeScreen';
import { ChatService } from './services/gemini';
import { Message, Role } from './types';

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatServiceRef = useRef<ChatService | null>(null);

  // Initialize Chat Service once
  useEffect(() => {
    // ChatService constructor is now safe and won't throw even if API key is missing
    chatServiceRef.current = new ChatService();
  }, []);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;
    
    // Ensure service is initialized
    if (!chatServiceRef.current) {
        chatServiceRef.current = new ChatService();
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: Role.USER,
      content: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Create a placeholder for the bot response
      const botMessageId = (Date.now() + 1).toString();
      const initialBotMessage: Message = {
        id: botMessageId,
        role: Role.ASSISTANT,
        content: '',
        timestamp: new Date(),
        isStreaming: true
      };

      setMessages(prev => [...prev, initialBotMessage]);

      await chatServiceRef.current.sendMessageStream(text, (chunk) => {
        setMessages(prev => prev.map(msg => {
          if (msg.id === botMessageId) {
            return {
              ...msg,
              content: msg.content + chunk
            };
          }
          return msg;
        }));
      });

      // Mark as done streaming
      setMessages(prev => prev.map(msg => {
        if (msg.id === botMessageId) {
          return { ...msg, isStreaming: false };
        }
        return msg;
      }));

    } catch (err) {
      console.error("Error sending message:", err);
      // Even with mock fallback, if something catastrophic happens:
      setMessages(prev => prev.map(msg => {
        if (msg.isStreaming) {
           return { ...msg, isStreaming: false, content: msg.content + "\n\n[Error: Unable to generate response]" };
        }
        return msg;
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
    chatServiceRef.current = new ChatService(); // Reset session
  };

  return (
    <div className="flex flex-col h-screen bg-slate-900 text-slate-100 overflow-hidden relative selection:bg-cyan-500/30">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-900/20 rounded-full blur-[120px]" />
      </div>

      <div className="z-10 flex flex-col h-full max-w-5xl mx-auto w-full shadow-2xl bg-slate-900/50 backdrop-blur-sm border-x border-slate-800/50">
        <Header onClear={handleClearChat} hasMessages={messages.length > 0} />

        <main className="flex-1 overflow-hidden relative flex flex-col">
          {messages.length === 0 ? (
            <WelcomeScreen onSuggestionClick={handleSendMessage} />
          ) : (
            <MessageList messages={messages} isLoading={isLoading} />
          )}
        </main>

        <InputArea onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
}