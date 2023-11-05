import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import PropTypes from "prop-types";

export default function QuantityBtn({ productInfo }) {
  const { cartItems, setCartItems } = useContext(CartContext);

  let productIndexInCart = cartItems.findIndex((element) => {
    return element._id === productInfo._id;
  });

  let [numInCart, setNumInCart] = useState(
    productIndexInCart === -1 ? 0 : cartItems[productIndexInCart].quantity
  );

  const handleAdd = () => {
    if (productIndexInCart === -1) {
      setCartItems([
        {
          _id: productInfo._id,
          name: productInfo.name,
          image_url: productInfo.image_url,
          price: productInfo.price,
          description: productInfo.description,
          quantity: 1,
        },
        ...cartItems,
      ]);
    } else {
      let newCartArray = [...cartItems];
      newCartArray[productIndexInCart].quantity++;
      setCartItems(newCartArray);
    }

    setNumInCart(numInCart + 1);
  };

  const handleSubtract = () => {
    if (cartItems[productIndexInCart].quantity === 1) {
      let newCartArray = [...cartItems];
      newCartArray.splice(productIndexInCart, 1);
      setCartItems(newCartArray);
    } else {
      let newCartArray = [...cartItems];
      newCartArray[productIndexInCart].quantity--;
      setCartItems(newCartArray);
    }

    setNumInCart(numInCart - 1);
  };

  return (
    <div className="addToCart">
      {numInCart === 0 ? (
        <span className="addToCartBtn" onClick={handleAdd}>
          Add to Carts
        </span>
      ) : (
        <div>
          <span className="subtractBtn" onClick={handleSubtract}>
            -
          </span>
          {numInCart}
          <span className="addBtn" onClick={handleAdd}>
            +
          </span>
        </div>
      )}
    </div>
  );
}

QuantityBtn.propTypes = {
  productInfo: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image_url: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};
