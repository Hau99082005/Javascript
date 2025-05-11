import React from 'react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Image from 'next/image';
import { movie } from '@/constants';
import Link from 'next/link';
import { Play } from 'lucide-react';

const Card = () => {
  return (
    <div className="px-4 py-6 bg-[#0f0f1a]">
      <h2 className='text-white font-semibold text-center justify-center uppercase' style={{fontFamily: "Lato", fontWeight: "bolder"}}>Phim Đang Chiếu</h2>
     <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        breakpoints={{
       0: {
        slidesPerView: 1, 
       },
       640: {
       slidesPerView: 1,
       },
      768: {
       slidesPerView: 2,
      },
      1024: {
      slidesPerView: 3,
     },
    }}
    >
        {movie.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="relative rounded-2xl overflow-hidden shadow-xl transition-transform duration-300 hover:scale-105 group bg-white">
              <div className="absolute top-2 left-2 z-10 bg-red-600 text-white px-2 py-1 text-sm font-bold rounded shadow-md">
                {item?.badge}
              </div>
              <Image src={item?.image} alt={item?.title} width={500} height={700} className="w-full h-[380px] object-cover"
              />
              <div className="bg-black text-white text-center p-3">
                <h3 className="text-lg font-semibold leading-tight" style={{fontFamily: "Lato", fontSize: "25px"}}>{item?.title}</h3>
                <p className="text-sm text-gray-300 mt-1" style={{fontFamily: "Lato", fontSize: "18px"}}>Khởi chiếu: {item?.date}</p>
               <div className="flex justify-between items-center mt-4 px-4">
         <Link href="/" className="flex items-center gap-2 bg-white rounded-full shadow-md hover:scale-105 transition-transform duration-300 px-4 py-2"
          style={{ textDecoration: "none" }}>
          <Play color="red" className="rounded-full" style={{ width: 24, height: 24 }} />
          <span className="uppercase text-sm font-semibold text-black">Xem trailer</span>
         </Link>
         <button
         className="bg-gradient-to-r from-yellow-400 to-yellow-700 hover:from-purple-600 hover:to-purple-800 duration-200 text-white px-6 py-2 rounded-full text-sm font-bold uppercase shadow-md transition-transform hover:scale-105"
         style={{ border: "none", borderRadius: "5px" }}
         >
         Đặt vé
         </button>
            </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    <div className="w-full flex justify-center mt-6">
       <button className="bg-gradient-to-r from-yellow-400 to-yellow-700 hover:from-purple-600 hover:to-purple-800 duration-200 text-white px-6 py-2 rounded-full text-sm font-bold uppercase shadow-md transition-transform hover:scale-105"
       style={{borderRadius: "10px"}}>
        Xem thêm
      </button>
    </div>
    </div>
  );
};

export default Card;
