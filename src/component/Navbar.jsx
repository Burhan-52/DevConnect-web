import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import config from "../../config.json";
import { CiMenuBurger } from "react-icons/ci";
import { toggleMenu } from "../utils/slice/toggleMenu";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const handletoggle = () => {
    dispatch(toggleMenu());
  };

  return (
    <div className="navbar bg-base-200">
      <div className="ml-0 cursor-pointer z-20 md:ml-5">
        {user && <CiMenuBurger onClick={handletoggle} size={30} />}
      </div>
      <div className="flex-1 ml-4">
        <Link to={"/"} className="btn btn-ghost text-xl">
          {"🚀" + config.title}
        </Link>
      </div>
      <div className="flex-none gap-2">
        {user && (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="User Photo" src={user.data.photoUrl} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
