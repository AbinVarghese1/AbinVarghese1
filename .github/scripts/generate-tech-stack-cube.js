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
  // Create SVG with proper CSS 3D transforms
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="500" height="500">
    <defs>
      <!-- Define the tech icons -->
      ${techIcons.map((icon, i) => `
      <pattern id="icon-${i}" patternUnits="userSpaceOnUse" width="100" height="100">
        <image href="${icon}" x="15" y="15" width="70" height="70" />
      </pattern>`).join('')}
      
      <style>
        @keyframes rotate {
          0% { transform: rotate3d(1, 1, 0, 0deg); }
          100% { transform: rotate3d(1, 1, 0, 360deg); }
        }
        
        .cube-wrapper {
          width: 300px;
          height: 300px;
          perspective: 1000px;
          transform-style: preserve-3d;
        }
        
        .cube {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          transform: translateZ(-100px);
          animation: rotate 15s infinite linear;
        }
        
        .cube__face {
          position: absolute;
          width: 200px;
          height: 200px;
          border: 2px solid #8844ee;
          display: grid;
          grid-template: repeat(2, 1fr) / repeat(2, 1fr);
          gap: 2px;
        }
        
        .cube__face--front  { transform: rotateY(0deg) translateZ(100px); }
        .cube__face--right  { transform: rotateY(90deg) translateZ(100px); }
        .cube__face--back   { transform: rotateY(180deg) translateZ(100px); }
        .cube__face--left   { transform: rotateY(-90deg) translateZ(100px); }
        .cube__face--top    { transform: rotateX(90deg) translateZ(100px); }
        .cube__face--bottom { transform: rotateX(-90deg) translateZ(100px); }
        
        .icon-cell {
          width: 100%;
          height: 100%;
          background-color: rgba(42, 42, 64, 0.9);
        }
      </style>
    </defs>
    
    <!-- Group for the 3D cube -->
    <foreignObject x="100" y="100" width="300" height="300">
      <div xmlns="http://www.w3.org/1999/xhtml" style="width: 100%; height: 100%">
        <div class="cube-wrapper">
          <div class="cube">
            <!-- Front face -->
            <div class="cube__face cube__face--front">
              <div class="icon-cell">
                <svg width="100%" height="100%" viewBox="0 0 100 100">
                  <rect width="100" height="100" fill="url(#icon-0)" />
                </svg>
              </div>
              <div class="icon-cell">
                <svg width="100%" height="100%" viewBox="0 0 100 100">
                  <rect width="100" height="100" fill="url(#icon-1)" />
                </svg>
              </div>
              <div class="icon-cell">
                <svg width="100%" height="100%" viewBox="0 0 100 100">
                  <rect width="100" height="100" fill="url(#icon-2)" />
                </svg>
              </div>
              <div class="icon-cell">
                <svg width="100%" height="100%" viewBox="0 0 100 100">
                  <rect width="100" height="100" fill="url(#icon-3)" />
                </svg>
              </div>
            </div>
            
            <!-- Right face -->
            <div class="cube__face cube__face--right">
              <div class="icon-cell">
                <svg width="100%" height="100%" viewBox="0 0 100 100">
                  <rect width="100" height="100" fill="url(#icon-4)" />
                </svg>
              </div>
              <div class="icon-cell">
                <svg width="100%" height="100%" viewBox="0 0 100 100">
                  <rect width="100" height="100" fill="url(#icon-5)" />
                </svg>
              </div>
              <div class="icon-cell">
                <svg width="100%" height="100%" viewBox="0 0 100 100">
                  <rect width="100" height="100" fill="url(#icon-6)" />
                </svg>
              </div>
              <div class="icon-cell">
                <svg width="100%" height="100%" viewBox="0 0 100 100">
                  <rect width="100" height="100" fill="url(#icon-7)" />
                </svg>
              </div>
            </div>
            
            <!-- Back face -->
            <div class="cube__face cube__face--back">
              <div class="icon-cell">
                <svg width="100%" height="100%" viewBox="0 0 100 100">
                  <rect width="100" height="100" fill="url(#icon-8)" />
                </svg>
              </div>
              <div class="icon-cell">
                <svg width="100%" height="100%" viewBox="0 0 100 100">
                  <rect width="100" height="100" fill="url(#icon-9)" />
                </svg>
              </div>
              <div class="icon-cell">
                <svg width="100%" height="100%" viewBox="0 0 100 100">
                  <rect width="100" height="100" fill="url(#icon-10)" />
                </svg>
              </div>
              <div class="icon-cell">
                <svg width="100%" height="100%" viewBox="0 0 100 100">
                  <rect width="100" height="100" fill="url(#icon-11)" />
                </svg>
              </div>
            </div>
            
            <!-- Left face -->
            <div class="cube__face cube__face--left">
              <div class="icon-cell">
                <svg width="100%" height="100%" viewBox="0 0 100 100">
                  <rect width="100" height="100" fill="url(#icon-0)" />
                </svg>
              </div>
              <div class="icon-cell">
                <svg width="100%" height="100%" viewBox="0 0 100 100">
                  <rect width="100" height="100" fill="url(#icon-3)" />
                </svg>
              </div>
              <div class="icon-cell">
                <svg width="100%" height="100%" viewBox="0 0 100 100">
                  <rect width="100" height="100" fill="url(#icon-6)" />
                </svg>
              </div>
              <div class="icon-cell">
                <svg width="100%" height="100%" viewBox="0 0 100 100">
                  <rect width="100" height="100" fill="url(#icon-9)" />
                </svg>
              </div>
            </div>
            
            <!-- Top face -->
            <div class="cube__face cube__face--top">
              <div class="icon-cell">
                <svg width="100%" height="100%" viewBox="0 0 100 100">
                  <rect width="100" height="100" fill="url(#icon-2)" />
                </svg>
              </div>
              <div class="icon-cell">
                <svg width="100%" height="100%" viewBox="0 0 100 100">
                  <rect width="100" height="100" fill="url(#icon-5)" />
                </svg>
              </div>
              <div class="icon-cell">
                <svg width="100%" height="100%" viewBox="0 0 100 100">
                  <rect width="100" height="100" fill="url(#icon-8)" />
                </svg>
              </div>
              <div class="icon-cell">
                <svg width="100%" height="100%" viewBox="0 0 100 100">
                  <rect width="100" height="100" fill="url(#icon-11)" />
                </svg>
              </div>
            </div>
            
            <!-- Bottom face -->
            <div class="cube__face cube__face--bottom">
              <div class="icon-cell">
                <svg width="100%" height="100%" viewBox="0 0 100 100">
                  <rect width="100" height="100" fill="url(#icon-1)" />
                </svg>
              </div>
              <div class="icon-cell">
                <svg width="100%" height="100%" viewBox="0 0 100 100">
                  <rect width="100" height="100" fill="url(#icon-4)" />
                </svg>
              </div>
              <div class="icon-cell">
                <svg width="100%" height="100%" viewBox="0 0 100 100">
                  <rect width="100" height="100" fill="url(#icon-7)" />
                </svg>
              </div>
              <div class="icon-cell">
                <svg width="100%" height="100%" viewBox="0 0 100 100">
                  <rect width="100" height="100" fill="url(#icon-10)" />
                </svg>
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
