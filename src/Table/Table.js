import React, { useState, useEffect } from "react";
import axios from "axios";
import "../assets/style.css";
import { Link } from "react-router-dom";
import {
  MDBContainer,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBRow, MDBCol,
} from "mdb-react-ui-kit";

export default function Table() {
  const [todo, setTodo] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = event => {
    if (event.target.value == "") {
      getTodo();
    }
    setSearchTerm(event.target.value);

    const results = todo.filter((todo) =>
      todo.todoTitle.toLowerCase().includes(searchTerm)
    );
    setTodo(results);
    console.log("🚀 ~ file: Table.js ~ line 21 ~ Table ~ event.target.value", results)
  };

  // All Data Show
  const getTodo = async () => {
    await axios
      .request({
        method: "get",
        url: "http://localhost:5000/todo/",
      })
      .then((response) => {
        setTodo(response.data);
      });
  };

  //  Delect post
  const deleteFunc = async (id) => {
    await axios.delete("http://localhost:5000/todo/delectTodo/" + id);
    let newtoDo = todo.filter((todo) => todo._id !== id);
    setTodo(newtoDo);
  };

  // Get Id
  const getTodoId = async (id) => {
    await axios.request({
      method: "get",
      url: "http://localhost:5000/todo/" + id,
    });
  };

  useEffect(() => {
    getTodo();
  }, []);

  return (
    <MDBContainer>
      <MDBRow className="d-flex justify-content-end margin-t-100">
        <MDBCol md="4" sm="10">
          <MDBInput value={searchTerm} onChange={handleChange} label='Search Bar' id='form1' type='text' />
        </MDBCol>
      </MDBRow>
      <div className="table-responsive">
        <MDBTable>
          <MDBTableHead>
            <tr>
              <th scope="col">Todo</th>
              <th scope="col">Date</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {todo.map((toDo, key) => (
              <tr key={toDo._id}>
                <th scope="row">{toDo.todoTitle}</th>
                <td>{toDo.dates}</td>
                <td>{toDo.status}</td>
                <td>
                  <MDBBtn
                    tag="a"
                    color="none"
                    onClick={() => deleteFunc(toDo._id)}
                    className="m-1 p-2"
                    style={{ color: "#FF0000" }}
                  >
                    <MDBIcon fas icon="trash" size="lg" />
                  </MDBBtn>

                  <Link
                    to={{
                      pathname: `/Edit-todo/${toDo._id}`,
                      data: toDo._id,
                    }}
                  >
                    <MDBBtn
                      tag="a"
                      onClick={() => {
                        getTodoId(toDo._id);
                      }}
                      color="none"
                      className="m-1 p-2"
                      style={{ color: "#55acee" }}
                    >
                      <MDBIcon fas icon="edit" size="lg" />
                    </MDBBtn>
                  </Link>
                </td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>
      </div>
    </MDBContainer>
  );
}
