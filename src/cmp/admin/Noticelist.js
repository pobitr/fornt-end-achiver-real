import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { ToastContainer, toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { Link, Outlet, useNavigate } from "react-router-dom";

export default function Noticelist() {
  const navigate = useNavigate();
  const goto = (path) => {
    navigate(path);
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [noticeList, setnoticeList] = useState([]);

  useEffect(() => {
    getNotice();
  }, []);

  const getNotice = () => {
    var data = {};

    axios
      .post("http://localhost:8080/api/notice/allNotice", data)
      .then(function (response) {
        console.log("response", response);
        if (response.data.success) {
          toast.success(response.data.message);
          setnoticeList(response.data.response);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onDelete = (id) => {
    var data = {
      id: id,
    };
    axios
      .post("http://localhost:8080/api/notice/noticeDelete", data)
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
      <h1>Notice List</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Notice Heading</th>
            <th>Notice Details</th>
            <th>Post Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {noticeList.map((notice, i) => (
            <tr>
              <td>{i + 1}</td>
              <td>{notice.noticeTitle}</td>
              <td>{notice.noticeDesc}</td>
              <td>{notice.created_at}</td>
              <td>
                <Button
                  variant="outline-primary"
                  onClick={() => {
                    goto("/dashboard/noticeedit/" + notice.id);
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
                    <Modal.Title>Notice Delete !!</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>Are You sure !</Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => onDelete(notice.id)}
                    >
                      Delete
                    </Button>
                  </Modal.Footer>
                </Modal>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <ToastContainer />
    </div>
  );
}
