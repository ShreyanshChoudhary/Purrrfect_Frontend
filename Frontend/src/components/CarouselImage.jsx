import React from 'react';
import RioImage from '../assets/Rio.jpg';
import ResizedImage from '../assets/ImageResized.png'
  
const CarouselImage = ({ text }) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <img
        src={ResizedImage }
        alt={text}
        className="w-full h-[80%] object-contain"
      />
    </div>
  );
};
export default CarouselImage;
