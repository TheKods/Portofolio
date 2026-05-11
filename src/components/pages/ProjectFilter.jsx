import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

export default function ProjectFilter({ projects, onFilterChange }) {
  const [selectedTech, setSelectedTech] = useState(null);

  // Get all unique technologies from projects
  const allTechnologies = useMemo(() => {
    const techSet = new Set();
    projects.forEach((project) => {
      project.techStack.forEach((tech) => techSet.add(tech));
    });
    return Array.from(techSet).sort();
  }, [projects]);

  // Filter projects based on selected technology
  const filteredProjects = useMemo(() => {
    if (!selectedTech) return projects;
    return projects.filter((project) =>
      project.techStack.includes(selectedTech)
    );
  }, [selectedTech, projects]);

  // Call callback with filtered projects
  React.useEffect(() => {
    onFilterChange(filteredProjects);
  }, [filteredProjects, onFilterChange]);

  const handleTechClick = (tech) => {
    setSelectedTech(selectedTech === tech ? null : tech);
  };

  return (
    <div className="space-y-6 mb-12">
      {/* Filter Label */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-white mb-4">
          Filter by Technology
        </h3>
        {selectedTech && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-gray-400"
          >
            Showing {filteredProjects.length} project(s) with{" "}
            <span className="text-blue-400 font-semibold">{selectedTech}</span>
          </motion.p>
        )}
      </div>

      {/* Tech Stack Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap justify-center gap-3"
      >
        {allTechnologies.map((tech, idx) => (
          <motion.button
            key={tech}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleTechClick(tech)}
            className={`px-4 py-2 rounded-full font-medium transition-all duration-300 border ${
              selectedTech === tech
                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white border-blue-400 shadow-lg shadow-blue-500/50"
                : "bg-gray-900/50 text-gray-300 border-white/10 hover:border-white/30 hover:text-white"
            }`}
          >
            {tech}
            {selectedTech === tech && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="ml-2 inline-block"
              >
                ✓
              </motion.span>
            )}
          </motion.button>
        ))}

        {/* Clear Filter Button */}
        {selectedTech && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedTech(null)}
            className="px-4 py-2 rounded-full font-medium transition-all duration-300 bg-red-500/20 text-red-400 border border-red-400/30 hover:border-red-400/60"
          >
            <X className="w-4 h-4 inline mr-1" />
            Clear Filter
          </motion.button>
        )}
      </motion.div>

      {/* Results Count */}
      {selectedTech && filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-8"
        >
          <p className="text-gray-400">No projects found with {selectedTech}</p>
        </motion.div>
      )}
    </div>
  );
}
