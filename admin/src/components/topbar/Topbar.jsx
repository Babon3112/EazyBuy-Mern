import React from "react";
import "./topbar.css";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import LanguageIcon from '@mui/icons-material/Language';
import SettingsIcon from '@mui/icons-material/Settings';
import { useLocation } from "react-router-dom";

const Topbar = () => {
  const location = useLocation();

  
  if (location.pathname !== "/login") {
    return (
      <div className="topbar">
        <div className="topbarWrapper">
          <div className="topLeft">
            <span className="logo">eazybuyadmin</span>
          </div>
          <div className="topRight">
            <div className="topbarIconContainer">
              <NotificationsNoneIcon />
              <span className="topIconBadge">2</span>
            </div>
            <div className="topbarIconContainer">
              <LanguageIcon />
              <span className="topIconBadge">2</span>
            </div>
            <div className="topbarIconContainer">
              <SettingsIcon />
            </div>
            <img src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="topAvatar" />
          </div>
        </div>
      </div>
    );
  }
  return null; 
};

export default Topbar;
