import { useDispatch, useSelector } from "react-redux";
import { FaPlus, FaWindowMinimize, FaTrashAlt } from "react-icons/fa";
import { addToCart, deleteFromCart } from "../actions/cartActions";
import Checkout from "../components/Checkout";
import AOS from "aos";
const CartScreen = () => {
  AOS.init();
  const cartState = useSelector((state) => state.cartReducers);
  const cartItems = cartState.cartItems;
  let subTotal = cartItems.reduce((total, item) => {
    return (total += item.price);
  }, 0);
  const dispatch = useDispatch();
  return (
    <div>
      <div className="row" data-aos="fade-down">
        <div className="col-md-6">
          <h1>My Cart</h1>
          {cartItems.map((item, i) => {
            return (
              <div className="d-flex" key={i}>
                <div className="text-start w-100">
                  <h1>
                    {item.name} [{item.varient}]
                  </h1>
                  <h1>
                    Price: {item.quantity} * {item.prices[0][item.varient]} ={" "}
                    {item.price}
                  </h1>
                  <h1>
                    Quantity:{" "}
                    <FaPlus
                      onClick={() => {
                        dispatch(
                          addToCart(
                            item,
                            parseInt(item.quantity) + 1,
                            item.varient
                          )
                        );
                      }}
                    />{" "}
                    {item.quantity}{" "}
                    <FaWindowMinimize
                      onClick={() => {
                        dispatch(
                          addToCart(
                            item,
                            parseInt(item.quantity) - 1,
                            item.varient
                          )
                        );
                      }}
                    />
                  </h1>
                  <hr />
                </div>
                <div className="w-100 d-flex align-items-center">
                  <img src={item.image} alt="product" className="w-50 h-50" />
                </div>
                <div className="d-flex align-items-center">
                  <FaTrashAlt
                    className="fs-3"
                    onClick={() => dispatch(deleteFromCart(item))}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className="col-md-4 text-end">
          <h1>SubTotal: {subTotal}</h1>
          <Checkout subTotal={subTotal} />
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
