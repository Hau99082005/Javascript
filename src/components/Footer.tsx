"use client";
import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import Link from "next/link";
import Image from "next/image";
import { FaEnvelope, FaMapMarker, FaPhone } from "react-icons/fa";

export default function Footer() {
  const date = new Date();

  return (
    <MDBFooter bgColor="light" className="text-lg-start text-muted border-top pt-5">
      <MDBContainer className="text-md-start">
        <MDBRow className="mt-3">
          <MDBCol md="4" lg="4" xl="4" className="mb-4">
            <h6 className="fw-bold mb-3">
              <Image
                src={"/images/fahasa-logo.webp"}
                alt="logo"
                width={200}
                height={200}
                style={{ height: "auto" }}
              />
            </h6>
            <p className="mb-2">
              Lầu 5, 387-389 Hai Bà Trưng Quận 3 TP HCM<br />
              Công Ty Cổ Phần Phát Hành Sách TP HCM - FAHASA<br />
              60 - 62 Lê Lợi, Quận 1, TP. HCM, Việt Nam
            </p>
            <p className="mb-0">
              Fahasa.com nhận đặt hàng trực tuyến và giao hàng tận nơi.<br />
              KHÔNG hỗ trợ đặt mua và nhận hàng trực tiếp tại văn phòng<br />
              cũng như tất cả Hệ Thống Fahasa trên toàn quốc.
            </p>
          </MDBCol>
          <MDBCol md="2" lg="2" xl="2" className="mb-4">
            <h6 className="text-uppercase fw-bold mb-3">DỊCH VỤ</h6>
            <ul className="list-unstyled">
              <li><Link href="#" className="text-reset text-decoration-none">Điều khoản sử dụng</Link></li>
              <li><Link href="#" className="text-reset text-decoration-none">Chính sách bảo mật thông tin cá nhân</Link></li>
              <li><Link href="#" className="text-reset text-decoration-none">Chính sách bảo mật thanh toán</Link></li>
              <li><Link href="#" className="text-reset text-decoration-none">Giới thiệu Fahasa</Link></li>
              <li><Link href="#" className="text-reset text-decoration-none">Hệ thống trung tâm - nhà sách</Link></li>
            </ul>
          </MDBCol>

          <MDBCol md="2" lg="2" xl="2" className="mb-4">
            <h6 className="text-uppercase fw-bold mb-3">HỖ TRỢ</h6>
            <ul className="list-unstyled">
              <li><Link href="#" className="text-reset text-decoration-none">Chính sách đổi - trả - hoàn tiền</Link></li>
              <li><Link href="#" className="text-reset text-decoration-none">Chính sách bảo hành - bồi hoàn</Link></li>
              <li><Link href="#" className="text-reset text-decoration-none">Chính sách vận chuyển</Link></li>
              <li><Link href="#" className="text-reset text-decoration-none">Chính sách khách sỉ</Link></li>
            </ul>
          </MDBCol>
          <MDBCol md="2" lg="2" xl="2" className="mb-4">
            <h6 className="text-uppercase fw-bold mb-3">TÀI KHOẢN CỦA TÔI</h6>
            <ul className="list-unstyled">
              <li><Link href="#" className="text-reset text-decoration-none">Đăng nhập/Tạo mới tài khoản</Link></li>
              <li><Link href="#" className="text-reset text-decoration-none">Thay đổi địa chỉ khách hàng</Link></li>
              <li><Link href="#" className="text-reset text-decoration-none">Chi tiết tài khoản</Link></li>
              <li><Link href="#" className="text-reset text-decoration-none">Lịch sử mua hàng</Link></li>
            </ul>
          </MDBCol>
          <MDBCol md="2" lg="2" xl="2" className="mb-md-0 mb-4">
            <h6 className="text-uppercase fw-bold mb-3">LIÊN HỆ</h6>
            <ul className="list-unstyled">
              <li className="mb-2 flex gap-2"><FaMapMarker/>60-62 Lê Lợi, Q.1, TP. HCM</li>
              <li className="mb-2 flex gap-2"><FaEnvelope/>cskh@fahasa.com.vn</li>
              <li className="flex gap-2"><FaPhone/>1900636467</li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="text-center py-4" style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}>
        © {date.getFullYear()} Copyright:{" "}
        <Link href="/" className="text-reset fw-bold text-decoration-none">
          Fahasa
        </Link>
      </div>
    </MDBFooter>
  );
}
