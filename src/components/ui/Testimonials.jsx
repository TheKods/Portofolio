import React, { useState, useEffect, memo } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, User } from 'lucide-react';

// Testimonial Card Component
const TestimonialCard = memo(({ testimonial, isActive }) => (
  <div
    className={`transition-all duration-500 transform ${
      isActive ? 'scale-100 opacity-100' : 'scale-95 opacity-60'
    }`}
  >
    <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-8 border border-white/10 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
        <Quote className="w-full h-full" />
      </div>

      {/* Rating Stars */}
      <div className="flex items-center gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < testimonial.rating
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-gray-600'
            }`}
          />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="text-lg text-gray-300 leading-relaxed mb-6 relative">
        <Quote className="w-8 h-8 text-blue-400/30 absolute -top-2 -left-2" />
        "{testimonial.quote}"
      </blockquote>

      {/* Author Info */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
          {testimonial.avatar ? (
            <img
              src={testimonial.avatar}
              alt={testimonial.name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <User className="w-6 h-6 text-white" />
          )}
        </div>
        <div>
          <div className="font-semibold text-white">{testimonial.name}</div>
          <div className="text-sm text-gray-400">{testimonial.role}</div>
          <div className="text-xs text-gray-500">{testimonial.company}</div>
        </div>
      </div>

      {/* Project Link (if applicable) */}
      {testimonial.project && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <a
            href={testimonial.project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 text-sm transition-colors duration-200"
          >
            View Project: {testimonial.project.name}
          </a>
        </div>
      )}
    </div>
  </div>
));

// Testimonials Carousel Component
export const TestimonialsCarousel = memo(({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Change testimonial every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Main Testimonial */}
      <div className="mb-8">
        <TestimonialCard
          testimonial={testimonials[currentIndex]}
          isActive={true}
        />
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        {/* Previous Button */}
        <button
          onClick={goToPrevious}
          className="p-3 bg-gray-900/50 backdrop-blur-lg rounded-xl border border-white/10 hover:bg-gray-900/70 transition-all duration-200 group"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-200" />
        </button>

        {/* Dots Indicator */}
        <div className="flex gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? 'bg-blue-500 scale-125'
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={goToNext}
          className="p-3 bg-gray-900/50 backdrop-blur-lg rounded-xl border border-white/10 hover:bg-gray-900/70 transition-all duration-200 group"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-200" />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mt-6 w-full bg-gray-700 rounded-full h-1 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ease-out"
          style={{
            width: `${((currentIndex + 1) / testimonials.length) * 100}%`
          }}
        />
      </div>

      {/* Counter */}
      <div className="text-center mt-4 text-sm text-gray-400">
        {currentIndex + 1} of {testimonials.length}
      </div>
    </div>
  );
});

// Testimonials Grid Component (for smaller displays)
export const TestimonialsGrid = memo(({ testimonials, maxItems = 6 }) => {
  const displayTestimonials = testimonials.slice(0, maxItems);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {displayTestimonials.map((testimonial, index) => (
        <div
          key={testimonial.id}
          data-aos="fade-up"
          data-aos-delay={index * 100}
        >
          <TestimonialCard testimonial={testimonial} isActive={true} />
        </div>
      ))}
    </div>
  );
});

// Sample testimonials data structure
export const sampleTestimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Product Manager",
    company: "TechCorp Inc.",
    rating: 5,
    quote: "Rafi delivered exceptional backend solutions that exceeded our expectations. His attention to detail and problem-solving skills are outstanding.",
    avatar: null,
    project: {
      name: "E-commerce API",
      url: "#"
    }
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "CTO",
    company: "StartupXYZ",
    rating: 5,
    quote: "Working with Rafi was a game-changer for our startup. He built scalable microservices that handled our growth seamlessly.",
    avatar: null,
    project: {
      name: "Microservices Platform",
      url: "#"
    }
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Lead Developer",
    company: "DevStudio",
    rating: 5,
    quote: "Rafi's expertise in cloud technologies helped us migrate our entire infrastructure to GCP. The performance improvements were remarkable.",
    avatar: null,
    project: {
      name: "Cloud Migration",
      url: "#"
    }
  },
  {
    id: 4,
    name: "David Kim",
    role: "Founder",
    company: "InnovateLab",
    rating: 5,
    quote: "The API Rafi developed for our mobile app is robust, well-documented, and performs flawlessly under high load.",
    avatar: null,
    project: {
      name: "Mobile App Backend",
      url: "#"
    }
  }
];

export default {
  TestimonialsCarousel,
  TestimonialsGrid,
  sampleTestimonials,
};