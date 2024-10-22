'use client';
import React, { useState, useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader, Mesh } from 'three';
import { OrbitControls } from '@react-three/drei';

const ImageTo3D: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImage(url);
    }
  };

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {image && (
        <Canvas
          style={{
            height: '500px',
            width: '800px',
            marginTop: '20px',
          }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <ImageMesh image={image} />
          <OrbitControls />
        </Canvas>
      )}
    </div>
  );
};

type ImageMeshProps = {
  image: string;
};

const ImageMesh: React.FC<ImageMeshProps> = ({ image }) => {
  const texture = useLoader(TextureLoader, image);
  const meshRef = useRef<Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[5, 3, 256, 256]} />
      <meshStandardMaterial
        map={texture}
        displacementMap={texture}
        displacementScale={0.5}
      />
    </mesh>
  );
};

export default ImageTo3D;
