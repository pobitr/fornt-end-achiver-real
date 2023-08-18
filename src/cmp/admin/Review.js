import React, { useEffect, useState } from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Table from 'react-bootstrap/Table';
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';

export default function Review() {
  const [review, setReview]=useState([])
  useEffect(()=>{
    getReview()
  },[])

  //
  const getReview=()=>{
    var data = {};
    axios
      .post("http://localhost:8080/api/review/allAdminReview", data)
      .then(function (response) {
        console.log("response", response);
        if (response.data.success) {
          toast.success(response.data.message);
          setReview(response.data.response);
          
          
        } else {
          toast.error(response.data.message);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
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
