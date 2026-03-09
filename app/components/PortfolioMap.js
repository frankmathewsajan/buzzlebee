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
  FaBriefcase,
  FaBroom,
  FaLink,
  FaFileAlt
} from 'react-icons/fa';
import Tree from 'react-d3-tree';
import ExternalLinkModal from './ExternalLinkModal';
import ModalFrame from './ModalFrame';

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
          icon: 'FaPen',
          external: true,
          externalUrl: 'https://medium.com/@frankmathewsajan'
        },
        {
          name: 'Resume',
          path: '/resume',
          icon: 'FaFileAlt'
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
        },
        {
          name: 'Certifications',
          path: '/certifications',
          icon: 'FaAward'
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
        href: node.path,
        external: node.external || false,
        externalUrl: node.externalUrl
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
    'FaBriefcase': FaBriefcase,
    'FaLink': FaLink,
    'FaFileAlt': FaFileAlt
  };

  const IconComponent = iconMap[nodeDatum.attributes?.icon];
  const isVisited = nodeDatum.attributes?.visited;
  const isCurrent = nodeDatum.attributes?.current;
  const isClickable = nodeDatum.attributes?.href;
  const isExternal = nodeDatum.attributes?.external;
  const externalUrl = nodeDatum.attributes?.externalUrl;
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
          textAnchor='start'
          x={nodeRadius + 10}
          y={4}
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
const PortfolioD3Tree = ({ visitedPages, currentPath, pageScrollProgress, onNodeClick, onClose }) => {
  const [treeData, setTreeData] = useState(() =>
    createPortfolioTreeData(SITE_STRUCTURE, visitedPages, currentPath)
  );

  // Update tree data when visited pages or current path changes
  useEffect(() => {
    setTreeData(createPortfolioTreeData(SITE_STRUCTURE, visitedPages, currentPath));
  }, [visitedPages, currentPath]);

  // Handle node clicks for navigation
  const handleNodeClick = useCallback((nodeDatum, evt) => {
    // Pass through to the parent handler
    if (onNodeClick) {
      onNodeClick(nodeDatum, evt);
    }
  }, [onNodeClick]);

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
      `}</style>

      <Tree
        data={treeData}
        orientation="horizontal"
        pathFunc="elbow"
        pathClassFunc={pathClassFunc}
        translate={{ x: 150, y: 220 }}
        nodeSize={{ x: 160, y: 60 }}
        separation={{ siblings: 1.0, nonSiblings: 1.2 }}
        renderCustomNodeElement={(props) => renderCustomNodeElement({ ...props, pageScrollProgress, onNodeClick: handleNodeClick })}
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
const PortfolioMap = ({
  onClose: externalOnClose = null,
  autoOpen = false,
  onExternalLinkModal = null,
  disableInternalExternalModal = false
}) => {
  const router = useRouter();
  const pathname = usePathname();

  // Component's own state management
  const [showExplorationMap, setShowExplorationMap] = useState(autoOpen);
  const [isClosing, setIsClosing] = useState(false);
  const [showExternalLinkModal, setShowExternalLinkModal] = useState(false);
  const [externalLinkUrl, setExternalLinkUrl] = useState('');
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

  // Track current page visit - Enhanced to handle direct visits
  useEffect(() => {
    // Add current page to visited pages immediately on component mount
    setVisitedPages(prev => {
      const newSet = new Set(prev);
      newSet.add(pathname);

      // Also save to localStorage immediately for direct visits
      if (typeof window !== 'undefined') {
        localStorage.setItem('portfolioVisitedPages', JSON.stringify([...newSet]));
      }

      return newSet;
    });
  }, [pathname]);

  // Lock body scroll when map is open
  useEffect(() => {
    if (showExplorationMap) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showExplorationMap]);

  // Track scroll progress and save page-specific progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = totalHeight > 0 ? Math.min(100, (currentScroll / totalHeight) * 100) : 0;
      setScrollProgress(progress);

      // Save page-specific scroll progress with debouncing
      setPageScrollProgress(prev => {
        const updated = { ...prev, [pathname]: Math.round(progress) };

        // Debounced localStorage save
        if (typeof window !== 'undefined') {
          clearTimeout(window.portfolioScrollTimer);
          window.portfolioScrollTimer = setTimeout(() => {
            localStorage.setItem('portfolioPageScrollProgress', JSON.stringify(updated));
          }, 100);
        }

        return updated;
      });
    };

    // Initial call to capture page state
    setTimeout(handleScroll, 100);

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (typeof window !== 'undefined' && window.portfolioScrollTimer) {
        clearTimeout(window.portfolioScrollTimer);
      }
    };
  }, [pathname]);

  // Persist visited pages to localStorage - Remove this duplicate effect since we handle it above
  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     localStorage.setItem('portfolioVisitedPages', JSON.stringify([...visitedPages]));
  //   }
  // }, [visitedPages]);

  // Handle smooth modal close
  const handleCloseModal = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setShowExplorationMap(false);
      setIsClosing(false);
      // Call external onClose if provided (for resume page modal)
      if (externalOnClose) {
        externalOnClose();
      }
    }, 300); // Match the animation duration
  }, [externalOnClose]);

  // Handle navigation
  const handleNavigate = useCallback((path) => {
    setVisitedPages(prev => {
      const newSet = new Set(prev);
      newSet.add(path);
      return newSet;
    });

    router.push(path);
  }, [router]);

  // Handle external link confirmation
  const handleExternalLink = useCallback((url) => {
    if (disableInternalExternalModal && onExternalLinkModal) {
      onExternalLinkModal(true, url);
    } else {
      setExternalLinkUrl(url);
      setShowExternalLinkModal(true);
    }

    // Auto-close the portfolio map when external link modal opens
    handleCloseModal();
  }, [handleCloseModal, onExternalLinkModal, disableInternalExternalModal]);

  // Handle node clicks - either navigate or show external modal
  const handleNodeClick = useCallback((nodeDatum, evt) => {
    evt?.preventDefault?.();
    evt?.stopPropagation?.();

    const isExternal = nodeDatum.data?.attributes?.external || nodeDatum.attributes?.external;
    const externalUrl = nodeDatum.data?.attributes?.externalUrl || nodeDatum.attributes?.externalUrl;

    if (isExternal && externalUrl) {
      handleExternalLink(externalUrl);
      return;
    }

    // Regular navigation
    const path =
      nodeDatum.data?.attributes?.path ||
      nodeDatum.attributes?.path ||
      nodeDatum.data?.attributes?.href ||
      nodeDatum.attributes?.href ||
      nodeDatum.path;

    if (!path) {
      return;
    }

    if (path === pathname) {
      return;
    }

    handleNavigate(path);
    handleCloseModal();
  }, [pathname, handleNavigate, handleExternalLink, handleCloseModal]);

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
      <div className="fixed top-6 right-6" style={{ zIndex: 9999 }}>
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
      </div>

      {/* Exploration Map Modal */}
      {showExplorationMap && (
        <div className={`fixed inset-0 flex items-center justify-center p-4 transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}
          style={{
            background: 'rgba(231, 223, 216, 0.85)',
            backdropFilter: 'blur(0.5px)',
            zIndex: 99999,

          }}
          onClick={(e) => {
            // Close modal when clicking backdrop
            if (e.target === e.currentTarget) {
              handleCloseModal();
            }
          }}>
          <ModalFrame
            title="SITE.MAP"
            subtitle={`PORTFOLIO.EXPLORER • ${explorationProgress}% DISCOVERED`}
            onClose={handleCloseModal}
            closeLabel="Close interface"
            widthClassName="max-w-4xl"
            panelClassName="max-h-[80vh]"
            bodyClassName="p-0"
            animate={isClosing ? { opacity: 0, scale: 0.95, y: -20 } : { opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            footerClassName="relative p-1 border-t border-neutral-300 bg-neutral-50"
            footer={(
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6 ms-6 text-xs text-neutral-700 font-mono uppercase tracking-wider">
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
                <div className="flex items-center gap-4">
                  <div className="text-xs text-neutral-600 font-mono uppercase tracking-wider">
                    {unexploredCount > 0 ? (
                      <span>{unexploredCount} NODES.REMAINING</span>
                    ) : (
                      <span className="text-black">SYSTEM.COMPLETE</span>
                    )}
                  </div>
                  {/* Clear Progress Button */}
                  <button
                    onClick={() => {
                      if (typeof window !== 'undefined') {
                        localStorage.removeItem('portfolioVisitedPages');
                        localStorage.removeItem('portfolioPageScrollProgress');
                        setVisitedPages(new Set([pathname]));
                        setPageScrollProgress({});
                      }
                    }}
                    className="group flex items-center gap-2 px-3 py-1.5 text-xs text-neutral-600 hover:text-neutral-900 font-mono uppercase tracking-wider transition-all duration-200 hover:bg-neutral-100 rounded border border-neutral-300 hover:border-neutral-400"
                    title="Clear all progress data"
                  >
                    <FaBroom className="w-3 h-3 group-hover:rotate-12 transition-transform duration-200" />
                    CLEAR
                  </button>
                </div>
              </div>
            )}
          >
            <div className="flex-1 relative overflow-hidden bg-white" style={{ minHeight: '450px' }}>
              <div className="absolute inset-0 p-6">
                <PortfolioD3Tree
                  visitedPages={visitedPages}
                  currentPath={pathname}
                  pageScrollProgress={pageScrollProgress}
                  onNodeClick={handleNodeClick}
                  onClose={handleCloseModal}
                />
              </div>
            </div>
          </ModalFrame>
        </div>
      )}

      {/* External Link Modal - only render if not disabled */}
      {!disableInternalExternalModal && showExternalLinkModal && (
        <ExternalLinkModal
          isOpen={showExternalLinkModal}
          onClose={() => {
            setShowExternalLinkModal(false);
            if (onExternalLinkModal) {
              onExternalLinkModal(false);
            }
          }}
          targetUrl={externalLinkUrl}
        />
      )}
    </>
  );
};

export default PortfolioMap;
