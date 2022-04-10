import React from "react";
import { useState, useEffect } from "react";
import {
  Link,
  useParams,
} from "react-router-dom";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import UploadButton from "./Sidenav/UploadButton.jsx";
import UploadButtonF from "./Sidenav/UploadButtonF.jsx";

import Header1 from "./Navbar/Header1.jsx";
import Sidenavoptions from "./Sidenav/Sidenavoptions.jsx";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";
import { ThreeDotsVertical } from "react-bootstrap-icons";
import { Dropdown, Modal, Button } from "react-bootstrap";
import "./MainView.css";
import { FolderFill, FileEarmarkTextFill, Search } from "react-bootstrap-icons";
import SearchView from "./SearchView.jsx";

import {useDispatch,useSelector} from 'react-redux';
import {userActions} from '../../store/userSlice';
import {fetchUser} from '../../store/userActions';
import {filesActions} from '../../store/filesSlice';
import {fetchFiles} from '../../store/filesActions';
import { height } from "@mui/system";

function MainView() {
  const API_URL = "http://localhost:3000";

  const emailId = "abhimhamane13@gmail.com";
  const [user, setUser] = useState([]);
  //const [userData, setUserData] = useState([]);

  const [folders, setFolders] = useState([]);
  //const [files, setFiles] = useState([]);
  const [search, updateSearch] = useState("");

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


  useEffect(() => {

    setUser({
      userId: userdata.userId,
      userPath: userdata.userPath,
      parentFolderId: "mydash"});
      console.log(user);
      //  getFolders();
  
  }, []);

  const files = useSelector((state) => state.files.files);

  // const getUser = async () => {
  //   const resUser = await axios.get(`${API_URL}/users/${emailId}`);
    // setUser({
    //   userId: resUser.data[0].userId,
    //   Path: resUser.data[0].userPath,
    //   parentFolderId: "mydash",
    // });


  //   console.log(user);
  //   if (user) {
      
  //   dispatch(userActions.updateUser({userId:resUser.data[0].userId,
  //   userPath: resUser.data[0].userPath,
  //   userName: resUser.data[0].userName,
  //   parentFolderId : "mydash"}));

  //    getFolders();
  //   }
  // };

  // const getFolders = async () => {
  //   console.log("in format");
  //   console.log(user);
  //   const resFolders = await axios.get(`${API_URL}/folders/${user.userId}`);
  //   const resFiles = await axios.get(`${API_URL}/files/${user.userId}`);
  //   setFolders(resFolders.data);
  //   setFiles(resFiles.data);
  // };

  const inputClicked = (data) => {
    const info = data.target.value;
    console.log(info);
    updateSearch(info);
  };

  const dropdownItemDownload = (e) => {
    axios.get(`${API_URL}/files/file/download/${e}`);
    alert(`${API_URL}/files/file/download/${e}`);
    console.log("Download");
  };
  const [showModal, setShow] = useState(false);
  let textInput = React.createRef();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    console.log(textInput.current.value);
    setShow(false);
  };

  const dropdownItemShare = () => {
    console.log("Share");
  };

  //folder options

  const handleFolderRename = (folderId) => {
    console.log(textInput.current.value);
    axios.put(`${API_URL}/folders/${folderId}`, {
      newName: textInput.current.value,
    });
    setShow(false);
  };

  const dropdownFolderDelete = (folderId) => {
    axios.delete(`${API_URL}/folders/${folderId}`);
    setShow(false);
  };

  //files options
  const dropdownFileItemPublic= (fileId, value) => {
    console.log(fileId + "File Added in public Section");
    axios.put(`${API_URL}/files/public/file/${fileId}`, { public: value }).then(()=>{
      dispatch(fetchFiles(userdata.userId));
    });
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

  const handleFileRename = (fileId) => {
    console.log(textInput.current.value);
    axios.put(`${API_URL}/files/file/${fileId}`, {
      fileName: textInput.current.value,
    });
    setShow(false);
  };

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
              <Sidenavoptions user={user}></Sidenavoptions>
            </Col>
          </Col>
          <>
          <Col
            xs={10}
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

            
              {folders
                .filter((i) => i.parentFolderId === "mydash")
                .map((i) => {
                  return (
                    <Col key={i._id} xl="auto" lg="auto" md="auto" sm="auto" xs="auto">
                      <Card
                        id={i._id}
                        key={i._id}
                        className="cardStyle"
                        style={{
                          width: "10rem",
                          height: "7rem",
                          marginRight: "-0.2rem",
                          borderRadius: "10px",
                          boxShadow: "0.5px 0.5px 0.5px ",
                        }}
                      >
                        <Card.Body>
                          <Dropdown className="drop" variant="outline-light">
                            <Dropdown.Toggle
                              className="dropdownFolder"
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
                              >
                                <ThreeDotsVertical />
                              </Button>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="dropdown-menu">
                              <Dropdown.Item
                                className="menuItem"
                                onClick={dropdownItemDownload}
                              >
                                Download
                              </Dropdown.Item>
                              <Dropdown.Item
                                className="menuItem"
                                onClick={handleShow}
                              >
                                Rename
                              </Dropdown.Item>
                              <Modal className="modal" show={showModal} onHide={handleClose}>
                                <div className="modalHeader">
                                <Modal.Header>
                                  <Modal.Title>Rename Folder</Modal.Title>
                                </Modal.Header>
                                </div>
                                <Modal.Body>
                                  <label>New Folder name:</label>
                                  <input ref={textInput} type={"text"}></input>
                                </Modal.Body>
                                <div className="modalBody">

                               
                                <Modal.Footer>
                                  <Button
                                    variant="secondary"
                                    onClick={handleClose}
                                  >
                                    Close
                                  </Button>
                                  <Button
                                    variant="primary"
                                    onClick={() => handleFolderRename(i._id)}
                                  >
                                    Save Changes
                                  </Button>
                                </Modal.Footer>
                                </div>
                              </Modal>
                              <Dropdown.Item
                                className="menuItem"
                                onClick={dropdownItemShare}
                              >
                                Share
                              </Dropdown.Item>
                              <Dropdown.Item className="menuItem" onClick="">
                                Move
                              </Dropdown.Item>
                              <Dropdown.Item
                                className="menuItem"
                                onClick={() => dropdownFolderDelete(i._id)}
                              >
                                Delete
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                          <FolderFill
                            style={{
                              color: "rgba(245, 245, 43, 0.938)",
                              fontSize: "55px",
                              marginTop: "-50px",
                            }}
                          ></FolderFill>
                          <Link
                            to={{ pathname: `/folder/${i._id}` }}
                            state={{
                              user: {
                                userId: user.userId,
                                Path: i.folderPath,
                              },
                            }}
                          >
                            <Card.Text className="footer1">
                              {i.folderName}
                            </Card.Text>
                          </Link>
                        </Card.Body>
                      </Card>
                    </Col>
                  );
                })}
            </Row>
            <Row>
              {files && files
                .filter((i) => i.parentFolderId === "mydash")
                .map((i) => {
                  return (
                    <Col key={i._id} xl="auto" lg="auto" md="auto" sm="auto" xs="auto">
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
                              >
                                <ThreeDotsVertical />
                              </Button>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="dropdown-menu">
                              <Dropdown.Item
                                className="menuItem"
                                href={`${API_URL}/files/file/download/${i._id}`}
                              >
                                Download
                              </Dropdown.Item>
                              <Dropdown.Item
                                className="menuItem"
                                onClick={handleShow}
                              >
                                Rename
                              </Dropdown.Item>

                              <Modal className="modal" show={showModal} onHide={handleClose}>
                                <div className="modalHeader">
                                <Modal.Header >
                                  <Modal.Title>Rename File</Modal.Title>
                                </Modal.Header>
                                </div>
                                <Modal.Body>
                                  <label>New File name:</label>
                                  <input ref={textInput} type={"text"}></input>
                                </Modal.Body>
                                <div className="modalBody">
                                <Modal.Footer>
                                  <Button
                                    variant="secondary"
                                    onClick={handleClose}
                                  >
                                    Close
                                  </Button>
                                  <Button
                                    variant="primary"
                                    onClick={() => handleFileRename(i._id)}
                                  >
                                    Save Changes
                                  </Button>
                                </Modal.Footer>
                                </div>
                              </Modal>
                              <Dropdown.Item
                                className="menuItem"
                                onClick={dropdownItemShare}
                              >
                                Share
                              </Dropdown.Item>
                              <Dropdown.Item className="menuItem" onClick="">
                                Move
                              </Dropdown.Item>

                              {i.public ? (
                                <Dropdown.Item
                                  className=" menuItem"
                                  onClick={() =>
                                    dropdownFileItemPublic(i._id, !i.public)
                                  }
                                >
                                  Remove From Public

                                </Dropdown.Item>
                              ) : (
                                <Dropdown.Item
                                  className=" menuItem"
                                  onClick={() =>
                                    dropdownFileItemPublic(i._id, !i.public)
                                  }
                                >
                                  Add to Public                                
                                </Dropdown.Item>
                              )}

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

                              <Dropdown.Item
                                className=" menuItem"
                                onClick={() => dropdownFileItemDelete(i._id)}
                              >
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
          </>
        </Row>
      </Container>
    </div>
  );
}

export default MainView;
