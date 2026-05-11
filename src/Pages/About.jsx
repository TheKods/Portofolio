import React, { useEffect, memo, useMemo } from "react";
import {
  FileText,
  Code,
  Award,
  Globe,
  ArrowUpRight,
  Sparkles,
  UserCheck,
  Download,
} from "lucide-react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { projects, certificates } from "../data/localData";
import { CountingNumber, StatCardAnimated } from "../components/pages/StatsCounter";

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
    <div className="relative group" data-aos="fade-up" data-aos-duration="1000">
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
            src="/images/Photo.jpg"
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

const StatCard = memo(
  ({ icon: Icon, color, value, label, description, animation, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      data-aos={animation}
      data-aos-duration={1300}
      className="relative group"
    >
      <div className="relative z-10 bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full flex flex-col justify-between">
        <div
          className={`absolute -z-10 inset-0 bg-gradient-to-br ${color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}
        ></div>

        <div className="flex items-center justify-between mb-4">
          <motion.div
            className="w-16 h-16 rounded-full flex items-center justify-center bg-white/10 transition-transform group-hover:rotate-6"
            whileHover={{ rotate: 6, scale: 1.1 }}
          >
            <Icon className="w-8 h-8 text-white" />
          </motion.div>
          <div className="text-right">
            <motion.div
              className="text-3xl font-bold text-white"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
            >
              {value}
            </motion.div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-2">{label}</h3>
          <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    </motion.div>
  ),
);

const SkillCard = memo(({ title, skills, animation }) => (
  <div data-aos={animation} data-aos-duration={1400} className="relative group">
    <div className="relative z-10 bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl">
      <div className="absolute -z-10 inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>

      <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300 hover:bg-white/20 transition-colors duration-200"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  </div>
));

export default function About() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  const stats = useMemo(
    () => [
      {
        icon: Code,
        color: "from-blue-500 to-cyan-500",
        value: `${projects.length}`,
        label: "Projects Completed",
        description:
          "High-quality backend and full-stack projects showcasing clean code and best practices.",
        animation: "fade-up",
      },
      {
        icon: Award,
        color: "from-purple-500 to-pink-500",
        value: `${certificates.length}`,
        label: "Certifications",
        description:
          "Professional certifications from leading platforms including Google, Dicoding, and Gunadarma.",
        animation: "fade-up",
      },
      {
        icon: Globe,
        color: "from-green-500 to-teal-500",
        value: "3+",
        label: "Years Experience",
        description:
          "Building scalable solutions and mentoring junior developers in modern technologies.",
        animation: "fade-up",
      },
      {
        icon: UserCheck,
        color: "from-orange-500 to-red-500",
        value: "100%",
        label: "Quality Focused",
        description:
          "Committed to writing clean code, following best practices, and continuous improvement.",
        animation: "fade-up",
      },
    ],
    [],
  );

  const skills = useMemo(
    () => ({
      "Backend Development": [
        "Node.js",
        "Python",
        "Java",
        "Spring Boot",
        "Express.js",
        "FastAPI",
      ],
      Databases: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Elasticsearch"],
      "Cloud & DevOps": [
        "AWS",
        "Docker",
        "Kubernetes",
        "CI/CD",
        "Terraform",
        "Jenkins",
      ],
      Frontend: ["React", "Vue.js", "TypeScript", "Next.js", "Tailwind CSS"],
    }),
    [],
  );

  return (
    <section
      className="py-16 md:py-20 lg:py-24 bg-transparent relative overflow-hidden"
      id="About"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Header />

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-16">
          {/* Left Column - Profile Image */}
          <ProfileImage />

          {/* Right Column - About Text */}
          <div
            className="space-y-6"
            data-aos="fade-up"
            data-aos-duration="1200"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Hello, I'm Rafi Hermawan
              </h3>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  I'm a passionate Backend Developer and Information Systems
                  student with over 3 years of experience in building robust,
                  scalable web applications. My journey in software development
                  started with a curiosity about how things work behind the
                  scenes, which led me to specialize in backend technologies.
                </p>
                <p>
                  I believe in writing clean, maintainable code and following
                  best practices. My experience spans across various
                  technologies including Node.js, Python, Java, and cloud
                  platforms. I'm always eager to learn new technologies and
                  tackle challenging problems.
                </p>
                <p>
                  When I'm not coding, you can find me contributing to open
                  source projects, writing technical blogs, or exploring the
                  latest trends in technology. I enjoy mentoring junior
                  developers and sharing knowledge with the community.
                </p>
              </div>
            </div>

            {/* Download CV Button */}
            <div className="pt-4">
              <a
                href="/assets/CV_Rafi_Hermawan.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Download className="w-5 h-5" />
                Download CV
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <StatCardAnimated
            icon={Code}
            title="Projects Completed"
            value={projects.length}
            suffix="+"
            description="High-quality solutions"
            delay={0}
          />
          <StatCardAnimated
            icon={Award}
            title="Certifications"
            value={certificates.length}
            description="From top platforms"
            delay={0.1}
          />
          <StatCardAnimated
            icon={Globe}
            title="Years Experience"
            value={3}
            suffix="+"
            description="Building solutions"
            delay={0.2}
          />
          <StatCardAnimated
            icon={UserCheck}
            title="Quality Focused"
            value={100}
            suffix="%"
            description="Best practices"
            delay={0.3}
          />
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(skills).map(([category, skillList], index) => (
            <SkillCard
              key={category}
              title={category}
              skills={skillList}
              animation="fade-up"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
