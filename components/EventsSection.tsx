import React from 'react';
import { UPCOMING_EVENTS } from '../constants';

const EventsSection: React.FC = () => {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-bcc-purple sm:text-4xl">Upcoming Events</h2>
          <div className="w-20 h-1 bg-bcc-gold mx-auto mt-4 rounded-full"></div>
          <p className="mt-6 text-xl text-slate-600 max-w-2xl mx-auto">
            Engage, learn, and connect. Join us for workshops, community nights, and collaborative sessions.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
           {UPCOMING_EVENTS.map((event) => {
             const [month, dayWithComma] = event.date.split(' ');
             const day = dayWithComma.replace(',', '');

             return (
               <div key={event.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-all hover:border-bcc-gold flex flex-col group">
                  <div className="flex flex-col sm:flex-row gap-6 items-start">
                    <div className="flex-shrink-0 bg-bcc-purple rounded-lg p-4 text-center min-w-[100px] w-full sm:w-auto shadow-md self-start">
                        <span className="block text-bcc-gold font-bold text-lg uppercase tracking-wider">{month}</span>
                        <span className="block text-white font-bold text-3xl">{day}</span>
                    </div>
                    
                    <div className="flex-grow w-full">
                        <div className="flex justify-between items-start">
                          <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-bcc-purple transition-colors">{event.title}</h3>
                          <span className="hidden sm:inline-flex px-2 py-1 text-xs font-semibold text-bcc-purple bg-bcc-light rounded-md border border-bcc-purple/20">
                            {event.location}
                          </span>
                        </div>
                        
                        <p className="text-slate-600 mb-4">{event.description}</p>
                        
                        <div className="flex flex-wrap gap-4 text-sm text-slate-500 font-medium mb-4">
                            <span className="flex items-center">
                                <svg className="w-4 h-4 mr-1.5 text-bcc-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                {event.time}
                            </span>
                            <span className="flex items-center sm:hidden">
                               <svg className="w-4 h-4 mr-1.5 text-bcc-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                               {event.location}
                            </span>
                        </div>
                    </div>
                  </div>

                  {/* Detailed Info Section */}
                  <div className="mt-6 pt-4 border-t border-slate-100 bg-slate-50/50 -mx-6 -mb-6 p-6 rounded-b-xl">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-sm">
                      <div>
                        <span className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">Target Audience</span>
                        <span className="font-medium text-slate-700">{event.targetAudience}</span>
                      </div>
                      <div>
                         <span className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">Registration</span>
                         <span className="font-medium text-slate-700">{event.registrationInfo}</span>
                      </div>
                      <div className="sm:col-span-2 flex justify-between items-center mt-2">
                        <div>
                          <span className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">Contact</span>
                          <span className="font-medium text-slate-700">{event.contactPerson}</span>
                        </div>
                        <button className="px-5 py-2 border-2 border-bcc-purple text-bcc-purple rounded-lg font-bold hover:bg-bcc-purple hover:text-white transition-all duration-300 text-sm whitespace-nowrap">
                          Register Now
                        </button>
                      </div>
                    </div>
                  </div>
               </div>
             );
           })}
        </div>
        
        <div className="mt-12 text-center">
          <button className="inline-flex items-center text-bcc-purple font-bold hover:text-bcc-dark transition-colors border-b-2 border-transparent hover:border-bcc-gold pb-1">
            View Full Calendar 
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
          </button>
        </div>
      </div>
    </div>
  );
};
export default EventsSection;