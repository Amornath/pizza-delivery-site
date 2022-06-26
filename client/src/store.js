import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  getAllPizzasReducers,
  addPizzasReducers,
  editPizzasReducers,
} from "./reducers/pizzaReducers";
import { cartReducers } from "./reducers/cartReducers";
import {
  registerUserReducers,
  loginUserReducers,
  getAllUsersReducers,
} from "./reducers/userReducers";
import {
  placeOrderReducers,
  getUserOrdersReducers,
  getAllOrdersReducers,
} from "./reducers/orderReducer";

const finalReducer = combineReducers({
  getAllPizzasReducers: getAllPizzasReducers,
  cartReducers: cartReducers,
  registerUserReducers: registerUserReducers,
  loginUserReducers: loginUserReducers,
  placeOrderReducers: placeOrderReducers,
  getUserOrdersReducers: getUserOrdersReducers,
  addPizzasReducers: addPizzasReducers,
  editPizzasReducers: editPizzasReducers,
  getAllOrdersReducers: getAllOrdersReducers,
  getAllUsersReducers: getAllUsersReducers,
});
const cartItems = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const currentUser = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser"))
  : null;
const initialState = {
  cartReducers: {
    cartItems: cartItems,
  },
  loginUserReducers: {
    currentUser: currentUser,
  },
};
const composeEnhancers = composeWithDevTools({});
const store = createStore(
  finalReducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);
export default store;
