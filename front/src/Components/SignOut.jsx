import React from "react";
import "../CSS/signOut.css";
import {useNavigate} from "react-router-dom";

function SignOut() {
  const navigate = useNavigate();
  const goToSignOut = () => {
    fetch("/api/signOut", {
      method: "POST",
    }).then(() => {
      navigate('/');
      window.dispatchEvent(new Event('storage'));
    });
  };
  return (
    <div className="SignOutBtn">
      <button onClick={goToSignOut} className="signOutButton">
        Sign Out
      </button>
    </div>
  )
}


export default SignOut;