import React from "react";
import "./topbar.css";
import { Settings, Language, NotificationsNone } from "@mui/icons-material";

const Topbar = () => {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">admin 2</span>
        </div>
        <div className="topRight">
            <div className="topbarIconContainer">
                <NotificationsNone />
                <span className="topIconBadge">2</span>
            </div>
            <div className="topbarIconContainer">
                <Language />
                <span className="topIconBadge">2</span>
            </div>
            <div className="topbarIconContainer">
                <Settings />
            </div>
            <img src="https://cdn-icons-png.flaticon.com/512/147/147142.png" alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
