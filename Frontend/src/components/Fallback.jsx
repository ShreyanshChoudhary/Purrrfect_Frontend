import React from 'react';
import { FaDog, FaCat } from 'react-icons/fa'; // Importing dog and cat icons
import './Fallback.css'; // Ensure this CSS file is linked correctly

const Fallback = () => {
  return (
    <div className="fallback-container">
    <div className="animation-container">
        <FaDog size={50} className="dog" />  {/* Cat icon */}
      </div>
      <div className="animation-container">
        <FaCat size={50} className="cat" />  {/* Cat icon */}
      </div>
     
    </div>
  );
};

export default Fallback;
