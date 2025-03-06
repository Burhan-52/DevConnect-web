import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../constant";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/slice/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [cursor, setCursor] = useState(null);
  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/user/feed?limit=3${cursor ? `&cursor=${cursor}` : ""}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        if (res.data.data.length === 0) {
          setHasMoreData(false);
        }
        dispatch(addFeed(res.data.data));
        setCursor(res.data.nextCursor);
      }
    } catch (error) {
      console.log("Error fetching feed:", error.message);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  useEffect(() => {
    if (feed && feed?.length === 1 && hasMoreData) {
      getFeed();
    }
  }, [feed]);

  if (!feed) return null;

  return (
    <div className="w-full">
      {feed.length === 0 ? (
        <>No user is available</>
      ) : (
        <div className="height flex justify-center items-center p-5">
          <UserCard user={feed[0]} />
        </div>
      )}
    </div>
  );
};

export default Feed;
