import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Github, ExternalLink, Code2, Users, Calendar } from "lucide-react";
import { projects } from "../data/localData";
import TechStackIcon from "../components/pages/TechStackIcon";

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-white mb-4">Project Not Found</h1>
          <button
            onClick={() => navigate("/#Portfolio")}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:shadow-lg transition-all"
          >
            Back to Portfolio
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black/95 pt-24 pb-20">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20 -z-10">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate("/#Portfolio")}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Portfolio
        </motion.button>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left - Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-gray-900/50 backdrop-blur-lg">
              <img
                src={project.img}
                alt={project.title}
                className="w-full h-96 object-cover"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/500x300?text=" + project.title;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            </div>

            {/* Quick Links */}
            <div className="flex gap-4">
              {project.link && (
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 rounded-lg hover:from-blue-500/30 hover:to-purple-500/30 transition-all font-semibold"
                >
                  <Github className="w-5 h-5" />
                  GitHub Repository
                </motion.a>
              )}
            </div>
          </motion.div>

          {/* Right - Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Title & Description */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {project.title}
              </h1>
              <p className="text-lg text-gray-300 leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                <Code2 className="w-6 h-6 text-blue-400" />
                Key Features
              </h2>
              <ul className="space-y-3">
                {project.features.map((feature, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-3 text-gray-300"
                  >
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Tech Stack */}
            <div>
              <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                <Code2 className="w-6 h-6 text-purple-400" />
                Technologies Used
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {project.techStack.map((tech, idx) => (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-center gap-3 p-3 bg-gray-900/50 rounded-lg border border-white/5 hover:border-white/20 transition-all"
                  >
                    <TechStackIcon name={tech} />
                    <span className="text-sm text-gray-300">{tech}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">
                  {project.features.length}
                </div>
                <div className="text-sm text-gray-400">Features</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">
                  {project.techStack.length}
                </div>
                <div className="text-sm text-gray-400">Technologies</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-400">✓</div>
                <div className="text-sm text-gray-400">Complete</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Projects Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-20 pt-20 border-t border-white/10"
        >
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Other Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects
              .filter((p) => p.id !== id)
              .map((p, idx) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => navigate(`/project/${p.id}`)}
                  className="group cursor-pointer"
                >
                  <div className="relative rounded-xl overflow-hidden border border-white/10 bg-gray-900/50 backdrop-blur-lg hover:border-white/30 transition-all h-64">
                    <img
                      src={p.img}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/500x300?text=" + p.title;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                        {p.title}
                      </h3>
                      <p className="text-sm text-gray-300 mt-2 line-clamp-2">
                        {p.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
