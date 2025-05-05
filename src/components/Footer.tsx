"use client";
import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon, MDBNavbarItem, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from 'mdb-react-ui-kit';
import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image';
import { categories } from '@/constants';
import { toast } from 'sonner';


export default function Footer() {
  const date = new Date();
  console.log(date);

  const datve = () => {
    toast.success('Đặt vé thành công!');
    console.log(datve);
  }
  const datbapnuoc = () => {
    toast.success('Đặt bắt nước thành công!');
    console.log(datbapnuoc);
  }
  const English = () => {
    toast.success('Đã Chuyển đổi ngôn ngữ sang English!');
    console.log(English);
  }
  const VietNamese = () => {
    toast.success('Đã Chuyển đổi ngôn ngữ sang VietNameEse!');
    console.log(VietNamese);
  }
  return (
    <MDBFooter className='text-center text-lg-start text-mute' style={{ backgroundColor: "#1d1d1d", color: "#ffffff" }}>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block'>
          <span style={{fontFamily: "Lato", fontSize: "20px"}}>Kết nối với chúng tôi qua mạng xã hội: </span>
        </div>

        <div style={{display: "flex"}} className='flex items-center'>
          <Link href='' className='me-4 text-reset'>
            <Facebook width={30} height={30} className='text-gray-600 hover:text-blue-600 duration-200'/>
          </Link>
          <Link href='' className='me-4 text-reset'>
           <Twitter width={30} height={30} className='text-gray-600 hover:text-cyan-500 duration-200'/>
          </Link>
          <Link href='' className='me-4 text-reset'>
            <Youtube width={30} height={30} className='text-gray-600 hover:text-red-600 duration-200'/>
          </Link>
          <Link href='' className='me-4 text-reset'>
            <Instagram width={30} height={30} className='text-gray-600 hover:text-pink-600 duration-200'/>
          </Link>
          <Link href='' className='me-4 text-reset'>
            <Linkedin width={30} height={30} className='text-gray-600 hover:text-blue-700 duration-200'/>
          </Link>
        </div>
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md='3' lg='4' xl='3' className='mx-auto mb-4'>
              <Link href={'/'} className='text-uppercase fw-bold mb-4 text-center justify-center align-items-center'>
                <Image src={'/image/header-logo.webp'} alt='logo' width={200} height={200}/>
              </Link>
              <div className="flex gap-4" style={{marginTop: 20}}>
              <button onClick={datve} style={{borderRadius: "10px"}}
              className="w-[120px] h-[50px] rounded-xl bg-yellow-400 text-black font-semibold shadow-md transition duration-300 hover:bg-amber-600 hover:text-white hover:scale-105 active:scale-95"
              >
              Đặt Vé
            </button>
            <button onClick={datbapnuoc} style={{borderRadius: "10px"}}
             className="w-[120px] h-[50px] rounded-xl bg-yellow-400 text-black font-semibold shadow-md transition duration-300 hover:bg-amber-600 hover:text-white hover:scale-105 active:scale-95"
             >
              Đặt Bắp Nước
             </button>
           </div>
           <div className='flex gap-4' style={{marginTop: 20}}>
            <Link href={'/'}><Image src={'/image/facebook.png'} alt='facebook' width={40} height={40}/></Link>
            <Link href={'/'}><Image src={'/image/youtube.png'} alt='youtube' width={40} height={40}/></Link>
            <Link href={'/'}><Image src={'/image/tiktok.png'} width={40} height={40} alt='titok' className='hover:text-white duration-200'/></Link>
            <Link href={'/'}><Image src={'/image/instagram.png'} width={40} height={40} alt='instagram'/></Link>
           </div>
           <div className='flex gap-4 items-center mt-5'>
            <p className='font-semibold' style={{fontSize: "18px", fontFamily: "Lato", display: "flex", gap: "5px"}}>Ngôn ngữ: 
              <MDBNavbarItem style={{display: "flex"}}>
                <MDBDropdown className='flex gap-2'>
                  <MDBDropdownToggle tag={'a'} className='nav-link dropdown-toggle !after:hidden flex items-center gap-2' role='button' style={{padding: '5px 10px', display: 'flex', alignItems: 'center'}}>
                   <Image src={'/image/vietnam.png'} alt='vietnam' width={30} height={30} className='w-full rounded-full'/>
                   <button className='font-semibold' style={{fontFamily: "Lato"}} onClick={VietNamese}>VN</button>
                  </MDBDropdownToggle>
                  <MDBDropdownMenu style={{border: 'none',borderRadius: '10px',padding: '5px'}}>
                    <MDBDropdownItem style={{display: 'flex', gap: '10px',padding: '10px 15px', borderRadius: '10px', alignItems: 'center'}}
                     className='hover:bg-blue-600 transition-all duration-200 w-full hover:text-white rounded-lg ease-in-out'
                    >
                      <Image src={'/image/united-kingdom.png'} alt='english' width={30} height={30} className='rounded-full'/> 
                      <button className='font-semibold' style={{fontFamily: "Lato"}} onClick={English}>EN</button>
                    </MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavbarItem>
            </p>
           </div>
            </MDBCol>

            <MDBCol md='2' lg='2' xl='2' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Danh Mục</h6>
              <p style={{display: "inline-grid", grid: "none", gap: "10px"}}>
                {categories.map((item, index) => (
                  <Link href={item.href} key={index} className='text-reset' style={{textDecoration: "none"}}>
                  {item.title}
                </Link>
                ))}
              </p>
             
            </MDBCol>

            <MDBCol md='3' lg='2' xl='2' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Dịch vụ khác</h6>
              <p>
                <Link href='#!' className='text-reset' style={{textDecoration: "none"}}>
                  Nhà Hàng
                </Link>
              </p>
              <p>
                <Link href='#!' className='text-reset' style={{textDecoration: "none"}}>
                  Kidzone
                </Link>
              </p>
              <p>
                <Link href='#!' className='text-reset' style={{textDecoration: "none"}}>
                  Bowling
                </Link>
              </p>
              <p>
                <Link href='#!' className='text-reset' style={{textDecoration: "none"}}>
                  Billiards
                </Link>
              </p>
              <p>
                <Link href='#!' className='text-reset' style={{textDecoration: "none"}}>
                Gym
                </Link>
              </p>
              <p>
                <Link href='#!' className='text-reset' style={{textDecoration: "none"}}>
                Nhà hàng Opera
                </Link>
              </p>
              <p>
                <Link href='#!' className='text-reset' style={{textDecoration: "none"}}>
                 Coffee
                </Link>
              </p>
            </MDBCol>

            <MDBCol md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Liên Hệ</h6>
              <p>
                <MDBIcon color='secondary' icon='home' className='me-2' />
                70 Nguyễn Huệ, Vĩnh Ninh,TP Huế
              </p>
              <p>
                <MDBIcon color='secondary' icon='envelope' className='me-3' />
                hau99082005@gmail.com
              </p>
              <p>
                <MDBIcon color='secondary' icon='phone' className='me-3' /> 0367722389
              </p>
              <p>
                <MDBIcon color='secondary' icon='print' className='me-3' /> 0798998999
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © {date.getFullYear()} Cinestar |
        <Link className='text-reset fw-bold' href={'/'} style={{textDecoration: "none"}}>
        &nbsp; All rights reserved.
        </Link>
      </div>
    </MDBFooter>
  );
}

