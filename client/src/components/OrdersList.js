import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders, deliverOrder } from "../actions/orderAction";
import Error from "./Error";
import Loading from "./Loading";
const OrdersList = () => {
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();
  const orderState = useSelector((state) => state.getAllOrdersReducers);
  const { error, orders, loading } = orderState;
  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch, toggle]);
  return (
    <div>
      {loading && <Loading />}
      {error && <Error error="Something went wrong" />}
      <div>
        <h1>Orders List</h1>
        <table className="table table-bordered table-striped">
          <thead>
            <th>Order Id</th>
            <th>Customer Email</th>
            <th>User id</th>
            <th>Order Amount</th>
            <th>Date</th>
            <th>Status</th>
          </thead>
          <tbody>
            {orders.map((order, i) => {
              return (
                <tr key={i} className="text-start">
                  <td>{order._id}</td>
                  <td>{order.email}</td>
                  <td>{order.userid}</td>
                  <td>{order.orderAmount}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>
                    {order.isDelivered ? (
                      <h1>Delivered</h1>
                    ) : (
                      <button
                        className="btn"
                        onClick={() =>
                          dispatch(deliverOrder(order._id, setToggle, toggle))
                        }
                      >
                        Deliver
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersList;
