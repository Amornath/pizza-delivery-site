import axios from "axios";
export const getAllPizzas = () => async (dispatch) => {
  dispatch({ type: "GET_PIZZAS_REQUEST" });
  try {
    const response = await axios.get("/api/pizzas/getallpizzas");
    console.log(response);
    dispatch({ type: "GET_PIZZAS_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "GET_PIZZAS_FAILED", payload: error });
  }
};

export const getFilteredPizzas = (searchkey, category) => async (dispatch) => {
  dispatch({ type: "GET_PIZZAS_REQUEST" });
  let filteredData;
  try {
    const response = await axios.get("/api/pizzas/getallpizzas");
    console.log(response);
    filteredData = response.data.filter((item) =>
      item.name.toLowerCase().includes(searchkey.toLowerCase())
    );
    if (category !== "all") {
      filteredData = response.data.filter((item) => item.category === category);
    }
    dispatch({ type: "GET_PIZZAS_SUCCESS", payload: filteredData });
  } catch (error) {
    dispatch({ type: "GET_PIZZAS_FAILED", payload: error });
  }
};

export const addPizza = (pizza) => async (dispatch) => {
  dispatch({ type: "ADD_PIZZA_REQUEST" });
  try {
    const response = await axios.post("/api/pizzas/addpizza", { pizza });
    console.log(response);
    dispatch({ type: "ADD_PIZZA_SUCCESS" });
  } catch (error) {
    dispatch({ type: "ADD_PIZZA_FAILED", payload: error });
  }
};

export const editPizza = (pizza, id) => async (dispatch) => {
  dispatch({ type: "EDIT_PIZZA_REQUEST" });
  try {
    const response = await axios.put("/api/pizzas/editpizza/" + id, { pizza });
    console.log(response);
    dispatch({ type: "EDIT_PIZZA_SUCCESS" });
  } catch (error) {
    dispatch({ type: "EDIT_PIZZA_FAILED", payload: error });
  }
};

export const deletePizza = (id) => async (dispatch) => {
  try {
    const response = await axios.delete("/api/pizzas/deletepizza/" + id);
    console.log(response);
    window.location.reload();
  } catch (error) {
    alert("Something went wrong");
  }
};
