import React from 'react';

const Installation = () => {
  return (
    <>
      <div className="section-header">
        <h1>Installation Guide</h1>
        <p className="subtitle">Installing Twisted Skyrim is relatively easy and, if you have Nexus Premium, will be a simple waiting game</p>
      </div>
      
      <div className="content-text">
        <div className="warning">
          <h3>Important Requirements</h3>
          <p><strong>Twisted Skyrim requires the full AE upgrade, which means you must purchase the AE edition of the game for the list to function.</strong></p>
          <p><strong>You must update Skyrim to the latest version (1.6.1170) on Steam to install this list.</strong></p>
          <p><strong>This list must be installed on SSD; however, you can send your downloads to a different drive, such as a hard drive if you need the extra space.</strong></p>
        </div>

        <h3>Storage Requirements</h3>
        <ul>
          <li><strong>Downloads:</strong> ~469 GB</li>
          <li><strong>Install:</strong> ~821 GB</li>
          <li><strong>Temp Files:</strong> ~100 GB (on OS drive)</li>
          <li><strong>Pagefile:</strong> 40 GB</li>
          <li><strong>TOTAL:</strong> ~1.2 TB</li>
        </ul>
        <p><em>Wabbajack requires around 30-40 GB of space on your main OS drive for temporary and working files during the installation.</em></p>
        
        <div className="installation-steps">
          <div className="step-item">
            <h3><span className="step-number">1</span>Install Microsoft Visual C++ Redistribution Package</h3>
            <div className="step-description">
              <p>1. Install <a href="https://aka.ms/vs/16/release/vc_redist.x64.exe" target="_blank" rel="noopener noreferrer">Visual C++ x64</a> & <a href="https://dotnet.microsoft.com/en-us/download/dotnet/6.0/runtime" target="_blank" rel="noopener noreferrer">.Net Runtime v6 desktop x64</a></p>
              <p>2. Change Skyrim so it does not <a href="https://help.steampowered.com/en/faqs/view/71AB-698D-57EB-178C#disable" target="_blank" rel="noopener noreferrer">automatically update</a></p>
              <p>3. Right click on Skyrim SE and click on properties, untick the "Enable Steam Overlay while in-game."</p>
              <p>4. <strong>You also need to start the games to the main menu in order to download all the creations. DO NOT SKIP THIS STEP, IF YOU DO SO WABBAJACK WILL FAIL</strong></p>
            </div>
          </div>
          
          <div className="step-item">
            <h3><span className="step-number">2</span>Pagefile and Crash Prevention (REQUIRED)</h3>
            <div className="step-description">
              <p><strong>Due to Twisted Skyrim's size and number of files required to be handled for the list, this step is NOT optional, I do not care how much RAM or VRAM you have, please do this step.</strong></p>
              <p>To set up your pagefile:</p>
              <p>1. Press <strong>Win Key + R</strong><br />
              2. Type <em>sysdm.cpl ,3</em> and hit <strong>ENTER</strong><br />
              3. Navigate to <em>Performance</em> and click the box "Settings..."<br />
              4. Click the <em>Advanced</em> tab at the top<br />
              5. Under <em>Virtual Memory</em> click the box "Change..."<br />
              6. Uncheck <em>Automatically manage</em> if it is checked<br />
              7. Select your disk drive, ideally your fastest solid state drive<br />
              8. Click the <strong>Custom size:</strong> button<br />
              9. In the box next to <strong>Initial Size (MB)</strong> type <code>40000</code><br />
              10. In the box next to <strong>Maximum Size (MB)</strong> type <code>40000</code><br />
              11. Click the <em>Set</em> button<br />
              12. Click <em>OK</em> → <em>Apply</em> → <em>OK</em><br />
              13. <strong>Restart your computer</strong> in order for your new pagefile to take effect</p>
            </div>
          </div>
          
          <div className="step-item">
            <h3><span className="step-number">3</span>Setting Shader Cache Size</h3>
            <div className="step-description">
              <p><strong>If you have an NVIDIA GeForce Graphics Card, please do the following:</strong></p>
              <p>1. Right-click on your desktop and select <strong>NVIDIA Control Panel</strong><br />
              2. Navigate and click on <strong>Manage 3D settings</strong>. It is the 2nd one to the top<br />
              3. Scroll down in Global Settings until you see <strong>Shader Cache Size</strong><br />
              4. Double Click <strong>Driver Default</strong> to the right of Shader Cache Size and select <strong>10 GB</strong><br />
              5. Click <strong>Apply</strong> in the bottom right hand corner<br />
              6. You may exit out of the application</p>
            </div>
          </div>
          
          <div className="step-item">
            <h3><span className="step-number">4</span>Steam Setup</h3>
            <div className="step-description">
              <p>If you have your Steam Library in Program Files, <a href="https://github.com/LostDragonist/steam-library-setup-tool/wiki/Usage-Guide" target="_blank" rel="noopener noreferrer">read this</a> and move it elsewhere. Locations such as Desktop, Documents, Downloads, OneDrive, etc. will cause issues with installing and playing the list.</p>
            </div>
          </div>

          <div className="step-item">
            <h3><span className="step-number">5</span>Game Language</h3>
            <div className="step-description">
              <p>The English Steam version of Skyrim is the only supported version. I understand that this may be frustrating for non-English speaking users or users with the GOG/Bethesda.net versions, but due to the core file differences between the different versions, I am only able to support one game version.</p>
              <p>1. Right click on your Skyrim in Steam<br />
              2. Click <em>Properties</em><br />
              3. Click <em>Language</em><br />
              4. Set the Language to <strong>English</strong></p>
            </div>
          </div>
          
          <div className="step-item">
            <h3><span className="step-number">6</span>Installing Creation Club Content</h3>
            <div className="step-description">
              <p><strong>If you have never installed the Creation Club Content before, please do the following:</strong></p>
              <p>1. Purchase the <em>Skyrim Anniversary Edition</em> Upgrade from Steam. If you do not do this, you can not install or play the list.</p>
              <blockquote><strong>There is no work around for this and pirating this content will not work. If you pirate the content and come asking for assistance, you will be banned.</strong></blockquote>
              <p>2. Once you have the Anniversary Edition bought, do the following steps below<br />
              3. In your Steam Library, right-click on the menu entry for Skyrim, select <code>Properties</code> and then select <code>Local Files</code>. Click <code>Verify Integrity of Game Files</code> and wait<br />
              4. Once this is completed, launch the game once from Steam. You may receive a prompt that your settings were detected or not detected, this does not matter, nor do any options you select here. Simply open the launcher and launch the game<br />
              5. Once the intro logo finishes displaying and the Skyrim logo appears, you should receive a prompt to "Download All Content?" Accept this option<br />
              6. If you did not receive a prompt to download, select the Creation Club option from the menu, and you should find a "Download All" prompt in there somewhere. If this message does not appear, you have not purchased the $20 Upgrade. Begin again from step 1<br />
              7. Wait for the download process to complete. <strong>Do NOT ALT-TAB during this process as it will cause the process to fail and you will have to start over again</strong><br />
              8. Proceed with the rest of the installation</p>
            </div>
          </div>

          <div className="step-item">
            <h3><span className="step-number">7</span>Installing Creation Kit</h3>
            <div className="step-description">
              <p>Make sure you also have the Special Edition version of the Creation kit found <a href="https://store.steampowered.com/app/1946180/Skyrim_Special_Edition_Creation_Kit/" target="_blank" rel="noopener noreferrer">here</a>. Install it in the same location/drive where you have Skyrim installed.</p>
            </div>
          </div>
          
          <div className="step-item">
            <h3><span className="step-number">8</span>Installing Wabbajack</h3>
            <div className="step-description">
              <p>Once you have completed pre-installation, download the <a href="https://github.com/wabbajack-tools/wabbajack/releases" target="_blank" rel="noopener noreferrer">latest version of Wabbajack</a> on this github and place it in a folder such as <code>C:\Wabbajack</code>. <strong>DO NOT place it in Program Files, User folders (such as Desktop, Documents, Downloads, OneDrive, etc.), or in your Skyrim's Steam folder</strong>. I recommend placing it on an SSD as it will work quicker on there.</p>
              <p>The list requires Wabbajack version <strong>3.5.0.1 or later</strong>, installing on older versions of Wabbajack will prevent the installation from being completed.</p>
            </div>
          </div>

          <div className="step-item">
            <h3><span className="step-number">9</span>Downloading and Installing Twisted Skyrim</h3>
            <div className="step-description">
              <p>Downloading and installing Twisted Skyrim can take a while depending on your internet connection and computer. To install Twisted Skyrim, complete the following steps.</p>
              <p>1. Open Wabbajack and click <code>Browse Modlists</code><br />
              2. Press the <code>Show NSFW</code> check box at the top<br />
              3. Press the download button on Twisted Skyrim and wait for it to download<br />
              4. Set the installation folder to be somewhere like <code>C:\Games\Twisted Skyrim</code>. <strong>DO NOT place it in Program Files, User folders (such as Desktop, Documents, Downloads, etc.), or in your Skyrim's Steam folder</strong></p>
              <blockquote>The download location does not need to be on a SSD, but it makes installing faster.</blockquote>
              <p>5. Press the play button to begin<br />
              6. Turn on your favorite show or a nice long video essay Wabbajack does its thing. Alternatively read through this readme again<br />
              7. If the installation is successful, then rejoice and move onto post installation. If the installation is unsuccessful, follow what is below or join the <a href="https://discord.gg/wakingdreams" target="_blank" rel="noopener noreferrer">discord server</a> for support</p>
            </div>
          </div>
        </div>
        
        <div className="warning">
          <h3>Problems with Installation</h3>
          <p><strong>It is possible that you may encounter an error with Wabbajack when installing. Some common issues are listed below:</strong></p>
          <ul>
            <li><strong>Could not download X:</strong> Big files can fail to download due to connection issues. You can either run wabbajack again or download the file manually. If you decide to manually download it, make sure to place it in the same place as the other downloads</li>
            <li><strong>X is not a whitelisted download:</strong> This may happen when I update the modlist. Please check if there is a new update or wait until you see a release ping</li>
            <li><strong>Wabbajack could not find my game folder:</strong> Either buy the game or go back to the Pre-Installation step</li>
            <li><strong>Antivirus reports a virus:</strong> Windows 10/11 may automatically quarantine a key file which is needed for Mod Organizer. You can fix this by <a href="https://www.thewindowsclub.com/exclude-a-folder-from-windows-security-scan" target="_blank" rel="noopener noreferrer">adding an exclusion for Mod Organizer in windows defender</a></li>
            <li><strong>Unable to download Creation Club files:</strong> This error means that there is an issue where Wabbajack is unable to hash your Creation Club Content. If you have followed the steps outlined under Pre-Installation, are not on a pirated copy of the game, and have verified your steam files, then it is very likely that Wabbajack or Bethesda has messed up the hashing for these files. If this is the case, please wait for it to be resolved before continuing to download the list</li>
            <li><strong>Unable to download Skyrim_Default.ini:</strong> This error means you failed to follow the readme. Go back to the game language section and set your game language to English</li>
          </ul>
        </div>
        
        <h3>Manual Downloads (if needed)</h3>
        <p><strong>Sometimes mods fail to download for various reasons, I will update and include said mods here if they fail frequently for many users:</strong></p>
        <ul>
          <li><a href="https://drive.google.com/file/d/1bQhAF9X4MrPUos9JoXiXjrj9p5MgzJHu/view" target="_blank" rel="noopener noreferrer">Kaidan</a></li>
          <li><a href="https://drive.google.com/uc?id=15_0njBUjHKidNnJPmLXEygzGVWsA3Zbq&export=download" target="_blank" rel="noopener noreferrer">High Poly Head v1.4 (SE)</a></li>
          <li><a href="https://www.mediafire.com/file/ez44pa42bbinh0l/Paragon+Sparrow+Huntress.7z/file" target="_blank" rel="noopener noreferrer">Paragon Sparrow Huntress</a></li>
          <li><a href="https://www.loverslab.com/files/file/5051-halo-poser-se/?do=download&r=684897&confirm=1&t=1&csrfKey=4c3ef16dc2fc6dcf7bece61bc01d49bd" target="_blank" rel="noopener noreferrer">Halos Poser Pack</a></li>
          <li><a href="https://drive.google.com/file/d/1cHuLCUzX_wXuyXZCSjU75OTL_rlz5WSE/" target="_blank" rel="noopener noreferrer">Mofu_EldenRing Attack Animations GreatSword SE MCO</a></li>
          <li><a href="https://www.mediafire.com/file/d29mvsta04l1wio/Nekos_Poser_Pack_1.1.7z/file" target="_blank" rel="noopener noreferrer">Neko's Poser Pack</a></li>
        </ul>

        <h3>Post-Installation Setup</h3>
        <h4>Game Folder</h4>
        <p>Twisted Skyrim uses a Wabbajack feature called Stock Game to keep your Skyrim installation clean. All the files that you need to run the list are in a folder called <code>Stock Game</code>. You don't need to copy anything at all.</p>

        <h4>Antivirus Exceptions</h4>
        <p>Generally speaking, using Windows Defender is advised as it is a solid antivirus software that will have minimal interference with the game. Antivirus programs can be notorious for false flagging MO2's VFS as problematic, causing crashes or other problems. Antivirus programs like BitDefender, Norton, and Webroot are especially aggressive, and you will very likely need to fully remove them from your PC in order to actually launch the game through MO2.</p>

        <p>If you use Windows Defender, it is advised that you set up an Exception for the modlist. To do this follow these steps:</p>
        <p>1. Press the Windows Key<br />
        2. Type "Windows Defender" in the search bar and select "Windows Security"<br />
        3. Click on "Virus & threat protection" in the left pane<br />
        4. Click the "Manage settings" option under "Virus & threat protection settings"<br />
        5. Scroll down to "Exclusions" and click "Add or remove exclusions"<br />
        6. Windows Defender will prompt you with a run as administrator screen, just hit yes<br />
        7. Click the "Add an exclusion" button at the top and choose "Folder"<br />
        8. Navigate to your Install folder for the list and click "Select Folder"<br />
        9. <strong>(OPTIONAL)</strong> You can repeat these steps for the other executables: ModOrganizer.exe</p>

        <h4>Widescreen Fixes</h4>
        <p>Basic 21x9 support is included in the list. Enable the mods <code>Edge UI - Modern Skyrim Interface 21x9</code> & <code>Edge UI - Explorer Addon 21x9</code> in MO2</p>

        <h4>Controller and Gamepad Setup</h4>
        <p>This list will NOT officially add any controller or gamepad support. Currently the game crashes with a controller plugged in and honestly I'm gonna keep it like that cause I like it.</p>
      </div>
    </>
  );
};

export default Installation;
