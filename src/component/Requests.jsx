import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../utils/slice/requestSlice";
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
      console.log("accept and reject the reject " + res);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    userRequests();
  }, []);

  if (!requests) {
    return <div>Data not found</div>;
  }

  return (
    <div>
      {requests &&
        requests.map((request) => {
          const { firstName, lastName, about, age, gender, photoUrl } =
            request.fromUserId;
          const { _id } = request;
          return (
            <div className="flex justify-center items-center my-5 gap-5 bg-base-300  mx-auto py-4 rounded-lg w-1/2">
              <div>
                <img className="w-20 h-20 rounded-full" src={photoUrl} />
              </div>
              <div>
                <div>{firstName + " " + lastName}</div>
                <div>{age && gender && <div>{age + ", " + gender}</div>}</div>
                <div>{about}</div>
              </div>
              <div className="flex gap-3">
                <button
                  className="btn btn-primary"
                  onClick={() => handleAcceptReject("accepted", _id)}
                >
                  Accept
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => handleAcceptReject("rejected", _id)}
                >
                  Reject
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Requests;
