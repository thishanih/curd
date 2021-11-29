import React from 'react'
import "react-router-dom";
import {
    MDBContainer,
    MDBNavbar,
    MDBBtn
} from 'mdb-react-ui-kit';

export default function Nav() {
    return (
        <div>
            <MDBNavbar light bgColor='light'>
                <MDBContainer >
                    <a href="/"  className='navbar-brand'>Navbar</a>
                    <form className='d-flex input-group w-auto'>
                        <MDBBtn href="/add-page" color='primary'>Add Value</MDBBtn>
                    </form>
                </MDBContainer>
            </MDBNavbar>
        </div>
    )
}
