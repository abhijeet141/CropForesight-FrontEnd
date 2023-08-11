import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faYoutube, faTwitter } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';


const Footer = ({ mode, setmode }) => {
  return (
    <footer>
      <div style={{
        backgroundColor: mode === "light" ? '#b0b0ac' : '#1c1c1b',
      }} className="footer">
        <div className="row">
          <a style={{ color: mode === "light" ? '#1c1c1b' : '#e8e8e6' }} className='logo' href="#"><FontAwesomeIcon icon={faFacebook} size='3x' /></a>
          <a style={{ color: mode === "light" ? '#1c1c1b' : '#e8e8e6' }} className='logo' href="#"><FontAwesomeIcon icon={faInstagram} size='3x' /></a>
          <a style={{ color: mode === "light" ? '#1c1c1b' : '#e8e8e6' }} className='logo' href="#"><FontAwesomeIcon icon={faYoutube} size='3x' /></a>
          <a style={{ color: mode === "light" ? '#1c1c1b' : '#e8e8e6' }} className='logo' href="#"><FontAwesomeIcon icon={faTwitter} size='3x' /></a>
        </div>

        <div className="row">
          <ul>
            <li><a style={{ color: mode === "light" ? '#1c1c1b' : '#e8e8e6' }} href="/">Home</a></li>
            <li><a style={{ color: mode === "light" ? '#1c1c1b' : '#e8e8e6' }} href="/about">About</a></li>
            <li><a style={{ color: mode === "light" ? '#1c1c1b' : '#e8e8e6' }} href="/contact">Contact us</a></li>
            <li><a style={{ color: mode === "light" ? '#1c1c1b' : '#e8e8e6' }} href="/faq">FYQs</a></li>
            <li><a style={{ color: mode === "light" ? '#1c1c1b' : '#e8e8e6' }} href="/ExampleCrop">Example</a></li>
          </ul>
        </div>

        <div style={{ color: mode === "light" ? '#1c1c1b' : '#e8e8e6' }} className="row">
          Copyright © 2023 - Made with Love by team CropForesight
        </div>
      </div>
    </footer>
  );
};

export default Footer;

