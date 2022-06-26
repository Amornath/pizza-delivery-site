import axios from "axios";
export const registerUser = (user) => async (dispatch) => {
  dispatch({ type: "USER_REGISTER_REQUEST" });
  try {
    const response = await axios.post("/api/auth/register", user);
    console.log(response);
    dispatch({ type: "USER_REGISTER_SUCCESS" });
  } catch (error) {
    dispatch({ type: "USER_REGISTER_FAILED", payload: error });
  }
};

export const loginUser = (user) => async (dispatch) => {
  dispatch({ type: "USER_LOGIN_REQUEST" });
  try {
    const response = await axios.post("/api/auth/login", user);
    console.log(response);
    dispatch({ type: "USER_LOGIN_SUCCESS", payload: response.data });
    localStorage.setItem("currentUser", JSON.stringify(response.data));
    window.location.href = "/";
  } catch (error) {
    dispatch({ type: "USER_LOGIN_FAILED", payload: error });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("currentUser");
  window.location.href = "/login";
};

export const getAllusers = () => async (dispatch) => {
  dispatch({ type: "GET_ALL_USER_REQUEST" });
  try {
    const response = await axios.get("/api/auth/getallusers");
    console.log(response);
    dispatch({ type: "GET_ALL_USER_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "GET_ALL_USER_FAILED", payload: error });
  }
};

export const deleteUser = (id, toggle, setToggle) => async (dispatch) => {
  try {
    const response = await axios.delete("/api/auth/deleteuser/" + id);
    console.log(response);
    if (response) {
      setToggle(!toggle);
    }
  } catch (error) {
    alert("Something went wrong");
  }
};
