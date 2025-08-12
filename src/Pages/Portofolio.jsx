import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AOS from "aos";
import "aos/dist/aos.css";
import { Code, Award, Boxes } from "lucide-react";
import { projects, certificates } from "../data/localData";
import { useDisclosure } from "../components/useDisclosure";
import TechStackIcon from "../components/TechStackIcon";

// Minimal placeholders to keep layout while refactoring
const ProjectCard = ({ title, description, link }) => (
  <a href={link} target="_blank" rel="noreferrer">
    <div className="rounded-xl border border-white/10 p-4 bg-white/5 hover:bg-white/10 transition-colors">
      <h4 className="text-white font-semibold mb-1">{title}</h4>
      <p className="text-sm text-slate-300 line-clamp-3">{description}</p>
    </div>
  </a>
);

const CertificateCard = ({ title, issuer, date, img, link }) => {
  const normalizedSrc = img?.startsWith("/Sertif")
    ? img
    : `/Sertif/${img?.split("/").pop() || ""}`;
  return (
    <a
      href={link || "#"}
      target={link ? "_blank" : undefined}
      rel={link ? "noreferrer" : undefined}
    >
      <div className="rounded-xl border border-white/10 p-4 bg-white/5 hover:bg-white/10 transition-colors">
        {normalizedSrc && (
          <img
            src={normalizedSrc}
            alt={title}
            className="w-full h-40 object-cover rounded-lg mb-3"
            loading="lazy"
          />
        )}
        <h4 className="text-white font-semibold">{title}</h4>
        <p className="text-xs text-slate-400">
          {issuer} • {date}
        </p>
      </div>
    </a>
  );
};

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: 1, sm: 3 } }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

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

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = useState(0);

  // React Bits: useDisclosure for show more/less with prop getters
  const projectsDisclosure = useDisclosure({ defaultOpen: false });
  const certsDisclosure = useDisclosure({ defaultOpen: false });

  const isMobile =
    typeof window !== "undefined" ? window.innerWidth < 768 : true;
  const initialItems = isMobile ? 4 : 6;

  useEffect(() => {
    // Initialize AOS once
    AOS.init({
      once: false,
    });
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const displayedProjects = projectsDisclosure.open
    ? projects
    : projects.slice(0, initialItems);
  const displayedCertificates = certsDisclosure.open
    ? certificates
    : certificates.slice(0, initialItems);

  return (
    <div
      className="md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] bg-[#030014] overflow-hidden"
      id="Portofolio"
    >
      {/* Header section */}
      <div
        className="text-center pb-10"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
          <span
            style={{
              color: "#6366f1",
              backgroundImage:
                "linear-gradient(45deg, #6366f1 10%, #a855f7 93%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Portfolio Showcase
          </span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
          Explore my journey through projects, certifications, and technical
          expertise. Each section represents a milestone in my continuous
          learning path.
        </p>
      </div>

      <Box sx={{ width: "100%" }}>
        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: "transparent",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "20px",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "linear-gradient(180deg, rgba(139, 92, 246, 0.03) 0%, rgba(59, 130, 246, 0.03) 100%)",
              backdropFilter: "blur(10px)",
              zIndex: 0,
            },
          }}
          className="md:px-4"
        >
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            variant="fullWidth"
            sx={{
              "& .MuiTab-root": {
                color: "rgba(255, 255, 255, 0.7)",
                fontSize: { xs: "0.75rem", sm: "0.875rem" },
                textTransform: "none",
                fontWeight: "medium",
                "&:hover": {
                  color: "rgba(255, 255, 255, 0.9)",
                },
                "&.Mui-selected": {
                  color: "#fff",
                },
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "rgba(139, 92, 246, 0.8)",
                height: "3px",
                borderRadius: "3px 3px 0 0",
              },
            }}
          >
            <Tab
              icon={<Code className="w-4 h-4 md:w-5 md:h-5" />}
              label="Projects"
              {...a11yProps(0)}
              sx={{
                minHeight: { xs: "48px", sm: "64px" },
                py: { xs: 1, sm: 2 },
              }}
            />
            <Tab
              icon={<Award className="w-4 h-4 md:w-5 md:h-5" />}
              label="Certificates"
              {...a11yProps(1)}
              sx={{
                minHeight: { xs: "48px", sm: "64px" },
                py: { xs: 1, sm: 2 },
              }}
            />
            <Tab
              icon={<Boxes className="w-4 h-4 md:w-5 md:h-5" />}
              label="Tech Stack"
              {...a11yProps(2)}
              sx={{
                minHeight: { xs: "48px", sm: "64px" },
                py: { xs: 1, sm: 2 },
              }}
            />
          </Tabs>
        </AppBar>

        <div className="mt-8">
          {/* Projects Tab */}
          <TabPanel value={value} index={0}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedProjects.map((project, index) => (
                <div
                  key={project.id}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <ProjectCard
                    title={project.title}
                    description={project.description}
                    link={project.link}
                  />
                </div>
              ))}
            </div>
            {projects.length > initialItems && (
              <div className="flex justify-center mt-8">
                <button
                  {...projectsDisclosure.getToggleProps({
                    className:
                      "px-3 py-1.5 text-slate-300 hover:text-white text-sm font-medium transition-all duration-300 ease-in-out flex items-center gap-2 bg-white/5 hover:bg-white/10 rounded-md border border-white/10 hover:border-white/20 backdrop-blur-sm",
                  })}
                >
                  {projectsDisclosure.open ? "See Less" : "See More"}
                </button>
              </div>
            )}
          </TabPanel>

          {/* Certificates Tab */}
          <TabPanel value={value} index={1}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedCertificates.map((certificate, index) => (
                <div
                  key={certificate.id}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <CertificateCard {...certificate} />
                </div>
              ))}
            </div>
            {certificates.length > initialItems && (
              <div className="flex justify-center mt-8">
                <button
                  {...certsDisclosure.getToggleProps({
                    className:
                      "px-3 py-1.5 text-slate-300 hover:text-white text-sm font-medium transition-all duration-300 ease-in-out flex items-center gap-2 bg-white/5 hover:bg-white/10 rounded-md border border-white/10 hover:border-white/20 backdrop-blur-sm",
                  })}
                >
                  {certsDisclosure.open ? "See Less" : "See More"}
                </button>
              </div>
            )}
          </TabPanel>

          {/* Tech Stack Tab */}
          <TabPanel value={value} index={2}>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {techStacks.map((name, index) => (
                <div key={name} data-aos="fade-up" data-aos-delay={index * 100}>
                  <TechStackIcon name={name} />
                </div>
              ))}
            </div>
          </TabPanel>
        </div>
      </Box>
    </div>
  );
}
