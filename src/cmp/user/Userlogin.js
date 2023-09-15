import React, {useEffect, useState} from "react";
import login from "../images/login.svg";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar.js";
import { userLog } from "../../Service/userAuth";

export default function Userlogin() {
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [showPassword,setShowPassword] = useState(false);
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    useEffect(()=>{
        if (localStorage.getItem("user-info")) {
            navigate("/user/UserHome");
          }
    },[])
    const showPass = ()=>{
        if(showPassword){
            setShowPassword(false)
        }
        else{
            setShowPassword(true)
        }
    }
    const navigate =useNavigate();
    const goto =(path)=>{
        navigate(path);
    }

    const onSubmit =()=>{
        if (username.trim()) {
            if (!username.trim().match(mailformat)) {
              toast.error("Please Enter Email special characters mail formate (xxxx@.xxxxx.com) !", {
                position: toast.POSITION.BOTTOM_CENTER
              });
            return false;
           }
          }

        if (username == '') {
            toast.error("Please Enter Email !", {
                position: toast.POSITION.BOTTOM_CENTER
              });
            return false;
        }
        if (password == '') {
            toast.error("Please Enter Password !", {
                position: toast.POSITION.BOTTOM_CENTER
              });
            return false;
        }
        var data ={
            userEmail:username,
            UserPassword:password
        }
        
        userLog(data).then(result=>{
          if (result.data.success) {
            toast.success(result.data.message);
            localStorage.setItem("user-info", JSON.stringify(result.data));
            navigate("/user/UserHome");

          } else {
            toast.error(result.data.message);
          }

        })
        
    }
    return (
        <>
            <Navbar/>
            
            <div className="body">
                <div className="wrapper">
                    <h1>Login</h1>
                    <div className="container">
                        <input type="text" className="formInput" placeholder=" " onChange={(e)=>{setUsername(e.target.value)}}/>
                        <label htmlFor>Email</label>
                    </div>
                    <div className="container">
                        <input type={showPassword ? "text" : "password"} className="formInput" id="userPass" placeholder=" " onChange={(e)=>{setPassword(e.target.value)}}/>
                        <label htmlFor>Password</label>
                        <div className="show">
                        {showPassword ?  <VisibilityIcon style={{cursor:"pointer"}} onClick={showPass}/>  : <VisibilityOffIcon style={{cursor:"pointer"}} onClick={showPass}/> }
                        </div>
                    </div>
                    <a href="#">Forget password?</a>
                    <input className="button" type="submit" value="Login" onClick={onSubmit}/>
                    <p>Don't have an account? <a className="anchor" style={{cursor:'pointer'}} onClick={()=>{goto("/signup");}}>Signup</a></p>
                </div>
                <img src={login}/>
            </div>
            <ToastContainer/>
        </>
    )
}