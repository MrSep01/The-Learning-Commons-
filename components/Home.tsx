
import React from 'react';
import Hero from './Hero';
import LiveDashboard from './LiveDashboard';
import { Link } from 'react-router-dom';
import { IconCpu, IconUsers, IconBookOpen, IconLightbulb, IconPresentation } from './Icons';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col">
      <Hero />
      
      {/* Live Status Section - Added Here */}
      <LiveDashboard />

      {/* Quick Access Grid - Floating overlap logic removed for cleaner flow with Dashboard */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/booking" className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-b-4 border-bcc-purple group flex flex-col items-center text-center border border-slate-100">
              <div className="w-12 h-12 bg-bcc-light rounded-full flex items-center justify-center text-bcc-purple mb-3 group-hover:bg-bcc-purple group-hover:text-white transition-colors">
                <IconLightbulb className="w-6 h-6" />
              </div>
              <span className="font-bold text-slate-800">Book a Room</span>
            </Link>
            <Link to="/events" className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-b-4 border-bcc-gold group flex flex-col items-center text-center border border-slate-100">
               <div className="w-12 h-12 bg-yellow-50 rounded-full flex items-center justify-center text-bcc-gold mb-3 group-hover:bg-bcc-gold group-hover:text-bcc-purple transition-colors">
                <IconUsers className="w-6 h-6" />
              </div>
              <span className="font-bold text-slate-800">Find Events</span>
            </Link>
            <Link to="/zones" className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-b-4 border-bcc-purple group flex flex-col items-center text-center border border-slate-100">
               <div className="w-12 h-12 bg-bcc-light rounded-full flex items-center justify-center text-bcc-purple mb-3 group-hover:bg-bcc-purple group-hover:text-white transition-colors">
                <IconCpu className="w-6 h-6" />
              </div>
              <span className="font-bold text-slate-800">Use Makerspace</span>
            </Link>
             <button onClick={() => (document.querySelector('button[aria-label="Toggle Virtual Librarian"]') as HTMLElement)?.click()} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-b-4 border-bcc-gold group flex flex-col items-center text-center border border-slate-100">
               <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 mb-3 group-hover:bg-slate-800 group-hover:text-white transition-colors">
                <IconBookOpen className="w-6 h-6" />
              </div>
              <span className="font-bold text-slate-800">Ask Librarian</span>
            </button>
          </div>
        </div>
      </div>

      {/* User Persona Pathways */}
      <div className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-bcc-purple">Who is the Commons for?</h2>
            <p className="text-slate-600 mt-3">Tailored resources for every member of our community.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Student Card */}
            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-6">
                <span className="bg-bcc-purple/10 text-bcc-purple p-3 rounded-lg mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                </span>
                <h3 className="text-xl font-bold text-slate-900">Students</h3>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start text-slate-600 text-sm">
                  <span className="text-green-500 mr-2">✓</span> Reserve study rooms
                </li>
                 <li className="flex items-start text-slate-600 text-sm">
                  <span className="text-green-500 mr-2">✓</span> Access 3D printers & Tech
                </li>
                 <li className="flex items-start text-slate-600 text-sm">
                  <span className="text-green-500 mr-2">✓</span> Get portfolio help
                </li>
              </ul>
              <Link to="/booking" className="block w-full py-2 px-4 bg-slate-50 text-bcc-purple font-bold text-center rounded-lg hover:bg-bcc-purple hover:text-white transition-colors border border-bcc-purple/20">
                Book a Space
              </Link>
            </div>

             {/* Teacher Card */}
            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-6">
                <span className="bg-bcc-gold/20 text-yellow-700 p-3 rounded-lg mr-4">
                  <IconPresentation className="w-6 h-6" />
                </span>
                <h3 className="text-xl font-bold text-slate-900">Teachers</h3>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start text-slate-600 text-sm">
                  <span className="text-green-500 mr-2">✓</span> Book co-teaching spaces
                </li>
                 <li className="flex items-start text-slate-600 text-sm">
                  <span className="text-green-500 mr-2">✓</span> Professional Development
                </li>
                 <li className="flex items-start text-slate-600 text-sm">
                  <span className="text-green-500 mr-2">✓</span> Curriculum resources
                </li>
              </ul>
              <Link to="/booking" className="block w-full py-2 px-4 bg-slate-50 text-bcc-purple font-bold text-center rounded-lg hover:bg-bcc-purple hover:text-white transition-colors border border-bcc-purple/20">
                Book for Class
              </Link>
            </div>

             {/* Parent Card */}
            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-6">
                <span className="bg-blue-50 text-blue-600 p-3 rounded-lg mr-4">
                  <IconUsers className="w-6 h-6" />
                </span>
                <h3 className="text-xl font-bold text-slate-900">Parents</h3>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start text-slate-600 text-sm">
                  <span className="text-green-500 mr-2">✓</span> Attend workshops
                </li>
                 <li className="flex items-start text-slate-600 text-sm">
                  <span className="text-green-500 mr-2">✓</span> Family STEM nights
                </li>
                 <li className="flex items-start text-slate-600 text-sm">
                  <span className="text-green-500 mr-2">✓</span> Volunteer opportunities
                </li>
              </ul>
              <Link to="/events" className="block w-full py-2 px-4 bg-slate-50 text-bcc-purple font-bold text-center rounded-lg hover:bg-bcc-purple hover:text-white transition-colors border border-bcc-purple/20">
                Community Calendar
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Section: The Innovation Lab */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex flex-col md:flex-row items-center gap-12">
             <div className="md:w-1/2">
               <div className="inline-block px-3 py-1 bg-bcc-light text-bcc-purple text-xs font-bold rounded-full mb-4">FEATURED ZONE</div>
               <h2 className="text-4xl font-bold text-slate-900 mb-6">The Innovation Center</h2>
               <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                 More than just a classroom, our Innovation Center is a playground for the mind. equipped with 3D printers, VR headsets, and robotics kits, it's where ideas come to life.
               </p>
               <div className="flex gap-4">
                 <Link to="/zones" className="px-6 py-3 bg-bcc-gold text-bcc-purple font-bold rounded-lg hover:bg-yellow-400 transition-colors">
                   Take a Tour
                 </Link>
                 <Link to="/events" className="px-6 py-3 border-2 border-slate-200 text-slate-700 font-bold rounded-lg hover:border-bcc-purple hover:text-bcc-purple transition-colors">
                   Upcoming Workshops
                 </Link>
               </div>
             </div>
             <div className="md:w-1/2 relative">
               <div className="absolute -inset-4 bg-bcc-gold/20 rounded-2xl transform rotate-3"></div>
               <img 
                 src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop" 
                 alt="Innovation Center" 
                 className="relative rounded-2xl shadow-xl w-full object-cover"
               />
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
