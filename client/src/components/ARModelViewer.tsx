// "use client";

// import React, { useEffect, useRef } from 'react';
// import * as THREE from 'three';
// import { ARButton } from 'three/examples/jsm/webxr/ARButton.js';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// interface ARExperienceProps{
//   ImageUrl:string | undefined
// }

// const ARExperience: React.FC<ARExperienceProps> = ({ImageUrl}) => {
//   const containerRef = useRef<HTMLDivElement | null>(null);
//   const sceneRef = useRef<THREE.Scene | null>(null);
//   const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
//   const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

//   useEffect(() => {
//     if (containerRef.current) {
//       const scene = new THREE.Scene();
//       sceneRef.current = scene;

//       const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 20);
//       cameraRef.current = camera;

//       const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

//       renderer.setSize(window.innerWidth, window.innerHeight);
//       renderer.xr.enabled = true;
//       containerRef.current.appendChild(renderer.domElement);
//       rendererRef.current = renderer;

//       document.body.appendChild(ARButton.createButton(renderer));

//       const loader = new GLTFLoader();
//       loader.load('/models/example.glb', (gltf) => {
//         scene.add(gltf.scene);
//       });

//       const textureLoader = new THREE.TextureLoader();
//     if(!ImageUrl) return 
//       const texture = textureLoader.load(ImageUrl);
//       const geometry = new THREE.PlaneGeometry(2, 2); 
//       const material = new THREE.MeshBasicMaterial({ map: texture });
//       const plane = new THREE.Mesh(geometry, material);
//       plane.position.set(0, 0, -3); 
//       scene.add(plane);

//       const onWindowResize = () => {
//         if (cameraRef.current && rendererRef.current) {
//           const { innerWidth, innerHeight } = window;
//           cameraRef.current.aspect = innerWidth / innerHeight;
//           cameraRef.current.updateProjectionMatrix();
//           rendererRef.current.setSize(innerWidth, innerHeight);
//         }
//       };

//       window.addEventListener('resize', onWindowResize);


//       const animate = () => {
//         renderer.setAnimationLoop(() => {
//           renderer.render(scene, camera);
//         });
//       };

//       animate();
//       return () => {
//         window.removeEventListener('resize', onWindowResize);
//         containerRef.current?.removeChild(renderer.domElement);
//         // document.body.removeChild(ARButton.createButton(renderer));
//       };
//     }
//   }, []);

//   return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
// };

// export default ARExperience;



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
  const planeRef = useRef<THREE.Mesh | null>(null); // Reference to the plane

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
      loader.load('/3dmodel/carpet.glb', (gltf) => {
        scene.add(gltf.scene);
      });

      const textureLoader = new THREE.TextureLoader();
      if (!ImageUrl) return;
      const texture = textureLoader.load(ImageUrl);

      // Adjust the plane geometry to be 200x200 (as requested)
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
            planeRef.current.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z - 0.5); // Adjust Z for proper distance
            planeRef.current.rotation.copy(cameraRotation); // Align the plane's rotation with the camera
          }

          renderer.render(scene, camera);
        });
      };

      animate();

      return () => {
        window.removeEventListener('resize', onWindowResize);
        containerRef.current?.removeChild(renderer.domElement);
      };
    }
  }, [ImageUrl]);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
};

export default ARExperience;
