import React from "react";
import EditProfile from "./EditProfile";
import axios from "axios";
import { BASE_URL } from "../constant";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((store) => store.user);

  return <EditProfile user={user} />;
};

export default Profile;
