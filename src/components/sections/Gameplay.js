import React from 'react';

const Gameplay = () => {
  return (
    <>
      <div className="section-header">
        <h1>Gameplay Guide</h1>
        <p className="subtitle">Learn the core mechanics and systems of Twisted Skyrim</p>
      </div>
      
      <div className="content-text">
        <div className="warning">
          <h3>Before You Start</h3>
          <p><strong>Before reading this guide, please understand that Twisted Skyrim is NOT a gameplay tutorial. This section exists to tell you about the systems this modlist uses.</strong></p>
        </div>

        <h3>Gameplay Showcase</h3>
        <div className="video-container">
          <iframe 
            src="https://www.youtube.com/embed/pfeQMem6TW0" 
            title="Twisted Skyrim - Starting the Game" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen>
          </iframe>
        </div>

        <h3>Starting the Game</h3>
        <p>Once you've started the game...</p>
        <ol>
          <li>Open the in-game MCM (<strong>Esc → Mod Configuration → MCM Recorder → "Run Recording"</strong>)</li>
          <li>Do NOT touch anything and stand perfectly still</li>
          <li>The screen will start to black in/out repeatedly and will auto-close once finished</li>
          <li>Save your game once this message has appeared and DO NOT MAKE A SAVE UNTIL YOU SEE THIS MESSAGE</li>
        </ol>

        <h3>Loading and Saving</h3>
        <p>Due to the way that the Engine works, I recommend the following practices:</p>
        <ul>
          <li>Don't use Quicksaves/Autosaves, try to make different hard saves often</li>
          <li>Don't save when sneaking/jumping/sprinting/drawing a weapon or spell. This can corrupt your save</li>
          <li>If you are crashing after you try to load into a save, you can try loading an older save</li>
        </ul>

        <h3>Combat Foundations</h3>
        
        <h4>BFCO & Stances</h4>
        <p>Twisted Skyrim uses BFCO, a mod made by Distar as the foundation of the gameplay loop. This changes the way that attack commitment works by introducing different attack styles, with each different attack type in the game having a different animation based on your character and each playstyle feeling unique.</p>
        <p>Twisted Skyrim uses the combo system, which allows for chaining of normal attacks into power attacks, changing how you approach combat.</p>
        <p>For the different movesets available, I recommend checking the attached google sheets. Many one handed weapons use the same animation set, with the default being onehanded sword/mace. However, some weapons have their own unique animations. These unique animations are outlined in the sheet with what type of animation you can expect it to use.</p>
        <ul>
          <li><a href="https://docs.google.com/spreadsheets/d/1vVLW_YvPHPitsIDQBZfr91hN_ycTMgb0j6Yn-OHV1X8/edit#gid=0" target="_blank" rel="noopener noreferrer">BFCO OneHanded Sheet</a></li>
          <li><a href="https://docs.google.com/spreadsheets/d/1FP3MAkC6qvBx7se_eZCy60K5bIYMlCPcZzXjfYqxXtk/edit#gid=0" target="_blank" rel="noopener noreferrer">BFCO TwoHanded Sheet</a></li>
        </ul>
        <p>To change the attack type, you MUST be out of combat. To do this, hold block and press your sheath button. This will change the attack type.</p>

        <h4>TK Dodge RE</h4>
        <p>TK Dodge RE has three different dodge types available:</p>
        <ul>
          <li><strong>Sidestep</strong> (Default: C) - Allows for quick evasive maneuvers (iframes at the start of the animation). Recommended in 1v1 encounters</li>
          <li><strong>Dodge Roll</strong> (Default: Alt) - Allows for quick evasive maneuvers (iframes during the entire animation). Recommended in 1vX encounters</li>
          <li><strong>Tactical Roll</strong> (Hold the keybind for a dodge) - Same use as the dodge roll but with a longer animation</li>
        </ul>
        <p>Each dodge has a stamina cost and you can adjust the stamina cost in the in game MCM.</p>

        <h4>Precision</h4>
        <p>Precision adds a hit box to your weapons. Some enemies are able to dodge your attacks if they are not accurate.</p>

        <h4>Poise</h4>
        <p>Poise is a system that allows you to not be as easily staggered based on the armor you are wearing. If your poise breaks, you are staggered. Poise is indicated by a white bar appearing around your health bar. I recommend looking at the mod page of <a href="https://www.nexusmods.com/skyrimspecialedition/mods/72653" target="_blank" rel="noopener noreferrer">Poise</a> for more information.</p>

        <h3>Leveling and Progression</h3>
        <p>Twisted Skyrim uses a modular difficulty system that allows you to change the difficulty of the game based on your preferences. The list is balanced around Expert difficulty, but you can change it to your liking.</p>
        <p>The list uses a 1-100 leveling system, with the max level being 100. You can level up by doing any action that gives you experience. The list does not use a perk point system, instead you gain perk points by leveling up.</p>
        <p>You can level up your skills by doing any action that gives you experience in that skill. For example, if you want to level up your one handed skill, you can hit enemies with a one handed weapon.</p>

        <h3>Skills and Perks</h3>
        <p>Twisted Skyrim uses Paragon and Adamant as the base for the perk system. Paragon changes the way that the skill system works by making it so that you can level up past 100, allowing you to gain more perk points.</p>
        <p>Adamant is a perk overhaul that changes the way that the perk trees work. It is a streamlined perk overhaul that is designed to make the perk trees more balanced and less bloated.</p>
        <p><strong>For more information on the perk trees, I recommend checking the mod pages for <a href="https://www.nexusmods.com/skyrimspecialedition/mods/41780" target="_blank" rel="noopener noreferrer">Paragon</a> and <a href="https://www.nexusmods.com/skyrimspecialedition/mods/30191" target="_blank" rel="noopener noreferrer">Adamant</a>.</strong></p>

        <h3>Stamina Management</h3>
        <p>Stamina is a resource that is used for dodging, sprinting, and power attacking. If you run out of stamina, you will not be able to dodge or sprint, and your power attacks will be less effective.</p>
        <p>Stamina regenerates over time, but you can also use potions to restore it. I recommend keeping an eye on your stamina bar and using potions when necessary.</p>

        <h3>Death and Respawning</h3>
        <p>Twisted Skyrim uses Acheron as the death system. When you die, you will be teleported to the last place you slept. This is to prevent you from save scumming and to make the game more challenging.</p>
        <p>If you want to change this, you can disable Acheron in the in-game MCM.</p>

        <h3>Difficulty and Challenge</h3>
        <p>Twisted Skyrim is balanced around Expert difficulty. If you find the game too easy or too hard, you can change the difficulty in the in-game settings.</p>
        <p>The list uses a variety of mods to change the way that the AI behaves, making enemies more challenging and rewarding to fight. The list also uses a variety of mods to change the way that the combat works, making it more engaging and rewarding.</p>
        <p>The list uses the following mods to change the AI:</p>
        <ul>
          <li><strong>Valravn</strong> - Changes the way that the AI behaves, making enemies more challenging</li>
          <li><strong>Arena</strong> - Changes the way that the encounter zones work, making enemies scale with you</li>
          <li><strong>SRCEO</strong> - Changes the way that the NPCs are overhaul, making them more unique</li>
        </ul>
      </div>
    </>
  );
};

export default Gameplay;
