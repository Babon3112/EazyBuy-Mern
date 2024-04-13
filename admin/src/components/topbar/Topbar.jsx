import React from "react";
import "./topbar.css";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LanguageIcon from "@mui/icons-material/Language";
import SettingsIcon from "@mui/icons-material/Settings";
import { useLocation } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
import { logout } from "../../../../frontend/src/redux/apiCalls";
import { Link } from "react-router-dom";

const Topbar = () => {
  const location = useLocation();

  const dispatch = useDispatch();

  const handleLogout = (e) => {
    logout(dispatch);
  };

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
            <img
              src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="topAvatar"
            />
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "black", fontWeight: "600" }}
              onClick={handleLogout}
            >
              <div
                className="topbarIconContainer"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: "10px",
                }}
              >
                Log Out
                <LogoutIcon fontSize="" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default Topbar;
