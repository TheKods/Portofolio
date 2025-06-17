import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardProject from "../components/CardProject";
import TechStackIcon from "../components/TechStackIcon";
import AOS from "aos";
import "aos/dist/aos.css";
import Certificate from "../components/Certificate";
import { Code, Award, Boxes } from "lucide-react";
import { projects, certificates } from "../data/localData";

// Separate ShowMore/ShowLess button component
const ToggleButton = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="
      px-3 py-1.5
      text-slate-300 
      hover:text-white 
      text-sm 
      font-medium 
      transition-all 
      duration-300 
      ease-in-out
      flex 
      items-center 
      gap-2
      bg-white/5 
      hover:bg-white/10
      rounded-md
      border 
      border-white/10
      hover:border-white/20
      backdrop-blur-sm
      group
      relative
      overflow-hidden
    "
  >
    <span className="relative z-10 flex items-center gap-2">
      {isShowingMore ? "See Less" : "See More"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`
          transition-transform 
          duration-300 
          ${isShowingMore ? "group-hover:-translate-y-0.5" : "group-hover:translate-y-0.5"}
        `}
      >
        <polyline points={isShowingMore ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
      </svg>
    </span>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500/50 transition-all duration-300 group-hover:w-full"></span>
  </button>
);

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
  { icon: "html.svg", language: "HTML" },
  { icon: "css.svg", language: "CSS" },
  { icon: "javascript.svg", language: "JavaScript" },
  { icon: "java.svg", language: "Java" },
  { icon: "spring.svg", language: "Spring Boot" },
  { icon: "mysql.svg", language: "MySQL" },
  { icon: "gcp.svg", language: "Google Cloud" },
  { icon: "maven.svg", language: "Maven" },
  { icon: "git.svg", language: "Git" },
  { icon: "api.svg", language: "REST API" },
  { icon: "bpmn.svg", language: "Camunda 8" },
  { icon: "postman.svg", language: "Postman" },
  { icon: "yaml.svg", language: "YAML" }
];

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const isMobile = window.innerWidth < 768;
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

  const toggleShowMore = useCallback((type) => {
    if (type === 'projects') {
      setShowAllProjects(prev => !prev);
    } else {
      setShowAllCertificates(prev => !prev);
    }
  }, []);

  const displayedProjects = showAllProjects ? projects : projects.slice(0, initialItems);
  const displayedCertificates = showAllCertificates ? certificates : certificates.slice(0, initialItems);

  return (
    <div className="md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] bg-[#030014] overflow-hidden" id="Portofolio">
      {/* Header section */}
      <div className="text-center pb-10" data-aos="fade-up" data-aos-duration="1000">
        <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
          <span style={{
            color: '#6366f1',
            backgroundImage: 'linear-gradient(45deg, #6366f1 10%, #a855f7 93%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Portfolio Showcase
          </span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
          Explore my journey through projects, certifications, and technical expertise. 
          Each section represents a milestone in my continuous learning path.
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
              background: "linear-gradient(180deg, rgba(139, 92, 246, 0.03) 0%, rgba(59, 130, 246, 0.03) 100%)",
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
                <div key={project.id} data-aos="fade-up" data-aos-delay={index * 100}>
                  <CardProject {...project} />
                </div>
              ))}
            </div>
            {projects.length > initialItems && (
              <div className="flex justify-center mt-8">
                <ToggleButton
                  onClick={() => toggleShowMore('projects')}
                  isShowingMore={showAllProjects}
                />
              </div>
            )}
          </TabPanel>

          {/* Certificates Tab */}
          <TabPanel value={value} index={1}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedCertificates.map((certificate, index) => (
                <div key={certificate.id} data-aos="fade-up" data-aos-delay={index * 100}>
                  <Certificate {...certificate} />
                </div>
              ))}
            </div>
            {certificates.length > initialItems && (
              <div className="flex justify-center mt-8">
                <ToggleButton
                  onClick={() => toggleShowMore('certificates')}
                  isShowingMore={showAllCertificates}
                />
              </div>
            )}
          </TabPanel>

          {/* Tech Stack Tab */}
          <TabPanel value={value} index={2}>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {techStacks.map((tech, index) => (
                <div key={tech.language} data-aos="fade-up" data-aos-delay={index * 100}>
                  <TechStackIcon icon={tech.icon} language={tech.language} />
                </div>
              ))}
            </div>
          </TabPanel>
        </div>
      </Box>
    </div>
  );
}