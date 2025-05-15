const fs = require('fs');
const path = require('path');

// Function to generate a tech stack cube SVG
function generateRubiksCube() {
  // Create SVG with pure SVG animations and transformations
  // This version avoids using external icon URLs for GitHub compatibility
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 500 500">
  <defs>
    <!-- Define filters for 3D effect -->
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="2" dy="2" stdDeviation="4" flood-opacity="0.3"/>
    </filter>
    
    <!-- Define tech icons as embedded SVG elements to avoid external dependencies -->
    <pattern id="tech-0" patternUnits="userSpaceOnUse" width="100" height="100">
      <rect width="100" height="100" fill="#2a2a40"/>
      <circle cx="50" cy="40" r="25" fill="#3DDC84"/>
      <text x="50" y="85" font-family="Arial" font-size="14" fill="#fff" text-anchor="middle">Android</text>
    </pattern>
    <pattern id="tech-1" patternUnits="userSpaceOnUse" width="100" height="100">
      <rect width="100" height="100" fill="#2a2a40"/>
      <text x="50" y="50" font-family="Arial" font-size="40" fill="#00599C" text-anchor="middle" dominant-baseline="middle">C</text>
      <text x="50" y="85" font-family="Arial" font-size="14" fill="#fff" text-anchor="middle">C</text>
    </pattern>
    <pattern id="tech-2" patternUnits="userSpaceOnUse" width="100" height="100">
      <rect width="100" height="100" fill="#2a2a40"/>
      <rect x="30" y="30" width="40" height="40" rx="5" fill="#F24E1E"/>
      <text x="50" y="85" font-family="Arial" font-size="14" fill="#fff" text-anchor="middle">Figma</text>
    </pattern>
    <pattern id="tech-3" patternUnits="userSpaceOnUse" width="100" height="100">
      <rect width="100" height="100" fill="#2a2a40"/>
      <polygon points="50,30 65,55 50,80 35,55" fill="#FFCA28"/>
      <text x="50" y="85" font-family="Arial" font-size="14" fill="#fff" text-anchor="middle">Firebase</text>
    </pattern>
    <pattern id="tech-4" patternUnits="userSpaceOnUse" width="100" height="100">
      <rect width="100" height="100" fill="#2a2a40"/>
      <rect x="35" y="25" width="30" height="50" rx="5" fill="#02569B"/>
      <text x="50" y="85" font-family="Arial" font-size="14" fill="#fff" text-anchor="middle">Flutter</text>
    </pattern>
    <pattern id="tech-5" patternUnits="userSpaceOnUse" width="100" height="100">
      <rect width="100" height="100" fill="#2a2a40"/>
      <rect x="30" y="30" width="40" height="40" rx="5" fill="#4285F4"/>
      <text x="50" y="85" font-family="Arial" font-size="14" fill="#fff" text-anchor="middle">GCloud</text>
    </pattern>
    <pattern id="tech-6" patternUnits="userSpaceOnUse" width="100" height="100">
      <rect width="100" height="100" fill="#2a2a40"/>
      <circle cx="50" cy="40" r="25" fill="#007396"/>
      <text x="50" y="85" font-family="Arial" font-size="14" fill="#fff" text-anchor="middle">Java</text>
    </pattern>
    <pattern id="tech-7" patternUnits="userSpaceOnUse" width="100" height="100">
      <rect width="100" height="100" fill="#2a2a40"/>
      <rect x="30" y="30" width="40" height="40" rx="5" fill="#150458"/>
      <text x="50" y="85" font-family="Arial" font-size="14" fill="#fff" text-anchor="middle">Pandas</text>
    </pattern>
    <pattern id="tech-8" patternUnits="userSpaceOnUse" width="100" height="100">
      <rect width="100" height="100" fill="#2a2a40"/>
      <circle cx="50" cy="40" r="25" fill="#3776AB"/>
      <text x="50" y="85" font-family="Arial" font-size="14" fill="#fff" text-anchor="middle">Python</text>
    </pattern>
    <pattern id="tech-9" patternUnits="userSpaceOnUse" width="100" height="100">
      <rect width="100" height="100" fill="#2a2a40"/>
      <polygon points="50,30 65,55 50,80 35,55" fill="#0175C2"/>
      <text x="50" y="85" font-family="Arial" font-size="14" fill="#fff" text-anchor="middle">Dart</text>
    </pattern>
    <pattern id="tech-10" patternUnits="userSpaceOnUse" width="100" height="100">
      <rect width="100" height="100" fill="#2a2a40"/>
      <rect x="30" y="30" width="40" height="30" rx="5" fill="#3DDC84"/>
      <text x="50" y="85" font-family="Arial" font-size="12" fill="#fff" text-anchor="middle">Android Studio</text>
    </pattern>
    <pattern id="tech-11" patternUnits="userSpaceOnUse" width="100" height="100">
      <rect width="100" height="100" fill="#2a2a40"/>
      <circle cx="50" cy="40" r="25" fill="#00979D"/>
      <text x="50" y="85" font-family="Arial" font-size="14" fill="#fff" text-anchor="middle">Arduino</text>
    </pattern>
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
