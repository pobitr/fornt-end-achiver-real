import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";

const Noticeedit = () => {
  let { id } = useParams();
  const [notice, setNotice] = useState("");
  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeDesc, setNoticeDesc] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const onSubmit = () => {
    if (noticeTitle == '') {
      toast.error("Please Enter Notice Heading !", {
        position: toast.POSITION.BOTTOM_CENTER
      });
    return false;
    }
    if (noticeDesc == '') {
      toast.error("Please Enter Notice Des.... !", {
        position: toast.POSITION.BOTTOM_CENTER
      });
    return false;
      
    }
    var data = {
      id: id,
      noticeTitle: noticeTitle,
      noticeDesc: noticeDesc,
    };
    console.log(data);

    axios
      .post("http://localhost:8080/api/notice/noticeUpdate", data)
      .then(function (response) {
        console.log("response", response);
        if (response.data.success) {
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getData = () => {
    var data = {
      id: id,
    };
    axios
      .post("http://localhost:8080/api/notice/noticeDetails", data)
      .then(function (response) {
        console.log("response", response);
        setNotice(response.data.response);
        setNoticeTitle(response.data.response.noticeTitle);
        setNoticeDesc(response.data.response.noticeDesc);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <>
      <div>
        <h1>Notice Edit</h1>
        <hr />
        <form
          style={{
            display: "flex",
            justifyContent: "center",
            fontFamily: "Poppins",
            fontSize: "1.2rem",
          }}
        >
          <table className="formTable">
            <tbody>
              <tr>
                <td className="formTableDetail">
                  <label style={{ marginTop: "3px" }}>Notice Heading</label>
                </td>
              </tr>
              <tr>
                <td>
                  <TextField
                    fullWidth
                    required
                    id="outlined-required2"
                    label="Course Name"
                    value={noticeTitle}
                    onChange={(e) => {
                      setNoticeTitle(e.target.value);
                    }}
                  />
                </td>
              </tr>

              <tr>
                <td className="formTableDetail">
                  <label style={{ marginTop: "3px" }}>Notice Description</label>
                </td>
              </tr>
              <tr>
                <td>
                  <TextField
                    fullWidth
                    id="outlined-multiline-flexible"
                    label="Course Description"
                    multiline
                    maxRows={4}
                    value={noticeDesc}
                    onChange={(e) => {
                      setNoticeDesc(e.target.value);
                    }}
                  />
                </td>
              </tr>

              <tr>
                <td className="formTableDetail">
                  <Button variant="contained" size="large" onClick={onSubmit}>
                    Submit
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
        <ToastContainer />
      </div>
    </>
  );
};

export default Noticeedit;
