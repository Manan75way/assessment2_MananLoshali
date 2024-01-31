import { Navigate, Outlet } from "react-router-dom";
// import { useAppDispatch, useAppSelector } from "../store/store";
import { useEffect } from "react";
import { useAppSelector } from "../store/store";
// import { userLogin } from "../store/reducers/userReducer";

const BasicLayout = () => {
  //   const dispatch = useAppDispatch();

  //   useEffect(() => {
  //     const data: any = localStorage.getItem("user");

  //     const parsedData = JSON.parse(data);
  //     if (parsedData) {
  //       const userData: LUser = {
  //         name: parsedData?.name,
  //         email: parsedData?.email,
  //         token: parsedData?.token,
  //       };
  //       dispatch(userLogin(userData));
  //     }
  //   }, []);

  //   const token = useAppSelector((state) => state.user.token);
  const token  = useAppSelector(state=>state.user.token)
  //   console.log(token);

  return token ? <Navigate to="/dashboard" /> : <Outlet />;
};

export default BasicLayout;
