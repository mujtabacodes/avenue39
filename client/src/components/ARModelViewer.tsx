//@ts-nocheck
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';

interface ARExperienceProps {
  ImageUrl?: string | undefined; // The URL of your hosted image
}

const ARExperience: React.FC<ARExperienceProps> = ({ ImageUrl }) => {
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const planeRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    if (!ImageUrl) return;

    // Create the scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Create the camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 2;
    cameraRef.current = camera;

    // Create the renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Load the image as a texture
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(ImageUrl); // The URL of your image (PNG/JPG)

    // Create a plane geometry and apply the texture
    const geometry = new THREE.PlaneGeometry(1, 1);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const plane = new THREE.Mesh(geometry, material);
    plane.position.set(0, 0, 0); // Place the plane in front of the camera
    scene.add(plane);
    planeRef.current = plane;

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();

    // Export the scene to .glb
    const exporter = new GLTFExporter();
    exporter.parse(scene, (result) => {
      const blob = new Blob([result], { type: 'application/octet-stream' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'model.glb';
      link.click();
    });

    // Cleanup
    return () => {
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      if (sceneRef.current) {
        sceneRef.current.dispose();
      }
    };
  }, [ImageUrl]);

  if (!ImageUrl) {
    return <p>No AR content available</p>;
  }

  // Construct the full public URL of the .glb file (assuming it's hosted on your server)
  const fileUrl = encodeURIComponent(`https://avenue39.vercel.app${ImageUrl}`);

  // Construct the Intent URI to open the Scene Viewer in AR mode
  const intentUri = `intent://arvr.google.com/scene-viewer/1.0?file=${fileUrl}&mode=ar_only#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=https%3A%2F%2Favenue39.vercel.app%2F3dmodel%2Fcarpet.glb;end;`;

  return (
    <div>
      <Link href={intentUri} target="_blank" rel="noopener noreferrer">
        <button style={{ padding: '10px', fontSize: '16px' }}>
          View in AR
        </button>
      </Link>
    </div>
  );
};

export default ARExperience;
