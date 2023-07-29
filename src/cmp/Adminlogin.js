import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import InputAdornment from '@mui/material/InputAdornment';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import { ToastContainer, toast } from 'react-toastify';
import { Slide, Zoom, Flip, Bounce } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function Adminlogin() {
    const navigate = useNavigate();
    const [user, setUser] = useState("");
    // const [email, setEmail]= useState('');
    const [password, setpassword] = useState("");


    const onSubmit = () => {

        if (user == ''){
            toast.info('Enter Username', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
              return false;
        }
        if (password == ''){
            toast.info('Enter Password', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
              return false;
        }

        var data = {
            user:user,
            password: password,
        };

        console.log(data);

        axios
            .post("http://localhost:8080/api/admin/login", data)
            .then(function (response) {
                console.log('response',response);
                
                if (response.data.success) {
                    toast.success('Login Successful', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Flip
                    });
                    // toast.success(response.data.message);
                    localStorage.setItem("admin-info", JSON.stringify(response.data));
                    navigate("/dashboard/dashboardhome");
                } else {
                    toast.error(response.data.message);
                }
            })
            .catch(function (error) {
                console.log(error);
            });



    };
    return (
        <>
            <div >
                <h1 style={{ 'textAlign': 'center' }} >Admin Login Form</h1>
                <div className='form'>
                    {/* Username field*/}

                    <TextField
                        id="input-with-icon-textfield"
                        label="Username"
                        sx={{ width: '90%' }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircleOutlinedIcon />
                                </InputAdornment>
                            ),
                        }}
                        variant="standard"
                        value={user} onChange={(e) => { setUser(e.target.value) }}
                    /><br /><br />


                    {/* Password field */}

                    <TextField
                        id="input-with-icon-textfield"
                        label="Password"
                        sx={{ width: '90%' }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <VpnKeyOutlinedIcon />
                                </InputAdornment>
                            ),
                        }}

                        variant="standard"
                        value={password} onChange={(e) => { setpassword(e.target.value) }}
                    /><br /><br />

                    <Button variant="contained" sx={{}} onClick={onSubmit}>
                        Submit
                    </Button><br /><br />
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Flip}
            />
        </>
    )
}