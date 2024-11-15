import React from 'react';
import { BsWhatsapp } from 'react-icons/bs';

const WhatsIcon = () => {
  const whatsappNumber = '+971505974495';

  return (
    <a
      href={`https://wa.me/${whatsappNumber}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-16 md:bottom-4 right-4 z-50 flex items-center justify-center w-12 h-12 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-colors"
    >
      <BsWhatsapp size={24} />
    </a>
  );
};

export default WhatsIcon;
