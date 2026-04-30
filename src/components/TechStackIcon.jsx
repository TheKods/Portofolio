import React from "react";
import { Boxes } from "lucide-react";
import { FaJava, FaCogs } from "react-icons/fa";
// Use namespace import so the build doesn't fail if a particular icon
// name isn't exported in a specific `react-icons` version.
import * as SiIcons from "react-icons/si";

const NAME_TO_ICON = {
  HTML: SiIcons.SiHtml5,
  CSS: SiIcons.SiCss3,
  JavaScript: SiIcons.SiJavascript,
  Java: FaJava,
  "Spring Boot": SiIcons.SiSpring,
  MySQL: SiIcons.SiMysql,
  "Google Cloud": SiIcons.SiGooglecloud,
  Maven: SiIcons.SiApachemaven,
  Git: SiIcons.SiGit,
  "REST API": SiIcons.SiOpenapiinitiative,
  "Camunda 8": FaCogs,
  Postman: SiIcons.SiPostman,
  YAML: SiIcons.SiYaml,
};

export default function TechStackIcon({ name }) {
  const Icon = NAME_TO_ICON[name] || Boxes;
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 hover:border-blue-400 transition-all duration-300 p-4 shadow-sm hover:shadow-md">
      <div className="w-8 h-8 flex items-center justify-center text-blue-700">
        <Icon size={32} />
      </div>
      <span className="text-slate-900 text-sm font-semibold text-center">
        {name}
      </span>
    </div>
  );
}
