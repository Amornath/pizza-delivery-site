import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllusers, deleteUser } from "../actions/userActions";
import { FaTrashAlt } from "react-icons/fa";
import Error from "./Error";
import Loading from "./Loading";
const UsersList = () => {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const orderState = useSelector((state) => state.getAllUsersReducers);
  const { error, users, loading } = orderState;
  useEffect(() => {
    dispatch(getAllusers());
  }, [dispatch, toggle]);
  return (
    <div>
      {loading && <Loading />}
      {error && <Error error="Something went wrong" />}
      <div>
        <h1>Users List</h1>
        <table className="table table-bordered table-striped">
          <thead>
            <th>User Id</th>
            <th>Customer Email</th>
            <th>Name</th>
            <th>Status</th>
          </thead>
          <tbody>
            {users.map((user, i) => {
              return (
                <tr key={i} className="text-start">
                  <td>{user._id}</td>
                  <td>{user.email}</td>
                  <td>{user.name}</td>
                  <td>{user.isAdmin ? <h1>Admin</h1> : <h1>User</h1>}</td>
                  <td>
                    <FaTrashAlt
                      className="fs-3 text-danger"
                      onClick={() =>
                        dispatch(deleteUser(user._id, toggle, setToggle))
                      }
                    />
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

export default UsersList;
