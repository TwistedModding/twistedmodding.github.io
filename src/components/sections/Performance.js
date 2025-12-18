import React from 'react';

const Performance = () => {
  return (
    <>
      <div className="section-header">
        <h1>Performance Guide</h1>
        <p className="subtitle">Optimize your game for the best experience</p>
      </div>
      
      <div className="content-text">
        <div className="warning">
          <h3>Important Note</h3>
          <p><strong>This section is OPTIONAL and aimed at those who are seeking to improve their framerate in the game. If you are happy with your current performance, you can skip this section entirely.</strong></p>
        </div>

        <h3>BethINI Setup</h3>
        <p>BethINI is a tool that allows you to tweak your Skyrim settings to improve performance. Here's how to use it:</p>
        
        <ol>
          <li>Close Mod Organizer</li>
          <li>Navigate to <code>{"<Path to Modlist>"}\\Tools\\BethINI</code></li>
          <li>Run <code>BethINI.exe</code></li>
          <li>If prompted to select your game and INI path, direct it to <code>{"<Path to Modlist>"}\\profiles\\Twisted Skyrim</code></li>
          <li>Make sure you are on the Basic tab
            <ul>
              <li>Resolution: Set this to your monitor's native resolution</li>
              <li>Antialiasing: TAA is forced by ENB</li>
              <li>Windowed Mode: Optional, keep in mind exclusive fullscreen has been known to cause crashes on Alt-Tab</li>
              <li>Borderless: Enable if using Windowed Mode</li>
              <li>VSync: This is personal preference, but having VSync can help with screen tearing</li>
              <li>Lock Frame Rate: This is also personal preference</li>
              <li>BethINI Preset: Set to High or Medium for more frames, do not go lower than this</li>
              <li>Recommended Tweaks: DO NOT enable this for Twisted, keep this disabled</li>
            </ul>
          </li>
          <li>Go to the Shadows tab
            <ul>
              <li>Shadow Resolution: 2048 is fine for most systems</li>
              <li>Shadow Distance Fade: 15000 is a good balance</li>
              <li>Exterior Draw Distance: Can be lowered to 4000 for better performance</li>
              <li>Shadow Bias: Keep at default</li>
            </ul>
          </li>
          <li>Go to the Visuals tab
            <ul>
              <li>Grass Fade: Can be lowered to 10000-15000 for better performance</li>
              <li>Grass Density: Can be lowered to 40-60 for better performance</li>
              <li>Light Fade: Keep at default</li>
              <li>Distant Object Detail: Medium is a good balance</li>
              <li>Object Fade: Can be lowered slightly for better performance</li>
              <li>Actor Fade: Keep at default</li>
              <li>Particles: Can be lowered for better performance, but this affects visual quality significantly</li>
            </ul>
          </li>
          <li>Once you have made your changes, click the Save and Exit button</li>
        </ol>

        <h3>ENB Modifications</h3>
        <p>The ENB preset included with Twisted Skyrim can be performance intensive. Here are some options to improve performance:</p>

        <h4>Adjusting ENB Settings</h4>
        <p>You can adjust the following settings in-game by pressing <strong>Shift + Enter</strong> to open the ENB menu:</p>
        <ul>
          <li><strong>Ambient Occlusion:</strong> Disabling this can provide a significant FPS boost</li>
          <li><strong>Detailed Shadow:</strong> Disabling this can improve performance</li>
          <li><strong>Complex Fire Lights:</strong> Disabling this can improve performance in areas with fire</li>
          <li><strong>Subsurface Scattering:</strong> Disabling this can improve performance but affects skin quality</li>
        </ul>

        <h4>Disabling ENB Completely</h4>
        <p>If you want to disable the ENB preset entirely:</p>
        <ol>
          <li>Press <strong>Shift + F12</strong> in-game to toggle ENB on/off</li>
          <li>Alternatively, open <code>enbseries.ini</code> in your Stock Game folder</li>
          <li>Find <code>[PROXY]</code> and set <code>EnableProxyLibrary=false</code></li>
        </ol>

        <h4>Tintmask Resolution Changes</h4>
        <p>Lowering tintmask resolution can improve performance with minimal visual impact:</p>
        <ol>
          <li>Open Mod Organizer</li>
          <li>Search for "High Poly Head" in the left pane</li>
          <li>Open the mod's file tree</li>
          <li>Navigate to <code>textures\\actors\\character\\facegendata\\facetint</code></li>
          <li>Replace the tintmask files with lower resolution versions (1k or 512 instead of 2k/4k)</li>
        </ol>

        <h3>LOD Generation</h3>
        <p>Twisted Skyrim includes pre-generated LODs, but you can regenerate them for better performance or quality. <strong>This process is very advanced and time-consuming.</strong></p>

        <div className="warning">
          <h4>Before You Begin</h4>
          <p><strong>LOD generation is an advanced process that can take several hours. Only proceed if you are comfortable with technical procedures and have significant free time.</strong></p>
          <p>You will need at least 100GB of free space on your installation drive for temporary files.</p>
        </div>

        <h4>ParallaxGen</h4>
        <ol>
          <li>In Mod Organizer, click the executable dropdown and select <strong>ParallaxGen</strong></li>
          <li>Run the tool and wait for it to complete (this can take 30-60 minutes)</li>
          <li>Once finished, the output will be in a mod called "ParallaxGen_Output"</li>
          <li>Make sure this mod is enabled in the left pane of MO2</li>
        </ol>

        <h4>xLODGen Terrain</h4>
        <ol>
          <li>In Mod Organizer, click the executable dropdown and select <strong>xLODGen - Terrain</strong></li>
          <li>In the xLODGen window that opens, right-click in the empty space and select <strong>Select All</strong></li>
          <li>Set Terrain LOD to Level 32</li>
          <li>Check the following options:
            <ul>
              <li>Terrain LOD</li>
              <li>Create Terrain LOD Textures</li>
            </ul>
          </li>
          <li>Click <strong>Generate</strong> and wait (this can take 1-2 hours)</li>
          <li>Once complete, the output will be in <code>{"<Modlist>"}\\Tools\\xLODGen\\xLODGen_Output</code></li>
          <li>Copy the output to <code>{"<Modlist>"}\\mods\\xLODGen_Output</code> and enable it in MO2</li>
        </ol>

        <h4>TexGen</h4>
        <ol>
          <li>In Mod Organizer, select <strong>TexGen x64</strong> from the executable dropdown</li>
          <li>In the TexGen window, select <strong>Skyrim Special Edition</strong> as the game mode</li>
          <li>Leave all settings at default unless you know what you're doing</li>
          <li>Click <strong>Start</strong> and wait (this can take 2-4 hours depending on your system)</li>
          <li>Once complete, click <strong>Exit</strong></li>
          <li>Navigate to <code>{"<Modlist>"}\\Tools\\DynDOLOD\\TexGen_Output</code></li>
          <li>Copy the entire folder to <code>{"<Modlist>"}\\mods\\TexGen_Output</code></li>
          <li>Enable the mod in MO2</li>
        </ol>

        <h4>DynDOLOD</h4>
        <ol>
          <li>In Mod Organizer, select <strong>DynDOLOD x64</strong> from the executable dropdown</li>
          <li>Right-click in the world space list and select <strong>Select All</strong></li>
          <li>Set the following options:
            <ul>
              <li>LOD Level: High (or Medium for better performance)</li>
              <li>Tree LOD: Check this box</li>
              <li>Grass LOD: Optional, provides grass in distant areas but impacts performance</li>
            </ul>
          </li>
          <li>Click <strong>OK</strong> and wait for the process to complete (this can take 3-5 hours)</li>
          <li>Once finished, navigate to <code>{"<Modlist>"}\\Tools\\DynDOLOD\\DynDOLOD_Output</code></li>
          <li>Copy the output to <code>{"<Modlist>"}\\mods\\DynDOLOD_Output</code></li>
          <li>Enable the mod in MO2 and make sure it loads after TexGen_Output</li>
        </ol>

        <div className="warning">
          <h4>Important Notes on LOD Generation</h4>
          <ul>
            <li>Always generate TexGen before DynDOLOD</li>
            <li>Never run these tools outside of Mod Organizer</li>
            <li>If you add/remove mods that affect the game world, you'll need to regenerate LODs</li>
            <li>Keep the original LODs as backup in case something goes wrong</li>
          </ul>
        </div>

        <h3>VRAMr - VRAM Usage Monitoring</h3>
        <p>To monitor your VRAM usage while playing, you can use the included VRAMr tool:</p>
        <ol>
          <li>VRAMr is included in the modlist and runs automatically</li>
          <li>Press <strong>Insert</strong> in-game to toggle the VRAM monitor overlay</li>
          <li>The overlay shows current VRAM usage and warnings when approaching limits</li>
        </ol>

        <h3>Resolution Upscalers (FSR/DLSS)</h3>
        <div className="warning">
          <p><strong>Do NOT use resolution upscalers like FSR or DLSS with this modlist.</strong> They can cause visual artifacts and instability with the ENB preset and are not supported.</p>
        </div>
      </div>
    </>
  );
};

export default Performance;
