"use client";
import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";
const banners = [
  { src: "/images/banner1.webp", alt: "Banner 1" },
  { src: "/images/banner2.webp", alt: "Banner 2" },
  { src: "/images/banner3.webp", alt: "Banner 3" },
  { src: "/images/banner4.webp", alt: "Banner 4" },
  { src: "/images/banner5.webp", alt: "Banner 5" },
  { src: "/images/banner6.webp", alt: "Banner 6" },
];

const subBanners = [
  { src: "/images/ShopeeT6.webp", alt: "Sub 1" },
  { src: "/images/homecreditT6_392x156.webp", alt: "Sub 2" },
];

const iconMenu = [
  { icon: "/images/Icon_day_1506_120x120.webp", label: "Day" },
  { icon: "/images/IconFlashSale120x120.webp", label: "Flash Sale" },
  { icon: "/images/Icon_Bitex_120x120.webp", label: "Bình Tây" },
  { icon: "/images/vinhthinh.webp", label: "Vĩnh Thịnh" },
  { icon: "/images/magiamgia.webp", label: "Mã Giảm Giá" },
  { icon: "/images/spmoi.webp", label: "Sản Phẩm Mới" },
  { icon: "/images/spduoctrogia.webp", label: "Được Trợ Giá" },
  { icon: "/images/phienchodocu.webp", label: "Phiên chợ Đồ cũ" },
  { icon: "/images/bansi.webp", label: "Bán Sỉ" },
  { icon: "/images/manga.webp", label: "Manga" },
];

const Banner: React.FC = () => {
  return (
    <div className="container pt-4 pb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="md:col-span-2">
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            autoplay={{ delay: 3000 }}
            loop={true}
            navigation
            pagination={{ clickable: true }}
            className="rounded-xl shadow-md overflow-hidden"
          >
            {banners.map((item, index) => (
              <SwiperSlide key={index}>
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={800}
                  height={360}
                  className="w-full h-auto object-cover"
                  priority
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="flex flex-col gap-4">
          {subBanners.map((banner, idx) => (
            <Image
              key={idx}
              src={banner.src}
              alt={banner.alt}
              className="rounded-xl shadow-md object-cover w-full h-auto"
              width={392}
              height={156}
            />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 text-center">
        {iconMenu.map((item, idx) => (
          <Link href={'/'} key={idx} className="flex flex-col items-center gap-2 text-decoration-none" 
          style={{fontFamily: "Lato", fontSize: "25px", fontWeight: "bolder"}}>
            <Image
              src={item.icon}
              alt={item.label}
              width={60}
              height={60}
              className="rounded-full shadow-sm transition-transform hover:scale-105"
              style={{ objectFit: "contain" }}
            />
            <div className="text-sm font-medium text-gray-700">{item.label}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Banner;
