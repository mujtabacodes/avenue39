import React, { useState } from 'react';
import QRCode from 'qrcode.react';


const QRExample = ({url}:{url:string}) => {
  const [scanResult, setScanResult] = useState('');


  return (
    <div className='flex justify-center items-center py-5 h-full w-full'>
      <QRCode value={url} style={{width:'220px', height: "220px"}} />
  
    </div>
  );
};

export default QRExample;
