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
          <p><strong>This section exists to tell you about the systems this modlist uses.</strong></p>
        </div>

        <h3>Gameplay Showcase</h3>
        <div className="video-embed">
          <iframe 
            src="https://www.youtube.com/embed/pfeQMem6TW0" 
            title="Twisted Skyrim - Starting the Game" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen>
          </iframe>
        </div>

        <h2>Initial Setup</h2>
        <p>Before reading this guide, please following the <a href="#installation">Installation Guide</a> and read through the <a href="#faq">FAQ</a>, both of these will answer almost all the questions you will ask.</p>
        
        <p>I suggest looking through the keybinds for the list in game, by pressing <strong>F11</strong></p>

        <h2>Overview</h2>
        <p>This section will cover the absolute basics of the list. I suggest reading, or at the very least, skimming, all of the linked mod pages in this section if you are unfamiliar with the following mods.</p>

        <h3>Core Overhauls</h3>
        <ul>
          <li>Twisted Skyrim uses the <a href="https://next.nexusmods.com/profile/SimonMagus/mods?gameId=1704" target="_blank" rel="noopener noreferrer">entire simonrim suite</a>, except for Arena, Blade and Blunt, and Candlehearth. I highly recommend getting familiar with all of his mods. This modlist also has survival mode enabled by default. It makes use of <a href="https://www.nexusmods.com/skyrimspecialedition/mods/78244" target="_blank" rel="noopener noreferrer">Survival Mode Improved</a>, <a href="https://www.nexusmods.com/skyrimspecialedition/mods/97536" target="_blank" rel="noopener noreferrer">Starfrost</a>, and <a href="https://www.nexusmods.com/skyrimspecialedition/mods/92220" target="_blank" rel="noopener noreferrer">Journeyman</a>. To disable survival mode for your playthrough, simply uncheck the checkbox in settings while in game.</li>
        </ul>

        <h3>Combat Foundations</h3>
        <p>The following mods are considered the "foundations" of the combat and gameplay for Twisted Skyrim:</p>
        
        <ul>
          <li>
            <a href="https://www.nexusmods.com/skyrimspecialedition/mods/117052" target="_blank" rel="noopener noreferrer">BFCO - Attack Behavior Framework</a> introduces attack commitment to the game, for both NPCs and the Player. If you're familiar with MCO, this will be right at home for you.
            <ul>
              <li>Time your attacks precisely, aggresive NPCs can and will take advantage of poor planning.</li>
            </ul>
          </li>
          
          <li>
            <a href="https://www.nexusmods.com/skyrimspecialedition/mods/117986" target="_blank" rel="noopener noreferrer">Stances NG</a> adds 3 different stances, which contain unique moveset for each weapon type.
            <ul>
              <li>X to swap stances.</li>
            </ul>
          </li>
          
          <li>
            <a href="https://www.nexusmods.com/skyrimspecialedition/mods/56956" target="_blank" rel="noopener noreferrer">TK Dodge RE</a> adds dodging to the game
            <ul>
              <li>Adds I-Frames, which you should take advantage of.</li>
              <li>Costs stamina, or magika depending on your class, be sure to manage your resources wisely.</li>
              <li>Requires the level 40 sneak perk <code>Infiltrator</code></li>
            </ul>
          </li>
          
          <li>
            <a href="https://www.nexusmods.com/skyrimspecialedition/mods/86950" target="_blank" rel="noopener noreferrer">Combat Pathing Revolution</a>
            <ul>
              <li>It basically completeley overhauls NPC AI in combat. TL;DR it makes them much smarter and is designed specifically for MCO/BFCO. I'd give the mod page a read.</li>
            </ul>
          </li>
          
          <li>
            <a href="https://www.nexusmods.com/skyrimspecialedition/mods/72347" target="_blank" rel="noopener noreferrer">Precision - Accurate Melee Collisions</a> Adds accurate melee collisions to the game.
            <ul>
              <li>You can very easily miss attacks if your sword does not directly collide with an enemy, make sure to be precise!</li>
              <li>Hitstop, if you hit a wall your sword will bounce back and prevent you from attacking for a very brief time.</li>
            </ul>
          </li>
          
          <li>
            <a href="https://github.com/max-su-2019/MaxsuPoise" target="_blank" rel="noopener noreferrer">Maxsu Poise</a> and <a href="https://github.com/max-su-2019/ModernStaggerLock" target="_blank" rel="noopener noreferrer">Modern Stagger Lock</a> implement a Poise system. Poise Health can be seen on the Special Bar of TrueHUD (the yellow bar above Health on player and target widgets).
          </li>
          
          <li>
            <a href="https://www.nexusmods.com/skyrimspecialedition/mods/72014" target="_blank" rel="noopener noreferrer">SCAR</a> brings movesets to NPCs, see the mod page for more info.
          </li>
          
          <li>
            <a href="https://www.nexusmods.com/skyrimspecialedition/mods/120738" target="_blank" rel="noopener noreferrer">Ultimate NPC Dodging</a> brings dodging to NPCs, makes fights less 2 dimensional, and of course more difficult.
          </li>
          
          <li>
            <a href="https://www.nexusmods.com/skyrimspecialedition/mods/74716" target="_blank" rel="noopener noreferrer">Modern Combat AI</a> makes NPCs far more aggresive, meaning you need to space better and carefully plan your attacks.
          </li>
        </ul>

        <h2>Religion Overhaul</h2>
        <p>Twisted Skyrim reworks the religion system to provide more depth and engagement with the various deities, upgrading the buffs you receive based on doing certain tasks.</p>
        <ul>
          <li><a href="https://www.nexusmods.com/skyrimspecialedition/mods/160141" target="_blank" rel="noopener noreferrer">Archon</a> - An complete overhaul to the religion system.</li>
            <ul>
              <li>Breaks down Deity buffs into three categories: Blessings, Acolyte, and Champion. Blessings are the base buff you get for praying at a shrine, Acolyte is acheived after during general tasks based on the Deity, and Champion is the highest tier achieved after doing specific tasks.</li>
              <li>Archon turns Shrine Blessings into permanent bonuses, however you can only pray to one deity at a time. Acolyte and Champion bonuses will only apply if you have the Deity's Shrine Blessing.</li>
              <li>Read the entire mod page for more details and information on each specific Deity you may follow.</li>
            </ul>
        </ul>

        <h2>Leveling and Progression</h2>
        <p>Twisted Skyrim replaces the vanilla leveling system to have the player engage with the world around them more.</p>

        <h3>Changes to skill leveling</h3>
        <p>Skill leveling has been replaced with a system that relies on your actual level using <a href="https://www.nexusmods.com/skyrimspecialedition/mods/89940" target="_blank" rel="noopener noreferrer">Static Skill Leveling</a>.</p>
        <p>Character leveling has been overhauled thanks to <a href="https://www.nexusmods.com/skyrimspecialedition/mods/17751" target="_blank" rel="noopener noreferrer">Experience</a>. You now receive XP for killing enemies, completeing quests, and exploring new locations.</p>

        <h3>Perks</h3>
        <p>Paragon, Adamant, Scion, & Manbeast</p>

        <ul>
          <li><a href="https://www.nexusmods.com/skyrimspecialedition/mods/120398" target="_blank" rel="noopener noreferrer">Paragon</a> - An (almost) complete overhaul of the vanilla perks and several mechanical changes.</li>
            <ul>
              <li>Overhauls every main perk tree except the magic trees.</li>
              <li>Reimplements Sprinting Costs</li>
              <li>Reimplements Power Attack Costs</li>
              <li>Changes Combat Stamina Regeneration Rate and removes the in-combat penalty for Stamina regeneration</li>
              <li>Adds a Stamina Cost for certain actions such as light attacks, drawing a bow, reloading a crossbow, sneaking and jumping.</li>
              <li>A Low Stamina / Exhaustion system. Upon reaching 0 Stamina you (and NPCs) will receive a debuff that lasts for 10 seconds or until you restore 50% of your Stamina. The debuff reduces damage done, poise damage done, and your movement speed.</li>
              <li>And many more changes, I highly recommend giving the mod page a full read.</li>
            </ul>
          <li><a href="https://www.nexusmods.com/skyrimspecialedition/mods/30191" target="_blank" rel="noopener noreferrer">Adamant</a> - A Perk Overhaul, specifically used for magic trees.</li>
            <ul>
              <li>Overhauls all magic perk trees, read the mod page for more details.</li>
            </ul>
            <li><a href="https://www.nexusmods.com/skyrimspecialedition/mods/41639" target="_blank" rel="noopener noreferrer">Scion</a> - A Vampire Overhaul.</li>
              <ul>
                <li>Overhauls all vampire abilities and perks, read the mod page for more details.</li>
              </ul>
            <li><a href="https://www.nexusmods.com/skyrimspecialedition/mods/44746" target="_blank" rel="noopener noreferrer">Manbeast</a> - A Werewolf Overhaul.</li>
              <ul>
                <li>Overhauls all werewolf abilities and perks, read the mod page for more details.</li>
              </ul>
            <li><a href="https://www.nexusmods.com/skyrimspecialedition/mods/41780" target="_blank" rel="noopener noreferrer">Custom Skills Framework</a> - A Custom Skills Framework for creating and managing unique skills.</li>
              <ul>
                <li>New perk trees have been added using this lovely mod, they are all accessible through the tween menu, and one of which through a <code>Destiny</code> spell in your magic menu.</li>
              </ul>
        </ul>

        <h2>Difficulty</h2>

        <p>I highly recommend having a follower, or multiple. Playing solo in this list is possible, but not recommended and will increase the difficulty significantly.</p>

        <p>Twisted Skyrim has a unique approach to difficulty, putting an emphasis on resource management, making sure enemies aren't sponges, and intelligent AI.</p>
        
        <p>To elaborate on AI more, put simply, they are much more aggresive. They heal each other, use a larger variety of offensive spells, use potions, and can dodge your attacks.</p>
        
        <p>A poise system has been added, and if the enemies (or yours) poise gets broken, a stagger will occur which is an opportunity for you, or them to attack without punishment. Archers can take advantage of headshots to deal bonus poise damage to keep them off of you for longer.</p>
        
        <p><a href="https://www.nexusmods.com/skyrimspecialedition/mods/106240" target="_blank" rel="noopener noreferrer">SkyValor</a> changes experience gain, damage, health pools, resource regeneration, and much more. Give it a thorough read.</p>
        
        <p>Potions have been signficantly buffed due to the damage and health changes by SkyValor, and I highly recommend staying stocked up.</p>
        
        <p><a href="https://www.nexusmods.com/skyrimspecialedition/mods/51310" target="_blank" rel="noopener noreferrer">Dragon War</a> completely overhauls dragon behaviors and resistances. The dragon fights are much more unpredictable and difficult. Reading through this is basically required as without knowing resistances, you're in for a very long fight.</p>
        
        <p><a href="https://www.nexusmods.com/skyrimspecialedition/mods/154357" target="_blank" rel="noopener noreferrer">Skybane - The Logic of Death</a> completely overhauls NPC resistances (all of those except dragons). Everything now has a weakness, but will also have resistances. This means that carrying multiple damage types is highly recommended.</p>

        <div className="warning">
          <p><strong>Beware the bears.</strong></p>
        </div>

        <h2>Starting A New Game!</h2>

          <ul>
            <li>Once at the main menu, select <code>New Game</code>.</li>
            <li>Create your character as normal.</li>
            <li>After character creation, you will be prompted to select a starting class, read through them and choose one. They give you starting gear and spells based on what you choose.</li>
            <li>Wait about two minutes for initialization to finish.</li>
            <li>Press <code>escape</code> and open up the <code>Mod Configuration</code> menu.</li>
            <li>Select <code>Completionist: Tracker (Main)</code> and in the <code>General Settings</code> tab, select your faction & start settings based on what you plan on doing in the game.</li>
            <li>Press <code>tab</code> to go back and open <code>MCM Recorder</code>.</li>
            <li>In <code>MCM Recorder</code> select <code>Twisted Skyrim</code> and click <code>Yes</code> to the pop up and close all menus and click <code>Run Recording</code>.</li>
            <li>Wait until you get a notification saying its finished, or look in the top left at the count of MCMs left to configure, it should take no longer than two minutes. After two minutes, you should be good to go.</li>
            <li>Speak to the statue and select your start, then sleep in the bed behind you.</li>
          </ul>

      </div>
    </>
  );
};

export default Gameplay;
