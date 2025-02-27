import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../constant";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const sendPasswordResetEmail = async (e) => {
    if(!email){
      return
    }
    // e.preventDefault();
    const res = await axios.post(
      BASE_URL + "/verify/email",
      { email },
      { withCredentials: false }
    );
  };
  return (
    <>
      <div className="height flex items-center justify-center p-5 w-full">
        <div className="card bg-base-100 w-96 shadow-xl">
          <div className="card-body">
            <div>
              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="email"
                  className="grow"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
            </div>
            <div className="card-actions justify-center">
              <button
                className={`btn btn-primary w-full mt-5 ${
                  !email ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={sendPasswordResetEmail}
              >
                Send Link
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
