import React from 'react';

const TechStackIcon = ({ icon, language }) => {
  // Determine if the icon needs a light background for better visibility
  const needsLightBackground = ['java.svg', 'mysql.svg'].includes(icon);
  
  return (
    <div className="group p-6 rounded-2xl bg-slate-800/50 hover:bg-slate-700/50 transition-all duration-300 ease-in-out flex flex-col items-center justify-center gap-3 hover:scale-105 cursor-pointer shadow-lg hover:shadow-xl">
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-50 blur transition duration-300"></div>
        <div className={`flex items-center justify-center ${needsLightBackground ? 'bg-white/90 p-2 rounded-full' : ''}`}>
          <img 
            src={icon} 
            alt={`${language} icon`} 
            className="relative h-16 w-16 md:h-20 md:w-20 transform transition-transform duration-300"
          />
        </div>
      </div>
      <span className="text-slate-300 font-semibold text-sm md:text-base tracking-wide group-hover:text-white transition-colors duration-300">
        {language}
      </span>
    </div>
  );
};

export default TechStackIcon; 