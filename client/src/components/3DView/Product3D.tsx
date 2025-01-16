import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF } from '@react-three/drei';

interface ModelProps {
  modelPath: string;
}

const Model: React.FC<ModelProps> = ({ modelPath }) => {
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} scale={[2, 2, 2]} />; // Further increase the scale to make the model larger
};

interface Product3DProps {
  modelUrl: string;
}

const Product3D: React.FC<Product3DProps> = ({ modelUrl }) => {
  return (
    <div className="w-[1000px] h-[700px]">
      {' '}
      {/* Increase the width and height of the container */}
      <Canvas camera={{ position: [0, 2, 10], fov: 40 }}>
        {' '}
        {/* Move the camera farther and reduce fov to zoom in */}
        <ambientLight intensity={0.8} />{' '}
        {/* Increase the light intensity for better visibility */}
        <pointLight position={[10, 10, 10]} intensity={1} />{' '}
        {/* Adjust point light for a better lighting effect */}
        <Model modelPath={modelUrl} />
        <OrbitControls />
        <Environment preset="warehouse" />
      </Canvas>
    </div>
  );
};

export default Product3D;
