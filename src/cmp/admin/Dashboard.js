import React from "react";
import Drawer from "./Drawer";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  let userData = JSON.parse(localStorage.getItem("admin-info"));
  const navigate = useNavigate();

  return userData ? (
    <div>
      <Drawer />
    </div>
  ) : (
    <div>{navigate("/")}</div>
  );
}

export default Dashboard;
