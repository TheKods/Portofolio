import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Project Manager at TechCorp",
    company: "TechCorp",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    content:
      "Working with this developer was an absolute pleasure. They delivered the project on time with exceptional attention to detail.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "CTO at StartupXYZ",
    company: "StartupXYZ",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    content:
      "Impressive technical skills and great communication. They transformed our vision into reality with clean, maintainable code.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Designer at CreativeStudio",
    company: "CreativeStudio",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    content:
      "Outstanding collaboration and problem-solving abilities. Highly recommend for any web development project!",
    rating: 5,
  },
];

const Testimonials = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section
      id="Testimonials"
      className="py-20 bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10"
    >
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What People Say
          </h2>
          <p className="text-gray-400 text-lg">
            Trusted by clients and colleagues around the world
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={cardVariants}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur"></div>
              <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-colors duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full border border-white/20"
                  />
                  <div>
                    <h4 className="text-white font-semibold">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>

                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                <p className="text-gray-300 text-sm leading-relaxed">
                  "{testimonial.content}"
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
