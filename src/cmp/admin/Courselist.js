import React, { useState,useEffect } from 'react';
import Button from "react-bootstrap/Button";
import Table from 'react-bootstrap/Table';
import { ToastContainer, toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



export default function Courselist() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const[courseList, setcourseList]=useState([])

  const navigate=useNavigate('');
  const goto =(path)=>{
    navigate(path);
  }

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

const onDelete = (id) => {
  var data = {
    id: id,
  };
  axios
    .post("http://localhost:8080/api/course/courseDelete", data)
    .then(function (response) {
      console.log("response", response);
      if (response.data.success) {
        toast.success(response.data.message);
        getNotice();
        setShow(false);
      } else {
        toast.error(response.data.message);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};
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
                        <td><img src={'http://localhost:8080/images/'+course.fileName} style={{width:'40px', heigh:'40px' }}></img></td>
                        <td><Button
                  variant="outline-primary"
                  onClick={() => {
                    goto("/dashboard/courseedit/" + course.id);
                  }}
                >
                  Edit
                </Button>{" "}
                <Button variant="outline-warning" onClick={handleShow}>
                  Delete
                </Button>
                <Modal
                  show={show}
                  onHide={handleClose}
                  style={{ marginTop: "50px" }}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Course Delete !!</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>Are You sure !</Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button variant="outline-warning" onClick={() => onDelete(course.id)}>
                  Delete
                </Button>
                  </Modal.Footer>
                </Modal>
                </td>
                        
                        
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