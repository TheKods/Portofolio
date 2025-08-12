import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import "./index.css";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Navbar from "./components/Navbar";
import Portofolio from "./Pages/Portofolio";
import ContactPage from "./Pages/Contact";
import NotFoundPage from "./Pages/404";
import Squares from "./components/Squares";
import WelcomeOverlay from "./components/WelcomeOverlay";
import SoundCloudPlayer from "./components/SoundCloudPlayer";

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
          <Squares
            speed={20}
            squareSize={64}
            direction="diagonal"
            borderColor="#7c7c7c"
            opacity={0.28}
            lineWidth={2}
            className="fixed inset-0 z-0 pointer-events-none"
          />
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
            <Portofolio />
            <ContactPage />
            <footer>
              <center>
                <hr className="my-3 border-gray-400 opacity-15 sm:mx-auto lg:my-6 text-center" />
                <span className="block text-sm pb-4 text-gray-500 text-center dark:text-gray-400">
                  © {new Date().getFullYear()} {""}
                  <a href="#Home" className="hover:underline">
                    Rafi Hermawan™
                  </a>
                  . All Rights Reserved.
                </span>
              </center>
            </footer>
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
