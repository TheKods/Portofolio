import React, { useEffect, memo } from "react";
import { Briefcase, Calendar, MapPin, ArrowRight } from "lucide-react";
import AOS from "aos";

const ExperienceSection = memo(() => {
  useEffect(() => {
    AOS.init({
      once: true,
      offset: 50,
    });
  }, []);

  const experiences = [
    {
      title: "Backend Developer & Cloud Engineer",
      company: "Self-Employed",
      location: "Indonesia",
      period: "February 2024 - Present",
      type: "Full-time",
      description:
        "Developing scalable backend applications and cloud infrastructure solutions. Building RESTful APIs, managing databases, and deploying applications on Google Cloud Platform.",
      achievements: [
        "Developed 5+ backend API projects with Node.js and Express",
        "Completed Google Cloud Platform certifications",
        "Deployed applications to Google Cloud Run and App Engine",
      ],
      skills: ["Node.js", "Google Cloud", "JavaScript", "REST APIs"],
    },
    {
      title: "IT Support & System Administrator",
      company: "Various Organizations",
      location: "Indonesia",
      period: "2022 - 2024",
      type: "Part-time",
      description:
        "Provided technical support and system administration services. Maintained network infrastructure and user systems.",
      achievements: [
        "Resolved 100+ technical support tickets",
        "Completed Google IT Support Professional Certificate",
        "Maintained 99.5% system uptime",
      ],
      skills: ["System Administration", "Technical Support", "Troubleshooting"],
    },
    {
      title: "Information Systems Student",
      company: "Universitas Gunadarma",
      location: "Jakarta, Indonesia",
      period: "2020 - 2024",
      type: "Full-time",
      description:
        "Pursuing degree in Information Systems with focus on software development and system architecture.",
      achievements: [
        "Completed major coursework with strong GPA",
        "8+ certifications earned during studies",
        "Developed multiple academic projects",
      ],
      skills: [
        "Java",
        "Database Design",
        "System Architecture",
        "Web Development",
      ],
    },
  ];

  const educationItems = [
    {
      degree: "Bachelor of Information Systems (S.Kom)",
      institution: "Universitas Gunadarma",
      year: "2024",
      achievements: [
        "GPA: 3.5+",
        "Internship: Cloud Computing",
        "Awards: Dean's List",
      ],
    },
    {
      degree: "Military Academy Education",
      institution: "Armed Forces of Indonesia",
      year: "Ongoing",
      achievements: [
        "Leadership Training",
        "Professional Development",
        "Discipline Excellence",
      ],
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-white" id="Experience">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div
          className="text-center mb-12 md:mb-16"
          data-aos="fade-up"
          data-aos-duration="600"
        >
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full text-sm font-semibold">
              Professional Timeline
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Experience & Education
          </h2>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
            My professional journey in software development and cloud
            engineering.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="mb-16 md:mb-20">
          <h3 className="text-2xl font-bold text-slate-900 mb-8">
            Work Experience
          </h3>
          <div className="space-y-6">
            {experiences.map((experience, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                data-aos-duration="600"
                className="relative"
              >
                {/* Timeline line */}
                {index !== experiences.length - 1 && (
                  <div className="absolute left-6 top-20 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 to-transparent"></div>
                )}

                {/* Timeline dot */}
                <div className="absolute left-0 top-2 w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg">
                  <Briefcase size={20} />
                </div>

                {/* Content */}
                <div className="ml-20 bg-slate-50 border border-slate-200 rounded-xl p-6 md:p-8 hover:shadow-md hover:border-blue-300 transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div>
                      <h4 className="text-xl font-bold text-slate-900">
                        {experience.title}
                      </h4>
                      <p className="text-base text-blue-700 font-semibold mt-1">
                        {experience.company}
                      </p>
                    </div>
                    <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                      {experience.type}
                    </div>
                  </div>

                  {/* Meta Info */}
                  <div className="flex flex-col gap-2 text-sm text-slate-600 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-slate-400" />
                      {experience.period}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-slate-400" />
                      {experience.location}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-700 mb-4">
                    {experience.description}
                  </p>

                  {/* Achievements */}
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-slate-900 mb-2">
                      Key Achievements:
                    </p>
                    <ul className="space-y-1">
                      {experience.achievements.map((achievement, i) => (
                        <li
                          key={i}
                          className="text-sm text-slate-600 flex items-start gap-2"
                        >
                          <ArrowRight
                            size={14}
                            className="text-blue-600 mt-1 flex-shrink-0"
                          />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {experience.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-blue-50 text-blue-800 rounded-full text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div>
          <h3 className="text-2xl font-bold text-slate-900 mb-8">Education</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {educationItems.map((edu, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={300 + index * 100}
                data-aos-duration="600"
                className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-200 rounded-xl p-6 md:p-8"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-indigo-600 flex items-center justify-center text-white flex-shrink-0">
                    <Briefcase size={24} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-slate-900 mb-1">
                      {edu.degree}
                    </h4>
                    <p className="text-indigo-700 font-semibold mb-1">
                      {edu.institution}
                    </p>
                    <p className="text-sm text-slate-600 mb-4">{edu.year}</p>
                    <ul className="space-y-1">
                      {edu.achievements.map((achievement, i) => (
                        <li
                          key={i}
                          className="text-sm text-slate-700 flex items-center gap-2"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-indigo-600"></div>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

ExperienceSection.displayName = "ExperienceSection";

export default ExperienceSection;
