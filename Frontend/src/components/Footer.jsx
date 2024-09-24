import React from "react";
import "./Footer.css"; // Custom CSS for the footer
import fb from "../assets/fbimage.png";
import insta from "../assets/instaimage.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="sb_footer section__padding">
        <div className="sb__footer-links">
          
          {/* For Business Section */}
          <div className="sb__footer-links-div">
            <h4>For Business</h4>
            <a href="/employer">
              <p>Employer</p>
            </a>
            <a href="/healthplan">
              <p>Health Plan</p>
            </a>
            <a href="/individual">
              <p>Individual</p>
            </a>
          </div>

          {/* Resources Section */}
          <div className="sb__footer-links-div">
            <h4>Resources</h4>
            <a href="/resource">
              <p>Resource Center</p>
            </a>
            <a href="/testimonials">
              <p>Testimonials</p>
            </a>
            <a href="/stv">
              <p>STV</p>
            </a>
          </div>

          {/* Partners Section */}
          <div className="sb__footer-links-div">
            <h4>Partners</h4>
            <a href="/partners">
              <p>Purrrfect</p>
            </a>
          </div>

          {/* Company Section */}
          <div className="sb__footer-links-div">
            <h4>Company</h4>
            <a href="/about">
              <p>About</p>
            </a>
            <a href="/press">
              <p>Press</p>
            </a>
            <a href="/career">
              <p>Career</p>
            </a>
            <a href="/contact">
              <p>Contact</p>
            </a>
          </div>

          {/* Social Media Section */}
          <div className="sb__footer-links-div">
            <h4>Coming soon on</h4>
            <div className="socialmedia">
              <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
                <img src={fb} alt="Facebook" className="social-icon" />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
                <img src={insta} alt="Instagram" className="social-icon" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Below Section */}
        <div className="sb__footer-below">
          <div className="sb__footer-copyright">
            <p>
              © {new Date().getFullYear()} Purrrfect. All Rights Reserved.
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
    </footer>
  );
};

export default Footer;
