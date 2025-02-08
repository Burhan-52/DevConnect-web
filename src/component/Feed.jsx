import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../constant";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/slice/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      if (feed) return;
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });

      console.log("feed", res);
      if (res.data.success) {
        dispatch(addFeed(res.data.data));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return;

  if (feed.length === 0) {
    return <>No user is available</>;
  }

  return (
    <>
      {feed && (
        <div className="flex justify-center my-5">
          <UserCard user={feed[0]} />
        </div>
      )}
    </>
  );
};

export default Feed;
