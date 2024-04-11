import React from "react";
import "./sidebar.css";
import StorefrontIcon from "@mui/icons-material/Storefront";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TimelineIcon from "@mui/icons-material/Timeline";
import LineStyleIcon from "@mui/icons-material/LineStyle";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import BarChartIcon from "@mui/icons-material/BarChart";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import DynamicFeedIcon from "@mui/icons-material/DynamicFeed";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ReportIcon from "@mui/icons-material/Report";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  if (location.pathname !== "/login") {
    return (
      <div className="sidebar">
        <div className="sidebarWrapper">
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Dashboard</h3>
            <ul className="sidebarList">
              <Link to="/" className="link">
                <li className="sidebarListItem active">
                  <LineStyleIcon className="sidebarIcon" />
                  Home
                </li>
              </Link>
              <li className="sidebarListItem">
                <TimelineIcon className="sidebarIcon" />
                Analytics
              </li>
              <li className="sidebarListItem">
                <TrendingUpIcon className="sidebarIcon" />
                Sales
              </li>
            </ul>
          </div>
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Quick Menu</h3>
            <ul className="sidebarList">
              <Link to="/users" className="link">
                <li className="sidebarListItem">
                  <PermIdentityIcon className="sidebarIcon" />
                  Users
                </li>
              </Link>
              <Link to="/products" className="link">
                <li className="sidebarListItem">
                  <StorefrontIcon className="sidebarIcon" />
                  Products
                </li>
              </Link>
              <li className="sidebarListItem">
                <CurrencyRupeeIcon className="sidebarIcon" />
                Transactions
              </li>
              <li className="sidebarListItem">
                <BarChartIcon className="sidebarIcon" />
                Reports
              </li>
            </ul>
          </div>
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Notifications</h3>
            <ul className="sidebarList">
              <li className="sidebarListItem">
                <MailOutlineIcon className="sidebarIcon" />
                Mail
              </li>
              <li className="sidebarListItem">
                <DynamicFeedIcon className="sidebarIcon" />
                Feedback
              </li>
              <li className="sidebarListItem">
                <ChatBubbleOutlineIcon className="sidebarIcon" />
                Messages
              </li>
            </ul>
          </div>
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Staff</h3>
            <ul className="sidebarList">
              <li className="sidebarListItem">
                <WorkOutlineIcon className="sidebarIcon" />
                Manage
              </li>
              <li className="sidebarListItem">
                <TimelineIcon className="sidebarIcon" />
                Analytics
              </li>
              <li className="sidebarListItem">
                <ReportIcon className="sidebarIcon" />
                Reports
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default Sidebar;
