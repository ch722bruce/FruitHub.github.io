import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

export default function SubscribeBtn({ productInfo }) {
  const [subscriptionInfo, setSubscriptionInfo] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const freq = useRef("Daily");
  const apiUrl = "/api/users/subscriptions";

  useEffect(() => {
    fetch(apiUrl +"?"+
        new URLSearchParams({
          userId: sessionStorage.getItem("userId"),
          fruitId: productInfo._id,
        }))
      .then((response) => response.json())
      .then((data) => {
        if (data) setSubscriptionInfo(true);
      });
  }, []);

  const handleSubscribe = () => {
    fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        freq: freq.current,
        userId: sessionStorage.getItem("userId"),
        fruitId: productInfo._id,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        } else setSubscriptionInfo(true);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error,
        );
      })
      .finally(() => cancelSubscribe());
  };
  const cancelSubscribe = () => {
    setIsSubscribing(false);
  };

  const startSubscribe = () => {
    setIsSubscribing(true);
  };

  const handleUnsubscribe = () => {
    fetch(apiUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: sessionStorage.getItem("userId"),
        fruitId: productInfo._id,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        } else setSubscriptionInfo(false);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error,
        );
      });
  };
  const frequencies = ["Daily", "Weekly", "Monthly"];
  return (
    <div>
      {isSubscribing === true && (
        <div className="modal-content">
          <select
            value={freq.current}
            onChange={(e) => freq.current = e.target.value}
          >
            {frequencies.map((frequency, index) => (
              <option key={index} value={frequency}>
                {frequency}
              </option>
            ))}
          </select>
          <button onClick={handleSubscribe}>OK</button>
          <button onClick={cancelSubscribe}>Cancel</button>
        </div>
      )}
      {isSubscribing === false && subscriptionInfo && (
        <div className="subscribe">
          <span> ✅Subscribed</span>
          <span className="unsubscribeBtn" onClick={handleUnsubscribe}>
            Unsubscribed?
          </span>
        </div>
      )}
      {isSubscribing === false && !subscriptionInfo && (
        <div className="subscribe">
          <span className="subscribeBtn" onClick={startSubscribe}>
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
