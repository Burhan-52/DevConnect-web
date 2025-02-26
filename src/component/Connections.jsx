import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../constant";
import { addConnectionRequest } from "../utils/slice/connectionsRequest";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { MdOutlineWorkspacePremium } from "react-icons/md";

const Connections = () => {
  const user = useSelector((store) => store.user);
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

  if (!connections) return null;

  if (connections.length === 0) {
    return (
      <div className="text-center text-gray-600 mt-10">
        No connections found
      </div>
    );
  }

  return (
    <div className="bg-base-100 w-full max-w-2xl mx-auto py-6 rounded-lg shadow-lg mt-10 p-6">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Your Connections
      </h2>
      <div className="space-y-6">
        {connections.map((connection) => {
          const {
            _id,
            firstName,
            lastName,
            about,
            age,
            gender,
            photoUrl,
            isPremium,
          } = connection;
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
                  <div className="text-lg font-medium">
                    {firstName + " " + lastName} {isPremium && <MdOutlineWorkspacePremium size={25}/>}
                  </div>
                  <div className="text-gray-700">
                    {age && gender && `${age}, ${gender}`}
                  </div>
                  <div className="text-gray-600 text-sm mt-1">{about}</div>
                </div>
              </div>
              <Link
                to={user.data.isPremium && isPremium ? `/chat/${_id}` : "#"}
                className="w-full sm:w-auto "
              >
                <button
                  title="Both user need to Premium for Chat"
                  className={`btn btn-primary w-full sm:w-auto px-6 py-2 rounded-lg shadow-md  ${
                    !user.data.isPremium && !isPremium
                      ? " cursor-not-allowed opacity-50"
                      : "cursor-pointer"
                  }`}
                >
                  Chat
                </button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
