import React from "react";
import NavItem from "./NavItem";
import { getFromLocalStorage } from "helpers/storage";
import authApi from "apis/auth";
import { setToLocalStorage } from "helpers/storage";
import { resetAuthTokens } from "apis/axios";

const NavBar = () => {
  const userName = getFromLocalStorage("username");
  console.log(typeof userName, userName);

  const handleLogin = () => {};

  const handleLogOut = async () => {
    try {
      await authApi.logout();
      setToLocalStorage({
        authToken: null,
        email: null,
        userId: null,
        username: null
      });
      resetAuthTokens();
      window.location.href = "/";
    } catch (err) {
      logger.error(err);
    }
  };

  return (
    <nav className="bg-white shadow">
      <div className="px-2 mx-auto max-w-7xl sm:px-4 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex px-2 lg:px-0">
            <div className="flex">
              <NavItem name="Polly" path="/" />
              <NavItem
                name="Create"
                iconClass="ri-add-fill"
                path="/polls/create"
              />
            </div>
          </div>
          <div className="flex items-center justify-end">
            {userName && userName !== "undefined" && userName !== "null" ? (
              <a
                className="inline-flex items-center px-1 pt-1 text-sm
             font-semibold leading-5 text-bb-gray-600 text-opacity-50
             transition duration-150 ease-in-out border-b-2
             border-transparent"
              >
                {userName}
              </a>
            ) : null}
            <a
              className="inline-flex items-center px-1 pt-1 text-sm
             font-semibold leading-5 text-bb-gray-600 text-opacity-50
             transition duration-150 ease-in-out border-b-2
             border-transparent hover:text-bb-gray-600 focus:outline-none
             focus:text-bb-gray-700 cursor-pointer"
              onClick={
                userName && userName !== "undefined" && userName !== "null"
                  ? handleLogOut
                  : handleLogin
              }
            >
              {userName && userName !== "undefined" && userName !== "null"
                ? "Logout"
                : "Login"}
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
