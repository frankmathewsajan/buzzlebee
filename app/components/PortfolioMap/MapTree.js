'use client';

import { useCallback, useMemo } from 'react';
import Tree from 'react-d3-tree';
import {
  FaAward,
  FaChartBar,
  FaExclamationCircle,
  FaFileAlt,
  FaHome,
  FaLink,
  FaPen,
  FaTools,
  FaUser
} from 'react-icons/fa';
import { SITE_STRUCTURE } from '@/data/navigation/site-structure';
import styles from '@/app/components/PortfolioMap/Map.module.css';

const ICON_MAP = {
  FaAward,
  FaChartBar,
  FaFileAlt,
  FaHome,
  FaLink,
  FaPen,
  FaTools,
  FaUser
};

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

function CustomNodeElement({ nodeDatum, onNodeClick }) {
  const IconComponent = ICON_MAP[nodeDatum.attributes?.icon];
  const isVisited = nodeDatum.attributes?.visited;
  const isCurrent = nodeDatum.attributes?.current;
  const isClickable = nodeDatum.attributes?.href;

  const isRoot = nodeDatum.attributes?.path === '/';
  const nodeRadius = isRoot ? 18 : 15;

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

  const triggerNodeClick = (event) => {
    event.stopPropagation();
    if (isClickable && onNodeClick) {
      onNodeClick({ data: nodeDatum, attributes: nodeDatum.attributes }, event);
    }
  };

  return (
    <>
      <circle
        r={nodeRadius}
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={2}
        style={{
          cursor: isClickable ? 'pointer' : 'default',
          transition: 'all 0.3s ease'
        }}
        onClick={triggerNodeClick}
        onMouseEnter={(event) => {
          if (isClickable && !isCurrent) {
            event.target.setAttribute('stroke', '#737373');
            event.target.setAttribute('fill', '#e5e5e5');
          }
        }}
        onMouseLeave={(event) => {
          if (isClickable && !isCurrent) {
            event.target.setAttribute('stroke', strokeColor);
            event.target.setAttribute('fill', fillColor);
          }
        }}
      />

      {isCurrent && (
        <circle
          r={nodeRadius + 3}
          fill="none"
          stroke="#000000"
          strokeWidth={1}
          strokeDasharray="2,2"
          className={styles.pulseRing}
        />
      )}

      {!isCurrent && !isVisited && (
        <foreignObject x={nodeRadius - 7} y={-nodeRadius + 1} width={12} height={12} style={{ pointerEvents: 'none' }}>
          <div className={styles.unvisitedBadge} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
            <FaExclamationCircle style={{ fontSize: '10px', color: '#ef4444' }} />
          </div>
        </foreignObject>
      )}

      {IconComponent && (
        <foreignObject
          x={-6}
          y={-6}
          width={12}
          height={12}
          style={{ pointerEvents: 'none' }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
              color: textColor
            }}
          >
            <IconComponent style={{ fontSize: '8px' }} />
          </div>
        </foreignObject>
      )}

      <g className="rd3t-label">
        <text
          className="rd3t-label__title"
          textAnchor="start"
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
          onClick={triggerNodeClick}
        >
          {nodeDatum.name}
        </text>
      </g>
    </>
  );
}

export default function MapTree({ visitedPages, currentPath, onNodeClick }) {
  const treeData = useMemo(
    () => createPortfolioTreeData(SITE_STRUCTURE, visitedPages, currentPath),
    [visitedPages, currentPath],
  );

  const handleNodeClick = useCallback((nodeDatum, event) => {
    if (onNodeClick) {
      onNodeClick(nodeDatum, event);
    }
  }, [onNodeClick]);

  const handleSurfaceClick = useCallback((event) => {
    const container = event.currentTarget;
    const rect = container.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const ripple = document.createElement('div');
    ripple.className = styles.clickRipple;
    ripple.style.width = '20px';
    ripple.style.height = '20px';
    ripple.style.left = `${x - 10}px`;
    ripple.style.top = `${y - 10}px`;

    container.appendChild(ripple);
    container.classList.add(styles.mapSurfaceClick);

    window.setTimeout(() => {
      if (container.contains(ripple)) {
        container.removeChild(ripple);
      }
      container.classList.remove(styles.mapSurfaceClick);
    }, 600);
  }, []);

  const pathClassFunc = useCallback((linkDatum) => {
    const sourceCurrent = linkDatum.source.data.attributes?.current;
    const targetCurrent = linkDatum.target.data.attributes?.current;
    const sourceVisited = linkDatum.source.data.attributes?.visited;
    const targetVisited = linkDatum.target.data.attributes?.visited;

    if (sourceCurrent || targetCurrent) {
      return styles.linkCurrent;
    }

    if (targetVisited) {
      return styles.linkCompleted;
    }

    if (sourceVisited || targetVisited) {
      return styles.linkDiscovered;
    }

    return styles.linkUnvisited;
  }, []);

  return (
    <div className={styles.mapSurface} onClick={handleSurfaceClick}>
      <Tree
        data={treeData}
        orientation="horizontal"
        pathFunc="elbow"
        pathClassFunc={pathClassFunc}
        translate={{ x: 150, y: 220 }}
        nodeSize={{ x: 160, y: 60 }}
        separation={{ siblings: 1.0, nonSiblings: 1.2 }}
        renderCustomNodeElement={(props) => (
          <CustomNodeElement
            {...props}
            onNodeClick={handleNodeClick}
          />
        )}
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
}