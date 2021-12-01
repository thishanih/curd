import React, { Component } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";


import "../assets/style.css";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBCardImage, MDBBtn, MDBBadge } from 'mdb-react-ui-kit';


export default class Addpage extends Component {
  state = {
    startDate: "",
  };

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  validationSchema() {
    return Yup.object().shape({
      addTo: Yup.string()
        .required("Add Todo is required")
        .min(10, "Add Todo must be at least 10 characters")
        .max(100, "Add Todo must not exceed 100 characters"),

      startDate: Yup.string().required("Add To startDate is required"),
    });
  }


  async handleSubmit(data) {

    await axios
      .post("http://localhost:5000/todo/addTodo/", {
        todoTitle: data.addTo,
        dates: moment(data.startDate).format("L"),
      })
      .then((response) => {
        console.log("🚀 ~ file: Addpage.js ~ line 44 ~ Addpage ~ .then ~ response", response)

      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const initialValues = {
      addTo: "",
      startDate: "",
    };
    return (
      <MDBContainer>
        <MDBRow className="text-center margin-t-100">
          <MDBCol lg="8" sm="10" size='12' className='col-example'>
            <MDBCardImage src='https://mdbcdn.b-cdn.net/img/new/standard/nature/182.jpg' className="img-fluid" alt='...' />
          </MDBCol>

          <MDBCol lg="4" sm="10" size='12' className='d-flex align-items-center justify-content-center'>

            <MDBRow>
              <Formik
                initialValues={initialValues}
                validationSchema={this.validationSchema}
                onSubmit={this.handleSubmit}
              >
                {({ resetForm, values, setFieldValue }) => (
                  <Form>
                    <MDBCol size='12'  >
                      <label>Add Todo</label>
                      <Field name="addTo" type="text" className="form-control" />
                      {/* <MDBInput name="addTo" label='Todo Title' id='typeText' type='text' /> */}

                      <ErrorMessage
                        name="addTo"
                        component="div"
                        className="text-danger"
                      />
                    </MDBCol>

                    <MDBCol size='12'  >
                      <label>Add Time</label>
                      <DatePicker
                        name="startDate"
                        value={values.startDate}
                        selected={values.startDate}
                        onChange={(date) => setFieldValue("startDate", date)}
                      />
                      <ErrorMessage
                        name="startDate"
                        component="div"
                        className="text-danger"
                      />
                    </MDBCol>


                    <MDBCol size='12 padding-tb'  >
                      <button type="submit" className="btn btn-primary">
                        Add Todo
                      </button>
                      <button
                        type="button"
                        onClick={resetForm}
                        className="btn btn-warning float-right"
                      >
                        Reset
                      </button>
                    </MDBCol>
                  </Form>
                )}
              </Formik>
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}
