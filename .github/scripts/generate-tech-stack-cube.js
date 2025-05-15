const fs = require('fs');
const path = require('path');

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

// Generate a pure SVG Rubik's cube with tech icons
function generateRubiksCube() {
  // Create SVG with proper CSS 3D transforms - significantly increased viewing area
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1200" width="1200" height="1200">
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
          perspective: 2000px;
          transform-style: preserve-3d;
        }
        
        .cube {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          transform: translateZ(-150px);
          animation: rotate 15s infinite linear;
        }
        
        .cube__face {
          position: absolute;
          width: 300px;
          height: 300px;
          border: 3px solid #8844ee;
          display: grid;
          grid-template: repeat(2, 1fr) / repeat(2, 1fr);
          gap: 3px;
          left: 250px;
          top: 250px;
        }
        
        .cube__face--front  { transform: rotateY(0deg) translateZ(150px); }
        .cube__face--right  { transform: rotateY(90deg) translateZ(150px); }
        .cube__face--back   { transform: rotateY(180deg) translateZ(150px); }
        .cube__face--left   { transform: rotateY(-90deg) translateZ(150px); }
        .cube__face--top    { transform: rotateX(90deg) translateZ(150px); }
        .cube__face--bottom { transform: rotateX(-90deg) translateZ(150px); }
        
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
    
    <!-- Group for the 3D cube - much larger viewing area with proper centering -->
    <foreignObject x="0" y="0" width="1200" height="1200">
      <div xmlns="http://www.w3.org/1999/xhtml" class="cube-container">
        <div class="cube-wrapper">
          <div class="cube">
            <!-- Front face -->
            <div class="cube__face cube__face--front">
              <div class="icon-cell">
                <img class="tech-icon" src="${techIcons[0]}" alt="Android" />
              </div>
              <div class="icon-cell">
                <img class="tech-icon" src="${techIcons[1]}" alt="C" />
              </div>
              <div class="icon-cell">
                <img class="tech-icon" src="${techIcons[2]}" alt="Figma" />
              </div>
              <div class="icon-cell">
                <img class="tech-icon" src="${techIcons[3]}" alt="Firebase" />
              </div>
            </div>
            
            <!-- Right face -->
            <div class="cube__face cube__face--right">
              <div class="icon-cell">
                <img class="tech-icon" src="${techIcons[4]}" alt="Flutter" />
              </div>
              <div class="icon-cell">
                <img class="tech-icon" src="${techIcons[5]}" alt="Google Cloud" />
              </div>
              <div class="icon-cell">
                <img class="tech-icon" src="${techIcons[6]}" alt="Java" />
              </div>
              <div class="icon-cell">
                <img class="tech-icon" src="${techIcons[7]}" alt="Pandas" />
              </div>
            </div>
            
            <!-- Back face -->
            <div class="cube__face cube__face--back">
              <div class="icon-cell">
                <img class="tech-icon" src="${techIcons[8]}" alt="Python" />
              </div>
              <div class="icon-cell">
                <img class="tech-icon" src="${techIcons[9]}" alt="Dart" />
              </div>
              <div class="icon-cell">
                <img class="tech-icon" src="${techIcons[10]}" alt="Android Studio" />
              </div>
              <div class="icon-cell">
                <img class="tech-icon" src="${techIcons[11]}" alt="Arduino" />
              </div>
            </div>
            
            <!-- Left face -->
            <div class="cube__face cube__face--left">
              <div class="icon-cell">
                <img class="tech-icon" src="${techIcons[0]}" alt="Android" />
              </div>
              <div class="icon-cell">
                <img class="tech-icon" src="${techIcons[3]}" alt="Firebase" />
              </div>
              <div class="icon-cell">
                <img class="tech-icon" src="${techIcons[6]}" alt="Java" />
              </div>
              <div class="icon-cell">
                <img class="tech-icon" src="${techIcons[9]}" alt="Dart" />
              </div>
            </div>
            
            <!-- Top face -->
            <div class="cube__face cube__face--top">
              <div class="icon-cell">
                <img class="tech-icon" src="${techIcons[2]}" alt="Figma" />
              </div>
              <div class="icon-cell">
                <img class="tech-icon" src="${techIcons[5]}" alt="Google Cloud" />
              </div>
              <div class="icon-cell">
                <img class="tech-icon" src="${techIcons[8]}" alt="Python" />
              </div>
              <div class="icon-cell">
                <img class="tech-icon" src="${techIcons[11]}" alt="Arduino" />
              </div>
            </div>
            
            <!-- Bottom face -->
            <div class="cube__face cube__face--bottom">
              <div class="icon-cell">
                <img class="tech-icon" src="${techIcons[1]}" alt="C" />
              </div>
              <div class="icon-cell">
                <img class="tech-icon" src="${techIcons[4]}" alt="Flutter" />
              </div>
              <div class="icon-cell">
                <img class="tech-icon" src="${techIcons[7]}" alt="Pandas" />
              </div>
              <div class="icon-cell">
                <img class="tech-icon" src="${techIcons[10]}" alt="Android Studio" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </foreignObject>
  </svg>`;
  
  // Write the SVG file
  fs.writeFileSync(path.join(process.cwd(), 'tech-stack-cube.svg'), svg);
  console.log('Rubik\'s cube tech stack SVG generated successfully!');
}

// Run the generator
generateRubiksCube();
