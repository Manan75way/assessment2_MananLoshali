import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { setUser } from "../store/reducer/userReducer";

const BasicLayout = () => {
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
  const userType = useAppSelector((state) => state.user.type);
  const name = useAppSelector((state) => state.user.name);

  console.log(name);

  if (userType === "customer") {
    return token ? <Navigate to="/findCabs" /> : <Outlet />;
  } else {
    return token ? <Navigate to="/registervehicle" /> : <Outlet />;
  }
};

export default BasicLayout;
