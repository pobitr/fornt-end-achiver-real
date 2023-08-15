import React,{useState} from 'react';
import join from '../images/join.svg';
import axios from 'axios';
import { useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import fb from "../images/facebook-square-color-icon.svg";
import linkedin from "../images/linkedin-square-color-icon.svg";
import git from "../images/github-icon.svg";
import { useParams } from 'react-router-dom';
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DownloadIcon from '@mui/icons-material/Download';
import Button from 'react-bootstrap/Button';





export default function CourseDesc() {
  let {id} = useParams();
  const [courseList, setcourseList] = useState([]);
  const[courseCode,setcourseCode]=useState('');
  const[courseName, setcourseName]=useState('');
  const[courseDuration,setcourseDuration]=useState('');
  const[certificateAvailable,setcertificateAvailable]=useState('');
  const[courseDescription,setcourseDescription]=useState('');
  const [fileName, setFileName] = useState('');

  useEffect(()=>{
    getCourse();
    getData();
  },[])
  const getCourse = () => {
    var data = {};

    axios
      .post("http://localhost:8080/api/course/allcourse", data)
      .then(function (response) {
        console.log("response", response);
        if (response.data.success) {
          toast.success(response.data.message);
          setcourseList(response.data.response);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  //
  const getData =()=>{
    var data = {
      "id":id
    }
    axios.post('http://localhost:8080/api/course/courseDetails', data).then(function (response) {
              console.log('response', response);
              
              setcourseCode(response.data.response.courseCode)
              setcourseName(response.data.response.courseName)
              setcourseDuration(response.data.response.courseDuration)
              setcertificateAvailable(response.data.response.certificateAvailable)
              setcourseDescription(response.data.response.courseDescription)
              setFileName(response.data.response.fileName)
              
              
             
          })
              .catch(function (error) {
                  console.log(error);
              });
  }

  return (
    <>
      
      <div style={{ backgroundColor: "#f1f1fa", width: "100vw", padding: "2rem",marginTop:".5rem" }}>
        {/* Course title will go here */}
        <p style={{ fontFamily: "ubuntu", textAlign: "center", fontSize: "3rem" }}>{courseName}</p>
        {/* course descriptions first line will go here */}
        <p style={{ fontFamily: "ubuntu", textAlign: "center", fontSize: "1.2rem" }}>{courseDescription}</p>
      </div>
     
            
      {/* Course Desc and join button*/}

      <div className="d-flex flex-column m-auto" style={{ marginTop: "1rem", width: "70vw",gap: '2rem',padding: "20px" }}>
        <div className="d-flex" style={{gap: "5rem", width: "100%" }}>
          <div className="d-flex flex-column" style={{width: "100%" }}>
            <h2 style={{ color: "red", marginBottom: "1rem" }}>About this course</h2>
            {/* course full description will go here */}
            <p style={{ textAlign: "justify" }}>Where can I get some?
              There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>

          </div>
          <img src={join} style={{ width: "30%" }} />
        </div>
        <div>
          <button className='button buttonCD'>Join Course for free</button>
        </div>
      </div>

      {/* Course duration and course fee */}
      <div className='d-flex m-auto border mt-5 bg-primary-subtle text-dark p-4 justify-content-around' style={{width:"70vw"}}>
        <div className='d-flex gap-1 border'>
        <AccessTimeIcon fontSize="large"  color="success"/>
        <h3>Duration: {courseDuration} Month</h3>
        </div>

        <div className='d-flex gap-1'>
        <CurrencyRupeeOutlinedIcon fontSize="large" color="success"/>
        <h3>Course Fee: Free</h3>
        </div>

        <div className='d-flex gap-1'>
        <CheckCircleOutlinedIcon fontSize="large" color="success"/>
        <h3>Beginner Friendly</h3>
        </div>
        
      </div>
      {/* Dolwnloaded option */}
      <Button variant="outline-dark" style={{marginLeft:"70px"}}><a href={'http://localhost:8080/images/' + fileName} download>
       Download PDF <DownloadIcon/>
      </a></Button>
      
      



      {/* Feedback form */}

      <div id="contactus" className="my-5 m-auto" style={{ backgroundColor: "lightgrey",width:"70vw" }}>
        <h1 className="text-center text-danger mb-5">Write your Review</h1>
        <div className="d-flex justify-content-center flex-wrap">
          <div className="form-container mb-5" style={{ width: "55vw" }}>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required />
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
            <label htmlFor="message">Review/Suggestion</label>
            <textarea id="message" name="message" required defaultValue={""} />
            <input type="submit" className="button" value="Submit" />
          </div>
        </div>
      </div>


      {/* Courses Section */}

      <div id="courses" className="mt-5 text-center text-success m-auto" style={{width:"80vw"}}>
        <h1 className="mb-5">Explore some more Courses by us</h1>

        <div className="d-flex flex-wrap justify-content-center gap-5">
          {courseList.map((course, i) => (
            <div className="card" style={{ width: "20rem" }}>
              <img
                src={"http://localhost:8080/images/" + course.fileName}
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">{course.courseName}</h5>
                <p className="card-text">{course.courseDescription}</p>
                <a href="#" className="btn btn-primary">
                  Go somewhere
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>


      <div className="my-5">
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
        </div>
        <ToastContainer/>

    </>

  )
}
