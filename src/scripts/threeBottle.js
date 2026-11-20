import * as THREE from 'three';

/**
 * Photorealistic 3D Skincare Dropper Bottle Experience
 * Features:
 * - Physical glass transmission & refraction
 * - Floating levitation & smooth mouse tilt parallax
 * - Click & drag 360-degree rotation
 * - Rose-gold orbit rings with gentle counter-rotation
 * - Sculpted pedestal with specular reflections and soft contact shadow
 * - Floating golden sparkles / stardust with depth twinkle
 * - Interactive hotspot indicators
 * - Reduced motion support
 */

export class LuxuryBottleExperience {
  constructor(containerElement, options = {}) {
    this.container = containerElement;
    this.options = Object.assign({
      reducedMotion: false,
      enableHotspots: true
    }, options);

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.bottleGroup = null;
    this.pedestalGroup = null;
    this.orbitRingsGroup = null;
    this.particles = null;
    this.lights = [];
    this.clock = new THREE.Clock();

    // Mouse & Drag State
    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.isDragging = false;
    this.dragStart = { x: 0, y: 0 };
    this.rotationVelocity = { x: 0, y: 0 };
    this.userRotation = { x: 0, y: 0 };
    this.isPaused = false;
    this.animationFrameId = null;

    this.init();
  }

  init() {
    if (!this.container) return;

    // 1. Scene setup
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x06110c, 0.04);

    // 2. Camera setup
    const aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera = new THREE.PerspectiveCamera(40, aspect, 0.1, 50);
    this.camera.position.set(0, 0.4, 4.2);
    this.camera.lookAt(0, 0.1, 0);

    // 3. Renderer setup
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.container.appendChild(this.renderer.domElement);

    // 4. Create Studio Lighting & Environment Map
    this.setupLighting();
    this.setupEnvironment();

    // 5. Build 3D Objects
    this.buildPedestal();
    this.buildBottle();
    this.buildOrbitRings();
    this.buildSparkles();

    // 6. Event Listeners
    this.bindEvents();

    // 7. Start Render Loop
    this.animate();
  }

  setupLighting() {
    // Ambient light - Deep forest green tone
    const ambientLight = new THREE.AmbientLight(0x0d2218, 1.8);
    this.scene.add(ambientLight);

    // Key Light - Warm champagne gold (Top Front-Right)
    const keyLight = new THREE.DirectionalLight(0xfff2d4, 3.2);
    keyLight.position.set(3, 4, 3.5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 10;
    keyLight.shadow.bias = -0.0005;
    this.scene.add(keyLight);
    this.lights.push(keyLight);

    // Rim Light - Rose gold / warm blush (Back Left) to create brilliant rim highlights on glass
    const rimLight = new THREE.DirectionalLight(0xe59a85, 4.0);
    rimLight.position.set(-3.5, 2.5, -2.5);
    this.scene.add(rimLight);
    this.lights.push(rimLight);

    // Fill Light - Soft luminous sage (Front Left)
    const fillLight = new THREE.DirectionalLight(0x8ba899, 1.4);
    fillLight.position.set(-2.5, 0.5, 2.5);
    this.scene.add(fillLight);
    this.lights.push(fillLight);

    // Liquid Core Caustic Point Light - Warm inner glow
    const coreLight = new THREE.PointLight(0xffd599, 2.0, 3.0);
    coreLight.position.set(0, 0.1, 0.2);
    this.scene.add(coreLight);
    this.lights.push(coreLight);

    // Under-glow for Pedestal
    const pedestalLight = new THREE.PointLight(0xd4af37, 1.5, 2.5);
    pedestalLight.position.set(0, -0.9, 0.8);
    this.scene.add(pedestalLight);
    this.lights.push(pedestalLight);
  }

  setupEnvironment() {
    // Generate an internal high-contrast studio environment canvas for reflections
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Gradient background: dark emerald to deep twilight
    const grad = ctx.createLinearGradient(0, 0, 0, 512);
    grad.addColorStop(0, '#060d09');
    grad.addColorStop(0.5, '#0b1d14');
    grad.addColorStop(1, '#030805');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 512);

    // Studio softbox 1: Warm gold overhead glow
    const rad1 = ctx.createRadialGradient(300, 150, 10, 300, 150, 220);
    rad1.addColorStop(0, 'rgba(255, 240, 210, 0.95)');
    rad1.addColorStop(0.4, 'rgba(212, 175, 55, 0.6)');
    rad1.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = rad1;
    ctx.beginPath();
    ctx.arc(300, 150, 220, 0, Math.PI * 2);
    ctx.fill();

    // Studio softbox 2: Rose-gold rim strip
    const rad2 = ctx.createRadialGradient(850, 200, 10, 850, 200, 180);
    rad2.addColorStop(0, 'rgba(235, 175, 160, 0.9)');
    rad2.addColorStop(0.5, 'rgba(200, 120, 100, 0.4)');
    rad2.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = rad2;
    ctx.beginPath();
    ctx.arc(850, 200, 180, 0, Math.PI * 2);
    ctx.fill();

    // Horizontal studio bounce strip
    const stripGrad = ctx.createLinearGradient(0, 320, 1024, 320);
    stripGrad.addColorStop(0, 'rgba(10, 25, 18, 0)');
    stripGrad.addColorStop(0.5, 'rgba(240, 225, 190, 0.4)');
    stripGrad.addColorStop(1, 'rgba(10, 25, 18, 0)');
    ctx.fillStyle = stripGrad;
    ctx.fillRect(0, 300, 1024, 40);

    const envTexture = new THREE.CanvasTexture(canvas);
    envTexture.mapping = THREE.EquirectangularReflectionMapping;
    this.scene.environment = envTexture;
  }

  buildBottle() {
    this.bottleGroup = new THREE.Group();
    this.bottleGroup.position.set(0, 0.25, 0);

    // --- 1. Outer Glass Bottle (Heavy Luxury Base & Refraction) ---
    // Outer glass body profile: Heavy base, cylindrical body, tapered shoulder, threaded neck
    const points = [];
    // Flat bottom with slight bevel
    points.push(new THREE.Vector2(0, -0.75));
    points.push(new THREE.Vector2(0.48, -0.75));
    points.push(new THREE.Vector2(0.52, -0.72));
    // Upright cylindrical body
    points.push(new THREE.Vector2(0.54, -0.65));
    points.push(new THREE.Vector2(0.54, 0.22));
    // Curved shoulder
    points.push(new THREE.Vector2(0.52, 0.32));
    points.push(new THREE.Vector2(0.44, 0.40));
    points.push(new THREE.Vector2(0.30, 0.47));
    // Neck
    points.push(new THREE.Vector2(0.24, 0.52));
    points.push(new THREE.Vector2(0.24, 0.72));
    // Rim lip
    points.push(new THREE.Vector2(0.26, 0.74));
    points.push(new THREE.Vector2(0.21, 0.76));
    points.push(new THREE.Vector2(0.18, 0.74));
    // Inner glass wall
    points.push(new THREE.Vector2(0.18, 0.52));
    points.push(new THREE.Vector2(0.24, 0.45));
    points.push(new THREE.Vector2(0.44, 0.35));
    points.push(new THREE.Vector2(0.46, 0.20));
    points.push(new THREE.Vector2(0.46, -0.52));
    // Heavy glass base inner bottom (shows thick glass bottom)
    points.push(new THREE.Vector2(0.40, -0.56));
    points.push(new THREE.Vector2(0.0, -0.56));

    const bottleGeo = new THREE.LatheGeometry(points, 64);
    bottleGeo.computeVertexNormals();

    // High-End Physical Glass Material with Emerald Tint & Luminous Refraction
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x22553f,         // Luminous forest emerald
      transmission: 0.97,       // Exceptional clarity
      opacity: 1.0,
      transparent: true,
      roughness: 0.03,          // Ultra-smooth polished cosmetic glass
      metalness: 0.02,
      ior: 1.54,                // High refractive index of borosilicate perfume glass
      thickness: 0.45,
      specularIntensity: 1.0,
      specularColor: 0xfff6e6,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
      attenuationColor: 0x164230,
      attenuationDistance: 2.8
    });

    const bottleMesh = new THREE.Mesh(bottleGeo, glassMat);
    bottleMesh.castShadow = true;
    bottleMesh.receiveShadow = true;
    this.bottleGroup.add(bottleMesh);

    // --- 2. Inner Golden Botanical Liquid (The Luminous Elixir) ---
    const liquidPoints = [];
    liquidPoints.push(new THREE.Vector2(0, -0.55));
    liquidPoints.push(new THREE.Vector2(0.44, -0.55));
    liquidPoints.push(new THREE.Vector2(0.45, -0.50));
    liquidPoints.push(new THREE.Vector2(0.45, 0.18));
    // Liquid meniscus curve
    liquidPoints.push(new THREE.Vector2(0.43, 0.21));
    liquidPoints.push(new THREE.Vector2(0.0, 0.19));

    const liquidGeo = new THREE.LatheGeometry(liquidPoints, 64);
    const liquidMat = new THREE.MeshPhysicalMaterial({
      color: 0xffa42b,          // Radiant golden botanical nectar
      emissive: 0x8a4505,       // Warm honey luminosity
      emissiveIntensity: 0.7,
      transmission: 0.45,
      roughness: 0.08,
      ior: 1.42,
      thickness: 0.35,
      specularIntensity: 1.0,
      specularColor: 0xffe8b8
    });

    const liquidMesh = new THREE.Mesh(liquidGeo, liquidMat);
    this.bottleGroup.add(liquidMesh);

    // --- 3. Pipette Tube (Internal Borosilicate Glass Pipette) ---
    const pipetteGeo = new THREE.CylinderGeometry(0.032, 0.024, 0.95, 32);
    const pipetteMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.96,
      transparent: true,
      opacity: 0.9,
      roughness: 0.02,
      ior: 1.48
    });
    const pipetteMesh = new THREE.Mesh(pipetteGeo, pipetteMat);
    pipetteMesh.position.set(0, -0.05, 0);
    this.bottleGroup.add(pipetteMesh);

    // Pipette tip droplet
    const dropletGeo = new THREE.SphereGeometry(0.038, 24, 24);
    dropletGeo.scale(1, 1.4, 1);
    const dropletMesh = new THREE.Mesh(dropletGeo, liquidMat);
    dropletMesh.position.set(0, -0.53, 0);
    this.bottleGroup.add(dropletMesh);

    // --- 4. Dropper Collar (Brushed Rose-Gold / Champagne Gold Metal) ---
    const collarGeo = new THREE.CylinderGeometry(0.275, 0.275, 0.28, 64);
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xe0ad98,          // Rose-gold tone
      metalness: 0.92,
      roughness: 0.22,          // Satin brushed luxury metal
      envMapIntensity: 2.2
    });
    const collarMesh = new THREE.Mesh(collarGeo, goldMat);
    collarMesh.position.set(0, 0.68, 0);
    collarMesh.castShadow = true;
    this.bottleGroup.add(collarMesh);

    // Collar decorative bevel ring
    const ringGeo = new THREE.TorusGeometry(0.28, 0.018, 24, 64);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xf5d393,          // Polished champagne gold highlight
      metalness: 0.98,
      roughness: 0.1,
      envMapIntensity: 2.8
    });
    const bevelRing = new THREE.Mesh(ringGeo, ringMat);
    bevelRing.rotation.x = Math.PI / 2;
    bevelRing.position.set(0, 0.81, 0);
    this.bottleGroup.add(bevelRing);

    const bottomBevel = new THREE.Mesh(ringGeo, ringMat);
    bottomBevel.rotation.x = Math.PI / 2;
    bottomBevel.position.set(0, 0.55, 0);
    this.bottleGroup.add(bottomBevel);

    // --- 5. Dropper Bulb (Velvety Soft-Touch Dark Green Rubber Bulb) ---
    const bulbPoints = [];
    bulbPoints.push(new THREE.Vector2(0, 1.25));
    bulbPoints.push(new THREE.Vector2(0.12, 1.24));
    bulbPoints.push(new THREE.Vector2(0.19, 1.15));
    bulbPoints.push(new THREE.Vector2(0.22, 1.0));
    bulbPoints.push(new THREE.Vector2(0.23, 0.86));
    bulbPoints.push(new THREE.Vector2(0.21, 0.82));
    bulbPoints.push(new THREE.Vector2(0, 0.82));

    const bulbGeo = new THREE.LatheGeometry(bulbPoints, 48);
    const bulbMat = new THREE.MeshStandardMaterial({
      color: 0x07150f,          // Deep obsidian forest rubber
      roughness: 0.72,          // Matte soft-touch velvet feel
      metalness: 0.08
    });
    const bulbMesh = new THREE.Mesh(bulbGeo, bulbMat);
    bulbMesh.castShadow = true;
    this.bottleGroup.add(bulbMesh);

    // --- 6. Embossed Front Label with Rose-Gold Foil Texture ---
    const labelTexture = this.createLabelTexture();
    const labelThetaLength = Math.PI * 0.72;
    const labelThetaStart = (Math.PI / 2) - (labelThetaLength / 2);
    const labelGeo = new THREE.CylinderGeometry(0.552, 0.552, 0.64, 48, 1, true, labelThetaStart, labelThetaLength);
    const labelMat = new THREE.MeshStandardMaterial({
      map: labelTexture,
      roughness: 0.28,
      metalness: 0.45,
      side: THREE.DoubleSide
    });
    const labelMesh = new THREE.Mesh(labelGeo, labelMat);
    labelMesh.position.set(0, -0.15, 0);
    this.bottleGroup.add(labelMesh);

    this.scene.add(this.bottleGroup);
  }

  createLabelTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 700;
    const ctx = canvas.getContext('2d');

    // Transparent / frosted parchment background
    ctx.fillStyle = 'rgba(247, 243, 235, 0.94)';
    ctx.fillRect(0, 0, 1024, 700);

    // Fine gold foil border
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 4;
    ctx.strokeRect(30, 30, 964, 640);

    ctx.strokeStyle = '#e2a792';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(42, 42, 940, 616);

    // Brand Crest Icon
    ctx.fillStyle = '#b38234';
    ctx.font = '32px serif';
    ctx.textAlign = 'center';
    ctx.fillText('✦   É   ✦', 512, 110);

    // Brand Name
    ctx.fillStyle = '#0a1a12';
    ctx.font = '600 52px "Cormorant Garamond", Georgia, serif';
    ctx.letterSpacing = '8px';
    ctx.fillText('ÉLAN BOTANIQUE', 512, 195);

    // Tagline / Subtitle
    ctx.fillStyle = '#6d8577';
    ctx.font = '400 20px "Plus Jakarta Sans", sans-serif';
    ctx.letterSpacing = '5px';
    ctx.fillText('HAUTE SKINCARE • GENEVA & PROVENCE', 512, 245);

    // Separator line with gold diamond
    ctx.strokeStyle = '#c59b7b';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(320, 280);
    ctx.lineTo(704, 280);
    ctx.stroke();

    // Product Title
    ctx.fillStyle = '#08140e';
    ctx.font = 'italic 500 44px "Cormorant Garamond", Georgia, serif';
    ctx.letterSpacing = '3px';
    ctx.fillText('The Luminous Elixir', 512, 355);

    // Description text
    ctx.fillStyle = '#4a5b51';
    ctx.font = '300 22px "Plus Jakarta Sans", sans-serif';
    ctx.letterSpacing = '2px';
    ctx.fillText('ALPINE ROSE PHYTOCELLS', 512, 420);
    ctx.fillText('COLD-PRESSED TSUBAKI & BAKUCHIOL', 512, 458);

    // Batch & volume
    ctx.fillStyle = '#b38234';
    ctx.font = '400 19px "Plus Jakarta Sans", sans-serif';
    ctx.letterSpacing = '3px';
    ctx.fillText('MICRO-BATCH NO. 04 / 500', 512, 535);

    ctx.fillStyle = '#55655a';
    ctx.font = '400 18px "Plus Jakarta Sans", sans-serif';
    ctx.letterSpacing = '4px';
    ctx.fillText('30 ML  •  1.0 FL. OZ.  •  e', 512, 580);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.repeat.x = -1;
    texture.anisotropy = 8;
    return texture;
  }

  buildPedestal() {
    this.pedestalGroup = new THREE.Group();
    this.pedestalGroup.position.set(0, -1.05, 0);

    // 1. Fluted / Sculpted Dark Obsidian Stone Cylinder Base
    const pedestalGeo = new THREE.CylinderGeometry(1.25, 1.35, 0.45, 64);
    const stoneMat = new THREE.MeshStandardMaterial({
      color: 0x081510,          // Dark forest obsidian stone
      roughness: 0.45,
      metalness: 0.15
    });
    const pedestalMesh = new THREE.Mesh(pedestalGeo, stoneMat);
    pedestalMesh.receiveShadow = true;
    this.pedestalGroup.add(pedestalMesh);

    // 2. Sculpted Upper Tier Disc with Mirror Reflection Top
    const tierGeo = new THREE.CylinderGeometry(1.05, 1.15, 0.12, 64);
    const mirrorMat = new THREE.MeshStandardMaterial({
      color: 0x05100b,
      roughness: 0.18,          // Polished dark stone with soft reflection
      metalness: 0.6,
      envMapIntensity: 2.0
    });
    const tierMesh = new THREE.Mesh(tierGeo, mirrorMat);
    tierMesh.position.set(0, 0.28, 0);
    tierMesh.receiveShadow = true;
    this.pedestalGroup.add(tierMesh);

    // 3. Rose Gold Trim Rings on Pedestal
    const ringGeo = new THREE.TorusGeometry(1.06, 0.015, 16, 64);
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xe2a792,
      metalness: 0.95,
      roughness: 0.15
    });
    const trimRing = new THREE.Mesh(ringGeo, goldMat);
    trimRing.rotation.x = Math.PI / 2;
    trimRing.position.set(0, 0.34, 0);
    this.pedestalGroup.add(trimRing);

    // 4. Contact Shadow Disc beneath bottle
    const shadowGeo = new THREE.PlaneGeometry(1.2, 1.2);
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const sCtx = shadowCanvas.getContext('2d');
    const rad = sCtx.createRadialGradient(128, 128, 10, 128, 128, 120);
    rad.addColorStop(0, 'rgba(0, 0, 0, 0.85)');
    rad.addColorStop(0.5, 'rgba(0, 0, 0, 0.45)');
    rad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    sCtx.fillStyle = rad;
    sCtx.fillRect(0, 0, 256, 256);

    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      opacity: 0.85,
      depthWrite: false
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.set(0, 0.35, 0);
    this.pedestalGroup.add(shadowMesh);

    this.scene.add(this.pedestalGroup);
  }

  buildOrbitRings() {
    this.orbitRingsGroup = new THREE.Group();
    this.orbitRingsGroup.position.set(0, 0.15, 0);

    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xf3cca3,          // Luminous rose-gold
      metalness: 0.98,
      roughness: 0.15,
      emissive: 0x5a3425,
      emissiveIntensity: 0.25
    });

    // Ring 1 - Inner inclined orbit
    const ring1Geo = new THREE.TorusGeometry(1.05, 0.009, 16, 120);
    this.ring1 = new THREE.Mesh(ring1Geo, goldMat);
    this.ring1.rotation.x = Math.PI / 3.2;
    this.ring1.rotation.y = Math.PI / 6;
    this.orbitRingsGroup.add(this.ring1);

    // Ring 2 - Outer counter-inclined orbit
    const ring2Geo = new THREE.TorusGeometry(1.35, 0.007, 16, 120);
    this.ring2 = new THREE.Mesh(ring2Geo, goldMat);
    this.ring2.rotation.x = -Math.PI / 3.8;
    this.ring2.rotation.z = Math.PI / 5;
    this.orbitRingsGroup.add(this.ring2);

    this.scene.add(this.orbitRingsGroup);
  }

  buildSparkles() {
    const particleCount = 120;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);
    const twinkleSpeed = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      // Cylindrical / spherical spread around the bottle
      const radius = 0.6 + Math.random() * 1.8;
      const theta = Math.random() * Math.PI * 2;
      const y = -0.8 + Math.random() * 2.4;

      positions[i * 3] = radius * Math.cos(theta);
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = radius * Math.sin(theta);

      scales[i] = 0.02 + Math.random() * 0.04;
      twinkleSpeed[i] = 1.0 + Math.random() * 3.0;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));
    geometry.setAttribute('twinkleSpeed', new THREE.BufferAttribute(twinkleSpeed, 1));

    // Particle sprite
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 64;
    pCanvas.height = 64;
    const pCtx = pCanvas.getContext('2d');
    const pGrad = pCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
    pGrad.addColorStop(0, 'rgba(255, 245, 220, 1.0)');
    pGrad.addColorStop(0.25, 'rgba(240, 190, 150, 0.8)');
    pGrad.addColorStop(0.7, 'rgba(212, 175, 55, 0.2)');
    pGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    pCtx.fillStyle = pGrad;
    pCtx.fillRect(0, 0, 64, 64);

    const pTex = new THREE.CanvasTexture(pCanvas);
    const material = new THREE.PointsMaterial({
      size: 0.07,
      map: pTex,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  }

  bindEvents() {
    // Mouse Move Parallax
    this.onMouseMove = (e) => {
      const rect = this.container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      this.mouse.targetX = x * 0.45;
      this.mouse.targetY = y * 0.25;

      if (this.isDragging) {
        const deltaX = e.clientX - this.dragStart.x;
        const deltaY = e.clientY - this.dragStart.y;
        this.userRotation.y += deltaX * 0.008;
        this.userRotation.x += deltaY * 0.005;
        this.dragStart.x = e.clientX;
        this.dragStart.y = e.clientY;
      }
    };

    // Drag to rotate interactions
    this.onMouseDown = (e) => {
      this.isDragging = true;
      this.dragStart.x = e.clientX;
      this.dragStart.y = e.clientY;
      this.container.style.cursor = 'grabbing';
    };

    this.onMouseUp = () => {
      this.isDragging = false;
      this.container.style.cursor = 'grab';
    };

    // Touch support for mobile
    this.onTouchStart = (e) => {
      if (e.touches.length === 1) {
        this.isDragging = true;
        this.dragStart.x = e.touches[0].clientX;
        this.dragStart.y = e.touches[0].clientY;
      }
    };

    this.onTouchMove = (e) => {
      if (this.isDragging && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - this.dragStart.x;
        const deltaY = e.touches[0].clientY - this.dragStart.y;
        this.userRotation.y += deltaX * 0.009;
        this.userRotation.x += deltaY * 0.005;
        this.dragStart.x = e.touches[0].clientX;
        this.dragStart.y = e.touches[0].clientY;
      }
    };

    this.onTouchEnd = () => {
      this.isDragging = false;
    };

    // Window Resize
    this.onResize = () => {
      if (!this.container) return;
      const width = this.container.clientWidth;
      const height = this.container.clientHeight;
      if (width === 0 || height === 0) return;

      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    };

    window.addEventListener('mousemove', this.onMouseMove, { passive: true });
    this.container.addEventListener('mousedown', this.onMouseDown);
    window.addEventListener('mouseup', this.onMouseUp);
    this.container.addEventListener('touchstart', this.onTouchStart, { passive: true });
    window.addEventListener('touchmove', this.onTouchMove, { passive: true });
    window.addEventListener('touchend', this.onTouchEnd);
    window.addEventListener('resize', this.onResize);
    this.container.style.cursor = 'grab';
  }

  animate() {
    this.animationFrameId = requestAnimationFrame(() => this.animate());

    if (this.isPaused) return;

    const delta = this.clock.getDelta();
    const elapsedTime = this.clock.getElapsedTime();

    // Reduced motion respect
    const motionFactor = this.options.reducedMotion ? 0.08 : 1.0;

    // Smooth mouse lerp
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;

    // 1. Bottle Levitation & Rotation
    if (this.bottleGroup) {
      // Gentle idle vertical bobbing
      const levitation = Math.sin(elapsedTime * 1.4) * 0.06 * motionFactor;
      this.bottleGroup.position.y = 0.22 + levitation;

      // Base idle continuous slow rotation
      if (!this.isDragging && !this.options.reducedMotion) {
        this.userRotation.y += delta * 0.28;
      }

      // Constrain vertical pitch
      this.userRotation.x = Math.max(-0.35, Math.min(0.35, this.userRotation.x));

      this.bottleGroup.rotation.y = this.userRotation.y + this.mouse.x * 0.6;
      this.bottleGroup.rotation.x = this.userRotation.x - this.mouse.y * 0.4;
      this.bottleGroup.rotation.z = Math.sin(elapsedTime * 0.8) * 0.02 * motionFactor;
    }

    // 2. Orbit Rings Counter-Rotation
    if (this.ring1 && this.ring2) {
      this.ring1.rotation.z += delta * 0.15 * motionFactor;
      this.ring2.rotation.y += delta * -0.18 * motionFactor;
      this.ring2.rotation.x = -Math.PI / 3.8 + Math.sin(elapsedTime * 0.5) * 0.05;
    }

    // 3. Sparkles Animation
    if (this.particles) {
      this.particles.rotation.y = elapsedTime * 0.04 * motionFactor;
      const positions = this.particles.geometry.attributes.position.array;
      for (let i = 0; i < positions.length / 3; i++) {
        // Slow vertical ascent
        positions[i * 3 + 1] += 0.0012 * motionFactor;
        if (positions[i * 3 + 1] > 1.8) {
          positions[i * 3 + 1] = -0.8;
        }
      }
      this.particles.geometry.attributes.position.needsUpdate = true;
    }

    // 4. Pedestal subtle response
    if (this.pedestalGroup) {
      this.pedestalGroup.rotation.y = this.mouse.x * 0.15;
    }

    // Render Scene
    this.renderer.render(this.scene, this.camera);
  }

  setReducedMotion(enabled) {
    this.options.reducedMotion = enabled;
  }

  togglePause() {
    this.isPaused = !this.isPaused;
    return this.isPaused;
  }

  resetView() {
    this.userRotation.x = 0;
    this.userRotation.y = 0;
    this.mouse.targetX = 0;
    this.mouse.targetY = 0;
  }

  destroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    window.removeEventListener('mousemove', this.onMouseMove);
    this.container.removeEventListener('mousedown', this.onMouseDown);
    window.removeEventListener('mouseup', this.onMouseUp);
    this.container.removeEventListener('touchstart', this.onTouchStart);
    window.removeEventListener('touchmove', this.onTouchMove);
    window.removeEventListener('touchend', this.onTouchEnd);
    window.removeEventListener('resize', this.onResize);

    if (this.renderer && this.renderer.domElement) {
      this.container.removeChild(this.renderer.domElement);
      this.renderer.dispose();
    }
  }
}
