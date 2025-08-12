import React from "react";
import { Boxes } from "lucide-react";
import { FaJava, FaCogs } from "react-icons/fa";
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiSpring,
  SiMysql,
  SiGooglecloud,
  SiApachemaven,
  SiGit,
  SiOpenapiinitiative,
  SiPostman,
  SiYaml,
} from "react-icons/si";

const NAME_TO_ICON = {
  HTML: SiHtml5,
  CSS: SiCss3,
  JavaScript: SiJavascript,
  Java: FaJava,
  "Spring Boot": SiSpring,
  MySQL: SiMysql,
  "Google Cloud": SiGooglecloud,
  Maven: SiApachemaven,
  Git: SiGit,
  "REST API": SiOpenapiinitiative,
  "Camunda 8": FaCogs,
  Postman: SiPostman,
  YAML: SiYaml,
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
