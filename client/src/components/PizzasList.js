import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPizzas, deletePizza } from "../actions/pizzaActions";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import EditPizza from "./EditPizza";

const PizzasList = () => {
  const [flag, setFlag] = useState("list");
  const [toggle, setToggle] = useState(false);
  const [data, setData] = useState({});
  const dispatch = useDispatch();
  const pizzasState = useSelector((state) => state.getAllPizzasReducers);
  const { pizzas, error, loading } = pizzasState;
  useEffect(() => {
    dispatch(getAllPizzas());
  }, [dispatch, toggle]);
  return (
    <div>
      {flag === "list" && (
        <div>
          {loading ? (
            <Loading />
          ) : error ? (
            <Error error="Something went wrong" />
          ) : (
            <div>
              <h1>Pizza List</h1>
              <table className="table table-bordered table-striped">
                <thead>
                  <th>Name</th>
                  <th>category</th>
                  <th>description</th>
                  <th>prices</th>
                  <th>Action</th>
                </thead>
                <tbody>
                  {pizzas.map((pizza, i) => {
                    return (
                      <tr
                        key={i}
                        onClick={() => setData(pizza)}
                        className="text-start"
                      >
                        <td>{pizza.name}</td>
                        <td>{pizza.category}</td>
                        <td>{pizza.description}</td>
                        <td>
                          Small: {pizza.prices[0].small} <br />
                          Medium: {pizza.prices[0].medium} <br />
                          Large: {pizza.prices[0].large}
                        </td>
                        <td>
                          <FaTrashAlt
                            className="fs-3 text-danger"
                            onClick={() => dispatch(deletePizza(pizza._id))}
                          />
                          <FaRegEdit
                            onClick={() => setFlag("setup")}
                            className="fs-3 text-primary ms-2"
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
      {flag === "setup" && (
        <EditPizza
          data={data}
          setFlag={setFlag}
          setToggle={setToggle}
          toggle={toggle}
        />
      )}
    </div>
  );
};

export default PizzasList;
