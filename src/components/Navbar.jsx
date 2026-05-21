import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const LOGO = "https://studentcouncildfcamclp.wordpress.com/wp-content/uploads/2021/08/cropped-sc_logo-e1629982984381.png";

const navLinks = [
  { path: "/",           label: "Home"       },
  { path: "/enrollment", label: "Enrollment" },
  { path: "/schedules",  label: "Schedules"  },
  { path: "/lms",        label: "LMS"        },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      {/* Top bar */}
      <div className="navbar-topbar">
        <div className="container navbar-topbar-inner">
          <span>🏛️ City Government of Las Piñas — Free Quality Education</span>
          <span>📞 (02) 805-84-25</span>
        </div>
      </div>

      {/* Main nav */}
      <div className="navbar-main">
        <div className="container navbar-main-inner">
          {/* Logo */}
          <Link to="/" className="navbar-brand">
            <img src={LOGO} alt="DFCAMCLP Logo" className="navbar-logo" onError={e => { e.target.style.display='none'; }} />
            <div className="navbar-brand-text">
              <span className="navbar-brand-short">DFCAMCLP</span>
              <span className="navbar-brand-full">Dr. Filemon C. Aguilar Memorial College</span>
            </div>
          </Link>

          {/* Desktop links */}
          <nav className="navbar-links">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`navbar-link ${location.pathname === link.path ? "active" : ""}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="navbar-cta">
            <Link to="/login" className="btn btn-outline navbar-btn-login">Log In</Link>
            <Link to="/enrollment" className="btn btn-accent navbar-btn-apply">Apply Now</Link>
          </div>

          {/* Hamburger */}
          <button
            className={`navbar-hamburger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`navbar-mobile ${menuOpen ? "open" : ""}`}>
        {navLinks.map(link => (
          <Link
            key={link.path}
            to={link.path}
            className={`navbar-mobile-link ${location.pathname === link.path ? "active" : ""}`}
          >
            {link.label}
          </Link>
        ))}
        <div className="navbar-mobile-cta">
          <Link to="/login" className="btn btn-outline" style={{width:"100%",justifyContent:"center"}}>Log In</Link>
          <Link to="/enrollment" className="btn btn-accent" style={{width:"100%",justifyContent:"center"}}>Apply Now</Link>
        </div>
      </div>
    </header>
  );
}
