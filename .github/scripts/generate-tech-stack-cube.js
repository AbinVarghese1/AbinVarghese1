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

// Generate a true 3D SVG Rubik's cube with tech icons
function generateRubiksCube() {
  const svgWidth = 500;
  const svgHeight = 500;
  const cubeSize = 200;
  
  // Create SVG header with proper 3D CSS transformations
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${svgWidth} ${svgHeight}">
  <defs>
    <!-- Define pattern for each tech icon -->
    ${techIcons.map((icon, index) => `
    <pattern id="icon-${index}" patternUnits="userSpaceOnUse" width="80" height="80">
      <image href="${icon}" width="80" height="80" />
    </pattern>
    `).join('')}
  </defs>
  
  <style>
    @keyframes rotate {
      0% { transform: rotate3d(1, 1, 0, 30deg); }
      25% { transform: rotate3d(0, 1, 0, 120deg); }
      50% { transform: rotate3d(1, 0, 1, 210deg); }
      75% { transform: rotate3d(0, 1, 1, 300deg); }
      100% { transform: rotate3d(1, 1, 0, 390deg); }
    }
    .cube-container {
      transform-style: preserve-3d;
      perspective: 1200px;
      perspective-origin: center;
    }
    .cube {
      transform-style: preserve-3d;
      transform-origin: ${cubeSize/2}px ${cubeSize/2}px ${-cubeSize/2}px;
      animation: rotate 20s infinite linear;
    }
    .face {
      position: absolute;
      width: ${cubeSize}px;
      height: ${cubeSize}px;
      stroke: #8844ee;
      stroke-width: 2;
      stroke-linejoin: round;
    }
    .front { transform: translateZ(${cubeSize/2}px); }
    .back { transform: rotateY(180deg) translateZ(${cubeSize/2}px); }
    .right { transform: rotateY(90deg) translateZ(${cubeSize/2}px); }
    .left { transform: rotateY(-90deg) translateZ(${cubeSize/2}px); }
    .top { transform: rotateX(90deg) translateZ(${cubeSize/2}px); }
    .bottom { transform: rotateX(-90deg) translateZ(${cubeSize/2}px); }
    
    /* Grid cells for each face */
    .cell {
      width: ${cubeSize/2}px;
      height: ${cubeSize/2}px;
      stroke: #8844ee;
      stroke-width: 1;
    }
  </style>
  
  <!-- Center the drawing -->
  <g transform="translate(${svgWidth/2 - cubeSize/2}, ${svgHeight/2 - cubeSize/2})">
    <!-- The 3D cube with animation -->
    <g class="cube-container">
      <g class="cube">
        <!-- Front face -->
        <g class="face front">
          <rect width="${cubeSize}" height="${cubeSize}" fill="#2a2a40" />
          <rect x="0" y="0" width="${cubeSize/2}" height="${cubeSize/2}" fill="url(#icon-0)" class="cell" />
          <rect x="${cubeSize/2}" y="0" width="${cubeSize/2}" height="${cubeSize/2}" fill="url(#icon-1)" class="cell" />
          <rect x="0" y="${cubeSize/2}" width="${cubeSize/2}" height="${cubeSize/2}" fill="url(#icon-2)" class="cell" />
          <rect x="${cubeSize/2}" y="${cubeSize/2}" width="${cubeSize/2}" height="${cubeSize/2}" fill="url(#icon-3)" class="cell" />
        </g>
        
        <!-- Back face -->
        <g class="face back">
          <rect width="${cubeSize}" height="${cubeSize}" fill="#222234" />
          <!-- Mirror pattern for back face for visual interest -->
          <rect x="0" y="0" width="${cubeSize/2}" height="${cubeSize/2}" fill="url(#icon-4)" class="cell" />
          <rect x="${cubeSize/2}" y="0" width="${cubeSize/2}" height="${cubeSize/2}" fill="url(#icon-5)" class="cell" />
          <rect x="0" y="${cubeSize/2}" width="${cubeSize/2}" height="${cubeSize/2}" fill="url(#icon-6)" class="cell" />
          <rect x="${cubeSize/2}" y="${cubeSize/2}" width="${cubeSize/2}" height="${cubeSize/2}" fill="url(#icon-7)" class="cell" />
        </g>
        
        <!-- Right face -->
        <g class="face right">
          <rect width="${cubeSize}" height="${cubeSize}" fill="#252538" />
          <rect x="0" y="0" width="${cubeSize/2}" height="${cubeSize/2}" fill="url(#icon-8)" class="cell" />
          <rect x="${cubeSize/2}" y="0" width="${cubeSize/2}" height="${cubeSize/2}" fill="url(#icon-9)" class="cell" />
          <rect x="0" y="${cubeSize/2}" width="${cubeSize/2}" height="${cubeSize/2}" fill="url(#icon-10)" class="cell" />
          <rect x="${cubeSize/2}" y="${cubeSize/2}" width="${cubeSize/2}" height="${cubeSize/2}" fill="url(#icon-11)" class="cell" />
        </g>
        
        <!-- Left face -->
        <g class="face left">
          <rect width="${cubeSize}" height="${cubeSize}" fill="#252538" />
          <!-- Use some icons for visual consistency -->
          <rect x="0" y="0" width="${cubeSize/2}" height="${cubeSize/2}" fill="url(#icon-0)" class="cell" />
          <rect x="${cubeSize/2}" y="0" width="${cubeSize/2}" height="${cubeSize/2}" fill="url(#icon-3)" class="cell" />
          <rect x="0" y="${cubeSize/2}" width="${cubeSize/2}" height="${cubeSize/2}" fill="url(#icon-6)" class="cell" />
          <rect x="${cubeSize/2}" y="${cubeSize/2}" width="${cubeSize/2}" height="${cubeSize/2}" fill="url(#icon-9)" class="cell" />
        </g>
        
        <!-- Top face -->
        <g class="face top">
          <rect width="${cubeSize}" height="${cubeSize}" fill="#1f1f30" />
          <rect x="0" y="0" width="${cubeSize/2}" height="${cubeSize/2}" fill="url(#icon-4)" class="cell" />
          <rect x="${cubeSize/2}" y="0" width="${cubeSize/2}" height="${cubeSize/2}" fill="url(#icon-5)" class="cell" />
          <rect x="0" y="${cubeSize/2}" width="${cubeSize/2}" height="${cubeSize/2}" fill="url(#icon-10)" class="cell" />
          <rect x="${cubeSize/2}" y="${cubeSize/2}" width="${cubeSize/2}" height="${cubeSize/2}" fill="url(#icon-11)" class="cell" />
        </g>
        
        <!-- Bottom face -->
        <g class="face bottom">
          <rect width="${cubeSize}" height="${cubeSize}" fill="#1f1f30" />
          <rect x="0" y="0" width="${cubeSize/2}" height="${cubeSize/2}" fill="url(#icon-2)" class="cell" />
          <rect x="${cubeSize/2}" y="0" width="${cubeSize/2}" height="${cubeSize/2}" fill="url(#icon-7)" class="cell" />
          <rect x="0" y="${cubeSize/2}" width="${cubeSize/2}" height="${cubeSize/2}" fill="url(#icon-8)" class="cell" />
          <rect x="${cubeSize/2}" y="${cubeSize/2}" width="${cubeSize/2}" height="${cubeSize/2}" fill="url(#icon-1)" class="cell" />
        </g>
      </g>
    </g>
  </g>
</svg>`;
  
  // Write the SVG file
  fs.writeFileSync(path.join(process.cwd(), 'tech-stack-cube.svg'), svg);
  console.log('Improved Rubik\'s cube tech stack SVG generated successfully!');
}

// Run the generator
generateRubiksCube();
