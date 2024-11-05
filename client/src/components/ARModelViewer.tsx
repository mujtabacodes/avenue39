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

  useEffect(() => {
    if (containerRef.current && ImageUrl) {
      // Initialize Three.js elements
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 20);
      camera.position.set(0, 1.6, 0); // Approximate head height
      cameraRef.current = camera;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.xr.enabled = true;
      containerRef.current.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      // Add AR Button for WebXR functionality
      document.body.appendChild(ARButton.createButton(renderer));

      // Load the 3D model (for testing, you can replace this with any .glb file URL)
      const loader = new GLTFLoader();
      loader.load('/models/example.glb', (gltf) => {
        const model = gltf.scene;
        model.position.set(0, 0, -0.5); // Adjust model to appear in front of user
        model.scale.set(0.1, 0.1, 0.1); // Scale the model down for a realistic appearance
        scene.add(model);
      });

      // Load texture and add a plane with image overlay
      const textureLoader = new THREE.TextureLoader();
      const texture = textureLoader.load(ImageUrl);

      const geometry = new THREE.PlaneGeometry(0.2, 0.2); // 20cm x 20cm plane
      const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
      const plane = new THREE.Mesh(geometry, material);
      plane.position.set(0, 0, -0.6); // Set in front of the user
      plane.rotation.x = -Math.PI / 2; // Tilt to appear on ground
      scene.add(plane);

      // Lighting for better visual quality
      const light = new THREE.DirectionalLight(0xffffff, 0.8);
      light.position.set(1, 2, 1);
      scene.add(light);

      const ambientLight = new THREE.AmbientLight(0x404040, 1.5); // soft light
      scene.add(ambientLight);

      // Resize handling
      const onWindowResize = () => {
        if (cameraRef.current && rendererRef.current) {
          const { innerWidth, innerHeight } = window;
          camera.aspect = innerWidth / innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(innerWidth, innerHeight);
        }
      };
      window.addEventListener('resize', onWindowResize);

      // Render loop
      const animate = () => {
        renderer.setAnimationLoop(() => {
          renderer.render(scene, camera);
        });
      };
      animate();

      // Cleanup on unmount
      return () => {
        window.removeEventListener('resize', onWindowResize);
        containerRef.current?.removeChild(renderer.domElement);
      };
    }
  }, [ImageUrl]);

  return <div ref={containerRef} style={{ width: '100%', height: '100%', position: 'relative' }} />;
};

export default ARExperience;
