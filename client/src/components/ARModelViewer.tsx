'use client';

import React, { useEffect, useRef } from 'react';
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
  const planeRef = useRef<THREE.Mesh | null>(null); // Reference to the image plane

  useEffect(() => {
    if (containerRef.current) {
      // Setup the scene, camera, and renderer
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 20);
      camera.position.set(0, 1.6, 0); // Head height simulation in AR
      cameraRef.current = camera;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.xr.enabled = true;
      containerRef.current.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      // Add AR Button to enable AR functionality
      document.body.appendChild(ARButton.createButton(renderer));

      // Load a 3D model (optional; example model)
      const loader = new GLTFLoader();
      loader.load('/models/example.glb', (gltf) => {
        scene.add(gltf.scene);
      });

      // Load texture from the provided ImageUrl
      if (!ImageUrl) return;
      const textureLoader = new THREE.TextureLoader();
      const texture = textureLoader.load(ImageUrl);

      // Create a plane to display the image
      const geometry = new THREE.PlaneGeometry(0.2, 0.2); // Size in meters (0.2m = 200mm)
      const material = new THREE.MeshBasicMaterial({ map: texture });
      const plane = new THREE.Mesh(geometry, material);
      plane.position.set(0, 0, -0.5); // Set 0.5m in front of the camera
      planeRef.current = plane;
      scene.add(plane);

      // Window resize handler to keep aspect ratio
      const onWindowResize = () => {
        if (cameraRef.current && rendererRef.current) {
          const { innerWidth, innerHeight } = window;
          cameraRef.current.aspect = innerWidth / innerHeight;
          cameraRef.current.updateProjectionMatrix();
          rendererRef.current.setSize(innerWidth, innerHeight);
        }
      };

      window.addEventListener('resize', onWindowResize);

      // Animation loop to keep the plane in front of the camera
      const animate = () => {
        renderer.setAnimationLoop(() => {
          if (cameraRef.current && planeRef.current) {
            const cameraPosition = cameraRef.current.position;
            const cameraRotation = cameraRef.current.rotation;

            // Keep the plane in front of the camera at a fixed distance
            planeRef.current.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z - 0.5);
            planeRef.current.rotation.copy(cameraRotation); // Align plane's rotation with the camera
          }

          renderer.render(scene, camera);
        });
      };

      animate();

      // Cleanup on component unmount
      return () => {
        window.removeEventListener('resize', onWindowResize);
        containerRef.current?.removeChild(renderer.domElement);
        renderer.dispose();
      };
    }
  }, [ImageUrl]);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
};

export default ARExperience;