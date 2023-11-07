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

import SignOut from "./Components/SignOut.jsx";

function App() {
  const [cartItems, setCartItems] = useState([]);




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
            element={<SignIn />}
          />
          <Route
            path="/productList"
            element={<ProductList />}
          />
          <Route
            path="/checkout"
            element={<Checkout/>}
          />
          {/* <Route path="/productList" element={<ProductList />} />
          <Route path="/checkout" element={<Checkout />} /> */}
          {/* <Route
              path="/login"
              element={<SignIn isLogin={SignIn} setisLogin={setSignIn} />}
            /> */}
          <Route path="/product" element={<ProductDetail />}>
            <Route path=":id" element={<ProductDetail />} />
          </Route>
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/signout" element={<SignOut />} />
          <Route path="*" element={<p>Page Not Found</p>} />
        </Routes>
      </CartContext.Provider>
    </BrowserRouter>
  );
}

export default App;
