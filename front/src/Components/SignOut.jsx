import React from "react";
import { Link } from "react-router-dom";
import "../css/LogoutIcon.css";
import PropTypes from "prop-types";

function LogoutIcon({ userLogout }) {
  return (
    <div>
      <Link to="/" onClick={userLogout} className="nav-link">
        <span className="material-symbols-outlined icon">Sign Out</span> Sign Out
      </Link>
    </div>
  );
}

LogoutIcon.prototype = {
  userLogout: PropTypes.func,
};

export default LogoutIcon;