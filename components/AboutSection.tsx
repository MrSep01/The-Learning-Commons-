
import React, { useState } from 'react';
import { TEAM_MEMBERS } from '../constants';
import { IconLightbulb, IconUsers } from './Icons';

type ModalContentType = {
  title: string;
  body: string;
  action: string;
};

const CONTENT_MAP: Record<string, ModalContentType> = {
  volunteer: {
    title: "Volunteer with Us",
    body: "Join our vibrant community of parent and alumni volunteers! We have opportunities ranging from shelving books and organizing resources to mentoring students in the Innovation Lab. Shifts are flexible and we welcome all skill levels.",
    action: "Sign Up to Volunteer"
  },
  student: {
    title: "Student Leadership",
    body: "Become a Learning Commons Ambassador! Student leaders play a crucial role in managing the space, running peer-tutoring sessions, and organizing community events. It's a fantastic way to build your resume and earn service hours.",
    action: "Apply for Leadership"
  },
  partner: {
    title: "Partner with Us",
    body: "We are looking for local businesses, universities, and organizations to partner with. Whether it's through equipment donations, guest lectures, or mentorship programs, your expertise can help shape the future of our students.",
    action: "Contact Partnership Director"
  }
};

const AboutSection: React.FC = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const handleOpen = (type: string) => setActiveModal(type);
  const handleClose = () => setActiveModal(null);

  const currentContent = activeModal ? CONTENT_MAP[activeModal] : null;

  return (
    <div className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-bcc-purple sm:text-4xl">About The Commons</h2>
          <div className="w-20 h-1 bg-bcc-gold mx-auto mt-4 rounded-full"></div>
          <p className="mt-6 text-xl text-slate-600 max-w-3xl mx-auto">
            Reimagining the heart of our school as a vibrant, inclusive space for the future of learning.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="bg-bcc-light p-8 rounded-2xl border-l-8 border-bcc-purple shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-white p-3 rounded-full shadow-sm text-bcc-purple mr-4">
                <IconLightbulb className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-bcc-purple">Our Mission</h3>
            </div>
            <p className="text-slate-700 leading-relaxed text-lg">
              To create a connected, innovative learning community. We strive to provide a tech-rich but accessible environment that fosters 21st-century skills—critical thinking, communication, creativity, and collaboration—while nurturing a lifelong love of learning in students, staff, and families.
            </p>
          </div>
          <div className="bg-bcc-light p-8 rounded-2xl border-l-8 border-bcc-gold shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
               <div className="bg-white p-3 rounded-full shadow-sm text-bcc-gold mr-4">
                <IconUsers className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-bcc-purple">Our Vision</h3>
            </div>
            <p className="text-slate-700 leading-relaxed text-lg">
              To transform the traditional library into a dynamic "Learning Commons"—a central hub where physical and virtual spaces converge. We envision a participatory community where every stakeholder is an active learner, contributor, and innovator.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <div className="border-2 border-blue-400/30 rounded-lg p-8 md:p-12 relative bg-white shadow-sm">
            <h3 className="text-2xl font-bold text-bcc-purple mb-10 text-center">Meet the Team</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {TEAM_MEMBERS.map((member) => (
                <div key={member.id} className="group relative flex flex-col items-center">
                  <div className="w-48 h-48 overflow-hidden rounded-xl bg-slate-200 mb-4 shadow-md">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="text-center px-2">
                    <h3 className="text-lg font-bold text-bcc-purple">{member.name}</h3>
                    <p className="text-xs font-bold text-bcc-gold uppercase tracking-wider mb-2">{member.role}</p>
                    <p className="text-sm text-slate-500 line-clamp-3">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Work With Us CTA */}
        <div className="bg-bcc-purple rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
             <div className="absolute -top-24 -left-24 w-64 h-64 bg-white opacity-5 rounded-full"></div>
             <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-bcc-gold opacity-10 rounded-full"></div>
          </div>
          
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4">Work With Us</h2>
            <p className="text-indigo-100 max-w-2xl mx-auto mb-8 text-lg">
              The Learning Commons thrives on community involvement. Whether you are a parent expert, a student volunteer, or a community partner, there is a place for you here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => handleOpen('volunteer')}
                className="px-8 py-3 bg-bcc-gold text-bcc-purple font-bold rounded-lg hover:bg-yellow-400 transition-colors shadow-lg"
              >
                Volunteer
              </button>
              <button 
                onClick={() => handleOpen('student')}
                className="px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors"
              >
                Student Leadership
              </button>
               <button 
                onClick={() => handleOpen('partner')}
                className="px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors"
              >
                Partner with Us
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {activeModal && currentContent && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bcc-purple/60 backdrop-blur-sm"
          onClick={handleClose}
        >
          <div 
            className="bg-white rounded-2xl max-w-md w-full p-8 relative shadow-2xl transform transition-all scale-100 opacity-100" 
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-bcc-purple transition-colors bg-slate-100 rounded-full p-1"
            >
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="mb-6 inline-block p-3 rounded-full bg-bcc-light text-bcc-purple">
               {activeModal === 'volunteer' && <IconUsers className="w-8 h-8" />}
               {activeModal === 'student' && <IconLightbulb className="w-8 h-8" />}
               {activeModal === 'partner' && <IconUsers className="w-8 h-8" />}
            </div>

            <h3 className="text-2xl font-bold text-bcc-purple mb-3">{currentContent.title}</h3>
            <p className="text-slate-600 mb-8 leading-relaxed">
              {currentContent.body}
            </p>
            
            <button 
              onClick={handleClose}
              className="w-full py-3 bg-bcc-purple text-white font-bold rounded-xl hover:bg-bcc-dark transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <span>{currentContent.action}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutSection;
