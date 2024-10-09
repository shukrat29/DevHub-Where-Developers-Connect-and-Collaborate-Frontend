import React from "react";
import { useSelector } from "react-redux";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  return (
    <div className="navbar bg-blue-950 shadow-lg">
      <div className="flex-1">
        <a className="btn btn-ghost text-3xl text-white">
          <img
            className="h-12 rounded-full"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR73df7crRMeE4RV_fZkOph3FftYqjc2jbemc_ISBT70w&s"
          />
          <h1>DEVHUB</h1>
        </a>
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
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
