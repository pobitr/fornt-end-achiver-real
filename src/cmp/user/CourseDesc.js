import React, { useState } from 'react';
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
import { FaStar } from "react-icons/fa";
import { getUserName } from "../../Service/common";
import Rating from '@mui/material/Rating';
import { Button } from 'react-bootstrap';
import { Download } from '@mui/icons-material';

export default function CourseDesc() {
  let { id } = useParams();
  const [courseList, setcourseList] = useState([]);
  const [courseCode, setcourseCode] = useState('');
  const [courseName, setcourseName] = useState('');
  const [courseDuration, setcourseDuration] = useState('');
  const [certificateAvailable, setcertificateAvailable] = useState('');
  const [courseDescription, setcourseDescription] = useState('');
  const [fileName, setFileName] = useState('');
  // State var for controlling feedbackform
  const [userName,setUserName]=useState('');
  const [retText, setRetText]=useState('');
  const [rating, setRating] = useState(null);
  const [hoverValue, setHoverValue] = useState(undefined);
  const [showInput, setShowInput] = useState(false);
  const star = Array(5).fill(0);
  const [getreview, setgetReview]=useState([])


  useEffect(() => {
    getCourse();
    getData();
    
  }, [])

  const getCourse = () => {
    var data = {};

    axios
      .post("http://localhost:8080/api/course/allcourse", data)
      .then(function (response) {
        console.log("response", response);
        if (response.data.success) {
          // toast.success(response.data.message);
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
  const getData = () => {
    var data = {
      "id": id
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
  const getRat =()=>{
    var data ={
      "userName":getUserName().response.userName,
      "courseName":courseCode,
      "rating":rating,
      "retText":retText
    }
    console.log(data);
    axios.post('http://localhost:8080/api/review/addReview', data).then(function (response) {
      console.log('response', response);
      if (response.data.success) {
          toast.success(response.data.message);
          setRetText("");
          
          
         
      }
      else {
          toast.error(response.data.message);
      }
  })
      .catch(function (error) {
          console.log(error);
      });

  }
  
 
  //
  const getReview=()=>{
    var data = {
      courseName:courseCode
    };
    console.log(data);

    axios
      .post("http://localhost:8080/api/review/allReview", data)
      .then(function (response) {
        console.log("response", response);
        if (response.data.success) {
          toast.success(response.data.message);
          setgetReview(response.data.response);
          
          
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

      <div style={{ backgroundColor: "#f1f1fa", width: "100vw", padding: "2rem", marginTop: ".5rem" }}>
        {/* Course title will go here */}
        <p style={{ fontFamily: "ubuntu", textAlign: "center", fontSize: "3rem" }}>{courseName}</p>
        {/* course descriptions first line will go here */}
        <p style={{ fontFamily: "ubuntu", textAlign: "center", fontSize: "1.2rem" }}>{courseDescription}</p>
      </div>


      {/* Course Desc and join button*/}

      <div className="d-flex flex-column m-auto" style={{ marginTop: "1rem", width: "70vw", gap: '2rem', padding: "20px" }}>
        <div className="d-flex" style={{ gap: "5rem", width: "100%" }}>
          <div className="d-flex flex-column" style={{ width: "100%" }}>
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
      <div className='d-flex m-auto border mt-5 bg-primary-subtle text-dark p-4 justify-content-around' style={{ width: "70vw" }}>
        <div className='d-flex gap-1 border'>
          <AccessTimeIcon fontSize="large" color="success" />
          <h3>Duration: {courseDuration} Month</h3>
        </div>

        <div className='d-flex gap-1'>
          <CurrencyRupeeOutlinedIcon fontSize="large" color="success" />
          <h3>Course Fee: Free</h3>
        </div>

        <div className='d-flex gap-1'>
          <CheckCircleOutlinedIcon fontSize="large" color="success" />
          <h3>Beginner Friendly</h3>
        </div>

      </div>
      
      <a href={"http://localhost:8080/images/" + fileName} download>
    PDF Download
      </a>
      
      {/* Feedback form */}
      <div style={{ width: "70vw", margin: "auto", marginTop: "1.5rem", textAlign: "center" }}>
        <h2 style={{ color: "red" }}>Rate us</h2>
      </div>
      <div style={styles.container}>
        {star.map((star, i) => {
          const ratingValue = i + 1;

          return (
            <div>
              <FaStar
                size={40}
                style={styles.star}
                color={(rating || hoverValue) > i ? "orange" : "grey"}
                onMouseOver={() => { setHoverValue(ratingValue); }}
                onMouseLeave={() => { setHoverValue(undefined) }}
                onClick={() => { setRating(ratingValue); setShowInput(true) }} />
                
            </div>
          )
        })}
      </div>
      {showInput && <div style={styles.container2}>
        <textarea style={styles.textarea} placeholder="Write your thoughts " onChange={(e)=>{setRetText(e.target.value)}}/>
        <input style={styles.button} type="submit" value="submit" onClick={getRat} />
      </div>}


      {/* Courses Section */}

      <div id="courses" className="mt-5 text-center text-success m-auto" style={{ width: "80vw" }}>
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

      {/* Review Table */}
      

      <div className=' text-center mt-5 m-auto' style={{ width: "70vw" }}>
        <h1 className='text-danger'> Reviews by our Students</h1>
        
        <Button onClick={getReview} >Show How Many Students Are Comments</Button>
        <table className="table table-striped table-hover table-borderless mt-3">
          <thead className='table-dark'>
            <tr>
              <th scope="col">SL.NO</th>
              <th scope="col">User Name</th>
              <th scope="col">Comments</th>
              <th scope="col">Rating</th>
            </tr>
          </thead>
          <tbody>
          {getreview.map((review, i) => (
            <tr>
              <th scope="row">{i+1}</th>
              <td>{review.userName}</td>
              <td>{review.retText}</td>
              <td>
                <div style={{display:"flex",flexDirection:"row",justifyContent:"center"}}>
                
                <Rating name="size-large" value={review.rating} readOnly size="large"  />
                    
                </div>
              </td>
            </tr>
          ))}

          </tbody>
        </table>
      </div>

      {/* Footer Section */}
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
      <ToastContainer />

    </>

  )
}

const styles = {
  container: {
    marginTop: "1.5rem",
    display: "flex",
    // flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "70vw",
    margin: "auto",
    // border: "2px solid blue",
  },
  container2: {
    marginTop: "5px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "70vw",
    margin: "auto",
    // border: "2px solid blue",
  },
  star: {

    cursor: "pointer"
  },
  textarea: {
    width: "40vw",
    padding: ".5rem",
    fontFamily: "ubuntu",
    fontSize: "1.2rem",
    borderRadius: "5px",
  },
  button: {
    margin: "1rem 0 1rem 0",
    width: "30vw",
    paddin: "5px",
    fontSize: "1.0rem",
    textTransform: "uppercase"
  }
}
