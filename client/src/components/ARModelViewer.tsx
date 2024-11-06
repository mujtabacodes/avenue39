import Link from "next/link";

interface ARExperienceProps {
  ImageUrl: string | undefined; // The URL of your hosted .glb file
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
      <Link href={sceneViewerUrl} rel="ar" target="_blank">
        <button style={{ padding: '10px', fontSize: '16px' }}>
          View in AR
        </button>
      </Link>
    </div>
  );
};

export default ARExperience;
