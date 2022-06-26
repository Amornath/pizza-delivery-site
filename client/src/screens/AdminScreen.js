import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import UsersList from "../components/UsersList";
import PizzasList from "../components/PizzasList";
import AddNewPiza from "../components/AddNewPiza";
import OrdersList from "../components/OrdersList";
import { Nav } from "react-bootstrap";
const AdminScreen = () => {
  const [flag, setFlag] = useState("pizzas");
  const user = useSelector((state) => state.loginUserReducers);
  const { currentUser } = user;
  useEffect(() => {
    if (currentUser.isAdmin === false) {
      window.location.href = "/";
    }
  }, [currentUser]);
  return (
    <div>
      <h1>Admin Panel</h1>
      <ul className="adminfunction">
        <li>
          <Nav.Link onClick={() => setFlag("users")}> Users List</Nav.Link>
        </li>
        <li>
          <Nav.Link onClick={() => setFlag("pizzas")}>Pizzas List</Nav.Link>
        </li>
        <li>
          <Nav.Link onClick={() => setFlag("add")}> Add New Pizza</Nav.Link>
        </li>
        <li>
          <Nav.Link onClick={() => setFlag("orders")}> Orders List</Nav.Link>
        </li>
      </ul>
      {flag === "users" && <UsersList />}
      {flag === "pizzas" && <PizzasList />}
      {flag === "add" && <AddNewPiza />}
      {flag === "orders" && <OrdersList />}
    </div>
  );
};

export default AdminScreen;
