import React from 'react';
import Overview from './sections/Overview';
import Features from './sections/Features';
import Requirements from './sections/Requirements';
import Installation from './sections/Installation';
import Gameplay from './sections/Gameplay';
import Performance from './sections/Performance';
import FAQ from './sections/FAQ';
import ModList from './sections/ModList';
import Screenshots from './sections/Screenshots';
import Changelog from './sections/Changelog';
import Support from './sections/Support';

console.log('MainContent.js loaded');
console.log('Overview:', typeof Overview, Overview);
console.log('Features:', typeof Features, Features);
console.log('Requirements:', typeof Requirements, Requirements);
console.log('Installation:', typeof Installation, Installation);
console.log('Gameplay:', typeof Gameplay, Gameplay);
console.log('Performance:', typeof Performance, Performance);
console.log('FAQ:', typeof FAQ, FAQ);
console.log('ModList:', typeof ModList, ModList);
console.log('Screenshots:', typeof Screenshots, Screenshots);
console.log('Changelog:', typeof Changelog, Changelog);
console.log('Support:', typeof Support, Support);

const MainContent = ({ activeSection, onSectionChange }) => {
  console.log('MainContent rendering with activeSection:', activeSection);
  
  // Create a safe wrapper for each component
  const SafeWrapper = ({ component: Component, name }) => {
    console.log(`Attempting to render ${name}`);
    try {
      if (typeof Component !== 'function') {
        console.error(`${name} is not a function! Type:`, typeof Component, Component);
        return <div style={{color: 'red', padding: '20px'}}>Error: {name} failed to load (not a function)</div>;
      }
      return <Component />;
    } catch (error) {
      console.error(`Error rendering ${name}:`, error);
      return <div style={{color: 'red', padding: '20px'}}>Error rendering {name}: {error.message}</div>;
    }
  };

  const sections = {
    overview: { component: Overview, name: 'Overview' },
    features: { component: Features, name: 'Features' },
    requirements: { component: Requirements, name: 'Requirements' },
    installation: { component: Installation, name: 'Installation' },
    gameplay: { component: Gameplay, name: 'Gameplay' },
    performance: { component: Performance, name: 'Performance' },
    faq: { component: FAQ, name: 'FAQ' },
    mods: { component: ModList, name: 'ModList' },
    screenshots: { component: Screenshots, name: 'Screenshots' },
    changelog: { component: Changelog, name: 'Changelog' },
    support: { component: Support, name: 'Support' }
  };

  console.log('Sections object created:', Object.keys(sections));

  return (
    <main className="main-content" role="main">
      {Object.keys(sections).map(key => {
        console.log(`Rendering section: ${key}, active: ${activeSection === key}`);
        const { component, name } = sections[key];
        return (
          <section
            key={key}
            id={key}
            className={`content-section ${activeSection === key ? 'active' : ''}`}
            aria-labelledby={`${key}-title`}
          >
            <SafeWrapper component={component} name={name} />
          </section>
        );
      })}
    </main>
  );
};

export default MainContent;
