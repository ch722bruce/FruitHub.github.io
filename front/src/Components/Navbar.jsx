import React from "react";
import {Link, Routes, Route} from "react-router-dom";
import "../css/Navbar.css";
import PropTypes from "prop-types";
import Checkout from "./CheckOut";

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
          {sessionStorage.getItem("userId")!==null &&(
            <li className="nav-item stickToRight">
              <Link to="/signout" className="brand nav-link">
                Sign Out {" "}
              </Link>
            </li>)
          }
        </ul>
      </nav>
    </div>
  );
}

Navbar.prototype = {
  isLogin: PropTypes.bool,
};

export default Navbar;