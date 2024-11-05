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
    const [prevTouchPosition, setPrevTouchPosition] = useState<{ x: number; y: number } | null>(null);  

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
            }, undefined, (error) => {
                console.error("Error loading GLTF model:", error);
            });

            const textureLoader = new THREE.TextureLoader();       
            if (!ImageUrl) {
                console.warn("No image URL provided.");
                return;
            } 

            // Delay showing the image by 3 seconds
            setTimeout(() => {
                textureLoader.load(
                    ImageUrl,
                    (texture) => {  // On load success
                        const geometry = new THREE.PlaneGeometry(0.2, 0.2); // Size in meters (0.2m = 200mm)       
                        const material = new THREE.MeshBasicMaterial({ map: texture });       
                        const plane = new THREE.Mesh(geometry, material);       
                        plane.position.set(0, 0, -0.5); // Place 0.5m in front of the camera       
                        planeRef.current = plane;       
                        scene.add(plane);   
                        console.log("Texture loaded and plane added to scene.");    
                    },
                    undefined,
                    (error) => {  // On load error
                        console.error("Error loading texture:", error);
                    }
                );
            }, 3000); // 3-second delay

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
                        planeRef.current.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z - 0.5);             
                        planeRef.current.rotation.copy(cameraRotation); // Align plane rotation with camera
                    }            
                    renderer.render(scene, camera);         
                });       
            };        

            const onTouchStart = (event: TouchEvent) => {         
                setIsDragging(true);         
                const touch = event.touches[0];         
                setPrevTouchPosition({ x: touch.clientX, y: touch.clientY });         
            };        

            const onTouchMove = (event: TouchEvent) => {         
                if (isDragging && planeRef.current && prevTouchPosition) {             
                    const touch = event.touches[0];             
                    const deltaX = (touch.clientX - prevTouchPosition.x) / window.innerWidth;             
                    const deltaY = (touch.clientY - prevTouchPosition.y) / window.innerHeight;             
                    planeRef.current.position.x += deltaX * 0.5; // Adjust for sensitivity             
                    planeRef.current.position.y -= deltaY * 0.5;             
                    setPrevTouchPosition({ x: touch.clientX, y: touch.clientY });         
                }       
            };        

            const onTouchEnd = () => {         
                setIsDragging(false);         
                setPrevTouchPosition(null);       
            };        

            window.addEventListener('touchstart', onTouchStart);        
            window.addEventListener('touchmove', onTouchMove);        
            window.addEventListener('touchend', onTouchEnd);        

            animate();        

            return () => {         
                window.removeEventListener('resize', onWindowResize);         
                window.removeEventListener('touchstart', onTouchStart);         
                window.removeEventListener('touchmove', onTouchMove);         
                window.removeEventListener('touchend', onTouchEnd);         
                containerRef.current?.removeChild(renderer.domElement);       
            };     
        }   
    }, [ImageUrl, isDragging]);   

    return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />; 
};  

export default ARExperience;
