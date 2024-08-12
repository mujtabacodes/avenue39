"use client"
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ARButton } from 'three/examples/jsm/webxr/ARButton.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const ARExperience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      // Setup scene, camera, and renderer
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 20);
      cameraRef.current = camera;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.xr.enabled = true;
      containerRef.current.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      // Add ARButton to enable AR mode
      document.body.appendChild(ARButton.createButton(renderer));

      // Load 3D model
      const loader = new GLTFLoader();
      loader.load('/models/example.glb', (gltf) => {
        scene.add(gltf.scene);
      });

      const onWindowResize = () => {
        if (cameraRef.current && rendererRef.current) {
          const { innerWidth, innerHeight } = window;
          cameraRef.current.aspect = innerWidth / innerHeight;
          cameraRef.current.updateProjectionMatrix();
          rendererRef.current.setSize(innerWidth, innerHeight);
        }
      };

      window.addEventListener('resize', onWindowResize);

      // Animation loop
      const animate = () => {
        renderer.setAnimationLoop(() => {
          renderer.render(scene, camera);
        });
      };

      animate();

    //   return () => {
    //     window.removeEventListener('resize', onWindowResize);
    //     containerRef.current?.removeChild(renderer.domElement);
    //     document.body.removeChild(ARButton.createButton(renderer));
    //   };
    }
  }, []);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
};

export default ARExperience;
