import React from 'react';
import { Rnd } from 'react-rnd';
import { X, Minus, Square } from 'lucide-react';
import './Window.css';

interface WindowProps {
  id: string;
  title: string;
  isOpen: boolean;
  isActive: boolean;
  onClose: () => void;
  onFocus: () => void;
  children: React.ReactNode;
  defaultPosition?: { x: number; y: number };
  defaultSize?: { width: number | string; height: number | string };
  closeOnly?: boolean;
  noPadding?: boolean;
}

const DraggableWindow: React.FC<WindowProps> = ({
  title,
  isOpen,
  isActive,
  onClose,
  onFocus,
  children,
  defaultPosition = { x: 100, y: 100 },
  defaultSize = { width: 600, height: 400 },
  closeOnly = false,
  noPadding = false,
}) => {
  if (!isOpen) return null;

  return (
    <Rnd
      default={{
        ...defaultPosition,
        ...defaultSize,
      }}
      minWidth={300}
      minHeight={200}
      bounds="parent" // Keep inside the OS desktop
      dragHandleClassName="window-header"
      onDragStart={onFocus}
      onResizeStart={onFocus}
      className={`os-window glass ${isActive ? 'window-active' : ''}`}
      style={{ zIndex: isActive ? 100 : 10 }}
      onClick={onFocus}
    >
      {/* OS Style Title Bar */}
      <div className="window-header">
        <div className="window-controls">
          <button className="win-btn close-btn" onClick={(e) => { e.stopPropagation(); onClose(); }}>
            <X size={12} strokeWidth={3} />
          </button>
          {!closeOnly && (
            <>
              <button className="win-btn min-btn">
                <Minus size={12} strokeWidth={3} />
              </button>
              <button className="win-btn max-btn">
                <Square size={10} strokeWidth={3} />
              </button>
            </>
          )}
        </div>
        <div className="window-title">{title}</div>
        <div className="window-spacer"></div>
      </div>
      
      <div className="window-content" style={noPadding ? { padding: 0, overflow: 'hidden' } : {}}>
        {children}
      </div>
    </Rnd>
  );
};

export default DraggableWindow;
