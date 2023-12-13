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
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Main{" "}
            </Link>
          </li>
          <h2>Find Your Fresh Fruit </h2>
          <li className="nav-item">
            <Link to="/checkout" className="nav-link">
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

export default Navbar;