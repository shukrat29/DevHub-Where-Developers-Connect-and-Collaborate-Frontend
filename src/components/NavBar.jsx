import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        import.meta.env.VITE_BASE_URL + "/logout",
        {},
        { withCredentials: true }
      );
      dispatch(removeUser());
      return navigate("/login");
    } catch (error) {}
  };
  return (
    <div className="navbar bg-blue-950 shadow-lg">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-3xl text-white">
          <img
            className="h-12 rounded-full"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR73df7crRMeE4RV_fZkOph3FftYqjc2jbemc_ISBT70w&s"
          />
          <h1>DEVHUB</h1>
        </Link>
      </div>
      {user && (
        <div className="flex-none gap-2">
          <div className="form-control text-white">
            Welcome, {user.firstName}
          </div>

          <div className="dropdown dropdown-end mx-6">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src={user.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-55 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  My Profile
                </Link>
              </li>
              <li>
                <Link to="/" className="justify-between">
                  Browse Feed
                </Link>
              </li>
              <li>
                <Link to="/connections" className="justify-between">
                  Friends
                </Link>
              </li>
              <li>
                <Link to="/requests" className="justify-between">
                  Requests
                </Link>
              </li>

              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
