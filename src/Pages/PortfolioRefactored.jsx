import React, { useEffect, useState } from "react";
import { Code, Award, Boxes } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { projects, certificates } from "../data/localData";
import { useDisclosure } from "../components/useDisclosure";
import {
  Section,
  Container,
  Grid,
  Heading,
  Text,
  Button,
  Badge,
  BadgeGroup,
  ProjectCard,
  CertificateCard,
} from "../components/ui";
import { cn, transitions } from "../styles/theme";

const TabButton = ({ isActive, icon: Icon, label, onClick }) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center gap-2 px-4 md:px-6 py-3 font-medium rounded-lg",
      transitions.default,
      isActive
        ? "bg-blue-800 text-white shadow-md"
        : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900",
    )}
  >
    <Icon className="w-5 h-5" />
    <span className="hidden sm:inline">{label}</span>
  </button>
);

const TechStackGrid = ({ items }) => (
  <div className="flex flex-wrap gap-3">
    {items.map((tech, idx) => (
      <Badge key={idx} variant="primary" size="md">
        {tech}
      </Badge>
    ))}
  </div>
);

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState(0);
  const projectsDisclosure = useDisclosure({ defaultOpen: false });
  const certsDisclosure = useDisclosure({ defaultOpen: false });

  const isMobile =
    typeof window !== "undefined" ? window.innerWidth < 768 : true;
  const initialItems = isMobile ? 3 : 6;

  useEffect(() => {
    AOS.init({
      once: true,
      offset: 50,
    });
  }, []);

  const displayedProjects = projectsDisclosure.open
    ? projects
    : projects.slice(0, initialItems);
  const displayedCertificates = certsDisclosure.open
    ? certificates
    : certificates.slice(0, initialItems);

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

  return (
    <Section id="Portofolio" bgColor="bg-white" py="lg">
      <Container>
        {/* Header */}
        <div className="text-center mb-12" data-aos="fade-up">
          <Heading as="h2" className="mb-4">
            Portfolio Showcase
          </Heading>
          <Text size="lg" color="slate-600" align="center">
            Explore my journey through projects, certifications, and technical
            expertise
          </Text>
        </div>

        {/* Tab Navigation */}
        <div
          className="flex justify-center gap-3 mb-12 flex-wrap"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <TabButton
            isActive={activeTab === 0}
            icon={Code}
            label="Projects"
            onClick={() => setActiveTab(0)}
          />
          <TabButton
            isActive={activeTab === 1}
            icon={Award}
            label="Certificates"
            onClick={() => setActiveTab(1)}
          />
          <TabButton
            isActive={activeTab === 2}
            icon={Boxes}
            label="Tech Stack"
            onClick={() => setActiveTab(2)}
          />
        </div>

        {/* Tab Content */}
        <div data-aos="fade-up" data-aos-delay="200">
          {/* Projects Tab */}
          {activeTab === 0 && (
            <div>
              <Grid cols={{ mobile: 1, tablet: 2, desktop: 3 }}>
                {displayedProjects.map((project, index) => (
                  <div
                    key={project.id}
                    data-aos="fade-up"
                    data-aos-delay={index * 50}
                  >
                    <ProjectCard
                      title={project.title}
                      description={project.description}
                      techStack={project.techStack}
                      link={project.link}
                      features={project.features}
                      image={project.img}
                    />
                  </div>
                ))}
              </Grid>

              {projects.length > initialItems && (
                <div className="flex justify-center mt-8">
                  <Button
                    variant={projectsDisclosure.open ? "secondary" : "primary"}
                    onClick={projectsDisclosure.toggle}
                  >
                    {projectsDisclosure.open
                      ? "See Less Projects"
                      : "See More Projects"}
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Certificates Tab */}
          {activeTab === 1 && (
            <div>
              <Grid cols={{ mobile: 1, tablet: 2, desktop: 3 }}>
                {displayedCertificates.map((cert, index) => (
                  <div
                    key={cert.id}
                    data-aos="fade-up"
                    data-aos-delay={index * 50}
                  >
                    <CertificateCard
                      title={cert.title}
                      issuer={cert.issuer}
                      date={cert.date}
                      image={cert.img}
                      link={cert.link}
                    />
                  </div>
                ))}
              </Grid>

              {certificates.length > initialItems && (
                <div className="flex justify-center mt-8">
                  <Button
                    variant={certsDisclosure.open ? "secondary" : "primary"}
                    onClick={certsDisclosure.toggle}
                  >
                    {certsDisclosure.open
                      ? "See Less Certificates"
                      : "See More Certificates"}
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Tech Stack Tab */}
          {activeTab === 2 && (
            <div className="bg-slate-50 rounded-lg p-8 border border-slate-200">
              <Heading as="h3" className="mb-6">
                Technical Skills
              </Heading>
              <Text color="slate-600" className="mb-6">
                A comprehensive set of technologies and tools I've mastered
                throughout my career journey
              </Text>
              <TechStackGrid items={techStacks} />
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}
