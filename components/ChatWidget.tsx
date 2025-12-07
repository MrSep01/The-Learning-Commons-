import React, { useState, useRef, useEffect } from 'react';
import { IconMessageCircle, IconSend, IconCpu, IconLightbulb } from './Icons';
import { sendMessageToVirtualLibrarian } from '../services/geminiService';
import { ChatMessage } from '../types';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Hi! I'm the Virtual Librarian. Ask me anything about the Learning Commons!",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    const responseText = await sendMessageToVirtualLibrarian(inputValue);

    const botMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMessage]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      
      {/* Chat Window */}
      <div 
        className={`bg-white rounded-2xl shadow-2xl border border-slate-200 w-80 sm:w-96 mb-4 overflow-hidden transition-all duration-300 origin-bottom-right pointer-events-auto ${
          isOpen 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 translate-y-10 pointer-events-none h-0'
        }`}
        style={{ maxHeight: '600px', display: isOpen ? 'flex' : 'none', flexDirection: 'column' }}
      >
        {/* Header */}
        <div className="bg-bcc-purple p-4 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2">
            <div className="bg-white/20 p-1.5 rounded-full">
               <IconCpu className="w-5 h-5 text-bcc-gold" />
            </div>
            <div>
               <h3 className="font-bold text-sm">Virtual Librarian</h3>
               <div className="flex items-center text-xs text-bcc-gold opacity-90">
                 <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5"></span>
                 Online
               </div>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-white/80 hover:text-white hover:bg-white/10 p-1 rounded transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50 h-80 sm:h-96 scrollbar-hide">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-bcc-purple text-white rounded-br-none' 
                    : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
             <div className="flex justify-start">
              <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-none px-4 py-2 shadow-sm">
                <div className="flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-75"></div>
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 bg-white border-t border-slate-100 shrink-0">
          <div className="flex items-center space-x-2 bg-slate-100 rounded-xl px-3 py-2 border border-slate-200 focus-within:ring-2 focus-within:ring-bcc-purple/50 focus-within:border-bcc-purple/50 transition-all">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1 bg-transparent border-none focus:outline-none text-sm text-slate-800 placeholder-slate-400 min-w-0"
              autoFocus={isOpen}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !inputValue.trim()}
              className={`p-1.5 rounded-lg transition-all ${
                isLoading || !inputValue.trim() 
                  ? 'text-slate-400' 
                  : 'text-bcc-purple hover:bg-bcc-purple/10'
              }`}
            >
              <IconSend className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`group flex items-center justify-center pointer-events-auto transition-all duration-300 shadow-lg hover:shadow-xl ${
          isOpen 
            ? 'w-12 h-12 rounded-full bg-slate-200 text-slate-600 hover:bg-slate-300' 
            : 'w-14 h-14 rounded-full bg-bcc-purple text-white hover:bg-bcc-dark hover:scale-110'
        }`}
        aria-label="Toggle Virtual Librarian"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        ) : (
          <>
            <IconMessageCircle className="w-7 h-7" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-bcc-gold opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-bcc-gold"></span>
            </span>
          </>
        )}
      </button>
      
      {/* Tooltip / Prompt (only when closed) */}
      {!isOpen && (
        <div className="absolute bottom-4 right-16 pointer-events-none whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg">
          Ask the AI Librarian!
        </div>
      )}
    </div>
  );
};

export default ChatWidget;