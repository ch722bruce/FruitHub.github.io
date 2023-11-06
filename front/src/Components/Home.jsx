import React from "react";
import "../css/home.css";
import { useNavigate } from "react-router-dom";

function HomePage() {
  let navigate = useNavigate();

  const goTologin = (event) => {
    event.preventDefault();
    navigate("/signIn");
  };

  const goToRegister = (event) => {
    event.preventDefault();
    navigate("/signUp");
  };

  return (
    <div className="home">
      <div className="greeting">
        <h2>Welcome to </h2>
        <h1 className="welcome">FruitHub</h1>
        <span>Order Fresh Fruit Now</span>
      </div>
      <button onClick={goTologin} className="toLoginBtn">
        Log in
      </button>
      <button onClick={goToRegister} className="toRegisterBtn">
        Sign up
      </button>
    </div>
  );
}

HomePage.propTypes = {};
export default HomePage;