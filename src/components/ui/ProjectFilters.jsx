import React, { useState, useEffect, memo } from 'react';
import { Search, Filter, Grid, List, SortAsc, SortDesc, X } from 'lucide-react';

// Search and Filter Component
export const ProjectFilters = memo(({ projects, onFilterChange, currentFilters }) => {
  const [searchTerm, setSearchTerm] = useState(currentFilters.search || '');
  const [selectedTech, setSelectedTech] = useState(currentFilters.tech || []);
  const [sortBy, setSortBy] = useState(currentFilters.sort || 'newest');
  const [viewMode, setViewMode] = useState(currentFilters.view || 'grid');

  // Extract all unique technologies
  const allTech = [...new Set(projects.flatMap(project => project.techStack))];

  const handleSearch = (value) => {
    setSearchTerm(value);
    onFilterChange({
      ...currentFilters,
      search: value,
      tech: selectedTech,
      sort: sortBy,
      view: viewMode
    });
  };

  const handleTechToggle = (tech) => {
    const newTech = selectedTech.includes(tech)
      ? selectedTech.filter(t => t !== tech)
      : [...selectedTech, tech];
    setSelectedTech(newTech);
    onFilterChange({
      ...currentFilters,
      search: searchTerm,
      tech: newTech,
      sort: sortBy,
      view: viewMode
    });
  };

  const handleSort = (sort) => {
    setSortBy(sort);
    onFilterChange({
      ...currentFilters,
      search: searchTerm,
      tech: selectedTech,
      sort: sort,
      view: viewMode
    });
  };

  const handleViewMode = (mode) => {
    setViewMode(mode);
    onFilterChange({
      ...currentFilters,
      search: searchTerm,
      tech: selectedTech,
      sort: sortBy,
      view: mode
    });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTech([]);
    setSortBy('newest');
    onFilterChange({
      search: '',
      tech: [],
      sort: 'newest',
      view: viewMode
    });
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10 mb-8">
      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
        />
      </div>

      <div className="flex flex-wrap gap-4 items-center justify-between">
        {/* Tech Filters */}
        <div className="flex flex-wrap gap-2">
          {allTech.slice(0, 8).map((tech) => (
            <button
              key={tech}
              onClick={() => handleTechToggle(tech)}
              className={`px-3 py-1 rounded-full text-sm transition-all duration-200 ${
                selectedTech.includes(tech)
                  ? 'bg-blue-500 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {tech}
            </button>
          ))}
          {allTech.length > 8 && (
            <span className="px-3 py-1 text-sm text-gray-500">
              +{allTech.length - 8} more
            </span>
          )}
        </div>

        {/* Sort and View Controls */}
        <div className="flex items-center gap-2">
          {/* Sort */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => handleSort(e.target.value)}
              className="appearance-none bg-white/10 border border-white/20 rounded-lg px-3 py-2 pr-8 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="name">Name A-Z</option>
              <option value="name-desc">Name Z-A</option>
            </select>
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
              {sortBy.includes('desc') ? (
                <SortDesc className="w-4 h-4 text-gray-400" />
              ) : (
                <SortAsc className="w-4 h-4 text-gray-400" />
              )}
            </div>
          </div>

          {/* View Mode */}
          <div className="flex bg-white/10 rounded-lg p-1">
            <button
              onClick={() => handleViewMode('grid')}
              className={`p-2 rounded-md transition-all duration-200 ${
                viewMode === 'grid'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleViewMode('list')}
              className={`p-2 rounded-md transition-all duration-200 ${
                viewMode === 'list'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Clear Filters */}
          {(searchTerm || selectedTech.length > 0) && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 px-3 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all duration-200"
            >
              <X className="w-4 h-4" />
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Active Filters Summary */}
      {(searchTerm || selectedTech.length > 0) && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="flex flex-wrap gap-2 items-center text-sm text-gray-400">
            <span>Active filters:</span>
            {searchTerm && (
              <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                Search: "{searchTerm}"
              </span>
            )}
            {selectedTech.map((tech) => (
              <span key={tech} className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded">
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

// Project Statistics Component
export const ProjectStats = memo(({ projects, filteredCount }) => {
  const totalProjects = projects.length;
  const totalTech = [...new Set(projects.flatMap(p => p.techStack))].length;
  const featuredProjects = projects.filter(p => p.featured).length;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-gray-900/50 backdrop-blur-lg rounded-xl p-4 border border-white/10 text-center">
        <div className="text-2xl font-bold text-blue-400">{filteredCount}</div>
        <div className="text-sm text-gray-400">
          {filteredCount === totalProjects ? 'Total' : 'Filtered'} Projects
        </div>
      </div>
      <div className="bg-gray-900/50 backdrop-blur-lg rounded-xl p-4 border border-white/10 text-center">
        <div className="text-2xl font-bold text-purple-400">{totalTech}</div>
        <div className="text-sm text-gray-400">Technologies</div>
      </div>
      <div className="bg-gray-900/50 backdrop-blur-lg rounded-xl p-4 border border-white/10 text-center">
        <div className="text-2xl font-bold text-green-400">{featuredProjects}</div>
        <div className="text-sm text-gray-400">Featured</div>
      </div>
      <div className="bg-gray-900/50 backdrop-blur-lg rounded-xl p-4 border border-white/10 text-center">
        <div className="text-2xl font-bold text-orange-400">
          {Math.round((filteredCount / totalProjects) * 100)}%
        </div>
        <div className="text-sm text-gray-400">Match Rate</div>
      </div>
    </div>
  );
});

// Export all components
export default {
  ProjectFilters,
  ProjectStats,
};