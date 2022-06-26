import { useDispatch, useSelector } from "react-redux";
import { getFilteredPizzas } from "../actions/pizzaActions";
import Error from "../components/Error";
import Loading from "../components/Loading";

import React, { useState } from "react";

const Filter = () => {
  const [searchkey, setSearchkey] = useState("");
  const [category, setCategory] = useState("all");
  const pizzaState = useSelector((state) => state.getAllPizzasReducers);
  const { loading, error } = pizzaState;

  const dispatch = useDispatch();

  const filterClick = () => {
    dispatch(getFilteredPizzas(searchkey, category));
  };
  return (
    <div className="container">
      <div className="row p-3 shadow justify-content-center align-items-center">
        {loading && <Loading />}
        {error && <Error error="something went wrong" />}
        <div className="col-md-3 ">
          <input
            className="form-control w-100"
            type="text"
            value={searchkey}
            onChange={(e) => setSearchkey(e.target.value)}
            placeholder="Search"
          />
        </div>
        <div className="col-md-3 ">
          <select
            className="form-select w-100 mt-1"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">All</option>
            <option value="veg">Veg</option>
            <option value="nonveg">Non Veg</option>
          </select>
        </div>
        <div className="col-md-3 ">
          <button className="btn w-100" onClick={filterClick}>
            Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
