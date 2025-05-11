import { localtion, movie } from '@/constants';
import { MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle } from 'mdb-react-ui-kit';
import React from 'react';
import { toast } from 'sonner';

const Tickers = () => {
    const handlebutton = () => {
        toast.success('Đã đặt thành công!');
    }
  return (
   <div className="px-4 py-6 bg-[#1d1d1d]">
  <div className="bg-[#f0f3ff] p-4 rounded-lg shadow-md">
    <h3 className="text-xl font-bold text-gray-800 mb-4 uppercase" style={{fontFamily: "Lato", fontSize: "25px", fontWeight: "bolder"}}>ĐẶT VÉ NHANH</h3>
    <form className="grid grid-cols-1 md:grid-cols-5 gap-3 items-end">
      <div>
        <MDBDropdown style={{borderRadius: "10px", border: "1px solid purple"}}>
          <MDBDropdownToggle tag="a" className="bg-white border px-3 py-2 rounded-md w-full block text-center" role="button"
          style={{color: "purple", textDecoration: "none", fontFamily: "Lato", fontWeight: "bolder", fontSize: "20px"}}>
            1. Chọn Rạp
          </MDBDropdownToggle>
          <MDBDropdownMenu style={{maxWidth: "100%", maxHeight: '200px',overflowY: 'auto',borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
           backgroundColor: 'white',  padding: '5px 10px',}}>
            {localtion.map((item, index) => (
              <MDBDropdownItem key={index} href={item?.href}>
                {item?.title}
              </MDBDropdownItem>
            ))}
          </MDBDropdownMenu>
        </MDBDropdown>
      </div>
      <div>
        <MDBDropdown style={{borderRadius: "10px", border: "1px solid purple"}}>
          <MDBDropdownToggle tag="a" className="bg-white border px-3 py-2 rounded-md w-full block text-center" role="button"
          style={{color: "purple", textDecoration: "none", fontFamily: "Lato", fontWeight: "bolder", fontSize: "20px"}}>
            2. Chọn Phim
          </MDBDropdownToggle>
          <MDBDropdownMenu style={{maxWidth: "100%", maxHeight: "200px", overflowY: "auto", borderRadius: "8px",boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
            backgroundColor: "white", padding: "5px 10px",
          }}>
            {movie.map((item, index) => (
              <MDBDropdownItem key={index}>{item.title}</MDBDropdownItem>
            ))}
          </MDBDropdownMenu>
        </MDBDropdown>
      </div>
      <div>
        <MDBDropdown style={{borderRadius: "10px", border: "1px solid purple"}}>
          <MDBDropdownToggle tag="a" className="bg-white border px-3 py-2 rounded-md w-full block text-center" role="button"
          style={{color: "purple", textDecoration: "none",fontFamily: "Lato",fontWeight: "bolder", fontSize: "20px"}}>
            3. Chọn Ngày
          </MDBDropdownToggle>
          <MDBDropdownMenu style={{maxWidth: "100%", maxHeight: '200px',overflowY: 'auto',borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
           backgroundColor: 'white',  padding: '5px 10px',}}>
           {movie.map((item, index) => (
         <MDBDropdownItem key={index}>
           {item.date}
        </MDBDropdownItem>
        ))}
      </MDBDropdownMenu>
        </MDBDropdown>
      </div>
      <div>
        <MDBDropdown style={{borderRadius: "10px", border: "1px solid purple"}}>
          <MDBDropdownToggle tag="a" className="bg-white px-3 py-2 rounded-md w-full block text-center" role="button"
          style={{color: "purple",textDecoration: "none", fontFamily: "Lato", fontWeight: "bolder", fontSize: "20px"}}>
            4. Chọn Suất
          </MDBDropdownToggle>
        </MDBDropdown>
      </div>
      <div>
        <button onClick={handlebutton} className="bg-[#7b1fa2] hover:bg-[#9c27b0] text-white px-4 py-2 w-full font-semibold"
        style={{borderRadius: "10px", border: "1px solid purple", fontSize: "20px", fontWeight: "bolder", fontFamily: "Lato"}}>
          ĐẶT NGAY
        </button>
      </div>
    </form>
  </div>
</div>

  );
}

export default Tickers;
