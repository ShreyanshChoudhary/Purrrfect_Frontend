import React, { useState } from 'react';
import './Header';
import './Darklight.css';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Function to toggle between light and dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`App ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="container">
        <h1>{darkMode ? 'Dark Mode' : 'Light Mode'}</h1>
      </div>
    </div>
  );
};

export default Darklight;
