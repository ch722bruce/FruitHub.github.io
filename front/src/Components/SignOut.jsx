import React from "react";
import {useNavigate} from "react-router-dom";
import PropTypes from "prop-types";
import API from "../API/API.js";

function SignOut() {
  const navigate = useNavigate();
  const userLogout = async () => {
    sessionStorage.removeItem("userId");
    await API.signOut();
    navigate("/");
  };
  userLogout();
}

export default SignOut;