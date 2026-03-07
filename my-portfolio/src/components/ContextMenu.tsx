import { useEffect, useRef } from 'react';
import './ContextMenu.css';

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onAction: (action: string) => void;
}

const ContextMenu = ({ x, y, onClose, onAction }: ContextMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    // Also close on scroll
    document.addEventListener('scroll', onClose);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('scroll', onClose);
    };
  }, [onClose]);

  // Adjust coordinates if the menu goes off-screen
  const adjustedX = Math.min(x, window.innerWidth - 200);
  const adjustedY = Math.min(y, window.innerHeight - 150);

  return (
    <div 
      className="context-menu glass" 
      style={{ top: adjustedY, left: adjustedX }}
      ref={menuRef}
    >
      <div className="context-menu-item" onClick={() => onAction('wallpaper')}>Change Wallpaper</div>
      <div className="context-menu-item" onClick={() => onAction('terminal')}>New Terminal</div>
      <div className="context-menu-divider"></div>
      <div className="context-menu-item" onClick={() => onAction('github')}>Open GitHub</div>
      <div className="context-menu-item" onClick={() => onAction('inspect')}>System Info</div>
    </div>
  );
};

export default ContextMenu;
