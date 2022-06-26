export const addToCart =
  (pizza, quantity, varient) => async (dispatch, getState) => {
    var cartItem = {
      name: pizza.name,
      _id: pizza._id,
      image: pizza.image,
      varient: varient,
      quantity: Number(quantity),
      prices: pizza.prices,
      price: pizza.prices[0][varient] * quantity,
    };
    if (cartItem.quantity > 10) {
      alert("stock limit exeed");
    } else {
      if (cartItem.quantity < 1) {
        dispatch({ type: "DELETE_FROM_CART", payload: cartItem });
      } else {
        dispatch({ type: "ADD_TO_CART", payload: cartItem });
      }
    }
    const cartItems = getState().cartReducers.cartItems;
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

export const deleteFromCart = (pizza) => (dispatch, getState) => {
  dispatch({ type: "DELETE_FROM_CART", payload: pizza });
  const cartItems = getState().cartReducers.cartItems;
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};
