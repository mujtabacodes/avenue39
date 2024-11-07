import React from "react";

interface ARExperienceProps {
  ImageUrl?: string | undefined; // The URL of your hosted .glb file
}

const ARExperience: React.FC<ARExperienceProps> = ({ ImageUrl }) => {
  if (!ImageUrl) {
    return <p>No AR content available</p>;
  }

  // Construct the full public URL of the .glb file
  const fileUrl = encodeURIComponent(`https://avenue39.vercel.app${ImageUrl}`);
  
  // Construct the Intent URI to open the Scene Viewer in AR mode
  const intentUri = `intent://arvr.google.com/scene-viewer/1.0?file=${fileUrl}&mode=ar_only#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=https%3A%2F%2Favenue39.vercel.app%2F3dmodel%2Fcarpet.glb;end;`;

  return (
    <div>
      <a href={intentUri} target="_blank" rel="noopener noreferrer">
        <button style={{ padding: '10px', fontSize: '16px' }}>
          View in AR
        </button>
      </a>
    </div>
  );
};

export default ARExperience;
