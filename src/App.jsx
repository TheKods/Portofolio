import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import "./index.css";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Portfolio from "./Pages/Portfolio";
import Contact from "./Pages/Contact";
import NotFound from "./Pages/404";
import Navbar from "./components/common/Navbar";
import WelcomeOverlay from "./components/common/WelcomeOverlay";
import SoundCloudPlayer from "./components/common/SoundCloudPlayer";
import SkillsSection from "./components/pages/SkillsSection";
import ExperienceSection from "./components/pages/ExperienceSection";
import Footer from "./components/common/Footer";

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
            <Contact />
            <Footer />
          </div>
        </>
      )}
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
