import React, { useState, useEffect, useCallback, memo } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Instagram,
  Sparkles,
  Code2,
  Award,
  Globe,
} from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { projects, certificates } from "../data/localData";

// Memoized Components
const StatusBadge = memo(() => (
  <div
    className="inline-block animate-float lg:mx-0"
    data-aos="zoom-in"
    data-aos-delay="400"
  >
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-full blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
      <div className="relative px-3 sm:px-4 py-2 rounded-full bg-black/30 backdrop-blur-xl border border-white/10">
        <span className="bg-gradient-to-r from-[#93c5fd] to-[#d8b4fe] text-transparent bg-clip-text sm:text-sm text-[0.7rem] font-medium flex items-center">
          <Sparkles className="sm:w-4 sm:h-4 w-3 h-3 mr-2 text-blue-300" />
          Ready to Innovate
        </span>
      </div>
    </div>
  </div>
));

const MainTitle = memo(() => (
  <div className="space-y-2" data-aos="fade-up" data-aos-delay="600">
    <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
      <span className="relative inline-block">
        <span className="absolute -inset-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] blur-2xl opacity-20"></span>
        <span className="relative bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
          Backend
        </span>
      </span>
      <br />
      <span className="relative inline-block mt-2">
        <span className="absolute -inset-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] blur-2xl opacity-20"></span>
        <span className="relative bg-gradient-to-r from-[#c7d2fe] to-[#e9d5ff] bg-clip-text text-transparent">
          Developer
        </span>
      </span>
    </h1>
  </div>
));

const Subtitle = memo(() => (
  <p
    className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl leading-relaxed"
    data-aos="fade-up"
    data-aos-delay="800"
  >
    Crafting robust backend solutions with modern technologies. Specialized in
    building scalable APIs, microservices, and cloud-native applications.
  </p>
));

const SocialLink = memo(({ icon: Icon, link }) => (
  <a href={link} target="_blank" rel="noopener noreferrer">
    <button className="group relative p-3">
      <div className="absolute inset-0 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
      <div className="relative rounded-xl bg-black/40 backdrop-blur-xl p-2 flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-all duration-300">
        <Icon className="w-5 h-5 text-gray-200 group-hover:text-white transition-colors" />
      </div>
    </button>
  </a>
));

// Constants
const TYPING_SPEED = 100;
const ERASING_SPEED = 50;
const PAUSE_DURATION = 2000;
const WORDS = [
  "Information Systems Student",
  "Backend Developer",
  "API Designer",
  "Cloud Engineer",
];

export default function Home() {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [charIndex, setCharIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });

    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleTyping = useCallback(() => {
    if (isTyping) {
      if (charIndex < WORDS[wordIndex].length) {
        setText((prev) => prev + WORDS[wordIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      } else {
        setTimeout(() => setIsTyping(false), PAUSE_DURATION);
      }
    } else {
      if (charIndex > 0) {
        setText((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      } else {
        setWordIndex((prev) => (prev + 1) % WORDS.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, wordIndex]);

  useEffect(() => {
    const timeout = setTimeout(
      handleTyping,
      isTyping ? TYPING_SPEED : ERASING_SPEED,
    );
    return () => clearTimeout(timeout);
  }, [handleTyping]);

  // Lottie configuration
  const lottieOptions = {
    src: "https://lottie.host/58753882-bb6a-49f5-a2c0-950eda1e135a/NLbpVqGegK.lottie",
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
      progressiveLoad: true,
    },
    style: { width: "100%", height: "100%" },
    className: `w-full h-full transition-all duration-500 ${
      isHovering
        ? "scale-[178%] sm:scale-[158%] md:scale-[148%] lg:scale-[143%] rotate-1"
        : "scale-[172%] sm:scale-[152%] md:scale-[142%] lg:scale-[138%]"
    }`,
  };

  return (
    <div
      className="min-h-screen bg-transparent overflow-hidden relative"
      id="Home"
    >
      <div
        className={`relative z-10 transition-all duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8 text-center lg:text-left">
              <StatusBadge />

              <MainTitle />

              <Subtitle />

              {/* Typing Animation */}
              <div
                className="text-xl sm:text-2xl font-mono text-[#c7d2fe] min-h-[2rem] flex items-center justify-center lg:justify-start"
                data-aos="fade-up"
                data-aos-delay="1000"
              >
                <span className="mr-1">&gt;</span>
                <span>{text}</span>
                <span className="animate-pulse">|</span>
              </div>

              {/* CTA Buttons */}
              <div
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                data-aos="fade-up"
                data-aos-delay="1200"
              >
                <a
                  href="#Portfolio"
                  className="group relative px-8 py-4 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
                  <span className="relative flex items-center justify-center gap-2">
                    <Code2 className="w-5 h-5" />
                    View My Work
                  </span>
                </a>

                <a
                  href="#About"
                  className="px-8 py-4 border-2 border-white/20 rounded-xl font-semibold text-white hover:bg-white/10 transition-all duration-300"
                >
                  Learn More
                </a>
              </div>

              {/* Social Links */}
              <div
                className="flex justify-center lg:justify-start gap-4 pt-4"
                data-aos="fade-up"
                data-aos-delay="1400"
              >
                <SocialLink
                  icon={Github}
                  link="https://github.com/TheKods"
                />
                <SocialLink
                  icon={Linkedin}
                  link="https://linkedin.com/in/rafi-hermawan"
                />
                <SocialLink
                  icon={Mail}
                  link="mailto:rafihermawan.dev@gmail.com"
                />
                <SocialLink
                  icon={Instagram}
                  link="https://instagram.com/rafi_hermw"
                />
              </div>
            </div>

            {/* Right Content - Lottie Animation */}
            <div
              className="relative flex justify-center lg:justify-end"
              data-aos="fade-up"
              data-aos-delay="1000"
            >
              <div
                className="relative w-80 h-80 sm:w-96 sm:h-96 lg:w-[28rem] lg:h-[28rem] cursor-pointer"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#6366f1]/20 to-[#a855f7]/20 rounded-full blur-3xl animate-pulse"></div>

                {/* Lottie Animation */}
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <DotLottieReact {...lottieOptions} />
                </div>

                {/* Overlay Effects */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}