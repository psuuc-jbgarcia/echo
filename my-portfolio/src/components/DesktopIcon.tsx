import type { ReactNode } from 'react';
import './DesktopIcon.css';

interface DesktopIconProps {
  icon: ReactNode;
  label: string;
  onClick: (e: React.MouseEvent) => void;
  top: number;
  left: number;
  isSelected?: boolean;
}

const DesktopIcon = ({ icon, label, onClick, top, left, isSelected = false }: DesktopIconProps) => {

  // Listen for clicks on the window to deselect
  // A bit hacky to put in each icon, but works for a few icons
  return (
    <div
      className={`desktop-icon ${isSelected ? 'selected' : ''}`}
      style={{ top: `${top}px`, left: `${left}px` }}
      onClick={onClick}
    >
      <div className="desktop-icon-img">{icon}</div>
      <div className="desktop-icon-label">{label}</div>
    </div>
  );
};

export default DesktopIcon;
