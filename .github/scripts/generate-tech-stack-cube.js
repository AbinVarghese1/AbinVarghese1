const fs = require('fs');
const path = require('path');

// Instead of using external icon URLs, we'll use embedded SVG paths
// These are simplified icon paths representing the technologies
const techIconPaths = {
  android: 'M15,5H9L12,2L15,5M10.5,15H8.5V10.5H10.5V15M15.5,15H13.5V10.5H15.5V15M16,9H8V18H16V9M12,1L3,9H21L12,1Z',
  c: 'M16,9V10H14.5V11H16V13H14.5V14H16V15H14A2,2 0 0,1 12,13V11A2,2 0 0,1 14,9H16M10,9A2,2 0 0,1 12,11V13A2,2 0 0,1 10,15H8V9H10M10,11H9V13H10V11M6,9H4.5V15H6V13H7V11H6V9Z',
  figma: 'M8,3H16A5,5 0 0,1 21,8A5,5 0 0,1 16,13H8V3M8,13V21H6V3H8M16,11A3,3 0 0,0 19,8A3,3 0 0,0 16,5H10V11H16Z',
  firebase: 'M20,18.69L12.7,22.74L4,19.39V7.45L6.04,6.5V17.37L12.69,20.07L18.37,17.36V8.47L12.69,6.04L9.04,7.67L20,12.87V18.69M16.84,6.38L20,8.07V6.38H16.84Z',
  flutter: 'M14.25,12L16.27,14H19.03L14.96,10L19.03,6H16.27L14.25,8H11.34L14.25,12M5,8H7.61L10.34,4H7.61L5,8M14.86,14H7.61L5,18H7.61L10.34,14H14.86Z',
  googlecloud: 'M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,7.5A4.5,4.5 0 0,0 7.5,12A4.5,4.5 0 0,0 12,16.5A4.5,4.5 0 0,0 16.5,12H14.5A2.5,2.5 0 0,1 12,14.5A2.5,2.5 0 0,1 9.5,12A2.5,2.5 0 0,1 12,9.5V7.5Z',
  java: 'M9.37,17.51c-3.09.86,1.87,2.64,5.8,1a7.18,7.18,0,0,1-1.1-.71,11.59,11.59,0,0,1-4.16.1c-1.31-.34-.54-.69-.54-.69Zm-.7-1.54c-.68.41,0,.85,0,.85s1.77.76,4.6.56a15.11,15.11,0,0,1-1.51-1.08,8.59,8.59,0,0,1-3.09-.33Zm3.08-1.36A9.66,9.66,0,0,1,9.49,13s-.49.26.35.55a11.35,11.35,0,0,0,5.89.07,4.88,4.88,0,0,0,.75-.34A9.22,9.22,0,0,1,11.75,14.61Zm2.8-4a3.28,3.28,0,0,1-.72,2.34c2.48-1.3,1.32-4.6-.72-3.78A3.49,3.49,0,0,0,14.55,10.61Z',
  pandas: 'M9.8,8.9H8.9v4.4h0.9V8.9z M10.3,9.4h0.9V8.9h-0.9V9.4z M10.3,13.3h0.9v-2.2h-0.9V13.3z M14.6,12.4h0.9v-0.9h-0.9V12.4z M14.6,10.7h0.9V9.8h-0.9V10.7z M13.7,11.6h0.9v-0.9h-0.9V11.6z M13.7,9.8h0.9V8.9h-0.9V9.8z M12.8,10.7h0.9V9.8h-0.9V10.7z M12.8,12.4h0.9v-0.9h-0.9V12.4z M11.9,11.6h0.9v-0.9h-0.9V11.6z M11.9,9.8h0.9V8.9h-0.9V9.8z',
  python: 'M19.14,7.5A2.86,2.86,0,0,1,22,10.36v3.78A2.86,2.86,0,0,1,19.14,17H12c0,.08,0,.16,0,.24a6,6,0,0,1-11.34,2.67,5.71,5.71,0,0,0,7.17-2.62,7,7,0,0,0,.75-1.7,3.66,3.66,0,0,1-1.9-3.22V9.62a3.65,3.65,0,0,1,2.83-3.55h-1A8.84,8.84,0,0,0,19.14,7.5Z',
  dart: 'M4,12a8,8 0 1,0 16,0a8,8 0 1,0 -16,0M14,9l-5,9h5l2,-4h2l-4,-5',
  androidstudio: 'M7.5,4A5.5,5.5 0 0,0 2,9.5C2,11.26 2.7,12.84 3.84,14L2,20L8,18.16C9.16,19.3 10.74,20 12.5,20A5.5,5.5 0 0,0 18,14.5C18,12.74 17.3,11.16 16.16,10L18,4L12,5.84C10.84,4.7 9.26,4 7.5,4M7,9A1,1 0 0,1 8,8A1,1 0 0,1 9,9A1,1 0 0,1 8,10A1,1 0 0,1 7,9M15,13A1,1 0 0,1 16,12A1,1 0 0,1 17,13A1,1 0 0,1 16,14A1,1 0 0,1 15,13Z',
  arduino: 'M5.7,15.2C0.1,9.7,0,9.5,0,7.2c0-1.1,0.2-1.9,0.6-2.5C1.4,3.2,3.1,2,5.2,2c1.9,0,3.4,0.7,7.4,4.5c4.3,4.2,5.4,5,7.1,5c2.3,0,3.5-1.6,3.5-4.3V5.5h-3l0,1.7c0,0.7-0.3,1.3-0.8,1.8C18.9,9.5,18,9.9,17,9.9h0c-1.7,0-2.8-0.7-6.3-4.1C7.1,2.3,6.3,1.6,4.6,1.6c0,0,0,0,0,0C3,1.6,1.5,2.1,0.9,2.5C0.3,2.8,0,3.5,0,4.1c0,0.8,0.4,1.2,2.4,3.4c1.1,1.2,2.6,2.9,4.6,5.1'
};

// Generate a pure SVG Rubik's cube with tech icons
function generateRubiksCube() {
  // Create SVG with proper CSS 3D transforms - increased overall size and centering
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
    <defs>
      <style>
        @keyframes rotate {
          0% { transform: rotate3d(1, 1, 0, 0deg); }
          100% { transform: rotate3d(1, 1, 0, 360deg); }
        }
        
        .cube-wrapper {
          width: 400px;
          height: 400px;
          perspective: 1200px;
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
          border: 2px solid #8844ee;
          display: grid;
          grid-template: repeat(2, 1fr) / repeat(2, 1fr);
          gap: 2px;
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
          width: 60%;
          height: 60%;
          fill: #fff;
        }
        
        /* Technology-specific colors */
        .tech-android { fill: #3DDC84; }
        .tech-c { fill: #A8B9CC; }
        .tech-figma { fill: #F24E1E; }
        .tech-firebase { fill: #FFCA28; }
        .tech-flutter { fill: #02569B; }
        .tech-googlecloud { fill: #4285F4; }
        .tech-java { fill: #007396; }
        .tech-pandas { fill: #150458; }
        .tech-python { fill: #3776AB; }
        .tech-dart { fill: #0175C2; }
        .tech-androidstudio { fill: #3DDC84; }
        .tech-arduino { fill: #00979D; }
      </style>
    </defs>
    
    <!-- Group for the 3D cube - expanded view area and centered -->
    <g transform="translate(200, 200)">
      <foreignObject width="400" height="400">
        <div xmlns="http://www.w3.org/1999/xhtml" style="width: 100%; height: 100%">
          <div class="cube-wrapper">
            <div class="cube">
              <!-- Front face -->
              <div class="cube__face cube__face--front">
                <div class="icon-cell">
                  <svg class="tech-icon tech-android" viewBox="0 0 24 24">
                    <path d="${techIconPaths.android}"/>
                  </svg>
                </div>
                <div class="icon-cell">
                  <svg class="tech-icon tech-c" viewBox="0 0 24 24">
                    <path d="${techIconPaths.c}"/>
                  </svg>
                </div>
                <div class="icon-cell">
                  <svg class="tech-icon tech-figma" viewBox="0 0 24 24">
                    <path d="${techIconPaths.figma}"/>
                  </svg>
                </div>
                <div class="icon-cell">
                  <svg class="tech-icon tech-firebase" viewBox="0 0 24 24">
                    <path d="${techIconPaths.firebase}"/>
                  </svg>
                </div>
              </div>
              
              <!-- Right face -->
              <div class="cube__face cube__face--right">
                <div class="icon-cell">
                  <svg class="tech-icon tech-flutter" viewBox="0 0 24 24">
                    <path d="${techIconPaths.flutter}"/>
                  </svg>
                </div>
                <div class="icon-cell">
                  <svg class="tech-icon tech-googlecloud" viewBox="0 0 24 24">
                    <path d="${techIconPaths.googlecloud}"/>
                  </svg>
                </div>
                <div class="icon-cell">
                  <svg class="tech-icon tech-java" viewBox="0 0 24 24">
                    <path d="${techIconPaths.java}"/>
                  </svg>
                </div>
                <div class="icon-cell">
                  <svg class="tech-icon tech-pandas" viewBox="0 0 24 24">
                    <path d="${techIconPaths.pandas}"/>
                  </svg>
                </div>
              </div>
              
              <!-- Back face -->
              <div class="cube__face cube__face--back">
                <div class="icon-cell">
                  <svg class="tech-icon tech-python" viewBox="0 0 24 24">
                    <path d="${techIconPaths.python}"/>
                  </svg>
                </div>
                <div class="icon-cell">
                  <svg class="tech-icon tech-dart" viewBox="0 0 24 24">
                    <path d="${techIconPaths.dart}"/>
                  </svg>
                </div>
                <div class="icon-cell">
                  <svg class="tech-icon tech-androidstudio" viewBox="0 0 24 24">
                    <path d="${techIconPaths.androidstudio}"/>
                  </svg>
                </div>
                <div class="icon-cell">
                  <svg class="tech-icon tech-arduino" viewBox="0 0 24 24">
                    <path d="${techIconPaths.arduino}"/>
                  </svg>
                </div>
              </div>
              
              <!-- Left face -->
              <div class="cube__face cube__face--left">
                <div class="icon-cell">
                  <svg class="tech-icon tech-android" viewBox="0 0 24 24">
                    <path d="${techIconPaths.android}"/>
                  </svg>
                </div>
                <div class="icon-cell">
                  <svg class="tech-icon tech-firebase" viewBox="0 0 24 24">
                    <path d="${techIconPaths.firebase}"/>
                  </svg>
                </div>
                <div class="icon-cell">
                  <svg class="tech-icon tech-java" viewBox="0 0 24 24">
                    <path d="${techIconPaths.java}"/>
                  </svg>
                </div>
                <div class="icon-cell">
                  <svg class="tech-icon tech-dart" viewBox="0 0 24 24">
                    <path d="${techIconPaths.dart}"/>
                  </svg>
                </div>
              </div>
              
              <!-- Top face -->
              <div class="cube__face cube__face--top">
                <div class="icon-cell">
                  <svg class="tech-icon tech-figma" viewBox="0 0 24 24">
                    <path d="${techIconPaths.figma}"/>
                  </svg>
                </div>
                <div class="icon-cell">
                  <svg class="tech-icon tech-googlecloud" viewBox="0 0 24 24">
                    <path d="${techIconPaths.googlecloud}"/>
                  </svg>
                </div>
                <div class="icon-cell">
                  <svg class="tech-icon tech-python" viewBox="0 0 24 24">
                    <path d="${techIconPaths.python}"/>
                  </svg>
                </div>
                <div class="icon-cell">
                  <svg class="tech-icon tech-arduino" viewBox="0 0 24 24">
                    <path d="${techIconPaths.arduino}"/>
                  </svg>
                </div>
              </div>
              
              <!-- Bottom face -->
              <div class="cube__face cube__face--bottom">
                <div class="icon-cell">
                  <svg class="tech-icon tech-c" viewBox="0 0 24 24">
                    <path d="${techIconPaths.c}"/>
                  </svg>
                </div>
                <div class="icon-cell">
                  <svg class="tech-icon tech-flutter" viewBox="0 0 24 24">
                    <path d="${techIconPaths.flutter}"/>
                  </svg>
                </div>
                <div class="icon-cell">
                  <svg class="tech-icon tech-pandas" viewBox="0 0 24 24">
                    <path d="${techIconPaths.pandas}"/>
                  </svg>
                </div>
                <div class="icon-cell">
                  <svg class="tech-icon tech-androidstudio" viewBox="0 0 24 24">
                    <path d="${techIconPaths.androidstudio}"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </foreignObject>
    </g>
  </svg>`;
  
  // Write the SVG file
  fs.writeFileSync(path.join(process.cwd(), 'tech-stack-cube.svg'), svg);
  console.log('GitHub-compatible Rubik\'s cube tech stack SVG generated successfully!');
}

// Run the generator
generateRubiksCube();
