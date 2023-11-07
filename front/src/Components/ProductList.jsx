import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Title from "./Title";
import QuantityBtn from "./QuantityBtn";

export default function ProductList() {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("/api/fruits")
      .then((response) => response.json())
      .then((data) => setProductList(data));
  }

  return (
    <>
      <Title mainTitle="FruitHub" />
      <div className="container">
        {productList.map((product) => (
          <React.Fragment key={product._id}>
            <div className="containerItem">
              <Link to={"/product/" + product._id}>
                <img
                  className="fruitImg"
                  src={
                    product.image_url
                  }
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
