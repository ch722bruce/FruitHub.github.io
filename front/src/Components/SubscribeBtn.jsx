import { useEffect, useState } from "react";

import PropTypes from "prop-types";

export default function SubscribeBtn({ productInfo }) {
  let [subscriptionInfo, setSubscriptionInfo] = useState(null);
  const apiUrl = "/api/users/subscriptions";
  const urlWithParams = new URL(apiUrl);

  urlWithParams.searchParams.append("userId", null);
  urlWithParams.searchParams.append("productId", productInfo._id);

  useEffect(() => {
    fetch(urlWithParams)
      .then((response) => response.json())
      .then((data) => setSubscriptionInfo(data));
  });

  const handleSubscribe = (freq) => {
    fetch(apiUrl, {
      method: "PUT",
      body: JSON.stringify({
        freq: freq,
        userId: null,
        productId: productInfo._id,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // 将响应解析为JSON
      })
      .then((data) => {
        setSubscriptionInfo(data);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error,
        );
      });
  };

  const handleUnsubscribe = () => {
    fetch(apiUrl, {
      method: "DELETE",
      body: JSON.stringify({
        userId: null,
        productId: productInfo._id,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // 将响应解析为JSON
      })
      .then((data) => {
        setSubscriptionInfo(data);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error,
        );
      });
  };

  return (
    <div>
      {subscriptionInfo && (
        <div className="addToCart">
          <span className="addToCartBtn" onClick={handleUnsubscribe}>
            Unsubscribe
          </span>
        </div>
      )}
      {!subscriptionInfo && (
        <div className="addToCart">
          <span className="addToCartBtn" onClick={handleSubscribe}>
            Subscribe
          </span>
        </div>
      )}
    </div>
  );
}

SubscribeBtn.propTypes = {
  productInfo: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image_url: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};
