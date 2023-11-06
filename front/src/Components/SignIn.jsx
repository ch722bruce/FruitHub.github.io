import React, { useState } from "react";
import API from "../API/API";
// import "../css/Login.css";
import { useNavigate, Link } from "react-router-dom";
import PropTypes from "prop-types";

function SignIn({ isLogin, setisLogin }) {
  const [input, setInput] = useState({});
  const [loginmsg, setMsg] = useState("");
  let navigate = useNavigate();

  const setupInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput({ ...input, [name]: value });
  };

  const onFormSubmit = async (event) => {
    console.log("Login Form Submit");
    event.preventDefault();
    const res = await API.login(input);
    if (res.success) {
      console.log("logged in");
      sessionStorage.setItem("user", res.user.email);
      setisLogin(true);
      // navigate("/dashboard", {state: {user: res.user}});
      navigate("/dashboard");
    } else {
      setMsg(res.msg);
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
                value={input.email || ""}
                type="email"
                className="form-control inputBox"
                placeholder="."
                id="email"
                aria-label="email"
              />
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <div className="loginmsg">{loginmsg}</div>
            </div>

            <div className="form-div">
              <input
                name="password"
                required={true}
                onChange={setupInput}
                value={input.password || ""}
                type="password"
                className="form-control inputBox"
                placeholder="."
                id="InputPassword"
              />
              <label htmlFor="password" className="form-label">
                Password
              </label>
            </div>

            <button className="loginBtn">Login In</button>
            <div>
              Do not have an account yet?
              <Link to="/signup" className="signup-link">
                Sign up
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