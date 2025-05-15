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
  // Create SVG with both CSS and SVG-native 3D transforms
  // This hybrid approach provides better compatibility
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 500 500">
    <defs>
      <!-- Define filters for 3D effect -->
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="2" stdDeviation="4" flood-opacity="0.3"/>
      </filter>
      
      <!-- Define patterns for the tech icons -->
      ${techIcons.map((icon, i) => `
      <pattern id="tech-${i}" patternUnits="userSpaceOnUse" width="100" height="100">
        <image href="${icon}" x="15" y="15" width="70" height="70" />
      </pattern>`).join('')}
    </defs>
    
    <style>
      @keyframes rotate3d {
        0% { transform: rotate3d(0.5, 1, 0.3, 0deg); }
        100% { transform: rotate3d(0.5, 1, 0.3, 360deg); }
      }
      
      .cube {
        transform-style: preserve-3d;
        transform-origin: 250px 250px;
        animation: rotate3d 20s infinite linear;
      }
      
      .face {
        stroke: #8844ee;
        stroke-width: 2px;
        filter: url(#shadow);
      }
    </style>
    
    <!-- Cube group with animation -->
    <g class="cube">
      <!-- Front face -->
      <g transform="translate(150, 150)">
        <rect class="face" width="200" height="200" fill="#2a2a40" />
        <!-- 2x2 grid of cells with tech icons -->
        <rect x="0" y="0" width="100" height="100" fill="url(#tech-0)" stroke="#8844ee" />
        <rect x="100" y="0" width="100" height="100" fill="url(#tech-1)" stroke="#8844ee" />
        <rect x="0" y="100" width="100" height="100" fill="url(#tech-2)" stroke="#8844ee" />
        <rect x="100" y="100" width="100" height="100" fill="url(#tech-3)" stroke="#8844ee" />
      </g>
      
      <!-- Right face - with skew transform -->
      <g transform="translate(350, 150) skewY(45) scale(0.707, 1)">
        <rect class="face" width="200" height="200" fill="#252538" />
        <!-- 2x2 grid of cells with tech icons -->
        <rect x="0" y="0" width="100" height="100" fill="url(#tech-4)" stroke="#8844ee" />
        <rect x="100" y="0" width="100" height="100" fill="url(#tech-5)" stroke="#8844ee" />
        <rect x="0" y="100" width="100" height="100" fill="url(#tech-6)" stroke="#8844ee" />
        <rect x="100" y="100" width="100" height="100" fill="url(#tech-7)" stroke="#8844ee" />
      </g>
      
      <!-- Top face - with skew transform -->
      <g transform="translate(150, 150) skewX(45) scale(1, 0.707)">
        <rect class="face" width="200" height="200" fill="#1f1f30" />
        <!-- 2x2 grid of cells with tech icons -->
        <rect x="0" y="0" width="100" height="100" fill="url(#tech-8)" stroke="#8844ee" />
        <rect x="100" y="0" width="100" height="100" fill="url(#tech-9)" stroke="#8844ee" />
        <rect x="0" y="100" width="100" height="100" fill="url(#tech-10)" stroke="#8844ee" />
        <rect x="100" y="100" width="100" height="100" fill="url(#tech-11)" stroke="#8844ee" />
      </g>
    </g>
  </svg>`;
  
  // Write the SVG file
  fs.writeFileSync(path.join(process.cwd(), 'tech-stack-cube.svg'), svg);
  console.log('Rubik\'s cube tech stack SVG generated successfully!');
}

// Run the generator
generateRubiksCube();
