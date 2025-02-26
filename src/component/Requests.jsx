import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/slice/requestSlice";
import { BASE_URL } from "../constant";

const Requests = () => {
  const requests = useSelector((store) => store.request);
  const dispatch = useDispatch();

  const userRequests = async () => {
    const res = await axios.get(BASE_URL + "/user/request/received", {
      withCredentials: true,
    });
    if (res.data.success) {
      dispatch(addRequest(res.data.data));
    }
  };

  const handleAcceptReject = async (status, id) => {
    console.log("status,id", status, id);
    try {
      const res = await axios.post(
        BASE_URL + `/request/recived/${status}/${id}`,
        {},
        { withCredentials: true }
      );
      if (res.data.success) {
        dispatch(removeRequest({ id }));
      }
      console.log("accept and reject the reject " + res);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    userRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0) {
    return <div className="text-center text-gray-600 mt-10">
    No requests found
  </div>
  }

  return (
    <div className="bg-base-100 w-full max-w-2xl mx-auto py-6 rounded-lg shadow-lg mt-10 p-6">
      <h2 className="text-2xl font-semibold text-center mb-6">Friend Requests</h2>
      <div className="space-y-6">
        {requests.map((request) => {
          const { firstName, lastName, photoUrl } = request.fromUserId;
          const { _id } = request;
          return (
            <div
              key={_id}
              className="flex flex-col sm:flex-row items-center sm:justify-between bg-base-200 p-4 rounded-lg shadow-md gap-4"
            >
              <div className="flex items-center gap-4">
                <img
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-gray-400"
                  src={photoUrl}
                  alt="Profile"
                />
                <div>
                  <div className="text-lg font-medium">{firstName + " " + lastName}</div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <button
                  className="btn btn-primary w-full sm:w-auto px-6 py-2 rounded-lg shadow-md"
                  onClick={() => handleAcceptReject("accepted", _id)}
                >
                  Accept
                </button>
                <button
                  className="btn btn-primary w-full sm:w-auto px-6 py-2 rounded-lg shadow-md"
                  onClick={() => handleAcceptReject("rejected", _id)}
                >
                  Reject
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
