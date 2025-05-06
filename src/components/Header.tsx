"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Search, Ticket, User, Wheat, MapPin } from "lucide-react";
import { categories, headerData } from "@/constants";
import { MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle } from "mdb-react-ui-kit";
import { toast } from "sonner";
import Container from "./Container";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const English = () => toast.success("Đã chuyển sang English!");
  const VietNamese = () => toast.success("Đã chuyển sang Vietnamese!");

  return (
    <header className="w-full bg-[#1d1d1d] text-white z-50">
      <div className="flex gap-2 justify-between items-center py-3 px-4 md:px-6 relative">
        <Link href="/">
          <Image src="/image/header-logo.webp" alt="Cinestar Logo" width={200} height={200} className="object-cover" priority/>
        </Link>
        <div className="hidden lg:flex items-center gap-3">
          <button className="flex items-center gap-2 bg-amber-400 hover:bg-amber-600 hover:text-white text-black px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200"
          style={{border: "none", borderRadius: "10px", margin: "0", padding: "5px 10px"}}
          >
            <Ticket size={18} /> Đặt vé ngay
          </button>
          <button className="flex items-center gap-2 bg-amber-400 hover:bg-amber-600 text-black hover:text-white px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200"
          style={{border: "none", borderRadius: "10px", margin: "0", padding: "5px 10px"}}>
            <Wheat size={18} /> Đặt Bắp Nước
          </button>
          <div className="flex items-center gap-3" style={{display: "flex"}}>
            <MDBDropdown>
              <MDBDropdownToggle
                tag="a"
                className="nav-link dropdown-toggle !after:hidden flex items-center gap-1"
              >
                <Image src="/image/vietnam.png" alt="VN" width={30} height={30} className="rounded-full" />
                <button onClick={VietNamese}>VN</button>
              </MDBDropdownToggle>
              <MDBDropdownMenu>
              <MDBDropdownItem style={{display: 'flex', gap: '10px',padding: '5px 10px', borderRadius: '10px', alignItems: 'center'}}
              className='hover:bg-blue-600 transition-all duration-200 w-full hover:text-white rounded-lg ease-in-out'>
              <Image src={'/image/united-kingdom.png'} alt='english' width={30} height={30} className='rounded-full'/> 
              <button className='font-semibold' style={{fontFamily: "Lato"}} onClick={English}>EN</button>
              </MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>

            <Link
              href="#!"
              className="flex items-center gap-1 px-3 py-2 border border-white rounded-full text-white hover:text-amber-600 transition"
              style={{textDecoration: "none"}}
            >
              <User size={25}  className="font-semibold"/> <span className="text-sm font-semibold hover:text-amber-600" style={{fontFamily: "Lato", fontSize: "18px"}}>Đăng Nhập</span>
            </Link>
          </div>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-white"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      <Container className="w-full rounded-full">
      <section className="flex flex-col lg:flex-row justify-center lg:justify-between p-4 border-t-2">
    <div className="flex flex-col lg:flex-row gap-4">
    <span className="group flex items-center text-[18px] font-lato cursor-pointer transition-all hover:text-amber-600 gap-2 duration-200">
      <MapPin width={25} height={25} className="transition-transform group-hover:scale-110" />
      Chọn rạp
    </span>
    <span className="group flex items-center text-[18px] font-lato cursor-pointer transition-all hover:text-amber-600 gap-2 duration-200">
      <MapPin width={25} height={25} className="transition-transform group-hover:scale-110" />
      Lịch Chiếu
    </span>
    </div>
    <div className="flex flex-wrap gap-4 md:gap-6 lg:gap-8 items-center">
      {headerData.map((item, index) => (
     <Link href={item.href} key={index}
      className="font-semibold text-white no-underline text-[16px] md:text-[18px] lg:text-[20px] duration-200 transition-all  duration-200 hover:text-yellow-400"
      style={{ fontFamily: 'Lato', textDecoration: 'none' }}
      >
      {item?.title}
    </Link>
     ))}
    </div>
    </section>
      </Container>
      <div className="bg-[#111] py-3 px-4 md:px-6">
      <div className="max-w-3xl mx-auto flex items-center bg-white rounded-full overflow-hidden px-3 py-1">
      <input type="text" placeholder="Tìm phim, rạp..." style={{fontFamily: "Lato", fontSize: "18px"}}
        className="flex-grow bg-transparent text-black px-3 py-2 focus:outline-none text-sm placeholder-gray-500"/>
     <button className="flex items-center justify-center bg-none transition-all rounded-full w-10 h-10"
    style={{ minWidth: "40px", minHeight: "40px" }}
  >
    <Search size={25} className="text-black font-bold" />
  </button>
     </div>
      </div>
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#1d1d1d] px-4 py-4 space-y-3 font-semibold text-sm">
          {headerData.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="block hover:text-amber-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.title}
            </Link>
          ))}

          <div>
            <p className="text-white font-bold mb-1">Bộ sưu tập:</p>
            {categories.map((item, index) => (
              <p
                key={index}
                className="hover:text-amber-600 cursor-pointer px-2 py-1"
              >
                {item.title}
              </p>
            ))}
          </div>

          <div className="flex flex-wrap justify-center items-center gap-3 pt-3 border-t border-white/20">
          <button className="bg-amber-400 text-black px-4 py-2 rounded-full flex items-center gap-2 hover:bg-amber-600 transition-all duration-200"
           style={{ border: "none", borderRadius: "10px" }}>
           <Ticket size={18} /> Đặt vé ngay
          </button>
          <button className="bg-amber-400 text-black px-4 py-2 rounded-full flex items-center gap-2 hover:bg-amber-600 transition-all duration-200"
          style={{ border: "none", borderRadius: "10px" }}>
          <Wheat size={18} /> Đặt Bắp Nước
         </button>
         <Link href="#!" className="flex items-center gap-2 px-4 py-2 border border-white rounded-full text-white hover:text-amber-600 transition"
        style={{ textDecoration: "none", fontFamily: "Lato", fontSize: "16px" }}>
         <User size={20} className="font-semibold" />
         <span className="font-semibold hover:text-amber-600">Đăng Nhập</span>
        </Link>
       </div>
        </div>
      )}
    </header>
  );
}
