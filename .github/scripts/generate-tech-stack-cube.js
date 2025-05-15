const fs = require('fs');
const path = require('path');

// Tech stack using simplified icons that will work in GitHub README
function generateRubiksCube() {
  // Create SVG with embedded icon paths instead of external images
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
          overflow: hidden;
        }
        
        /* Define tech icon colors */
        .android { fill: #3DDC84; }
        .c { fill: #A8B9CC; }
        .figma { fill: #F24E1E; }
        .firebase { fill: #FFCA28; }
        .flutter { fill: #02569B; }
        .gcloud { fill: #4285F4; }
        .java { fill: #007396; }
        .pandas { fill: #150458; }
        .python { fill: #3776AB; }
        .dart { fill: #0175C2; }
        .androidstudio { fill: #3DDC84; }
        .arduino { fill: #00979D; }
      </style>

      <!-- Android Icon -->
      <symbol id="android" viewBox="0 0 24 24">
        <path class="android" d="M17.6,9.48l1.84-3.18c0.16-0.31,0.04-0.69-0.26-0.85c-0.29-0.15-0.65-0.06-0.83,0.22l-1.88,3.24 c-2.86-1.21-6.08-1.21-8.94,0L5.65,5.67c-0.19-0.29-0.58-0.38-0.87-0.2C4.5,5.65,4.41,6.01,4.56,6.3L6.4,9.48 C3.3,11.25,1.28,14.44,1,18h22C22.72,14.44,20.7,11.25,17.6,9.48z M7,15.25c-0.69,0-1.25-0.56-1.25-1.25 c0-0.69,0.56-1.25,1.25-1.25S8.25,13.31,8.25,14C8.25,14.69,7.69,15.25,7,15.25z M17,15.25c-0.69,0-1.25-0.56-1.25-1.25 c0-0.69,0.56-1.25,1.25-1.25s1.25,0.56,1.25,1.25C18.25,14.69,17.69,15.25,17,15.25z"/>
      </symbol>

      <!-- C Icon -->
      <symbol id="c" viewBox="0 0 24 24">
        <path class="c" d="M16 8.5c.69 0 1.25.56 1.25 1.25v5c0 .69-.56 1.25-1.25 1.25h-8c-.69 0-1.25-.56-1.25-1.25v-5c0-.69.56-1.25 1.25-1.25zm0-1.5h-8c-1.52 0-2.75 1.23-2.75 2.75v5c0 1.52 1.23 2.75 2.75 2.75h8c1.52 0 2.75-1.23 2.75-2.75v-5c0-1.52-1.23-2.75-2.75-2.75z"/>
      </symbol>

      <!-- Figma Icon -->
      <symbol id="figma" viewBox="0 0 24 24">
        <path class="figma" d="M8.5,5 L8.5,5 C6.84314575,5 5.5,6.34314575 5.5,8 C5.5,9.65685425 6.84314575,11 8.5,11 L10.5,11 L10.5,5 L8.5,5 Z"/>
        <path class="figma" d="M8.5,11 L8.5,11 C6.84314575,11 5.5,12.3431458 5.5,14 C5.5,15.6568542 6.84314575,17 8.5,17 C10.1568542,17 11.5,15.6568542 11.5,14 C11.5,12.3431458 10.1568542,11 8.5,11 Z"/>
        <path class="figma" d="M8.5,17 L8.5,17 C6.84314575,17 5.5,18.3431458 5.5,20 C5.5,21.6568542 6.84314575,23 8.5,23 C10.1568542,23 11.5,21.6568542 11.5,20 L11.5,17 L8.5,17 Z"/>
        <path class="figma" d="M14.5,5 L12.5,5 L12.5,11 L14.5,11 C16.1568542,11 17.5,9.65685425 17.5,8 C17.5,6.34314575 16.1568542,5 14.5,5 Z"/>
        <path class="figma" d="M14.5,11 C16.1568542,11 17.5,12.3431458 17.5,14 C17.5,15.6568542 16.1568542,17 14.5,17 C12.8431458,17 11.5,15.6568542 11.5,14 C11.5,12.3431458 12.8431458,11 14.5,11 Z"/>
      </symbol>

      <!-- Firebase Icon -->
      <symbol id="firebase" viewBox="0 0 24 24">
        <path class="firebase" d="M3.7 15.7L5.2 2.5c.1-.7.8-1.1 1.5-.9l1.6.5c.7.2 1 1 .8 1.7L6.8 15.7l-3.1 0zm5.8 1.8l-5.6 3.6c-.5.3-1.2.2-1.6-.3l-.6-.9c-.3-.5-.2-1.1.1-1.5l5.9-9 1.8 8.1zm4.3-1.8l-2.4-15c-.1-.8.5-1.5 1.3-1.6l1.6-.2c.8-.1 1.5.5 1.6 1.3L18 15.7h-4.2z"/>
      </symbol>

      <!-- Flutter Icon -->
      <symbol id="flutter" viewBox="0 0 24 24">
        <path class="flutter" d="M12.95 4.2l-8.9 8.9 2.83 2.83 11.8-11.7-5.73-.03zm0 7.37L7 17.5l5.92 5.9 5.73-.03-5.7-5.7 5.7-5.7-5.7-.4z"/>
      </symbol>

      <!-- Google Cloud Icon -->
      <symbol id="gcloud" viewBox="0 0 24 24">
        <path class="gcloud" d="M15.33 20.79l-3.13-3.13h5.61v-5.61l3.13 3.13c.78.78.78 2.05 0 2.83l-2.83 2.83c-.78.73-2.05.73-2.78-.05zM9.03 3.06c.78-.78 2.05-.78 2.83 0l2.83 2.83c.78.78.78 2.05 0 2.83l-2.83 2.83c-.78.78-2.05.78-2.83 0L6.2 8.72c-.78-.78-.78-2.05 0-2.83l2.83-2.83zM3 8.58l3.13 3.13h5.61V6.11L8.59 3h5.64c.73 0 1.33.6 1.33 1.33V9.9h5.64c.73 0 1.33.6 1.33 1.33v5.64c0 .73-.6 1.33-1.33 1.33h-5.64v5.64c0 .73-.6 1.33-1.33 1.33H8.59c-.73 0-1.33-.6-1.33-1.33v-5.64H1.67c-.73 0-1.33-.6-1.33-1.33V9.9c0-.73.6-1.33 1.33-1.33h1.33v.01z"/>
      </symbol>

      <!-- Java Icon -->
      <symbol id="java" viewBox="0 0 24 24">
        <path class="java" d="M9.7 10.9c-.2-.2-.3-.5-.3-.7 0-.2.1-.5.3-.7.2-.2.5-.3.7-.3.3 0 .5.1.7.3.2.2.3.4.3.7 0 .3-.1.5-.3.7-.2.2-.4.3-.7.3-.2 0-.5-.1-.7-.3zm9.4 12h-8.5v-3.3H15c.5 0 .9-.1 1.3-.4s.6-.7.6-1.1c0-.5-.2-.8-.6-1.1-.4-.3-.8-.4-1.3-.4h-3.4v-1.3h3.4c.5 0 .9-.1 1.3-.4.4-.3.6-.6.6-1.1s-.2-.8-.6-1.1c-.4-.3-.8-.4-1.3-.4h-3.4V10h3.4c.9 0 1.6.3 2.2.8.6.5.9 1.2.9 2 0 .8-.3 1.5-.9 2-.6.5-1.3.8-2.2.8H13v3.9c0 .5-.2.9-.5 1.2-.3.3-.8.5-1.2.5h-4.7c-.5 0-.9-.2-1.2-.5-.3-.3-.5-.7-.5-1.2V7.8c0-.5.2-.9.5-1.2.3-.3.7-.5 1.2-.5h9.7c.9 0 1.6.3 2.2.8.6.5.9 1.2.9 2 0 .5-.1 1-.4 1.4-.2.4-.6.7-1 .9.6.3 1 .6 1.3 1.1.3.5.4 1 .4 1.6 0 .8-.3 1.5-.9 2-.6.5-1.3.8-2.2.8H15v3.9c0 .5-.2.9-.5 1.2-.3.3-.7.5-1.2.5z"/>
      </symbol>

      <!-- Pandas Icon -->
      <symbol id="pandas" viewBox="0 0 24 24">
        <path class="pandas" d="M16.5 8a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0zM12 3.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zm0 11.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zm8-8a2.5 2.5 0 0 0-5 0v9a2.5 2.5 0 0 0 5 0v-9zm-16 0a2.5 2.5 0 0 1 5 0v9a2.5 2.5 0 1 1-5 0v-9z"/>
      </symbol>

      <!-- Python Icon -->
      <symbol id="python" viewBox="0 0 24 24">
        <path class="python" d="M12 3c-4.4 0-4.8 2-4.8 2v3h4.8v1H6.7S3 8.9 3 13.3C3 17.7 6.3 18 6.3 18h2.4v-3c0 0-.1-3 3-3h5.1s2.8.1 2.8-2.7V6.7S20 3 12 3zm-2.5 1.5c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9zm6.8 7.5s-.4 0-.4.5v2.5c0 .6-.5 1-1 1h-5c-.6 0-1-.5-1-1v-3c0-.6.4-1 1-1h7.1l-.7 1zm1.4 4h-2.4v3c0 0 0 3-3 3H7.2s-2.8 0-2.8-2.7V12.7S4 9 12 9c8 0 7.5 3.7 7.5 3.7l-1.8 3.3z"/>
      </symbol>

      <!-- Dart Icon -->
      <symbol id="dart" viewBox="0 0 24 24">
        <path class="dart" d="M4.85 4.85L9.7 1.55l8.9 2.3 2.85 2.85v8.9l-3.3 4.85H9.7L4.85 15.3V4.85z M8.6 19.45L19.45 8.6V4.85H15.7L4.85 15.7v3.75H8.6z M7.15 7.15l7.7-2.3v7.15H7.15V7.15z"/>
      </symbol>

      <!-- Android Studio Icon -->
      <symbol id="androidstudio" viewBox="0 0 24 24">
        <path class="androidstudio" d="M19.2 12l2.1-8.2c.2-.7-.3-1.3-1-1.3H9.2L5.5 12h13.7zm-16.3.5l-1.7 6.7c-.2.7.3 1.3 1 1.3h13.9L20 12.5H2.9z"/>
        <path class="androidstudio" d="M9 8h2v8H9zM13 8h2v8h-2z"/>
      </symbol>

      <!-- Arduino Icon -->
      <symbol id="arduino" viewBox="0 0 24 24">
        <path class="arduino" d="M11 9.5h2v5h-2zm-7 0h2v5H4zm14 0h2v5h-2zM8 7.5c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3zm8 0c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3zm-4 0c-.6 0-1 .4-1 1v4c0 .6.4 1 1 1s1-.4 1-1v-4c0-.6-.4-1-1-1z"/>
      </symbol>
    </defs>
    
    <!-- Group for the 3D cube -->
    <foreignObject x="200" y="200" width="400" height="400">
      <div xmlns="http://www.w3.org/1999/xhtml" style="width: 100%; height: 100%">
        <div class="cube-wrapper">
          <div class="cube">
            <!-- Front face -->
            <div class="cube__face cube__face--front">
              <div class="icon-cell">
                <svg width="70%" height="70%" viewBox="0 0 24 24">
                  <use href="#android"></use>
                </svg>
              </div>
              <div class="icon-cell">
                <svg width="70%" height="70%" viewBox="0 0 24 24">
                  <use href="#c"></use>
                </svg>
              </div>
              <div class="icon-cell">
                <svg width="70%" height="70%" viewBox="0 0 24 24">
                  <use href="#figma"></use>
                </svg>
              </div>
              <div class="icon-cell">
                <svg width="70%" height="70%" viewBox="0 0 24 24">
                  <use href="#firebase"></use>
                </svg>
              </div>
            </div>
            
            <!-- Right face -->
            <div class="cube__face cube__face--right">
              <div class="icon-cell">
                <svg width="70%" height="70%" viewBox="0 0 24 24">
                  <use href="#flutter"></use>
                </svg>
              </div>
              <div class="icon-cell">
                <svg width="70%" height="70%" viewBox="0 0 24 24">
                  <use href="#gcloud"></use>
                </svg>
              </div>
              <div class="icon-cell">
                <svg width="70%" height="70%" viewBox="0 0 24 24">
                  <use href="#java"></use>
                </svg>
              </div>
              <div class="icon-cell">
                <svg width="70%" height="70%" viewBox="0 0 24 24">
                  <use href="#pandas"></use>
                </svg>
              </div>
            </div>
            
            <!-- Back face -->
            <div class="cube__face cube__face--back">
              <div class="icon-cell">
                <svg width="70%" height="70%" viewBox="0 0 24 24">
                  <use href="#python"></use>
                </svg>
              </div>
              <div class="icon-cell">
                <svg width="70%" height="70%" viewBox="0 0 24 24">
                  <use href="#dart"></use>
                </svg>
              </div>
              <div class="icon-cell">
                <svg width="70%" height="70%" viewBox="0 0 24 24">
                  <use href="#androidstudio"></use>
                </svg>
              </div>
              <div class="icon-cell">
                <svg width="70%" height="70%" viewBox="0 0 24 24">
                  <use href="#arduino"></use>
                </svg>
              </div>
            </div>
            
            <!-- Left face -->
            <div class="cube__face cube__face--left">
              <div class="icon-cell">
                <svg width="70%" height="70%" viewBox="0 0 24 24">
                  <use href="#android"></use>
                </svg>
              </div>
              <div class="icon-cell">
                <svg width="70%" height="70%" viewBox="0 0 24 24">
                  <use href="#firebase"></use>
                </svg>
              </div>
              <div class="icon-cell">
                <svg width="70%" height="70%" viewBox="0 0 24 24">
                  <use href="#java"></use>
                </svg>
              </div>
              <div class="icon-cell">
                <svg width="70%" height="70%" viewBox="0 0 24 24">
                  <use href="#dart"></use>
                </svg>
              </div>
            </div>
            
            <!-- Top face -->
            <div class="cube__face cube__face--top">
              <div class="icon-cell">
                <svg width="70%" height="70%" viewBox="0 0 24 24">
                  <use href="#figma"></use>
                </svg>
              </div>
              <div class="icon-cell">
                <svg width="70%" height="70%" viewBox="0 0 24 24">
                  <use href="#gcloud"></use>
                </svg>
              </div>
              <div class="icon-cell">
                <svg width="70%" height="70%" viewBox="0 0 24 24">
                  <use href="#python"></use>
                </svg>
              </div>
              <div class="icon-cell">
                <svg width="70%" height="70%" viewBox="0 0 24 24">
                  <use href="#arduino"></use>
                </svg>
              </div>
            </div>
            
            <!-- Bottom face -->
            <div class="cube__face cube__face--bottom">
              <div class="icon-cell">
                <svg width="70%" height="70%" viewBox="0 0 24 24">
                  <use href="#c"></use>
                </svg>
              </div>
              <div class="icon-cell">
                <svg width="70%" height="70%" viewBox="0 0 24 24">
                  <use href="#flutter"></use>
                </svg>
              </div>
              <div class="icon-cell">
                <svg width="70%" height="70%" viewBox="0 0 24 24">
                  <use href="#pandas"></use>
                </svg>
              </div>
              <div class="icon-cell">
                <svg width="70%" height="70%" viewBox="0 0 24 24">
                  <use href="#androidstudio"></use>
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

