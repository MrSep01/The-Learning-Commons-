import React from 'react';
import { ZONES_DATA } from '../constants';
import { Link } from 'react-router-dom';

// Pre-defined coordinates for the hotspots on the "simulated" floor plan image
// UPDATED: Coordinates are relative to the full viewport/image container.
const HOTSPOT_COORDINATES = [
  { top: '75%', left: '20%' },  // Innovation (Front Left)
  { top: '65%', left: '50%' },  // Collaboration (Center)
  { top: '55%', left: '80%' },  // Portfolio (Back Right)
  { top: '80%', left: '70%' },  // Subjects (Front Right)
  { top: '60%', left: '15%' },  // PD (Mid Left)
];

const ZonesSection: React.FC = () => {
  const scrollToZone = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-700 border-green-200';
      case 'Busy': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'At Capacity': return 'bg-red-100 text-red-700 border-red-200';
      case 'Closed': return 'bg-slate-100 text-slate-700 border-slate-200';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="bg-white">
      {/* Header Section */}
      <div className="bg-slate-50 pt-20 pb-12 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-bcc-light text-bcc-purple text-xs font-bold tracking-wider uppercase mb-4">
            Interactive Map
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Explore the <span className="text-bcc-purple">Layout</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light">
            Click on the pulsing hotspots below to jump directly to detailed information about each zone.
          </p>
        </div>
      </div>

      {/* Interactive Map Visual */}
      <div className="relative w-full h-[700px] bg-slate-900 overflow-hidden group border-y border-slate-200">
        {/* Background Image - Collaborative, People Visible */}
        <div className="absolute inset-0">
           <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1920&auto=format&fit=crop" 
            alt="Students collaborating in Learning Commons" 
            className="w-full h-full object-cover opacity-90 transition-transform duration-1000 group-hover:scale-105"
          />
          {/* Gradient Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
        </div>

        {/* Hotspots Container - Fixed to fill full width/height relative to parent */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
           {/* Legend moved to bottom left */}
           <div className="absolute bottom-8 left-8 bg-white/95 backdrop-blur-md border border-white/50 p-4 rounded-xl shadow-lg max-w-xs z-10 pointer-events-auto mx-4 sm:mx-0">
              <h3 className="font-bold text-bcc-purple flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                Active Learning Zones
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Select a highlighted area to see how our community uses the space.
              </p>
           </div>

           {ZONES_DATA.map((zone, index) => {
             const coords = HOTSPOT_COORDINATES[index] || { top: '50%', left: '50%' };
             return (
               <button
                key={zone.id}
                onClick={() => scrollToZone(zone.id)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group/hotspot focus:outline-none pointer-events-auto transition-all duration-300 hover:z-50"
                style={{ top: coords.top, left: coords.left }}
               >
                 {/* Large Pulsing Ring */}
                 <span className="absolute inline-flex h-full w-full rounded-full bg-bcc-gold opacity-30 animate-ping duration-[2s]"></span>
                 
                 {/* Main Dot */}
                 <span className="relative inline-flex rounded-full h-12 w-12 sm:h-16 sm:w-16 bg-white/20 backdrop-blur-sm border-2 border-white shadow-2xl items-center justify-center transition-transform duration-300 group-hover/hotspot:scale-110 hover:bg-bcc-purple/90 hover:border-bcc-gold">
                    <span className="w-4 h-4 sm:w-5 sm:h-5 bg-bcc-gold rounded-full shadow-lg ring-4 ring-black/10"></span>
                 </span>

                 {/* Tooltip Label - Displays ABOVE the pointer */}
                 <div className="absolute left-1/2 bottom-full mb-4 -translate-x-1/2 w-48 sm:w-64 bg-white text-slate-800 p-4 rounded-xl shadow-2xl opacity-100 md:opacity-0 md:group-hover/hotspot:opacity-100 transition-all duration-300 transform translate-y-0 md:translate-y-2 md:group-hover/hotspot:translate-y-0 pointer-events-none z-20 border-l-4 border-bcc-gold">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-xs font-bold text-bcc-purple uppercase tracking-wider">Zone 0{index + 1}</div>
                    </div>
                    <div className="font-bold text-lg leading-tight text-slate-900 mb-1">{zone.title}</div>
                    <div className="text-xs text-slate-500">{zone.usage.split(':')[0]}</div>
                    
                    {/* Arrow */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-white transform rotate-45"></div>
                 </div>
               </button>
             );
           })}
        </div>
      </div>

      {/* Detailed Breakdown Sections */}
      <div className="flex flex-col bg-slate-50">
        <div className="py-16 text-center">
            <h3 className="text-2xl font-bold text-slate-900">Zone Details</h3>
            <div className="w-12 h-1 bg-bcc-gold mx-auto mt-4 rounded-full"></div>
        </div>

        {ZONES_DATA.map((zone, index) => (
          <div
            id={zone.id} // ID for scroll targeting
            key={zone.id}
            className={`py-24 ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50'} scroll-mt-20`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div
                className={`flex flex-col lg:flex-row gap-16 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Image Side */}
                <div className="w-full lg:w-1/2">
                  <div className="relative rounded-3xl overflow-hidden shadow-xl group border-4 border-white">
                    <img
                      src={zone.image}
                      alt={zone.title}
                      className="w-full h-[400px] object-cover filter brightness-95 group-hover:brightness-105 transition-all duration-500"
                    />
                    <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur p-4 rounded-2xl shadow-lg flex items-center space-x-4 border border-slate-100">
                         <div className="text-bcc-purple bg-bcc-light p-3 rounded-full">
                            {zone.icon}
                         </div>
                         <div className="text-left">
                            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Capacity</p>
                            <p className="text-sm font-bold text-slate-900">{zone.capacity}</p>
                         </div>
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div className="w-full lg:w-1/2">
                  <div className="flex items-center gap-3 mb-4">
                     <div className="inline-flex items-center space-x-2 text-bcc-purple font-bold tracking-wider uppercase text-xs bg-bcc-light px-3 py-1 rounded-full border border-bcc-purple/10">
                       <span>Zone 0{index + 1}</span>
                     </div>
                     {/* Live Status Badge */}
                     <div className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-2 ${getStatusColor(zone.status)}`}>
                        <span className={`w-2 h-2 rounded-full ${zone.status === 'Available' ? 'bg-green-500 animate-pulse' : zone.status === 'Busy' || zone.status === 'At Capacity' ? 'bg-red-500' : 'bg-slate-500'}`}></span>
                        {zone.status}
                     </div>
                  </div>

                  <h3 className="text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
                    {zone.title}
                  </h3>
                  <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                    {zone.description}
                  </p>
                  
                  <div className="mb-8 p-6 bg-yellow-50 rounded-xl border border-yellow-100">
                    <h4 className="text-sm font-bold text-yellow-800 uppercase tracking-wide mb-2">Ideal Usage</h4>
                    <p className="text-slate-700 italic">"{zone.usage}"</p>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 mb-4 flex items-center text-sm uppercase tracking-wide">
                      Key Features & Resources
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                      {zone.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-slate-700 bg-white p-3 rounded-lg border border-slate-200 shadow-sm hover:border-bcc-purple/30 transition-colors">
                          <svg
                            className="w-5 h-5 text-bcc-gold mr-3 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                          </svg>
                          <span className="text-sm font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Specific Action Buttons per Zone */}
                    {zone.id === 'subjects' && (
                       <Link to="/tutoring" className="inline-flex items-center px-6 py-3 bg-bcc-purple text-white font-bold rounded-xl hover:bg-bcc-dark transition-colors shadow-lg">
                         Find a Tutor
                         <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                         </svg>
                       </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-bcc-purple text-white text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-bcc-gold opacity-10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
        
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
          <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
            Students and staff can book these spaces instantly through our digital portal.
          </p>
          <Link to="/booking" className="inline-block px-10 py-4 bg-bcc-gold text-bcc-purple font-bold text-lg rounded-xl hover:bg-white hover:text-bcc-purple transition-all shadow-xl transform hover:-translate-y-1">
            Book a Space
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ZonesSection;