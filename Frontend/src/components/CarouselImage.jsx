import React from 'react';
import RioImage from '../assets/Persian1.jpg';
import ResizedImage from '../assets/ImageResized1.png'
  
const CarouselImage = ({ text }) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <img
        src={RioImage }
        alt={text}
        className="w-full h-[80%] object-contain"
      />
    </div>
  );
};
export default CarouselImage;
