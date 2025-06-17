import React, { useState, useEffect } from 'react';

const Counter = ({ end, duration = 2000, prefix = '', suffix = '' }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!end) return;
    
    let startTime;
    let animationFrame;
    
    const startValue = 0;
    const endValue = parseInt(end, 10);
    
    const countUp = (timestamp) => {
      if (!startTime) startTime = timestamp;
      
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const currentCount = Math.floor(progress * (endValue - startValue) + startValue);
      
      setCount(currentCount);
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(countUp);
      }
    };
    
    animationFrame = requestAnimationFrame(countUp);
    
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [end, duration]);
  
  return (
    <span>
      {prefix}{count}{suffix}
    </span>
  );
};

export default Counter; 