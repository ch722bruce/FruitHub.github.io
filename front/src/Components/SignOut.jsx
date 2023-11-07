import React from "react";
import { Link } from "react-router-dom";
import "../css/signOut.css";
import PropTypes from "prop-types";

function SignOut({userLogout}) {
  return (
    <div>
      <Link to="/" onClick={userLogout} className="nav-link">
        <span className="material-symbols-outlined icon">Sign Out</span> Sign Out
      </Link>
    </div>
  );
}

SignOut.prototype = {
  userLogout: PropTypes.func,
};

export default SignOut;