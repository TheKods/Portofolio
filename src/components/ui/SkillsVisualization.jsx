import React, { useState, useEffect, memo } from "react";
import { TrendingUp, Award, Target, Zap } from "lucide-react";

// Skill Progress Bar Component
const SkillProgressBar = memo(
  ({ skill, percentage, color = "blue", animated = true }) => {
    const [currentPercentage, setCurrentPercentage] = useState(0);

    useEffect(() => {
      if (animated) {
        const timer = setTimeout(() => {
          setCurrentPercentage(percentage);
        }, 100);
        return () => clearTimeout(timer);
      } else {
        setCurrentPercentage(percentage);
      }
    }, [percentage, animated]);

    const colorClasses = {
      blue: "bg-blue-500",
      purple: "bg-purple-500",
      green: "bg-green-500",
      orange: "bg-orange-500",
      red: "bg-red-500",
      pink: "bg-pink-500",
    };

    return (
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-white font-medium">{skill}</span>
          <span className="text-gray-400 text-sm">{currentPercentage}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
          <div
            className={`h-full ${colorClasses[color]} transition-all duration-1000 ease-out rounded-full relative`}
            style={{ width: `${currentPercentage}%` }}
          >
            {/* Animated shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine"></div>
          </div>
        </div>
      </div>
    );
  },
);

// Circular Progress Component
const CircularProgress = memo(
  ({ skill, percentage, size = 120, color = "blue", icon: Icon }) => {
    const [currentPercentage, setCurrentPercentage] = useState(0);
    const strokeWidth = 8;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDasharray = circumference;
    const strokeDashoffset =
      circumference - (currentPercentage / 100) * circumference;

    useEffect(() => {
      const timer = setTimeout(() => {
        setCurrentPercentage(percentage);
      }, 200);
      return () => clearTimeout(timer);
    }, [percentage]);

    const colorClasses = {
      blue: { bg: "text-blue-500", stroke: "#3b82f6" },
      purple: { bg: "text-purple-500", stroke: "#a855f7" },
      green: { bg: "text-green-500", stroke: "#10b981" },
      orange: { bg: "text-orange-500", stroke: "#f97316" },
      red: { bg: "text-red-500", stroke: "#ef4444" },
      pink: { bg: "text-pink-500", stroke: "#ec4899" },
    };

    return (
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <svg width={size} height={size} className="transform -rotate-90">
            {/* Background circle */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="rgba(255,255,255,0.1)"
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            {/* Progress circle */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={colorClasses[color].stroke}
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>

          {/* Icon in center */}
          <div className="absolute inset-0 flex items-center justify-center">
            {Icon && <Icon className={`w-6 h-6 ${colorClasses[color].bg}`} />}
          </div>
        </div>

        <div className="text-center">
          <div className="text-white font-semibold">{skill}</div>
          <div className={`text-sm ${colorClasses[color].bg}`}>
            {currentPercentage}%
          </div>
        </div>
      </div>
    );
  },
);

// Skills Category Component
const SkillsCategory = memo(
  ({ title, skills, type = "bars", color = "blue" }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => setIsVisible(true), 100);
      return () => clearTimeout(timer);
    }, []);

    return (
      <div
        className={`bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10 transition-all duration-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <h3 className="text-xl font-bold text-white mb-6 text-center">
          {title}
        </h3>

        {type === "bars" ? (
          <div className="space-y-4">
            {skills.map((skill, index) => (
              <SkillProgressBar
                key={skill.name}
                skill={skill.name}
                percentage={skill.percentage}
                color={color}
                animated={isVisible}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <CircularProgress
                key={skill.name}
                skill={skill.name}
                percentage={skill.percentage}
                color={color}
                icon={skill.icon}
                size={100}
              />
            ))}
          </div>
        )}
      </div>
    );
  },
);

// Interactive Skills Radar Chart (Simplified version)
const SkillsRadar = memo(({ skills }) => {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const size = 300;
  const center = size / 2;
  const maxRadius = center - 40;

  // Calculate points for radar chart
  const getPoint = (percentage, index, total) => {
    const angle = (index * 2 * Math.PI) / total - Math.PI / 2;
    const radius = (percentage / 100) * maxRadius;
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    };
  };

  const points = skills.map((skill, index) =>
    getPoint(skill.percentage, index, skills.length),
  );

  const pathData =
    points
      .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
      .join(" ") + " Z";

  return (
    <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
      <h3 className="text-xl font-bold text-white mb-6 text-center">
        Skills Overview
      </h3>

      <div className="relative flex justify-center">
        <svg width={size} height={size} className="overflow-visible">
          {/* Grid lines */}
          {[20, 40, 60, 80, 100].map((percentage) => {
            const radius = (percentage / 100) * maxRadius;
            return (
              <circle
                key={percentage}
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
              />
            );
          })}

          {/* Axis lines */}
          {skills.map((_, index) => {
            const angle = (index * 2 * Math.PI) / skills.length - Math.PI / 2;
            const x = center + maxRadius * Math.cos(angle);
            const y = center + maxRadius * Math.sin(angle);
            return (
              <line
                key={index}
                x1={center}
                y1={center}
                x2={x}
                y2={y}
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
              />
            );
          })}

          {/* Skills area */}
          <path
            d={pathData}
            fill="rgba(59, 130, 246, 0.2)"
            stroke="#3b82f6"
            strokeWidth="2"
          />

          {/* Skill points */}
          {points.map((point, index) => (
            <circle
              key={index}
              cx={point.x}
              cy={point.y}
              r="4"
              fill="#3b82f6"
              className="cursor-pointer hover:r-6 transition-all duration-200"
              onMouseEnter={() => setHoveredSkill(skills[index])}
              onMouseLeave={() => setHoveredSkill(null)}
            />
          ))}
        </svg>

        {/* Skill labels */}
        {skills.map((skill, index) => {
          const angle = (index * 2 * Math.PI) / skills.length - Math.PI / 2;
          const labelRadius = maxRadius + 30;
          const x = center + labelRadius * Math.cos(angle);
          const y = center + labelRadius * Math.sin(angle);

          return (
            <div
              key={skill.name}
              className="absolute text-xs text-gray-400 transform -translate-x-1/2 -translate-y-1/2"
              style={{ left: x, top: y }}
            >
              {skill.name}
            </div>
          );
        })}
      </div>

      {/* Hover tooltip */}
      {hoveredSkill && (
        <div className="absolute top-4 left-4 bg-gray-800 text-white px-3 py-2 rounded-lg shadow-lg">
          <div className="font-semibold">{hoveredSkill.name}</div>
          <div className="text-sm text-blue-400">
            {hoveredSkill.percentage}%
          </div>
        </div>
      )}
    </div>
  );
});

// Sample skills data
export const sampleSkills = {
  technical: [
    { name: "Node.js", percentage: 95, icon: Zap },
    { name: "React", percentage: 90, icon: Target },
    { name: "Python", percentage: 85, icon: Award },
    { name: "PostgreSQL", percentage: 88, icon: TrendingUp },
    { name: "Docker", percentage: 82, icon: Target },
    { name: "AWS", percentage: 80, icon: TrendingUp },
  ],
  soft: [
    { name: "Problem Solving", percentage: 95 },
    { name: "Communication", percentage: 90 },
    { name: "Team Leadership", percentage: 85 },
    { name: "Project Management", percentage: 88 },
    { name: "Mentoring", percentage: 82 },
    { name: "Adaptability", percentage: 90 },
  ],
};

export default {
  SkillProgressBar,
  CircularProgress,
  SkillsCategory,
  SkillsRadar,
  sampleSkills,
};
