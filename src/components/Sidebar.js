import React, { useCallback, useEffect } from 'react';
import Search from './Search';

const Sidebar = ({ activeSection, onSectionChange, isMobileMenuOpen, onMobileMenuClose }) => {
  const menuItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'features', label: 'Features' },
    { id: 'requirements', label: 'Requirements' },
    { id: 'installation', label: 'Installation' },
    { id: 'gameplay', label: 'Gameplay Guide' },
    { id: 'performance', label: 'Performance Guide' },
    { id: 'faq', label: 'FAQ' },
    { id: 'mods', label: 'Mod List' },
    { id: 'screenshots', label: 'Screenshots' },
    { id: 'changelog', label: 'Changelog' },
    { id: 'support', label: 'Support' }
  ];

  const handleClick = (e, sectionId) => {
    e.preventDefault();
    onSectionChange(sectionId);
  };

  const handleOutsideClick = useCallback((e) => {
    if (window.innerWidth <= 768 && !e.target.closest('.sidebar') && !e.target.closest('.mobile-toggle')) {
      onMobileMenuClose();
    }
  }, [onMobileMenuClose]);

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [handleOutsideClick]);

  return (
    <aside className={`sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`} role="navigation" aria-label="Main navigation">
      <header className="sidebar-header">
        <Search onSectionChange={onSectionChange} />
      </header>
      
      <nav className="sidebar-nav">
        <ul className="sidebar-menu" role="menu">
          {menuItems.map(item => (
            <li key={item.id} role="none">
              <a
                href={`#${item.id}`}
                className={`sidebar-link ${activeSection === item.id ? 'active' : ''}`}
                data-section={item.id}
                role="menuitem"
                onClick={(e) => handleClick(e, item.id)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      
      <footer className="sidebar-footer">
        <div className="social-links">
          <a href="https://www.nexusmods.com/skyrimspecialedition/mods/132034" target="_blank" rel="noopener noreferrer" className="btn btn-nexus">
            <span className="btn-icon btn-icon--nexus"></span>
            Nexus Page
          </a>
          <a href="https://discord.gg/wakingdreams" target="_blank" rel="noopener noreferrer" className="btn btn-discord">
            <span className="btn-icon btn-icon--discord"></span>
            Discord
          </a>
          <a href="https://www.patreon.com/c/TwistedModding" target="_blank" rel="noopener noreferrer" className="btn btn-patreon">
            <span className="btn-icon btn-icon--patreon"></span>
            Patreon
          </a>
          <a href="https://ko-fi.com/twistedmodding1" target="_blank" rel="noopener noreferrer" className="btn btn-kofi">
            <span className="btn-icon btn-icon--kofi"></span>
            Ko-fi
          </a>
        </div>
      </footer>
    </aside>
  );
};

export default Sidebar;
