import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

// Real DFCAMCLP-related images
const HERO_SLIDES = [
  {
    url: "https://scontent.fmnl17-8.fna.fbcdn.net/v/t39.30808-6/541435400_1378949077571420_8534883278537769718_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=f727a1&_nc_eui2=AeFH9vSmRsglBghjwa5SHdHI8GhgxBQwTIHwaGDEFDBMgS8Oo5NmPfjm4xI0-tRKNRQIe0Z3di1yjukhbhOxRbdO&_nc_ohc=ce-ZqYfNlagQ7kNvwGEJR1A&_nc_oc=AdoCGpsZuVgGmyRt_8xtXfFKapyBux8rVkNSwFny9pzbUxXlKB1lKg71ZWPgWQ9RqmY&_nc_zt=23&_nc_ht=scontent.fmnl17-8.fna&_nc_gid=KVHtybfVuNdPVucyJkviLw&_nc_ss=7b2a8&oh=00_Af4OkqocLjsphXmYirvy2YbDLurDkSdQTocaKDzre6vPLA&oe=6A1793BB",
    caption: "New DFCAMCLP Building — Inaugurated 2024",
  },
  {
    url: "https://scontent.fmnl17-5.fna.fbcdn.net/v/t39.30808-6/541428768_1378950234237971_1021762653052368538_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=f727a1&_nc_eui2=AeGH32sHbo5wnP-AurL60jNGQH8WfiWqAjVAfxZ-JaoCNcc-v74fdiHhHAuZ7b9SluzsrHO-T1xQlBvh1GgHD8ff&_nc_ohc=ntQfhFJ6M6EQ7kNvwFB31Cx&_nc_oc=AdqCKwyqqev0WTiCBC7LsAl5Uiot-QjWklBbfxyb3rJyPyrZ6fvSGd95Lb5C1RlXk7A&_nc_zt=23&_nc_ht=scontent.fmnl17-5.fna&_nc_gid=5Pht2f0c7snHrCL3kqI7Vw&_nc_ss=7b2a8&oh=00_Af4YQBDyIHU0PoGAxhmlbkCS7Av1Em7TAyqnA2SwrB0E4w&oe=6A179739",
    caption: "DFCAMCLP Students",
  },
  {
    url: "https://scontent.fmnl17-5.fna.fbcdn.net/v/t39.30808-6/542227100_1378951367571191_3093714474353907952_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=f727a1&_nc_eui2=AeEkTVXCifUUKi9_V2OC9vNInty85NbbPoKe3Lzk1ts-gvNjGDpYC_vg6vnu4OOCHgxz87nC9IpvPBfgPqUhk2Ci&_nc_ohc=ATsaUktin0AQ7kNvwGpY8-N&_nc_oc=AdroephYapk1LJ2A3urlq84LREbD014tyTVQV0VTE2h1C7esCQi6y_vcIFwmFecNHNs&_nc_zt=23&_nc_ht=scontent.fmnl17-5.fna&_nc_gid=hxskoKQ07QkSCa4dT2GN7A&_nc_ss=7b2a8&oh=00_Af55kQZMfg5opf--0AKy91FmypBqy7sP9iuNngmzHuO9jg&oe=6A17CBF9",
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
            Free. <i>Quality?</i>.<br />
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