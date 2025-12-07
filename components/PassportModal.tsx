
import React from 'react';
import { MOCK_USER_PROFILE } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

interface PassportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PassportModal: React.FC<PassportModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden relative" onClick={e => e.stopPropagation()}>
        {/* Background Decoration */}
        <div className="absolute top-0 left-0 w-full h-32 bg-bcc-purple">
           <div className="absolute top-0 right-0 w-40 h-40 bg-bcc-gold opacity-10 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
        </div>

        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 z-10 text-white hover:text-bcc-gold transition-colors bg-black/20 rounded-full p-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        <div className="px-8 pt-8 pb-8 relative">
          {/* Header Card Look */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden bg-slate-200 mb-4 z-10">
                <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">{MOCK_USER_PROFILE.name}</h2>
            <p className="text-slate-500 font-medium tracking-wider text-sm">ID: {MOCK_USER_PROFILE.studentId}</p>
          </div>

          {/* Level Progress */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 mb-6">
            <div className="flex justify-between items-end mb-2">
               <div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">{t('passport.level')}</span>
                  <div className="text-2xl font-extrabold text-bcc-purple">{MOCK_USER_PROFILE.level}</div>
               </div>
               <div className="text-right">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">{t('passport.points')}</span>
                  <div className="text-sm font-bold text-slate-700">{MOCK_USER_PROFILE.currentXP} / <span className="text-slate-400">{MOCK_USER_PROFILE.nextLevelXP}</span></div>
               </div>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                <div 
                   className="bg-gradient-to-r from-bcc-purple to-purple-400 h-3 rounded-full" 
                   style={{ width: `${(MOCK_USER_PROFILE.currentXP / MOCK_USER_PROFILE.nextLevelXP) * 100}%` }}
                ></div>
            </div>
            <p className="text-xs text-slate-500 mt-2 text-center">{t('passport.nextReward')}: 1-Hour VR Studio Pass</p>
          </div>

          {/* Badges Grid */}
          <div className="mb-6">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide mb-3">{t('passport.badges')}</h3>
            <div className="grid grid-cols-3 gap-3">
               {MOCK_USER_PROFILE.badges.map(badge => (
                 <div key={badge.id} className={`flex flex-col items-center justify-center p-3 rounded-xl border border-dashed border-slate-300 hover:border-solid hover:border-bcc-gold hover:bg-yellow-50 transition-all cursor-pointer group`}>
                    <div className={`text-2xl mb-1 group-hover:scale-110 transition-transform`}>{badge.icon}</div>
                    <div className="text-[10px] font-bold text-slate-600 text-center leading-tight">{badge.name}</div>
                 </div>
               ))}
               {/* Empty Slot Placeholder */}
               <div className="flex flex-col items-center justify-center p-3 rounded-xl border border-dashed border-slate-200 bg-slate-50 opacity-50">
                    <div className="text-2xl mb-1 text-slate-300">🔒</div>
                    <div className="text-[10px] font-bold text-slate-400 text-center">Locked</div>
               </div>
            </div>
          </div>

          {/* Active Challenges */}
          <div>
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide mb-3">{t('passport.challenges')}</h3>
            <div className="space-y-3">
               {MOCK_USER_PROFILE.challenges.map(challenge => (
                 <div key={challenge.id} className="flex items-center bg-white border border-slate-100 rounded-lg p-3 shadow-sm">
                    <div className="flex-1">
                       <div className="flex justify-between mb-1">
                          <span className="text-sm font-bold text-slate-700">{challenge.title}</span>
                          <span className="text-xs font-bold text-bcc-gold">+{challenge.rewardXP} XP</span>
                       </div>
                       <div className="w-full bg-slate-100 rounded-full h-1.5">
                           <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${(challenge.progress / challenge.total) * 100}%` }}></div>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PassportModal;
