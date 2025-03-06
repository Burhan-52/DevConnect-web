import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { BASE_URL } from "../constant";
import { removeUser } from "../utils/slice/userSlice";
import { closeMenu } from "../utils/slice/toggleMenu";
import { BiLogOut } from "react-icons/bi";
import { LuMessageCircleMore } from "react-icons/lu";
import { IoSearchOutline } from "react-icons/io5";
import { IoMdHome } from "react-icons/io";
import {
  MdConnectWithoutContact,
  MdRequestPage,
  MdStars,
} from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { clearFeed } from "../utils/slice/feedSlice";

const Drawer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleMenu = useSelector((store) => store.menu.isopen);
  if (!toggleMenu) return null;

  const handleLogout = async () => {
    console.log("hello");
    const res = await axios.post(
      BASE_URL + "/logout",
      {},
      { withCredentials: true }
    );

    if (res.data.success) {
      dispatch(removeUser());
      dispatch(closeMenu());
      dispatch(clearFeed())
      navigate("/login");
    }
  };

  return (
    <div
      className={`bg-base-100 p-4
        md:static md:w-auto md:h-auto md:shadow-none md:z-50
        fixed top-[4rem] left-0 h-full w-1/2 shadow-lg
        transition-transform duration-300 ease-in-out
        ${toggleMenu ? "translate-x-0" : "translate-x-full"} md:translate-x-0`}
    >
      <ul
        tabIndex={0}
        className=" space-y-2 menu menu-sm dropdown-content w-52"
      >
        <li className="p-2 rounded">
          <Link to={"/feed"} className="flex items-center gap-2">
            <IoMdHome /> Home
          </Link>
        </li>
        <li className="p-2 rounded">
          <Link to={"/search"} className="flex items-center gap-2">
            <IoSearchOutline /> Search
          </Link>
        </li>
        <li className="p-2 rounded">
          <Link to={"/profile"} className="flex items-center gap-2">
            <AiOutlineUser /> Profile
          </Link>
        </li>
        <li className="p-2  rounded">
          <Link to={"/connections"} className="flex items-center gap-2">
            <MdConnectWithoutContact /> Connections
          </Link>
        </li>
        <li className="p-2 rounded">
          <Link to={"/requests"} className="flex items-center gap-2">
            <MdRequestPage /> Requests
          </Link>
        </li>
        <li className="p-2 rounded">
          <Link to={"/premium"} className="flex items-center gap-2">
            <MdStars /> Premium
          </Link>
        </li>
        <li className="p-2 rounded">
          <Link to={"/message"} className="flex items-center gap-2">
            <LuMessageCircleMore /> Message
          </Link>
        </li>
        {/* <li className="p-2 rounded">
          <Link to={"/test"} className="flex items-center gap-2">
            <LuMessageCircleMore /> Message
          </Link>
        </li> */}
        <li className="p-2 rounded">
          <button onClick={handleLogout} className="flex items-center gap-2">
            <BiLogOut /> Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Drawer;
