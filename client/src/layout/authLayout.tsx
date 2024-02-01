import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { setUser } from "../store/reducer/userReducer";

const AuthLayout = (): any => {
  const userType = useAppSelector((state) => state.user.type);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const data: any = localStorage.getItem("user");

    const parsedData = JSON.parse(data);
    if (parsedData) {
      const userData: any = {
        name: parsedData?.name,
        email: parsedData?.email,
        token: parsedData?.token,
        id: parsedData?.id,
        type: parsedData?.type,
      };
      dispatch(setUser(userData));
    }
  }, []);

  const token = useAppSelector((state) => state.user.token);
  console.log(token);
  

  return token ? <Outlet /> : <Navigate to="/" />;
};

export default AuthLayout;
