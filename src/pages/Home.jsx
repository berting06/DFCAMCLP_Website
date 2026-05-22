import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

// Real DFCAMCLP-related images
const HERO_SLIDES = [
  {
    url: "https://media.assettype.com/tribune%2F2024-06%2F8e95de55-139c-4e20-867b-abf8306c1075%2F449038089_876813631152274_3150620265504907949_n.jpg?w=1200&ar=40%3A21&auto=format%2Ccompress&mode=crop&enlarge=true",
    caption: "New DFCAMCLP Building — Inaugurated 2024",
  },
  {
    url: "https://scontent.fmnl17-5.fna.fbcdn.net/v/t39.30808-6/557598887_1200729195433718_2611004149300411613_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeF8PE460q1YBER6BwD9IS51U59PTHrBIdxTn09MesEh3FJ4l1pQeXvFYyz-fraH-cXFsvi58iSakfYsrTV8mEuL&_nc_ohc=PWzcKa0rJ7oQ7kNvwFi_lLx&_nc_oc=AdoXjoI9JiDCpau0eK3RsJ_h1upOyEKW3b0d_eKjxUrS_Eh_8OnGyVqnWhWFSy6-Mg4&_nc_zt=23&_nc_ht=scontent.fmnl17-5.fna&_nc_gid=BkZJhAyCB860AqS-YT5Q8Q&_nc_ss=7b2a8&oh=00_Af7HiqsMTZ38h8gWdBpRIh2fFzbsu624EwYs4ATQN3H8eQ&oe=6A15F32F",
    caption: "DFCAMCLP Students",
  },
  {
    url: "https://studentcouncildfcamclp.wordpress.com/wp-content/uploads/2021/08/232100591_358971129068351_4516869228152581473_n.png",
    caption: "Student Council — DFCAMCLP",
  },
];

const stats = [
  { value: "1998",  label: "Year Established"  },
  { value: "100%",  label: "Free Education"    },
  { value: "500+",  label: "Scholars per Year" },
  { value: "LGU",   label: "Managed"           },
];

const features = [
  {
    icon: "📋",
    title: "Online Enrollment",
    desc: "Apply and enroll from the comfort of your home. Track your application status in real-time.",
    link: "/enrollment",
    cta: "Start Enrollment",
  },
  {
    icon: "🗓️",
    title: "Class Schedules",
    desc: "View up-to-date class schedules by program, year level, and semester.",
    link: "/schedules",
    cta: "View Schedules",
  },
  {
    icon: "📚",
    title: "Learning Portal",
    desc: "Access course materials, submit requirements, and communicate with your instructors.",
    link: "/lms",
    cta: "Go to Portal",
  },
  {
    icon: "🔒",
    title: "Secure & DPA-Compliant",
    desc: "All personal data is handled in full compliance with the Data Privacy Act of 2012.",
    link: "#",
    cta: "Learn More",
  },
];

const programs = [
  { code: "BSBA", name: "Business Administration", dept: "Business"   },
  { code: "BSA",  name: "Accountancy",             dept: "Business"   },
  { code: "BSIS", name: "Information Systems",     dept: "Technology" },
  { code: "BSIT", name: "Information Technology",  dept: "Technology" },
  { code: "BSHM", name: "Hospitality Management",  dept: "Tourism"    },
];

const announcements = [
  {
    date: "May 2025",
    tag: "Enrollment",
    title: "Enrollment for S.Y. 2025–2026 Now Open",
    desc: "New and continuing students may now submit their enrollment applications online. Slots are limited.",
  },
  {
    date: "April 2025",
    tag: "Academic",
    title: "Final Examinations Schedule Released",
    desc: "Check the Schedules page for your final exam timetable. Please bring your school ID.",
  },
  {
    date: "March 2025",
    tag: "Scholarship",
    title: "500 Scholarship Slots Available for BSIS",
    desc: "The city government is opening 500 new scholarship slots for the Bachelor of Science in Information Systems.",
  },
];

export default function Home() {
  const [slide, setSlide] = useState(0);

  // Auto-advance every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setSlide(s => (s + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="home">
      {/* HERO */}
      <section className="hero">
        {HERO_SLIDES.map((s, i) => (
          <div
            key={i}
            className={`hero-bg ${i === slide ? "active" : ""}`}
            style={{ backgroundImage: `url(${s.url})` }}
          />
        ))}
        <div className="hero-overlay" />

        <div className="container hero-content animate-fade-in-up">
          <span className="badge badge-accent hero-badge">Las Piñas City Government</span>
          <h1>
            Free. Quality.<br />
            <span className="hero-accent">Education for All.</span>
          </h1>
          <p>
            Dr. Filemon C. Aguilar Memorial College of Las Piñas — empowering
            Las Piñeros with accessible, world-class higher education since 1998.
          </p>
          <div className="hero-cta">
            <Link to="/enrollment" className="btn btn-accent">Apply for Enrollment</Link>
            <Link to="/schedules" className="btn btn-outline-white">View Schedules</Link>
          </div>
        </div>

        {/* Slide dots */}
        <div className="hero-dots">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              className={`hero-dot ${i === slide ? "active" : ""}`}
              onClick={() => setSlide(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Caption */}
        <div className="hero-caption">{HERO_SLIDES[slide].caption}</div>
      </section>

      {/* STATS */}
      <section className="stats-bar">
        <div className="container stats-grid">
          {stats.map(s => (
            <div key={s.label} className="stat-item">
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="section features-section">
        <div className="container">
          <div className="section-header">
            <p className="badge badge-primary" style={{marginBottom: 8}}>Student Services</p>
            <h2 className="section-title">Everything You Need,<br />In One Place</h2>
            <div className="divider-accent" />
            <p className="section-subtitle">
              Manage your academic journey — from enrollment to graduation — through our integrated digital platform.
            </p>
          </div>
          <div className="features-grid">
            {features.map(f => (
              <div key={f.title} className="card feature-card">
                <div className="feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
                <Link to={f.link} className="feature-link">
                  {f.cta} <span>→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section className="section programs-section">
        <div className="container programs-inner">
          <div className="programs-text">
            <p className="badge badge-accent" style={{marginBottom: 8}}>Academic Programs</p>
            <h2 className="section-title">Programs Offered</h2>
            <div className="divider-accent" />
            <p className="section-subtitle">
              CHED-authorized degree programs delivered free of charge to all qualified residents of Las Piñas City.
            </p>
            <Link to="/enrollment" className="btn btn-primary" style={{marginTop: 28}}>
              Apply Now
            </Link>
          </div>
          <div className="programs-list">
            {programs.map(p => (
              <div key={p.code} className="program-item">
                <div className="program-code">{p.code}</div>
                <div>
                  <div className="program-name">{p.name}</div>
                  <div className="program-dept">{p.dept}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ANNOUNCEMENTS */}
      <section className="section announcements-section">
        <div className="container">
          <div className="section-header">
            <p className="badge badge-primary" style={{marginBottom: 8}}>Latest Updates</p>
            <h2 className="section-title">Announcements</h2>
            <div className="divider-accent" />
          </div>
          <div className="announcements-grid">
            {announcements.map(a => (
              <div key={a.title} className="card announcement-card">
                <div className="announcement-meta">
                  <span className="badge badge-accent">{a.tag}</span>
                  <span className="announcement-date">{a.date}</span>
                </div>
                <h3>{a.title}</h3>
                <p>{a.desc}</p>
                <a href="#" className="feature-link">Read more <span>→</span></a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="cta-banner">
        <div className="container cta-banner-inner">
          <div>
            <h2>Ready to Begin Your Journey?</h2>
            <p>Enrollment for S.Y. 2025–2026 is now open. Apply today — it's 100% free.</p>
          </div>
          <Link to="/enrollment" className="btn btn-accent" style={{flexShrink:0}}>
            Start Your Application
          </Link>
        </div>
      </section>
    </div>
  );
}