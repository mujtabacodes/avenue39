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

  // States for dragging and position
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [initialPlanePosition, setInitialPlanePosition] = useState(new THREE.Vector3());

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

      const loader = new GLTFLoader();
      loader.load('/models/example.glb', (gltf) => {
        scene.add(gltf.scene);
      });

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

      // Raycaster for detecting clicks on the plane
      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();

      const onPointerDown = (event: PointerEvent) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObject(planeRef.current as THREE.Mesh);

        if (intersects.length > 0) {
          setIsDragging(true);
          setDragStart({ x: event.clientX, y: event.clientY });
          if (planeRef.current) {
            setInitialPlanePosition(planeRef.current.position.clone());
          }
        }
      };

      const onPointerMove = (event: PointerEvent) => {
        if (isDragging && planeRef.current) {
          const deltaX = event.clientX - dragStart.x;
          const deltaY = event.clientY - dragStart.y;

          // Update plane position based on pointer movement
          const moveX = deltaX * 0.001; // Adjust the sensitivity
          const moveY = -deltaY * 0.001; // Invert Y direction for natural movement

          planeRef.current.position.set(
            initialPlanePosition.x + moveX,
            initialPlanePosition.y + moveY,
            initialPlanePosition.z
          );
        }
      };

      const onPointerUp = () => {
        setIsDragging(false);
      };

      // Attach event listeners to renderer DOM
      renderer.domElement.addEventListener('pointerdown', onPointerDown);
      renderer.domElement.addEventListener('pointermove', onPointerMove);
      renderer.domElement.addEventListener('pointerup', onPointerUp);

      const animate = () => {
        renderer.setAnimationLoop(() => {
          if (cameraRef.current && planeRef.current) {
            renderer.render(scene, camera);
          }
        });
      };

      animate();

      return () => {
        window.removeEventListener('resize', onWindowResize);
        renderer.domElement.removeEventListener('pointerdown', onPointerDown);
        renderer.domElement.removeEventListener('pointermove', onPointerMove);
        renderer.domElement.removeEventListener('pointerup', onPointerUp);
        containerRef.current?.removeChild(renderer.domElement);
      };
    }
  }, [ImageUrl]);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
};

export default ARExperience;
