import React, { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export const CountingNumber = ({ end, duration = 2, suffix = "", prefix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime = null;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
};

export const StatCardAnimated = ({ icon: Icon, title, value, suffix = "", description, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ y: -5 }}
      className="relative group"
    >
      <div className="relative z-10 bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-white/10 transition-all duration-300 hover:border-white/30 hover:shadow-2xl">
        <div className="absolute -z-10 inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>

        <div className="flex items-start justify-between mb-6">
          <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-colors">
            <Icon className="w-6 h-6 text-blue-400" />
          </div>
        </div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: delay + 0.2 }}
          viewport={{ once: true }}
          className="mb-3"
        >
          <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            <CountingNumber end={value} duration={2} suffix={suffix} />
          </div>
        </motion.div>

        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        {description && (
          <p className="text-sm text-gray-400">{description}</p>
        )}
      </div>
    </motion.div>
  );
};

export default CountingNumber;
