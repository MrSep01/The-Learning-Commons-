import React from 'react';
import { ZONES_DATA, BOOKING_RESOURCES } from '../constants';
import { IconCpu, IconUsers, IconLightbulb } from './Icons';
import { Link } from 'react-router-dom';

const LiveDashboard: React.FC = () => {
  // Combine some key resources for the dashboard
  const keyResources = BOOKING_RESOURCES.slice(0, 4);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-green-500';
      case 'Busy': return 'bg-yellow-500';
      case 'In Use': return 'bg-yellow-500';
      case 'At Capacity': return 'bg-red-500';
      case 'Booked': return 'bg-red-500';
      case 'Closed': return 'bg-slate-500';
      case 'Maintenance': return 'bg-orange-500';
      default: return 'bg-slate-300';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'Available': return 'text-green-600';
      case 'Busy': return 'text-yellow-600';
      case 'In Use': return 'text-yellow-600';
      case 'At Capacity': return 'text-red-600';
      case 'Booked': return 'text-red-600';
      case 'Closed': return 'text-slate-500';
      case 'Maintenance': return 'text-orange-600';
      default: return 'text-slate-500';
    }
  };

  return (
    <div className="bg-white border-y border-slate-200 py-12 relative overflow-hidden">
      {/* Background Pulse Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-bcc-purple/20 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
           <div>
             <div className="flex items-center space-x-2 text-bcc-purple mb-2">
               <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-xs font-bold uppercase tracking-widest">Live Status Dashboard</span>
             </div>
             <h2 className="text-2xl font-bold text-slate-900">Commons Activity</h2>
           </div>
           <Link to="/booking" className="text-sm font-bold text-bcc-purple hover:text-bcc-gold transition-colors flex items-center">
             View All Resources
             <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
           </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Main Zones Status */}
          {ZONES_DATA.slice(0, 4).map((zone) => (
            <div key={zone.id} className="bg-slate-50 rounded-xl p-4 border border-slate-200 shadow-sm flex flex-col justify-between">
               <div className="flex justify-between items-start mb-3">
                 <h3 className="font-bold text-slate-800 text-sm truncate pr-2" title={zone.title}>{zone.title}</h3>
                 <div className={`w-2 h-2 rounded-full flex-shrink-0 mt-1.5 ${getStatusColor(zone.status)}`}></div>
               </div>
               <div className="mt-auto">
                 <p className={`text-lg font-bold ${getStatusText(zone.status)}`}>{zone.status}</p>
                 <p className="text-xs text-slate-500 mt-1 font-medium">{zone.statusDetail}</p>
               </div>
            </div>
          ))}

          {/* Key Equipment Status - Displayed as a horizontal scrolling list on mobile or distinct cards */}
          {keyResources.map((item) => (
            <div key={item.id} className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-1 h-full bg-bcc-purple group-hover:bg-bcc-gold transition-colors"></div>
               <div className="pl-2">
                 <div className="flex justify-between items-start mb-2">
                   <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">{item.category}</p>
                   <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      item.status === 'Available' ? 'bg-green-50 text-green-600 border-green-100' : 
                      item.status === 'In Use' ? 'bg-yellow-50 text-yellow-600 border-yellow-100' :
                      'bg-red-50 text-red-600 border-red-100'
                   }`}>
                      {item.status}
                   </span>
                 </div>
                 <h4 className="font-bold text-slate-800 text-sm mb-1 truncate">{item.name}</h4>
                 <p className="text-xs text-slate-500">
                   {item.status === 'Available' ? 'Ready for use' : `Free in: ${item.nextAvailable}`}
                 </p>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveDashboard;