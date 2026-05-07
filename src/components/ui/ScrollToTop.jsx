import React, { useState, useEffect, memo } from 'react';
import { ArrowUp, ChevronUp } from 'lucide-react';

// Scroll to Top Button Component
export const ScrollToTop = memo(({ threshold = 300, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrolled = document.documentElement.scrollTop;
      const maxHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (scrolled / maxHeight) * 100;

      setIsVisible(scrolled > threshold);
      setScrollProgress(progress);
    };

    const throttledToggleVisibility = () => {
      requestAnimationFrame(toggleVisibility);
    };

    window.addEventListener('scroll', throttledToggleVisibility, { passive: true });

    // Initial check
    toggleVisibility();

    return () => window.removeEventListener('scroll', throttledToggleVisibility);
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-50 group ${className}`}
      aria-label="Scroll to top"
    >
      {/* Progress Ring Background */}
      <div className="relative w-14 h-14">
        {/* Background Circle */}
        <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 36 36">
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="2"
          />
          {/* Progress Circle */}
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="url(#scrollGradient)"
            strokeWidth="2"
            strokeDasharray={`${scrollProgress}, 100`}
            className="transition-all duration-300 ease-out"
          />
          <defs>
            <linearGradient id="scrollGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
        </svg>

        {/* Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 bg-gray-900/80 backdrop-blur-lg rounded-full border border-white/20 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl group-hover:bg-gray-900/90">
            <ChevronUp className="w-5 h-5 text-white transition-transform duration-300 group-hover:-translate-y-0.5" />
          </div>
        </div>

        {/* Glow Effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
        Back to top
        <div className="absolute top-full right-3 transform translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
      </div>
    </button>
  );
});

// Smooth Scroll Hook
export const useSmoothScroll = () => {
  const scrollToElement = (elementId, offset = 0) => {
    const element = document.getElementById(elementId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const scrollToTop = (smooth = true) => {
    if (smooth) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      window.scrollTo(0, 0);
    }
  };

  const scrollToBottom = (smooth = true) => {
    if (smooth) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth'
      });
    } else {
      window.scrollTo(0, document.documentElement.scrollHeight);
    }
  };

  return { scrollToElement, scrollToTop, scrollToBottom };
};

// Scroll Progress Bar Component
export const ScrollProgress = memo(({ className = '' }) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrolled = document.documentElement.scrollTop;
      const maxHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (scrolled / maxHeight) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    const throttledUpdateProgress = () => {
      requestAnimationFrame(updateProgress);
    };

    window.addEventListener('scroll', throttledUpdateProgress, { passive: true });

    // Initial check
    updateProgress();

    return () => window.removeEventListener('scroll', throttledUpdateProgress);
  }, []);

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 h-1 bg-transparent ${className}`}>
      <div
        className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-300 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
});

// Intersection Observer Hook for scroll animations
export const useScrollAnimation = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
        }
      },
      { threshold }
    );

    const currentElement = document.querySelector('[data-scroll-animation]');
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [hasAnimated, threshold]);

  return { isVisible, hasAnimated };
};

export default {
  ScrollToTop,
  ScrollProgress,
  useSmoothScroll,
  useScrollAnimation,
};