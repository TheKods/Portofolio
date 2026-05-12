import React, { useState, useEffect, memo } from "react";
import { ExternalLink, Github, Calendar, Users, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { projects, certificates, techStack } from "../data/localData";
import TechStackIcon from "../components/pages/TechStackIcon";
import CertificateLightbox from "../components/pages/CertificateLightbox";
import ProjectFilter from "../components/pages/ProjectFilter";

// Memoized Components
const ProjectCard = memo(({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className="relative group cursor-pointer"
      data-aos="fade-up"
      data-aos-delay={index * 100}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(`/project/${project.id}`)}
    >
      <div className="relative z-10 bg-gray-900/50 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={project.img}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

          {/* Overlay on Hover */}
          <div
            className={`absolute inset-0 bg-black/70 flex items-center justify-center gap-4 transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
          >
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors duration-200"
              >
                <ExternalLink className="w-5 h-5 text-white" />
              </a>
            )}
            <a
              href={`https://github.com/TheKods/${project.title.toLowerCase().replace(/\s+/g, "-")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors duration-200"
            >
              <Github className="w-5 h-5 text-white" />
            </a>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.techStack.slice(0, 3).map((tech, techIndex) => (
              <span
                key={techIndex}
                className="px-2 py-1 bg-white/10 rounded-full text-xs text-gray-300"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 3 && (
              <span className="px-2 py-1 bg-white/10 rounded-full text-xs text-gray-300">
                +{project.techStack.length - 3}
              </span>
            )}
          </div>

          {/* Features */}
          {project.features && (
            <div className="space-y-1">
              <h4 className="text-sm font-semibold text-gray-300 mb-2">
                Key Features:
              </h4>
              <ul className="space-y-1">
                {project.features.slice(0, 2).map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="text-xs text-gray-400 flex items-center"
                  >
                    <span className="w-1 h-1 bg-blue-400 rounded-full mr-2"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

const CertificateCard = memo(({ certificate, index, onView }) => {
  const [isImageHovered, setIsImageHovered] = useState(false);

  return (
    <motion.div
      onClick={() => onView(certificate)}
      className="relative group cursor-pointer"
      data-aos="fade-up"
      data-aos-delay={index * 100}
      whileHover={{ y: -5 }}
    >
      <div className="relative z-10 bg-gray-900/50 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
        <div className="absolute -z-10 inset-0 bg-gradient-to-br from-green-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Certificate Image Preview */}
        <div
          className="relative h-48 overflow-hidden bg-gray-800"
          onMouseEnter={() => setIsImageHovered(true)}
          onMouseLeave={() => setIsImageHovered(false)}
        >
          <img
            src={certificate.img}
            alt={certificate.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

          {/* Link Button on Image Hover */}
          {certificate.link && (
            <div
              className={`absolute inset-0 bg-black/70 flex items-center justify-center gap-4 transition-opacity duration-300 ${
                isImageHovered ? "opacity-100" : "opacity-0"
              }`}
            >
              <a
                href={certificate.link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors duration-200"
                title="View Certificate"
              >
                <ExternalLink className="w-5 h-5 text-white" />
              </a>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start gap-3 mb-3">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Star className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-green-400 transition-colors duration-300">
                {certificate.title}
              </h3>
              <p className="text-gray-400 text-sm">{certificate.issuer}</p>
            </div>
          </div>

          <div className="flex items-center text-xs text-gray-500 mb-3">
            <Calendar className="w-3 h-3 mr-1" />
            {certificate.date}
          </div>

          {certificate.credentialId && (
            <p className="text-xs text-gray-500 mb-3">
              ID: {certificate.credentialId}
            </p>
          )}

          {certificate.description && (
            <p className="text-gray-400 text-sm leading-relaxed mb-3">
              {certificate.description}
            </p>
          )}

          {/* Link Button in Card Footer */}
          {certificate.link ? (
            <div className="flex">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onView(certificate);
                }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 text-green-400 text-sm font-medium rounded-lg hover:from-green-500/30 hover:to-blue-500/30 transition-colors duration-200 group/link"
              >
                View Certificate
                <ExternalLink className="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform" />
              </button>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-700/50 text-gray-400 text-sm font-medium rounded-lg">
              📄 Certificate Image Only
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
});

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("projects");
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [filteredProjects, setFilteredProjects] = useState(projects);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  const tabs = [
    { id: "projects", label: "Projects", count: projects.length },
    { id: "certificates", label: "Certificates", count: certificates.length },
  ];

  return (
    <section
      className="py-16 md:py-20 bg-transparent relative overflow-hidden"
      id="Portfolio"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block relative group mb-4">
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
              Portfolio
            </h2>
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">
            A showcase of my work, projects, and professional achievements
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-2 border border-white/10">
            <div className="flex gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white shadow-lg"
                      : "text-gray-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {tab.label}
                  <span className="ml-2 px-2 py-1 bg-white/20 rounded-full text-xs">
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === "projects" && (
            <motion.div
              key="projects"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectFilter
                projects={projects}
                onFilterChange={setFilteredProjects}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <ProjectCard project={project} index={index} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "certificates" && (
            <motion.div
              key="certificates"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {certificates.map((certificate, index) => (
                  <motion.div
                    key={certificate.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <CertificateCard
                      certificate={certificate}
                      index={index}
                      onView={setSelectedCertificate}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tech Stack Section */}
        {activeTab === "projects" && (
          <div className="mt-16">
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Tech Stack
              </h3>
              <p className="text-gray-400">Technologies I work with</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6">
              {techStack.map((tech, index) => (
                <div key={tech} data-aos="zoom-in" data-aos-delay={index * 50}>
                  <TechStackIcon name={tech} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Certificate Lightbox Modal */}
      <CertificateLightbox
        certificate={selectedCertificate}
        isOpen={!!selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
      />
    </section>
  );
}
