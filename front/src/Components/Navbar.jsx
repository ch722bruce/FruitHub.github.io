import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css";
import PropTypes from "prop-types";
import SignOut from "./SignOut";

function Navbar() {
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    window.addEventListener("storage", () => {
      setLogged(!logged);
    });
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
        {logged && (
          <div className="navbar-nav signout">
            <SignOut />
          </div>
        )}
      </nav>
    </div>
  );
}

Navbar.propTypes = {
    isLogin: PropTypes.bool,
  };

export default Navbar;