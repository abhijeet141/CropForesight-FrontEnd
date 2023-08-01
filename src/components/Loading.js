import React from 'react';
import logo from '../assets/logo.png';

const Loading = () => {
  return (
    <div id="spinner" className="center-loader">
      <img src={logo} alt="preloading screen" />
      <div className="pre-text">
        <p>Welcome to <br /><span>Crop Foresight</span></p>
      </div>
    </div>
  );
};

export default Loading;
