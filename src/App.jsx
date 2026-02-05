import { Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "./Layout";
import Home from "./Home";
import LoginPart from "./LoginPart";
import SignupPart from "./SignupPart";
import OtpVerification from "./OtpVerification";
import CompanyTable from "./company/CompanyTable";
import CompanyForm from "./company/CompanyForm";
import Cookies from "js-cookie";
import Logout from "./Logout";

function App() {

  return (
      <Routes>
      <Route path="/login" element={<LoginPart />} />
      <Route path="/signup" element={<SignupPart />} />
      <Route path="/otpverification/:email" element={<OtpVerification />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/home" />} />
        <Route path="/:moduleName" element={<Home />} />
        <Route path="/companies" element={<CompanyTable />} />
        <Route path="/company-form" element={<CompanyForm />} />
         <Route path="/logout" element={<Logout />} />
        </Route>
      </Routes>
  );
}

export default App;
