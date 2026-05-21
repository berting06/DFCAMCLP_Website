import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-wave">
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="var(--primary-dark)" />
        </svg>
      </div>

      <div className="footer-body">
        <div className="container footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <img
              src="https://studentcouncildfcamclp.wordpress.com/wp-content/uploads/2021/08/cropped-sc_logo-e1629982984381.png"
              alt="DFCAMCLP"
              className="footer-logo"
              onError={e => { e.target.style.display='none'; }}
            />
            <h3>DFCAMCLP</h3>
            <p>Dr. Filemon C. Aguilar Memorial College of Las Piñas</p>
            <p className="footer-tagline">Free & Quality Education for Las Piñeros</p>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/enrollment">Enrollment</Link></li>
              <li><Link to="/schedules">Class Schedules</Link></li>
              <li><Link to="/lms">Learning Portal</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="footer-col">
            <h4>Student Services</h4>
            <ul>
              <li><a href="#admissions">Admissions</a></li>
              <li><a href="#records">Records Office</a></li>
              <li><a href="#guidance">Guidance Center</a></li>
              <li><a href="#library">Library</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4>Contact Us</h4>
            <ul className="footer-contact">
              <li>📍 Golden Gate Subd., Talon III, Las Piñas City</li>
              <li>📞 (02) 805-84-25 / 805-8502</li>
              <li>📠 (02) 805-85-22</li>
              <li>🏛️ Under Las Piñas City Government</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="container footer-bottom-inner">
            <p>© {year} Dr. Filemon C. Aguilar Memorial College of Las Piñas. All rights reserved.</p>
            <p>
              <a href="#privacy">Privacy Policy</a>
              <span> · </span>
              <a href="#dpa">Data Privacy Act Compliance</a>
              <span> · </span>
              <a href="#terms">Terms of Use</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
