import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export type VisionMode = 'tactical' | 'lidar' | 'thermal';

interface DroneCanvasProps {
  visionMode?: VisionMode;
  interactive?: boolean;
  className?: string;
  onTargetUpdate?: (coords: { az: number; el: number; dist: number }) => void;
}

export const DroneCanvas: React.FC<DroneCanvasProps> = ({
  visionMode = 'tactical',
  interactive = true,
  className = '',
  onTargetUpdate,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState<boolean>(true);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const visionRef = useRef<VisionMode>(visionMode);

  visionRef.current = visionMode;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL support
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
        return;
      }
    } catch {
      setWebglSupported(false);
      return;
    }

    // SCENE SETUP
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x080a0f, 0.05);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 4.8);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    container.appendChild(renderer.domElement);

    // LIGHTING
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xccff00, 2.5); // Acid Neon key
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    const rimCyanLight = new THREE.DirectionalLight(0x00f0ff, 3.0); // Bio-cyan rim
    rimCyanLight.position.set(-5, -2, -3);
    scene.add(rimCyanLight);

    const redAlertLight = new THREE.PointLight(0xff334b, 1.5, 12);
    redAlertLight.position.set(0, -3, 3);
    scene.add(redAlertLight);

    // ROOT DRONE RIG
    const droneGroup = new THREE.Group();
    scene.add(droneGroup);

    // Targeting Laser Beam Line
    const laserGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0.5),
      new THREE.Vector3(0, 0, 10),
    ]);
    const laserMat = new THREE.LineBasicMaterial({
      color: 0xccff00,
      transparent: true,
      opacity: 0.6,
      linewidth: 2,
    });
    const laserLine = new THREE.Line(laserGeo, laserMat);
    droneGroup.add(laserLine);

    // Holographic particle grid around drone
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      particlePos[i * 3] = (Math.random() - 0.5) * 6;
      particlePos[i * 3 + 1] = (Math.random() - 0.5) * 6;
      particlePos[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x00f0ff,
      size: 0.035,
      transparent: true,
      opacity: 0.5,
    });
    const particleCloud = new THREE.Points(particleGeo, particleMat);
    scene.add(particleCloud);

    // Original Materials Store for Mode Switching
    let originalMaterials: Map<THREE.Mesh, THREE.Material | THREE.Material[]> = new Map();
    let helmetMesh: THREE.Group | null = null;

    // Custom Shaders / Alternate Materials
    const wireframeLidarMat = new THREE.MeshBasicMaterial({
      color: 0xccff00,
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    });

    const thermalMat = new THREE.MeshStandardMaterial({
      color: 0xff3b30,
      emissive: 0x00f0ff,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.8,
      wireframe: false,
    });

    // LOAD GLTF MODEL
    const loader = new GLTFLoader();
    loader.load(
      'models/apex_sentinel.glb',
      (gltf) => {
        helmetMesh = gltf.scene;
        helmetMesh.scale.set(1.4, 1.4, 1.4);
        helmetMesh.position.set(0, -0.2, 0);

        helmetMesh.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            originalMaterials.set(mesh, mesh.material);
            mesh.castShadow = true;
            mesh.receiveShadow = true;
          }
        });

        droneGroup.add(helmetMesh);
        setIsLoaded(true);
      },
      (xhr) => {
        if (xhr.total > 0) {
          setLoadingProgress(Math.round((xhr.loaded / xhr.total) * 100));
        }
      },
      (err) => {
        console.warn('Fallback: Building procedural cyber drone head due to:', err);
        // Fallback procedural high-tech drone head if file not yet loaded
        const fallbackGroup = new THREE.Group();
        const coreGeo = new THREE.DodecahedronGeometry(1.0, 1);
        const coreMat = new THREE.MeshStandardMaterial({
          color: 0x222a38,
          metalness: 0.9,
          roughness: 0.2,
        });
        const core = new THREE.Mesh(coreGeo, coreMat);
        fallbackGroup.add(core);

        const visorGeo = new THREE.TorusGeometry(0.85, 0.15, 16, 32, Math.PI);
        const visorMat = new THREE.MeshStandardMaterial({
          color: 0xccff00,
          emissive: 0xccff00,
          emissiveIntensity: 0.8,
        });
        const visor = new THREE.Mesh(visorGeo, visorMat);
        visor.rotation.x = Math.PI / 2;
        visor.position.set(0, 0, 0.4);
        fallbackGroup.add(visor);

        droneGroup.add(fallbackGroup);
        helmetMesh = fallbackGroup;
        setIsLoaded(true);
      }
    );

    // MOUSE & POINTER TRACKING
    let mouseX = 0;
    let mouseY = 0;
    let isDragging = false;
    let prevPointerX = 0;
    let prevPointerY = 0;
    const targetRotation = { x: 0.1, y: -0.2 };
    const currentRotation = { x: 0.1, y: -0.2 };

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      if (!interactive) return;
      isDragging = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      prevPointerX = clientX;
      prevPointerY = clientY;
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const rect = container.getBoundingClientRect();
      const normX = ((clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = normX;
      mouseY = normY;

      if (onTargetUpdate) {
        onTargetUpdate({
          az: Math.round(normX * 180),
          el: Math.round(normY * 90),
          dist: parseFloat((4.8 - normY * 0.5).toFixed(2)),
        });
      }

      if (isDragging && interactive) {
        const deltaX = clientX - prevPointerX;
        const deltaY = clientY - prevPointerY;
        targetRotation.y += deltaX * 0.009;
        targetRotation.x += deltaY * 0.009;
        targetRotation.x = Math.max(-0.8, Math.min(0.8, targetRotation.x));
        prevPointerX = clientX;
        prevPointerY = clientY;
      }
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);
    container.addEventListener('touchstart', handlePointerDown, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchend', handlePointerUp);

    // ANIMATION LOOP
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Smooth rotation towards target
      currentRotation.x += (targetRotation.x - currentRotation.x) * 0.07;
      currentRotation.y += (targetRotation.y - currentRotation.y) * 0.07;

      // Subtle dynamic head tracking following cursor
      const lookOffsetPitch = mouseY * 0.25;
      const lookOffsetYaw = mouseX * 0.35;

      // Hover suspension vibration
      const hoverShake = Math.sin(elapsedTime * 6) * 0.015;
      const hoverFloat = Math.cos(elapsedTime * 1.5) * 0.06;

      droneGroup.rotation.x = currentRotation.x - lookOffsetPitch + hoverShake;
      droneGroup.rotation.y = currentRotation.y + lookOffsetYaw;
      droneGroup.position.y = hoverFloat;

      // Update laser aiming
      const positions = laserLine.geometry.attributes.position.array as Float32Array;
      positions[3] = mouseX * 3.5;
      positions[4] = mouseY * 3.5;
      positions[5] = 4.0;
      laserLine.geometry.attributes.position.needsUpdate = true;

      // Particle rotation
      particleCloud.rotation.y += delta * 0.1;
      particleCloud.rotation.x += delta * 0.05;

      // DYNAMIC VISION SHADER SWAPPING
      const currentMode = visionRef.current;
      if (helmetMesh) {
        helmetMesh.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            if (currentMode === 'lidar') {
              mesh.material = wireframeLidarMat;
            } else if (currentMode === 'thermal') {
              mesh.material = thermalMat;
            } else {
              const orig = originalMaterials.get(mesh);
              if (orig) mesh.material = orig;
            }
          }
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      container.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);

      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [interactive]);

  if (!webglSupported) {
    return (
      <div className={`flex flex-col items-center justify-center p-8 cyber-panel rounded-2xl text-center ${className}`}>
        <div className="w-40 h-40 rounded-full border border-cyber-neon/40 flex items-center justify-center animate-pulse mb-3">
          <span className="font-mono text-xs text-cyber-neon">LIDAR RADAR ACTIVE</span>
        </div>
        <p className="font-mono text-xs text-slate-400">WebGL hardware pipeline inactive. Synthetic HUD feed online.</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full cursor-crosshair select-none ${className}`}
      aria-label="Interactive 3D Autonomous Bio-Robotics Sentinel Drone"
    >
      {!isLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-cyber-bg/90 z-20 font-mono text-xs text-cyber-neon space-y-2">
          <div className="w-12 h-12 border-2 border-cyber-neon border-t-transparent rounded-full animate-spin" />
          <span>INITIALIZING NEURAL TELEMETRY... {loadingProgress}%</span>
        </div>
      )}
    </div>
  );
};
