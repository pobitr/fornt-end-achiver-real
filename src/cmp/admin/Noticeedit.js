import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";
import {
  adminNoticeDelete,
  adminNoticeUpdate,
} from "../../Service/adminService";

const Noticeedit = () => {
  let { id } = useParams();
  const [notice, setNotice] = useState("");
  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeDesc, setNoticeDesc] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const onSubmit = () => {
    if (noticeTitle == "") {
      toast.error("Please Enter Notice Heading !", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      return false;
    }
    if (noticeDesc == "") {
      toast.error("Please Enter Notice Des.... !", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      return false;
    }
    var data = {
      id: id,
      noticeTitle: noticeTitle,
      noticeDesc: noticeDesc,
    };
    // console.log(data);

    adminNoticeUpdate(data).then((result) => {
      // console.log("response", result);
      if (result.data.success) {
        toast.success(result.data.message);
      } else {
        toast.error(result.data.message);
      }
    });
  };

  const getData = () => {
    var data = {
      id: id,
    };

    adminNoticeDelete(data).then((result) => {
      // console.log("response", result);
      setNotice(result.data.response);
      setNoticeTitle(result.data.response.noticeTitle);
      setNoticeDesc(result.data.response.noticeDesc);
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
