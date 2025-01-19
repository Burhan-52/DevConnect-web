import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../constant";
import { addConnectionRequest } from "../utils/slice/connectionsRequest";
import { useDispatch, useSelector } from "react-redux";

const Connections = () => {
  const connections = useSelector((store) => store.connection);
  const dispatch = useDispatch();

  const userConnections = async () => {
    const res = await axios.get(BASE_URL + "/user/connections", {
      withCredentials: true,
    });
    if (res.data.success) {
      dispatch(addConnectionRequest(res.data.data));
    }
  };

  useEffect(() => {
    userConnections();
  }, []);

  return (
    <>
      {connections &&
        connections.map((connection) => {
          const { firstName, lastName, about, age, gender, photoUrl } =
            connection;
          return (
            <div className="flex justify-center my-5 gap-5 bg-base-300 w-1/2 mx-auto py-4 rounded-lg">
              <div>
                <img className="w-20 h-20 rounded-full" src={photoUrl} />
              </div>
              <div>
                <div>{firstName + " " + lastName}</div>
                <div>
                  {age && gender && (
                    <div>{age + ", " + gender}</div>
                  )}
                </div>
                <div>{about}</div>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default Connections;
