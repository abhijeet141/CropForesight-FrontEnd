// write code to create Footer component

import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
    return (
        <footer>
        <div className="footer-container">
            <div className="footer-links">
            <div className="footer-link-wrapper">
                <div className="footer-link-items">
                <h2 className='footer-heading'>About Us</h2>
                <Link to='/'>How it works</Link>
                <Link to='/'>Testimonials</Link>
                <Link to='/'>Careers</Link>
                <Link to='/'>Terms of Service</Link>
                </div>
                <div className="footer-link-items">
                <h2 className='footer-heading'>Contact Us</h2>
                <Link to='/'>Contact</Link>
                <Link to='/'>Support</Link>
                <Link to='/'>Destinations</Link>
                <Link to='/'>Sponsorships</Link>
                </div>
            </div>
            <div className="footer-link-wrapper">
                <div className="footer-link-items">
                <h2 className='footer-heading'>Social Media</h2>
                <Link to='/'>Instagram</Link>
                <Link to='/'>Facebook</Link>
                <Link to='/'>Youtube</Link>
                <Link to='/'>Twitter</Link>
                </div>
            </div>
            </div>
            <div className='footer-heading'>
            <p>&copy; {new Date().getFullYear()} My Website. All rights reserved.</p>
            </div>
        </div>
        </footer>
    );
    }

export default Footer;
