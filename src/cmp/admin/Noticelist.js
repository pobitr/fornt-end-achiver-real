import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { ToastContainer, toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { adminNoticeAll, adminNoticeDelate } from "../../Service/adminService";

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

     adminNoticeAll(data)
      .then(result=> {
        // console.log("response", result);
        if (result.data.success) {
          toast.success(result.data.message);
          setnoticeList(result.data.response);
        } else {
          toast.error(result.data.message);
        }
      })
      
  };

  const onDelete = (id) => {
    var data = {
      id: id,
    };
     adminNoticeDelate(data)
      .then(result=> {
        // console.log("response", result);
        if (result.data.success) {
          toast.success(result.data.message);
          getNotice();
          setShow(false);
        } else {
          toast.error(result.data.message);
        }
      })
      
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
