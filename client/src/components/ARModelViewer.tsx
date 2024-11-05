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
  const [isDragging, setIsDragging] = useState(false);
  const [prevTouchPosition, setPrevTouchPosition] = useState<{ x: number; y: number } | null>(null);
  const [scale, setScale] = useState(1); // Track scale for zoom
  const [rotationAngle, setRotationAngle] = useState(0); // Track rotation

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

      const loader = new GLTFLoader();
      loader.load('/models/example.glb', (gltf) => {
        scene.add(gltf.scene);
      });

      const textureLoader = new THREE.TextureLoader();
      if (!ImageUrl) return;
      const texture = textureLoader.load(ImageUrl);

      // Create the plane with texture and add to the scene
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

            // Update plane position and scale
            planeRef.current.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z - 0.5);
            planeRef.current.rotation.copy(cameraRotation);
            planeRef.current.scale.set(scale, scale, scale); // Apply zoom (scale)
            planeRef.current.rotation.z = rotationAngle; // Apply rotation
          }

          renderer.render(scene, camera);
        });
      };

      animate();

      // Touch Events for Mobile Dragging and Interactions
      const onTouchStart = (event: TouchEvent) => {
        if (event.touches.length === 1) {
          // Single touch for dragging
          setIsDragging(true);
          setPrevTouchPosition({ x: event.touches[0].clientX, y: event.touches[0].clientY });
        } else if (event.touches.length === 2) {
          // Pinch to zoom
          setPrevTouchPosition(null); // Reset previous position to prevent drag
        }
      };

      const onTouchMove = (event: TouchEvent) => {
        if (isDragging && planeRef.current && prevTouchPosition) {
          const deltaX = (event.touches[0].clientX - prevTouchPosition.x) / window.innerWidth;
          const deltaY = (event.touches[0].clientY - prevTouchPosition.y) / window.innerHeight;
          planeRef.current.position.x += deltaX * 0.5; // Adjust sensitivity as needed
          planeRef.current.position.y -= deltaY * 0.5;
          setPrevTouchPosition({ x: event.touches[0].clientX, y: event.touches[0].clientY });
        } else if (event.touches.length === 2 && planeRef.current) {
          // Pinch gesture to zoom
          const touch1 = event.touches[0];
          const touch2 = event.touches[1];
          const distance = Math.sqrt(
            Math.pow(touch2.clientX - touch1.clientX, 2) + Math.pow(touch2.clientY - touch1.clientY, 2)
          );

          if (prevTouchPosition) {
            const prevDistance = Math.sqrt(
              Math.pow(prevTouchPosition.x - touch1.clientX, 2) + Math.pow(prevTouchPosition.y - touch1.clientY, 2)
            );
            const zoomFactor = distance / prevDistance;
            setScale(Math.max(0.5, Math.min(scale * zoomFactor, 3))); // Clamp between 0.5 and 3
          }
          setPrevTouchPosition({ x: touch1.clientX, y: touch1.clientY });
        }
      };

      const onTouchEnd = () => {
        setIsDragging(false);
        setPrevTouchPosition(null);
      };

      // Double-tap to rotate
      let lastTap = 0;
      const onDoubleTap = () => {
        const now = Date.now();
        if (now - lastTap < 300) { // Detect double-tap within 300ms
          setRotationAngle(rotationAngle + Math.PI / 2); // Rotate by 90 degrees
        }
        lastTap = now;
      };

      // Event listeners for touch events
      containerRef.current.addEventListener('touchstart', onTouchStart);
      containerRef.current.addEventListener('touchmove', onTouchMove);
      containerRef.current.addEventListener('touchend', onTouchEnd);
      containerRef.current.addEventListener('dblclick', onDoubleTap);

      return () => {
        window.removeEventListener('resize', onWindowResize);
        containerRef.current?.removeEventListener('touchstart', onTouchStart);
        containerRef.current?.removeEventListener('touchmove', onTouchMove);
        containerRef.current?.removeEventListener('touchend', onTouchEnd);
        containerRef.current?.removeEventListener('dblclick', onDoubleTap);
        containerRef.current?.removeChild(renderer.domElement);
      };
    }
  }, [ImageUrl, isDragging, rotationAngle, scale]);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
};

export default ARExperience;
