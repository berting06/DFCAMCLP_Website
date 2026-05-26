import React, { useState } from "react";
import emailjs from '@emailjs/browser';
import "./Enrollment.css";

const PROGRAMS = [
  "BS Business Administration",
  "BS Accountancy",
  "BS Information Systems",
  "BS Information Technology",
  "BS Hospitality Management",
];

const STEPS = ["Personal Info", "Academic Background", "Program & Requirements", "Review & Submit"];

const initialForm = {
  // Step 1
  lastName: "", firstName: "", middleName: "", suffix: "",
  birthDate: "", gender: "", civilStatus: "",
  address: "", barangay: "", city: "Las Piñas",
  email: "", mobile: "", emergencyContact: "", emergencyMobile: "",
  // Step 2
  lastSchool: "", schoolType: "", schoolAddress: "",
  yearGraduated: "", gpa: "", lrnNumber: "",
  // Step 3
  program: "", yearLevel: "1st Year", semester: "1st Semester",
  enrollmentType: "New Student",
  // Agreements
  agreePrivacy: false, agreeAccuracy: false,
};

export default function Enrollment() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const set = (field, value) => {
    setForm(f => ({ ...f, [field]: value }));
    setErrors(e => { const n = {...e}; delete n[field]; return n; });
  };

  const validateStep = () => {
    const e = {};
    if (step === 0) {
      if (!form.lastName.trim())  e.lastName  = "Last name is required";
      if (!form.firstName.trim()) e.firstName = "First name is required";
      if (!form.birthDate)        e.birthDate = "Birth date is required";
      if (!form.gender)           e.gender    = "Please select gender";
      if (!form.address.trim())   e.address   = "Address is required";
      if (!form.email.trim())     e.email     = "Email is required";
      if (!form.mobile.trim())    e.mobile    = "Mobile number is required";
    }
    if (step === 1) {
      if (!form.lastSchool.trim())  e.lastSchool  = "Last school attended is required";
      if (!form.yearGraduated)      e.yearGraduated = "Year graduated is required";
      if (!form.lrnNumber.trim())   e.lrnNumber   = "LRN is required";
    }
    if (step === 2) {
      if (!form.program) e.program = "Please select a program";
      if (!form.agreePrivacy)  e.agreePrivacy  = "You must agree to the privacy notice";
      if (!form.agreeAccuracy) e.agreeAccuracy = "You must certify the accuracy of information";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validateStep()) setStep(s => s + 1); };
  const back = () => setStep(s => s - 1);
  const submit = () => {
    if (validateStep()) {
      // Send form data via EmailJS
      emailjs.send("service_j988e1h", "template_d4ehbpd", {
        from_name: `${form.firstName} ${form.lastName}`,
        from_email: form.email,
        mobile: form.mobile,
        message: `
          New Enrollment Submission:

          Personal Information:
          - Name: ${form.firstName} ${form.middleName} ${form.lastName} ${form.suffix}
          - Birth Date: ${form.birthDate}
          - Gender: ${form.gender}
          - Civil Status: ${form.civilStatus}
          - Address: ${form.address}, ${form.barangay}, ${form.city}
          - Email: ${form.email}
          - Mobile: ${form.mobile}
          - Emergency Contact: ${form.emergencyContact} (${form.emergencyMobile})

          Academic Background:
          - Last School: ${form.lastSchool}
          - School Type: ${form.schoolType}
          - Year Graduated: ${form.yearGraduated}
          - GPA: ${form.gpa}
          - LRN: ${form.lrnNumber}

          Enrollment Details:
          - Program: ${form.program}
          - Enrollment Type: ${form.enrollmentType}
          - Year Level: ${form.yearLevel}
          - Semester: ${form.semester}

          Submitted at: ${new Date().toLocaleString()}
        `
      }, "JOMcIxXoGWmzqluAe") // You'll need to get this from EmailJS
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setSubmitted(true);
      }, (error) => {
        console.log('FAILED...', error);
        alert('Failed to send email. Please try again later.');
      });
    }
  };

  if (submitted) {
    return (
      <div className="page-hero">
        <div className="container">
          <div className="enrollment-success animate-fade-in-up">
            <div className="success-icon">✅</div>
            <h2>Application Submitted!</h2>
            <p>
              Thank you, <strong>{form.firstName} {form.lastName}</strong>!<br />
              Your enrollment application has been received. A confirmation will be sent to <strong>{form.email}</strong>.
            </p>
            <p className="success-ref">Reference #: DFCAM-{Date.now().toString().slice(-8)}</p>
            <p className="success-note">
              📌 Please wait for further instructions from the Registrar's Office.
              Keep your reference number for follow-up.
            </p>
            <button className="btn btn-accent" onClick={() => { setSubmitted(false); setStep(0); setForm(initialForm); }}>
              Submit Another Application
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumb"><a href="/">Home</a><span>›</span>Enrollment</div>
          <h1>Online Enrollment</h1>
          <p>Complete the form below to apply for enrollment at DFCAMCLP. All fields marked * are required.</p>
        </div>
      </div>

      <section className="section enrollment-section">
        <div className="container enrollment-container">
          {/* Sidebar */}
          <aside className="enrollment-sidebar">
            <div className="enrollment-steps">
              {STEPS.map((s, i) => (
                <div key={s} className={`enroll-step ${i === step ? "active" : ""} ${i < step ? "done" : ""}`}>
                  <div className="enroll-step-num">{i < step ? "✓" : i + 1}</div>
                  <span>{s}</span>
                </div>
              ))}
            </div>
            <div className="sidebar-notice">
              <strong>🔒 Data Privacy Notice</strong>
              <p>Your personal information is collected in compliance with the Data Privacy Act of 2012 (R.A. 10173) and will only be used for enrollment purposes.</p>
            </div>
          </aside>

          {/* Form */}
          <div className="enrollment-form-wrap">
            <div className="card enrollment-card">
              <div className="enrollment-card-header">
                <h2>Step {step + 1}: {STEPS[step]}</h2>
                <span className="step-indicator">{step + 1} of {STEPS.length}</span>
              </div>

              <div className="enrollment-form">
                {/* STEP 0 */}
                {step === 0 && (
                  <div className="animate-fade-in">
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Last Name *</label>
                        <input className={`form-control ${errors.lastName ? "is-invalid" : ""}`} value={form.lastName} onChange={e => set("lastName", e.target.value)} placeholder="Dela Cruz" />
                        {errors.lastName && <div className="form-error">{errors.lastName}</div>}
                      </div>
                      <div className="form-group">
                        <label className="form-label">First Name *</label>
                        <input className={`form-control ${errors.firstName ? "is-invalid" : ""}`} value={form.firstName} onChange={e => set("firstName", e.target.value)} placeholder="Juan" />
                        {errors.firstName && <div className="form-error">{errors.firstName}</div>}
                      </div>
                      <div className="form-group">
                        <label className="form-label">Middle Name</label>
                        <input className="form-control" value={form.middleName} onChange={e => set("middleName", e.target.value)} placeholder="Santos" />
                      </div>
                    </div>
                    <div className="form-row form-row-3">
                      <div className="form-group">
                        <label className="form-label">Birth Date *</label>
                        <input type="date" className={`form-control ${errors.birthDate ? "is-invalid" : ""}`} value={form.birthDate} onChange={e => set("birthDate", e.target.value)} />
                        {errors.birthDate && <div className="form-error">{errors.birthDate}</div>}
                      </div>
                      <div className="form-group">
                        <label className="form-label">Gender *</label>
                        <select className={`form-control ${errors.gender ? "is-invalid" : ""}`} value={form.gender} onChange={e => set("gender", e.target.value)}>
                          <option value="">Select</option>
                          <option>Male</option><option>Female</option>
                        </select>
                        {errors.gender && <div className="form-error">{errors.gender}</div>}
                      </div>
                      <div className="form-group">
                        <label className="form-label">Civil Status</label>
                        <select className="form-control" value={form.civilStatus} onChange={e => set("civilStatus", e.target.value)}>
                          <option value="">Select</option>
                          <option>Single</option><option>Married</option><option>Widowed</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Address *</label>
                      <input className={`form-control ${errors.address ? "is-invalid" : ""}`} value={form.address} onChange={e => set("address", e.target.value)} placeholder="House No., Street" />
                      {errors.address && <div className="form-error">{errors.address}</div>}
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Barangay</label>
                        <input className="form-control" value={form.barangay} onChange={e => set("barangay", e.target.value)} placeholder="Barangay" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">City</label>
                        <input className="form-control" value={form.city} readOnly style={{background:"var(--gray-100)"}} />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Email Address *</label>
                        <input type="email" className={`form-control ${errors.email ? "is-invalid" : ""}`} value={form.email} onChange={e => set("email", e.target.value)} placeholder="email@example.com" />
                        {errors.email && <div className="form-error">{errors.email}</div>}
                      </div>
                      <div className="form-group">
                        <label className="form-label">Mobile Number *</label>
                        <input className={`form-control ${errors.mobile ? "is-invalid" : ""}`} value={form.mobile} onChange={e => set("mobile", e.target.value)} placeholder="09XXXXXXXXX" />
                        {errors.mobile && <div className="form-error">{errors.mobile}</div>}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 1 */}
                {step === 1 && (
                  <div className="animate-fade-in">
                    <div className="form-group">
                      <label className="form-label">Last School Attended *</label>
                      <input className={`form-control ${errors.lastSchool ? "is-invalid" : ""}`} value={form.lastSchool} onChange={e => set("lastSchool", e.target.value)} placeholder="Name of school" />
                      {errors.lastSchool && <div className="form-error">{errors.lastSchool}</div>}
                    </div>
                    <div className="form-row form-row-3">
                      <div className="form-group">
                        <label className="form-label">School Type</label>
                        <select className="form-control" value={form.schoolType} onChange={e => set("schoolType", e.target.value)}>
                          <option value="">Select</option>
                          <option>Public</option><option>Private</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Year Graduated *</label>
                        <input type="number" className={`form-control ${errors.yearGraduated ? "is-invalid" : ""}`} value={form.yearGraduated} onChange={e => set("yearGraduated", e.target.value)} placeholder="2024" min="1990" max="2025" />
                        {errors.yearGraduated && <div className="form-error">{errors.yearGraduated}</div>}
                      </div>
                      <div className="form-group">
                        <label className="form-label">General Average</label>
                        <input type="number" className="form-control" value={form.gpa} onChange={e => set("gpa", e.target.value)} placeholder="85.00" min="60" max="100" step="0.01" />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">School Address</label>
                      <input className="form-control" value={form.schoolAddress} onChange={e => set("schoolAddress", e.target.value)} placeholder="City, Province" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">LRN (Learner Reference Number) *</label>
                      <input className={`form-control ${errors.lrnNumber ? "is-invalid" : ""}`} value={form.lrnNumber} onChange={e => set("lrnNumber", e.target.value)} placeholder="12-digit LRN" maxLength={12} />
                      {errors.lrnNumber && <div className="form-error">{errors.lrnNumber}</div>}
                    </div>
                    <div className="alert alert-info">
                      📎 You will need to submit the following documents to the Registrar's Office within 5 days of approval:
                      Form 138, PSA Birth Certificate, Certificate of Good Moral Character, 2x2 ID photos (4 pcs), Proof of Las Piñas residency.
                    </div>
                  </div>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                  <div className="animate-fade-in">
                    <div className="form-group">
                      <label className="form-label">Program Applied For *</label>
                      <select className={`form-control ${errors.program ? "is-invalid" : ""}`} value={form.program} onChange={e => set("program", e.target.value)}>
                        <option value="">— Select Program —</option>
                        {PROGRAMS.map(p => <option key={p}>{p}</option>)}
                      </select>
                      {errors.program && <div className="form-error">{errors.program}</div>}
                    </div>
                    <div className="form-row form-row-3">
                      <div className="form-group">
                        <label className="form-label">Enrollment Type</label>
                        <select className="form-control" value={form.enrollmentType} onChange={e => set("enrollmentType", e.target.value)}>
                          <option>New Student</option>
                          <option>Existing Student</option>
                          <option>Transferee</option>
                          <option>Returnee</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Year Level</label>
                        <select className="form-control" value={form.yearLevel} onChange={e => set("yearLevel", e.target.value)}>
                          <option>1st Year</option><option>2nd Year</option>
                          <option>3rd Year</option><option>4th Year</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Semester</label>
                        <select className="form-control" value={form.semester} onChange={e => set("semester", e.target.value)}>
                          <option>1st Semester</option><option>2nd Semester</option><option>Summer</option>
                        </select>
                      </div>
                    </div>

                    <div className="privacy-agreements">
                      <h4>Agreements & Declarations</h4>
                      <label className="checkbox-label">
                        <input type="checkbox" checked={form.agreePrivacy} onChange={e => set("agreePrivacy", e.target.checked)} />
                        <span>
                          I have read and understood the <strong>Data Privacy Notice</strong>. I consent to the collection and processing of my personal information for enrollment and academic record purposes under R.A. 10173.
                        </span>
                      </label>
                      {errors.agreePrivacy && <div className="form-error">{errors.agreePrivacy}</div>}
                      <label className="checkbox-label">
                        <input type="checkbox" checked={form.agreeAccuracy} onChange={e => set("agreeAccuracy", e.target.checked)} />
                        <span>
                          I certify that all information provided is <strong>true and accurate</strong>. I understand that any falsification of information may result in the cancellation of my enrollment.
                        </span>
                      </label>
                      {errors.agreeAccuracy && <div className="form-error">{errors.agreeAccuracy}</div>}
                    </div>
                  </div>
                )}

                {/* STEP 3 – REVIEW */}
                {step === 3 && (
                  <div className="animate-fade-in review-section">
                    <div className="alert alert-warning">
                      ⚠️ Please review all details carefully before submitting. You will not be able to edit after submission.
                    </div>
                    <div className="review-group">
                      <h4>Personal Information</h4>
                      <div className="review-row"><span>Full Name</span><strong>{form.firstName} {form.middleName} {form.lastName}</strong></div>
                      <div className="review-row"><span>Birth Date</span><strong>{form.birthDate}</strong></div>
                      <div className="review-row"><span>Gender</span><strong>{form.gender}</strong></div>
                      <div className="review-row"><span>Address</span><strong>{form.address}, {form.barangay}, {form.city}</strong></div>
                      <div className="review-row"><span>Email</span><strong>{form.email}</strong></div>
                      <div className="review-row"><span>Mobile</span><strong>{form.mobile}</strong></div>
                    </div>
                    <div className="review-group">
                      <h4>Academic Background</h4>
                      <div className="review-row"><span>Last School</span><strong>{form.lastSchool}</strong></div>
                      <div className="review-row"><span>Year Graduated</span><strong>{form.yearGraduated}</strong></div>
                      <div className="review-row"><span>LRN</span><strong>{form.lrnNumber}</strong></div>
                      {form.gpa && <div className="review-row"><span>General Average</span><strong>{form.gpa}</strong></div>}
                    </div>
                    <div className="review-group">
                      <h4>Enrollment Details</h4>
                      <div className="review-row"><span>Program</span><strong>{form.program}</strong></div>
                      <div className="review-row"><span>Type</span><strong>{form.enrollmentType}</strong></div>
                      <div className="review-row"><span>Year Level</span><strong>{form.yearLevel}</strong></div>
                      <div className="review-row"><span>Semester</span><strong>{form.semester}</strong></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="enrollment-actions">
                {step > 0 && (
                  <button className="btn btn-outline" onClick={back}>← Back</button>
                )}
                <div style={{flex:1}} />
                {step < STEPS.length - 1 ? (
                  <button className="btn btn-primary" onClick={next}>Continue →</button>
                ) : (
                  <button className="btn btn-accent" onClick={submit}>Submit Application ✓</button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
