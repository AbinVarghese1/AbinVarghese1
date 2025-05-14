const puppeteer = require('puppeteer');
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

// HTML content with 3D rotating animation
const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>3D Tech Stack Cube</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background: transparent;
      overflow: hidden;
    }
    #container {
      width: 800px;
      height: 400px;
      perspective: 1000px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .scene {
      width: 200px;
      height: 200px;
      perspective: 600px;
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
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      align-items: center;
      padding: 10px;
      box-sizing: border-box;
    }
    .cube__face--front  { 
      transform: rotateY(0deg) translateZ(100px); 
      background-color: rgba(58, 58, 58, 0.8);
    }
    .cube__face--right  { 
      transform: rotateY(90deg) translateZ(100px); 
      background-color: rgba(45, 45, 45, 0.8);
    }
    .cube__face--back   { 
      transform: rotateY(180deg) translateZ(100px); 
      background-color: rgba(58, 58, 58, 0.8);
    }
    .cube__face--left   { 
      transform: rotateY(-90deg) translateZ(100px); 
      background-color: rgba(45, 45, 45, 0.8);
    }
    .cube__face--top    { 
      transform: rotateX(90deg) translateZ(100px); 
      background-color: rgba(37, 37, 37, 0.8);
    }
    .cube__face--bottom { 
      transform: rotateX(-90deg) translateZ(100px); 
      background-color: rgba(37, 37, 37, 0.8);
    }
    .icon {
      width: 50px;
      height: 50px;
      margin: 5px;
      display: inline-block;
    }
    .title {
      position: absolute;
      top: 10px;
      width: 100%;
      text-align: center;
      color: #8844ee;
      font-family: Arial, sans-serif;
      font-size: 28px;
      font-weight: bold;
      text-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
    }
    @keyframes rotate {
      0% { transform: translateZ(-100px) rotateX(0deg) rotateY(0deg); }
      100% { transform: translateZ(-100px) rotateX(360deg) rotateY(360deg); }
    }
  </style>
</head>
<body>
  <div id="container">
    <div class="title">Tech Stack</div>
    <div class="scene">
      <div class="cube">
        <div class="cube__face cube__face--front"></div>
        <div class="cube__face cube__face--back"></div>
        <div class="cube__face cube__face--right"></div>
        <div class="cube__face cube__face--left"></div>
        <div class="cube__face cube__face--top"></div>
        <div class="cube__face cube__face--bottom"></div>
      </div>
    </div>
  </div>

  <script>
    // Distribute tech icons among the faces
    const techIcons = ${JSON.stringify(techIcons)};
    
    // Function to create icon elements
    function createIcons(face, icons) {
      const faceEl = document.querySelector(face);
      icons.forEach(icon => {
        const img = document.createElement('img');
        img.src = icon;
        img.className = 'icon';
        img.alt = 'Tech Icon';
        faceEl.appendChild(img);
      });
    }

    // Distribute the icons to the faces
    document.addEventListener('DOMContentLoaded', () => {
      createIcons('.cube__face--front', techIcons.slice(0, 2));
      createIcons('.cube__face--right', techIcons.slice(2, 4));
      createIcons('.cube__face--back', techIcons.slice(4, 6));
      createIcons('.cube__face--left', techIcons.slice(6, 8));
      createIcons('.cube__face--top', techIcons.slice(8, 10));
      createIcons('.cube__face--bottom', techIcons.slice(10, 12));
      
      // Signal to puppeteer that we're done
      window.SVGReady = true;
    });
  </script>
</body>
</html>
`;

async function generateSVG() {
  // Make sure the scripts directory exists
  const scriptsDir = path.join(__dirname);
  if (!fs.existsSync(scriptsDir)) {
    fs.mkdirSync(scriptsDir, { recursive: true });
  }
  
  // Create a temporary HTML file
  const tempHTMLPath = path.join(scriptsDir, 'temp-svg-generator.html');
  fs.writeFileSync(tempHTMLPath, htmlContent);
  
  // Launch headless browser with increased viewport to capture the animation
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  // Set viewport to match the size of our container
  await page.setViewport({
    width: 800,
    height: 400,
    deviceScaleFactor: 2 // Higher resolution
  });
  
  // Navigate to the HTML file
  await page.goto(`file://${tempHTMLPath}`);
  
  // Wait for content to be ready
  await page.waitForFunction('window.SVGReady === true', { timeout: 10000 });
  
  // Add a small delay to ensure everything is rendered
  // Using setTimeout instead of waitForTimeout for compatibility
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Capture the SVG content from the page
  const svgContent = await page.evaluate(() => {
    // Create a new SVG element to hold our final output
    const xmlns = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(xmlns, "svg");
    svg.setAttribute("viewBox", "0 0 800 400");
    svg.setAttribute("width", "800");
    svg.setAttribute("height", "400");
    
    // Add the entire HTML content as a foreignObject
    const foreignObject = document.createElementNS(xmlns, "foreignObject");
    foreignObject.setAttribute("width", "800");
    foreignObject.setAttribute("height", "400");
    foreignObject.setAttribute("x", "0");
    foreignObject.setAttribute("y", "0");
    
    // Clone the body content
    const body = document.body.cloneNode(true);
    foreignObject.appendChild(body);
    svg.appendChild(foreignObject);
    
    // Return the SVG as a string
    return new XMLSerializer().serializeToString(svg);
  });
  
  await browser.close();
  
  // Clean up the temporary file
  fs.unlinkSync(tempHTMLPath);
  
  // Write the SVG file
  fs.writeFileSync(path.join(process.cwd(), 'tech-stack-cube.svg'), svgContent);
  
  console.log('Tech stack cube SVG generated successfully!');
}

// Run the generator
generateSVG().catch(err => {
  console.error('Error generating SVG:', err);
  process.exit(1);
});
