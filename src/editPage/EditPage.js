import React, { useState, useEffect } from "react";
import axios from "axios";
import "../assets/style.css";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBCardImage, MDBBtn, MDBBadge } from 'mdb-react-ui-kit';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useNavigate,
  useParams,
} from "react-router-dom";

export default function EditPage() {


  const { id } = useParams();

  const [toDoid, setDoid] = useState(id);
  const [item, setItem] = useState([]);

  const [editTodo, SetEditTodo] = useState();
  const [editStatus, SetEditStatus] = useState();


  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState();


  const navigate = useNavigate();


  const onEditTodo = (e) => {
    SetEditTodo(e.target.value);
  };

  const onEditTodoStatus = (e) => {
    SetEditStatus(e.target.value);
  };

  // data show

  const getTodoId = async () => {
    await axios
      .request({
        method: "get",
        url: "http://localhost:5000/todo/" + toDoid,
      })
      .then((response) => {
        setItem(response.data);
        SetEditTodo(response.data.todoTitle);
        SetEditStatus(response.data.status);
        console.log("🚀 ~ file: EditPage.js ~ line 46 ~ .then ~ response.data.status", response.data.status)
      });
  };


  // edit Submit

  const onSubmit = async () => {
    await axios
      .put("http://localhost:5000/todo/updateTodo/" + toDoid, {
        todoTitle: editTodo,
        status: editStatus,
      })
      .then((response) => {
        console.log(response);
        setAlertMessage("tesssttttt");
        navigate('/')
      })
      .catch((error) => {
        setShowAlert(true);
        setAlertMessage(error.response.data);
      });
  };



  useEffect(() => {
    getTodoId();
  }, []);


  return (
    <div>
      <MDBContainer>
        <MDBRow className="text-center margin-t-100">
          <MDBCol lg="8" sm="10" size='12' className='col-example'>
            <MDBCardImage src='https://mdbcdn.b-cdn.net/img/new/standard/nature/182.jpg' className="img-fluid" alt='...' />
          </MDBCol>

          <MDBCol lg="4" sm="10" size='12' className='d-flex align-items-center justify-content-center'>
            <MDBRow className="">

              <MDBCol size='12' className="d-flex justify-content-center " >
                <h2 className="padding-tb">Edit Todo</h2>
              </MDBCol >

              <MDBCol size='12'  >
                <MDBInput label='Example label' onChange={onEditTodo} value={editTodo} id='form1' type='text' />
              </MDBCol >


              <MDBCol size='12' >
                <select onChange={onEditTodoStatus} className="form-select margin-t" aria-label="Default select example">
                  <option value={editStatus}> {editStatus}</option>
                  <option value="Noted">Noted</option>
                  <option value="Pendding">Pendding</option>
                  <option value="Complete">Complete</option>
                </select>
              </MDBCol >

              <MDBCol size='12' className="d-flex justify-content-center d-grid gap-2" >
                <MDBBtn onClick={onSubmit} className="margin-t d-grid gap-2">Update</MDBBtn>
              </MDBCol >


              <MDBCol size='12' className='col-example padding-tb'>
                {showAlert ? (
                  <MDBBadge className="mx-2 " color="danger">
                    {alertMessage}
                  </MDBBadge>
                ) : null}
              </MDBCol>

            </MDBRow>
          </MDBCol>

        </MDBRow>
      </MDBContainer >
    </div >
  )
}
