import Title from "./Title";
import { Link } from "react-router-dom";
import QuantityBtn from "./QuantityBtn";
import { CartContext } from "./CartContext";
import { useContext, useEffect, useState } from "react";
import API from "../API/API";
import PropTypes from "prop-types";

export default function Checkout({ isLogin, userLogout }) {
  let [user, setUser] = useState({});
  let { cartItems } = useContext(CartContext);
  let cartEmpty = cartItems.length <= 0;

  let grandTotal = cartItems.reduce((total, product) => {
    return (total + product.price.slice(1) * product.quantity);
  }, 0).toFixed(2);
  const freeShippingPrice = 99;

  useEffect(() => {
    async function getUserInfo() {
      try {
        const res = await API.getUser();
        console.log("User get in Profile", res);
        setUser(res.user);
      } catch (e) {
        console.log(e);
      }
    }
    getUserInfo();
  }, []);


  return (
    <>
      <Title mainTitle="Your Carts"  isLogin={isLogin} user={user} userLogout={userLogout}/>

      {cartEmpty && (
        <div>
          <div className="nothingInCart">
            Nothing in Your Carts
            <br />
            <br />
            <Link to="/">Go Check Product</Link>
          </div>{" "}
          :
        </div>
      )}

      {!cartEmpty && (
        <div className="container">
          <div className="cartSection">
            <table className="checkoutTable">
              <tbody>
                {cartItems.map((product) => (
                  <tr key={product._id}>
                    <td>
                      <Link to={"/product/" + product._id}>
                        <img
                          src={product.image_url}
                          alt={product.name}
                        />
                      </Link>
                    </td>
                    <td>
                      <p>Name : {product.name}</p>
                      <p>Price : {product.price}</p>
                      <p>Description : {product.description}</p>
                    </td>
                    <td width="200">
                      <QuantityBtn productInfo={product} />
                    </td>
                    <td>
                      <div className="productSubTotal">
                        ${(product.price.slice(1) * product.quantity).toFixed(2)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="checkoutSection">
            <div>Total</div>
            <div className="grandTotal">${grandTotal}</div>
            {grandTotal >= freeShippingPrice ? (
              <div className="freeShipping">✔️Free Delivery</div>
            ) : (
              <div className="noShipping">
                Over ${freeShippingPrice} Get Free Shipping
                <br />
                Still Need ${(freeShippingPrice - grandTotal).toFixed(2)}
              </div>
            )}

            <button>Check Out</button>
          </div>
        </div>
      )}
    </>
  );
}

Checkout.prototype = {
  isLogin: PropTypes.bool,
  userLogout: PropTypes.func,
};