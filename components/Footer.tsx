
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-bcc-dark text-slate-300 py-12 border-t border-bcc-purple mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4">The Learning Commons</h3>
            <p className="text-sm leading-relaxed max-w-xs text-indigo-100 mb-4">
              A physical and virtual collaborative learning hub designed to foster innovation, 
              creativity, and community engagement at Bangkok Christian College.
            </p>
            <div className="flex gap-4">
              <Link to="/about" className="text-bcc-gold hover:text-white text-sm font-semibold transition-colors">
                About Us
              </Link>
              <Link to="/impact" className="text-bcc-gold hover:text-white text-sm font-semibold transition-colors">
                Our Impact
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-bcc-gold text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-indigo-100">
              <li>Library Main Desk: (555) 123-4567</li>
              <li>Tech Support: (555) 123-4568</li>
              <li>Email: commons@school.edu</li>
            </ul>
          </div>
          <div>
            <h3 className="text-bcc-gold text-lg font-bold mb-4">Quick Access</h3>
            <ul className="space-y-2 text-sm text-indigo-100">
              <li><Link to="/booking" className="hover:text-white transition-colors">Book a Room</Link></li>
              <li><Link to="/events" className="hover:text-white transition-colors">Upcoming Events</Link></li>
              <li><Link to="/virtual" className="hover:text-white transition-colors">Virtual Librarian</Link></li>
              <li><Link to="/virtual" className="hover:text-white transition-colors">Report an Issue</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 mt-12 pt-8 text-center text-xs text-indigo-200">
          &copy; {new Date().getFullYear()} Bangkok Christian College Learning Commons Project. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
