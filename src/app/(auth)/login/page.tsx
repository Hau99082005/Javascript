"use client";
import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
}
from 'mdb-react-ui-kit';
import { FaFacebook, FaGoogle, FaInstagram } from 'react-icons/fa';
import Link from 'next/link';

function App() {
  return (
    <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden'>

      <MDBRow>

        <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>

          <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{color: 'hsl(218, 81%, 95%)', zIndex: 999}}>
            Chào mừng bạn đến với <br />
            <span style={{color: 'hsl(218, 81%, 75%)'}}>hệ thống đặt vé xem phim trực tuyến!</span>
          </h1>

          <p className='px-3' style={{color: 'hsl(218, 81%, 85%)'}}>
            Hãy đăng nhập để theo dõi lịch chiếu, đặt vé nhanh chóng, giữ chỗ tốt nhất và tận hưởng những ưu đãi dành riêng cho thành viên.
          <br/> Trải nghiệm điện ảnh đỉnh cao chỉ với vài cú nhấp chuột!
          </p>

        </MDBCol>

        <MDBCol md='4' className='position-relative'>

          <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
          <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

          <MDBCard className='my-5 bg-glass w-full rounded-full'>
            <MDBCardBody className='p-5'>
                <div className="flex justify-between items-center w-full">
              <h1 className="font-bold text-xl"style={{ fontFamily: "Lato", fontWeight: "bolder",fontSize: "20px" }}> Đăng Nhập </h1>
              <Link href="/register" className="text-blue-600 hover:underline font-semibold transition duration-200"
              style={{fontSize: "20px", fontFamily: "Lato", fontWeight: "bolder", textDecoration: "none", color: "#000"}}>Đăng ký</Link>
              </div>
              <MDBRow>
                <MDBCol col='6'>
                  <MDBInput wrapperClass='mb-4' label='Tài khoản' name='user' id='form1' type='text'/>
                </MDBCol>

              </MDBRow>

              <MDBInput wrapperClass='mb-4' label='Email hoặc số điện thoại' name='email' id='form3' type='email'/>
              <MDBInput wrapperClass='mb-4' label='Mật khẩu' name='password' id='form4' type='password'/>

              <div className='d-flex justify-content-center mb-4'>
                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Đăng ký nhận bản tin của chúng tôi' />
              </div>
             <button className="w-full rounded-full mb-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 transition duration-300"
              style={{border: "none", borderRadius: "5px", fontFamily: "Lato", fontSize: "20px"}}>
            Đăng nhập
            </button>
              <div className="text-center">

                <p>Hoặc đăng nhập với:</p>

                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1877f2' }}>
                  <FaFacebook style={{width: "30px", height: "30px"}}/>
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#c32aa3' }}>
                  <FaInstagram style={{width: "30px", height: "30px"}}/>
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#ea4335' }}>
                 <FaGoogle style={{width: "30px", height: "30px"}}/>
                </MDBBtn>
              </div>

            </MDBCardBody>
          </MDBCard>

        </MDBCol>

      </MDBRow>

    </MDBContainer>
  );
}

export default App;