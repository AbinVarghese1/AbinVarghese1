const fs = require('fs');
const path = require('path');

// Tech stack data with embedded SVG content for each icon
// These use simplified SVG paths for each tech icon that will work in GitHub
const techIcons = [
  {
    name: 'Android',
    color: '#3DDC84',
    path: 'M15,5H9L12,2L15,5M16,6V16.5C16,17.3 15.3,18 14.5,18A1.5,1.5 0 0,1 13,16.5V10H3V16.5A1.5,1.5 0 0,1 1.5,18A1.5,1.5 0 0,1 0,16.5V6A1,1 0 0,1 1,5H4L7,2H11L14,5H16A1,1 0 0,1 17,6A1,1 0 0,1 16,7'
  },
  {
    name: 'C',
    color: '#A8B9CC',
    path: 'M16.59,5.59L18,7L12,13L6,7L7.41,5.59L12,10.17L16.59,5.59M16.59,11.59L18,13L12,19L6,13L7.41,11.59L12,16.17L16.59,11.59Z'
  },
  {
    name: 'Figma',
    color: '#F24E1E',
    path: 'M15.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm4 5.28c-.39-.24-.87-.4-1.37-.47-.18-.03-.36-.04-.54-.05-.65 0-1.25.2-1.74.57-.5.37-.83.89-.98 1.47H8.87c-.15-.58-.48-1.1-.98-1.47-.5-.37-1.09-.57-1.74-.57-.18.01-.36.02-.54.05-.5.07-.98.23-1.37.47-.79.5-1.31 1.33-1.37 2.22 0 .03-.01.06-.01.09 0 .71.26 1.41.74 1.97s1.15.95 1.87 1.05c.34.05.68.03 1.01-.04.43-.11.83-.32 1.17-.61.58.4 1.25.65 1.97.77.07.01.13.01.2.02.08 0 .16.01.24.01.1 0 .2-.01.3-.02.71-.11 1.38-.36 1.97-.77.34.29.74.5 1.17.61.33.07.67.09 1.01.04.72-.1 1.39-.43 1.87-1.05.47-.56.73-1.26.74-1.97 0-.03-.01-.06-.01-.09-.07-.89-.58-1.72-1.38-2.22zM6.5 9C5.1 9 4 7.9 4 6.5S5.1 4 6.5 4 9 5.1 9 6.5 7.9 9 6.5 9zm9.75 2c0 .97-.78 1.75-1.75 1.75s-1.75-.78-1.75-1.75.78-1.75 1.75-1.75 1.75.78 1.75 1.75z'
  },
  {
    name: 'Firebase',
    color: '#FFCA28',
    path: 'M3.89 15.673L6.255.461A.542.542 0 0 1 7.27.288l2.543 4.771zm16.794 3.691l-2.25-14a.54.54 0 0 0-.919-.295l-14.2 14.294 7.5 4.237c.48.27 1.07.27 1.55 0l8.32-4.237zm-14.56-7.22l3.38-6.87 4.286 8.58-7.67-1.71z'
  },
  {
    name: 'Flutter',
    color: '#02569B',
    path: 'M12 2.02c-5.51 0-9.98 4.47-9.98 9.98s4.47 9.98 9.98 9.98 9.98-4.47 9.98-9.98S17.51 2.02 12 2.02zm-.52 15.86v-4.14H8.82c-.37 0-.62-.4-.36-.71l6.12-7.21c.2-.23.6-.21.78.05L19.65 11c.23.34-.01.79-.4.79h-6.16v4.09c0 .43-.36.78-.79.78s-.8-.35-.8-.78z'
  },
  {
    name: 'Google Cloud',
    color: '#4285F4',
    path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1h-6v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z'
  },
  {
    name: 'Java',
    color: '#007396',
    path: 'M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2zm-1 15H9v-6h2v6zm0-8H9V7h2v2zm4 8h-2v-6h2v6zm0-8h-2V7h2v2z'
  },
  {
    name: 'Pandas',
    color: '#150458',
    path: 'M10.5 3C8.02 3 6 5.02 6 7.5V8h12v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2v-9c0-1.1.9-2 2-2h2v-.5C6 3.91 7.91 2 10.5 2H16v-.5c0-.28.22-.5.5-.5s.5.22.5.5V2c1.66 0 3 1.34 3 3H10.5z'
  },
  {
    name: 'Python',
    color: '#3776AB',
    path: 'M19.14 7.5A2.86 2.86 0 0 1 22 10.36v3.78A2.86 2.86 0 0 1 19.14 17H12c0 .39.32.96.71.96h1.5v2.64c0 1.47-1.26 2.75-2.75 2.75H3.21A2.75 2.75 0 0 1 .46 20.6v-3.96c0-1.47 1.26-2.75 2.75-2.75h8.61v-.96H4.51c-.42 0-.75-.34-.75-.75v-1.5c0-.41.33-.74.75-.74h8.61V7.67c0-1.47 1.26-2.75 2.75-2.75h.42a2.75 2.75 0 0 1 2.75 2.58z'
  },
  {
    name: 'Dart',
    color: '#0175C2',
    path: 'M4 20.2h2v-2H4v2zm4 0h2v-2H8v2zm-4-4h2v-2H4v2zm0-4h2v-2H4v2zm0-4h2V6.2H4v2zm8 12h2v-2h-2v2zm-4 0h2v-2h-2v2zm8-4h2v-2h-2v2zm0-4h2v-2h-2v2zm0-4h2V6.2h-2v2z'
  },
  {
    name: 'Android Studio',
    color: '#3DDC84',
    path: 'M21 2H3c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-10 4c1.93 0 3.5 1.57 3.5 3.5S12.93 13 11 13s-3.5-1.57-3.5-3.5S9.07 6 11 6zm7 13H4v-.89c0-1 2.67-3.11 7-3.11s7 2.11 7 3.11V19z'
  },
  {
    name: 'Arduino',
    color: '#00979D',
    path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1h-6v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z'
  }
];

// Create GitHub-compatible SVG cube
function generateGitHubCompatibleCube() {
  // Create SVG with embedded tech icons
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
    <style>
      .tech-cell { fill: #2A2A40; stroke: #8844ee; stroke-width: 2; }
      .tech-icon { fill-rule: evenodd; }
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      #cube { animation: spin 20s linear infinite; transform-origin: 400px 250px; }
    </style>

    <!-- Main cube group -->
    <g id="cube">
      <!-- Front face -->
      <g transform="translate(300, 150)">
        <rect class="tech-cell" x="0" y="0" width="100" height="100" />
        <rect class="tech-cell" x="100" y="0" width="100" height="100" />
        <rect class="tech-cell" x="0" y="100" width="100" height="100" />
        <rect class="tech-cell" x="100" y="100" width="100" height="100" />
        
        <!-- Tech icons -->
        <path class="tech-icon" d="${techIcons[0].path}" transform="translate(35, 35) scale(3)" fill="${techIcons[0].color}" />
        <path class="tech-icon" d="${techIcons[1].path}" transform="translate(135, 35) scale(3)" fill="${techIcons[1].color}" />
        <path class="tech-icon" d="${techIcons[2].path}" transform="translate(35, 135) scale(3)" fill="${techIcons[2].color}" />
        <path class="tech-icon" d="${techIcons[3].path}" transform="translate(135, 135) scale(3)" fill="${techIcons[3].color}" />
      </g>
      
      <!-- Right face (pseudo-3D) -->
      <g transform="translate(520, 170) skewY(-15)">
        <rect class="tech-cell" x="0" y="0" width="80" height="80" />
        <rect class="tech-cell" x="80" y="0" width="80" height="80" />
        <rect class="tech-cell" x="0" y="80" width="80" height="80" />
        <rect class="tech-cell" x="80" y="80" width="80" height="80" />
        
        <!-- Tech icons -->
        <path class="tech-icon" d="${techIcons[4].path}" transform="translate(25, 25) scale(2.5)" fill="${techIcons[4].color}" />
        <path class="tech-icon" d="${techIcons[5].path}" transform="translate(105, 25) scale(2.5)" fill="${techIcons[5].color}" />
        <path class="tech-icon" d="${techIcons[6].path}" transform="translate(25, 105) scale(2.5)" fill="${techIcons[6].color}" />
        <path class="tech-icon" d="${techIcons[7].path}" transform="translate(105, 105) scale(2.5)" fill="${techIcons[7].color}" />
      </g>
      
      <!-- Top face (pseudo-3D) -->
      <g transform="translate(320, 70) skewX(-15)">
        <rect class="tech-cell" x="0" y="0" width="80" height="80" />
        <rect class="tech-cell" x="80" y="0" width="80" height="80" />
        <rect class="tech-cell" x="0" y="80" width="80" height="80" />
        <rect class="tech-cell" x="80" y="80" width="80" height="80" />
        
        <!-- Tech icons -->
        <path class="tech-icon" d="${techIcons[8].path}" transform="translate(25, 25) scale(2.5)" fill="${techIcons[8].color}" />
        <path class="tech-icon" d="${techIcons[9].path}" transform="translate(105, 25) scale(2.5)" fill="${techIcons[9].color}" />
        <path class="tech-icon" d="${techIcons[10].path}" transform="translate(25, 105) scale(2.5)" fill="${techIcons[10].color}" />
        <path class="tech-icon" d="${techIcons[11].path}" transform="translate(105, 105) scale(2.5)" fill="${techIcons[11].color}" />
      </g>
    </g>
    
    <!-- Title text -->
    <text x="400" y="400" font-family="Arial, sans-serif" font-size="24" font-weight="bold" text-anchor="middle" fill="#8844ee">Tech Stack Cube</text>
  </svg>`;
  
  // Write the SVG file
  fs.writeFileSync(path.join(process.cwd(), 'tech-stack-cube.svg'), svg);
  console.log('GitHub-compatible tech stack cube SVG generated successfully!');
}

// Run the generator
generateGitHubCompatibleCube();
