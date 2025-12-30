import React from 'react';

const Features = () => {
  const features = [
    {
      title: 'Modern Combat',
      description: 'Attack commitment, stances, dodging mechanics for both the player and AI, along with intelligent enemy AI to create a challenging and engaging combat experience.'
    },
    {
      title: 'World Overhaul',
      description: 'Expanded cities, new dungeons, new NPCs, and unique mashups for several locations.'
    },
    {
      title: 'New Quests and Lands',
      description: 'Completely new questlines, characters, locations, and lands to explore.'
    },
    {
      title: 'Survival Elements',
      description: 'Temperature, hunger, and fatigue systems remain true to vanilla, and fast travel requires travel packs.'
    },
    {
      title: 'Visual Overhaul',
      description: 'The ENB preset used is based on Rudy ENB, but has many custom changes to both the weather and ENB itself for a completely unique experience. Textures have been hand selected from hundreds of different mods, making sure everything is as consistent as possible.'
    },
    {
      title: 'Lore-focused',
      description: 'Most, if not all, content that has been added is well within the bounds of the established lore.'
    }
  ];

  return (
    <>
      <header className="section-header">
        <h1 id="features-title">Key Features</h1>
        <p className="subtitle">What makes Twisted Skyrim unique</p>
      </header>
      
      <div className="content-text">
        {features.map((feature, index) => (
          <article key={index} className="feature-card">
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </article>
        ))}
      </div>
    </>
  );
};

export default Features;
