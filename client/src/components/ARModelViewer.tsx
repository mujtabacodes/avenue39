'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ARButton } from 'three/examples/jsm/webxr/ARButton.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

interface ARExperienceProps {
  ImageUrl: string | undefined;
}

const ARExperience: React.FC<ARExperienceProps> = ({ ImageUrl }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const planeRef = useRef<THREE.Mesh | null>(null); // Reference to the plane
  const raycaster = useRef(new THREE.Raycaster());
  const touchStartPos = useRef<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 20);
      camera.position.set(0, 1.6, 0); // Simulate head height in AR
      cameraRef.current = camera;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.xr.enabled = true;
      containerRef.current.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      document.body.appendChild(ARButton.createButton(renderer));

      // Load GLTF model for testing (if needed)
      const loader = new GLTFLoader();
      loader.load('/models/example.glb', (gltf) => {
        scene.add(gltf.scene);
      });

      // Load and create the image plane
      const textureLoader = new THREE.TextureLoader();
      if (!ImageUrl) return;
      const texture = textureLoader.load(ImageUrl);

      const geometry = new THREE.PlaneGeometry(0.2, 0.2); // Size in meters (0.2m = 200mm)
      const material = new THREE.MeshBasicMaterial({ map: texture });
      const plane = new THREE.Mesh(geometry, material);
      plane.position.set(0, 0, -0.5); // Set 0.5m in front of the camera
      planeRef.current = plane;
      scene.add(plane);

      const onWindowResize = () => {
        if (cameraRef.current && rendererRef.current) {
          const { innerWidth, innerHeight } = window;
          cameraRef.current.aspect = innerWidth / innerHeight;
          cameraRef.current.updateProjectionMatrix();
          rendererRef.current.setSize(innerWidth, innerHeight);
        }
      };

      window.addEventListener('resize', onWindowResize);

      const animate = () => {
        renderer.setAnimationLoop(() => {
          if (cameraRef.current && planeRef.current) {
            const cameraPosition = cameraRef.current.position;
            const cameraRotation = cameraRef.current.rotation;

            // Keep the plane in front of the camera at a fixed distance
            planeRef.current.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z - 0.5);
            planeRef.current.rotation.copy(cameraRotation);
          }

          renderer.render(scene, camera);
        });
      };

      animate();

      // Touch event handlers for drag functionality
      const onTouchStart = (event: TouchEvent) => {
        if (!planeRef.current || !cameraRef.current) return;

        // Convert touch coordinates to normalized device coordinates (NDC)
        const touchX = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
        const touchY = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;

        // Set raycaster and check if the touch intersects with the plane
        raycaster.current.setFromCamera(new THREE.Vector2(touchX, touchY), cameraRef.current);
        const intersects = raycaster.current.intersectObject(planeRef.current);

        // Start dragging if plane is touched
        if (intersects.length > 0) {
          setIsDragging(true);
          touchStartPos.current = { x: event.touches[0].clientX, y: event.touches[0].clientY };
        }
      };

      const onTouchMove = (event: TouchEvent) => {
        if (isDragging && planeRef.current && touchStartPos.current) {
          // Calculate the movement delta
          const deltaX = (event.touches[0].clientX - touchStartPos.current.x) / window.innerWidth;
          const deltaY = (event.touches[0].clientY - touchStartPos.current.y) / window.innerHeight;

          // Update plane position based on the delta
          planeRef.current.position.x += deltaX * 0.5; // Adjust for sensitivity
          planeRef.current.position.y -= deltaY * 0.5;

          // Update start position to the current touch position
          touchStartPos.current = { x: event.touches[0].clientX, y: event.touches[0].clientY };
        }
      };

      const onTouchEnd = () => {
        setIsDragging(false);
        touchStartPos.current = null;
      };

      // Event listeners for touch events
      containerRef.current.addEventListener('touchstart', onTouchStart);
      containerRef.current.addEventListener('touchmove', onTouchMove);
      containerRef.current.addEventListener('touchend', onTouchEnd);

      return () => {
        window.removeEventListener('resize', onWindowResize);
        containerRef.current?.removeEventListener('touchstart', onTouchStart);
        containerRef.current?.removeEventListener('touchmove', onTouchMove);
        containerRef.current?.removeEventListener('touchend', onTouchEnd);
        containerRef.current?.removeChild(renderer.domElement);
      };
    }
  }, [ImageUrl, isDragging]);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
};

export default ARExperience;
