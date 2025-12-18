import React from 'react';

const Requirements = () => {
  return (
    <>
      <div className="section-header">
        <h1>System Requirements</h1>
        <p className="subtitle">Hardware specifications and installation requirements</p>
      </div>
      
      <div className="content-text">
        <h3>Development Setup</h3>
        <ul>
          <li><strong>CPU:</strong> AMD Ryzen 7 7800X3D</li>
          <li><strong>GPU:</strong> NVIDIA RTX 4090</li>
          <li><strong>RAM:</strong> 64GB DDR5 6000MHz</li>
          <li><strong>Storage:</strong> NVMe SSD</li>
          <li><strong>OS:</strong> Windows 11 64-bit</li>
        </ul>
        
        <h3>Performance Notes</h3>
        <ul>
          <li><strong>Resolution:</strong> Tested at 4K (3840x2160)</li>
          <li><strong>Memory Usage:</strong> ~40GBs of RAM used while playing</li>
          <li><strong>Performance:</strong> ~40 FPS exteriors & ~60 FPS interiors</li>
        </ul>
        
        <h3>Basic Requirements</h3>
        <ul>
          <li>Skyrim Special Edition + Paid Anniversary Upgrade (Steam version)</li>
          <li>Wabbajack</li>
          <li>Microsoft Visual C++ Redistributables</li>
        </ul>
        
        <div className="warning">
          <h3>Important Notice</h3>
          <p><strong>Twisted Skyrim requires the full AE upgrade, which means you must purchase the AE edition of the game for the list to function.</strong></p>
          <p><strong>You must update Skyrim to the latest version (1.6.1170) on Steam to install this list.</strong></p>
          <p><strong>THESE ARE DESKTOP RECOMMENDED SPECS, THIS LIST WILL NOT WORK ON LAPTOPS</strong></p>
        </div>
        
        <h3>Storage Requirements</h3>
        <ul>
          <li><strong>Downloads:</strong> ~500 GB</li>
          <li><strong>Install:</strong> ~716 GB</li>
          <li><strong>Temp Files:</strong> ~100 GB (on OS drive)</li>
          <li><strong>Pagefile:</strong> 40 GB</li>
          <li><strong>TOTAL:</strong> ~1.3 TB</li>
        </ul>
        <p><em>Wabbajack requires around 30-40 GB of space on your main OS drive for temporary and working files during the installation.</em></p>
      </div>
    </>
  );
};

export default Requirements;
