import React, { useEffect, memo } from "react";
import {
  Code2,
  Database,
  Cloud,
  Zap,
  Wrench,
  Users,
  Award,
} from "lucide-react";
import AOS from "aos";

const SkillsSection = memo(() => {
  useEffect(() => {
    AOS.init({
      once: true,
      offset: 50,
    });
  }, []);

  const skillCategories = [
    {
      title: "Backend Development",
      icon: Code2,
      color: "from-blue-600 to-blue-800",
      skills: [
        "Node.js",
        "JavaScript",
        "Express.js",
        "RESTful APIs",
        "Java Spring Boot",
      ],
    },
    {
      title: "Cloud & Infrastructure",
      icon: Cloud,
      color: "from-indigo-600 to-indigo-800",
      skills: [
        "Google Cloud Platform",
        "Cloud Run",
        "Firebase",
        "Cloud SQL",
        "App Engine",
      ],
    },
    {
      title: "Database & Storage",
      icon: Database,
      color: "from-purple-600 to-purple-800",
      skills: ["MySQL", "PostgreSQL", "Oracle", "MongoDB", "SQL Server"],
    },
    {
      title: "Tools & Technologies",
      icon: Wrench,
      color: "from-pink-600 to-rose-800",
      skills: ["Git", "Maven", "Vite", "React", "Tailwind CSS"],
    },
    {
      title: "Soft Skills",
      icon: Users,
      color: "from-amber-600 to-orange-800",
      skills: ["Leadership", "Problem Solving", "Communication", "Teamwork"],
    },
    {
      title: "Certifications",
      icon: Award,
      color: "from-teal-600 to-cyan-800",
      skills: [
        "Bangkit Academy",
        "Google Cloud Engineer",
        "IT Support Professional",
      ],
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-slate-50" id="Skills">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div
          className="text-center mb-12 md:mb-16"
          data-aos="fade-up"
          data-aos-duration="600"
        >
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
              Technical Expertise
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Skills & Expertise
          </h2>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
            A comprehensive overview of my technical skills, tools, and areas of
            expertise in backend development and cloud engineering.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                data-aos-duration="600"
                className="group"
              >
                <div className="h-full bg-white rounded-xl border border-slate-200 p-6 md:p-8 hover:shadow-lg hover:border-slate-300 transition-all duration-300">
                  {/* Icon & Title */}
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon size={24} />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-slate-900">
                      {category.title}
                    </h3>
                  </div>

                  {/* Skills List */}
                  <div className="space-y-2">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600"></div>
                        <span className="text-slate-700 text-sm md:text-base">
                          {skill}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Info */}
        <div
          className="mt-12 md:mt-16 text-center"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          <p className="text-slate-600 text-sm md:text-base max-w-2xl mx-auto">
            I'm continuously learning and updating my skills. Always interested
            in new technologies and best practices in backend development and
            cloud engineering.
          </p>
        </div>
      </div>
    </section>
  );
});

SkillsSection.displayName = "SkillsSection";

export default SkillsSection;
