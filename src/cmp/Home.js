import React, { useEffect, useState } from "react";
import about from "./images/about.svg";
import contact from "./images/contact.svg";
import fb from "./images/facebook-square-color-icon.svg";
import linkedin from "./images/linkedin-square-color-icon.svg";
import git from "./images/github-icon.svg";
import slider1 from "./images/slider1.jpg";
import slider2 from "./images/slider2.png";
import slider3 from "./images/slider3.png";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Navbar from './Navbar'
import Video from "./VideoA";
import { getAllCourse, getAllNotice } from "../Service/homeService";
import { BASE_URL } from "./urlConfig/Url";

export default function Home() {
  const [noticeList, setnoticeList] = useState([]);
  const [courseList, setcourseList] = useState([]);

  const navigate = useNavigate();

  const goto = (path) => {
    navigate(path);
  };

  useEffect(() => {
    
    getNotice();
    getCourse();
  }, []);

  const getNotice = () => {
    var data = {}
    getAllNotice(data).then(result => {
      setnoticeList(result.data.response)
    })
  }

  const getCourse = () => {
    var data = {}
    getAllCourse(data).then(result=>{
      setcourseList(result.data.response)
    })
  }
  return (
    <>
    <div>
      <Navbar/>
      

      {/* heroSection */}
      <div
        id="hero"
        className="border-5"
        style={{ width: "99vw", margin: "auto", marginTop: "8px" }}
      >
        <div id="carouselExampleCaptions" className="carousel slide">
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to={0}
              className="active"
              aria-current="true"
              aria-label="Slide 1"
              style={{backgroundColor:'black'}}
            />
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to={1}
              aria-label="Slide 2"
              style={{backgroundColor:'red'}}
            />
            <button
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to={2}
              aria-label="Slide 3"
              style={{backgroundColor:'blue'}}
            />
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active" style={{ }}id="carouselEl">
              <img
                style={{ height: "100%" }}
                src={slider1}
                className="d-block w-100"
                alt="..."
              />
              <div className="carousel-caption d-none d-md-block">
                
              </div>
            </div>
            <div className="carousel-item" style={{ }} id="carouselEl">
              <img
                style={{ height: "100%" }}
                src={slider2}
                className="d-block w-100"
                alt="..."
              />
              <div className="carousel-caption d-none d-md-block">
                
              </div>
            </div>
            <div className="carousel-item" style={{ }} id="carouselEl">
              <img
                style={{ height: "100%" }}
                src={slider3}
                className="d-block w-100"
                alt="..."
              />
              <div className="carousel-caption d-none d-md-block">
                
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      {/* aboutus */}
      <h1 className="mx-5 mt-3 p-3 text-success text-center">About Us</h1>

      <div className="d-flex justify-content-around" style={{}} id="Mainbody">
        <div id="about" className="aboutus" style={{  }}>
          <div className="d-flex justify-content-between mt-3">
            <img src={about} style={{width:"50%"}} />
            <div className="mx-3">
              <h3>
                Welcome to{" "}
                <span style={{ color: "red" }}>Achiever Solutions</span>
              </h3>
              <p>
                At Achiever Solutions we are dedicated to empowering individuals
                with the knowledge and skills needed to excel in the dynamic
                world of technology. We take pride in being a leading computer
                institute that offers comprehensive and industry-relevant
                courses to students of all ages and backgrounds.
              </p>
              <h3>Our Vision</h3>
              <p>
                Our vision is to bridge the digital divide by providing
                accessible and top-quality education in the field of computer
                science and technology. We aspire to create a learning
                environment that fosters creativity, innovation, and critical
                thinking, enabling our students to become future leaders and
                change-makers in the tech industry.
              </p>
            </div>
          </div>
        </div>

        <div
          id="notices"
          className="noitceBoard  border border-2 border-success rounded-1 text-center"
          
        >
          <h1 className="text-danger mb-3 border-bottom border-2 border-danger">
            Notice
          </h1>
          {noticeList.map((notice, i) => (
            <div>
              <dl style={{}}>
                <dt
                  style={{
                    textAlign: "center",
                    textTransform: "uppercase",
                    color: "#4CAF50",
                  }}
                >
                  {notice.noticeTitle}
                </dt>
                <dd>{notice.noticeDesc}</dd>
              </dl>
              <h6></h6>
              <p></p>
            </div>
          ))}
        </div>
      </div>
      <Video/>
          {/* Courses Section */}
      <div id="courses" className="mt-5 text-center text-success">
        <h1 className="mb-5">Courses</h1>

        <div className="d-flex flex-wrap justify-content-center gap-5">
          {courseList.map((course, i) => (
            <div className="card" style={{ width: "20rem" }}>
              <img
                src={BASE_URL+"/images/" + course.fileName}
                className="card-img-top"
                alt="..."
                height={200}
                width={400}
              />
              <div className="card-body">
                <h5 className="card-title">{course.courseName}</h5>
                <p className="card-text">{course.courseDescription}</p>
                <a onClick={()=>{goto("/login");}} className="btn btn-primary">
                  Go somewhere
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
            {/* contact us section */}
      <div
        id="contactus"
        className="my-5"
        style={{ backgroundColor: "lightgrey" }}
      >
        <h1 className="text-center text-success mb-5">Contact us</h1>
        <form >
        <div className="d-flex justify-content-center flex-wrap">
          <div className="form-container mb-5" style={{  }} id="formEL">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required />
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" required defaultValue={""} />
            <input type="submit" className="button" value="Submit" />
          </div>
          

          <div style={{ width: "40vw" }} className="formimg">
            <img src={contact} style={{ width: "90%", height: "100%" }}></img>
          </div>
        </div>
        </form>
      </div>
            {/* footer section */}
      <div className="mb-5">
        <footer className="d-flex flex-wrap justify-content-around border-top">
          <p className="col-md-4 mb-0 text-body-secondary mt-2">
            © 2023 Achiever Solutions, Inc
          </p>
          <div className="mt-2">
            <a href="#">
              <img
                className="mx-1 on-hover"
                src={git}
                alt="hey"
                width={35}
                height={35}
              />
            </a>
            <a href="#">
              <img
                className="mx-1 on-hover"
                src={linkedin}
                alt="hey"
                width={35}
                height={35}
              />
            </a>
            <a href="#">
              <img
                className="mx-1 on-hover"
                src={fb}
                alt="hey"
                width={35}
                height={35}
              />
            </a>
          </div>
        </footer>

        {/* Admin login button */}
        <div className="d-flex justify-content-end mx-5" id="AdminButton">
          <button
            className="btn btn-sm btn-outline-dark"
            onClick={() => {
              goto("/adminlogin");
            }}
          >
            Admin login
          </button>
        </div>
      </div>
      </div>
      <ToastContainer />
    </>
  );
}
