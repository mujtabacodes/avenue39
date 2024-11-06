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
  const planeRef = useRef<THREE.Mesh | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  const raycaster = useRef(new THREE.Raycaster());
  const pointer = useRef(new THREE.Vector2());

  useEffect(() => {
    if (containerRef.current) {
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 20);
      camera.position.set(0, 1.6, 0);
      cameraRef.current = camera;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.xr.enabled = true;
      containerRef.current.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      document.body.appendChild(ARButton.createButton(renderer));

      const textureLoader = new THREE.TextureLoader();
      if (!ImageUrl) return;
      const texture = textureLoader.load(ImageUrl);

      const geometry = new THREE.PlaneGeometry(0.2, 0.2);
      const material = new THREE.MeshBasicMaterial({ map: texture });
      const plane = new THREE.Mesh(geometry, material);
      plane.position.set(0, 0, -0.5);
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

      const handlePointerDown = (event: PointerEvent) => {
        if (!rendererRef.current || !planeRef.current || !cameraRef.current) return;

        // Convert pointer position to normalized device coordinates
        pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
        pointer.current.y = -(event.clientY / window.innerHeight) * 2 + 1;

        // Use raycasting to detect if the plane was clicked
        raycaster.current.setFromCamera(pointer.current, cameraRef.current);
        const intersects = raycaster.current.intersectObject(planeRef.current);

        if (intersects.length > 0) {
          setIsDragging(true); // Enable dragging
        }
      };

      const handlePointerMove = (event: PointerEvent) => {
        if (isDragging && planeRef.current && cameraRef.current) {
          // Calculate normalized device coordinates
          pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
          pointer.current.y = -(event.clientY / window.innerHeight) * 2 + 1;

          // Adjust the plane's position relative to the camera's direction
          const newPosition = new THREE.Vector3();
          raycaster.current.setFromCamera(pointer.current, cameraRef.current);
          raycaster.current.ray.at(0.5, newPosition); // Set distance in front of camera

          planeRef.current.position.copy(newPosition);
        }
      };

      const handlePointerUp = () => {
        setIsDragging(false); // Stop dragging when pointer is lifted
      };

      // Add event listeners for pointer events
      containerRef.current.addEventListener('pointerdown', handlePointerDown);
      containerRef.current.addEventListener('pointermove', handlePointerMove);
      containerRef.current.addEventListener('pointerup', handlePointerUp);

      const animate = () => {
        renderer.setAnimationLoop(() => {
          if (cameraRef.current) {
            renderer.render(scene, camera);
          }
        });
      };

      animate();

      return () => {
        window.removeEventListener('resize', onWindowResize);
        containerRef.current?.removeChild(renderer.domElement);

        // Remove event listeners
        containerRef.current?.removeEventListener('pointerdown', handlePointerDown);
        containerRef.current?.removeEventListener('pointermove', handlePointerMove);
        containerRef.current?.removeEventListener('pointerup', handlePointerUp);
      };
    }
  }, [ImageUrl, isDragging]);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
};

export default ARExperience;
