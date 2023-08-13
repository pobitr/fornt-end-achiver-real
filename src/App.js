import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "react-notifications/lib/notifications.css";
import "./App.css";
import axios from "axios";
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
import Loader from "./cmp/Loader";
import { useEffect, useState } from "react";
import Review from "./cmp/admin/Review";
import DownloadeCount from "./cmp/admin/DownloadeCount";
import Userslist from "./cmp/admin/Userslist";
import Courseedit from "./cmp/admin/Courseedit";
import ErrorPage from "./cmp/ErrorPage";
import Home from "./cmp/Home";
import Userlogin from "./cmp/user/Userlogin";
import Signup from "./cmp/user/Signup";
import CourseDesc from "./cmp/user/CourseDesc";
import Navbar from "./cmp/Navbar";


function App() {
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    axios.interceptors.request.use(
      function (config) {
        setLoader(true);
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      function (response) {
        
        setTimeout(() => {
          setLoader(false);
        }, 1000);
        return response;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
  }, []);
  return (
    <>
      <Loader show={loader} />
      {/* <AdminDashboard/> */}
      {/* <Adminlogin /> */}
      {/* <Drawer /> */}
      <BrowserRouter>
        <Routes>
          <Route path="adminlogin" element={<Adminlogin />}></Route>
          {/* <Route path="loader" element={<Loader />} /> */}
          <Route path="/" element={<Home/>} />
          <Route path="login" element={<Userlogin/>}/>
          <Route path="signup" element={<Signup/>}/>
          <Route path="course/:id" element={<CourseDesc/>}/>
          <Route path="navbar" element={<Navbar/>}/>


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
            <Route path="userslist" element={<Userslist/>} />
            <Route path="courselist" element={<Courselist />} />
            <Route path="courseedit/:id" element={<Courseedit/>} />
            <Route path="addnotice" element={<AddNotice />} />
            <Route path="noticelist" element={<Noticelist />} />
            <Route path="noticeedit/:id" element={<Noticeedit />} />
            <Route path="review" element={<Review />} />
            <Route path="Downloadcount" element={<DownloadeCount/>} />
          </Route>
          <Route path="*" element={<ErrorPage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
