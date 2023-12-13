import React, { useRef } from "react";
import API from "../API/API";
import "../CSS/signIn.css";
import { useNavigate, Link } from "react-router-dom";
import PropTypes from "prop-types";

function SignIn() {
  const input = useRef({ email: "", password: "", program: "" });
  let navigate = useNavigate();

  const setupInput = (e) => {
    const { name, value } = e.target;
    input.current = { ...input.current, [name]: value }
  };

  const onFormSubmit = async (event) => {
    console.log("Login Form Submit");
    event.preventDefault();
    const res = await API.signIn(input.current);
    if (res.redirected) {
      window.dispatchEvent(new Event("storage"));
      // navigate("/productList", {state: {user: res.user}});
      navigate("/productList");
    } else {
      alert("Wrong email or password")
    }
  };

  return (
    <div className="wrapper">
      <div className="loginPanel">
        <h1 className="loginTitle">Login</h1>
        <div className="col-3">
          <form onSubmit={onFormSubmit} className="loginForm">
            <div className="form-div">
              <input
                name="email"
                required={true}
                onChange={setupInput}
                type="email"
                className="form-control inputBox"
                placeholder=" "
                id="email"
                aria-label="email"
              />
              <label htmlFor="email" className="form-label">
                Email
              </label>
            </div>

            <div className="form-div">
              <input
                name="password"
                required={true}
                onChange={setupInput}
                type="password"
                className="form-control inputBox"
                placeholder=" "
                id="InputPassword"
              />
              <label htmlFor="password" className="form-label">
                Password
              </label>
            </div>

            <div className="form-div">
              <select
                name="program"
                onChange={setupInput}
                className="form-control selectBox"
                required={true}
                id="program"
                placeholder=" "
                aria-label="program"
              >
                <option value="">  </option>
                <option value="general"> Customer </option>
                <option value="vendor">Vendor</option>
                <option value="admin">Admins</option>
              </select>
              <label className="registerform-label">You are</label>
            </div>

            <button className="loginBtn">Login In</button>
            <div>
              Do not have an account yet?
              <Link to="/signUp" className="signup-link">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

SignIn.prototype = {
  isLogin: PropTypes.bool,
  setisLogin: PropTypes.func,
};
export default SignIn;
