import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import AdminDashboard from './cmp/admin/AdminDashboard';
import Adminlogin from './cmp/Adminlogin';
import Drawer from './cmp/admin/Drawer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Protected from './cmp/Protected';
import Dashboard from './cmp/admin/Dashboard';
import DashboadHome from './cmp/admin/DashboardHome';


function App() {
  return (
    <>
    
    {/* <AdminDashboard/> */}
    {/* <Adminlogin /> */}
    {/* <Drawer /> */}
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Adminlogin/>}>

      </Route>

      <Route
            path="/dashboard/*"
            element={
              <Protected Cmp={Dashboard}>
                <Dashboard />
              </Protected>
            }
          >
            <Route path="dashboardhome" element={<DashboadHome/>}/>
            
          </Route>

      
    </Routes>
    
    </BrowserRouter>

    
    </>
  );
}

export default App;
