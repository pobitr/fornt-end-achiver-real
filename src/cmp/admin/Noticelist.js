import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';




export default function Noticelist() {
    const [noticeList, setnoticeList] = useState([]);

    useEffect(() => {
        getNotice()

    }, []);


    const getNotice = () => {

        var data = {}

        axios.post('http://localhost:8080/api/notice/allNotice', data).then(function (response) {
            console.log('response', response);
            if (response.data.success) {
                toast.success(response.data.message);
                setnoticeList(response.data.response)
            }
            else {
                toast.error(response.data.message);
            }
        })
            .catch(function (error) {
                console.log(error);
            });
    }
    return (
        <div>
            <h1>Notice List</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Notice Name</th>
                        <th>Notice Details</th>
                        <th>Post Time</th>
                        <th>Actions</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {
                        noticeList.map((notice, i)=>(
                    <tr>
                        
                        <td>{i+1}</td>
                        <td>{notice.noticeTitle}</td>
                        <td>{notice.noticeDesc}</td>
                        <td>{notice.created_at}</td>
                        
                        
                    </tr>
                        )
                        )
                    }
                </tbody>
            </Table>


            <ToastContainer />
        </div>
    )
}