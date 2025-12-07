
import React from 'react';
import { Link } from 'react-router-dom';
import { IconCpu } from './Icons';
import { useLanguage } from '../contexts/LanguageContext';

const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="relative bg-bcc-purple text-white overflow-hidden min-h-[500px] flex items-center justify-center">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1920&auto=format&fit=crop" 
          alt="Modern Learning Space" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bcc-purple/90 via-bcc-dark/95 to-bcc-purple/90"></div>
        
        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-bcc-gold opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-white opacity-5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 border border-white/20 text-bcc-gold text-sm font-bold tracking-wider mb-6 animate-fade-in-up">
           <span className="w-2 h-2 bg-bcc-gold rounded-full mr-2 animate-pulse"></span>
           BANGKOK CHRISTIAN COLLEGE
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6 drop-shadow-lg">
          {t('hero.welcome')} <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-indigo-200">{t('hero.title')}</span>
        </h1>
       
        <p className="text-lg md:text-xl text-indigo-100 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          {t('hero.subtitle')}
        </p>
        
        {/* Fake Search Bar for Interaction */}
        <div className="max-w-xl mx-auto relative group cursor-pointer" onClick={() => (document.querySelector('button[aria-label="Toggle Virtual Librarian"]') as HTMLElement)?.click()}>
          <div className="absolute inset-0 bg-bcc-gold rounded-full blur opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
          <div className="relative bg-white rounded-full py-4 px-6 shadow-xl flex items-center justify-between transition-transform duration-300 group-hover:scale-[1.02]">
            <div className="flex items-center text-slate-400 w-full">
              <IconCpu className="w-5 h-5 mr-3 text-bcc-purple" />
              <span className="text-left select-none">{t('hero.searchPlaceholder')}</span>
            </div>
            <div className="bg-bcc-purple p-2 rounded-full text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>
          <p className="text-xs text-indigo-200 mt-3 font-medium">
            {t('hero.tryAsking')} <span className="text-white">"{t('hero.question1')}"</span> or <span className="text-white">"{t('hero.question2')}"</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
