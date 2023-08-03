import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import { useParams } from 'react-router-dom';

export default function Courseedit() {
  useEffect(()=>{
getData()
  },[])
  let {id}=useParams()


    const[course, setCourse]=useState([])

  const[courseCode,setcourseCode]=useState('');
  const[courseName, setcourseName]=useState('');
  const[courseDuration,setcourseDuration]=useState('');
  const[certificateAvailable,setcertificateAvailable]=useState('');
  const[courseDescription,setcourseDescription]=useState('');
  const [fileName, setFileName] = useState('');

  const onSubmit = () => {

    var data = {
      "courseCode":courseCode,
      "courseName":courseName,
      "courseDuration":courseDuration,
      "certificateAvailable":certificateAvailable,
      "courseDescription":courseDescription,
      
      "fileName": fileName
    }
    console.log(data)


    axios.post('http://localhost:8080/api/course/addCourse', data).then(function (response) {
      console.log('response', response);
      if (response.data.success) {
        toast.success(response.data.message);
        setcourseCode('');
        setcourseName('');
        setcourseDuration('');
        setcertificateAvailable('');
        setcourseDescription('');
        setFileName('');
        
       
      }
      else {
        toast.error(response.data.message);
      }
    })
      .catch(function (error) {
        console.log(error);
      });
  }

  function showUpload() {
    const image = document.getElementById('file');
    image.click();
  }
  function uploadImg() {
    console.log(".......")
    const image = document.getElementById('file');
    const file = image.files;
    console.log(file)
    if (file) {
      // const reader = new FileReader();
      // reader.readAsDataURL(file[0])
      const fileData = new FormData();
      fileData.append('file', file[0])
      fetch('http://localhost:8080/api' + '/upload', {
        method: 'POST',
        body: fileData,
      }).then(response => {
        return response.json()
      })
        .then(data => {
          console.log(data)
          if (data.success) {
            setFileName(data.fileName)
          }
        })
    }

  }

  //
  const getData =()=>{
    var data = {
      "id":id
    }
    axios.post('http://localhost:8080/api/course/courseDetails', data).then(function (response) {
              console.log('response', response);
              setCourse(response.data.response)
              setcourseCode(response.data.response.courseCode)
              setcourseName(response.data.response.courseName)
              setcourseDuration(response.data.response.courseDuration)
              setcertificateAvailable(response.data.response.certificateAvailable)
              setcourseDescription(response.data.response.courseDescription)
              
              
             
          })
              .catch(function (error) {
                  console.log(error);
              });
  }

  return (
    <>
    <input placeholder='courseCode' value={courseCode} onChange={(e)=>{setcourseCode(e.target.value)}} /><br/><br/>
    <input placeholder='courseName' value={courseName} onChange={(e)=>{setcourseName(e.target.value)}} /><br/><br/>
    <input placeholder='courseDuration' value={courseDuration} onChange={(e)=>{setcourseDuration(e.target.value)}} /><br/><br/>
    <input placeholder='certificateAvailable' value={certificateAvailable} onChange={(e)=>{setcertificateAvailable(e.target.value)}} /><br/><br/>
    <input placeholder='courseDescription' value={courseDescription} onChange={(e)=>{setcourseDescription(e.target.value)}} /><br/><br/>

      <input type="file" id="file" onChange={uploadImg} style={{ display: 'none' }} accept="image/jpg,image/jpeg" />
      <button class="btn btn-primary" onClick={showUpload}>Upload</button><br/>
      <button onClick={onSubmit}>Submit</button>

<ToastContainer/>

    </>
  )
}
