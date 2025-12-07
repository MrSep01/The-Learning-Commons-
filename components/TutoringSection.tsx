
import React, { useState } from 'react';
import { TUTORS_DATA, HELP_CENTERS_DATA, RESOURCE_SHEETS_DATA } from '../constants';
import { Tutor, ResourceSheet } from '../types';
import { IconUsers, IconBookOpen, IconLightbulb, IconCpu } from './Icons';
import { getTutorRecommendation } from '../services/geminiService';

const SUBJECTS = ['All', 'Math', 'Science', 'English', 'History', 'Computer Science'];

const TutoringSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tutors' | 'resources'>('tutors');
  const [activeSubject, setActiveSubject] = useState('All');
  const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedResource, setSelectedResource] = useState<ResourceSheet | null>(null);
  
  // AI State
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [recommendation, setRecommendation] = useState<{ id: string; reasoning: string } | null>(null);

  const filteredTutors = activeSubject === 'All' 
    ? TUTORS_DATA 
    : TUTORS_DATA.filter(t => t.subjects.includes(activeSubject));

  const filteredResources = activeSubject === 'All'
    ? RESOURCE_SHEETS_DATA
    : RESOURCE_SHEETS_DATA.filter(r => r.subject === activeSubject);

  const handleBookTutor = (tutor: Tutor) => {
    setSelectedTutor(tutor);
    setShowBookingModal(true);
  };

  const handleSmartMatch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    setRecommendation(null);
    setActiveSubject('All'); // Reset filters to show all potential matches
    setActiveTab('tutors'); // Switch to tutors tab

    const result = await getTutorRecommendation(searchQuery, TUTORS_DATA);
    
    if (result) {
      setRecommendation({ id: result.recommendedTutorId, reasoning: result.reasoning });
      // Scroll to the recommended tutor
      const element = document.getElementById(`tutor-${result.recommendedTutorId}`);
      if (element) {
        setTimeout(() => element.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100);
      }
    }
    setIsSearching(false);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Hero Header */}
      <div className="bg-bcc-purple pt-24 pb-16 text-white text-center px-4 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-96 h-96 bg-bcc-gold opacity-10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
         <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
         
         <div className="relative z-10 max-w-4xl mx-auto">
            <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-bcc-gold text-xs font-bold tracking-wider uppercase mb-4">
              Academic Support
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
              Subject Specialist Zones
            </h1>
            <p className="text-xl text-indigo-100 max-w-2xl mx-auto font-light leading-relaxed">
              Connect with expert teachers, peer tutors, or access our "Wall of Resources" for self-guided learning.
            </p>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        
        {/* Live Status Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {HELP_CENTERS_DATA.map(center => (
            <div key={center.id} className="bg-white rounded-xl shadow-lg border-b-4 border-slate-200 p-6 flex flex-col items-start hover:transform hover:-translate-y-1 transition-all duration-300">
              <div className="flex justify-between w-full mb-2">
                 <h3 className="font-bold text-slate-900">{center.name}</h3>
                 <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wide ${
                   center.status === 'Open' ? 'bg-green-100 text-green-700' :
                   center.status === 'Busy' ? 'bg-yellow-100 text-yellow-700' :
                   'bg-red-100 text-red-700'
                 }`}>
                   {center.status}
                 </span>
              </div>
              <p className="text-xs text-slate-500 mb-4">{center.location}</p>
              
              <div className="mt-auto w-full">
                 {center.status === 'Closed' ? (
                   <p className="text-sm text-slate-500 italic">Next open: {center.nextOpenTime}</p>
                 ) : (
                   <div>
                     <p className="text-xs font-bold text-slate-400 uppercase mb-1">Current Staff</p>
                     <div className="flex -space-x-2 overflow-hidden">
                       {center.currentStaff.map((staff, i) => (
                         <div key={i} className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-bcc-light flex items-center justify-center text-xs font-bold text-bcc-purple" title={staff}>
                           {staff.charAt(0)}
                         </div>
                       ))}
                       {center.currentStaff.length === 0 && <span className="text-sm text-slate-500">Self-study only</span>}
                     </div>
                   </div>
                 )}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Tabs (Tutors vs Resources) */}
        <div className="flex justify-center mb-8">
            <div className="bg-white p-1 rounded-xl shadow-sm border border-slate-200 inline-flex">
                <button 
                   onClick={() => setActiveTab('tutors')}
                   className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                      activeTab === 'tutors' 
                        ? 'bg-bcc-purple text-white shadow-md' 
                        : 'text-slate-600 hover:bg-slate-50'
                   }`}
                >
                   Find a Tutor
                </button>
                <button 
                   onClick={() => setActiveTab('resources')}
                   className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                      activeTab === 'resources' 
                        ? 'bg-bcc-purple text-white shadow-md' 
                        : 'text-slate-600 hover:bg-slate-50'
                   }`}
                >
                   Wall of Resources
                </button>
            </div>
        </div>

        {activeTab === 'tutors' && (
        <>
            {/* AI Tutor Finder */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-8 relative overflow-hidden animate-fade-in">
            <div className="absolute top-0 left-0 w-1 h-full bg-bcc-gold"></div>
            <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="w-full md:w-1/3">
                    <div className="flex items-center gap-2 mb-2">
                    <IconCpu className="text-bcc-purple w-5 h-5" />
                    <h3 className="font-bold text-bcc-purple uppercase tracking-wider text-sm">AI Smart Match</h3>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Not sure who to pick?</h2>
                    <p className="text-slate-600 text-sm">Describe what you're struggling with, and our AI will recommend the best expert for you.</p>
                </div>
                
                <div className="w-full md:w-2/3 flex flex-col gap-3">
                    <div className="relative">
                    <input 
                        type="text" 
                        placeholder='e.g., "I don&#39;t understand Calculus derivatives" or "Need help with a History essay thesis"' 
                        className="w-full pl-4 pr-14 py-4 rounded-xl border border-slate-300 focus:ring-2 focus:ring-bcc-purple focus:border-transparent outline-none shadow-sm"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSmartMatch()}
                    />
                    <button 
                        onClick={handleSmartMatch}
                        disabled={isSearching || !searchQuery}
                        className={`absolute right-2 top-2 bottom-2 px-4 rounded-lg font-bold text-white transition-all ${
                            isSearching ? 'bg-slate-300 cursor-wait' : 'bg-bcc-purple hover:bg-bcc-dark shadow-md'
                        }`}
                    >
                        {isSearching ? '...' : 'Find'}
                    </button>
                    </div>
                    {recommendation && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-start gap-3 animate-fade-in-up">
                        <div className="bg-green-100 p-1.5 rounded-full mt-0.5">
                            <IconLightbulb className="w-4 h-4 text-green-700" />
                        </div>
                        <div>
                            <p className="text-sm text-green-800 font-bold">Recommended Match</p>
                            <p className="text-sm text-green-700">{recommendation.reasoning}</p>
                        </div>
                    </div>
                    )}
                </div>
            </div>
            </div>

            {/* Tutor Directory */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                <h2 className="text-2xl font-bold text-slate-900">Available Tutors</h2>
                <p className="text-slate-500">Book a private session with a teacher or peer expert.</p>
                </div>
                
                {/* Subject Filters */}
                <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2 scrollbar-hide">
                {SUBJECTS.map(subject => (
                    <button
                    key={subject}
                    onClick={() => { setActiveSubject(subject); setRecommendation(null); }}
                    className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-colors ${
                        activeSubject === subject
                        ? 'bg-bcc-purple text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                    >
                    {subject}
                    </button>
                ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredTutors.map(tutor => {
                const isRecommended = recommendation?.id === tutor.id;
                return (
                    <div 
                        key={tutor.id} 
                        id={`tutor-${tutor.id}`}
                        className={`border rounded-xl p-5 transition-all relative ${
                        isRecommended 
                            ? 'border-bcc-gold ring-2 ring-bcc-gold shadow-xl bg-yellow-50/30 scale-[1.02] z-10' 
                            : 'border-slate-200 hover:border-bcc-gold hover:shadow-md'
                        }`}
                    >
                        {isRecommended && (
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-bcc-gold text-bcc-purple text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm border border-white">
                            Best Match
                        </span>
                        )}
                        <div className="flex items-center gap-4 mb-4">
                        <img src={tutor.image} alt={tutor.name} className="w-16 h-16 rounded-full object-cover shadow-sm" />
                        <div>
                            <h3 className="font-bold text-slate-900 leading-tight">{tutor.name}</h3>
                            <span className={`text-xs px-2 py-0.5 rounded-full inline-block mt-1 ${
                            tutor.role === 'Teacher' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                            }`}>
                            {tutor.role}
                            </span>
                        </div>
                        </div>
                        
                        <div className="mb-4">
                        <div className="flex flex-wrap gap-1 mb-2">
                            {tutor.subjects.map(s => (
                            <span key={s} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">{s}</span>
                            ))}
                        </div>
                        <p className="text-sm text-slate-500 line-clamp-2">{tutor.bio}</p>
                        </div>

                        <div className="mt-4 pt-4 border-t border-slate-100">
                        <p className="text-xs font-bold text-slate-400 uppercase mb-2">Available Slots</p>
                        <div className="space-y-2 mb-4">
                            {tutor.availableSlots.slice(0, 2).map(slot => (
                            <div key={slot} className="text-sm text-slate-700 flex items-center">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                                {slot}
                            </div>
                            ))}
                        </div>
                        <button 
                            onClick={() => handleBookTutor(tutor)}
                            className={`w-full py-2 border font-bold rounded-lg transition-colors text-sm ${
                            isRecommended 
                                ? 'bg-bcc-gold text-bcc-purple border-bcc-gold hover:bg-yellow-400'
                                : 'bg-white border-bcc-purple text-bcc-purple hover:bg-bcc-purple hover:text-white'
                            }`}
                        >
                            Book Session
                        </button>
                        </div>
                    </div>
                );
                })}
            </div>
            </div>
        </>
        )}

        {/* RESOURCE WALL SECTION */}
        {activeTab === 'resources' && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 animate-fade-in">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">Wall of Resources</h2>
                        <p className="text-slate-500">Grab a quick guide, worksheet, or cheat sheet to help you study independently.</p>
                    </div>
                    
                    {/* Subject Filters */}
                    <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2 scrollbar-hide">
                    {SUBJECTS.map(subject => (
                        <button
                        key={subject}
                        onClick={() => setActiveSubject(subject)}
                        className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-colors ${
                            activeSubject === subject
                            ? 'bg-bcc-purple text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                        >
                        {subject}
                        </button>
                    ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredResources.map(resource => (
                        <div 
                           key={resource.id} 
                           onClick={() => setSelectedResource(resource)}
                           className="group cursor-pointer bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                        >
                            {/* "Paper" Look Header */}
                            <div className="h-32 bg-slate-100 relative overflow-hidden">
                                {resource.previewImage && (
                                    <img src={resource.previewImage} alt={resource.title} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" />
                                )}
                                <div className="absolute top-0 right-0 p-2">
                                     <div className="bg-white/90 backdrop-blur text-[10px] font-bold px-2 py-1 rounded text-slate-600 uppercase tracking-wide border border-slate-200">
                                         {resource.difficulty}
                                     </div>
                                </div>
                            </div>

                            <div className="p-5">
                                <div className="flex justify-between items-start mb-2">
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide ${
                                        resource.type === 'Cheatsheet' ? 'bg-orange-100 text-orange-600' :
                                        resource.type === 'Template' ? 'bg-blue-100 text-blue-600' :
                                        'bg-purple-100 text-purple-600'
                                    }`}>
                                        {resource.type}
                                    </span>
                                </div>
                                <h3 className="font-bold text-slate-900 leading-tight mb-2 group-hover:text-bcc-purple transition-colors">{resource.title}</h3>
                                <p className="text-xs text-slate-500 line-clamp-2 mb-4">{resource.description}</p>
                                
                                <button className="w-full py-2 bg-slate-50 text-bcc-purple text-sm font-bold rounded-lg border border-bcc-purple/20 group-hover:bg-bcc-purple group-hover:text-white transition-colors flex items-center justify-center gap-2">
                                    <IconBookOpen className="w-4 h-4" />
                                    View Resource
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

      </div>

      {/* Booking Modal */}
      {showBookingModal && selectedTutor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
           <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl animate-fade-in-up">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold text-slate-900">Book Tutoring Session</h3>
                <button onClick={() => setShowBookingModal(false)} className="text-slate-400 hover:text-slate-600">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              <div className="flex items-center gap-4 mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <img src={selectedTutor.image} alt={selectedTutor.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                   <p className="font-bold text-slate-900">{selectedTutor.name}</p>
                   <p className="text-sm text-slate-500">{selectedTutor.role} • {selectedTutor.subjects.join(', ')}</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                 <label className="block">
                   <span className="text-sm font-bold text-slate-700">Select a Time</span>
                   <select className="mt-1 block w-full rounded-lg border-slate-300 border p-3 bg-white focus:ring-2 focus:ring-bcc-purple focus:outline-none">
                      {selectedTutor.availableSlots.map(slot => (
                        <option key={slot}>{slot}</option>
                      ))}
                   </select>
                 </label>
                 
                 <label className="block">
                   <span className="text-sm font-bold text-slate-700">Topic / What do you need help with?</span>
                   <textarea className="mt-1 block w-full rounded-lg border-slate-300 border p-3 focus:ring-2 focus:ring-bcc-purple focus:outline-none h-24" placeholder="e.g. Calculus derivatives, History essay review..."></textarea>
                 </label>
              </div>

              <div className="flex gap-4">
                <button onClick={() => setShowBookingModal(false)} className="flex-1 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200">
                  Cancel
                </button>
                <button onClick={() => setShowBookingModal(false)} className="flex-1 py-3 bg-bcc-gold text-bcc-purple font-bold rounded-xl hover:bg-yellow-400 shadow-lg">
                  Confirm Booking
                </button>
              </div>
           </div>
        </div>
      )}

      {/* Resource Sheet Preview Modal */}
      {selectedResource && (
         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm" onClick={() => setSelectedResource(null)}>
            <div className="bg-white rounded-2xl max-w-2xl w-full p-8 shadow-2xl animate-fade-in-up relative" onClick={e => e.stopPropagation()}>
               <button onClick={() => setSelectedResource(null)} className="absolute top-4 right-4 bg-slate-100 p-2 rounded-full hover:bg-slate-200 text-slate-500">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
               </button>

               <div className="flex gap-6 flex-col sm:flex-row">
                  <div className="w-full sm:w-1/3 bg-slate-100 rounded-lg h-48 sm:h-auto overflow-hidden border border-slate-200 shadow-inner">
                      {selectedResource.previewImage ? (
                          <img src={selectedResource.previewImage} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-400">No Preview</div>
                      )}
                  </div>
                  <div className="w-full sm:w-2/3">
                      <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-bold text-bcc-purple bg-bcc-light px-2 py-1 rounded uppercase tracking-wide">{selectedResource.subject}</span>
                          <span className="text-xs font-bold text-slate-500 border border-slate-200 px-2 py-1 rounded uppercase tracking-wide">{selectedResource.type}</span>
                      </div>
                      <h2 className="text-2xl font-bold text-slate-900 mb-4">{selectedResource.title}</h2>
                      <p className="text-slate-600 mb-6 leading-relaxed">{selectedResource.description}</p>
                      
                      <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg mb-6">
                          <h4 className="text-sm font-bold text-blue-800 mb-1">Why use this?</h4>
                          <p className="text-xs text-blue-700">Perfect for {selectedResource.difficulty.toLowerCase()} level students looking to review core concepts quickly.</p>
                      </div>

                      <div className="flex gap-3">
                          <button onClick={() => alert("Downloading PDF...")} className="flex-1 py-3 bg-bcc-purple text-white font-bold rounded-xl hover:bg-bcc-dark shadow-lg transition-transform hover:-translate-y-1 flex items-center justify-center gap-2">
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                              Download PDF
                          </button>
                           <button onClick={() => setSelectedResource(null)} className="px-6 py-3 border border-slate-200 font-bold text-slate-600 rounded-xl hover:bg-slate-50">
                              Close
                          </button>
                      </div>
                  </div>
               </div>
            </div>
         </div>
      )}
    </div>
  );
};

export default TutoringSection;
