import React from "react";
import {Link} from "react-router-dom";
import "../css/Navbar.css";
import PropTypes from "prop-types";
import SignOut from "./SignOut";


function Navbar() {


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
              Carts {" "}
            </Link>
          </li>
        </ul>
        <div className="navbar-nav signout">
          <SignOut />
          </div>
      </nav>
    </div>
  );
}

Navbar.prototype = {
  isLogin: PropTypes.bool,
};

export default Navbar;