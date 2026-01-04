import React from 'react';

const FAQ = () => {
  return (
    <>
      <div className="section-header">
        <h1>Frequently Asked Questions</h1>
        <p className="subtitle">Common questions and answers about Twisted Skyrim</p>
      </div>
      
      <div className="content-text">
        <div className="faq-item">
          <h3>Why am I crashing?</h3>
          <p>I have no idea, post a crash log on the discord server for more help.</p>
          <p>Before asking for help, make sure you've followed the installation guide exactly and read through this FAQ.</p>
        </div>

        <div className="faq-item">
          <h3>Can I add my own mods to this list?</h3>
          <p><strong>No.</strong> Adding or removing mods will break the list and you will not receive support if you do so. The list is carefully balanced and tested - adding mods will likely cause crashes or conflicts.</p>
        </div>

        <div className="faq-item">
          <h3>Can I remove mods I don't like?</h3>
          <p><strong>No.</strong> Just like adding mods, removing mods will break the list. If you don't like certain aspects of the list, this modlist might not be for you. No modlist will be perfect for everyone, so find one that ticks enough of your boxes.</p>
        </div>

        <div className="faq-item">
          <h3>Why is my performance so bad?</h3>
          <p>Twisted Skyrim is a very demanding modlist. Make sure you:</p>
          <ul>
            <li>Meet the recommended system requirements</li>
            <li>Have set your pagefile correctly</li>
            <li>Are running the game on an SSD</li>
            <li>Have followed the Performance Guide section for optimization tips</li>
            <li>Don't have unnecessary background programs running</li>
          </ul>
        </div>

        <div className="faq-item">
          <h3>What difficulty should I play on?</h3>
          <p>The list is balanced around <strong>Adept</strong> difficulty. You can adjust it based on your preferences, but Adept is recommended for the intended experience.</p>
        </div>

        <div className="faq-item">
          <h3>Can I use a controller?</h3>
          <p><strong>No.</strong> Controller usage is not supported and never will be.</p>
        </div>

        <div className="faq-item">
          <h3>How do I start a new game?</h3>
          <p>Simply select "New Game" from the main menu. Make sure to:</p>
          <ol>
            <li>Let the MCM Recorder run automatically (don't touch anything)</li>
            <li>Wait for the message confirming MCM setup is complete</li>
            <li>Save your game after the message appears</li>
          </ol>
        </div>

        <div className="faq-item">
          <h3>Can I change my character's appearance mid-game?</h3>
          <p>Yes, you can use the <code>showracemenu</code> console command. However, be careful not to change your race or gender as this can break quests.</p>
        </div>

        <div className="faq-item">
          <h3>Why can't I see my character's body in first person?</h3>
          <p>This is intentional. The list uses Enhanced Camera which provides an improved first-person experience.</p>
        </div>

        <div className="faq-item">
          <h3>How do I change the camera/FOV?</h3>
          <p>You can adjust camera settings through the Improved Camera MCM. Press ESC → Mod Configuration → Improved Camera to access the settings.</p>
        </div>

        <div className="faq-item">
          <h3>Do I need to play certain quest mods in a specific order?</h3>
          <p>No, all quest mods in the list can be played in any order. However, some are designed for higher-level characters, so check the quest mod descriptions in-game.</p>
        </div>

        <div className="faq-item">
          <h3>Can I switch between different profiles?</h3>
          <p>The list only supports the main "Twisted Skyrim" profile. Creating or using other profiles is not supported.</p>
        </div>

        <div className="faq-item">
          <h3>Why won't Wabbajack download X file?</h3>
          <p>Some common reasons:</p>
          <ul>
            <li>The file was removed from Nexus/source</li>
            <li>Your internet connection is unstable</li>
            <li>The file requires manual download (check the installation guide for manual download links)</li>
          </ul>
        </div>

        <div className="faq-item">
          <h3>Do I need to clean my master files?</h3>
          <p><strong>No.</strong> Do not clean any master files. The list handles this automatically.</p>
        </div>

        <div className="faq-item">
          <h3>Where do I report bugs?</h3>
          <p>Report bugs on the <a href="https://discord.gg/wakingdreams" target="_blank" rel="noopener noreferrer">Discord server.</a></p>
        </div>

        <div className="faq-item">
          <h3>Why can't I attack teammates, why can't I shout at the greybeards for the main quest?</h3>
          <p>Sneak and then attack.</p>
        </div>
      </div>
    </>
  );
};

export default FAQ;
