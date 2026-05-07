import React, { useState, useMemo, memo } from "react";
import { Calendar, Clock, ArrowRight, Tag, Search, Filter } from "lucide-react";

// Blog Post Card Component
const BlogPostCard = memo(({ post, featured = false }) => (
  <article
    className={`group relative bg-gray-900/50 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
      featured ? "md:col-span-2 lg:row-span-2" : ""
    }`}
  >
    {/* Image */}
    {post.image && (
      <div
        className={`relative overflow-hidden ${featured ? "h-64 md:h-80" : "h-48"}`}
      >
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-blue-500/90 text-white text-sm rounded-full backdrop-blur-sm">
            {post.category}
          </span>
        </div>

        {/* Read Time */}
        <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 bg-black/50 text-white text-sm rounded-full backdrop-blur-sm">
          <Clock className="w-3 h-3" />
          {post.readTime} min
        </div>
      </div>
    )}

    {/* Content */}
    <div className={`p-6 ${featured ? "md:p-8" : ""}`}>
      {/* Meta Information */}
      <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
        {post.author && <span>By {post.author}</span>}
      </div>

      {/* Title */}
      <h3
        className={`font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-200 ${
          featured ? "text-xl md:text-2xl" : "text-lg"
        }`}
      >
        {post.title}
      </h3>

      {/* Excerpt */}
      <p
        className={`text-gray-400 leading-relaxed mb-4 ${
          featured ? "text-base" : "text-sm line-clamp-3"
        }`}
      >
        {post.excerpt}
      </p>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-white/10 text-gray-300 text-xs rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Read More Link */}
      <a
        href={post.url || "#"}
        className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-200 group/link"
      >
        <span className="font-medium">Read More</span>
        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-1" />
      </a>
    </div>
  </article>
));

// Blog Filters Component
const BlogFilters = memo(({ posts, onFilterChange, currentFilters }) => {
  const [searchTerm, setSearchTerm] = useState(currentFilters.search || "");
  const [selectedCategory, setSelectedCategory] = useState(
    currentFilters.category || "all",
  );

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = [...new Set(posts.map((post) => post.category))];
    return ["all", ...cats];
  }, [posts]);

  const handleSearch = (value) => {
    setSearchTerm(value);
    onFilterChange({
      ...currentFilters,
      search: value,
      category: selectedCategory,
    });
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    onFilterChange({
      ...currentFilters,
      search: searchTerm,
      category: category,
    });
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10 mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          />
        </div>

        {/* Category Filter */}
        <div className="relative">
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="appearance-none bg-white/10 border border-white/20 rounded-xl px-4 py-3 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          >
            {categories.map((category) => (
              <option key={category} value={category} className="bg-gray-800">
                {category === "all" ? "All Categories" : category}
              </option>
            ))}
          </select>
          <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
        </div>
      </div>
    </div>
  );
});

// Blog Grid Component
export const BlogGrid = memo(({ posts, filters = {}, onFilterChange }) => {
  // Filter posts based on current filters
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        !filters.search ||
        post.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(filters.search.toLowerCase()) ||
        post.tags?.some((tag) =>
          tag.toLowerCase().includes(filters.search.toLowerCase()),
        );

      const matchesCategory =
        !filters.category ||
        filters.category === "all" ||
        post.category === filters.category;

      return matchesSearch && matchesCategory;
    });
  }, [posts, filters]);

  // Separate featured posts
  const featuredPosts = filteredPosts.filter((post) => post.featured);
  const regularPosts = filteredPosts.filter((post) => !post.featured);

  return (
    <div className="space-y-8">
      {/* Filters */}
      <BlogFilters
        posts={posts}
        onFilterChange={onFilterChange}
        currentFilters={filters}
      />

      {/* Results Count */}
      <div className="text-gray-400 text-sm">
        Showing {filteredPosts.length} of {posts.length} articles
      </div>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">
            Featured Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} featured />
            ))}
          </div>
        </section>
      )}

      {/* Regular Posts */}
      {regularPosts.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">
            {featuredPosts.length > 0 ? "More Articles" : "Latest Articles"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* No Results */}
      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-800 rounded-full flex items-center justify-center">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            No articles found
          </h3>
          <p className="text-gray-400">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      )}
    </div>
  );
});

// Sample blog posts data
export const sampleBlogPosts = [
  {
    id: 1,
    title: "Building Scalable APIs with Node.js and Express",
    excerpt:
      "Learn how to design and implement robust REST APIs that can handle thousands of requests per minute using modern Node.js patterns and best practices.",
    category: "Backend Development",
    date: "2024-01-15",
    readTime: 8,
    author: "Rafi Hermawan",
    featured: true,
    tags: ["nodejs", "api", "express", "scalability"],
    image: "/images/blog/api-design.jpg",
    url: "/blog/building-scalable-apis",
  },
  {
    id: 2,
    title: "Microservices Architecture: When and How to Implement",
    excerpt:
      "A comprehensive guide to understanding microservices architecture, its benefits, challenges, and practical implementation strategies for modern applications.",
    category: "Architecture",
    date: "2024-01-10",
    readTime: 12,
    author: "Rafi Hermawan",
    featured: true,
    tags: ["microservices", "architecture", "docker", "kubernetes"],
    image: "/images/blog/microservices.jpg",
    url: "/blog/microservices-guide",
  },
  {
    id: 3,
    title: "Database Optimization Techniques for High-Traffic Applications",
    excerpt:
      "Explore advanced database optimization strategies including indexing, query optimization, connection pooling, and caching mechanisms.",
    category: "Database",
    date: "2024-01-05",
    readTime: 10,
    author: "Rafi Hermawan",
    featured: false,
    tags: ["database", "optimization", "postgresql", "performance"],
    image: "/images/blog/database-optimization.jpg",
    url: "/blog/database-optimization",
  },
  {
    id: 4,
    title: "CI/CD Pipeline Best Practices for Backend Teams",
    excerpt:
      "Implementing robust CI/CD pipelines to ensure code quality, automated testing, and reliable deployments in production environments.",
    category: "DevOps",
    date: "2023-12-28",
    readTime: 9,
    author: "Rafi Hermawan",
    featured: false,
    tags: ["ci-cd", "devops", "automation", "testing"],
    image: "/images/blog/ci-cd.jpg",
    url: "/blog/ci-cd-best-practices",
  },
  {
    id: 5,
    title: "Securing REST APIs: Authentication and Authorization",
    excerpt:
      "Comprehensive guide to implementing secure authentication and authorization mechanisms for your REST APIs using JWT, OAuth, and best security practices.",
    category: "Security",
    date: "2023-12-20",
    readTime: 11,
    author: "Rafi Hermawan",
    featured: false,
    tags: ["security", "jwt", "oauth", "api-security"],
    image: "/images/blog/api-security.jpg",
    url: "/blog/api-security-guide",
  },
  {
    id: 6,
    title: "Monitoring and Logging Strategies for Backend Applications",
    excerpt:
      "Learn how to implement effective monitoring and logging strategies to maintain application health and quickly diagnose issues in production.",
    category: "DevOps",
    date: "2023-12-15",
    readTime: 7,
    author: "Rafi Hermawan",
    featured: false,
    tags: ["monitoring", "logging", "observability", "production"],
    image: "/images/blog/monitoring.jpg",
    url: "/blog/monitoring-strategies",
  },
];

export default {
  BlogGrid,
  BlogPostCard,
  sampleBlogPosts,
};
