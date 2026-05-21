import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

const LOGO = "https://studentcouncildfcamclp.wordpress.com/wp-content/uploads/2021/08/cropped-sc_logo-e1629982984381.png";

export default function Login() {
  const [role, setRole]       = useState("student");
  const [email, setEmail]     = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setError("Invalid credentials. Please try again. (Demo mode — no backend connected yet.)");
    }, 1200);
  };

  return (
    <div className="login-page">
      <div className="login-bg" />
      <div className="login-card animate-fade-in-up">
        {/* Header */}
        <div className="login-header">
          <img src={LOGO} alt="DFCAMCLP" className="login-logo" onError={e => { e.target.style.display='none'; }} />
          <h1>DFCAMCLP Portal</h1>
          <p>Sign in to access your account</p>
        </div>

        {/* Role tabs */}
        <div className="role-tabs">
          {["student", "faculty", "admin"].map(r => (
            <button
              key={r}
              className={`role-tab ${role === r ? "active" : ""}`}
              onClick={() => { setRole(r); setError(""); }}
            >
              {r === "student" ? "🎓 Student" : r === "faculty" ? "👨‍🏫 Faculty" : "🛡️ Admin"}
            </button>
          ))}
        </div>

        {/* Form */}
        <form className="login-form" onSubmit={handleSubmit}>
          {error && <div className="alert alert-danger">{error}</div>}

          <div className="form-group">
            <label className="form-label">
              {role === "student" ? "Student ID / Email" : role === "faculty" ? "Faculty ID / Email" : "Admin Email"}
            </label>
            <input
              type="text"
              className="form-control"
              placeholder={role === "student" ? "e.g. 2025-00001 or email@dfcamclp.edu.ph" : "email@dfcamclp.edu.ph"}
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <label className="form-label">Password</label>
              <a href="#" style={{fontSize:"0.8rem",color:"var(--primary)"}}>Forgot password?</a>
            </div>
            <div className="password-wrap">
              <input
                type={showPass ? "text" : "password"}
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <button type="button" className="password-toggle" onClick={() => setShowPass(v => !v)}>
                {showPass ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-primary login-btn" disabled={loading}>
            {loading ? <span className="spinner" /> : null}
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>

        {/* Footer */}
        <div className="login-footer">
          <p>Are you a new student? <Link to="/enrollment">Apply for enrollment →</Link></p>
          <div className="login-dpa">
            🔒 Protected by R.A. 10173 Data Privacy Act of 2012
          </div>
        </div>
      </div>
    </div>
  );
}
