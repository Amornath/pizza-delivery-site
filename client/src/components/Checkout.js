import StripeCheckout from "react-stripe-checkout";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../actions/orderAction";
import Error from "../components/Error";
import Loading from "../components/Loading";
import Success from "../components/Success";

import React from "react";

const Checkout = (props) => {
  const dispatch = useDispatch();
  const placeOrderState = useSelector((state) => state.placeOrderReducers);
  const { loading, success, error } = placeOrderState;

  const tokenHandler = (token) => {
    dispatch(placeOrder(token, props.subTotal));
  };
  return (
    <div>
      {loading && <Loading />}
      {error && <Error error="something went wrong" />}
      {success && <Success success="Your order placed successfully" />}
      <StripeCheckout
        amount={props.subTotal * 100}
        shippingAddress
        token={tokenHandler}
        stripeKey="pk_test_51KIx3SIQbwpD8gifd9BdpSKfEDtFXCyt3ztnRvgdBUXDHyUmzi385c1HqHJRQN9hjNEp5sXZUO7Vjpe9y35DLg7Q00S5Tqs3GI"
        currency="BDT"
      >
        <button className="btn">Pay Now</button>
      </StripeCheckout>
    </div>
  );
};

export default Checkout;
