import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/authpages/Signup";
import Login from "./pages/authpages/Login";
import ForgotPassword from "./pages/authpages/ForgotPassword";
import LandingPage from "./pages/userpages/LandingPage";
import Contact from "./pages/policypages/Contact";
import Privacy from "./pages/policypages/Privacy";
import Terms from "./pages/policypages/Terms";
import DashboardLayout from "./pages/userpages/DashboardLayout";
import Dashboard from "./pages/userpages/Dashboard";
import MemberDetails from "./pages/userpages/MemberDetails";
import Members from "./pages/userpages/Members";
import RecordPayment from "./pages/userpages/RecordPayment";
import Expenses from "./pages/userpages/Expenses";
import AddMember from "./pages/userpages/AddMember";
import TrainerProfile from "./pages/userpages/TrainerProfile";
import EditMember from "./pages/userpages/EditMember";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="layout" element={<DashboardLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="Members" element={<Members />} />
        <Route path="addmember" element={<AddMember />} />
        <Route path="members/:id/edit" element={<EditMember />} />
        <Route path="MembersDetails/:id" element={<MemberDetails />} />
        <Route path="recordpayment" element={<RecordPayment />} />
        <Route path="expenses" element={<Expenses />} />
        <Route path="profile" element={<TrainerProfile />} />
      </Route>
    </Routes>
  );
};

export default App;
