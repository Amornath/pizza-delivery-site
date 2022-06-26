import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../actions/userActions";
import Error from "../components/Error";
import Loading from "../components/Loading";
const LoginScreen = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginState = useSelector((state) => state.loginUserReducers);
  const { loading, error } = loginState;

  useEffect(() => {
    if (localStorage.getItem("currentUser")) {
      window.location.href = "/";
    }
  }, []);

  const login = () => {
    const user = {
      email,
      password,
    };
    dispatch(loginUser(user));
  };

  return (
    <div>
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 text-start">
          {loading && <Loading />}
          {error && <Error error="Invalid crediantials" />}
          <h1 className="text-center m-2">Login</h1>

          <input
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Email"
            className="form-control"
          />
          <input
            type="text"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Password"
            className="form-control"
          />
          <div className="d-flex justify-content-between align-items-center">
            <button onClick={login} className="btn mt-3">
              Login
            </button>
            <div>
              <a href="/register" className="text-decoration-none">
                Click here to register
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
