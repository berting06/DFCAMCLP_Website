import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Enrollment from "./pages/Enrollment";
import Schedules from "./pages/Schedules";
import LMS from "./pages/LMS";
import Login from "./pages/Login";
import "./styles/global.css";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="app-wrapper">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/enrollment" element={<Enrollment />} />
              <Route path="/schedules" element={<Schedules />} />
              <Route path="/lms" element={<LMS />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
