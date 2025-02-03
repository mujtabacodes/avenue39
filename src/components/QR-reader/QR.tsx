import React from 'react';
import QRCode from 'qrcode.react';

interface QRPROPS {
  hoveredImage: string;
  url?: string;
}

const QRExample = ({ url, hoveredImage }: QRPROPS) => {
  console.log(hoveredImage, 'hoveredImage', url);
  let newUrl = `${window.location.origin}/AR/test?Image_id=${hoveredImage}`;
  console.log(newUrl, 'newUrl');
  return (
    <div className="flex justify-center items-center py-5 h-full w-full">
      <QRCode value={newUrl} style={{ width: '220px', height: '220px' }} />
    </div>
  );
};

export default QRExample;
