import Link from "next/link";
import React from "react";

interface ARExperienceProps {
  ImageUrl?: string | undefined;
}

const ARExperience: React.FC<ARExperienceProps> = ({ ImageUrl }) => {
  if (!ImageUrl) {
    return <p>No AR content available</p>;
  }

  const fileUrl = encodeURIComponent(`https://avenue39.vercel.app${ImageUrl}`);
  const intentUri = `intent://arvr.google.com/scene-viewer/1.0?file=${fileUrl}&mode=ar_only#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=https%3A%2F%2Favenue39.vercel.app%2F3dmodel%2Fcarpet.glb;end;`;

  return (
    <div>
      <Link href={intentUri} target="_blank" rel="noopener noreferrer" className="bg-warning hover:bg-white hover:text-black hover:border hover:border-black w-full text-white flex justify-center items-center gap-3 h-12 rounded-2xl">
          View in AR
      </Link>
    </div>
  );
};

export default ARExperience;
