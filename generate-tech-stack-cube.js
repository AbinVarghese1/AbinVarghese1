const fs = require('fs');
const { SVG } = require('@svgdotjs/svg.js');
const puppeteer = require('puppeteer');

// Define your tech stack icons
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

async function generateTechStackCube() {
  // Create a new browser instance
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // HTML content with Three.js for cube rendering
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
      <style>
        body { margin: 0; background-color: transparent; }
        canvas { display: block; }
      </style>
    </head>
    <body>
      <div id="container" style="width: 600px; height: 400px;"></div>
      <script>
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 600 / 400, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(600, 400);
        renderer.setClearColor(0x000000, 0);
        document.getElementById('container').appendChild(renderer.domElement);
        
        // Create cube
        const cubeSize = 3;
        const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
        
        // Define materials (simplified for SVG export)
        const materials = [
          new THREE.MeshBasicMaterial({ color: 0x3366cc, transparent: true, opacity: 0.8 }),
          new THREE.MeshBasicMaterial({ color: 0x6699cc, transparent: true, opacity: 0.8 }),
          new THREE.MeshBasicMaterial({ color: 0x99ccff, transparent: true, opacity: 0.8 }),
          new THREE.MeshBasicMaterial({ color: 0x336699, transparent: true, opacity: 0.8 }),
          new THREE.MeshBasicMaterial({ color: 0x3399cc, transparent: true, opacity: 0.8 }),
          new THREE.MeshBasicMaterial({ color: 0x66ccff, transparent: true, opacity: 0.8 })
        ];
        
        const cube = new THREE.Mesh(geometry, materials);
        scene.add(cube);
        
        camera.position.z = 5;
        
        // Set specific rotation for the screenshot
        cube.rotation.x = 0.5;
        cube.rotation.y = 0.7;
        
        // Render
        renderer.render(scene, camera);
        
        // This is just for visual in browser, not needed for the screenshot
        function animate() {
          requestAnimationFrame(animate);
          cube.rotation.x += 0.01;
          cube.rotation.y += 0.01;
          renderer.render(scene, camera);
        }
        animate();
      </script>
    </body>
    </html>
  `;
  
  await page.setContent(htmlContent);
  await page.setViewport({ width: 600, height: 400 });
  
  // Wait for rendering
  await page.waitForTimeout(1000);
  
  // Take screenshot
  const screenshot = await page.screenshot({ 
    omitBackground: true,
    encoding: 'base64'
  });
  
  await browser.close();
  
  // Create an SVG with the cube screenshot
  const svgDocument = SVG().size(800, 500);
  
  // Add title
  svgDocument.text('Tech Stack Cube')
    .move(350, 30)
    .font({ family: 'Arial', size: 24, anchor: 'middle', fill: '#FFFFFF' });
  
  // Add screenshot of cube
  svgDocument.image(`data:image/png;base64,${screenshot}`)
    .move(100, 50)
    .size(600, 400);
  
  // Create listing of tech icons around the cube
  const iconSize = 28;
  const startX = 80;
  const startY = 460;
  const gap = 40;
  
  techIcons.forEach((icon, index) => {
    // Create circular background
    const circle = svgDocument.circle(iconSize + 10)
      .move(startX + index * gap - (iconSize + 10)/2, startY - (iconSize + 10)/2)
      .fill('#333');
      
    // Add icon image
    svgDocument.image(icon)
      .move(startX + index * gap - iconSize/2, startY - iconSize/2)
      .size(iconSize, iconSize);
  });
  
  // Add note
  svgDocument.text('Interactive 3D cube representation of my skills (updated automatically)')
    .move(400, 430)
    .font({ family: 'Arial', size: 12, anchor: 'middle', fill: '#AAAAAA' });
  
  // Save SVG file
  fs.writeFileSync('tech-stack-cube.svg', svgDocument.svg());
  
  console.log('Tech stack cube SVG created successfully!');
}

// Run the generator
generateTechStackCube().catch(console.error);
