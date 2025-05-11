"use client";
import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import { Calendar, Key, Lock, User } from 'lucide-react';
import { FaEnvelope } from 'react-icons/fa';

function App() {
  return (
    <MDBContainer fluid>

      <MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4 font-semibold" style={{fontFamily: "Lato"}}>Đăng ký</p>

             <div style={{ fontFamily: "Lato" }}>
                 <div className="d-flex align-items-center mb-4 gap-3">
                     <User width={30} height={30} />
                      <MDBInput label="Họ và tên" id="form1" type="text" className="w-100" />
                      </div>
                 <div className="d-flex align-items-center mb-4 gap-3">
                <Calendar width={30} height={30} />
                <MDBInput label="Ngày sinh" id="form3" type="date" className="w-100" />
             </div>
            <div className="d-flex align-items-center mb-4 gap-3">
             <FaEnvelope style={{ width: "30px", height: "30px" }} />
             <MDBInput label="Email của bạn" id="form2" type="email" className="w-100" />
            </div>
            <div className="d-flex align-items-center mb-4 gap-3">
            <Lock width={30} height={30} />
            <MDBInput label="Mật khẩu của bạn" id="form4" type="password" className="w-100" />
           </div>
           <div className="d-flex align-items-center mb-4 gap-3">
           <Key width={30} height={30} />
          <MDBInput label="Xác nhận mật khẩu" id="form5" type="password" className="w-100" />
          </div>
        <div className="mb-4">
        <MDBCheckbox name="flexCheck" value="" id="flexCheckDefault" label="Đăng ký nhận bản tin của chúng tôi"/>
        </div>
      </div>
              <MDBBtn className='mb-4 hover:bg-primary-foreground' size='lg' style={{fontSize: "20px", fontFamily: "Lato"}}>Đăng ký</MDBBtn>
            </MDBCol>

            <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
              <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid/>
            </MDBCol>

          </MDBRow>
        </MDBCardBody>
      </MDBCard>

    </MDBContainer>
  );
}

export default App;