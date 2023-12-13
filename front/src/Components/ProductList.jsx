import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Title from "./Title";
import QuantityBtn from "./QuantityBtn";
// import SearchBar from "./SearchBar";
import PropTypes from "prop-types";
import API from "../API/API";

export default function ProductList() {
  const [productList, setProductList] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); 

  let navigate = useNavigate();

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
        if(!res.user) navigate("/");
      } catch (e) {
        console.log(e);
      }
    }
    getUserInfo();
  }, []);


  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const foundProduct = productList.find(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (foundProduct) {
      navigate(`/product/${foundProduct._id}`); // Corrected usage of navigate
    } else {
      alert("Product not found");
    }
  };
  

  return (
    <>
      <Title mainTitle="Product Listing" />
      <div className="search-bar-container">
      <form onSubmit={handleSearchSubmit}>
        <input 
          type="text" 
          placeholder="Search products..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
        <button type="submit">Search</button>
      </form>
    </div>
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