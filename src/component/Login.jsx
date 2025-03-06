import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adduser } from "../utils/slice/userSlice";
import { BASE_URL } from "../constant";
import { Link, useNavigate } from "react-router";
import config from "../../config.json";
import { closeMenu, toggleMenu } from "../utils/slice/toggleMenu";
import Toast from "./Toast";
import VerifyOtp from "./VerifyOtp";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState(false);

  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [showOtp, setShowOtp] = useState(false);

  const user = useSelector((store) => store.user);

  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (user) {
      navigate("/feed");
    }
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      return;
    }
    console.log("login");
    try {
      setError("");
      const res = await axios.post(
        BASE_URL + "/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      console.log(res);

      if (res.data.success) {
        dispatch(adduser(res.data));
        dispatch(toggleMenu());
        return navigate("/feed");
      }
    } catch (error) {
      console.log("dbhe", error);
      if (error.status) {
        setToast(true);
        setError(error?.response?.data?.message ?? error.response.data.error);
        setTimeout(() => {
          setToast(false);
        }, 3000);
      }
    }
  };

  const handleSignUp = async () => {
    if (!firstName || !lastName || !email || !password) {
      return;
    }
    setError("");
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          email,
          password,
        },
        { withCredentials: true }
      );
      if (res.data.success) {
        console.log(res);
        dispatch(toggleMenu());
        navigate("/feed")
        dispatch(adduser(res.data));
        // setShowOtp(true);
        // setUserId(res.data);
      }
    } catch (err) {
      console.log(err);
      setToast(true);
      setError(err.response.data.message ?? err.response.data.error);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    }
  };

  return (
    <>
      {toast && <Toast message={error} color={"error"} />}

      <div className="height flex items-center justify-center p-5 w-full">
        <div className="card bg-base-100 w-96 shadow-xl">
          <div className="card-body">
            <h2 className="card-title font-extrabold text-3xl mx-auto pb-5">
              {config.title}
            </h2>
            {!isLogin && !showOtp && (
              <>
                <div>
                  <label className="input input-bordered flex items-center gap-2">
                    <input
                      type="text"
                      className="grow"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </label>
                </div>
                <div>
                  <label className="input input-bordered flex items-center gap-2">
                    <input
                      type="text"
                      className="grow"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </label>
                </div>
              </>
            )}
            {!showOtp && (
              <>
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
                      type={showPassword ? "text" : "password"}
                      className="grow"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span
                      className="font-semibold cursor-pointer"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </span>
                  </label>
                </div>
                <div className="card-actions justify-center">
                  <button
                    // disabled={
                    //   isLogin
                    //     ? !email || !password
                    //     : !firstName || !lastName || !email || !password
                    // }
                    className={`btn btn-primary w-full mt-5 ${
                      (
                        isLogin
                          ? !email || !password
                          : !firstName || !lastName || !email || !password
                      )
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    onClick={isLogin ? handleLogin : handleSignUp}
                  >
                    {isLogin ? "Login" : "Sign Up"}
                  </button>
                </div>

                <div className="mx-auto mt-5">
                  <div>
                    {isLogin ? " Don't have an account? " : "Have an account? "}
                    <span
                      className="font-bold cursor-pointer"
                      onClick={() => setIsLogin((prev) => !prev)}
                    >
                      {isLogin ? "Sign up" : "Log In"}
                    </span>
                  </div>
                </div>
              </>
            )}

            {isLogin && (
              <>
                <div className="divider">OR</div>
                <Link className="mx-auto" to={"/password/reset"}>
                  <div className="font-medium cursor-pointer">
                    Forgot password?
                  </div>
                </Link>
              </>
            )}
          </div>
          {/* {showOtp && (
            <VerifyOtp
              userId={userId}
              email={email}
              setIsLogin={setIsLogin}
              setShowOtp={setShowOtp}
            />
          )} */}
        </div>
      </div>
    </>
  );
};

export default Login;
