import React, { useState } from 'react';
import { SHOWCASE_PROJECTS } from '../constants';
import { ShowcaseProject } from '../types';
import { IconCpu, IconLightbulb } from './Icons';
import { explainProjectTech } from '../services/geminiService';

const CATEGORIES = ['All', 'Robotics', 'Digital Media', 'Coding', '3D Design', 'Art'];

const ShowcaseSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<ShowcaseProject | null>(null);
  
  // AI State
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);

  const filteredProjects = activeCategory === 'All'
    ? SHOWCASE_PROJECTS
    : SHOWCASE_PROJECTS.filter(p => p.category === activeCategory);

  const handleOpenProject = (project: ShowcaseProject) => {
    setSelectedProject(project);
    setAiExplanation(null); // Reset AI state when opening new project
  };

  const handleExplainTech = async () => {
    if (!selectedProject) return;
    setIsLoadingAi(true);
    const explanation = await explainProjectTech(selectedProject);
    setAiExplanation(explanation);
    setIsLoadingAi(false);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Hero Header */}
      <div className="bg-bcc-dark pt-24 pb-20 text-white text-center px-4 relative overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
             <div className="absolute top-10 left-10 w-32 h-32 border-4 border-bcc-gold rounded-full opacity-20 animate-spin-slow"></div>
             <div className="absolute bottom-10 right-10 w-64 h-64 bg-bcc-purple opacity-30 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
            <span className="inline-block py-1 px-3 rounded-full bg-bcc-purple border border-bcc-light/20 text-bcc-gold text-xs font-bold tracking-wider uppercase mb-4 shadow-lg">
              Student Innovation Gallery
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight drop-shadow-md">
              Made in the <span className="text-transparent bg-clip-text bg-gradient-to-r from-bcc-gold to-yellow-200">Commons</span>
            </h1>
            <p className="text-xl text-indigo-100 max-w-2xl mx-auto font-light leading-relaxed">
              Explore the incredible projects created by BCC students using our makerspace, studios, and collaborative zones.
            </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        
        {/* Filters */}
        <div className="bg-white p-2 rounded-xl shadow-lg border border-slate-200 mb-12 flex overflow-x-auto scrollbar-hide">
            <div className="flex space-x-2 mx-auto">
                {CATEGORIES.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-6 py-3 rounded-lg text-sm font-bold whitespace-nowrap transition-all duration-300 ${
                            activeCategory === cat
                                ? 'bg-bcc-purple text-white shadow-md'
                                : 'text-slate-600 hover:bg-slate-100'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
                <div 
                    key={project.id}
                    onClick={() => handleOpenProject(project)}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer border border-slate-200"
                >
                    <div className="relative h-64 overflow-hidden">
                        <img 
                            src={project.image} 
                            alt={project.title} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                        <div className="absolute top-4 left-4">
                            <span className="bg-white/90 backdrop-blur text-bcc-purple text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                {project.category}
                            </span>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                             <h3 className="text-xl font-bold leading-tight mb-1">{project.title}</h3>
                             <p className="text-sm text-indigo-200 font-medium">by {project.studentName}</p>
                        </div>
                    </div>
                    <div className="p-6">
                        <p className="text-slate-600 text-sm line-clamp-3 mb-4 leading-relaxed">
                            {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {project.toolsUsed.slice(0, 3).map(tool => (
                                <span key={tool} className="text-xs font-semibold bg-slate-100 text-slate-500 px-2 py-1 rounded border border-slate-200">
                                    {tool}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm" onClick={() => setSelectedProject(null)}>
           <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col md:flex-row animate-fade-in-up" onClick={e => e.stopPropagation()}>
               {/* Image Side */}
               <div className="w-full md:w-1/2 relative h-64 md:h-auto">
                   <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
                   <div className="absolute top-4 left-4">
                        <button onClick={() => setSelectedProject(null)} className="md:hidden bg-black/50 text-white p-2 rounded-full">
                           <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                   </div>
               </div>

               {/* Content Side */}
               <div className="w-full md:w-1/2 p-8 md:p-10 relative bg-white">
                   <button onClick={() => setSelectedProject(null)} className="hidden md:block absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors">
                       <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                   </button>

                   <div className="mb-6">
                       <span className="text-bcc-purple font-bold text-sm tracking-wider uppercase mb-2 block">{selectedProject.category}</span>
                       <h2 className="text-3xl font-extrabold text-slate-900 leading-tight mb-2">{selectedProject.title}</h2>
                       <div className="flex items-center text-slate-500 font-medium text-sm">
                           <span className="mr-4">By <span className="text-slate-900">{selectedProject.studentName}</span> ({selectedProject.grade})</span>
                           <span className="w-1 h-1 bg-slate-300 rounded-full mr-4"></span>
                           <span>{selectedProject.date}</span>
                       </div>
                   </div>

                   <div className="prose prose-slate mb-8">
                       <p className="text-slate-600 leading-relaxed text-lg">
                           {selectedProject.description}
                       </p>
                       <p className="text-slate-600 mt-4">
                           This project showcases the capabilities of our {selectedProject.category === 'Robotics' ? 'Innovation Center' : 'Learning Commons'} resources. The students utilized various tools to bring their vision to life.
                       </p>
                   </div>

                   <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 mb-6">
                       <h4 className="font-bold text-slate-900 mb-3 flex items-center">
                           <IconCpu className="w-5 h-5 mr-2 text-bcc-gold" />
                           Tools & Technologies
                       </h4>
                       <div className="flex flex-wrap gap-2 mb-4">
                           {selectedProject.toolsUsed.map(tool => (
                               <span key={tool} className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 shadow-sm">
                                   {tool}
                               </span>
                           ))}
                       </div>
                       
                       {/* AI Tech Explanation Button */}
                       {!aiExplanation ? (
                          <button 
                            onClick={handleExplainTech}
                            disabled={isLoadingAi}
                            className={`w-full py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                                isLoadingAi ? 'bg-slate-200 text-slate-500' : 'bg-gradient-to-r from-bcc-purple to-indigo-600 text-white hover:shadow-lg'
                            }`}
                          >
                             {isLoadingAi ? (
                                <>
                                  <div className="w-4 h-4 border-2 border-slate-500 border-t-transparent rounded-full animate-spin"></div>
                                  Analyzing...
                                </>
                             ) : (
                                <>
                                  <span className="text-lg">✨</span> Explain how this works (AI)
                                </>
                             )}
                          </button>
                       ) : (
                          <div className="bg-white p-4 rounded-lg border border-indigo-100 shadow-sm animate-fade-in-up">
                             <p className="text-xs font-bold text-bcc-purple uppercase tracking-wide mb-1 flex items-center gap-1">
                                <span className="text-lg">✨</span> AI Explanation
                             </p>
                             <p className="text-slate-700 text-sm leading-relaxed">{aiExplanation}</p>
                          </div>
                       )}
                   </div>

                   <div className="mt-8 flex gap-4">
                        <button className="flex-1 py-3 bg-bcc-purple text-white font-bold rounded-xl hover:bg-bcc-dark transition-colors shadow-lg flex items-center justify-center">
                            <IconLightbulb className="w-5 h-5 mr-2" />
                            Inspired? Book a Studio
                        </button>
                   </div>
               </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default ShowcaseSection;
