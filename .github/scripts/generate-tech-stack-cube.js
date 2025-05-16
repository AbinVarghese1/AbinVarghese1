const fs = require('fs');
const path = require('path');
const https = require('https');

// Tech stack icons using devicon URLs
const techIcons = [
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg',
  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg',
];

// Icon names for alt text (matching the order of techIcons)
const iconNames = [
  'Android',
  'C',
  'Figma',
  'Firebase',
  'Flutter',
  'Google Cloud',
  'Java',
  'Pandas',
  'Python',
  'Dart',
  'Android Studio',
  'Arduino'
];

// Function to download SVG content from URL
function downloadSvg(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      // Check if the response is successful
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        return;
      }
      
      let data = '';
      
      // Collect data chunks
      response.on('data', (chunk) => {
        data += chunk;
      });
      
      // When complete, resolve with the data
      response.on('end', () => {
        resolve(data);
      });
      
      // Handle errors
      response.on('error', (error) => {
        reject(error);
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
}

// Function to convert SVG string to data URL
function svgToDataUrl(svgString) {
  // Base64 encode the SVG string
  const base64 = Buffer.from(svgString).toString('base64');
  // Create a data URL
  return `data:image/svg+xml;base64,${base64}`;
}

// Main function to generate the Rubik's cube with embedded icons
async function generateRubiksCubeWithEmbeddedIcons() {
  console.log('Downloading and embedding SVG icons...');
  
  try {
    // Download all SVG icons and convert them to data URLs
    const iconDataUrlPromises = techIcons.map(async (url, index) => {
      try {
        console.log(`Downloading icon ${index + 1}/${techIcons.length}: ${iconNames[index]}`);
        const svgContent = await downloadSvg(url);
        return svgToDataUrl(svgContent);
      } catch (error) {
        console.error(`Error downloading ${url}: ${error.message}`);
        // Return a fallback or placeholder in case of error
        return `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTAiPiR7aWNvbk5hbWVzW2luZGV4XX08L3RleHQ+PC9zdmc+`;
      }
    });
    
    const iconDataUrls = await Promise.all(iconDataUrlPromises);
    
    console.log('All icons downloaded and converted to data URLs');
    
    // Create SVG with embedded icons - INCREASED CUBE SIZE AND ADJUSTED POSITIONING
    let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
      <defs>
        <style>
          @keyframes rotate {
            0% { transform: rotate3d(1, 1, 0, 0deg); }
            100% { transform: rotate3d(1, 1, 0, 360deg); }
          }
          
          .cube-container {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
          }
          
          .cube-wrapper {
            width: 800px;
            height: 800px;
            perspective: 2200px;
            transform-style: preserve-3d;
          }
          
          .cube {
            width: 100%;
            height: 100%;
            position: relative;
            transform-style: preserve-3d;
            transform: translateZ(-180px);
            animation: rotate 15s infinite linear;
          }
          
          .cube__face {
            position: absolute;
            width: 360px;
            height: 360px;
            border: 3px solid #8844ee;
            display: grid;
            grid-template: repeat(2, 1fr) / repeat(2, 1fr);
            gap: 3px;
            left: 220px;
            top: 220px;
          }
          
          .cube__face--front  { transform: rotateY(0deg) translateZ(180px); }
          .cube__face--right  { transform: rotateY(90deg) translateZ(180px); }
          .cube__face--back   { transform: rotateY(180deg) translateZ(180px); }
          .cube__face--left   { transform: rotateY(-90deg) translateZ(180px); }
          .cube__face--top    { transform: rotateX(90deg) translateZ(180px); }
          .cube__face--bottom { transform: rotateX(-90deg) translateZ(180px); }
          
          .icon-cell {
            width: 100%;
            height: 100%;
            background-color: rgba(42, 42, 64, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .tech-icon {
            width: 70%;
            height: 70%;
          }
        </style>
      </defs>
      
      <!-- Group for the 3D cube - centered in the available space -->
      <foreignObject x="0" y="0" width="900" height="900">
        <div xmlns="http://www.w3.org/1999/xhtml" class="cube-container">
          <div class="cube-wrapper">
            <div class="cube">
              <!-- Front face -->
              <div class="cube__face cube__face--front">
                <div class="icon-cell">
                  <img class="tech-icon" src="${iconDataUrls[0]}" alt="${iconNames[0]}" />
                </div>
                <div class="icon-cell">
                  <img class="tech-icon" src="${iconDataUrls[1]}" alt="${iconNames[1]}" />
                </div>
                <div class="icon-cell">
                  <img class="tech-icon" src="${iconDataUrls[2]}" alt="${iconNames[2]}" />
                </div>
                <div class="icon-cell">
                  <img class="tech-icon" src="${iconDataUrls[3]}" alt="${iconNames[3]}" />
                </div>
              </div>
              
              <!-- Right face -->
              <div class="cube__face cube__face--right">
                <div class="icon-cell">
                  <img class="tech-icon" src="${iconDataUrls[4]}" alt="${iconNames[4]}" />
                </div>
                <div class="icon-cell">
                  <img class="tech-icon" src="${iconDataUrls[5]}" alt="${iconNames[5]}" />
                </div>
                <div class="icon-cell">
                  <img class="tech-icon" src="${iconDataUrls[6]}" alt="${iconNames[6]}" />
                </div>
                <div class="icon-cell">
                  <img class="tech-icon" src="${iconDataUrls[7]}" alt="${iconNames[7]}" />
                </div>
              </div>
              
              <!-- Back face -->
              <div class="cube__face cube__face--back">
                <div class="icon-cell">
                  <img class="tech-icon" src="${iconDataUrls[8]}" alt="${iconNames[8]}" />
                </div>
                <div class="icon-cell">
                  <img class="tech-icon" src="${iconDataUrls[9]}" alt="${iconNames[9]}" />
                </div>
                <div class="icon-cell">
                  <img class="tech-icon" src="${iconDataUrls[10]}" alt="${iconNames[10]}" />
                </div>
                <div class="icon-cell">
                  <img class="tech-icon" src="${iconDataUrls[11]}" alt="${iconNames[11]}" />
                </div>
              </div>
              
              <!-- Left face -->
              <div class="cube__face cube__face--left">
                <div class="icon-cell">
                  <img class="tech-icon" src="${iconDataUrls[0]}" alt="${iconNames[0]}" />
                </div>
                <div class="icon-cell">
                  <img class="tech-icon" src="${iconDataUrls[3]}" alt="${iconNames[3]}" />
                </div>
                <div class="icon-cell">
                  <img class="tech-icon" src="${iconDataUrls[6]}" alt="${iconNames[6]}" />
                </div>
                <div class="icon-cell">
                  <img class="tech-icon" src="${iconDataUrls[9]}" alt="${iconNames[9]}" />
                </div>
              </div>
              
              <!-- Top face -->
              <div class="cube__face cube__face--top">
                <div class="icon-cell">
                  <img class="tech-icon" src="${iconDataUrls[2]}" alt="${iconNames[2]}" />
                </div>
                <div class="icon-cell">
                  <img class="tech-icon" src="${iconDataUrls[5]}" alt="${iconNames[5]}" />
                </div>
                <div class="icon-cell">
                  <img class="tech-icon" src="${iconDataUrls[8]}" alt="${iconNames[8]}" />
                </div>
                <div class="icon-cell">
                  <img class="tech-icon" src="${iconDataUrls[11]}" alt="${iconNames[11]}" />
                </div>
              </div>
              
              <!-- Bottom face -->
              <div class="cube__face cube__face--bottom">
                <div class="icon-cell">
                  <img class="tech-icon" src="${iconDataUrls[1]}" alt="${iconNames[1]}" />
                </div>
                <div class="icon-cell">
                  <img class="tech-icon" src="${iconDataUrls[4]}" alt="${iconNames[4]}" />
                </div>
                <div class="icon-cell">
                  <img class="tech-icon" src="${iconDataUrls[7]}" alt="${iconNames[7]}" />
                </div>
                <div class="icon-cell">
                  <img class="tech-icon" src="${iconDataUrls[10]}" alt="${iconNames[10]}" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </foreignObject>
    </svg>`;
    
    // Write the SVG file
    fs.writeFileSync(path.join(process.cwd(), 'tech-stack-cube.svg'), svg);
    console.log('Rubik\'s cube tech stack SVG with embedded icons generated successfully!');
    
  } catch (error) {
    console.error('Error generating cube:', error);
  }
}

// Run the generator
generateRubiksCubeWithEmbeddedIcons();
