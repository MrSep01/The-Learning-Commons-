import React from 'react';
import { IMPACT_POINTS } from '../constants';

const ImpactSection: React.FC = () => {
  return (
    <div className="bg-bcc-purple py-24 text-white relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-bcc-gold opacity-10 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold sm:text-4xl">Our Community Impact</h2>
          <div className="w-20 h-1 bg-bcc-gold mx-auto mt-4 rounded-full"></div>
          <p className="mt-4 text-xl text-indigo-100 max-w-2xl mx-auto">
            A transformed environment creates ripple effects across the entire school ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {IMPACT_POINTS.map((point, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/20 transition-all hover:border-bcc-gold">
              <h3 className="text-xl font-bold text-bcc-gold mb-3">{point.title}</h3>
              <p className="text-white mb-6 text-sm leading-relaxed min-h-[80px]">
                {point.description}
              </p>
              <div className="pt-4 border-t border-white/10">
                <p className="text-xs uppercase tracking-wider text-indigo-200 font-semibold">Outcome</p>
                <p className="text-white font-medium mt-1">{point.stats}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImpactSection;