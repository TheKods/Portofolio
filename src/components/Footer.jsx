import React, { memo } from "react";
import {
  Github,
  Linkedin,
  Mail,
  Instagram,
  ExternalLink,
  Code2,
  Heart,
} from "lucide-react";

const Footer = memo(() => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Quick Links",
      links: [
        { label: "Home", href: "#Home" },
        { label: "About", href: "#About" },
        { label: "Portfolio", href: "#Portofolio" },
        { label: "Contact", href: "#Contact" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "GitHub", href: "https://github.com/TheKods" },
        {
          label: "LinkedIn",
          href: "https://www.linkedin.com/in/rafi-hermawan/",
        },
        { label: "Instagram", href: "https://www.instagram.com/rafi_hermawan" },
        { label: "Email", href: "mailto:rafihermawan06@gmail.com" },
      ],
    },
  ];

  const socialIcons = [
    { icon: Github, href: "https://github.com/TheKods", label: "GitHub" },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/rafi-hermawan/",
      label: "LinkedIn",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/rafi_hermawan",
      label: "Instagram",
    },
    { icon: Mail, href: "mailto:rafihermawan06@gmail.com", label: "Email" },
  ];

  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">
                Rafi Hermawan
              </h3>
              <p className="text-sm text-slate-400">
                Backend Developer & Cloud Engineer crafting digital solutions.
              </p>
            </div>
            {/* Social Icons */}
            <div className="flex gap-3 pt-4">
              {socialIcons.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-slate-800 text-slate-300 hover:bg-blue-800 hover:text-white transition-all duration-300"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links Sections */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={
                        link.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        link.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="text-sm text-slate-400 hover:text-blue-400 transition-colors duration-300 inline-flex items-center gap-2"
                    >
                      {link.href.startsWith("http") && (
                        <ExternalLink size={14} />
                      )}
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-sm text-slate-400 flex items-center gap-1">
            © {currentYear} Rafi Hermawan. Built with{" "}
            <Heart size={14} className="text-red-500" /> using React & Tailwind
            CSS
          </p>

          {/* Made by note */}
          <p className="text-xs text-slate-500">
            Designed & developed with <Code2 size={12} className="inline" /> by
            Rafi Hermawan
          </p>
        </div>

        {/* Accessibility Note */}
        <p className="text-xs text-slate-600 text-center mt-6">
          All Rights Reserved | Portfolio © {currentYear}
        </p>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;
