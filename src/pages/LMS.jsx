import React, { useState } from "react";
import "./LMS.css";

const courses = [
  { code:"IT101", title:"Introduction to Computing",      instructor:"Prof. Santos",   progress:72, modules:8,  completed:6, announcements:2, color:"#003087" },
  { code:"IT102", title:"Computer Programming 1",         instructor:"Prof. Reyes",    progress:45, modules:10, completed:4, announcements:1, color:"#1a4db3" },
  { code:"IT103", title:"Mathematics in the Modern World",instructor:"Prof. Cruz",     progress:88, modules:6,  completed:5, announcements:0, color:"#c8a84b" },
];

const activities = [
  { type:"assignment", course:"IT101", title:"Lab Exercise 3: HTML Forms",      due:"May 28, 2025", status:"pending" },
  { type:"quiz",       course:"IT102", title:"Quiz 4: Loops & Arrays",           due:"May 26, 2025", status:"pending" },
  { type:"assignment", course:"IT103", title:"Problem Set 5: Statistics",        due:"May 30, 2025", status:"submitted" },
  { type:"exam",       course:"IT101", title:"Midterm Examination",              due:"June 5, 2025",  status:"pending" },
];

const activityIcons = { assignment:"📝", quiz:"❓", exam:"📋" };
const statusColors  = { pending:"badge-danger", submitted:"badge-success", graded:"badge-primary" };

export default function LMS() {
  const [view, setView] = useState("dashboard");
  const [activeCourse, setActiveCourse] = useState(null);

  if (view === "course" && activeCourse) {
    const c = activeCourse;
    return (
      <div>
        <div className="page-hero">
          <div className="container">
            <div className="breadcrumb">
              <a href="/">Home</a><span>›</span>
              <button style={{background:"none",border:"none",color:"rgba(255,255,255,.75)",cursor:"pointer",fontSize:"inherit",padding:0}} onClick={() => setView("dashboard")}>Learning Portal</button>
              <span>›</span>{c.code}
            </div>
            <h1>{c.title}</h1>
            <p>Instructor: {c.instructor}</p>
          </div>
        </div>
        <section className="section">
          <div className="container">
            <div className="course-detail-grid">
              {/* Modules */}
              <div>
                <h3 className="lms-section-title">Course Modules</h3>
                {Array.from({length: c.modules}, (_, i) => (
                  <div key={i} className={`module-item ${i < c.completed ? "done" : ""}`}>
                    <div className="module-check">{i < c.completed ? "✓" : i + 1}</div>
                    <div className="module-info">
                      <div className="module-title">Module {i + 1}: {["Introduction", "Basic Concepts", "Hands-on Practice", "Advanced Topics", "Case Studies", "Review", "Assessment Prep", "Final Project", "Supplementary", "Wrap-up"][i] || `Topic ${i+1}`}</div>
                      <div className="module-status">{i < c.completed ? "Completed" : i === c.completed ? "In Progress" : "Locked"}</div>
                    </div>
                    {i <= c.completed && <button className="btn btn-outline" style={{fontSize:"0.8rem",padding:"6px 14px"}}>Open</button>}
                  </div>
                ))}
              </div>
              {/* Sidebar */}
              <div>
                <div className="card" style={{padding:24, marginBottom:20}}>
                  <h4 style={{marginBottom:16,color:"var(--primary-dark)",fontFamily:"var(--font-display)"}}>Progress</h4>
                  <div className="progress-bar-wrap">
                    <div className="progress-bar-fill" style={{width:`${c.progress}%`}} />
                  </div>
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:"0.8rem",color:"var(--gray-400)",marginTop:6}}>
                    <span>{c.completed} of {c.modules} modules</span>
                    <span><strong>{c.progress}%</strong></span>
                  </div>
                </div>
                <div className="card" style={{padding:24}}>
                  <h4 style={{marginBottom:16,color:"var(--primary-dark)",fontFamily:"var(--font-display)"}}>Resources</h4>
                  {["Syllabus.pdf", "Lecture_Week1.pptx", "Reading_Materials.zip", "Lab_Manual.pdf"].map(f => (
                    <div key={f} className="resource-item">
                      <span>📄</span>
                      <a href="#" style={{color:"var(--primary)",fontSize:"0.875rem"}}>{f}</a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumb"><a href="/">Home</a><span>›</span>Learning Portal</div>
          <h1>Learning Portal</h1>
          <p>Access your courses, submit assignments, and track your academic progress.</p>
        </div>
      </div>

      <section className="section lms-section">
        <div className="container">
          <div className="lms-grid">
            {/* Main */}
            <div>
              {/* My Courses */}
              <h3 className="lms-section-title">My Courses — 1st Semester, S.Y. 2025–2026</h3>
              <div className="courses-list">
                {courses.map(c => (
                  <div key={c.code} className="card course-card" onClick={() => { setActiveCourse(c); setView("course"); }}>
                    <div className="course-card-accent" style={{background: c.color}} />
                    <div className="course-card-body">
                      <div className="course-card-top">
                        <span className="badge badge-primary">{c.code}</span>
                        {c.announcements > 0 && <span className="badge badge-danger">{c.announcements} new</span>}
                      </div>
                      <h4>{c.title}</h4>
                      <p className="course-instructor">{c.instructor}</p>
                      <div className="progress-bar-wrap" style={{marginTop:12}}>
                        <div className="progress-bar-fill" style={{width:`${c.progress}%`}} />
                      </div>
                      <div className="course-card-footer">
                        <span>{c.completed}/{c.modules} modules</span>
                        <span><strong>{c.progress}%</strong> complete</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lms-sidebar">
              {/* Upcoming */}
              <div className="card lms-widget">
                <div className="lms-widget-header">📋 Upcoming Activities</div>
                <div className="lms-widget-body">
                  {activities.map((a, i) => (
                    <div key={i} className="activity-item">
                      <div className="activity-icon">{activityIcons[a.type]}</div>
                      <div className="activity-info">
                        <div className="activity-title">{a.title}</div>
                        <div className="activity-meta">
                          <span className="badge badge-primary" style={{fontSize:"0.68rem"}}>{a.course}</span>
                          <span style={{fontSize:"0.75rem",color:"var(--gray-400)"}}>{a.due}</span>
                        </div>
                      </div>
                      <span className={`badge ${statusColors[a.status]}`} style={{fontSize:"0.68rem",flexShrink:0}}>{a.status}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick links */}
              <div className="card lms-widget" style={{marginTop:20}}>
                <div className="lms-widget-header">⚡ Quick Access</div>
                <div className="lms-widget-body" style={{padding:"8px 0"}}>
                  {[
                    { icon:"📊", label:"My Grades" },
                    { icon:"📅", label:"Attendance" },
                    { icon:"📬", label:"Messages" },
                    { icon:"📁", label:"My Files" },
                    { icon:"🎓", label:"Transcript Request" },
                  ].map(q => (
                    <button key={q.label} className="quick-link-btn">
                      <span>{q.icon}</span> {q.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* DPA Notice */}
              <div className="alert alert-info" style={{marginTop:20}}>
                🔒 <strong>Privacy Reminder:</strong> Your academic records are protected under R.A. 10173 (Data Privacy Act). Do not share your credentials.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
