import React, { useEffect, memo, useMemo } from "react"
import { FileText, Code, Award, Globe, ArrowUpRight, Sparkles, UserCheck, Download } from "lucide-react"
import AOS from 'aos'
import 'aos/dist/aos.css'
import { projects, certificates } from '../data/localData'

// Memoized Components
const Header = memo(() => (
  <div className="text-center lg:mb-8 mb-2 px-[5%]">
    <div className="inline-block relative group">
      <h2 
        className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]" 
        data-aos="zoom-in-up"
        data-aos-duration="600"
      >
        About Me
      </h2>
    </div>
    <p 
      className="mt-2 text-gray-400 max-w-2xl mx-auto text-base sm:text-lg flex items-center justify-center gap-2"
      data-aos="zoom-in-up"
      data-aos-duration="800"
    >
      <Sparkles className="w-5 h-5 text-purple-400" />
      Transforming ideas into digital experiences
      <Sparkles className="w-5 h-5 text-purple-400" />
    </p>
  </div>
));

const ProfileImage = memo(() => (
  <div className="flex justify-end items-center sm:p-12 sm:py-0 sm:pb-0 p-0 py-2 pb-2">
    <div 
      className="relative group" 
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      {/* Optimized gradient backgrounds with reduced complexity for mobile */}
      <div className="absolute -inset-6 opacity-[25%] z-0 hidden sm:block">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-indigo-500 to-purple-600 rounded-full blur-2xl animate-spin-slower" />
        <div className="absolute inset-0 bg-gradient-to-l from-fuchsia-500 via-rose-500 to-pink-600 rounded-full blur-2xl animate-pulse-slow opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-600 via-cyan-500 to-teal-400 rounded-full blur-2xl animate-float opacity-50" />
      </div>

      <div className="relative">
        <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-full overflow-hidden shadow-[0_0_40px_rgba(120,119,198,0.3)] transform transition-all duration-700 group-hover:scale-105">
          <div className="absolute inset-0 border-4 border-white/20 rounded-full z-20 transition-all duration-700 group-hover:border-white/40 group-hover:scale-105" />
          
          {/* Optimized overlay effects - disabled on mobile */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 z-10 transition-opacity duration-700 group-hover:opacity-0 hidden sm:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 via-transparent to-blue-500/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 hidden sm:block" />
          
          <img
            src="/Photo.jpg"
            alt="Profile"
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
            loading="lazy"
          />

          {/* Advanced hover effects - desktop only */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 z-20 hidden sm:block">
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-white/10 to-transparent transform translate-y-full group-hover:-translate-y-full transition-transform duration-1000 delay-100" />
            <div className="absolute inset-0 rounded-full border-8 border-white/10 scale-0 group-hover:scale-100 transition-transform duration-700 animate-pulse-slow" />
          </div>
        </div>
      </div>
    </div>
  </div>
));

const StatCard = memo(({ icon: Icon, color, value, label, description, animation }) => (
  <div data-aos={animation} data-aos-duration={1300} className="relative group">
    <div className="relative z-10 bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full flex flex-col justify-between">
      <div className={`absolute -z-10 inset-0 bg-gradient-to-br ${color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
      
      <div className="flex items-center justify-between mb-4">
        <div className="w-16 h-16 rounded-full flex items-center justify-center bg-white/10 transition-transform group-hover:rotate-6">
          <Icon className="w-8 h-8 text-white" />
        </div>
        <span 
          className="text-4xl font-bold text-white"
          data-aos="fade-up-left"
          data-aos-duration="1500"
          data-aos-anchor-placement="top-bottom"
        >
          {value}
        </span>
      </div>

      <div>
        <p 
          className="text-sm uppercase tracking-wider text-gray-300 mb-2"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-anchor-placement="top-bottom"
        >
          {label}
        </p>
        <div className="flex items-center justify-between">
          <p 
            className="text-xs text-gray-400"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-anchor-placement="top-bottom"
          >
            {description}
          </p>
          <ArrowUpRight className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
        </div>
      </div>
    </div>
  </div>
));

const AboutPage = () => {
  // Memoized calculations
  const { totalProjects, totalCertificates, YearExperience } = useMemo(() => {
    const startDate = new Date("2024-02-01");
    const today = new Date();
    const experience = today.getFullYear() - startDate.getFullYear() -
      (today < new Date(today.getFullYear(), startDate.getMonth(), startDate.getDate()) ? 1 : 0);

    return {
      totalProjects: projects.length,
      totalCertificates: certificates.length,
      YearExperience: experience
    };
  }, []);

  // Optimized AOS initialization
  useEffect(() => {
    const initAOS = () => {
      AOS.init({
        once: false, 
      });
    };

    initAOS();
    
    // Debounced resize handler
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(initAOS, 250);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  // Memoized stats data
  const statsData = useMemo(() => [
    {
      icon: Code,
      color: "from-[#6366f1] to-[#a855f7]",
      value: totalProjects,
      label: "Total Projects",
      description: "Innovative web solutions crafted",
      animation: "fade-right",
    },
    {
      icon: Award,
      color: "from-[#a855f7] to-[#6366f1]",
      value: totalCertificates,
      label: "Certificates",
      description: "Professional skills validated",
      animation: "fade-up",
    },
    {
      icon: Globe,
      color: "from-[#6366f1] to-[#a855f7]",
      value: YearExperience,
      label: "Years of Experience",
      description: "Continuous learning journey",
      animation: "fade-left",
    },
  ], [totalProjects, totalCertificates, YearExperience]);

  return (
    <div
      className="h-auto pb-[10%] text-white overflow-hidden px-[5%] sm:px-[5%] lg:px-[10%] mt-10 sm-mt-0" 
      id="About"
    >
      <Header />

      <div className="w-full mx-auto pt-8 sm:pt-12 relative">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="space-y-6 text-center lg:text-left">
            <h2 
              className="text-3xl sm:text-4xl lg:text-5xl font-bold"
              data-aos="fade-right"
              data-aos-duration="1000"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
                Information Systems Student at Gunadarma University
              </span>
            </h2>
            <div className="text-gray-300 space-y-4">
              <p
                data-aos="fade-up"
                data-aos-duration="1000"
                className="text-lg"
              >
                Hi! I'm Rafi Hermawan, a final-year Information Systems student at Gunadarma University. Currently, I'm part of the Bangkit Academy 2024 program, specializing in Cloud Computing.
              </p>
              <p
                data-aos="fade-up"
                data-aos-duration="1200"
                data-aos-delay="100"
                className="text-lg"
              >
                I specialize in Google Cloud Platform, with expertise in cloud infrastructure, DevOps, and backend development. My skills include GKE, Cloud Run, and Terraform.
              </p>
              <p
                data-aos="fade-up"
                data-aos-duration="1400"
                data-aos-delay="200"
                className="text-lg"
              >
                Passionate about cloud-native development and infrastructure as code, I'm always exploring the latest cloud technologies and best practices.
              </p>
            </div>
          </div>

          <ProfileImage />
        </div>

        <a href="#Portofolio">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 cursor-pointer">
            {statsData.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
        </a>

        <div className="mt-20">
          <h3 
            className="text-3xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]"
            data-aos="zoom-in"
            data-aos-duration="800"
          >
            Technical Skills
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div 
              className="group relative overflow-hidden rounded-xl transition-all duration-500"
              data-aos="fade-right"
              data-aos-duration="1000"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 rounded-xl transform transition-all duration-700 group-hover:scale-105 group-hover:from-blue-600/30 group-hover:to-indigo-600/30"></div>
              <div className="relative backdrop-blur-sm bg-black/30 border border-white/10 rounded-xl p-6 hover:shadow-xl transition-all duration-500 group-hover:border-white/20">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mr-4 shadow-lg group-hover:scale-110 transition-transform duration-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-white">Cloud & Infrastructure</h4>
                </div>
                <ul className="space-y-3">
                  {["Google Cloud Platform (GCP)", "Cloud Run & GKE", "IT Infrastructure & Security", "YAML Configuration", "Terraform (IaC)"].map((skill, index) => (
                    <li 
                      key={index} 
                      className="flex items-center transform transition-all duration-300 hover:translate-x-2"
                      data-aos="fade-up"
                      data-aos-delay={100 * index}
                      data-aos-duration="800"
                    >
                      <span className="h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                      <span className="text-gray-300 hover:text-white transition-colors">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div 
              className="group relative overflow-hidden rounded-xl transition-all duration-500"
              data-aos="fade-left"
              data-aos-duration="1000"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-xl transform transition-all duration-700 group-hover:scale-105 group-hover:from-purple-600/30 group-hover:to-pink-600/30"></div>
              <div className="relative backdrop-blur-sm bg-black/30 border border-white/10 rounded-xl p-6 hover:shadow-xl transition-all duration-500 group-hover:border-white/20">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mr-4 shadow-lg group-hover:scale-110 transition-transform duration-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-white">Development & Databases</h4>
                </div>
                <ul className="space-y-3">
                  {["JavaScript & Node.js", "Spring Boot (Java)", "MySQL & SQL Server", "Oracle Database", "RESTful API Design"].map((skill, index) => (
                    <li 
                      key={index} 
                      className="flex items-center transform transition-all duration-300 hover:translate-x-2"
                      data-aos="fade-up"
                      data-aos-delay={100 * index}
                      data-aos-duration="800"
                    >
                      <span className="h-2 w-2 rounded-full bg-purple-500 mr-2"></span>
                      <span className="text-gray-300 hover:text-white transition-colors">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div 
              className="group relative overflow-hidden rounded-xl transition-all duration-500"
              data-aos="fade-right"
              data-aos-duration="1000"
              data-aos-delay="200"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-teal-600/20 to-green-600/20 rounded-xl transform transition-all duration-700 group-hover:scale-105 group-hover:from-teal-600/30 group-hover:to-green-600/30"></div>
              <div className="relative backdrop-blur-sm bg-black/30 border border-white/10 rounded-xl p-6 hover:shadow-xl transition-all duration-500 group-hover:border-white/20">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-500 to-green-600 flex items-center justify-center mr-4 shadow-lg group-hover:scale-110 transition-transform duration-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-white">Process & Testing</h4>
                </div>
                <ul className="space-y-3">
                  {["Camunda 8 Process Automation", "Postman for API Testing", "Git Version Control", "Maven & JUnit Testing"].map((skill, index) => (
                    <li 
                      key={index} 
                      className="flex items-center transform transition-all duration-300 hover:translate-x-2"
                      data-aos="fade-up"
                      data-aos-delay={100 * index}
                      data-aos-duration="800"
                    >
                      <span className="h-2 w-2 rounded-full bg-teal-500 mr-2"></span>
                      <span className="text-gray-300 hover:text-white transition-colors">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div 
              className="group relative overflow-hidden rounded-xl transition-all duration-500"
              data-aos="fade-left"
              data-aos-duration="1000"
              data-aos-delay="200"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-600/20 to-orange-600/20 rounded-xl transform transition-all duration-700 group-hover:scale-105 group-hover:from-amber-600/30 group-hover:to-orange-600/30"></div>
              <div className="relative backdrop-blur-sm bg-black/30 border border-white/10 rounded-xl p-6 hover:shadow-xl transition-all duration-500 group-hover:border-white/20">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mr-4 shadow-lg group-hover:scale-110 transition-transform duration-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-white">Additional Skills</h4>
                </div>
                <ul className="space-y-3">
                  {["Web Development (HTML/CSS)", "Machine Learning with GCP", "Data Preparation & Analysis", "Network Programming", "AI Fundamentals"].map((skill, index) => (
                    <li 
                      key={index} 
                      className="flex items-center transform transition-all duration-300 hover:translate-x-2"
                      data-aos="fade-up"
                      data-aos-delay={100 * index}
                      data-aos-duration="800"
                    >
                      <span className="h-2 w-2 rounded-full bg-amber-500 mr-2"></span>
                      <span className="text-gray-300 hover:text-white transition-colors">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div 
              className="group relative overflow-hidden rounded-xl transition-all duration-500 lg:col-span-2"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#6366f1]/20 to-[#a855f7]/20 rounded-xl transform transition-all duration-700 group-hover:scale-105 group-hover:from-[#6366f1]/30 group-hover:to-[#a855f7]/30"></div>
              <div className="relative backdrop-blur-sm bg-black/30 border border-white/10 rounded-xl p-6 hover:shadow-xl transition-all duration-500 group-hover:border-white/20">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] flex items-center justify-center mr-4 shadow-lg group-hover:scale-110 transition-transform duration-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-white">Soft Skills</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    "Learning Agility & Collaboration", 
                    "Problem-Solving & Attention to Detail",
                    "Resilience & Adaptability",
                    "Time Management & Organization",
                    "Business Communication (English)",
                    "Project Management"
                  ].map((skill, index) => (
                    <li 
                      key={index} 
                      className="flex items-center transform transition-all duration-300 hover:translate-x-2 list-none"
                      data-aos="fade-up"
                      data-aos-delay={100 * index}
                      data-aos-duration="800"
                    >
                      <span className="h-2 w-2 rounded-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] mr-2"></span>
                      <span className="text-gray-300 hover:text-white transition-colors">{skill}</span>
                    </li>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-12">
            <a 
              href="https://drive.google.com/file/d/15y8k0-OqYTIY1JDSx4KpuUh6sOt6ZXGq/view?usp=sharing" 
              target="_blank"
              rel="noopener noreferrer"
              className="group"
              data-aos="zoom-in"
              data-aos-duration="1000"
            >
              <button className="relative overflow-hidden px-8 py-4 rounded-lg bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white font-medium text-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(120,119,198,0.5)] flex items-center gap-3">
                <span className="absolute inset-0 bg-white/20 transform -translate-x-full hover:translate-x-0 transition-transform duration-700 group-hover:translate-x-0"></span>
                <Download className="w-6 h-6 group-hover:animate-bounce transition-all duration-300" />
                <span className="relative z-10">Download CV</span>
              </button>
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes spin-slower {
          to { transform: rotate(360deg); }
        }
        .animate-bounce-slow {
          animation: bounce 3s infinite;
        }
        .animate-pulse-slow {
          animation: pulse 3s infinite;
        }
        .animate-spin-slower {
          animation: spin-slower 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default memo(AboutPage);