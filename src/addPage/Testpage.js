import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


// main style file
import "../assets/style.css";
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment'
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBCardImage, MDBBtn, MDBBadge } from 'mdb-react-ui-kit';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';




export default function Testpage() {


    const [addTo, setAddTo] = useState("");
    const [addTime, setTime] = useState("");

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState();


    const onAddTodo = (e) => {
        setAddTo(e.target.value);
    };

    const onTime = (date) => {
        var formateDate = moment(date).format('L');
        setTime(formateDate);
    };

    const navigate = useNavigate();



    // TODO ADD
    const addFunc = async () => {
        await axios
            .post("http://localhost:5000/todo/addTodo/", {
                todoTitle: addTo,
                dates: addTime,
            })
            .then((response) => {
                console.log("🚀 ~ file: AddPage.js ~ line 28 ~ .then ~ response", response)
                navigate('/')
            })
            .catch((error) => {
                setShowAlert(true);
                setAlertMessage(error.response.data);
            });
    };


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
                                <h2 className="padding-tb">Add Todo</h2>
                            </MDBCol >
                            <MDBCol size='12'  >
                                <MDBInput onChange={onAddTodo}  label='Todo Title' id='typeText' type='text' />
                            </MDBCol >

                            <MDBCol size='12' className="margin-t">
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        date={new Date()}
                                        margin="normal"
                                        id="date-picker-inline"
                                        // label="Date picker inline"
                                        value={addTime}
                                        onChange={onTime}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </MDBCol >

                          

                            <MDBCol size='12' className='col-example padding-tb'>
                                {showAlert ? (
                                    <MDBBadge className="mx-2 " color="danger">
                                        {alertMessage}
                                    </MDBBadge>
                                ) : null}
                            </MDBCol>

                            <MDBCol size='12' className="d-flex justify-content-center d-grid gap-2" >
                                <MDBBtn onClick={addFunc} className="margin-t d-grid gap-2">Add Todo</MDBBtn>
                            </MDBCol >

                        </MDBRow>
                    </MDBCol>
                </MDBRow>
            </MDBContainer >
        </div >
    )
}
