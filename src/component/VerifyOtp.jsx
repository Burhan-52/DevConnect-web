import axios from "axios";
import React from "react";
import { useState } from "react";
import { BASE_URL } from "../constant";
import { adduser } from "../utils/slice/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const VerifyOtp = ({ userId }) => {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const handleClick = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      BASE_URL + "/verifyotp",
      {
        userId,
        otp,
      },
      {
        withCredentials: false,
      }
    );

    console.log(res);
    if(res.data.success){
        dispatch(adduser(res.data.data[0]))
        return navigate('/feed')
    }
  };

  return (
    <div className="p-5">
      <input
        className="input input-bordered input-success w-full "
        type="number"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="OTP..."
      />
      <button
        className="btn btn-primary mt-4 w-full"
        onClick={(e) => handleClick(e)}
      >
        Verify Otp
      </button>
    </div>
  );
};

export default VerifyOtp;
