'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { 
  FaHome, 
  FaUser, 
  FaTools, 
  FaPen, 
  FaAward, 
  FaChartBar, 
  FaBriefcase 
} from 'react-icons/fa';
import Tree from 'react-d3-tree';

// Website sitemap structure - this represents the actual site structure
const SITE_STRUCTURE = {
  name: 'Portfolio',
  path: '/',
  icon: 'FaHome',
  children: [
    {
      name: 'About',
      path: '/about',
      icon: 'FaUser',
      children: [
        {
          name: 'Blog',
          path: '/blogs',
          icon: 'FaPen'
        },
        {
          name: 'Certifications',
          path: '/certifications',
          icon: 'FaAward'
        }
      ]
    },
    {
      name: 'Projects',
      path: '/projects',
      icon: 'FaTools',
      children: [
        {
          name: 'Case Studies',
          path: '/case-studies',
          icon: 'FaChartBar'
        }
      ]
    }
  ]
};

// Create tree data structure for react-d3-tree based on visited pages
const createPortfolioTreeData = (siteStructure, visitedPages, currentPath) => {
  const mapNode = (node) => {
    const isVisited = visitedPages.has(node.path);
    const isCurrent = currentPath === node.path;
    
    return {
      name: node.name,
      attributes: {
        visited: isVisited,
        current: isCurrent,
        path: node.path,
        icon: node.icon,
        href: node.path
      },
      children: node.children ? node.children.map(mapNode) : undefined
    };
  };

  return mapNode(siteStructure);
};

// Custom node component with icons and modern styling
const renderCustomNodeElement = ({ nodeDatum, toggleNode, onNodeClick, pageScrollProgress }) => {
  const iconMap = {
    'FaHome': FaHome,
    'FaUser': FaUser,
    'FaTools': FaTools,
    'FaPen': FaPen,
    'FaAward': FaAward,
    'FaChartBar': FaChartBar,
    'FaBriefcase': FaBriefcase
  };
  
  const IconComponent = iconMap[nodeDatum.attributes?.icon];
  const isVisited = nodeDatum.attributes?.visited;
  const isCurrent = nodeDatum.attributes?.current;
  const isClickable = nodeDatum.attributes?.href;
  const nodePath = nodeDatum.attributes?.path;
  const scrollProgress = pageScrollProgress?.[nodePath] || 0;
  
  // Different sizes for different levels
  const isRoot = nodeDatum.attributes?.path === '/';
  const nodeRadius = isRoot ? 18 : 15;
  
  // Color scheme based on state - Modern tech theme
  let fillColor = '#ffffff';
  let strokeColor = '#d4d4d8';
  let textColor = '#71717a';
  
  if (isCurrent) {
    fillColor = '#000000';
    strokeColor = '#000000';
    textColor = '#ffffff';
  } else if (isVisited) {
    fillColor = '#f5f5f4';
    strokeColor = '#a3a3a3';
    textColor = '#404040';
  }
  
  return (
    <>
      {/* Node circle */}
      <circle
        r={nodeRadius}
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={2}
        style={{
          cursor: isClickable ? 'pointer' : 'default',
          transition: 'all 0.3s ease'
        }}
        onClick={(e) => {
          e.stopPropagation();
          console.log('Circle clicked, path:', nodePath);
          if (isClickable && onNodeClick) {
            onNodeClick({ data: nodeDatum, attributes: nodeDatum.attributes }, e);
          }
        }}
        onMouseEnter={(e) => {
          if (isClickable && !isCurrent) {
            e.target.setAttribute('stroke', '#737373');
            e.target.setAttribute('fill', '#e5e5e5');
          }
        }}
        onMouseLeave={(e) => {
          if (isClickable && !isCurrent) {
            e.target.setAttribute('stroke', strokeColor);
            e.target.setAttribute('fill', fillColor);
          }
        }}
      />
      
      {/* Current page indicator */}
      {isCurrent && (
        <circle
          r={nodeRadius + 3}
          fill="none"
          stroke="#000000"
          strokeWidth={1}
          strokeDasharray="2,2"
          style={{ animation: 'pulse 2s infinite' }}
        />
      )}
      
      {/* Icon inside the node */}
      {IconComponent && (
        <foreignObject
          x={-6}
          y={-6}
          width={12}
          height={12}
          style={{ pointerEvents: 'none' }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            color: textColor
          }}>
            <IconComponent style={{ fontSize: '8px' }} />
          </div>
        </foreignObject>
      )}
      
      {/* Label */}
      <g className="rd3t-label">
        <text
          className="rd3t-label__title"
          textAnchor={nodeDatum.name === 'Projects' ? 'middle' : 'start'}
          x={nodeDatum.name === 'Projects' ? 0 : nodeRadius + 10}
          y={nodeDatum.name === 'Projects' ? -(nodeRadius + 8) : 4}
          style={{
            fontSize: isRoot ? '12px' : '10px',
            fontWeight: '400',
            fill: textColor,
            fontFamily: 'system-ui, -apple-system, sans-serif',
            cursor: isClickable ? 'pointer' : 'default',
            letterSpacing: '0.025em'
          }}
          onClick={(e) => {
            e.stopPropagation();
            console.log('Text clicked, path:', nodePath);
            if (isClickable && onNodeClick) {
              onNodeClick({ data: nodeDatum, attributes: nodeDatum.attributes }, e);
            }
          }}
        >
          {nodeDatum.name}
        </text>
      </g>
    </>
  );
};

// Portfolio D3 Tree Component
const PortfolioD3Tree = ({ visitedPages, currentPath, pageScrollProgress, onNavigate, onClose }) => {
  const [treeData, setTreeData] = useState(() => 
    createPortfolioTreeData(SITE_STRUCTURE, visitedPages, currentPath)
  );

  // Update tree data when visited pages or current path changes
  useEffect(() => {
    setTreeData(createPortfolioTreeData(SITE_STRUCTURE, visitedPages, currentPath));
  }, [visitedPages, currentPath]);

  // Handle node clicks for navigation
  const handleNodeClick = useCallback((nodeDatum, evt) => {
    // Prevent default behavior
    evt?.preventDefault?.();
    evt?.stopPropagation?.();
    
    // Debug: log the nodeDatum to see its structure
    console.log('Clicked nodeDatum:', nodeDatum);
    console.log('Full data object:', nodeDatum.data);

    // Try all possible locations for the path
    const path = 
      nodeDatum.data?.attributes?.path ||
      nodeDatum.attributes?.path ||
      nodeDatum.data?.attributes?.href ||
      nodeDatum.attributes?.href ||
      nodeDatum.path;

    console.log('Extracted path:', path, 'Current path:', currentPath);

    if (!path) {
      console.log('No path found in node data');
      return;
    }

    if (path === currentPath) {
      console.log('Same page, not navigating');
      return;
    }

    console.log('Navigating to:', path); // Debug log
    onNavigate(path);
    onClose();
  }, [currentPath, onNavigate, onClose]);

  // Handle surface clicks for ripple effect
  const handleSurfaceClick = useCallback((evt) => {
    const container = evt.currentTarget;
    const rect = container.getBoundingClientRect();
    const x = evt.clientX - rect.left;
    const y = evt.clientY - rect.top;

    // Create ripple effect
    const ripple = document.createElement('div');
    ripple.className = 'click-ripple';
    ripple.style.width = '20px';
    ripple.style.height = '20px';
    ripple.style.left = (x - 10) + 'px';
    ripple.style.top = (y - 10) + 'px';
    
    container.appendChild(ripple);
    
    // Add surface click animation
    container.classList.add('map-surface-click');
    
    // Clean up after animation
    setTimeout(() => {
      if (container.contains(ripple)) {
        container.removeChild(ripple);
      }
      container.classList.remove('map-surface-click');
    }, 600);
  }, []);

  // Custom path styling based on visited status
  const pathClassFunc = (linkDatum) => {
    const targetVisited = linkDatum.target.data.attributes?.visited;
    const targetCurrent = linkDatum.target.data.attributes?.current;
    
    if (targetCurrent) return 'link-current';
    return targetVisited ? 'link-visited' : 'link-unvisited';
  };

  return (
    <div 
      style={{ width: '100%', height: '100%', position: 'relative' }}
      onClick={handleSurfaceClick}
    >
      <style>{`
        .rd3t-tree-container {
          background: transparent !important;
          cursor: grab;
          transition: all 0.2s ease;
        }
        
        .rd3t-tree-container:active {
          cursor: grabbing;
        }
        
        .rd3t-tree-container svg {
          background: transparent !important;
          transition: filter 0.2s ease;
        }
        
        .rd3t-tree-container:active svg {
          filter: brightness(0.95);
        }
        
        .link-current {
          stroke: #000000 !important;
          stroke-width: 2px !important;
          stroke-dasharray: none !important;
          transition: all 0.2s ease;
        }
        
        .link-visited {
          stroke: #a3a3a3 !important;
          stroke-width: 1.5px !important;
          stroke-dasharray: none !important;
          transition: all 0.2s ease;
        }
        
        .link-unvisited {
          stroke: #d4d4d8 !important;
          stroke-width: 1px !important;
          stroke-dasharray: 3,3 !important;
          opacity: 0.7;
          transition: all 0.2s ease;
        }
        
        .rd3t-label__title {
          user-select: none;
          font-family: 'system-ui', '-apple-system', 'sans-serif' !important;
          transition: all 0.2s ease;
        }
        
        /* Node hover effects */
        .rd3t-node circle {
          transition: all 0.2s ease;
        }
        
        .rd3t-node:hover circle {
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
        }
        
        /* Click ripple effect */
        @keyframes ripple {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(4);
            opacity: 0;
          }
        }
        
        .click-ripple {
          position: absolute;
          border-radius: 50%;
          background-color: rgba(0, 0, 0, 0.1);
          transform: scale(0);
          animation: ripple 0.6s linear;
          pointer-events: none;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        
        /* Surface click feedback */
        .map-surface-click {
          animation: surface-click 0.1s ease;
        }
        
        @keyframes surface-click {
          0% { transform: scale(1); }
          50% { transform: scale(0.998); }
          100% { transform: scale(1); }
        }
        
        /* Modal animations */
        .modal-backdrop {
          animation: fadeIn 0.3s ease-out;
        }
        
        .modal-backdrop-closing {
          animation: fadeOut 0.3s ease-out;
        }
        
        .modal-container {
          animation: modalSlideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .modal-container-closing {
          animation: modalSlideOut 0.3s cubic-bezier(0.4, 0, 0.6, 1);
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        
        @keyframes modalSlideIn {
          from { 
            opacity: 0;
            transform: scale(0.95) translateY(20px);
          }
          to { 
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        @keyframes modalSlideOut {
          from { 
            opacity: 1;
            transform: scale(1) translateY(0);
          }
          to { 
            opacity: 0;
            transform: scale(0.95) translateY(-20px);
          }
        }
      `}</style>
      
      <Tree
        data={treeData}
        orientation="horizontal"
        pathFunc="elbow"
        pathClassFunc={pathClassFunc}
        translate={{ x: 150, y: 220 }}
        nodeSize={{ x: 160, y: 60 }}
        separation={{ siblings: 1.0, nonSiblings: 1.2 }}
        renderCustomNodeElement={(props) => renderCustomNodeElement({...props, pageScrollProgress, onNodeClick: handleNodeClick})}
        onNodeClick={handleNodeClick}
        collapsible={false}
        zoomable={true}
        draggable={true}
        scaleExtent={{ min: 0.6, max: 2 }}
        enableLegacyTransitions={false}
        transitionDuration={400}
        zoom={1.3}
        initialDepth={2}
      />
    </div>
  );
};

// Main Portfolio Map Component - Completely Self-Contained
const PortfolioMap = () => {
  const router = useRouter();
  const pathname = usePathname();
  
  // Component's own state management
  const [showExplorationMap, setShowExplorationMap] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [visitedPages, setVisitedPages] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolioVisitedPages');
      return saved ? new Set(JSON.parse(saved)) : new Set(['/']);
    }
    return new Set(['/']);
  });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [pageScrollProgress, setPageScrollProgress] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolioPageScrollProgress');
      return saved ? JSON.parse(saved) : {};
    }
    return {};
  });

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = Math.min(100, (currentScroll / totalHeight) * 100);
      setScrollProgress(progress);
      
      // Save page-specific scroll progress
      setPageScrollProgress(prev => {
        const updated = { ...prev, [pathname]: Math.round(progress) };
        if (typeof window !== 'undefined') {
          localStorage.setItem('portfolioPageScrollProgress', JSON.stringify(updated));
        }
        return updated;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  // Track current page visit
  useEffect(() => {
    setVisitedPages(prev => {
      const newSet = new Set(prev);
      newSet.add(pathname);
      return newSet;
    });
  }, [pathname]);

  // Persist visited pages to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolioVisitedPages', JSON.stringify([...visitedPages]));
    }
  }, [visitedPages]);

  // Handle smooth modal close
  const handleCloseModal = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setShowExplorationMap(false);
      setIsClosing(false);
    }, 300); // Match the animation duration
  }, []);

  // Handle navigation
  const handleNavigate = useCallback((path) => {
    setVisitedPages(prev => {
      const newSet = new Set(prev);
      newSet.add(path);
      return newSet;
    });
    router.push(path);
  }, [router]);

  // Calculate exploration progress
  const getExplorationProgress = useCallback(() => {
    const getAllPaths = (node, paths = []) => {
      paths.push(node.path);
      if (node.children) {
        node.children.forEach(child => getAllPaths(child, paths));
      }
      return paths;
    };
    
    const allPaths = getAllPaths(SITE_STRUCTURE);
    const visitedCount = allPaths.filter(path => visitedPages.has(path)).length;
    return Math.round((visitedCount / allPaths.length) * 100);
  }, [visitedPages]);

  // Get unexplored areas
  const getUnexploredAreas = useCallback(() => {
    const getAllNodes = (node, nodes = []) => {
      nodes.push(node);
      if (node.children) {
        node.children.forEach(child => getAllNodes(child, nodes));
      }
      return nodes;
    };
    
    const allNodes = getAllNodes(SITE_STRUCTURE);
    return allNodes.filter(node => !visitedPages.has(node.path));
  }, [visitedPages]);

  const explorationProgress = getExplorationProgress();
  const unexploredCount = getUnexploredAreas().length;

  return (
    <>
      {/* Fixed Top-Right Explorer Button */}
      <div className="fixed top-6 right-6 z-[9999]">
        <button
          onClick={() => setShowExplorationMap(prev => !prev)}
          className="group relative w-12 h-12 bg-white/80 backdrop-blur-xl rounded-full shadow-lg hover:shadow-xl transition-all duration-500 flex items-center justify-center border border-white/20 hover:scale-110 hover:bg-white/90"
          aria-label="Toggle Portfolio Map"
        >
          {/* Map Icon */}
          <svg 
            className="w-5 h-5 text-gray-600 group-hover:text-gray-800 transition-all duration-300" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7" 
            />
          </svg>
          
          {/* Progress Ring - Shows scroll progress */}
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke="rgb(226 232 240)"
              strokeWidth="1"
              className="opacity-20"
            />
            <circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke="rgb(55 65 81)"
              strokeWidth="2"
              strokeDasharray={`${(scrollProgress / 100) * 276} 276`}
              className="transition-all duration-300 ease-out"
              strokeLinecap="round"
            />
          </svg>

          {/* Notification Dot for unexplored areas */}
          {unexploredCount > 0 && (
            <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-gray-700 rounded-full border border-white animate-pulse"></div>
          )}
        </button>
      </div>      {/* Exploration Map Modal */}
      {showExplorationMap && (
        <div className={`fixed inset-0 z-[99999] flex items-center justify-center p-4 modal-backdrop ${isClosing ? 'modal-backdrop-closing' : ''}`}
             style={{
               background: 'rgba(231, 223, 216, 0.85)',
               backdropFilter: 'blur(0.5px)'
               
             }}
             onClick={(e) => {
               // Close modal when clicking backdrop
               if (e.target === e.currentTarget) {
                 handleCloseModal();
               }
             }}>
          {/* Modern Tech Interface Container */}
          <div className={`relative max-w-4xl w-full max-h-[80vh] flex flex-col overflow-hidden shadow-2xl border border-neutral-800 modal-container ${isClosing ? 'modal-container-closing' : ''}`}
               style={{
                 background: 'linear-gradient(145deg, #fafaf9 0%, #f5f5f4 50%, #e7e5e4 100%)',
                 borderRadius: '4px'
               }}
               onClick={(e) => e.stopPropagation()}>
            
            {/* Subtle tech grid overlay */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
                 style={{
                   backgroundImage: `
                     linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                     linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
                   `,
                   backgroundSize: '20px 20px'
                 }}>
            </div>

            {/* Corner accent lines */}
            <div className="absolute top-0 left-0 w-8 h-8">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-black"></div>
              <div className="absolute top-0 left-0 w-[1px] h-full bg-black"></div>
            </div>
            <div className="absolute top-0 right-0 w-8 h-8">
              <div className="absolute top-0 right-0 w-full h-[1px] bg-black"></div>
              <div className="absolute top-0 right-0 w-[1px] h-full bg-black"></div>
            </div>
            <div className="absolute bottom-0 left-0 w-8 h-8">
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-black"></div>
              <div className="absolute bottom-0 left-0 w-[1px] h-full bg-black"></div>
            </div>
            <div className="absolute bottom-0 right-0 w-8 h-8">
              <div className="absolute bottom-0 right-0 w-full h-[1px] bg-black"></div>
              <div className="absolute bottom-0 right-0 w-[1px] h-full bg-black"></div>
            </div>

            {/* Header */}
            <div className="relative flex justify-between items-center p-6 border-b border-neutral-300"
                 style={{ background: 'linear-gradient(180deg, #fafaf9 0%, #f5f5f4 100%)' }}>
              <div>
                <h2 className="text-2xl font-light text-black tracking-wide" 
                    style={{ fontFamily: 'system-ui, -apple-system, sans-serif', letterSpacing: '0.05em' }}>
                  SITE.MAP
                </h2>
                <p className="text-neutral-600 mt-1 text-sm font-mono">
                  PORTFOLIO.EXPLORER • {explorationProgress}% DISCOVERED
                </p>
              </div>
              <button
                onClick={handleCloseModal}
                className="text-neutral-400 hover:text-black text-xl font-light 
                           w-8 h-8 flex items-center justify-center 
                           hover:bg-neutral-100 transition-all duration-200 border border-transparent hover:border-neutral-300"
                aria-label="Close interface"
                style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
              >
                ×
              </button>
            </div>

            {/* Tree Map Content - Reduced size with proper centering */}
            <div className="flex-1 relative overflow-hidden bg-white" style={{ minHeight: '450px' }}>
              <div className="absolute inset-0 p-6">
                <PortfolioD3Tree
                  visitedPages={visitedPages}
                  currentPath={pathname}
                  pageScrollProgress={pageScrollProgress}
                  onNavigate={handleNavigate}
                  onClose={handleCloseModal}
                />
              </div>
            </div>

            {/* Footer with Legend and Stats */}
            <div className="relative p-4 border-t border-neutral-300 bg-neutral-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-8 text-xs text-neutral-700 font-mono uppercase tracking-wider">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-black"></div>
                    <span>ACTIVE</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-neutral-400"></div>
                    <span>VISITED</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 border border-neutral-300 bg-white"></div>
                    <span>PENDING</span>
                  </div>
                </div>
                <div className="text-xs text-neutral-600 font-mono uppercase tracking-wider">
                  {unexploredCount > 0 ? (
                    <span>{unexploredCount} NODES.REMAINING</span>
                  ) : (
                    <span className="text-black">SYSTEM.COMPLETE</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PortfolioMap;
