import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../constant";

const Premium = () => {
  const [isUserPremium, setIsUserPremium] = useState(false);
  const verifyPayment = async () => {
    try {
      const payment = await axios.get(BASE_URL + "/payment/verify", {
        withCredentials: true,
      });

      console.log(payment);

      if (payment.data.success) {
        setIsUserPremium(payment.data.isPremium);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  const handleClick = async (type) => {
    console.log("bdehjjv")
    const order = await axios.post(
      BASE_URL + "/payment/create",
      { membershipType: type },
      { withCredentials: true }
    );

    const { status, orderId, amount, currency, receipt, notes } =
      order.data.data.data;
    var options = {
      key: order.data.key,
      amount,
      currency,
      name: "Dev Connect",
      description: "Connect with other dev",
      image: "https://example.com/your_logo",
      order_id: orderId,
      prefill: {
        name: notes.firstName + " " + notes.lastName,
        email: "gaurav.kumar@example.com",
        contact: "9000090000",
      },
      theme: {
        color: "#3399cc",
      },

      handler: verifyPayment,
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  return (
    <>
      {isUserPremium ? (
        <div className="text-center text-lg font-semibold text-green-600">
          Already a Premium User
        </div>
      ) : (
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 p-5 w-full">
          {/* Silver Plan */}
          <div className="card bg-base-200 rounded-lg shadow-lg p-6 flex flex-col items-center w-full ">
            <div className="text-center">
              <div className="text-2xl font-bold ">₹29</div>
              <div className="text-sm ">per month</div>
            </div>
            <ul className="my-4 space-y-2">
              <li>✅ Chat with other users</li>
              <li>✅ 50 connections per day</li>
              <li>✅ Blue tick</li>
            </ul>
            <button
              className="btn btn-primary w-full py-2 mt-auto hover:bg-blue-700 transition duration-300"
              onClick={() => handleClick("SILVER")}
            >
              Buy Silver
            </button>
          </div>

          {/* OR Divider */}
          <div className="divider md:divider-horizontal font-semibold text-gray-600">
            OR
          </div>

          {/* Gold Plan */}
          <div className="card bg-base-200 rounded-lg shadow-lg p-6 flex flex-col items-center w-full ">
            <div className="text-center">
              <div className="text-2xl font-bold ">₹49</div>
              <div className="text-sm ">per month</div>
            </div>
            <ul className="my-4 space-y-2">
              <li>✅ Chat with other users</li>
              <li>✅ 100 connections per day</li>
              <li>✅ Blue tick</li>
              <li>✅ priority support</li>
            </ul>
            <button
              className="btn btn-primary w-full py-2 mt-auto hover:bg-blue-700 transition duration-300"
              onClick={() => handleClick("GOLD")}
            >
              Buy Gold
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Premium;
