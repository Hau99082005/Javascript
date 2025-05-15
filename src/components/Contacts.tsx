'use client';
import React from 'react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { SiFacebook, SiZalo } from 'react-icons/si';
import { FaEnvelope, FaPhone, FaFacebookMessenger } from 'react-icons/fa';
import { MapPin } from 'lucide-react';
import Link from 'next/link';

const Contacts = () => {
  return (
    <div
      className="py-16 px-6 bg-gradient-to-r from-[#bb86fc] to-[#1d1d1d]"
      style={{ fontFamily: 'Lato' }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="bg-gradient-to-br from-[#3498db] to-[#2980b9] rounded-2xl p-8 text-white shadow-2xl">
          <h2 className="text-3xl font-bold text-center mb-8" style={{fontSize: "30px", fontFamily: "Lato", fontWeight: "bolder"}}>Thông Tin Liên Hệ</h2>
          <div className="space-y-4 mb-8 text-lg">
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-yellow-300 text-2xl" />
              <span>hau99082005@gmail.com</span>
            </div>
            <div className="flex items-center gap-3">
              <FaPhone className="text-yellow-300 text-2xl" />
              <span>0367 722 389</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="text-yellow-300 text-2xl" />
              <span>73 Phan Đình Phùng - P. Vĩnh Ninh - TP Huế</span>
            </div>
          </div>

          <form className="flex flex-col text-base">
            <Input className="mb-4 rounded-md border-none shadow text-white" type="text" name="name" placeholder="Họ và tên" required />
            <Input className="mb-4 rounded-md border-none shadow text-white" type="email" name="email" placeholder="Email của bạn" required />
            <Textarea className="mb-4 rounded-md border-none shadow min-h-[100px] text-white" name="message" placeholder="Thông tin liên hệ hoặc phản ánh" required />
            <button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold uppercase py-3 rounded-xl transition duration-300 shadow-lg"
             style={{border: "none", borderRadius: "10px"}}
            >
              GỬI NGAY
            </button>
          </form>
        </div>
        <div className="flex flex-col justify-center items-center text-white">
          <h3 className="text-2xl font-bold mb-6" style={{fontFamily: "Lato", fontSize: "30px", fontWeight: "bolder"}}>Liên Hệ Qua Mạng Xã Hội</h3>
          <div className="space-y-5 w-full max-w-sm">
            <Link
             style={{textDecoration: "none"}}
              href="/"
              className="flex items-center gap-4 bg-white/10 hover:bg-white/20 px-5 py-4 rounded-lg transition duration-300 text-white shadow hover:shadow-lg"
            >
              <SiFacebook className="text-blue-500 text-4xl" width={30} height={30} />
              <span className="text-lg font-medium" style={{fontFamily: "Lato", fontSize: "20px", fontWeight: "bolder"}}>Facebook</span>
            </Link>
            <Link
              style={{textDecoration: "none"}}
              href="/"
              className="flex items-center gap-4 bg-white/10 hover:bg-white/20 px-5 py-4 rounded-lg transition duration-300 text-white shadow hover:shadow-lg"
            >
              <SiZalo className="text-blue-400 text-4xl" width={30} height={30} />
              <span className="text-lg font-medium" style={{fontFamily: "Lato", fontSize: "20px", fontWeight: "bolder"}}>Zalo</span>
            </Link>
            <Link
            style={{textDecoration: "none"}}
              href="/"
              className="flex items-center gap-4 bg-white/10 hover:bg-white/20 px-5 py-4 rounded-lg transition duration-300 text-white shadow hover:shadow-lg"
            >
              <FaFacebookMessenger className="text-[#3b82f6] text-4xl" width={30} height={30} />
              <span className="text-lg font-medium" style={{fontFamily: "Lato", fontSize: "20px", fontWeight: "bolder"}}>Messenger</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
