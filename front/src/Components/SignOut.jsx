import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "../css/signOut.css";
function SignOut() {
  let navigate = useNavigate();

  const goToSignOut = () => {
    sessionStorage.clear(); 
    navigate('/');
  };

  return (
    <div className="SignOutBtn">
      <button onClick={goToSignOut} className="signOutButton">
        Sign Out
      </button>
    </div>
  )
}
SignOut.prototype = {
  userLogout: PropTypes.func,
};

export default SignOut;