import React from "react";
import Image from "next/image";
import { BannerImage } from "@/types/types";

type ImageBannerProps = {
  bannerImage: BannerImage;
};

const ImageBanner: React.FC<ImageBannerProps> = ({ bannerImage }) => {
  return (
    <div className="relative h-full "> 
      <Image className="!position-unset"
        src={bannerImage.image}
        alt={bannerImage.altText}
        layout="fill"
        objectFit="contain"
        quality={100}
      />
    </div>
  );
};

export default ImageBanner;
