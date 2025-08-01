import { Route, Router, Routes } from "react-router-dom";
import Register from "./Auth/Register";
import Home from "./User/Hero/Home";
import VerifyOTP from "./Auth/Otp";
import UserPanel from "./User/UserPanel";
import ProtectedRoute from "./Utils/ProtectedRoutes";
import Login from "./Auth/Login";
import CustomRouters from "./Router/CustomRouters";
import Footer from "./User/Features.jsx/Footer";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/*" element={<CustomRouters />} />
        <Route
          path="/user/*"
          element={
            <ProtectedRoute allowedRoles={["ROLE_USER"]}>
              <UserPanel />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer/>
    </>
  );
};

export default App;
