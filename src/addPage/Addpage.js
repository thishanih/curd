import React, { Component } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'

export default class Addpage extends Component {

  state = {
    startDate: new Date()
  };

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = date => {
    var date = moment(date).format('L');
    console.log("🚀 ~ file: Addpage.js ~ line 23 ~ Addpage ~ date", date)
    this.setState({
      startDate: date
    });
  };

  validationSchema() {
    return Yup.object().shape({
      addTo: Yup.string()
        .required('Add Todo is required')
        .min(6, 'Add Todo must be at least 6 characters')
        .max(20, 'Add Todo must not exceed 20 characters'),

      startDate: Yup.string()
        .required('Add startDate is required'),
    });
  }

  handleSubmit(data) {
    console.log(JSON.stringify(data, null, 2));
  }


  render() {
    const initialValues = {
      addTo: '',
      startDate: '',

    };
    return (
      <div>
        <div className="register-form">
          <Formik
            initialValues={initialValues}
            validationSchema={this.validationSchema}
            onSubmit={this.handleSubmit}
          >
            {({ resetForm }) => (
              <Form>
                <div className="form-group">
                  <label>Add Todo</label>
                  <Field name="addTo" type="text" className="form-control" />
                  <ErrorMessage
                    name="addTo"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="form-group">
                  <label>Add Time</label>
                  <DatePicker
                    name="startDate"
                    selected={this.state.startDate}
                    onChange={this.handleChange}
                  />
                  <ErrorMessage
                    name="startDate"
                    component="div"
                    className="text-danger"
                  />
                </div>


                <div className="form-group">
                  <button type="submit" className="btn btn-primary">
                    Register
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="btn btn-warning float-right"
                  >
                    Reset
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    )
  }
}
