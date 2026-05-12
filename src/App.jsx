import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import "./index.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import ProjectDetail from "./pages/ProjectDetail";
import Blog from "./pages/Blog";
import Testimonials from "./pages/Testimonials";
import NotFound from "./pages/404";
import Navbar from "./components/common/Navbar";
import WelcomeOverlay from "./components/common/WelcomeOverlay";
import SoundCloudPlayer from "./components/common/SoundCloudPlayer";
import SkillsSection from "./components/pages/SkillsSection";
import ExperienceSection from "./components/pages/ExperienceSection";
import Footer from "./components/common/Footer";
import ScrollProgressBar from "./components/common/ScrollProgressBar";
import BackToTop from "./components/common/BackToTop";
import { ThemeProvider } from "./utils/ThemeContext";
import { ToastProvider } from "./utils/ToastContext";

const LandingPage = () => {
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {!showWelcome && (
        <div className="letter-glitch-bg absolute inset-0 -z-10" />
      )}

      <WelcomeOverlay
        isOpen={showWelcome}
        onClose={() => setShowWelcome(false)}
        title="Welcome"
        subtitle="Preparing your personalized portfolio..."
        durationMs={3000}
      />

      {!showWelcome && (
        <>
          <ScrollProgressBar />
          <SoundCloudPlayer
            defaultVolume={0.8}
            autoPlay
            playlist={[
              "https://soundcloud.com/user-356546060/memories-of-spring",
              "https://soundcloud.com/user-356546060/colorful-flowers",
              "https://soundcloud.com/user-356546060/echoes-in-blue",
              "https://soundcloud.com/user-356546060/way-home",
            ]}
          />
          <div
            className="relative z-10"
            style={{ position: "relative", zIndex: 10 }}
          >
            <Navbar />
            <Home />
            <About />
            <ExperienceSection />
            <SkillsSection />
            <Portfolio />
            <Testimonials />
            <Blog />
            <Contact />
            <Footer />
          </div>
          <BackToTop />
        </>
      )}
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
