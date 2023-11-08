import { BrowserRouter, Routes, Route } from "react-router-dom";
import Checkout from "./Components/CheckOut";
import ProductDetail from "./Components/ProductDetail";
import ProductList from "./Components/ProductList";
import { CartContext } from "./Components/CartContext";
import { useState } from "react";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import API from "./API/API";

function App() {
  const [cartItems, setCartItems] = useState([]);

  const [isLogin, setisLogin] = useState(
    sessionStorage.getItem("user") !== null &&
      sessionStorage.getItem("user") !== "null"
  );

  const userLogout = async () => {
    sessionStorage.setItem("user", null);
    setisLogin(false);
    await API.logout();
  };




  return (
    <BrowserRouter>
      <CartContext.Provider value={{ cartItems, setCartItems }}>
        <nav>
          <Navbar />
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route
            path="/signIn"
            element={<SignIn isLogin={isLogin} setisLogin={setisLogin} />}
          />
          <Route
            path="/productList"
            element={<ProductList isLogin={isLogin} setisLogin={setisLogin} userLogout={userLogout}/>}
          />
          <Route
            path="/checkout"
            element={<Checkout isLogin={isLogin}  setisLogin={setisLogin}userLogout={userLogout}/>}
          />
          <Route path="/product" element={<ProductDetail isLogin={isLogin} setisLogin={setisLogin} userLogout={userLogout}/>}>
            <Route path=":id" element={<ProductDetail />} />
          </Route>
          {/* <Route path="/signout" element={<SignOut />} /> */}
          <Route path="*" element={<p>Page Not Found</p>} />
        </Routes>
      </CartContext.Provider>
    </BrowserRouter>
  );
}

export default App;
