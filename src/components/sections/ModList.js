import React from 'react';

const ModList = () => {
  return (
    <>
      <div className="section-header">
        <h1>Mod List</h1>
        <p className="subtitle">Complete list of mods included in Twisted Skyrim</p>
      </div>
      
      <div className="content-text">
        <p>View the complete and up-to-date list of all mods included in Twisted Skyrim using the Load Order Library below:</p>
        
        <div className="modlist-container">
          <iframe 
            src="https://loadorderlibrary.com/lists/twisted-skyrim-4" 
            title="Twisted Skyrim Mod List"
            width="100%"
            height="800"
            frameBorder="0"
            style={{border: 'none', borderRadius: '8px', marginTop: '20px'}}>
          </iframe>
        </div>

        <p style={{marginTop: '20px'}}>
          <strong>Note:</strong> This list is automatically updated with each release of Twisted Skyrim. The load order shown is the official and tested configuration.
        </p>
      </div>
    </>
  );
};

export default ModList;
