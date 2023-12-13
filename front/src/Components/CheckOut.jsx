import Title from "./Title";
import { Link, useNavigate } from "react-router-dom";
import QuantityBtn from "./QuantityBtn";
import { CartContext } from "./CartContext";
import { useContext, useEffect } from "react";
import PropTypes from "prop-types";

export default function Checkout() {
  let { cartItems } = useContext(CartContext);
  let cartEmpty = cartItems.length <= 0;
  let grandTotal = cartItems
    .reduce((total, product) => {
      return total + product.price.slice(1) * product.quantity;
    }, 0)
    .toFixed(2);
  const freeShippingPrice = 99;
  const navigate = useNavigate();
  useEffect(() => {
    if (!sessionStorage.getItem("userId")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <Title mainTitle="Your Carts" />
      {cartEmpty && (
        <div className="container">
          <div className="nothingInCart">
            Nothing in Your Carts
            <br />
            <br />
            <Link to="/">Go Check Product</Link>
          </div>{" "}
        </div>
      )}

      {!cartEmpty && (
        <div className="container checkoutContainer">
          <div className="cartSection">
            <table className="checkoutTable">
              <tbody>
                {cartItems.map((product) => (
                  <tr key={product._id}>
                    <td>
                      <Link to={"/product/" + product._id}>
                        <img src={product.image_url} alt={product.name} />
                      </Link>
                    </td>
                    <td>
                      <p>
                        <strong>Name:</strong> {product.name}
                      </p>
                      <p>
                        <strong>Price:</strong> {product.price}
                      </p>
                      <p>
                        <strong>Description:</strong>{" "}
                        {product.description.split(" ").slice(0, 10).join(" ")}
                        {product.description.split(" ").length > 10
                          ? "..."
                          : ""}
                      </p>
                    </td>

                    <td width="200">
                      <QuantityBtn productInfo={product} />
                    </td>
                    <td>
                      <div className="productSubTotal">
                        $
                        {(product.price.slice(1) * product.quantity).toFixed(2)}
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
  userLogout: PropTypes.func.isRequired,
};
