const fs = require('fs');
const path = require('path');

// Tech stack icons - using proper URLs that will render correctly
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

// Generate a pure SVG version of the rotating cube
function generateSVG() {
  const svgWidth = 800;
  const svgHeight = 400;
  const cubeSize = 200;
  
  // Create SVG header with animations for 3D cube
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${svgWidth} ${svgHeight}" width="${svgWidth}" height="${svgHeight}">
  <defs>
    <!-- Define gradients for cube faces -->
    <linearGradient id="frontGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2d2d3d" />
      <stop offset="100%" stop-color="#1a1a2e" />
    </linearGradient>
    <linearGradient id="rightGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#252535" />
      <stop offset="100%" stop-color="#111122" />
    </linearGradient>
    <linearGradient id="topGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#353545" />
      <stop offset="100%" stop-color="#1f1f2f" />
    </linearGradient>
  </defs>
  
  <style>
    @keyframes rotateCube {
      0% { transform: rotateX(15deg) rotateY(0deg); }
      50% { transform: rotateX(15deg) rotateY(180deg); }
      100% { transform: rotateX(15deg) rotateY(360deg); }
    }
    
    .cube {
      animation: rotateCube 20s infinite linear;
      transform-origin: 400px 200px;
    }
    
    .face {
      stroke: #8844ee;
      stroke-width: 2;
    }
    
    .title {
      font-family: Arial, sans-serif;
      font-size: 32px;
      font-weight: bold;
      fill: #8844ee;
      text-anchor: middle;
    }
  </style>
  
  <!-- Background -->
  <rect width="${svgWidth}" height="${svgHeight}" fill="#0d1117" />
  
  <!-- Title -->
  <text x="${svgWidth/2}" y="50" class="title">Tech Stack</text>
  
  <!-- Container for 3D transformation -->
  <g class="cube" transform-origin="400 200">
`;

  // Create cube faces
  // Front face
  svg += `
    <!-- Front face -->
    <g>
      <polygon points="300,150 500,150 500,250 300,250" fill="url(#frontGradient)" class="face" />
      <!-- Front face icons -->
      <image x="320" y="170" width="60" height="60" href="${techIcons[0]}" />
      <image x="420" y="170" width="60" height="60" href="${techIcons[1]}" />
    </g>
  
    <!-- Right face -->
    <g>
      <polygon points="500,150 550,175 550,275 500,250" fill="url(#rightGradient)" class="face" />
      <!-- Right face icons -->
      <image x="505" y="170" width="40" height="40" href="${techIcons[2]}" />
      <image x="505" y="220" width="40" height="40" href="${techIcons[3]}" />
    </g>
  
    <!-- Top face -->
    <g>
      <polygon points="300,150 500,150 550,175 350,175" fill="url(#topGradient)" class="face" />
      <!-- Top face icons -->
      <image x="350" y="145" width="40" height="40" href="${techIcons[4]}" />
      <image x="450" y="145" width="40" height="40" href="${techIcons[5]}" />
    </g>
  
    <!-- Left face (slightly visible during rotation) -->
    <g opacity="0">
      <polygon points="300,150 250,175 250,275 300,250" fill="url(#rightGradient)" class="face" />
      <!-- Left face icons will be visible during animation -->
      <image x="265" y="170" width="40" height="40" href="${techIcons[6]}" />
      <image x="265" y="220" width="40" height="40" href="${techIcons[7]}" />
    </g>
  
    <!-- Bottom face (slightly visible during rotation) -->
    <g opacity="0">
      <polygon points="300,250 500,250 550,275 350,275" fill="url(#topGradient)" class="face" />
      <!-- Bottom face icons will be visible during animation -->
      <image x="350" y="245" width="40" height="40" href="${techIcons[8]}" />
      <image x="450" y="245" width="40" height="40" href="${techIcons[9]}" />
    </g>
    
    <!-- Back face (slightly visible during rotation) -->
    <g opacity="0">
      <polygon points="250,175 450,175 450,275 250,275" fill="url(#frontGradient)" class="face" />
      <!-- Back face icons will be visible during animation -->
      <image x="300" y="195" width="40" height="40" href="${techIcons[10]}" />
      <image x="370" y="195" width="40" height="40" href="${techIcons[11]}" />
    </g>
  </g>
  `;

  // Add a note/guide about the tech stack
  svg += `
  <!-- Tech stack labels -->
  <g transform="translate(110, 330)">
    <text fill="#8844ee" font-family="Arial, sans-serif" font-size="16">Tech Stack: Android, C, Figma, Firebase, Flutter, GCP, Java, Pandas, Python, Dart, Android Studio, Arduino</text>
  </g>
  `;

  // Close SVG
  svg += '</svg>';
  
  // Write the SVG file
  fs.writeFileSync(path.join(process.cwd(), 'tech-stack-cube.svg'), svg);
  console.log('Tech stack cube SVG generated successfully!');
}

// Run the generator
generateSVG();
