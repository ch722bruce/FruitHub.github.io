import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css";
import PropTypes from "prop-types";
import SignOut from "./SignOut";

function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkLoginStatus = () => {
      const sessionUser = sessionStorage.getItem("userId");
      if (sessionUser) {
        // Assuming that you're storing the user id in session storage
        setUser({ id: sessionUser });
      } else {
        setUser(null);
      }
    };

    // Set up an event listener for login state changes
    window.addEventListener("login", checkLoginStatus);

    // Check login status on mount as well
    checkLoginStatus();

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("login", checkLoginStatus);
    };
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

Navbar.propTypes = {
    isLogin: PropTypes.bool,
  };

export default Navbar;
