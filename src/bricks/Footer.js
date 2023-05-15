import React from 'react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import '../css/Footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="section about-us">
          <h3>About Us</h3>
          <p>Some information about your company or organization.</p>
        </div>
        <div className="section contact">
          <h3>Contact</h3>
          <p>Number: XXX XXX XXX</p>
          <p>Email: xxx2gmail.com</p>
        </div>
        <div className="section social-icons">
          <h3>Follow Us</h3>
          <div className="icon-container">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            {/* Add more social media icons here */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
