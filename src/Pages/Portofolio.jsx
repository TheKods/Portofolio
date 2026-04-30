import React, { useEffect, useState, useCallback, memo } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Code,
  Award,
  Boxes,
  Github,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import { projects, certificates } from "../data/localData";
import TechStackIcon from "../components/TechStackIcon";

// Memoized Components
const ProjectCard = memo(({ title, description, link, index }) => (
  <div data-aos="fade-up" data-aos-delay={index * 100} data-aos-duration="600">
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      className="group h-full block"
    >
      <div className="h-full bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-300 transition-all duration-300 flex flex-col">
        <div className="flex-1">
          <h4 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors">
            {title}
          </h4>
          <p className="text-slate-600 text-sm leading-relaxed line-clamp-4 mb-4">
            {description}
          </p>
        </div>

        <div className="flex items-center gap-2 text-blue-600 font-medium text-sm group-hover:gap-3 transition-all duration-300">
          View Project
          <ArrowRight size={18} />
        </div>
      </div>
    </a>
  </div>
));

const CertificateCard = memo(({ title, issuer, date, img, link, index }) => {
  const normalizedSrc = img?.startsWith("/Sertif")
    ? img
    : `/Sertif/${img?.split("/").pop() || ""}`;

  const cardContent = (
    <div className="h-full bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-blue-300 transition-all duration-300 flex flex-col">
      {normalizedSrc && (
        <div className="relative w-full h-48 overflow-hidden bg-slate-100">
          <img
            src={normalizedSrc}
            alt={title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
      )}
      <div className="p-6 flex-1 flex flex-col">
        <h4 className="text-base font-bold text-slate-900 mb-2 line-clamp-2">
          {title}
        </h4>
        <p className="text-xs text-slate-600 mb-4">
          <span className="font-semibold">{issuer}</span>
          <br />
          {date}
        </p>
        {link && (
          <div className="mt-auto text-blue-600 font-medium text-sm flex items-center gap-2">
            View Certificate
            <ExternalLink size={14} />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div
      data-aos="fade-up"
      data-aos-delay={index * 100}
      data-aos-duration="600"
    >
      {link ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="group block h-full"
        >
          {cardContent}
        </a>
      ) : (
        <div className="block h-full">{cardContent}</div>
      )}
    </div>
  );
});

ProjectCard.displayName = "ProjectCard";
CertificateCard.displayName = "CertificateCard";

const techStacks = [
  "HTML",
  "CSS",
  "JavaScript",
  "Java",
  "Spring Boot",
  "MySQL",
  "Google Cloud",
  "Maven",
  "Git",
  "REST API",
  "Camunda 8",
  "Postman",
  "YAML",
];

// Tabs Component (Custom, no MUI)
const TabButton = memo(({ active, onClick, icon: Icon, label }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-3 font-semibold text-sm transition-all duration-300 ${
      active
        ? "text-blue-700 border-b-2 border-blue-700"
        : "text-slate-600 hover:text-slate-900 border-b-2 border-transparent"
    }`}
  >
    <Icon size={20} />
    {label}
  </button>
));

TabButton.displayName = "TabButton";

const PortfolioPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [certsOpen, setCertsOpen] = useState(false);

  useEffect(() => {
    AOS.init({
      once: true,
      offset: 50,
    });
  }, []);

  const isMobile =
    typeof window !== "undefined" ? window.innerWidth < 768 : true;
  const initialItems = isMobile ? 4 : 6;

  const displayedProjects = projectsOpen
    ? projects
    : projects.slice(0, initialItems);
  const displayedCertificates = certsOpen
    ? certificates
    : certificates.slice(0, initialItems);

  const tabs = [
    { icon: Code, label: "Projects", id: 0 },
    { icon: Award, label: "Certificates", id: 1 },
    { icon: Boxes, label: "Tech Stack", id: 2 },
  ];

  return (
    <section className="py-16 md:py-20 bg-slate-50" id="Portofolio">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div
          className="text-center mb-12 md:mb-16"
          data-aos="fade-up"
          data-aos-duration="600"
        >
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
              Portfolio Showcase
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Projects & Achievements
          </h2>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
            Explore my journey through projects, certifications, and technical
            expertise. Each section represents a milestone in my continuous
            learning path.
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-12">
          <div className="border-b border-slate-200 flex gap-2 md:gap-8 overflow-x-auto">
            {tabs.map((tab) => (
              <TabButton
                key={tab.id}
                active={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                icon={tab.icon}
                label={tab.label}
              />
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="min-h-96">
          {/* Projects Tab */}
          {activeTab === 0 && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedProjects.map((project, index) => (
                  <ProjectCard key={project.id} {...project} index={index} />
                ))}
              </div>
              {projects.length > initialItems && (
                <div className="flex justify-center pt-4">
                  <button
                    onClick={() => setProjectsOpen(!projectsOpen)}
                    className="px-6 py-2.5 text-blue-700 hover:text-blue-800 font-semibold text-sm border border-blue-700 hover:border-blue-800 rounded-lg transition-all duration-300 hover:bg-blue-50"
                  >
                    {projectsOpen ? "See Less Projects" : "See More Projects"}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Certificates Tab */}
          {activeTab === 1 && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedCertificates.map((cert, index) => (
                  <CertificateCard key={cert.id} {...cert} index={index} />
                ))}
              </div>
              {certificates.length > initialItems && (
                <div className="flex justify-center pt-4">
                  <button
                    onClick={() => setCertsOpen(!certsOpen)}
                    className="px-6 py-2.5 text-blue-700 hover:text-blue-800 font-semibold text-sm border border-blue-700 hover:border-blue-800 rounded-lg transition-all duration-300 hover:bg-blue-50"
                  >
                    {certsOpen
                      ? "See Less Certificates"
                      : "See More Certificates"}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Tech Stack Tab */}
          {activeTab === 2 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {techStacks.map((name, index) => (
                <div
                  key={name}
                  data-aos="fade-up"
                  data-aos-delay={index * 50}
                  data-aos-duration="600"
                >
                  <TechStackIcon name={name} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div
          className="mt-16 md:mt-20 text-center"
          data-aos="fade-up"
          data-aos-delay="400"
          data-aos-duration="600"
        >
          <p className="text-slate-600 mb-6">
            Want to see more of my work or collaborate?
          </p>
          <a
            href="https://github.com/TheKods"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-blue-800 text-white font-semibold rounded-lg hover:bg-blue-900 transition-all duration-300 hover:shadow-lg"
          >
            <Github size={20} />
            View on GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default PortfolioPage;
