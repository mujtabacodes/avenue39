'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ARButton } from 'three/examples/jsm/webxr/ARButton.js';

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
  const [initialDistance, setInitialDistance] = useState<number | null>(null);
  const [initialRotation, setInitialRotation] = useState<number>(0);

  useEffect(() => {
    if (containerRef.current) {
      // Scene and Camera
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 20);
      camera.position.set(0, 1.6, 0);
      cameraRef.current = camera;

      // Renderer
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.xr.enabled = true;
      containerRef.current.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      // AR Button
      document.body.appendChild(ARButton.createButton(renderer));

      // Load Image Texture
      const textureLoader = new THREE.TextureLoader();
      const texture = textureLoader.load(ImageUrl ?? "");

      // Create a Plane with the Texture
      const geometry = new THREE.PlaneGeometry(0.2, 0.2);
      const material = new THREE.MeshBasicMaterial({ map: texture });
      const plane = new THREE.Mesh(geometry, material);
      plane.position.set(0, 0, -0.5);
      planeRef.current = plane;
      scene.add(plane);

      // Resize Handler
      const onWindowResize = () => {
        if (cameraRef.current && rendererRef.current) {
          const { innerWidth, innerHeight } = window;
          cameraRef.current.aspect = innerWidth / innerHeight;
          cameraRef.current.updateProjectionMatrix();
          rendererRef.current.setSize(innerWidth, innerHeight);
        }
      };
      window.addEventListener('resize', onWindowResize);

      // AR Render Loop
      const animate = () => {
        renderer.setAnimationLoop(() => {
          renderer.render(scene, camera);
        });
      };
      animate();

      // Cleanup
      return () => {
        window.removeEventListener('resize', onWindowResize);
        containerRef.current?.removeChild(renderer.domElement);
      };
    }
  }, [ImageUrl]);

  // Gesture Handlers
  const onTouchStart = (event: TouchEvent) => {
    if (event.touches.length === 1) {
      setIsDragging(true);
    } else if (event.touches.length === 2) {
      // Pinch Start: Calculate initial distance for zooming
      const distance = getTouchDistance(event);
      setInitialDistance(distance);
    }
  };

  const onTouchMove = (event: TouchEvent) => {
    if (isDragging && event.touches.length === 1 && planeRef.current) {
      const deltaX = event.changedTouches[0].clientX - event.touches[0].clientX;
      const deltaY = event.changedTouches[0].clientY - event.touches[0].clientY;

      // Update plane position based on movement
      planeRef.current.position.x += deltaX / window.innerWidth * 0.5;
      planeRef.current.position.y -= deltaY / window.innerHeight * 0.5;
    } else if (event.touches.length === 2 && initialDistance !== null && planeRef.current) {
      // Zooming: Adjust plane scale based on pinch movement
      const distance = getTouchDistance(event);
      const scaleChange = distance / initialDistance;
      planeRef.current.scale.set(scaleChange, scaleChange, scaleChange);
    }
  };


  const onTouchEnd = (event: TouchEvent) => {
    if (event.touches.length < 2) {
      setInitialDistance(null);
    }
    setIsDragging(false);
  };

  // Two-finger Tap Handler for Rotation
  const onDoubleTap = (event: TouchEvent) => {
    if (event.touches.length === 2 && planeRef.current) {
      // Toggle Rotation
      const newRotation = initialRotation + Math.PI / 2;
      setInitialRotation(newRotation);
      planeRef.current.rotation.z = newRotation;
    }
  };

  // Helper to calculate distance between two touch points
  const getTouchDistance = (event: TouchEvent) => {
    const dx = event.touches[0].pageX - event.touches[1].pageX;
    const dy = event.touches[0].pageY - event.touches[1].pageY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  // Attach event listeners to the container
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('touchstart', onTouchStart);
      container.addEventListener('touchmove', onTouchMove);
      container.addEventListener('touchend', onTouchEnd);
      container.addEventListener('dblclick', (event: Event) => {
        if (event instanceof TouchEvent) {
          onDoubleTap(event);
        }
      });
    }

    return () => {
      if (container) {
        container.removeEventListener('touchstart', onTouchStart);
        container.removeEventListener('touchmove', onTouchMove);
        container.removeEventListener('touchend', onTouchEnd);
        container.addEventListener('dblclick', (event: Event) => {
          if (event instanceof TouchEvent) {
            onDoubleTap(event);
          }
        });
      }
    };
  }, [initialDistance, isDragging, initialRotation]);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
};

export default ARExperience;
