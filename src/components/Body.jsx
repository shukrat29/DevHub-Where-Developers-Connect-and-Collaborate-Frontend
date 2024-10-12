import React, { useEffect } from "react";
import NavBar from "./NavBar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    if (userData) return;
    try {
      const res = await axios.get(
        import.meta.env.VITE_BASE_URL + "/profile/view",
        {
          withCredentials: true,
        }
      );

      // updating store
      dispatch(addUser(res.data));
    } catch (error) {
      // if token is expired
      if (error.status == 401) {
        Navigate("/login");
      }

      console.error(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-grow">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default Body;
