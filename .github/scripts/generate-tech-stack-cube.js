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
  const svgWidth = 400;
  const svgHeight = 400;
  const cubeSize = 200;
  
  // Create SVG header with 3D transformations
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${svgWidth} ${svgHeight}" width="${svgWidth}" height="${svgHeight}">
  <style>
    @keyframes rotate {
      0% { transform: rotateX(-30deg) rotateY(45deg); }
      50% { transform: rotateX(-30deg) rotateY(225deg); }
      100% { transform: rotateX(-30deg) rotateY(405deg); }
    }
    .cube {
      transform-style: preserve-3d;
      transform-origin: 100px 100px 0;
      animation: rotate 20s infinite linear;
    }
    .face {
      stroke: #8844ee;
      stroke-width: 2;
    }
  </style>
  
  <!-- Center the drawing -->
  <g transform="translate(${svgWidth/2 - cubeSize/2}, ${svgHeight/2 - cubeSize/2})">
    <!-- The cube with animation -->
    <g class="cube">
      <!-- Front face -->
      <g transform="translate(0, 0)" class="face">
        <polygon points="0,0 ${cubeSize},0 ${cubeSize},${cubeSize} 0,${cubeSize}" fill="#2a2a40" />
        <image x="25" y="25" width="70" height="70" href="${techIcons[0]}" />
        <image x="105" y="25" width="70" height="70" href="${techIcons[1]}" />
        <image x="25" y="105" width="70" height="70" href="${techIcons[2]}" />
        <image x="105" y="105" width="70" height="70" href="${techIcons[3]}" />
      </g>
      
      <!-- Right face -->
      <g transform="translate(${cubeSize}, 0) skewY(45) scale(0.707, 1)" class="face">
        <polygon points="0,0 ${cubeSize},0 ${cubeSize},${cubeSize} 0,${cubeSize}" fill="#252538" />
        <image x="25" y="25" width="70" height="70" href="${techIcons[4]}" />
        <image x="105" y="25" width="70" height="70" href="${techIcons[5]}" />
        <image x="25" y="105" width="70" height="70" href="${techIcons[6]}" />
        <image x="105" y="105" width="70" height="70" href="${techIcons[7]}" />
      </g>
      
      <!-- Top face -->
      <g transform="translate(0, 0) skewX(45) scale(1, 0.707)" class="face">
        <polygon points="0,0 ${cubeSize},0 ${cubeSize},${cubeSize} 0,${cubeSize}" fill="#1f1f30" />
        <image x="25" y="25" width="70" height="70" href="${techIcons[8]}" />
        <image x="105" y="25" width="70" height="70" href="${techIcons[9]}" />
        <image x="25" y="105" width="70" height="70" href="${techIcons[10]}" />
        <image x="105" y="105" width="70" height="70" href="${techIcons[11]}" />
      </g>
    </g>
  </g>
</svg>`;
  
  // Write the SVG file
  fs.writeFileSync(path.join(process.cwd(), 'tech-stack-cube.svg'), svg);
  console.log('Rubik\'s cube tech stack SVG generated successfully!');
}

// Run the generator
generateRubiksCube();
