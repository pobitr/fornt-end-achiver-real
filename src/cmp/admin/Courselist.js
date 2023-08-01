import React, { useState,useEffect } from 'react';

import Table from 'react-bootstrap/Table';
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';



export default function Courselist() {
  const[courseList, setcourseList]=useState([])

  useEffect(() => {
    getNotice()

}, []);


const getNotice = () => {

    var data = {}

    axios.post('http://localhost:8080/api/course/allcourse', data).then(function (response) {
        console.log('response', response);
        if (response.data.success) {
            toast.success(response.data.message);
            setcourseList(response.data.response)
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
      <h1>Course List</h1>
      <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Course Code</th>
                        <th>Course Name</th>
                        <th>Course Duration (Mouth)</th>
                        <th>Course Description</th>
                        <th>Images</th>
                        <th>Actions</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {
                        courseList.map((course, i)=>(
                    <tr>
                        
                        <td>{i+1}</td>
                        <td>{course.courseCode}</td>
                        <td>{course.courseName}</td>
                        <td>{course.courseDuration}</td>
                        <td>{course.courseDescription}</td>
                        
                        
                    </tr>
                        )
                        )
                    }
                </tbody>
            </Table>

      <ToastContainer/>
    </div> 
  )
}