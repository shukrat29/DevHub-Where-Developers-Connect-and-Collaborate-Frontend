import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/RequestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        import.meta.env.VITE_BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
      console.log(res);
    } catch (error) {}
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        import.meta.env.VITE_BASE_URL + "/user/requests/received",
        { withCredentials: true }
      );
      // console.log(res);
      dispatch(addRequests(res.data.data));
    } catch (error) {}
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests.length == 0) return <h1>No requests found</h1>;

  return (
    <div>
      <h1 className="font-bold text-center">Connection Requests</h1>
      {requests.map((request) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          request.fromUserId;
        return (
          <div
            key={_id}
            className="flex m-4 p-4 rounded-lg bg-base-300  items-center gap-4 w-1/2"
          >
            <div>
              <img className="w-20 h-20 rounded-full" src={photoUrl} alt="" />
            </div>
            <div>
              <h2 className="font-bold">{firstName + " " + lastName}</h2>
              {age && gender && <p>{age + " " + gender}</p>}
              <p>{about}</p>
            </div>
            <div className="flex gap-2 ">
              <button
                className=" text-white bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                onClick={() => reviewRequest("rejected", request._id)}
              >
                Reject
              </button>
              <button
                className=" text-white bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                onClick={() => reviewRequest("accepted", request._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
