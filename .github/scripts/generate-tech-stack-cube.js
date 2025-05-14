// Script to generate a tech stack cube SVG
const fs = require('fs');
const { SVG } = require('@svgdotjs/svg.js');
const puppeteer = require('puppeteer');

// Tech stack icons - add your icons here
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

async function generateCubeHTML() {
  // Create HTML content for the cube rendering
  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <title>Tech Stack Cube</title>
  <style>
    body { margin: 0; background-color: transparent; }
    #cube-container { width: 600px; height: 400px; }
  </style>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
</head>
<body>
  <div id="cube-container"></div>
  <script>
    // Set up scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 600 / 400, 0.1, 1000);
    
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      preserveDrawingBuffer: true 
    });
    renderer.setSize(600, 400);
    renderer.setClearColor(0x000000, 0);
    document.getElementById('cube-container').appendChild(renderer.domElement);
    
    // Create cube
    const cubeSize = 3;
    const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    
    // Tech stack icons URLs
    const techIcons = ${JSON.stringify(techIcons)};
    
    // Function to create a face texture with 3x3 grid of icons
    function createFaceTexture(startIndex) {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#2d2d2d';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Create a 3x3 grid
      return new Promise((resolve) => {
        let loadedCount = 0;
        const requiredLoads = Math.min(9, techIcons.length - startIndex);
        
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            const iconIndex = startIndex + i * 3 + j;
            if (iconIndex < techIcons.length) {
              const img = new Image();
              img.crossOrigin = "Anonymous";
              img.onload = function() {
                // Draw icon in position
                const padding = 30;
                const size = (512 - padding * 2) / 3;
                ctx.drawImage(img, j * size + padding, i * size + padding, size - padding, size - padding);
                
                loadedCount++;
                if (loadedCount >= requiredLoads) {
                  const texture = new THREE.CanvasTexture(canvas);
                  resolve(texture);
                }
              };
              img.src = techIcons[iconIndex];
            }
          }
        }
        
        // If no icons to load, resolve immediately
        if (requiredLoads === 0) {
          const texture = new THREE.CanvasTexture(canvas);
          resolve(texture);
        }
      });
    }
    
    // Create materials for each face
    async function createCube() {
      const materials = [];
      
      // Create 6 faces with tech icons
      for (let i = 0; i < 6; i++) {
        const texture = await createFaceTexture(i * 9);
        materials.push(new THREE.MeshBasicMaterial({ map: texture }));
      }
      
      const cube = new THREE.Mesh(geometry, materials);
      scene.add(cube);
      
      // Position camera
      camera.position.z = 5;
      
      // Set initial rotation
      cube.rotation.x = 0.5;
      cube.rotation.y = 0.7;
      
      // Let the cube render once
      renderer.render(scene, camera);
      
      // Signal that the rendering is complete
      window.renderedCube = true;
    }
    
    createCube();
  </script>
</body>
</html>
  `;
  
  return htmlContent;
}

async function captureWebpageToPNG() {
  // Generate the HTML content
  const htmlContent = await generateCubeHTML();
  
  // Create a temporary HTML file
  fs.writeFileSync('temp-cube.html', htmlContent);
  
  // Launch a headless browser
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  // Set viewport
  await page.setViewport({
    width: 600,
    height: 400,
    deviceScaleFactor: 2 // Higher resolution
  });
  
  // Navigate to the HTML file
  await page.goto(`file://${process.cwd()}/temp-cube.html`);
  
  // Wait for the cube to render
  await page.waitForFunction('window.renderedCube === true', { timeout: 10000 });
  
  // Wait a bit more to ensure everything is properly rendered
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Capture the screenshot
  const screenshot = await page.screenshot({
    omitBackground: true,
    type: 'png'
  });
  
  await browser.close();
  
  // Clean up the temporary file
  fs.unlinkSync('temp-cube.html');
  
  return screenshot;
}

async function createSVG() {
  // Capture the cube as PNG
  const screenshot = await captureWebpageToPNG();
  
  // Convert the PNG to a Base64 data URL
  const base64Image = `data:image/png;base64,${screenshot.toString('base64')}`;
  
  // Create an SVG with the image embedded
  const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
  <title>Tech Stack Cube</title>
  <image href="${base64Image}" width="600" height="400" />
</svg>`;
  
  // Save the SVG file
  fs.writeFileSync('tech-stack-cube.svg', svgContent);
  console.log('Tech stack cube SVG generated successfully!');
}

// Execute the script
createSVG().catch(error => {
  console.error('Error generating tech stack cube:', error);
  process.exit(1);
});
