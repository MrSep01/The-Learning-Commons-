
import React, { useState } from 'react';
import { BOOKING_RESOURCES } from '../constants';
import { BookingResource, TimeSlot } from '../types';

const CATEGORIES = [
  { id: 'all', label: 'All Resources' },
  { id: 'room', label: 'Study Rooms' },
  { id: 'studio', label: 'Creative Studios' },
  { id: 'equipment', label: 'Equipment' },
];

const MOCK_TIME_SLOTS: TimeSlot[] = [
  { id: 't1', time: '08:00 AM', available: true },
  { id: 't2', time: '09:00 AM', available: false },
  { id: 't3', time: '10:00 AM', available: true },
  { id: 't4', time: '11:00 AM', available: true },
  { id: 't5', time: '12:00 PM', available: false },
  { id: 't6', time: '01:00 PM', available: true },
  { id: 't7', time: '02:00 PM', available: true },
  { id: 't8', time: '03:00 PM', available: true },
];

const BookingSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedResource, setSelectedResource] = useState<BookingResource | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const filteredResources = activeCategory === 'all' 
    ? BOOKING_RESOURCES 
    : BOOKING_RESOURCES.filter(r => r.category === activeCategory);

  const handleBookClick = (resource: BookingResource) => {
    setSelectedResource(resource);
    setSelectedSlot(null);
    setShowConfirmation(false);
  };

  const handleConfirmBooking = () => {
    // Mock API call simulation
    setShowConfirmation(true);
    // Reset selection after delay (optional, or let user close)
    setTimeout(() => {
        // Just keeping the confirmation state for now
    }, 1000);
  };

  const handleCloseModal = () => {
    setSelectedResource(null);
    setSelectedSlot(null);
    setShowConfirmation(false);
  }

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-bcc-purple sm:text-4xl">Reserve a Space</h2>
          <div className="w-20 h-1 bg-bcc-gold mx-auto mt-4 rounded-full"></div>
          <p className="mt-4 text-xl text-slate-600 max-w-2xl mx-auto">
            Book study rooms, studios, and equipment instantly.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-2 rounded-full font-bold text-sm transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-bcc-purple text-white shadow-lg scale-105'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-bcc-purple hover:text-bcc-purple'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredResources.map(resource => (
            <div key={resource.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={resource.image} 
                  alt={resource.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-bcc-purple uppercase tracking-wider shadow-sm">
                    {resource.category}
                  </span>
                  {/* Status Overlay */}
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm ${
                    resource.status === 'Available' ? 'bg-green-500 text-white' : 
                    resource.status === 'In Use' ? 'bg-yellow-500 text-white' : 'bg-red-500 text-white'
                  }`}>
                    {resource.status}
                  </span>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{resource.name}</h3>
                <div className="flex items-center text-sm text-slate-500 mb-4">
                   <svg className="w-4 h-4 mr-1 text-bcc-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {resource.capacity}
                </div>
                <p className="text-slate-600 text-sm mb-6 line-clamp-2">{resource.description}</p>
                
                {resource.status !== 'Available' && resource.nextAvailable && (
                   <p className="text-xs text-slate-500 mb-2 font-semibold">
                      Next Available: <span className="text-slate-800">{resource.nextAvailable}</span>
                   </p>
                )}

                <div className="mt-auto">
                   <button 
                    onClick={() => handleBookClick(resource)}
                    className="w-full py-3 border-2 border-bcc-purple text-bcc-purple font-bold rounded-lg hover:bg-bcc-purple hover:text-white transition-colors"
                   >
                     {resource.status === 'Available' ? 'Book Now' : 'Check Availability'}
                   </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Overlay for Booking Flow */}
        {selectedResource && (
           <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm overflow-y-auto">
             <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row relative animate-fade-in-up my-8 max-h-[90vh]">
               
               {/* Close Button */}
               <button 
                 onClick={handleCloseModal}
                 className="absolute top-4 right-4 z-10 bg-white/80 p-2 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
               >
                 <svg className="w-6 h-6 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                 </svg>
               </button>

               {/* Left: Resource Details */}
               <div className="w-full md:w-1/3 bg-slate-50 p-8 border-r border-slate-100 overflow-y-auto">
                  <img src={selectedResource.image} alt={selectedResource.name} className="w-full h-48 object-cover rounded-xl shadow-md mb-6" />
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{selectedResource.name}</h3>
                  <div className="flex items-center text-sm text-slate-500 mb-4 font-medium">
                    <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {selectedResource.capacity}
                  </div>
                  <p className="text-slate-600 text-sm mb-6 leading-relaxed">{selectedResource.description}</p>
                  
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-3">Includes</h4>
                  <ul className="space-y-2">
                    {selectedResource.features.map(f => (
                      <li key={f} className="flex items-center text-sm text-slate-700">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
               </div>

               {/* Right: Calendar & Slots */}
               <div className="w-full md:w-2/3 p-8 flex flex-col overflow-y-auto">
                  {showConfirmation ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center animate-pulse-once py-12">
                      <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6">
                        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">Booking Confirmed!</h3>
                      <p className="text-slate-600 mb-8 max-w-md">
                        You have successfully reserved <strong>{selectedResource.name}</strong>. A confirmation email has been sent to your school address.
                      </p>
                      
                      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-sm text-left w-full max-w-xs mb-8">
                        <div className="flex justify-between mb-3 border-b border-slate-200 pb-3">
                          <span className="text-slate-500">Date</span>
                          <span className="font-bold text-slate-900">{selectedDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Time</span>
                          <span className="font-bold text-slate-900">{MOCK_TIME_SLOTS.find(s => s.id === selectedSlot)?.time}</span>
                        </div>
                      </div>

                      <button 
                        onClick={handleCloseModal}
                        className="px-8 py-3 bg-bcc-purple text-white font-bold rounded-lg hover:bg-bcc-dark transition-colors"
                      >
                        Done
                      </button>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-xl font-bold text-slate-900 mb-6">Select a Time</h3>
                      
                      {/* Date Picker (Simplified) */}
                      <div className="mb-8">
                        <label className="block text-sm font-medium text-slate-700 mb-2">Date</label>
                        <input 
                          type="date" 
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-bcc-purple focus:border-transparent outline-none"
                        />
                      </div>

                      {/* Time Slots */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                        {MOCK_TIME_SLOTS.map(slot => (
                          <button
                            key={slot.id}
                            disabled={!slot.available}
                            onClick={() => setSelectedSlot(slot.id)}
                            className={`py-3 px-2 rounded-lg text-sm font-bold border transition-all ${
                              !slot.available 
                                ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed decoration-slate-400 line-through'
                                : selectedSlot === slot.id
                                  ? 'bg-bcc-purple text-white border-bcc-purple shadow-md transform scale-105'
                                  : 'bg-white text-slate-700 border-slate-200 hover:border-bcc-purple hover:text-bcc-purple'
                            }`}
                          >
                            {slot.time}
                          </button>
                        ))}
                      </div>

                      <div className="mt-auto pt-6 border-t border-slate-100 flex justify-end gap-4">
                        <button 
                          onClick={handleCloseModal}
                          className="px-6 py-3 text-slate-500 font-bold hover:text-slate-800 transition-colors"
                        >
                          Cancel
                        </button>
                        <button 
                          onClick={handleConfirmBooking}
                          disabled={!selectedSlot}
                          className={`px-8 py-3 rounded-lg font-bold transition-all shadow-lg ${
                            selectedSlot 
                              ? 'bg-bcc-gold text-bcc-purple hover:bg-yellow-400 hover:-translate-y-1' 
                              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                          }`}
                        >
                          Confirm Booking
                        </button>
                      </div>
                    </>
                  )}
               </div>
             </div>
           </div>
        )}
      </div>
    </div>
  );
};

export default BookingSection;
