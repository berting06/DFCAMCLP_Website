import React, { useState } from "react";
import "./Schedules.css";

const scheduleData = [
  { code:"IT101",  subject:"Introduction to Computing",       units:3, day:"MWF",    time:"7:30–8:30 AM",   room:"IT-101", instructor:"Prof. Santos",    program:"BSIT",  year:"1st", sem:"1st" },
  { code:"IT102",  subject:"Computer Programming 1",          units:3, day:"TTH",    time:"9:00–10:30 AM",  room:"Lab-1",  instructor:"Prof. Reyes",     program:"BSIT",  year:"1st", sem:"1st" },
  { code:"IT103",  subject:"Mathematics in the Modern World", units:3, day:"MWF",    time:"10:30–11:30 AM", room:"GS-202", instructor:"Prof. Cruz",      program:"BSIT",  year:"1st", sem:"1st" },
  { code:"BA101",  subject:"Principles of Management",        units:3, day:"MWF",    time:"8:00–9:00 AM",   room:"BA-101", instructor:"Prof. Lim",       program:"BSBA",  year:"1st", sem:"1st" },
  { code:"BA102",  subject:"Business Communication",          units:3, day:"TTH",    time:"1:00–2:30 PM",   room:"BA-102", instructor:"Prof. Garcia",    program:"BSBA",  year:"1st", sem:"1st" },
  { code:"ACC101", subject:"Fundamentals of Accounting 1",    units:3, day:"MWF",    time:"7:30–8:30 AM",   room:"AC-201", instructor:"Prof. Rivera",    program:"BSA",   year:"1st", sem:"1st" },
  { code:"ACC102", subject:"Business Math",                   units:3, day:"TTH",    time:"10:30–12:00 PM", room:"AC-202", instructor:"Prof. Torres",    program:"BSA",   year:"1st", sem:"1st" },
  { code:"IS201",  subject:"Systems Analysis & Design",       units:3, day:"MWF",    time:"1:00–2:00 PM",   room:"IT-201", instructor:"Prof. Mendoza",   program:"BSIS",  year:"2nd", sem:"1st" },
  { code:"IS202",  subject:"Database Management",             units:3, day:"TTH",    time:"7:30–9:00 AM",   room:"Lab-2",  instructor:"Prof. Bautista",  program:"BSIS",  year:"2nd", sem:"1st" },
  { code:"HM101",  subject:"Food & Beverage Management",      units:3, day:"MWF",    time:"3:00–4:00 PM",   room:"HM-101", instructor:"Prof. Villanueva",program:"BSHM",  year:"1st", sem:"1st" },
];

const PROGRAMS = ["All Programs", "BSIT", "BSBA", "BSA", "BSIS", "BSHM"];
const YEARS    = ["All Years", "1st", "2nd", "3rd", "4th"];
const SEMS     = ["All Semesters", "1st", "2nd", "Summer"];
const DAYS     = ["All Days", "MWF", "TTH", "Sat", "Sun"];

export default function Schedules() {
  const [filters, setFilters] = useState({ program:"All Programs", year:"All Years", sem:"All Semesters", day:"All Days", search:"" });

  const set = (k, v) => setFilters(f => ({...f, [k]: v}));

  const filtered = scheduleData.filter(s => {
    if (filters.program !== "All Programs" && s.program !== filters.program) return false;
    if (filters.year    !== "All Years"     && s.year    !== filters.year)    return false;
    if (filters.sem     !== "All Semesters" && s.sem     !== filters.sem)     return false;
    if (filters.day     !== "All Days"      && s.day     !== filters.day)     return false;
    if (filters.search) {
      const q = filters.search.toLowerCase();
      return s.subject.toLowerCase().includes(q) || s.code.toLowerCase().includes(q) || s.instructor.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div>
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumb"><a href="/">Home</a><span>›</span>Schedules</div>
          <h1>Class Schedules</h1>
          <p>View class schedules by program, year level, and semester for S.Y. 2025–2026.</p>
        </div>
      </div>

      <section className="section schedules-section">
        <div className="container">
          {/* Filters */}
          <div className="card schedules-filters">
            <div className="filter-row">
              <div className="form-group" style={{flex:2, marginBottom:0}}>
                <label className="form-label">Search</label>
                <input className="form-control" placeholder="Subject, code, or instructor…" value={filters.search} onChange={e => set("search", e.target.value)} />
              </div>
              {[
                { key:"program", options:PROGRAMS, label:"Program" },
                { key:"year",    options:YEARS,    label:"Year Level" },
                { key:"sem",     options:SEMS,     label:"Semester" },
                { key:"day",     options:DAYS,     label:"Day" },
              ].map(f => (
                <div key={f.key} className="form-group" style={{flex:1, marginBottom:0}}>
                  <label className="form-label">{f.label}</label>
                  <select className="form-control" value={filters[f.key]} onChange={e => set(f.key, e.target.value)}>
                    {f.options.map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
              ))}
              <div style={{display:"flex", alignItems:"flex-end", marginBottom:0}}>
                <button className="btn btn-outline" onClick={() => setFilters({ program:"All Programs", year:"All Years", sem:"All Semesters", day:"All Days", search:"" })}>
                  Clear
                </button>
              </div>
            </div>
          </div>

          {/* Results info */}
          <div className="schedules-meta">
            <span>Showing <strong>{filtered.length}</strong> of {scheduleData.length} classes</span>
            <span className="badge badge-primary">S.Y. 2025–2026 | 1st Semester</span>
          </div>

          {/* Table */}
          <div className="table-wrapper">
            {filtered.length === 0 ? (
              <div className="no-results">No classes match your filters. Try adjusting your search.</div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Subject</th>
                    <th>Units</th>
                    <th>Day</th>
                    <th>Time</th>
                    <th>Room</th>
                    <th>Instructor</th>
                    <th>Program</th>
                    <th>Year</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(s => (
                    <tr key={s.code + s.day}>
                      <td><span className="badge badge-primary">{s.code}</span></td>
                      <td style={{fontWeight:600, color:"var(--gray-800)"}}>{s.subject}</td>
                      <td style={{textAlign:"center"}}>{s.units}</td>
                      <td><span className={`badge ${s.day === "MWF" ? "badge-accent" : "badge-success"}`}>{s.day}</span></td>
                      <td style={{whiteSpace:"nowrap"}}>{s.time}</td>
                      <td>{s.room}</td>
                      <td>{s.instructor}</td>
                      <td><span className="badge badge-primary">{s.program}</span></td>
                      <td>{s.year}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="alert alert-info" style={{marginTop:24}}>
            📌 Schedules are subject to change. Always confirm with your department chair. Last updated: May 2025.
          </div>
        </div>
      </section>
    </div>
  );
}
