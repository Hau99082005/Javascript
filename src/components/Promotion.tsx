import React from 'react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Image from 'next/image';

const Promotion = () => {
  return (
    <div className="bg-[#1d1d1d] py-10 px-4 md:px-10">
      <h2
        className="text-2xl md:text-3xl text-white font-bold uppercase mb-6 tracking-wide border-l-4 border-[#FFD600] pl-3"
        style={{ fontFamily: 'Lato' }}
      >
        Khuyến mãi hot
      </h2>

      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        className="promotion-swiper"
      >
        {[
          '/image/monday_1.webp',
          '/image/km-m-1.webp',
          '/image/km-m-2.webp',
          '/image/km-m-3.webp',
        ].map((src, index) => (
          <SwiperSlide key={index}>
            <div className="relative overflow-hidden rounded-xl bg-white shadow-lg transition-transform duration-300 hover:scale-105">
              <Image
                src={src}
                alt={`Khuyến mãi ${index + 1}`}
                width={500}
                height={700}
                className="w-full h-[300px] object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="mt-5 flex justify-center">
    <button className="bg-gradient-to-r from-yellow-400 to-yellow-700 text-white font-semibold uppercase px-5 py-3 rounded-full shadow-md hover:bg-[#8b1dd0] hover:text-white transition duration-300"
    style={{border: "none", borderRadius: "10px", fontFamily: "Lato", fontSize: "20px"}}>
     Tất cả ưu đãi
    </button>
   </div>
    </div>
  );
};

export default Promotion;
