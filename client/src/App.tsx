import { Route, Routes } from "react-router-dom";
import CustomerLogin from "./pages/customerLogin";
import CustomerRegister from "./pages/customerRegister";
import DriverLogin from "./pages/driverLogin";
import DriverRegister from "./pages/driverRegister";
import Home from "./pages/home";
import BasicLayout from "./layout/basicLayout";
import AuthLayout from "./layout/authLayout";
import Dashboard from "./pages/dashborad";

function App() {
  return (
    <Routes>
      <Route element={<BasicLayout/>}>
      <Route path="/" element={<Home />} />
      <Route path="/customerlogin" element={<CustomerLogin />} />
      <Route path="/customerregister" element={<CustomerRegister />} />
      <Route path="/driverlogin" element={<DriverLogin />} />
      <Route path="/driverregister" element={<DriverRegister />} />
      </Route>

      <Route element={<AuthLayout/>}>
      <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
   
  );
}

export default App;
