import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import API from "../API/API.js";
import {useNavigate} from "react-router-dom";

export default function SubscribeBtn({ productInfo }) {
  const [subscriptionInfo, setSubscriptionInfo] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);
  let subQuant = useRef();
  const navigate = useNavigate();
  let freq = useRef(null);
  const apiUrl = "/api/users/subscriptions";

  useEffect(() => {
    async function fetchData() {
      const user = await API.getUser();
      if(!user.user) navigate("/");
      const userId = user.user.id;
      fetch(apiUrl +"?"+
        new URLSearchParams({
          userId: userId,
          fruitId: productInfo._id,
        }))
        .then((response) => response.json())
        .then((data) => {
          if (data) setSubscriptionInfo(true);
        }).finally(()=>setShouldRender(true));
    }
    fetchData();
  }, [productInfo._id]);

  const handleSubscribe = async () => {
    const quant = subQuant.current.value;
    if(!quant || quant <= 0) {
      alert("Please input a valid quantity");
      return;
    }
    const userId = await API.getUser();
    fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        freq: freq.current == null ? "Daily" : freq.current,
        userId: userId.user.id,
        fruitId: productInfo._id,
        quantity: quant
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

  const handleUnsubscribe = async () => {
    const userId = await API.getUser();
    fetch(apiUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId.user.id,
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
  const frequencies = ["Daily", "Weekly", "Every Two Weeks", "Monthly", "Every Three Months"];
  if(!shouldRender) return ;
  return (
    <div>
      {isSubscribing === true && (
        <div className="modal-content">
          <input
            ref={subQuant}
            defaultValue="1"
            name="sub-quant"
            required={true}
            type="number"
            step="1"
            min="1"
            placeholder="quantity"
            id="sub-quant"
            aria-label="number"
          />
          <label htmlFor="number" className="form-label">
          </label>
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
