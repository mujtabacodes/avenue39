import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import Draggable from 'react-draggable';

interface QRPROPS {
  hoveredImage: string;
  url: string;
}

const QRExample = ({ url, hoveredImage }: QRPROPS) => {
  const [showDraggableImage, setShowDraggableImage] = useState(false);

  const newUrl = `${window.location.origin}/AR/${url}?Image_id=${hoveredImage}`;
  console.log(hoveredImage, "hoveredImage");
  console.log(newUrl, "newUrl");

  const handleImageClick = () => {
    setShowDraggableImage(true);
  };

  return (
    <div className="flex flex-col justify-center items-center py-5 h-full w-full">
      <QRCode value={newUrl} style={{ width: '220px', height: '220px' }} />

      <button onClick={handleImageClick} className="mt-4 p-2 bg-blue-500 text-white rounded">
        Show Draggable Image
      </button>
      {showDraggableImage && (
        <Draggable defaultPosition={{ x: 0, y: 0 }}>
          <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
            <img
              src={hoveredImage}
              alt="Scanned"
              style={{
                width: '200px',
                height: '200px',
                cursor: 'move',
                pointerEvents: 'auto', 
              }}
            />
          </div>
        </Draggable>
      )}
    </div>
  );
};

export default QRExample;
