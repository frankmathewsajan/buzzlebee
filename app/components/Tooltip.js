'use client';

import { useState } from 'react';

const Tooltip = ({ 
  children, 
  content, 
  className = "", 
  tooltipClassName = "",
  position = "top",
  delay = 0
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: "bottom-full left-1/2 transform -translate-x-1/2 mb-4",
    bottom: "top-full left-1/2 transform -translate-x-1/2 mt-4",
    left: "right-full top-1/2 transform -translate-y-1/2 mr-4",
    right: "left-full top-1/2 transform -translate-y-1/2 ml-4"
  };

  const arrowClasses = {
    top: "absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-t-6 border-transparent border-t-gray-900/98 filter drop-shadow-lg",
    bottom: "absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-b-6 border-transparent border-b-gray-900/98 filter drop-shadow-lg",
    left: "absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-6 border-b-6 border-l-6 border-transparent border-l-gray-900/98 filter drop-shadow-lg",
    right: "absolute right-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-6 border-b-6 border-r-6 border-transparent border-r-gray-900/98 filter drop-shadow-lg"
  };

  return (
    <span 
      className={`relative group tooltip-hover ${className}`}
      onMouseEnter={() => {
        if (delay > 0) {
          setTimeout(() => setIsVisible(true), delay);
        } else {
          setIsVisible(true);
        }
      }}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <span 
        className={`tooltip-content absolute ${positionClasses[position]} px-5 py-4 bg-gray-900/98 backdrop-blur-md text-white text-sm rounded-2xl opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out whitespace-nowrap z-50 pointer-events-none border border-gray-700/30 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.1)] ${tooltipClassName}`}
      >
        {content}
        <span className={arrowClasses[position]}></span>
      </span>
    </span>
  );
};

export default Tooltip;
