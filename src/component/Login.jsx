import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { adduser } from "../utils/slice/userSlice";
import { BASE_URL } from "../constant";
import { useNavigate } from "react-router";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("akshay@gmail.com");
  const [password, setPassword] = useState("B@123");

  const handleLogin = async () => {
    const res = await axios.post(
      BASE_URL + "/login",
      {
        email,
        password,
      },
      { withCredentials: true }
    );

    if (res.data.success) {
      dispatch(adduser(res.data));
      navigate("/");
    }
  };
  return (
    <div className="flex justify-center my-5">
      <div className="card bg-base-100 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Login</h2>
          <div>
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                className="grow"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="password"
                className="grow"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
