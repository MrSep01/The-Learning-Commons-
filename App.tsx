
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import AboutSection from './components/AboutSection';
import ZonesSection from './components/ZonesSection';
import EventsSection from './components/EventsSection';
import VirtualCommons from './components/VirtualCommons';
import ImpactSection from './components/ImpactSection';
import MetricsSection from './components/MetricsSection';
import BookingSection from './components/BookingSection';
import TutoringSection from './components/TutoringSection';
import ShowcaseSection from './components/ShowcaseSection';
import { LanguageProvider } from './contexts/LanguageContext';

// Component to handle scrolling to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutSection />} />
            <Route path="/zones" element={<ZonesSection />} />
            <Route path="/events" element={<EventsSection />} />
            <Route path="/booking" element={<BookingSection />} />
            <Route path="/tutoring" element={<TutoringSection />} />
            <Route path="/showcase" element={<ShowcaseSection />} />
            <Route path="/virtual" element={<VirtualCommons />} />
            <Route path="/impact" element={
              <div className="flex flex-col">
                <ImpactSection />
                <MetricsSection />
              </div>
            } />
          </Route>
        </Routes>
      </Router>
    </LanguageProvider>
  );
};

export default App;
