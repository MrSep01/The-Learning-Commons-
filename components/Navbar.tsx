
import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import PassportModal from './PassportModal';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const [showPassport, setShowPassport] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'th' : 'en');
  };

  const navItems = [
    { label: t('nav.home'), path: '/' },
    { label: t('nav.about'), path: '/about' },
    { label: t('nav.zones'), path: '/zones' },
    { label: t('nav.reserve'), path: '/booking' },
    { label: t('nav.tutoring'), path: '/tutoring' },
    { label: t('nav.showcase'), path: '/showcase' },
    { label: t('nav.events'), path: '/events' },
    { label: t('nav.virtual'), path: '/virtual' },
    { label: t('nav.impact'), path: '/impact' },
  ];

  return (
    <>
    <nav className="bg-white shadow-md sticky top-0 z-50 border-t-4 border-bcc-gold">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <Link to="/" className="flex items-center cursor-pointer">
            <div className="flex-shrink-0 flex items-center gap-3">
              <div className="w-10 h-10 bg-bcc-purple rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-bcc-gold font-bold text-lg">LC</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl text-bcc-purple leading-none">Learning Commons</span>
                <span className="text-xs text-slate-500 font-medium tracking-wider">BANGKOK CHRISTIAN COLLEGE</span>
              </div>
            </div>
          </Link>
          
          <div className="hidden xl:flex items-center space-x-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-bold transition-all duration-200 ${
                    isActive
                      ? 'text-bcc-purple bg-bcc-light'
                      : 'text-slate-600 hover:text-bcc-purple hover:bg-slate-50'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <div className="hidden xl:flex items-center gap-4 ml-4 pl-4 border-l border-slate-200">
             {/* Language Toggle */}
             <button 
               onClick={toggleLanguage}
               className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
             >
                <span className={`text-xs font-bold ${language === 'en' ? 'text-bcc-purple' : 'text-slate-400'}`}>EN</span>
                <span className="text-slate-300">|</span>
                <span className={`text-xs font-bold ${language === 'th' ? 'text-bcc-purple' : 'text-slate-400'}`}>TH</span>
             </button>

             {/* Passport / User Profile */}
             <button 
               onClick={() => setShowPassport(true)}
               className="w-10 h-10 rounded-full bg-bcc-light border-2 border-white shadow-sm flex items-center justify-center text-bcc-purple hover:bg-bcc-purple hover:text-white transition-all hover:scale-105"
               title="My Passport"
             >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
             </button>
          </div>

          <div className="flex items-center xl:hidden gap-4">
             {/* Mobile Passport */}
             <button 
               onClick={() => setShowPassport(true)}
               className="w-8 h-8 rounded-full bg-bcc-light flex items-center justify-center text-bcc-purple"
             >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
             </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-bcc-purple hover:bg-bcc-light focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="xl:hidden bg-white border-t border-slate-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                    isActive
                      ? 'text-bcc-purple bg-bcc-light'
                      : 'text-slate-600 hover:text-bcc-purple hover:bg-slate-50'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
             <button 
               onClick={toggleLanguage}
               className="w-full text-left px-3 py-2 text-slate-600 font-medium hover:bg-slate-50 flex items-center gap-2"
             >
                <span>Change Language:</span>
                <span className={`text-xs font-bold ${language === 'en' ? 'text-bcc-purple' : 'text-slate-400'}`}>EN</span>
                <span className="text-slate-300">|</span>
                <span className={`text-xs font-bold ${language === 'th' ? 'text-bcc-purple' : 'text-slate-400'}`}>TH</span>
             </button>
          </div>
        </div>
      )}
    </nav>
    <PassportModal isOpen={showPassport} onClose={() => setShowPassport(false)} />
    </>
  );
};

export default Navbar;
