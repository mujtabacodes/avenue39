'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ARButton } from 'three/examples/jsm/webxr/ARButton.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Interaction } from 'three.interaction';

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
  const interactionRef = useRef<Interaction | null>(null); // Reference for interaction events

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

      // Initialize interaction for events on 3D objects
      interactionRef.current = new Interaction(renderer, scene, camera);

      // Load GLTF model (optional)
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
      plane.position.set(0, 0, -0.5); // Initial position in front of the camera
      planeRef.current = plane;
      scene.add(plane);
     
      // Add interactive events for dragging
      //@ts-ignore
      plane.on('mousedown', (event:any) => {
        setIsDragging(true);
      });
//@ts-ignore
      plane.on('mousemove', (event:any) => {
        if (isDragging) {
          // Map mouse/touch movement to the scene's position
          const intersection = event.intersection.point;
          plane.position.set(intersection.x, intersection.y, intersection.z);
        }
      });
//@ts-ignore
      plane.on('mouseup', () => {
        setIsDragging(false);
      });

      // Responsive resizing
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

      // Cleanup on component unmount
      return () => {
        window.removeEventListener('resize', onWindowResize);
        containerRef.current?.removeChild(renderer.domElement);
      };
    }
  }, [ImageUrl]);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
};

export default ARExperience;
