import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "Building Scalable Web Applications",
    excerpt:
      "Learn the best practices for building web applications that can scale to millions of users...",
    author: "Rafi Hermawan",
    date: "2024-01-15",
    category: "Web Development",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop",
    content: `Building scalable web applications requires careful planning and the right architectural decisions. In this guide, we'll explore the key principles that make applications performant and maintainable as they grow.

## Key Principles

1. **Separation of Concerns** - Keep your code organized and maintainable
2. **Performance Optimization** - Use caching and lazy loading
3. **Database Design** - Plan your schema for future growth
4. **API Design** - Create flexible, versioned APIs

## Tools & Technologies

Modern web development offers many tools to help you build scalable applications. React for the frontend, Node.js for the backend, and databases like PostgreSQL for data management.

## Conclusion

With the right approach and tools, you can build web applications that grow with your business.`,
  },
  {
    id: 2,
    title: "Mastering React Hooks",
    excerpt:
      "Deep dive into React Hooks and learn how to write cleaner, more efficient React components...",
    author: "Rafi Hermawan",
    date: "2024-01-10",
    category: "React",
    readTime: "8 min read",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=500&h=300&fit=crop",
    content: `React Hooks have revolutionized how we write React components. Let's explore the power of hooks and how they can make your code more maintainable.

## Understanding Hooks

Hooks are functions that let you "hook into" React features from function components. They don't work inside classes, and they let you use state and other React features without writing a class.

## Common Hooks

- useState: Add state to functional components
- useEffect: Perform side effects in functional components
- useContext: Consume context values
- useReducer: Complex state management
- Custom Hooks: Create your own reusable logic

Learn how to use these hooks effectively to write better React code.`,
  },
  {
    id: 3,
    title: "CSS Grid vs Flexbox: When to Use Each",
    excerpt:
      "Understand the differences between CSS Grid and Flexbox and learn when to use each layout method...",
    author: "Rafi Hermawan",
    date: "2024-01-05",
    category: "CSS",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1517694712082-e980a87f8b47?w=500&h=300&fit=crop",
    content: `CSS Grid and Flexbox are two powerful layout systems in modern CSS. Understanding when to use each one is crucial for responsive web design.

## Flexbox: One-Dimensional Layout

Flexbox is designed for one-dimensional layouts - either a row or a column. It's perfect for:
- Navigation bars
- Centering content
- Distributing items evenly

## CSS Grid: Two-Dimensional Layout

CSS Grid is designed for two-dimensional layouts. Use it for:
- Page layouts
- Complex designs
- Gallery layouts

## Conclusion

Both tools are valuable and often used together for powerful, responsive layouts.`,
  },
];

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const postVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section
      id="Blog"
      className="py-20 bg-gradient-to-br from-purple-900/10 via-transparent to-blue-900/10"
    >
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Blog & Articles
          </h2>
          <p className="text-gray-400 text-lg">
            Latest insights on web development and technology
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {blogPosts.map((post) => (
            <motion.div
              key={post.id}
              variants={postVariants}
              onClick={() => setSelectedPost(post)}
              className="group cursor-pointer relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur"></div>
              <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden group-hover:border-white/20 transition-all duration-300">
                <div className="overflow-hidden h-48">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-blue-500/30 border border-blue-400/50 rounded-full text-xs font-medium text-blue-300">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-500">
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(post.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {selectedPost && (
          <BlogModal
            post={selectedPost}
            onClose={() => setSelectedPost(null)}
          />
        )}
      </div>
    </section>
  );
};

const BlogModal = ({ post, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-gray-900 border border-white/10 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-gray-900/95 border-b border-white/10 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">{post.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />

          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
            <div className="flex-1">
              <p className="text-sm text-gray-400">By {post.author}</p>
              <p className="text-xs text-gray-500">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <span className="px-3 py-1 bg-blue-500/30 border border-blue-400/50 rounded-full text-xs font-medium text-blue-300">
              {post.category}
            </span>
          </div>

          <div className="prose prose-invert max-w-none">
            {post.content.split("\n\n").map((paragraph, idx) => (
              <div key={idx} className="mb-4">
                {paragraph.startsWith("#") ? (
                  <h3 className="text-xl font-bold text-white mt-4 mb-2">
                    {paragraph.replace("#", "").trim()}
                  </h3>
                ) : paragraph.startsWith("-") ? (
                  <ul className="list-disc list-inside text-gray-300">
                    {paragraph.split("\n").map((item, i) => (
                      <li key={i} className="mb-1">
                        {item.replace("-", "").trim()}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-300 leading-relaxed">{paragraph}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Blog;
