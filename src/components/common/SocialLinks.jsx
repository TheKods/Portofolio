import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";

// Social links configuration
export const SOCIAL_LINKS = [
  {
    name: "GitHub",
    url: "https://github.com/TheKods",
    icon: Github,
    color: "hover:text-gray-400",
    bgColor: "hover:bg-gray-400/10",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/rafihermawan",
    icon: Linkedin,
    color: "hover:text-blue-400",
    bgColor: "hover:bg-blue-400/10",
  },
  {
    name: "Email",
    url: "mailto:contact@example.com",
    icon: Mail,
    color: "hover:text-red-400",
    bgColor: "hover:bg-red-400/10",
  },
];

export const SocialLinks = ({ variant = "inline", className = "" }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  if (variant === "inline") {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={`flex items-center gap-4 ${className}`}
      >
        {SOCIAL_LINKS.map((link) => (
          <motion.a
            key={link.name}
            variants={itemVariants}
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            title={link.name}
            className={`p-2 rounded-full transition-all duration-300 ${link.color} ${link.bgColor}`}
          >
            <link.icon className="w-5 h-5" />
          </motion.a>
        ))}
      </motion.div>
    );
  }

  // Grid variant (for footer or dedicated section)
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`grid grid-cols-1 sm:grid-cols-3 gap-4 ${className}`}
    >
      {SOCIAL_LINKS.map((link) => (
        <motion.a
          key={link.name}
          variants={itemVariants}
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center justify-center gap-3 p-4 rounded-xl bg-gray-900/50 border border-white/10 hover:border-white/30 transition-all group ${link.bgColor}`}
        >
          <link.icon className={`w-6 h-6 ${link.color}`} />
          <span className={`font-semibold ${link.color}`}>{link.name}</span>
          <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.a>
      ))}
    </motion.div>
  );
};

export default SocialLinks;
