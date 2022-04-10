import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col, Dropdown, Button } from "react-bootstrap";
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

import SearchView from "./SearchView.jsx";

import Sidenavoptions from "./Sidenav/Sidenavoptions.jsx";
import axios from "axios";

import "./Starred.css";
import {useDispatch,useSelector} from 'react-redux';
import {userActions} from '../../store/userSlice';
import {fetchUser} from '../../store/userActions';
import {filesActions} from '../../store/filesSlice';
import {fetchFiles} from '../../store/filesActions';


function Starred() {

  const [search, updateSearch] = useState("");

  const user = useSelector((state) => state.user.user);
  console.log("in starred state");
  //console.log(user.userId);
  const API_URL = "http://localhost:3000";
  const [files, setFiles] = useState([]);
  const { id } = useParams();

  const emailId = "abhimhamane13@gmail.com";
  const dispatch = useDispatch();

  const userdata = useSelector((state) => state.user.user);

 useEffect(() => {

   if(userdata)
   {
     dispatch(fetchUser(emailId));
   }
   
 }, [dispatch,userdata]);
 

 useEffect(() => {

   
  // dispatch(fetchUser(emailId));
   dispatch(fetchFiles(emailId));

 }, [dispatch]);



  const inputClicked = (data) => {
    const info = data.target.value;
    console.log(info);
    updateSearch(info);
  };

  const dropdownFileItemStarred = (fileId, value) => {
    console.log(fileId + "File Added in Starred Section");
    axios.put(`${API_URL}/files/starred/${fileId}`, { starred: value }).then(()=>{
      dispatch(fetchFiles(userdata.userId));
    });
  };

  const dropdownFileItemDelete = (fileId) => {
    alert("file deleted");
    axios.delete(`${API_URL}/files/file/${fileId}`).then(()=> {
      dispatch(fetchFiles(userdata.userId));
    });
   
  };

  useEffect(async () => {
    
    const getFiles = async () => {
      const res = await axios.get(
        `${API_URL}/files/starred/${user.userId}`
      );
      console.log(res.data);
      return res.data;
    };
    const data = await getFiles();
    console.log("in starred useeffect");
    console.log(data);
    setFiles(data);
  }, []);

  return (
    <>
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

            <Col xs={10}
            className="mainGradient"
            style={{
              marginLeft:"-15px",
              height:"550px",
              borderRadius:"10px",
              
            }}
          >
            <div className="header__search">
              <Search></Search>

              <input
                id="searchId"
                type="text"
                placeholder="Search In Clore"
                value={search}
                onChange={inputClicked}
              />
            </div>
            {search === "" ? null : <SearchView name={search} />}
            
            <Row>
              {files
                .filter((i) => i.parentFolderId === "mydash")
                .map((i) => {
                  return (
                    <Col xl="auto" lg="auto" md="auto" sm="auto" xs="auto">
                      <Card
                        id={i._id}
                        key={i._id}
                        className="cardStyle1"
                        onDoubleClick={() => {
                          window.open(`${API_URL}/files/file/${i._id}`);
                        }}
                        style={{
                          width: "7rem",
                          height: "7rem",
                          marginRight: "-0.2rem",
                          borderRadius: "10px",
                          boxShadow: "0.5px 0.5px 0.5px ",
                        }}
                      >
                        <Card.Body>
                          <Dropdown className="drop">
                            <Dropdown.Toggle
                              className="dropdownFolder1"
                              style={{ marginRight: "40px" }}
                            >
                              <Button
                                variant="outline-light"
                                className="dropButton"
                                style={{
                                  marginLeft: "-13px",
                                  marginTop: "-8px",
                                  border: "none",
                                  color: "black",
                                }}
                              ></Button>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="dropdown-menu">
                              <Dropdown.Item
                                className="menuItem"
                                href={`${API_URL}/files/file/download/${i._id}`}
                              >
                                Download
                              </Dropdown.Item>
                              {/* <Dropdown.Item className='menuItem' onClick={handleShow} >
                                Rename
                            </Dropdown.Item>
                            <Modal show={showModal} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Rename File</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <label>
                                        New File name:
                                    </label>
                                    <input ref={textInput} type={"text"}></input>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Close
                                    </Button>
                                    <Button variant="primary" onClick={() => handleFileRename(i._id)}>
                                        Save Changes
                                    </Button>
                                </Modal.Footer>
                            </Modal> */}
                              <Dropdown.Item className="menuItem" onClick="">
                                Share
                              </Dropdown.Item>
                              {/* <Dropdown.Item className='menuItem' onClick="" >
                                Move
                            </Dropdown.Item> */}
                              {/* {value === "false"}: */}
                              {i.starred ? (
                                <Dropdown.Item
                                  className=" menuItem"
                                  onClick={() =>
                                    dropdownFileItemStarred(i._id, !i.starred)
                                  }
                                >
                                  Remove From Starred

                                </Dropdown.Item>
                              ) : (
                                <Dropdown.Item
                                  className=" menuItem"
                                  onClick={() =>
                                    dropdownFileItemStarred(i._id, !i.starred)
                                  }
                                >
                                  Add to Starred                                  
                                </Dropdown.Item>
                              )}
                              <Dropdown.Item className=" menuItem" onClick={() => dropdownFileItemDelete(i._id)}>
                                Delete
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                          <FileEarmarkTextFill
                            style={{
                              color: "rgb(54, 152, 243)",
                              fontSize: "55px",
                              marginTop: "-50px",
                            }}
                          ></FileEarmarkTextFill>

                          <Card.Text className="footer1">
                            {i.fileName}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  );
                })}
            </Row>
            </Col>

          </Row>
        </Container>
      </div>
    </>
  );
}

export default Starred;
