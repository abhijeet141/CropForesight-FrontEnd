import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faYoutube, faTwitter } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';


const Footer = () => {
  return (
    <footer>
      <div className="footer">
        <div className="row">
          <a className='logo' href="#"><FontAwesomeIcon icon={faFacebook} size='3x'/></a>
          <a className='logo' href="#"><FontAwesomeIcon icon={faInstagram} size='3x'/></a>
          <a className='logo' href="#"><FontAwesomeIcon icon={faYoutube} size='3x'/></a>
          <a className='logo' href="#"><FontAwesomeIcon icon={faTwitter} size='3x'/></a>
        </div>

        <div className="row">
          <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact us</a></li>
            <li><a href="/faq">FYQs</a></li>
            <li><a href="/ExampleCrop">Example</a></li>
          </ul>
        </div>

        <div className="row">
          Copyright © 2023 - Made with Love by team CropForesight
        </div>
      </div>
    </footer>
  );
};

export default Footer;

