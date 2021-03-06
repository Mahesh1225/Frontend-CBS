import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col, Dropdown, Button,Table } from "react-bootstrap";
import { FolderFill, FileEarmarkTextFill, Search } from "react-bootstrap-icons";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Link,
  useParams,
  useLocation,
} from "react-router-dom";

import Sidenavoptions from "./Sidenav/Sidenavoptions.jsx";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

import "./Starred.css";

import { useSelector } from "react-redux";
const Account = () => {
  //const user = useSelector((state) => state.user.user);
  console.log("in starred state");
  //console.log(user.userId);
  const API_URL = "http://localhost:3000";
  const [files, setFiles] = useState([]);
  const { id } = useParams();

  const { logout } = useAuth0();

  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }


  return (
    <div>
      <Container fluid>
        {/* <Row style={{ marginLeft: "-10px", marginRight: "-10px" }}>
                    <Col style={{ marginLeft: "0px", paddingLeft: "0px", paddingRight: "0px" }}>
                        <Col xl='auto' lg='auto' md='auto' sm='auto' xs='auto' style={{ paddingLeft: 0, paddingRight: "0px" }} >
                            <Header1></Header1>
                        </Col>
                    </Col>
                </Row> */}
        <Row>
          <Col xs={2}>
            <Col xl="auto" lg="auto" md="auto" sm="auto" xs="auto">
              {/* <UploadButton user={user} /> */}
              {/* <UploadButtonF user={user} /> */}
              <Sidenavoptions
                user={{
                  userId: user.userId,
                  userPath: user.userPath,
                  parentFolderId: user.parentFolderId,
                }}
              ></Sidenavoptions>
            </Col>
          </Col>

          <Col sx={10}>
            <Row>
              <Card style={{ width: "40rem",height:'20rem' }}>
                <Card.Body>
                  <Card.Title>Account Information</Card.Title>
                  <Card.Text>
                  <Table   style={{marginTop:'3rem'}} size="sm">
                  
                  <tbody>
                      <tr>
                          <th>User Name</th>
                          <td>{user.name}</td>
                      </tr>
                      <tr>
                          <th>User EmailID </th>
                          <td>{user.email}</td>
                      </tr>
                  </tbody>
                  </Table>     
                  </Card.Text>
                  <Button  style={{marginTop:'2rem'}}  variant="primary" 
                  onClick={() => logout({ returnTo: window.location.origin })} >Logout</Button>
                </Card.Body>
              </Card>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Account;
