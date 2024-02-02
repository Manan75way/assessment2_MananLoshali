import { Route, Routes } from "react-router-dom";
import CustomerLogin from "./pages/customerLogin";
import CustomerRegister from "./pages/customerRegister";
import DriverLogin from "./pages/driverLogin";
import DriverRegister from "./pages/driverRegister";
import Home from "./pages/home";
import BasicLayout from "./layout/basicLayout";
import AuthLayout from "./layout/authLayout";
import RegisterVehicle from "./pages/registerVehicle";
import VehicleStatus from "./pages/vehicleStatus";
import FindCab from "./pages/findCab";
import { useAppDispatch, useAppSelector } from "./store/store";
import { useEffect } from "react";
import { setUser } from "./store/reducer/userReducer";

function App() {
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

  const userType = useAppSelector((state) => state.user.type);

  return (
    <Routes>
      <Route element={<AuthLayout />}>
        {userType === "customer" ? (
          <Route path="/findCabs" element={<FindCab />} />
        ) : (
          <>
            <Route path="/setstatus" element={<VehicleStatus />} />
            <Route path="/registervehicle" element={<RegisterVehicle />} />
          </>
        )}
      </Route>
      <Route element={<BasicLayout />}>
        <Route path="/customerlogin" element={<CustomerLogin />} />
        <Route path="/" element={<Home />} />
        <Route path="/customerregister" element={<CustomerRegister />} />
        <Route path="/driverlogin" element={<DriverLogin />} />
        <Route path="/driverregister" element={<DriverRegister />} />
      </Route>
    </Routes>
  );
}

export default App;
