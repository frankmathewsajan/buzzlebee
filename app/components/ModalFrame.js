'use client';

import { motion } from 'framer-motion';

const PANEL_STYLE = {
  background: 'linear-gradient(145deg, #fafaf9 0%, #f5f5f4 50%, #e7e5e4 100%)',
  borderRadius: '4px',
};

const HEADER_STYLE = {
  background: 'linear-gradient(180deg, #fafaf9 0%, #f5f5f4 100%)',
};

const FOOTER_STYLE = {
  background: 'linear-gradient(180deg, #f5f5f4 0%, #fafaf9 100%)',
};

export default function ModalFrame({
  title,
  subtitle,
  onClose,
  closeLabel = 'Close modal',
  widthClassName = 'max-w-lg',
  panelClassName = '',
  bodyClassName = 'p-6',
  footer,
  footerClassName = 'p-6 border-t border-neutral-300 flex space-x-3',
  children,
  initial = { opacity: 0, scale: 0.95 },
  animate = { opacity: 1, scale: 1 },
  exit = { opacity: 0, scale: 0.95 },
  transition,
}) {
  return (
    <motion.div
      className={`relative ${widthClassName} w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-neutral-800 ${panelClassName}`}
      style={PANEL_STYLE}
      initial={initial}
      animate={animate}
      exit={exit}
      transition={transition}
      onClick={(event) => event.stopPropagation()}
    >
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
        }}
      />

      <div className="absolute top-0 left-0 w-8 h-8">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-black" />
        <div className="absolute top-0 left-0 w-[1px] h-full bg-black" />
      </div>
      <div className="absolute top-0 right-0 w-8 h-8">
        <div className="absolute top-0 right-0 w-full h-[1px] bg-black" />
        <div className="absolute top-0 right-0 w-[1px] h-full bg-black" />
      </div>
      <div className="absolute bottom-0 left-0 w-8 h-8">
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-black" />
        <div className="absolute bottom-0 left-0 w-[1px] h-full bg-black" />
      </div>
      <div className="absolute bottom-0 right-0 w-8 h-8">
        <div className="absolute bottom-0 right-0 w-full h-[1px] bg-black" />
        <div className="absolute bottom-0 right-0 w-[1px] h-full bg-black" />
      </div>

      <div className="relative flex justify-between items-center p-6 border-b border-neutral-300" style={HEADER_STYLE}>
        <div>
          <h2
            className="text-2xl font-light text-black tracking-wide"
            style={{ fontFamily: 'system-ui, -apple-system, sans-serif', letterSpacing: '0.05em' }}
          >
            {title}
          </h2>
          {subtitle ? <p className="text-neutral-600 mt-1 text-sm font-mono">{subtitle}</p> : null}
        </div>
        <button
          onClick={onClose}
          className="text-neutral-400 hover:text-black text-xl font-light w-8 h-8 flex items-center justify-center hover:bg-neutral-100 transition-all duration-200 border border-transparent hover:border-neutral-300"
          aria-label={closeLabel}
          style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
        >
          ×
        </button>
      </div>

      <div className={`flex-1 overflow-y-auto ${bodyClassName}`}>{children}</div>

      {footer ? (
        <div className={footerClassName} style={FOOTER_STYLE}>
          {footer}
        </div>
      ) : null}
    </motion.div>
  );
}