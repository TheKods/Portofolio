import React, { useEffect, memo } from "react";
import { Home, ArrowLeft, Sparkles, Code2 } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

// Memoized Components
const ErrorDisplay = memo(() => (
  <div className="text-center" data-aos="zoom-in" data-aos-duration="800">
    <div className="relative mb-8">
      <div className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
        404
      </div>
      <div className="absolute -inset-4 bg-gradient-to-r from-[#6366f1] to-[#a855f7] blur-2xl opacity-20 rounded-full"></div>
    </div>

    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
      Page Not Found
    </h1>

    <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-8">
      Oops! The page you're looking for seems to have wandered off into the digital void.
      Don't worry, even the best developers encounter this sometimes.
    </p>
  </div>
));

const ActionButtons = memo(() => (
  <div
    className="flex flex-col sm:flex-row gap-4 justify-center"
    data-aos="fade-up"
    data-aos-duration="1000"
    data-aos-delay="400"
  >
    <a
      href="/"
      className="group relative px-8 py-4 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
      <Home className="w-5 h-5" />
      <span className="relative">Go Home</span>
    </a>

    <button
      onClick={() => window.history.back()}
      className="px-8 py-4 border-2 border-white/20 rounded-xl font-semibold text-white hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
    >
      <ArrowLeft className="w-5 h-5" />
      Go Back
    </button>
  </div>
));

const DecorativeElements = memo(() => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Floating particles */}
    <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-float opacity-60"></div>
    <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-purple-400 rounded-full animate-float opacity-40" style={{ animationDelay: '1s' }}></div>
    <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-pink-400 rounded-full animate-float opacity-50" style={{ animationDelay: '2s' }}></div>
    <div className="absolute bottom-1/3 right-1/4 w-4 h-4 bg-indigo-400 rounded-full animate-float opacity-30" style={{ animationDelay: '3s' }}></div>

    {/* Code snippets floating */}
    <div className="absolute top-1/6 right-1/6 transform rotate-12 opacity-20">
      <Code2 className="w-8 h-8 text-gray-500" />
    </div>
    <div className="absolute bottom-1/6 left-1/6 transform -rotate-12 opacity-20">
      <Sparkles className="w-6 h-6 text-gray-500" />
    </div>
  </div>
));

export default function NotFound() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <DecorativeElements />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <ErrorDisplay />
        <ActionButtons />

        {/* Additional helpful content */}
        <div
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="600"
        >
          <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Home className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Home</h3>
            <p className="text-gray-400 text-sm">Return to the main page</p>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Portfolio</h3>
            <p className="text-gray-400 text-sm">Check out my projects</p>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Contact</h3>
            <p className="text-gray-400 text-sm">Get in touch with me</p>
          </div>
        </div>

        {/* Fun message */}
        <div
          className="mt-12 text-center"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="800"
        >
          <p className="text-gray-500 text-sm">
            "In the world of programming, 404 is just another status code waiting to be handled."
          </p>
        </div>
      </div>
    </div>
  );
}