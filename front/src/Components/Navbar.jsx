import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import "../CSS/Navbar.css";
import SignOut from "./SignOut";
import API from "../API/API.js";

function Navbar() {
  const [logged, setLogged] = useState(false);

  window.addEventListener("storage", () => {
    setLogged(!logged);
  });

  useEffect(() => {
    async function getUserInfo() {
      try {
        const res = await API.getUser();
        console.log("User get in Profile!", res);
        if(res.user) setLogged(true);
        else setLogged(false);
      } catch (e) {
        console.log(e);
      }
    }
    getUserInfo();
  }, []);


  return (
    <div>
      <nav id="mainNavbar" className="navbar navbar-expand-md fixed-top">
        <ul className={`navbar-nav ${logged?'nav-center':''}`}>
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Main{" "}
            </Link>
          </li>
          <li className="nav-title">Find Your Fresh Fruit </li>
          <li className="nav-item">
            <Link to="/checkout" className="nav-link">
              Carts{" "}
            </Link>
          </li>
        </ul>

        {logged && (
          <div className="navbar-signout signout">
            <SignOut />
          </div>
        )}
      </nav>
    </div>
  );
}

export default Navbar;