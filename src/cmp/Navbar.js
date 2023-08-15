import React, { useEffect, useState } from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ContactPageOutlinedIcon from "@mui/icons-material/ContactPageOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { useNavigate } from "react-router-dom";
import { getUserName } from "../Service/common";


export default function Navbar() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const navigate = useNavigate();
  
    const goto = (path) => {
      navigate(path);
    };
    const logout = () => {
        localStorage.clear();
        navigate("/");
      };
  return (
    <>
      <div
        style={{
          width: "99.2vw",
          backgroundColor: "#e3f2fd",
          fontFamily: "'Edu SA Beginner', cursive",
          fontSize: "1.5rem",
          position: "sticky",
          top: "-1px",
          zIndex: "2",
        }}
      >
        <nav className="navbar navbar-expand-lg ">
          <div className="container-fluid ">
            <a
              className="navbar-brand h1"
              onClick={()=>{goto("/");}}
              style={{ fontFamily: "'Lobster', cursive", fontSize: "2rem" }}
            >
              Achiever Solutions
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    aria-current="page"
                   
                    onClick={()=>{goto("/");}}
                    style={{cursor:'pointer'}}
                  >
                    <HomeOutlinedIcon style={{ marginBottom: "5px" }} /> Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#notices"
                  style={{cursor:'pointer'}}>
                    <NotificationsNoneOutlinedIcon
                      style={{ marginBottom: "5px" }}
                    />{" "}
                    Notices
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#courses"
                  style={{cursor:'pointer'}}>
                    <AutoStoriesOutlinedIcon style={{ marginBottom: "5px" }} />{" "}
                    Courses
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#about"
                  style={{cursor:'pointer'}}>
                    <InfoOutlinedIcon style={{ marginBottom: "5px" }} /> About
                    us
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#contactus"
                  style={{cursor:'pointer'}}>
                    <ContactPageOutlinedIcon style={{ marginBottom: "5px" }} />{" "}
                    Contact us
                  </a>
                </li>
              </ul>
              <form className="mx-5" role="search">
                <div>
                  {localStorage.getItem("user-info") ? (
                    <span className="mx-2">
                      Hello {getUserName().response.userName}{" "}
                      
                      <button
                        type="button"
                        className="btn btn-outline-dark "
                        style={{ fontSize: "1.2rem" }}
                        
                      >
                        
                        <Button
                        id="fade-button"
                        aria-controls={open ? "fade-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleClick}
                      >
                       Menu
                      </Button>
                      <Menu
                        id="fade-menu"
                        MenuListProps={{
                          "aria-labelledby": "fade-button",
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        TransitionComponent={Fade}
                      >
                        <MenuItem onClick={()=>{goto("/userprofile")}}>Profile</MenuItem>

                        <MenuItem onClick={logout}><LogoutIcon
                          style={{ marginBottom: "5px" }}
                        />{" "}Logout</MenuItem>
                      </Menu>
                      </button>
                    </span>
                  ) : (
                    <>
                      <button
                        type="button"
                        className="btn btn-primary mx-3"
                        style={{ fontSize: "1.3rem" }}
                        onClick={() => {
                          goto("/login");
                        }}
                      >
                        <LoginOutlinedIcon /> Login
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-dark "
                        style={{ fontSize: "1.2rem" }}
                        onClick={() => {
                          goto("/signup");
                        }}
                      >
                        <PersonAddOutlinedIcon
                          style={{ marginBottom: "5px" }}
                        />{" "}
                        Signup
                      </button>{" "}
                    </>
                  )}
                </div>
              </form>
            </div>
          </div>
        </nav>
      </div>
    </>
  )
}
