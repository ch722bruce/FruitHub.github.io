import React from "react";
import PropTypes from "prop-types";
import "../CSS/signOut.css";
import {useNavigate} from "react-router-dom";
function SignOut() {
  const navigate = useNavigate();
  const goToSignOut = () => {
    sessionStorage.clear();
    navigate('/');
    window.dispatchEvent(new Event('storage'));
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