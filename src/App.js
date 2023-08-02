import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "react-notifications/lib/notifications.css";
import "./App.css";

import AdminDashboard from "./cmp/admin/AdminDashboard";
import Adminlogin from "./cmp/Adminlogin";
import Drawer from "./cmp/admin/Drawer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Protected from "./cmp/Protected";
import Dashboard from "./cmp/admin/Dashboard";
import DashboadHome from "./cmp/admin/DashboardHome";
import Addcourses from "./cmp/admin/Addcourses";
import Courselist from "./cmp/admin/Courselist";
import AddNotice from "./cmp/admin/AddNotice";
import Noticelist from "./cmp/admin/Noticelist";
import Noticeedit from "./cmp/admin/Noticeedit";

function App() {
  return (
    <>
      {/* <AdminDashboard/> */}
      {/* <Adminlogin /> */}
      {/* <Drawer /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Adminlogin />}></Route>

          <Route
            path="/dashboard/*"
            element={
              <Protected Cmp={Dashboard}>
                <Dashboard />
              </Protected>
            }
          >
            <Route path="dashboardhome" element={<DashboadHome />} />
            <Route path="addcourses" element={<Addcourses />} />
            <Route path="courselist" element={<Courselist />} />
            <Route path="addnotice" element={<AddNotice />} />
            <Route path="noticelist" element={<Noticelist />} />
            <Route path="noticeedit/:id" element={<Noticeedit />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
