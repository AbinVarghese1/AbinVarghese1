const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Tech stack icons
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

// SVG creation HTML content
const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Tech Stack Cube SVG Generator</title>
  <script src="https://cdn.jsdelivr.net/npm/@svgdotjs/svg.js@3.0.16/dist/svg.min.js"></script>
  <style>
    body { margin: 0; padding: 0; background: transparent; }
    #container { width: 800px; height: 400px; }
  </style>
</head>
<body>
  <div id="container"></div>
  <script>
    // Function to create the SVG
    async function createTechStackCube() {
      // Create SVG.js instance
      const draw = SVG().addTo('#container').size(800, 400);
      
      // Define tech icons
      const techIcons = ${JSON.stringify(techIcons)};
      
      // Create cube faces
      const centerX = 400;
      const centerY = 200;
      const size = 180;
      
      // Create an isometric cube
      const top = draw.polygon([
        centerX, centerY - size,
        centerX + size, centerY - size/2,
        centerX, centerY,
        centerX - size, centerY - size/2
      ]).fill('#3a3a3a').stroke({ color: '#8844ee', width: 2 });
      
      const right = draw.polygon([
        centerX + size, centerY - size/2,
        centerX + size, centerY + size/2,
        centerX, centerY + size,
        centerX, centerY
      ]).fill('#2d2d2d').stroke({ color: '#8844ee', width: 2 });
      
      const left = draw.polygon([
        centerX, centerY,
        centerX, centerY + size,
        centerX - size, centerY + size/2,
        centerX - size, centerY - size/2
      ]).fill('#252525').stroke({ color: '#8844ee', width: 2 });
      
      // Add icons to each face
      const topIcons = techIcons.slice(0, 4);
      const rightIcons = techIcons.slice(4, 8);
      const leftIcons = techIcons.slice(8, 12);
      
      // Helper to position icons on faces
      async function addIconsToFace(face, icons, positions) {
        for (let i = 0; i < icons.length; i++) {
          const icon = draw.image(icons[i]).size(40, 40);
          icon.move(positions[i].x - 20, positions[i].y - 20);
        }
      }
      
      // Icon positions for each face (center points)
      const topPositions = [
        { x: centerX - size/3, y: centerY - size*2/3 },
        { x: centerX + size/3, y: centerY - size*2/3 },
        { x: centerX - size/4, y: centerY - size/3 },
        { x: centerX + size/4, y: centerY - size/3 }
      ];
      
      const rightPositions = [
        { x: centerX + size*2/3, y: centerY - size/4 },
        { x: centerX + size*2/3, y: centerY + size/4 },
        { x: centerX + size/3, y: centerY },
        { x: centerX + size/3, y: centerY + size/3 }
      ];
      
      const leftPositions = [
        { x: centerX - size/3, y: centerY + size/3 },
        { x: centerX - size*2/3, y: centerY + size/4 },
        { x: centerX - size*2/3, y: centerY - size/4 },
        { x: centerX - size/3, y: centerY }
      ];
      
      // Add all icons
      await addIconsToFace(top, topIcons, topPositions);
      await addIconsToFace(right, rightIcons, rightPositions);
      await addIconsToFace(left, leftIcons, leftPositions);
      
      // Add some 3D effect animations
      draw.element('style').words(\`
        @keyframes rotate {
          0% { transform: translateX(0px) translateY(0px); }
          25% { transform: translateX(5px) translateY(-5px); }
          50% { transform: translateX(0px) translateY(0px); }
          75% { transform: translateX(-5px) translateY(5px); }
          100% { transform: translateX(0px) translateY(0px); }
        }
        #container { animation: rotate 8s ease-in-out infinite; }
      \`);
      
      // Add "Tech Stack" text
      draw.text("Tech Stack")
        .font({ family: 'Arial', size: 24, weight: 'bold' })
        .fill('#8844ee')
        .move(centerX - 80, 50);
      
      // Return the SVG content
      return draw.svg();
    }
    
    // Create and save SVG
    async function init() {
      const svgContent = await createTechStackCube();
      document.body.innerHTML = svgContent;
      
      // Signal to puppeteer that we're done
      window.SVGReady = true;
    }
    
    init();
  </script>
</body>
</html>
`;

async function generateSVG() {
  // Make sure the scripts directory exists
  const scriptsDir = path.join(__dirname, '..', '..', '.github', 'scripts');
  if (!fs.existsSync(scriptsDir)) {
    fs.mkdirSync(scriptsDir, { recursive: true });
  }
  
  // Create a temporary HTML file
  const tempHTMLPath = path.join(scriptsDir, 'temp-svg-generator.html');
  fs.writeFileSync(tempHTMLPath, htmlContent);
  
  // Launch headless browser
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  // Navigate to the HTML file
  await page.goto(`file://${tempHTMLPath}`);
  
  // Wait for SVG to be ready
  await page.waitForFunction('window.SVGReady === true', { timeout: 10000 });
  
  // Get the SVG content
  const svgContent = await page.evaluate(() => {
    return document.body.innerHTML;
  });
  
  await browser.close();
  
  // Clean up the temporary file
  fs.unlinkSync(tempHTMLPath);
  
  // Write the SVG file
  fs.writeFileSync('tech-stack-cube.svg', svgContent);
  
  console.log('Tech stack cube SVG generated successfully!');
}

// Run the generator
generateSVG().catch(err => {
  console.error('Error generating SVG:', err);
  process.exit(1);
});
