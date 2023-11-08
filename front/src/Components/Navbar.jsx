import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css";
import PropTypes from "prop-types";
import SignOut from "./SignOut";

function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // This function should update the `user` state with the session stored user
    const sessionUser = sessionStorage.getItem("userId"); // or any other user-related key
    if (sessionUser) {
      setUser({}); // Set user to an empty object or fetch user details
    }
  }, []);

  return (
    <div>
      <nav id="mainNavbar" className="navbar navbar-expand-md fixed-top">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/" className="brand nav-link">
              Main{" "}
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/checkout" className="brand nav-link">
              Carts{" "}
            </Link>
          </li>
        </ul>
        <div className="navbar-nav signout">
          {/* Render the SignOut component only if `user` is not null */}
          {user && <SignOut />}
        </div>
      </nav>
    </div>
  );
}

Navbar.prototype = {
  isLogin: PropTypes.bool,
};

export default Navbar;
