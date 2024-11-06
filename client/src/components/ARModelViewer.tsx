import React from "react";

interface ARExperienceProps {
  ImageUrl?: string | undefined; // The URL of your hosted .glb file
}

const ARExperience: React.FC<ARExperienceProps> = ({ ImageUrl="/3dmodel/carpet.glb" }) => {
  if (!ImageUrl) {
    return <p>No AR content available</p>;
  }

  // Construct the Google Scene Viewer URL with the .glb file URL
  const sceneViewerUrl = `https://arvr.google.com/scene-viewer/1.0?file=${encodeURIComponent(
    ImageUrl
  )}&mode=ar_only`;

  return (
    <div>
      <a href={sceneViewerUrl} target="_blank" rel="noopener noreferrer">
        <button style={{ padding: '10px', fontSize: '16px' }}>
          View in AR
        </button>
      </a>
    </div>
  );
};

export default ARExperience;
