import React, { useState } from "react";
import API from "../API/API";
import "../css/signUp.css";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const [input, setInput] = useState({});
  const [registermsg, setMsg] = useState("");
  let navigate = useNavigate();

  const setupInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput({ ...input, [name]: value });
  };

  const onFormSubmit = async (event) => {
    console.log("Form Submit");
    event.preventDefault();
    try {
      const res = await API.register(input);
      if (res && res.success) {
        navigate("/signIn");
      } else {
        setMsg(res ? res.msg : "An unknown error occurred");
      }
    } catch (error) {
      // Catch any errors that occur during the API call
      console.error("Error during registration:", error);
      setMsg(error.message || "An error occurred during sign up.");
    }
  };
  

  return (
    <div>
      <div className="registerPanel">
        <h1 className="registerTitle">Sign Up</h1>

        <form onSubmit={onFormSubmit} className="registerForm">
          <div className="form-div">
            <input
              value={input.email || ""}
              onChange={setupInput}
              name="email"
              required={true}
              type="email"
              className="registerBox"
              id="email"
              placeholder=" "
              aria-label="email"
            />
            <label className="registerform-label">Email Address</label>
          </div>

          <div className="form-div">
            <input
              value={input.fName}
              onChange={setupInput}
              name="fname"
              required={true}
              type="text"
              className="registerBox"
              id="fName"
              placeholder=" "
              aria-label="firstname"
            />
            <label className="registerform-label">First Name</label>
          </div>

          <div className="form-div">
            <input
              value={input.lName}
              onChange={setupInput}
              name="lname"
              required={true}
              type="text"
              className="registerBox"
              id="lName"
              placeholder=" "
              aria-label="lastname"
            />
            <label className="registerform-label">Last Name</label>
          </div>

          <div className="form-div">
            <select
              name="program"
              value={input.program}
              onChange={setupInput}
              className="form-select selectBox"
              required={true}
              id="program"
              placeholder=" "
              aria-label="program"
            >
              <option value=""> </option>
              <option value="general"> Customers </option>
              <option value="admin">Admins</option>
            </select>
            <label className="registerform-label">You are</label>
          </div>

          <div className="form-div">
            <input
              value={input.password || ""}
              onChange={setupInput}
              name="password"
              required={true}
              type="password"
              className="registerBox"
              id="InputPassword"
              placeholder=" "
              aria-label="passw"
            />
            <label className="registerform-label">Password</label>
          </div>

          <div className="registermsg">{registermsg}</div>

          <button className="registerBtn">Sign Up</button>
        </form>
      </div>
    </div>
  );
}
RegisterPage.prototype = {};
export default RegisterPage;