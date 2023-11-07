import React, { useEffect, useState } from "react";
import API from "../API/API";
import { Link , Routes, Route } from "react-router-dom";
import "../css/Navbar.css";
import PropTypes from "prop-types";
import Checkout from "./CheckOut";

function Navbar({ isLogin }) {
  let [user, setUser] = useState({});

  useEffect(() => {
    async function getUserInfo() {
      try {
        const res = await API.getUser();
        console.log("User get in Profile", res);
        setUser(res.user);
      } catch (e) {
        console.log(e);
      }
    }
    getUserInfo();
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
              Carts {" "}
            </Link>
          </li>
        </ul>
      </nav>
      <Routes>
				<Route path="/checkout" element={user ? <Checkout/> : ""} />
    </Routes>   
    </div>
  );
}

Navbar.prototype = {
  isLogin: PropTypes.bool,
};

export default Navbar;