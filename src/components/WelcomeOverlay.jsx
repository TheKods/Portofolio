import React, { useEffect, useMemo } from "react";
import Hyperspeed from "./Hyperspeed";
import { AnimatePresence, motion } from "framer-motion";

export default function WelcomeOverlay({
  isOpen,
  onClose,
  durationMs = 3000,
  title = "Welcome To My Portfolio",
  subtitle = "Preparing your personalized portfolio...",
}) {
  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => onClose?.(), durationMs);
    return () => clearTimeout(timer);
  }, [isOpen, durationMs, onClose]);

  const options = useMemo(
    () => ({
      distortion: "turbulentDistortionStill",
      lanesPerRoad: 2,
      totalSideLightSticks: 10,
      lightPairsPerRoadWay: 18,
      roadWidth: 9,
      length: 280,
      speedUp: 1.2,
      carLightsFade: 0.5,
      fov: 80,
      fovSpeedUp: 110,
    }),
    []
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {/* Hyperspeed background */}
          <div className="absolute inset-0">
            <Hyperspeed effectOptions={options} />
          </div>
          {/* Dim overlay */}
          <motion.div
            className="absolute inset-0 bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.45 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#c7d2fe] to-[#e9d5ff] bg-clip-text text-transparent">
                {title}
              </h1>
              <p className="mt-2 text-slate-300 text-sm md:text-base">
                {subtitle}
              </p>

              <p className="mt-4 text-xs md:text-sm text-slate-300/90">
                Please Wait..
              </p>

              <div className="mt-6 flex items-center justify-center gap-3">
                <div className="h-4 w-4 rounded-full bg-white/70 animate-bounce" />
                <div className="h-4 w-4 rounded-full bg-white/70 animate-bounce [animation-delay:150ms]" />
                <div className="h-4 w-4 rounded-full bg-white/70 animate-bounce [animation-delay:300ms]" />
              </div>
              <button
                onClick={onClose}
                className="mt-6 text-xs text-slate-300 hover:text-white transition-colors underline"
              >
                Skip
              </button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
