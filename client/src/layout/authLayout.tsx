import { Navigate, Outlet } from "react-router-dom";
// import { useAppSelector } from "../store/store";
import { useEffect, useState } from "react";
import { useAppSelector } from "../store/store";

const AuthLayout = ():any => {
  //   useEffect(() => {
  //     const data = localStorage.getItem("user");
  //     console.log(data);
  //   }, []);

  // const token = useAppSelector((state) => state.use
  //   const token = useAppSelector((state)=>state.user.token)

  const token = useAppSelector((state) => state.user.token);

  return token ? <Outlet /> : <Navigate to="/" />;
};

export default AuthLayout;
