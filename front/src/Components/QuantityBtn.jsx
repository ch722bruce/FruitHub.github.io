import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import PropTypes from "prop-types";

export default function QuantityBtn({ productInfo }) {
  const { cartItems, setCartItems } = useContext(CartContext);

  let productIndexInCart = cartItems.findIndex((element) => {
    return element.id === productInfo.id;
  });

  let [numInCart, setNumInCart] = useState(
    productIndexInCart === -1 ? 0 : cartItems[productIndexInCart].quantity
  );

  const handleAdd = () => {
    if (productIndexInCart === -1) {
      setCartItems([
        {
          id: productInfo.id,
          name: productInfo.name,
          image: productInfo.image,
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
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};
