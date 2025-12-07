import React, { useState, useRef, useEffect } from 'react';
import { IconMessageCircle, IconSend, IconCpu } from './Icons';
import { sendMessageToVirtualLibrarian } from '../services/geminiService';
import { ChatMessage } from '../types';

const VirtualCommons: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Welcome to the Virtual Learning Commons! I'm your AI Librarian. How can I help you with your research, project ideas, or finding resources today?",
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
    scrollToBottom();
  }, [messages]);

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
    <div className="py-12 bg-bcc-light min-h-[600px]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="text-center mb-10">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-bcc-purple text-white mb-4 shadow-sm">
            <IconCpu className="w-4 h-4 mr-2 text-bcc-gold" />
            Always Open
          </span>
          <h2 className="text-3xl font-bold text-bcc-purple">Virtual Learning Commons</h2>
          <p className="mt-4 text-slate-600">
            Access help, resources, and guidance 24/7. Our digital hub extends learning beyond the school day.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-t-4 border-bcc-gold h-[600px] flex flex-col">
          {/* Chat Header */}
          <div className="bg-bcc-purple p-4 text-white flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center border border-bcc-gold/30">
                <IconMessageCircle className="w-6 h-6 text-bcc-gold" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Virtual Librarian</h3>
                <p className="text-xs text-bcc-gold opacity-90">Powered by Gemini AI</p>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-2xl px-5 py-3 text-sm leading-relaxed shadow-sm ${
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
                <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-none px-5 py-3 shadow-sm">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-bcc-purple rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-bcc-purple rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-bcc-purple rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-slate-100">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask about books, finding resources, or upcoming events..."
                className="flex-1 border-slate-300 border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-bcc-purple focus:border-transparent"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !inputValue.trim()}
                className={`p-3 rounded-xl transition-colors flex items-center justify-center ${
                  isLoading || !inputValue.trim() 
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                    : 'bg-bcc-purple text-white hover:bg-bcc-dark shadow-lg'
                }`}
              >
                <IconSend className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-center text-slate-400 mt-2">
              The Virtual Librarian can make mistakes. Please verify important information with school staff.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualCommons;