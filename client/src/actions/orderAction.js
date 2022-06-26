import axios from "axios";
export const placeOrder = (token, subTotal) => async (dispatch, getState) => {
  dispatch({ type: "PLACE_ORDER_REQUEST" });
  const currentUser = getState().loginUserReducers.currentUser;
  const cartItems = getState().cartReducers.cartItems;

  try {
    const response = await axios.post("/api/orders/placeorder", {
      token,
      subTotal,
      currentUser,
      cartItems,
    });
    console.log(response);
    dispatch({ type: "PLACE_ORDER_SUCCESS" });
  } catch (error) {
    dispatch({ type: "PLACE_ORDER_FAILED", payload: error });
  }
};

export const getUserOrders = () => async (dispatch, getState) => {
  const currentUser = getState().loginUserReducers.currentUser;
  dispatch({ type: "GET_USER_ORDER_REQUEST" });
  try {
    const response = await axios.get(
      "/api/orders/getuserorder/" + currentUser._id
    );
    console.log(response);
    dispatch({ type: "GET_USER_ORDER_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "GET_USER_ORDER_FAILED", payload: error });
  }
};

export const getAllOrders = () => async (dispatch) => {
  dispatch({ type: "GET_ALL_ORDER_REQUEST" });
  try {
    const response = await axios.get("/api/orders/getallorder");
    console.log(response);
    dispatch({ type: "GET_ALL_ORDER_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "GET_ALL_ORDER_FAILED", payload: error });
  }
};

export const deliverOrder = (id, setToggle, toggle) => async (dispatch) => {
  try {
    const response = await axios.put("/api/orders/deliverorder/" + id);
    console.log(response);
    if (response) {
      setToggle(!toggle);
    }
  } catch (error) {
    alert("Something went wrong");
  }
};
