import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Title from "./Title";
import QuantityBtn from "./QuantityBtn";
import PropTypes from "prop-types";
import API from "../API/API";

export default function ProductList() {
  let [user, setUser] = useState({});
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("/api/fruits")
      .then((response) => response.json())
      .then((data) => setProductList(data));
  };

  useEffect(() => {
    async function getUserInfo() {
      try {
        const res = await API.getUser();
        console.log("User get in Profile!", res);
        setUser(res.user);
      } catch (e) {
        console.log(e);
      }
    }
    getUserInfo();
  }, []);

  return (
    <>
      <Title mainTitle="FruitHub" user={user} />
      <div className="container">
        {productList.map((product) => (
          <React.Fragment key={product._id}>
            <div className="containerItem">
              <Link to={"/product/" + product._id}>
                <img
                  className="fruitImg"
                  src={product.image_url}
                  alt={product.name}
                />
              </Link>

              <div className="productName">
                {product.name} - {product.price}
              </div>

              <QuantityBtn productInfo={product} />
            </div>
          </React.Fragment>
        ))}
      </div>
    </>
  );
}
ProductList.prototype = {
  isLogin: PropTypes.bool,
  userLogout: PropTypes.func,
};