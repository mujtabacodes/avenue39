import React from "react";

interface ARExperienceProps {
  ImageUrl: string | undefined;
}

const ARExperience: React.FC<ARExperienceProps> = ({ ImageUrl }) => {
  if (!ImageUrl) {
    return <p>No AR content available</p>;
  }

  // Construct the Google Scene Viewer URL
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

const ARExperiencePage = () => {
  // The URL of your .glb model hosted in the public directory
  const modelUrl = "/3dmodel/carpet.glb";

  return <ARExperience ImageUrl={modelUrl} />;
};

export default ARExperiencePage;
