import { Route, Routes } from "react-router-dom";
import CustomerLogin from "./pages/customerLogin";
import CustomerRegister from "./pages/customerRegister";
import DriverLogin from "./pages/driverLogin";
import DriverRegister from "./pages/driverRegister";
import Home from "./pages/home";
import BasicLayout from "./layout/basicLayout";
import AuthLayout from "./layout/authLayout";
import Dashboard from "./pages/dashborad";
import RegisterVehicle from "./pages/registerVehicle";
import VehicleStatus from "./pages/vehicleStatus";
import FindCab from "./pages/findCab";
import { useAppSelector } from "./store/store";

function App() {
  const userType = useAppSelector((state) => state.user.type);
console.log(userType);

  return (
    <Routes>
      <Route element={<BasicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/customerlogin" element={<CustomerLogin />} />
        <Route path="/customerregister" element={<CustomerRegister />} />
        <Route path="/driverlogin" element={<DriverLogin />} />
        <Route path="/driverregister" element={<DriverRegister />} />
      </Route>

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
    </Routes>
  );
}

export default App;
