import React from 'react';

const Support = () => {
  return (
    <>
      <div className="section-header">
        <h1>Support & Community</h1>
        <p className="subtitle">Get help and connect with the community</p>
      </div>
      
      <div className="content-text">
        <div className="support-section">
          <h3>Need Help?</h3>
          <p>If you're experiencing issues with Twisted Skyrim, here are the best ways to get support:</p>
          
          <div className="support-links">
            <div className="support-card">
              <h4>Discord Server</h4>
              <p>Join the Waking Dreams Discord server for real-time support, discussion, and community interaction.</p>
              <a href="https://discord.gg/wakingdreams" target="_blank" rel="noopener noreferrer" className="support-button">
                Join Discord
              </a>
              <p className="support-note">Best place to quickly receive support or to report bugs.</p>
            </div>

            <div className="support-card">
              <h4>GitHub Issues</h4>
              <p>Report bugs, request features, or track known issues on the official GitHub repository.</p>
              <a href="https://github.com/Oghma-Infinium/Twisted-Skyrim/issues" target="_blank" rel="noopener noreferrer" className="support-button">
                View GitHub
              </a>
              <p className="support-note">Ideal for reporting bugs or suggesting improvements.</p>
            </div>
          </div>
        </div>

        <div className="support-section">
          <h3>Support Development</h3>
          <p>If you enjoy Twisted Skyrim and want to support its continued development, consider becoming a patron or making a one-time donation:</p>
          
          <div className="support-links">
            <div className="support-card">
              <h4>Patreon</h4>
              <p>Support ongoing development with monthly contributions and get early access to updates.</p>
              <a href="https://www.patreon.com/c/TwistedModding" target="_blank" rel="noopener noreferrer" className="support-button patreon">
                Support on Patreon
              </a>
            </div>

            <div className="support-card">
              <h4>Ko-fi</h4>
              <p>Make a one-time donation to show your appreciation.</p>
              <a href="https://ko-fi.com/twistedmodding1" target="_blank" rel="noopener noreferrer" className="support-button kofi">
                Donate on Ko-fi
              </a>
            </div>
          </div>
        </div>

        <div className="support-section">
          <h3>Before Asking for Help</h3>
          <p>Please make sure you've done the following before requesting support:</p>
          <ul>
            <li>Read through the <strong>Installation Guide</strong> completely</li>
            <li>Check the <strong>FAQ</strong> section for your specific issue</li>
            <li>Verify you have the correct game version (1.6.1170)</li>
            <li>Confirm you have all Creation Club content installed</li>
            <li>Ensure your pagefile is set correctly (40GB)</li>
            <li>Check that you haven't added or removed any mods</li>
            <li>Make sure you're running the game through Mod Organizer 2</li>
          </ul>
        </div>

        <div className="support-section">
          <h3>Community Guidelines</h3>
          <p>When seeking help or participating in the community, please:</p>
          <ul>
            <li>Be respectful to other community members and moderators</li>
            <li>Provide detailed information about your issue (error messages, crash logs, etc.)</li>
            <li>Don't ask for support if you've modified the modlist</li>
            <li>Search existing conversations before asking duplicate questions</li>
            <li>Don't discuss piracy or illegal content</li>
          </ul>
        </div>

        <div className="support-section">
          <h3>Credits & Attribution</h3>
          <p>Twisted Skyrim is made possible by the incredible work of thousands of mod authors in the Skyrim modding community.</p>
          <p><strong>Special thanks to:</strong> Halgari, Total, Aljo, Arranz, and the entire modding community for their contributions and support.</p>
        </div>
      </div>
    </>
  );
};

export default Support;
