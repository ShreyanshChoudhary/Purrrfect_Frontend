import React from "react";
import "./Footer.css"; // Custom CSS for the footer
import fb from "../assets/fbimage.png";
import insta from "../assets/instaimage.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="sb_footer section__padding">
        <div className="sb__footer-links">
          
          {/* Pet Services Section */}
          <div className="sb__footer-links-div">
            <h4>Our Services</h4>
            <a href="/pet-food">
              <p>Premium Pet Food</p>
            </a>
            <a href="/healthplan">
              <p>Health Plans</p>
            </a>
            <a href="/treats">
              <p>Pet Treats</p>
            </a>
          </div>

          {/* Pet Care Resources Section */}
          <div className="sb__footer-links-div">
            <h4>Pet Care Resources</h4>
            <a href="/resource">
              <p>Resource Center</p>
            </a>
            <a href="/testimonials">
              <p>Customer Testimonials</p>
            </a>
            <a href="/stv">
              <p>Training Videos</p>
            </a>
          </div>

          {/* Partnered Vets Section */}
          <div className="sb__footer-links-div">
            <h4>Our Partners</h4>
            <a href="/partners">
              <p>Veterinarian Clinics</p>
            </a>
          </div>

          {/* About Us Section */}
          <div className="sb__footer-links-div">
            <h4>About Purrrfect</h4>
            <a href="/about">
              <p>Our Story</p>
            </a>
            <a href="/press">
              <p>Press Releases</p>
            </a>
            <a href="/career">
              <p>Join Our Team</p>
            </a>
            <a href="/contact">
              <p>Contact Us</p>
            </a>
          </div>

          {/* Social Media Section */}
          <div className="sb__footer-links-div">
            <h4>Follow Us</h4>
            <div className="socialmedia">
              <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
                <img src={fb} alt="Facebook" className="social-icon" />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
                <img src={insta} alt="Instagram" className="social-icon" />
              </a>
            </div>
          </div>

          {/* Footer Below Section */}
          <div className="sb__footer-below">
            <div className="sb__footer-copyright">
              <p>
                &copy; {new Date().getFullYear()} Purrrfect. All Rights Reserved.
              </p>
            </div>
            <div className="sb__footer-below-links">
              <a href="/terms">
                <p>Terms & Conditions</p>
              </a>
              <a href="/privacy">
                <p>Privacy</p>
              </a>
              <a href="/security">
                <p>Security</p>
              </a>
              <a href="/cookie">
                <p>Cookie declaration</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
