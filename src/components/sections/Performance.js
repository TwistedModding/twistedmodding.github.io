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
          <li>Make sure you are on the <code>Basic</code> tab
            <ul>
              <li>Resolution: Set this to your monitor's native resolution</li>
              <li>Windowed Mode: Borderless Windowed</li>
              <li>Antialiasing: TAA</li>
            </ul>
          </li>
          <li>Go to the <code>Shadows</code> tab
            <ul>
              <li>Shadow Resolution: 2048 is fine for most systems</li>
              <li>Detailed Draw Distance: 2000 </li>
              <li>Exterior Draw Distance: 4000</li>
            </ul>
          </li>
          <li>Go to the <code>Visuals</code> tab
            <ul>
              <li>Godrays: Low</li>
              <li>SSR Resolution Divider: 4</li>
            </ul>
          </li>
          <li>Click the <code>View Distance</code> tab</li>
            <ul>
              <li>Level 4 Block Distance: 80000</li>
              <li>Level 8 Block Distance: 120000</li>
              <li>Level 16 Block Distance: 160000</li>
            </ul>
          <li>Once you have made your changes, click `File` and `Save` then close Bethini</li>
        </ol>

        <h3>ENB Modifications</h3>
        <p>The ENB preset included with Twisted Skyrim can be performance intensive. Here are some options to improve performance:</p>

        <h4>Adjusting ENB Settings</h4>
        <p>Open the <code>enbseries.ini</code> located at <code>C:\Twisted Skyrim\Stock Game</code></p>
        <ul>
          <li><strong>Ambient Occlusion:</strong> Start by changing <code>SourceTexturesScale=0.5</code> to <code>SourceTexturesScale=0.25</code>. If that isn't enough set <code>EnableAmbientOcclusion=true</code> to <code>EnableAmbientOcclusion=false</code></li>
          <li>The rest of the ENB effects do take performance hits, but they are all mostly minor and just add up. When in game, open the menu using <code>Shift + Enter</code> to access the ENB settings and try enabling/disabling certain effects until you are happy with both visuals and performnace.</li>
        </ul>

        <h4>Tintmask Resolution Changes</h4>
        <p>Lowering tintmask resolution can improve performance with minimal visual impact:</p>
        <ol>
          <li>Go to <code>C:\Twisted Skyrim\mods\Vanilla Warpaints Absolution\SKSE</code></li>
          <li>Open <code>SKSE.ini</code></li>
          <li>Change <code>iTintTextureResolution=2048</code> to <code>iTintTextureResolution=512</code></li>
          <li>Save the file and close it.</li>
        </ol>

        <h3>LOD Generation</h3>
        <p>Twisted Skyrim includes pre-generated LODs, but you can regenerate them for better performance or quality. <strong>This process is very advanced and time-consuming.</strong></p>

        <div className="warning">
          <h4>Before You Begin</h4>
          <p><strong>LOD generation is an advanced process that can take several hours. Only proceed if you are comfortable with technical procedures and have significant free time.</strong></p>
          <p>You will need at least 100GB of free space on your installation drive for temporary files.</p>
        </div>

        <div className="warning">
          <h4>Preface</h4>
          <ol>
            <li>Go to <code>C:\Twisted Skyrim\mods\Texgen Output</code> and delete everything inside.</li>
            <li>Go to <code>C:\Twisted Skyrim\mods\DynDOLOD Output</code> and delete everything inside.</li>
            <li>Go to <code>C:\Twisted Skyrim\mods\Twisted's Configs\SKSE\Plugins</code> open <code>GrassControl.ini</code> and change <code>DynDOLOD-Grass-Mode = 1</code> to <code>DynDOLOD-Grass-Mode = 0</code></li>
          </ol>
        </div>

        <h4>TexGen</h4>
        <ol>
          <li>In Mod Organizer, select <strong>TexGen</strong> from the executable dropdown</li>
          <li>Ignore all warnings that pop up while its starting.</li>
          <li>Make sure the options match the following screenshot exactly then click <code>Start</code>.</li>
          <li><strong>Ignore all warnings that occur during generation.</strong></li>
          <li>After generation is complete, the files should end up in <code>C:\Twisted Skyrim\tools\DynDOLOD\TexGen_Output</code>. Cut and paste them into <code>C:\Twisted Skyrim\mods\Texgen Output</code>.</li>
          <li>Enable the mod in MO2 and hit <code>F5</code> to refresh the mod list.</li>
        </ol>

        <div className="image-embed">
          <img 
            src="https://raw.githubusercontent.com/Oghma-Infinium/Twisted-Skyrim/main/performance%20guide/TexGenx64_Z8P6p3wxGE.png" 
            alt="TexGen settings"
          />
        </div>

        <h4>DynDOLOD</h4>
        <ol>
          <li>In Mod Organizer, select <strong>DynDOLOD</strong> from the executable dropdown</li>
          <li>Ignore all warnings that pop up while its starting.</li>
          <li>Make sure the options match the following screenshot exactly, making sure that all the worldspaces in the top left are selected. Afterwards, click <code>Start</code>.</li>
          <li><strong>Ignore all warnings that occur during generation.</strong></li>
          <li>After generation is complete, the files should end up in <code>C:\Twisted Skyrim\tools\DynDOLOD\DynDOLOD_Output</code>. Cut and paste them into <code>C:\Twisted Skyrim\mods\DynDOLOD Output</code>.</li>
          <li>Enable the mod in MO2 and hit <code>F5</code> to refresh the mod list.</li>
          <li>Enable the .esps in the plugin panel of MO2.</li>
          <li>Make sure <code>DynDOLOD.esm</code> is loaded as late as possible(after all other master files). Make sure <code>PG_1.esp</code>, <code>DynDOLOD.esp</code> and <code>Occlusion.esp</code> are also loaded late, in that order.</li>
        </ol>

        <div className="image-embed">
          <img 
            src="https://raw.githubusercontent.com/Oghma-Infinium/Twisted-Skyrim/refs/heads/main/performance%20guide/DynDOLODx64_Yi1zUU12l6.png" 
            alt="DynDOLOD settings"
          />
        </div>

        <div className="warning">
          <h4>Important Notes on LOD Generation</h4>
          <ul>
            <li>Always generate TexGen before DynDOLOD</li>
            <li>Never run these tools outside of Mod Organizer</li>
            <li>Keep the original LODs as backup in case something goes wrong</li>
          </ul>
        </div>

        <h3>Resolution Upscalers (FSR/DLSS)</h3>
        <div className="warning">
          <p><strong>Do NOT use resolution upscalers like FSR or DLSS with this modlist.</strong> They can cause visual artifacts and instability with the ENB preset and are not supported.</p>
        </div>
      </div>
    </>
  );
};

export default Performance;
