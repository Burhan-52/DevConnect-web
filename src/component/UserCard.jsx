import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../constant";
import { removeFeed } from "../utils/slice/feedSlice";
import { MdOutlineWorkspacePremium } from "react-icons/md";
const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const { _id, firstName, lastName, age, skills, about, gender, photoUrl,isPremium } =
    user;

  const handleInterestIgnore = async (status, id) => {
    console.log("status,id", status, id);
    try {
      const res = await axios.post(
        BASE_URL + `/request/send/${status}/${id}`,
        {},
        { withCredentials: true }
      );
      console.log("res 🚀", res);
      if (res.data.success) {
        dispatch(removeFeed({ id }));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="card card-compact bg-base-200 w-80 shadow-xl">
      <div className="w-full aspect-[1/1] overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={photoUrl}
          alt="User Photo"
        />
      </div>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName} {isPremium && <MdOutlineWorkspacePremium size={25}/>}</h2>
        {age && gender && <h4 className="card-title">{age + ", " + gender}</h4>}
        <p>{about}</p>
        <div className="card-actions justify-center">
          <button
            className="btn btn-primary"
            onClick={() => handleInterestIgnore("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-primary"
            onClick={() => handleInterestIgnore("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
