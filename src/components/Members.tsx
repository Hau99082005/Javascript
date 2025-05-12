import Image from 'next/image';
import React from 'react';

const Members = () => {
  return (
    <div className="bg-[#1d1d1d] py-12 px-4" style={{backgroundImage: "url('/image/bg-cfriends.webp')",backgroundSize: "cover", backgroundPosition: "center"}}>
      <div className="max-w-6xl mx-auto text-center">
        <h2
          className="text-white text-center align-items-center justify-center font-semibold uppercase mt-3"
          style={{ fontFamily: 'Lato', fontWeight: "bolder" }}
        >
          Chương Trình Thành Viên
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-5">
          <div className="bg-transparent rounded-lg shadow-md overflow-hidden" style={{background: "none"}}>
            <Image src="/image/bg-cfriends.webp" alt="C'Friend" width={500} height={700} className="w-full h-[300px] object-cover" style={{borderRadius: "10px", boxShadow: "0px 0px 20px #f1c40f"}}/>
            <div className="p-6 bg-transparent text-left">
              <h5 className="text-white font-semibold uppercase mb-2" style={{ fontFamily: 'Lato', fontWeight: "bolder",fontSize: "30px"}}>
                Thành viên C'Friend
              </h5>
              <p className="text-white mb-4" style={{ fontFamily: 'Lato', fontSize: "20px", fontWeight: "lighter"}}>
                Thẻ C'Friend nhiều ưu đãi cho thành viên mới
              </p>
              <button
                className="bg-gradient-to-r from-yellow-400 to-yellow-700 text-white font-semibold uppercase px-5 py-3 rounded-[10px] shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 hover:from-[#8b1dd0] hover:to-[#5c0fa7]"
                style={{ fontFamily: 'Lato', fontSize: '20px', borderRadius: "10px" }}
              >
                Tìm hiểu ngay
              </button>
            </div>
          </div>
          <div className="bg-transparent rounded-lg shadow-md overflow-hidden">
            <Image src="/image/c-vip.webp" alt="C'VIP"  width={500} height={700} className="w-full h-[300px] object-cover" style={{borderRadius: "10px", boxShadow: "0px 0px 20px #f1c40f"}} />
            <div className="p-6 bg-transparent text-left">
              <h5 className="text-white font-semibold uppercase mb-2" style={{ fontFamily: 'Lato', fontWeight: "bolder", fontSize: "30px" }}>
                Thành viên C'VIP
              </h5>
              <p className="text-white mb-4" style={{ fontFamily: 'Lato', fontSize: "20px", fontWeight: "lighter" }}>
                Thẻ VIP CineStar mang đến sự ưu đãi độc quyền
              </p>
              <button
                className="bg-gradient-to-r from-yellow-400 to-yellow-700 text-white font-semibold uppercase px-5 py-3 rounded-[10px] shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 hover:from-[#8b1dd0] hover:to-[#5c0fa7]"
                style={{ fontFamily: 'Lato', fontSize: '20px', borderRadius: "10px" }}
              >
                Tìm hiểu ngay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Members;
