import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col bg-slate-600">
      <h1 className="text-orange-500 font-bold text-lg">
        Welcome to the world of travelling...
      </h1>
      <div className="w-100 h-100 flex flex-col gap-5">
        <h1 className="text-green-700 font-bold">Sign in as</h1>
        <div className="w-100 h-100 flex flex-col gap-5">
          <Link to="/driverlogin">
            <button className=" w-28 border cursor-pointer p-2 font-semibold text-lg rounded-lg">
              Driver
            </button>
          </Link>

          <Link to="/customerlogin">
            <button className="w-28 border cursor-pointer p-2 font-semibold text-lg rounded-lg">
              Customer
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
