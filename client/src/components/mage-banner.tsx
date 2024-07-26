import React from "react";
import Image from "next/image";
import { BannerImage } from "@/types/types";

type ImageBannerProps = {
  bannerImage: BannerImage;
};

const ImageBanner: React.FC<ImageBannerProps> = ({ bannerImage }) => {
  return (
    <div className="relative h-full "> 
      <Image className="w-full"
        src={bannerImage.image}
        alt={bannerImage.altText}
        objectFit="cover"
        quality={100}
      />
    </div>
  );
};

export default ImageBanner;
