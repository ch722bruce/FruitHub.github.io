import React, {useEffect} from "react";
import "../CSS/home.css";
import { useNavigate } from "react-router-dom";
import API from "../API/API.js";

function HomePage() {
  let navigate = useNavigate();

  useEffect(() => {
    async function getUserInfo() {
      try {
        const res = await API.getUser();
        console.log("User get in Profile!", res);
        if(res.user) navigate("/productList");
      } catch (e) {
        console.log(e);
      }
    }
    getUserInfo();
  }, []);

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
        <section id="background"></section>
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

export default HomePage;