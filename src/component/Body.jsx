import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../constant";
import { useDispatch, useSelector } from "react-redux";
import { adduser } from "../utils/slice/userSlice";
import Drawer from "./Drawer";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    if (userData) return;
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(adduser(res.data));
      }
    } catch (error) {
      if (error.status === 401) {
        navigate("/login");
      }
      console.log(error);
    }
  };

  useEffect(() => {
    if (!userData) {
      return navigate("/login");
    }
    fetchUser();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex ">
        <Drawer />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Body;
