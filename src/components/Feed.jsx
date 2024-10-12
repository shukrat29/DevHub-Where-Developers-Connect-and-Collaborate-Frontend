import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  // getting feed from redux store
  const feed = useSelector((store) => store.feed);
  console.log(feed);
  // adding feed to redux store
  const dispatch = useDispatch();

  // GET- feed api call
  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(import.meta.env.VITE_BASE_URL + "/feed", {
        withCredentials: true,
      });
      console.log(res);
      dispatch(addFeed(res.data));
    } catch (error) {
      // TODO
    }
  };
  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return;
  if (feed.length <= 0) return <h1>No new user founds</h1>;
  return (
    feed && (
      <div className="flex flex-wrap gap-6 justify-center my-15 mt-20">
        {feed.map((user) => (
          <UserCard key={user._id} data={user} />
        ))}
      </div>
    )
  );
};

export default Feed;
