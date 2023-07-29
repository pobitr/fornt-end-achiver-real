import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { grey } from '@mui/material/colors';
import { ToastContainer, toast } from 'react-toastify';
import { Slide, Zoom, Flip, Bounce } from 'react-toastify';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import axios from 'axios';



export default function Addcourses() {
  const [cId, setCid] = useState('');
  const [cName, setCname] = useState('');
  const [cDur, setCdur] = useState('Course Duration');
  const [cCertify, setCcertify] = useState('');
  const [cDesc, setCdesc] = useState('');
  const [cPhoto, setCphoto] = useState('');
  const [cNotes, setCnotes] = useState('');
  const [cVideo, setCvideo] = useState('');
  const [cPhotoName, setPhotoName] = useState('');
  const [cNotesName, setNotesName] = useState('');
  const [cVideoName, setVideoName] = useState('');
  const [isHovering, setIsHovering] = useState(false);
  const [photofile, setPhotofile]=useState('');




  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  // write logic to send data to the database in the below function
  const handleSubmit = () => {
    if (cId === '') {
      NotificationManager.error('Enter Course ID');
      return false;
    }
    if (cName === '') {
      NotificationManager.error('Enter Course Name');
      return false;
    }
    if (cDur !== 1 && cDur !== 2 && cDur !== 3 && cDur !== 6 && cDur !== 12) {
      NotificationManager.error('Enter Course Duration');
      return false;
    }
    if (cCertify === '') {
      NotificationManager.error('Select an option in Course Certify');
      return false;
    }
    if (cDesc === '') {
      NotificationManager.error('Enter Course Description');
      return false;
    }
    // if (cPhotoName === '') {
    //   NotificationManager.error('Upload a course Photo');
    //   return false;
    // }
    // if (cNotesName === '') {
    //   NotificationManager.error('Upload course Notes');
    //   return false;
    // }


    let data = {
      courseCode: cId,
      courseName: cName,
      courseDuration: cDur,
      certificateAvailable: cCertify,
      courseDescription: cDesc,
      photofile: photofile,
      // cnotes: cNotes,
      // cvideo: cVideo,
    }

    console.log(data);
    axios
      .post("http://localhost:8080/api/course/addCourse", data)
      .then(function (response) {
        console.log('response', response);

        if (response.data.success) {

          toast.success(response.data.message);

        } else {
          toast.error(response.data.message);
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    
  }
  function showUpload(){
    const image= document.getElementById('file') ;
    image.click();
  }

  function uploadImg(){
    console.log(".......")
    const image= document.getElementById('file') ;
    const file = image.files;
    console.log(file)
    if(file){
      // const reader = new FileReader();
      // reader.readAsDataURL(file[0])
      const fileData = new FormData();
      fileData.append('file',file[0])
      fetch('http://localhost:8080/api' + '/upload', {
        method: 'POST',
        body: fileData,
        }).then(response => {
            return response.json()
          })
          .then(data => {
            console.log(data)
            if (data.success){
                setPhotofile(data.photofile)
            }
          })
    }

  }
  return (
    <div className='addCourseForm'>
      <h1>Add Courses</h1>

      <form className="courseForm">
        <table className="formTable">
          <tbody>
            <tr className="formTableRow">
              <td className="formTableDetail">
                <label className="formLabel">Course ID</label>
              </td>
            </tr>
            <tr>
              <td>
                <TextField
                  style={{ width: "100%" }}
                  fullWidth
                  required
                  id="outlined-required"
                  label="Course ID"
                  value={cId}
                  onChange={(e) => { setCid(e.target.value) }}
                />
              </td>
            </tr>

            <tr >
              <td className="formTableDetail">
                <label className="formLabel">Course Name</label>
              </td>
            </tr>
            <tr>
              <td>
                <TextField
                  fullWidth
                  required
                  id="outlined-required2"
                  label="Course Name"
                  value={cName}
                  onChange={(e) => { setCname(e.target.value) }}
                />
              </td>
            </tr>


            <tr >
              <td className="formTableDetail">
                <label className="formLabel">Course Duration</label>
              </td>
            </tr>
            <tr>
              <td>
                <Select
                  fullWidth
                  id="demo-simple-select"
                  displayEmpty
                  value={cDur}
                  onChange={(e) => { setCdur(e.target.value) }}
                >
                  <MenuItem value=""><em>Select</em></MenuItem>
                  <MenuItem value={1}>One Month</MenuItem>
                  <MenuItem value={2}>Two Month</MenuItem>
                  <MenuItem value={3}>Three Month</MenuItem>
                  <MenuItem value={6}>Six Month</MenuItem>
                  <MenuItem value={12}>Twelve Month</MenuItem>
                </Select>
              </td>
            </tr>


            <tr >
              <td className="formTableDetail">
                <label className="formLabel">Certification Available</label>
              </td>
            </tr>
            <tr>
              <td>
                <Select
                  fullWidth
                  id="demo-simple-select"
                  displayEmpty
                  value={cCertify}
                  onChange={(e) => { setCcertify(e.target.value) }}
                >
                  <MenuItem value=""><em>Select</em></MenuItem>
                  <MenuItem value={"yes"}>Yes</MenuItem>
                  <MenuItem value={"no"}>No</MenuItem>
                </Select>
              </td>
            </tr>

            <tr >
              <td className="formTableDetail">
                <label className="formLabel">Course Description</label>
              </td>
            </tr>
            <tr>
              <td>
                <TextField
                  fullWidth
                  id="outlined-multiline-flexible"
                  label="Course Description"
                  multiline
                  maxRows={10}
                  value={cDesc}
                  onChange={(e) => { setCdesc(e.target.value) }}
                />
              </td>
            </tr>



            <tr >
              <td className="formTableDetail">
                <pre style={{ fontFamily: "Poppins" }}><label>Course Photo                      Course Pdf                        Course Video</label></pre>
              </td>
            </tr>
            <tr>
              <td>
                <tr style={{ display: "flex", justifyContent: "space-between" }}>
                  <td >
                  <input type="file" id="file" onChange={uploadImg} style={{display: 'none'}} accept="image/jpg,image/jpeg"  />
                        <button class="btn btn-primary" onClick={showUpload}>Upload</button>
                  </td>

                  <td>
                    <Button

                      variant="contained"
                      component="label"
                    >
                      Upload File
                      <input
                        type="file"
                        name="cNotes"
                        accept="application/pdf"
                        onChange={(e) => {
                          if (e.target.files.length !== 0) {
                            setCnotes(URL.createObjectURL(e.target.files[0]));
                            setNotesName(e.target.files[0].name)
                          }
                        }}
                        hidden
                      />
                    </Button>
                  </td>

                  <td>
                    <Button

                      variant="contained"
                      component="label"
                    >
                      Upload File
                      <input
                        type="file"
                        name="cNotes"
                        accept="video/*"
                        onChange={(e) => {
                          if (e.target.files.length !== 0) {
                            setCvideo(URL.createObjectURL(e.target.files[0]));
                            setVideoName(e.target.files[0].name)
                          }
                        }}
                        hidden
                      />
                    </Button>
                  </td>
                </tr>
              </td>
            </tr>
            <tr>
              <td>
                <div style={{ display: "flex", gap: "50px", width: "28%" }}>
                  <img style={{ width: "100%", height: "100%" }} src={cPhoto} />
                  <p style={{ width: "100%", height: "50%", marginLeft: "2vw" }}>{cNotesName}</p>
                  <p style={{ width: "100%", height: "50%", marginLeft: "5vw" }}>{cVideoName}</p>
                </div>
              </td>

            </tr>
            <tr >
              <td className="formTableDetail">
                <Button style={{
                  border: "0.5px solid",
                  borderColor: isHovering ? 'cyan' : 'grey',
                  backgroundColor: isHovering ? 'grey' : 'white',
                  color: isHovering ? 'white' : 'grey',
                }}
                  fullWidth
                  onClick={handleSubmit}
                  size="large"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}

                >
                  Submit
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
      <NotificationContainer />
      <ToastContainer/>
    </div>
  )
}