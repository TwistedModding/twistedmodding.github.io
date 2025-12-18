import React, { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';

console.log('App.js loaded');

function App() {
  console.log('App component rendering');
  const [activeSection, setActiveSection] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    console.log('App mounted, checking for hash:', window.location.hash);
    const hash = window.location.hash.substring(1);
    if (hash) {
      setActiveSection(hash);
    }
  }, []);

  useEffect(() => {
    console.log('Active section changed to:', activeSection);
    window.location.hash = activeSection;
  }, [activeSection]);

  const handleSectionChange = (section) => {
    console.log('Section change requested:', section);
    setActiveSection(section);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleMobileMenu = () => {
    console.log('Toggle mobile menu');
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  console.log('Rendering App with activeSection:', activeSection);

  return (
    <div className="app-container">
      <Sidebar 
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuClose={() => setIsMobileMenuOpen(false)}
      />
      <button 
        className="mobile-toggle"
        onClick={toggleMobileMenu}
        aria-expanded={isMobileMenuOpen}
        aria-label="Toggle navigation menu"
      >
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </button>
      <MainContent activeSection={activeSection} onSectionChange={handleSectionChange} />
    </div>
  );
}

export default App;
