import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ChatWidget from './ChatWidget';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white font-sans text-slate-900 relative">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default Layout;