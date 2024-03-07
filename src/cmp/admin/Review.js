import React, { useEffect, useState } from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Table from 'react-bootstrap/Table';
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';
import { adminAllRate } from '../../Service/adminService';

export default function Review() {
  const [review, setReview]=useState([])
  useEffect(()=>{
    getReview()
  },[])

  //
  const getReview=()=>{
    var data = {};
     adminAllRate(data)
      .then(result=>{
        // console.log("response", result);
        if (result.data.success) {
          toast.success(result.data.message);
          setReview(result.data.response);
          
          
        } else {
          toast.error(result.data.message);
        }
      })
      
  }



  return (
    <>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>User Name</th>
          <th>Course Name</th>
          <th>Feedbacks</th>
          <th>Reviews</th>
        </tr>
      </thead>
      <tbody>
      {review.map((review, i) => (
        <tr>
          <td>{i+1}</td>
          <td>{review.userName}</td>
          <td>{review.courseName}</td>
          <td>{review.retText} </td>
          <td><Rating name="size-medium" value={review.rating} readOnly /></td>
        </tr>
      ))}
      </tbody>
    </Table>
    <ToastContainer/>
    </>
  );
}
