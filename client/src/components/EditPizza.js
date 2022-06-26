import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editPizza } from "../actions/pizzaActions";
import Error from "./Error";
import Loading from "./Loading";
const EditPizza = ({ data, setFlag, setToggle, toggle }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [smallPrice, setSmallPrice] = useState();
  const [mediumPrice, setMediumPrice] = useState();
  const [largePrice, setLargePrice] = useState();
  const [image, setImage] = useState("");
  const editPizzaState = useSelector((state) => state.editPizzasReducers);
  const { loading, error, success } = editPizzaState;

  useEffect(() => {
    setName(data.name);
    setCategory(data.category);
    setDescription(data.description);
    setSmallPrice(data.prices[0].small);
    setMediumPrice(data.prices[0].medium);
    setLargePrice(data.prices[0].large);
    setImage(data.image);
  }, [data]);

  useEffect(() => {
    if (success) {
      setFlag("list");
      setToggle(!toggle);
    }
  }, [success]);

  const editPizza2 = (e) => {
    e.preventDefault();
    const pizza = {
      name,
      description,
      image,
      category,
      prices: [
        {
          small: smallPrice,
          medium: mediumPrice,
          large: largePrice,
        },
      ],
      varients: ["small", "medium", "large"],
    };
    console.log(pizza);
    dispatch(editPizza(pizza, data._id));
  };

  return (
    <div>
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 text-start">
          {loading && <Loading />}
          {error && <Error error="Something went wrong" />}
          <h1 className="text-center m-2">Add New Pizza</h1>

          <form onSubmit={editPizza2}>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="Name"
              className="form-control"
            />
            <input
              type="text"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              placeholder="Description"
              className="form-control"
            />
            <select
              className="form-select mt-1"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              placeholder="Category"
            >
              <option>Select Category</option>
              <option value="veg">Veg</option>
              <option value="Non Veg"> Non Veg</option>
            </select>
            <input
              type="Number"
              placeholder="Small Price"
              className="form-control"
              value={smallPrice}
              onChange={(e) => {
                setSmallPrice(e.target.value);
              }}
            />
            <input
              type="Number"
              placeholder="Medium Price"
              className="form-control"
              value={mediumPrice}
              onChange={(e) => {
                setMediumPrice(e.target.value);
              }}
            />
            <input
              type="Number"
              placeholder="Large Price"
              className="form-control"
              value={largePrice}
              onChange={(e) => {
                setLargePrice(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Image"
              className="form-control"
              value={image}
              onChange={(e) => {
                setImage(e.target.value);
              }}
            />

            <button type="submit" className="btn mt-3">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPizza;
