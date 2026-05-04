import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import "./index.css";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Navbar from "./components/Navbar";
import Portofolio from "./Pages/Portofolio";
import ContactPage from "./Pages/Contact";
import NotFoundPage from "./Pages/404";
import WelcomeOverlay from "./components/WelcomeOverlay";
import LetterGlitch from "./components/LetterGlitch";
import SoundCloudPlayer from "./components/SoundCloudPlayer";
import SkillsSection from "./components/SkillsSection";
import ExperienceSection from "./components/ExperienceSection";
import Footer from "./components/Footer";

const LandingPage = () => {
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <>
      <WelcomeOverlay
        isOpen={showWelcome}
        onClose={() => setShowWelcome(false)}
        title="Welcome"
        subtitle="Preparing your personalized portfolio..."
        durationMs={3000}
      />

      {!showWelcome && (
        <>
          <div className="relative min-h-screen">
            <div className="absolute inset-0 -z-10">
              <LetterGlitch
                glitchSpeed={50}
                centerVignette={true}
                outerVignette={false}
                smooth={true}
              />
            </div>
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
            <div className="relative z-10">
              <Navbar />
              <Home />
              <About />
              <ExperienceSection />
              <SkillsSection />
              <Portofolio />
              <ContactPage />
              <Footer />
            </div>
          </div>
        </>
      )}
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
