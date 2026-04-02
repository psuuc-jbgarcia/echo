import { useState, useEffect } from 'react';
import './TopBar.css';
import { Wifi, BatteryMedium, Search, Settings } from 'lucide-react';

const TopBar = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="os-topbar glass">
      <div className="topbar-left">
        <div className="topbar-logo topbar-menu-item font-bold">
          <span className="logo-text">ECHO</span>
        </div>
        <div className="topbar-menu-item">File</div>
        <div className="topbar-menu-item">Edit</div>
        <div className="topbar-menu-item">View</div>
        <div className="topbar-menu-item">Go</div>
        <div className="topbar-menu-item">Window</div>
        <div className="topbar-menu-item">Help</div>
      </div>
      <div className="topbar-right">
        <div className="topbar-icon"><Search size={14} /></div>
        <div className="topbar-icon"><Wifi size={14} /></div>
        <div className="topbar-icon"><BatteryMedium size={14} /></div>
        <div className="topbar-icon"><Settings size={14} /></div>
        <div className="topbar-time">
          {formatDate(time)} &nbsp; {formatTime(time)}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
