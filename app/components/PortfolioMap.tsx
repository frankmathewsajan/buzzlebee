"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { 
  FaHome, 
  FaUser, 
  FaTools, 
  FaPen, 
  FaAward, 
  FaChartBar, 
  FaBriefcase,
  FaLink,
  FaFileAlt
} from "react-icons/fa";
import Tree from "react-d3-tree";
import ExternalLinkModal from "./ExternalLinkModal";
import type { SiteNode } from "../../types";

const SITE_STRUCTURE: SiteNode = {
  name: "Portfolio",
  path: "/",
  icon: "FaHome",
  children: [
    {
      name: "About",
      path: "/about",
      icon: "FaUser",
      children: [
        {
          name: "Blog",
          path: "/blogs",
          icon: "FaPen",
          external: true,
          externalUrl: "https://medium.com/@frankmathewsajan"
        },
        {
          name: "Resume",
          path: "/resume",
          icon: "FaFileAlt"
        }
      ]
    },
    {
      name: "Projects",
      path: "/projects",
      icon: "FaTools",
      children: [
        {
          name: "Case Studies",
          path: "/case-studies",
          icon: "FaChartBar"
        },
        {
          name: "Certifications",
          path: "/certifications",
          icon: "FaAward"
        }
      ]
    }
  ]
};

const iconMap = {
  FaHome,
  FaUser,
  FaTools,
  FaPen,
  FaAward,
  FaChartBar,
  FaBriefcase,
  FaLink,
  FaFileAlt
} as const;

interface PortfolioMapProps {
  onClose?: () => void;
  autoOpen?: boolean;
  onExternalLinkModal?: (isOpen: boolean, url?: string) => void;
  disableInternalExternalModal?: boolean;
}

const createTreeData = (node: SiteNode, visitedPages: Set<string>, currentPath: string): any => {
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
    children: node.children?.map(child => createTreeData(child, visitedPages, currentPath))
  };
};

const CustomNode = ({ 
  nodeDatum, 
  onNodeClick 
}: { 
  nodeDatum: any; 
  onNodeClick: (node: any) => void;
}) => {
  const Icon = iconMap[nodeDatum.attributes.icon as keyof typeof iconMap];
  const isVisited = nodeDatum.attributes.visited;
  const isCurrent = nodeDatum.attributes.current;
  const isExternal = nodeDatum.attributes.external;

  return (
    <g>
      <circle
        r="20"
        fill={isCurrent ? "#3b82f6" : isVisited ? "#10b981" : "#6b7280"}
        stroke="#ffffff"
        strokeWidth="2"
        className="cursor-pointer transition-all duration-200 hover:r-25"
        onClick={() => onNodeClick(nodeDatum)}
      />
      {Icon && (
        <foreignObject x="-8" y="-8" width="16" height="16">
          <Icon 
            className="w-4 h-4 text-white pointer-events-none" 
            style={{ fontSize: "16px" }}
          />
        </foreignObject>
      )}
      <text
        x="0"
        y="35"
        textAnchor="middle"
        className="fill-gray-700 text-sm font-medium pointer-events-none"
      >
        {nodeDatum.name}
        {isExternal && (
          <tspan x="0" dy="15" className="fill-blue-500 text-xs">
            <FaLink className="w-3 h-3" />
          </tspan>
        )}
      </text>
    </g>
  );
};

export default function PortfolioMap({ 
  onClose = null, 
  autoOpen = false, 
  onExternalLinkModal = null,
  disableInternalExternalModal = false
}: PortfolioMapProps) {
  const router = useRouter();
  const pathname = usePathname();
  
  const [showMap, setShowMap] = useState(autoOpen);
  const [showExternalModal, setShowExternalModal] = useState(false);
  const [externalUrl, setExternalUrl] = useState("");
  const [visitedPages, setVisitedPages] = useState<Set<string>>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("portfolioVisitedPages");
      return saved ? new Set(JSON.parse(saved)) : new Set(["/"]);
    }
    return new Set(["/"]);
  });

  // Track current page visit
  useEffect(() => {
    if (pathname) {
      setVisitedPages(prev => {
        const newSet = new Set(prev);
        newSet.add(pathname);
        if (typeof window !== "undefined") {
          localStorage.setItem("portfolioVisitedPages", JSON.stringify([...newSet]));
        }
        return newSet;
      });
    }
  }, [pathname]);

  const handleCloseModal = useCallback(() => {
    setShowMap(false);
    setTimeout(() => {
      if (onClose) onClose();
    }, 300);
  }, [onClose]);

  const handleExternalLink = useCallback((url: string) => {
    if (disableInternalExternalModal && onExternalLinkModal) {
      onExternalLinkModal(true, url);
    } else {
      setExternalUrl(url);
      setShowExternalModal(true);
    }
    handleCloseModal();
  }, [disableInternalExternalModal, onExternalLinkModal, handleCloseModal]);

  const handleNavigate = useCallback((path: string) => {
    setVisitedPages(prev => {
      const newSet = new Set(prev);
      newSet.add(path);
      return newSet;
    });
    router.push(path);
  }, [router]);

  const handleNodeClick = useCallback((nodeDatum: any) => {
    const isExternal = nodeDatum.attributes?.external;
    const externalUrl = nodeDatum.attributes?.externalUrl;
    
    if (isExternal && externalUrl) {
      handleExternalLink(externalUrl);
      return;
    }

    const path = nodeDatum.attributes?.path || nodeDatum.path;
    if (path) {
      handleNavigate(path);
      handleCloseModal();
    }
  }, [handleExternalLink, handleNavigate, handleCloseModal]);

  const treeData = createTreeData(SITE_STRUCTURE, visitedPages, pathname);

  if (!showMap) {
    return (
      <div className="fixed top-1/2 right-6 transform -translate-y-1/2 z-50">
        <button
          onClick={() => setShowMap(true)}
          className="w-14 h-14 bg-white/90 backdrop-blur-sm border border-white/50 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center group"
          title="Open Portfolio Map"
        >
          <svg 
            className="w-6 h-6 text-gray-600 group-hover:text-gray-800" 
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
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleCloseModal} />
        
        <div className="relative bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl w-[90vw] h-[80vh] max-w-4xl max-h-[600px] overflow-hidden border border-white/50">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Portfolio Map</h2>
              <p className="text-gray-600 text-sm">Navigate through my portfolio</p>
            </div>
            <button
              onClick={handleCloseModal}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Tree Visualization */}
          <div className="flex-1 p-6">
            <div className="w-full h-full">
              <Tree
                data={treeData}
                orientation="vertical"
                pathFunc="elbow"
                translate={{ x: 200, y: 100 }}
                separation={{ siblings: 2, nonSiblings: 2 }}
                nodeSize={{ x: 200, y: 100 }}
                renderCustomNodeElement={(nodeProps) => (
                  <CustomNode {...nodeProps} onNodeClick={handleNodeClick} />
                )}
                zoomable={true}
                draggable={true}
                zoom={0.8}
              />
            </div>
          </div>

          {/* Legend */}
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50/50">
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                <span>Current Page</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                <span>Visited</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-gray-500"></div>
                <span>Not Visited</span>
              </div>
              <div className="flex items-center gap-2">
                <FaLink className="w-3 h-3 text-blue-500" />
                <span>External Link</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Internal External Link Modal */}
      {!disableInternalExternalModal && showExternalModal && (
        <ExternalLinkModal
          isOpen={showExternalModal}
          onClose={() => {
            setShowExternalModal(false);
            if (onExternalLinkModal) {
              onExternalLinkModal(false);
            }
          }}
          targetUrl={externalUrl}
          siteName="Medium Blog"
        />
      )}
    </>
  );
}
