import React, { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

export default function Addcourses() {
  const [courseCode, setcourseCode] = useState("");
  const [courseName, setcourseName] = useState("");
  const [courseDuration, setcourseDuration] = useState("");
  const [certificateAvailable, setcertificateAvailable] = useState("");
  const [courseDescription, setcourseDescription] = useState("");
  const [fileName, setFileName] = useState("");

  const onSubmit = () => {
    var data = {
      courseCode: courseCode,
      courseName: courseName,
      courseDuration: courseDuration,
      certificateAvailable: certificateAvailable,
      courseDescription: courseDescription,

      fileName: fileName,
    };
    console.log(data);

    axios
      .post("http://localhost:8080/api/course/addCourse", data)
      .then(function (response) {
        console.log("response", response);
        if (response.data.success) {
          toast.success(response.data.message);
          setcourseCode("");
          setcourseName("");
          setcourseDuration("");
          setcertificateAvailable("");
          setcourseDescription("");
          setFileName("");
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

  return (
    <>
    
      <div style={{ margin: "auto", width: "60%", padding: "10px" }}>
      <h1>Add Course</h1><hr/>
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
          value={courseDescription}
          onChange={(e) => {
            setcourseDescription(e.target.value);
          }}
        >
          <Form.Control
            as="textarea"
            placeholder="Leave a comment here"
            style={{ height: "100px" }}
          />
        </FloatingLabel>
        <Form.Group controlId="formFile" className="mb-3">
          <input
            type="file"
            id="file"
            onChange={uploadImg}
            style={{ display: "none" }}
            accept="image/jpg,image/jpeg"
          />

          <Button variant="outline-dark" onClick={showUpload}>
            Image Upload
          </Button>
        </Form.Group>
        <hr/>
        <Button
          variant="primary"
          onClick={onSubmit}
          style={{ marginLeft: "50%" }}
        >
          Submit
        </Button>{" "}
        <br />
        <br />
      </div>

      <ToastContainer />
    </>
  );
}
