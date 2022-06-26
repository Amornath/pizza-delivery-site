import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../actions/userActions";
import Error from "../components/Error";
import Loading from "../components/Loading";
import Success from "../components/Success";

const RegisterScreen = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const registerState = useSelector((state) => state.registerUserReducers);
  const { loading, success, error } = registerState;

  const register = () => {
    if (password !== cpassword) {
      alert("Password Not Matched");
    } else {
      const user = {
        name,
        email,
        password,
      };
      dispatch(registerUser(user));
      console.log(user);
    }
  };

  return (
    <div>
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 text-start">
          {loading && <Loading />}
          {success && <Success success="User Registered Successfully" />}
          {error && <Error error="Email already exist" />}
          <h1 className="text-center m-2">Registration</h1>
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
          <input
            type="text"
            placeholder="Confirm Password"
            className="form-control"
            value={cpassword}
            onChange={(e) => {
              setCpassword(e.target.value);
            }}
          />
          <div className="d-flex justify-content-between align-items-center">
            <button onClick={register} className="btn mt-3">
              REGISTER
            </button>
            <div>
              <a href="/login" className="text-decoration-none">
                Click here to login
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
