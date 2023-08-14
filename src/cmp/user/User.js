import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";



function User() {
  let userData = JSON.parse(localStorage.getItem("user-info"));
  const navigate = useNavigate();

  return userData ? (
    <div>
      <Layout/>
    </div>
  ) : (
    <div>{navigate("/")}</div>
  );
}

export default User;
