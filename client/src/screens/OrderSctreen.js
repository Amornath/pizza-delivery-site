import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders } from "../actions/orderAction";
import Error from "../components/Error";
import Loading from "../components/Loading";
import AOS from "aos";

const OrderScreen = () => {
  AOS.init();
  const dispatch = useDispatch();
  const orderState = useSelector((state) => state.getUserOrdersReducers);
  const { error, orders, loading } = orderState;
  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);
  return (
    <div className="row" data-aos="fade-down">
      {loading && <Loading />}
      {error && <Error error="Something went wrong" />}
      {orders.map((item, i) => {
        return (
          <div className="bg-success p-2 text-dark bg-opacity-25 mb-2">
            <div className="d-flex">
              <div className="text-start w-100">
                <h1 className="text-danger">Items</h1>
                {item.orderItems.map((itm) => {
                  return (
                    <div key={itm._id}>
                      <p>
                        {itm.name} [{itm.varient}] * {itm.quantity} ={" "}
                        {itm.price}
                      </p>
                    </div>
                  );
                })}
              </div>
              <div className="text-start w-100">
                <h1 className="text-danger">Address</h1>
                <p>{item.shippingAddress.street}</p>
                <p>
                  {item.shippingAddress.city} {item.shippingAddress.pincode}
                </p>
              </div>
              <div className="text-start w-100">
                <h1 className="text-danger">Order Info</h1>
                <p>Amount: {item.orderAmount}</p>
                <p>Ordered at: {item.createdAt.split("T")[0]}</p>
                <p>TransactionId: {item.transactionId}</p>
                <p>
                  Status: {item.isDelivered === true ? "Delivered" : "Placed"}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderScreen;
