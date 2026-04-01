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
    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors p-3">
      <div className="w-8 h-8 flex items-center justify-center text-white/90">
        <Icon size={24} />
      </div>
      <span className="text-slate-200 text-sm">{name}</span>
    </div>
  );
}
