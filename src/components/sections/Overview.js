import React from 'react';

const Overview = () => {
  return (
    <>
      <header className="section-header">
        <h1 id="overview-title">Twisted Skyrim</h1>
        <p className="subtitle">A Complete Skyrim Overhaul</p>
      </header>
      
      <figure className="hero-image">
        <img 
          src="https://raw.githubusercontent.com/Oghma-Infinium/Twisted-Skyrim/refs/heads/main/Twisted%20Skyrim%20Logo%20(1).webp" 
          alt="Twisted Skyrim Logo - A Wabbajack Modlist"
          loading="lazy"
          width="800"
          height="400"
        />
        <figcaption>A Wabbajack Modlist</figcaption>
      </figure>
      
      <div className="content-text">
        <p>
          Twisted Skyrim is modlist for TES V: Special Edition. Its been made easy to install thanks to Wabbajack. Twisted Skyrim presents you with an entirely hand-crafted suite of visuals, a total combat system overhaul, new & expanded locations, worlds, quests, and achievements.
        </p>
        
        <h3>Design Philosophy</h3>
        <p>
          Twisted Skyrim was designed as a graphics-first modlist. What that means is that I've spared no expense in terms of visual fidelity, and I strive to make everything as visually consistent as possible. With that said, Twisted Skyrim is not just about visuals, it also offers a complete overhaul of pretty much every corner of the game. I noticed most lists don't cater to a graphics-first approach leaving users with high-end hardware feeling like they are leaving something on the table, so I changed that.
        </p>
      </div>
    </>
  );
};

export default Overview;
