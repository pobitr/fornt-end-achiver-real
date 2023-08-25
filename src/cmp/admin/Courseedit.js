import React, { useEffect, useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";

export default function Courseedit() {
  useEffect(() => {
    getData();
  }, []);
  let { id } = useParams();

  const [course, setCourse] = useState([]);

  const [courseCode, setcourseCode] = useState("");
  const [courseName, setcourseName] = useState("");
  const [courseDuration, setcourseDuration] = useState("");
  const [certificateAvailable, setcertificateAvailable] = useState("");
  const [courseDescription, setcourseDescription] = useState("");
  const [fileName, setFileName] = useState("");
  

  const onSubmit = () => {
    if(fileName==""){
      toast.error("Please Enter Course Image inshert!", {
        position: toast.POSITION.BOTTOM_CENTER
      });
    return false;

    }
    var data = {
      id: id,
      courseCode: courseCode,
      courseName: courseName,
      courseDuration: courseDuration,
      certificateAvailable: certificateAvailable,
      courseDescription: courseDescription,
      fileName: fileName,
      
    };
    console.log(data);

    axios
      .post("http://localhost:8080/api/course/courseUpdate", data)
      .then(function (response) {
        console.log("response", response);
        if (response.data.success) {
          toast.success(response.data.message);
          setcourseCode("");
          setcourseName("");
          setcourseDuration("");
          setcertificateAvailable("");
          setcourseDescription("");
        } else {
          toast.error(response.data.message);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  function showUpload() {
    const image = document.getElementById("file");
    image.click();
  }
  function uploadImg() {
    console.log(".......");
    const image = document.getElementById("file");
    const file = image.files;
    console.log(file);
    if (file) {
      // const reader = new FileReader();
      // reader.readAsDataURL(file[0])
      const fileData = new FormData();
      fileData.append("file", file[0]);
      fetch("http://localhost:8080/api" + "/upload", {
        method: "POST",
        body: fileData,
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          if (data.success) {
            setFileName(data.fileName);
          }
        });
    }
  }

  //
  const getData = () => {
    var data = {
      id: id,
    };
    axios
      .post("http://localhost:8080/api/course/courseDetails", data)
      .then(function (response) {
        console.log("response", response);
        setCourse(response.data.response);
        setcourseCode(response.data.response.courseCode);
        setcourseName(response.data.response.courseName);
        setcourseDuration(response.data.response.courseDuration);
        setcertificateAvailable(response.data.response.certificateAvailable);
        setcourseDescription(response.data.response.courseDescription);
        // setFileName(response.data.response.fileName);
        
      })
      .catch(function (error) {
        console.log(error);
      });
  };
 

  return (
    <>
      <div style={{ margin: "auto", width: "60%", padding: "10px" }}>
        <h1>Update Course</h1>
        <hr />
        <FloatingLabel
          controlId="floatingInput"
          label="Course Code"
          className="mb-3"
        >
          <Form.Control
            type="text"
            placeholder="Course Code"
            value={courseCode}
            onChange={(e) => {
              setcourseCode(e.target.value);
            }}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingPassword"
          label="Course Name"
          className="mb-3"
        >
          <Form.Control
            type="text"
            placeholder="Course Name"
            value={courseName}
            onChange={(e) => {
              setcourseName(e.target.value);
            }}
          />
        </FloatingLabel>
        <Form.Select
          aria-label="Default select example"
          className="mb-3"
          value={courseDuration}
          onChange={(e) => {
            setcourseDuration(e.target.value);
          }}
        >
          <option>Course Duration (months & years)</option>
          <option value="1">1 month</option>
          <option value="2">3 months</option>
          <option value="3">6 months</option>
          <option value="12">1 year</option>
          <option value="24">2 years</option>
        </Form.Select>
        <Form.Select
          aria-label="Default select example"
          className="mb-3"
          value={certificateAvailable}
          onChange={(e) => {
            setcertificateAvailable(e.target.value);
          }}
        >
          <option>Course Certificate Available</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </Form.Select>
        <FloatingLabel
          controlId="floatingTextarea2"
          label="Description"
          className="mb-3"
        >
          <Form.Control
            as="textarea"
            placeholder="Leave a comment here"
            style={{ height: "100px" }}
            value={courseDescription}
            onChange={(e) => {
              setcourseDescription(e.target.value);
            }}
          />
        </FloatingLabel>
        <div style={{ display: "flex" }}>
        <Form.Group controlId="formFile" className="mb-3" style={{ marginRight: "30px" }}>
          <input
            type="file"
            id="file"
            onChange={uploadImg}
            style={{ display: "none" }}
            accept="image/jpg,image/jpeg"
            
          />

          <Button variant="outline-dark" onClick={showUpload}>
            Image Update
          </Button>
        </Form.Group>
       
            </div>
        <hr />
        <Button
          variant="primary"
          onClick={onSubmit}
          style={{ marginLeft: "50%" }}
        >
          Update
        </Button>{" "}
        <br />
        <br />
      </div>

      <ToastContainer />
    </>
  );
}
