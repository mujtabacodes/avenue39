import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import { generateSlug } from '@/config';

interface QRPROPS{
  hoveredImage:string,
  url:string
}

const QRExample = ({url,hoveredImage}:QRPROPS) => {
    console.log(hoveredImage, "hoveredImage")
let newUrl = `${window.location.origin}/AR/${generateSlug(url)}?Image_id=${generateSlug(hoveredImage)}`
console.log(newUrl, "newUrl")
  return (

    <div className='flex justify-center items-center py-5 h-full w-full'>
      <QRCode value={newUrl} style={{width:'220px', height: "220px"}} />
  
    </div>
  );
};

export default QRExample;
