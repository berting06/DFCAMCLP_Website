# DFCAMCLP Website — Frontend

Dr. Filemon C. Aguilar Memorial College of Las Piñas  
City Government of Las Piñas

---

## 📁 Files Included

Copy these into your project at `C:\Users\Albert\Desktop\DFCAM Website\`:

```
package.json              ← Replace existing (adds react-router-dom)
src/
  App.js                  ← Main router
  styles/
    global.css            ← Design system & CSS variables
  components/
    Navbar.jsx + Navbar.css
    Footer.jsx + Footer.css
  pages/
    Home.jsx + Home.css       ← Landing page
    Enrollment.jsx + Enrollment.css  ← Multi-step enrollment form
    Schedules.jsx + Schedules.css    ← Class schedule viewer
    LMS.jsx + LMS.css               ← Learning portal
    Login.jsx + Login.css           ← Login with role tabs
```

---

## 🚀 Setup

1. Copy all files into the project folder (keeping the folder structure)
2. Open terminal in the project folder
3. Run:
   ```bash
   npm install
   npm start
   ```

---

## 🧩 Features Implemented

| Feature | Status |
|---|---|
| Responsive Navbar + Mobile Menu | ✅ |
| Homepage (Hero, Stats, Programs, Announcements) | ✅ |
| Online Enrollment (4-step form + DPA compliance) | ✅ |
| Class Schedules (filterable table) | ✅ |
| Learning Portal (courses, modules, progress) | ✅ |
| Login (Student / Faculty / Admin roles) | ✅ |
| Footer with contact info | ✅ |

---

## 🔐 DPA Compliance Notes

- All enrollment forms include Data Privacy Act consent checkboxes
- Privacy notices are displayed in the enrollment sidebar
- Login page shows DPA notice
- No personal data is persisted (frontend only — backend needed for production)

---

## 🔜 Next Steps (Backend)

To make this production-ready, you'll need:
- **Backend**: Node.js (Express) or Laravel + MySQL/PostgreSQL
- **Auth**: JWT or session-based authentication
- **Database**: Students, faculty, courses, schedules, enrollments tables
- **File storage**: For submitted documents (DepEd Form 138, birth cert, etc.)
- **Email notifications**: For enrollment confirmations

---

## 📐 Design System

Colors: Deep Blue (`#003087`) + Gold (`#c8a84b`)  
Fonts: Playfair Display (headings) + Source Sans 3 (body)  
Based on Las Piñas City Government / DFCAMCLP branding
