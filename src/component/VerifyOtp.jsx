import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { BASE_URL } from "../constant";
import { adduser } from "../utils/slice/userSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import Toast from "./Toast";

const VerifyOtp = ({ userId, email, setIsLogin, setShowOtp }) => {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [timer, setTimer] = useState(300); // 5 minutes = 300 seconds
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [error, setError] = useState("");
    const [toast, setToast] = useState(false);
  

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setIsResendDisabled(false);
    }
  }, [timer, isResendDisabled]);

  const formatTime = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const handleClick = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(
        BASE_URL + "/verifyotp",
        {
          userId: userId.data,
          otp,
        },
        {
          withCredentials: false,
        }
      );

      console.log(res);
      if (res.data.success) {
        dispatch(adduser(res.data));
        dispatch(toggleMenu());
        return navigate("/feed");
      }
    } catch (error) {
      setToast(true);
      setError(error?.response?.data?.message ?? error.response.data.error);
    }
  };

  const handleResendOtp = async () => {
    setTimer(300);
    setIsResendDisabled(true);

    try {
      const res = await axios.post(
        BASE_URL + "/resendOtpVerificationCode",
        { userId: userId.data, email },
        { withCredentials: false }
      );

      // console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBack = () => {
    setIsLogin(false);
    setShowOtp(false);
  };
  return (
    <>
      {toast && <Toast message={error} color={"error"} />}
      <div className="p-5">
        <input
          className="input input-bordered input-success w-full "
          type="number"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="OTP..."
          max={"4"}
          required
        />
        <div className="flex gap-7">
          <button
            className={` mt-4 w-40 ${otp.length <= 3 ? "" : "btn btn-primary"}`}
            onClick={(e) => handleClick(e)}
            disabled={otp.length <= 3}
          >
            Verify Otp
          </button>
          <button
            className={` w-40 mt-4 ${
              isResendDisabled
                ? "btn-disabled opacity-50 cursor-not-allowed"
                : "btn btn-primary"
            }`}
            onClick={handleResendOtp}
            disabled={isResendDisabled}
          >
            Resend OTP {isResendDisabled && `(${formatTime()})`}
          </button>
        </div>
        <>
          <div className="divider">OR</div>
          <button onClick={handleBack} className="btn btn-primary w-full ">
            Back
          </button>
        </>
      </div>
    </>
  );
};

export default VerifyOtp;
