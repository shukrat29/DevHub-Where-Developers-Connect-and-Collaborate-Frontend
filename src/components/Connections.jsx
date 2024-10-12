import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import UserCard from "./UserCard";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const fetchConnections = async () => {
    try {
      const res = await axios.get(
        import.meta.env.VITE_BASE_URL + "/user/connections",
        { withCredentials: true }
      );
      dispatch(addConnections(res.data.data));
      console.log(res);
    } catch (error) {
      // handle error case
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;
  if (connections.length == 0) return <h1>No Friends found</h1>;
  return (
    connections && (
      <div>
        <h1 className="text-bold text-2xl text-center">Friends</h1>
        <div className="flex justify-center my-6">
          <div>
            {connections.map((connection) => {
              const { firstName, lastName, photoUrl, age, gender, about } =
                connection;

              return (
                <div className="flex m-4 p-4 bg-gray-300 rounded-lg items-center gap-4 ">
                  <div>
                    <img className="rounded-full" alt="photo" src={photoUrl} />
                  </div>
                  <div>
                    <h2 className="font-bold">{firstName + " " + lastName}</h2>
                    {age && gender && <p>{age + " " + gender}</p>}
                    <p>{about}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    )
  );
};

export default Connections;
