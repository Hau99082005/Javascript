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
}
from 'mdb-react-ui-kit';
import Link from 'next/link';
import { FaGoogle } from 'react-icons/fa';
import { FaInstagramSquare } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

function App() {
  return (
  <MDBContainer
  fluid
  className="w-full"
  style={{
    backgroundImage: `url('/image/monday_1.webp')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backdropFilter: 'blur(5px)',
  }}
>
  <MDBRow className="d-flex justify-content-center align-items-center h-100">
    <MDBCol col="12">
      <MDBCard
        className="my-5 mx-auto shadow-lg"
        style={{
          borderRadius: '1rem',
          maxWidth: '400px',
          background: 'rgba(255, 255, 255, 0.25)',
          border: '1px solid #ccc',
        }}
      >
        <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100 text-center">
          <h2 className="fw-bold mb-2 text-dark">Đăng Nhập</h2>
          <p className="text-[#1d1d1d] mb-4" style={{ fontSize: '15px', fontFamily: 'Lato' }}>
            Vui lòng đăng nhập để nhận ưu đãi hấp dẫn!
          </p>

          <MDBInput
            wrapperClass="mb-4 w-100"
            labelClass="text-[#1d1d1d]"
            label="Số điện thoại"
            id="formControlPhone"
            type="text"
            size="lg"
          />
          <MDBInput
            wrapperClass="mb-4 w-100"
            labelClass="text-[#1d1d1d]"
            label="Mật khẩu"
            id="formControlPassword"
            type="password"
            size="lg"
          />

          <p className="small mb-3">
            <Link href="#!" className="text-[#1d1d1d] text-decoration-none">
              Quên mật khẩu?
            </Link>
          </p>

          <MDBBtn
            outline
            className="w-100 rounded-pill"
            size="lg"
            style={{
              border: '1px solid #007bff',
              color: '#007bff',
              fontFamily: 'Lato',
              transition: '0.3s',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#007bff', e.target.style.color = '#fff')}
            onMouseOut={(e) => (e.target.style.backgroundColor = 'transparent', e.target.style.color = '#007bff')}
          >
            Đăng Nhập
          </MDBBtn>

          <div className="d-flex flex-row mt-4 mb-4 justify-content-center">
            <MDBBtn tag="a" color="none" className="m-2" style={{ color: '#1877f2' }}>
              <FaFacebook style={{ width: '28px', height: '28px' }} />
            </MDBBtn>
            <MDBBtn tag="a" color="none" className="m-2" style={{ color: '#c32aa3' }}>
              <FaInstagramSquare style={{ width: '28px', height: '28px' }} />
            </MDBBtn>
            <MDBBtn tag="a" color="none" className="m-2" style={{ color: '#ea4335' }}>
              <FaGoogle style={{ width: '28px', height: '28px' }} />
            </MDBBtn>
          </div>

          <p className="mb-0 text-muted">
            Bạn chưa có tài khoản?{' '}
            <Link href="register" className="fw-bold text-primary text-decoration-none">
              Đăng ký
            </Link>
          </p>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  </MDBRow>
</MDBContainer>

  );
}

export default App;