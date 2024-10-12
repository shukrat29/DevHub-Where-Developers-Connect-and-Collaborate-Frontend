import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ data }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about, skills } =
    data;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        import.meta.env.VITE_BASE_URL +
          "/request/send/" +
          status +
          "/" +
          userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (error) {}
  };
  // console.log(data);
  return (
    <div>
      <div className="card bg-base-100 w-80 shadow-xl h-100">
        <figure>
          <img
            className="rounded-lg w-[200px] "
            src={photoUrl}
            alt="user-photo"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {age && gender && <p>{age + ", " + gender}</p>}
          <p>{about}</p>
          <p>{skills}</p>
          <div className="card-actions justify-end flex items-center">
            <button
              className="btn btn-primary"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Remove
            </button>
            <button
              className="btn btn-primary"
              onClick={() => handleSendRequest("interested", _id)}
            >
              Add Friend
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
