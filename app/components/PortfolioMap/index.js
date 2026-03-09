'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { FaBroom } from 'react-icons/fa';
import ExternalLinkModal from '@/app/components/ExternalLinkModal';
import ModalFrame from '@/app/components/ModalFrame';
import MapTree from '@/app/components/PortfolioMap/MapTree';
import usePortfolioTracker from '@/app/hooks/usePortfolioTracker';
import { SITE_STRUCTURE } from '@/data/navigation/site-structure';

const getAllPaths = (node, paths = []) => {
  if (!node.external) {
    paths.push(node.path);
  }

  if (node.children) {
    node.children.forEach((child) => getAllPaths(child, paths));
  }
  return paths;
};

const getAllNodes = (node, nodes = []) => {
  if (!node.external) {
    nodes.push(node);
  }

  if (node.children) {
    node.children.forEach((child) => getAllNodes(child, nodes));
  }
  return nodes;
};

const MAP_CLOSE_MS = 240;

export default function PortfolioMap({
  onClose: externalOnClose = null,
  autoOpen = false,
  onExternalLinkModal = null,
  disableInternalExternalModal = false
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [showExplorationMap, setShowExplorationMap] = useState(autoOpen);
  const [isClosing, setIsClosing] = useState(false);
  const [showExternalLinkModal, setShowExternalLinkModal] = useState(false);
  const [externalLinkUrl, setExternalLinkUrl] = useState('');
  const closeTimeoutRef = useRef(null);
  const {
    visitedPages,
    markVisited,
    scrollProgress,
    pageScrollProgress,
    clearProgress
  } = usePortfolioTracker(pathname);

  useEffect(() => {
    if (showExplorationMap) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      if (closeTimeoutRef.current) {
        window.clearTimeout(closeTimeoutRef.current);
      }
    };
  }, [showExplorationMap]);

  const handleCloseModal = useCallback((afterClose) => {
    setIsClosing(true);
    closeTimeoutRef.current = window.setTimeout(() => {
      setShowExplorationMap(false);
      setIsClosing(false);
      if (typeof afterClose === 'function') {
        afterClose();
      }
      if (externalOnClose) {
        externalOnClose();
      }
    }, MAP_CLOSE_MS);
  }, [externalOnClose]);

  const handleOpenModal = useCallback((event) => {
    event?.stopPropagation?.();

    if (showExplorationMap) {
      return;
    }

    // Recover safely from any stale closing state and reopen immediately.
    setIsClosing(false);
    setShowExplorationMap(true);
  }, [showExplorationMap]);

  const handleNavigate = useCallback((path) => {
    markVisited(path);

    if (typeof router.prefetch === 'function') {
      router.prefetch(path);
    }

    handleCloseModal(() => {
      router.push(path);
    });
  }, [handleCloseModal, markVisited, router]);

  const handleExternalLink = useCallback((url) => {
    markVisited(url);

    handleCloseModal(() => {
      if (disableInternalExternalModal && onExternalLinkModal) {
        onExternalLinkModal(true, url);
        return;
      }

      setShowExternalLinkModal(false);
      setExternalLinkUrl(url);

      // Force a clean reopen path even if a previous close animation just finished.
      window.requestAnimationFrame(() => {
        setShowExternalLinkModal(true);
      });
    });
  }, [disableInternalExternalModal, handleCloseModal, markVisited, onExternalLinkModal]);

  const handleNodeClick = useCallback((nodeDatum, event) => {
    event?.preventDefault?.();
    event?.stopPropagation?.();

    const isExternal = nodeDatum.data?.attributes?.external || nodeDatum.attributes?.external;
    const externalUrl = nodeDatum.data?.attributes?.externalUrl || nodeDatum.attributes?.externalUrl;

    if (isExternal && externalUrl) {
      handleExternalLink(externalUrl);
      return;
    }

    const path =
      nodeDatum.data?.attributes?.path ||
      nodeDatum.attributes?.path ||
      nodeDatum.data?.attributes?.href ||
      nodeDatum.attributes?.href ||
      nodeDatum.path;

    if (!path || path === pathname) {
      return;
    }

    handleNavigate(path);
  }, [handleExternalLink, handleNavigate, pathname]);

  useEffect(() => {
    if (!showExplorationMap) {
      return;
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        handleCloseModal();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [handleCloseModal, showExplorationMap]);

  const getExplorationProgress = useCallback(() => {
    const allPaths = getAllPaths(SITE_STRUCTURE);
    const visitedCount = allPaths.filter((path) => visitedPages.has(path)).length;
    return Math.round((visitedCount / allPaths.length) * 100);
  }, [visitedPages]);

  const getUnexploredAreas = useCallback(() => {
    const allNodes = getAllNodes(SITE_STRUCTURE);
    return allNodes.filter((node) => !visitedPages.has(node.path));
  }, [visitedPages]);

  const explorationProgress = getExplorationProgress();
  const unexploredCount = getUnexploredAreas().length;

  return (
    <>
      <div className="fixed top-6 right-6" style={{ zIndex: 9999 }}>
        <button
          onClick={showExplorationMap ? () => handleCloseModal() : handleOpenModal}
          className="group relative flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/80 shadow-lg backdrop-blur-xl transition-all duration-500 hover:scale-110 hover:bg-white/90 hover:shadow-xl"
          aria-label="Toggle Portfolio Map"
        >
          <svg
            className="h-5 w-5 text-gray-600 transition-all duration-300 group-hover:text-gray-800"
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

          <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 100 100">
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

          {unexploredCount > 0 && (
            <div className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 animate-pulse rounded-full border border-white bg-gray-700" />
          )}
        </button>
      </div>

      {showExplorationMap && (
        <div
          className={`fixed inset-0 flex items-center justify-center p-4 transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}
          style={{
            background: 'rgba(231, 223, 216, 0.85)',
            backdropFilter: 'blur(0.5px)',
            zIndex: 99999
          }}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              handleCloseModal();
            }
          }}
        >
          <ModalFrame
            title="SITE.MAP"
            subtitle={`PORTFOLIO.EXPLORER • ${explorationProgress}% DISCOVERED`}
            onClose={handleCloseModal}
            closeLabel="Close interface"
            widthClassName="max-w-4xl"
            panelClassName="max-h-[80vh]"
            bodyClassName="p-0"
            footerClassName="relative border-t border-neutral-300 bg-neutral-50 p-1"
            footer={(
              <div className="flex items-center justify-between">
                <div className="ms-6 flex items-center space-x-6 font-mono text-xs uppercase tracking-wider text-neutral-700">
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 bg-black" />
                    <span>ACTIVE</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 bg-neutral-400" />
                    <span>VISITED</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 border border-neutral-300 bg-white" />
                    <span>PENDING</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="font-mono text-xs uppercase tracking-wider text-neutral-600">
                    {unexploredCount > 0 ? (
                      <span>{unexploredCount} NODES.REMAINING</span>
                    ) : (
                      <span className="text-black">SYSTEM.COMPLETE</span>
                    )}
                  </div>
                  <button
                    onClick={clearProgress}
                    className="group flex items-center gap-2 rounded border border-neutral-300 px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-neutral-600 transition-all duration-200 hover:border-neutral-400 hover:bg-neutral-100 hover:text-neutral-900"
                    title="Clear all progress data"
                  >
                    <FaBroom className="h-3 w-3 transition-transform duration-200 group-hover:rotate-12" />
                    CLEAR
                  </button>
                </div>
              </div>
            )}
          >
            <div className="relative flex-1 overflow-hidden bg-white" style={{ minHeight: '450px' }}>
              <div className="absolute inset-0 p-6">
                <MapTree
                  visitedPages={visitedPages}
                  currentPath={pathname}
                  pageScrollProgress={pageScrollProgress}
                  onNodeClick={handleNodeClick}
                />
              </div>
            </div>
          </ModalFrame>
        </div>
      )}

      {!disableInternalExternalModal && showExternalLinkModal && (
        <ExternalLinkModal
          isOpen={showExternalLinkModal}
          onClose={() => {
            setShowExternalLinkModal(false);
            setIsClosing(false);
            if (onExternalLinkModal) {
              onExternalLinkModal(false);
            }
          }}
          targetUrl={externalLinkUrl}
        />
      )}
    </>
  );
}