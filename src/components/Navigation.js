import React from "react";
import { GiCow } from "react-icons/gi";

const Navigation = () => {
  const handleClick = () => {
    // Toggle the hidden class
    document.getElementById("dropdown").classList.toggle("hidden");
    document.getElementById("dropdown").classList.toggle("block");
  };

  return (
    <nav className="flex items-center justify-between flex-wrap bg-dark-bg p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <GiCow className="w-11 h-11 mr-2" />
        <span className="font-semibold text-xl tracking-tight">Mooovies</span>
      </div>
      <div className="block lg:hidden" onClick={handleClick}>
        <button className="flex items-center px-3 py-2 border rounded text-white border-white hover:text-white hover:border-white">
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div
        className="hidden w-full flex-grow lg:flex lg:items-center lg:w-auto lg:flex-grow-0"
        id="dropdown"
      >
        <div className="text-sm lg:flex-grow">
          <a
            href="#responsive-header"
            className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4"
          >
            Nothing
          </a>
          <a
            href="#responsive-header"
            className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4"
          >
            In
          </a>
          <a
            href="#responsive-header"
            className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white"
          >
            Here!
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
