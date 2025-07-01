"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";

const subBanners = [
  { src: "/images/ShopeeT6.webp", alt: "Sub 1" },
  { src: "/images/homecreditT6_392x156.webp", alt: "Sub 2" },
];

const Banner: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [categories, setCategories] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [banners, setBanners] = useState<any[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    const fetchBanners = async () => {
      try {
        const res = await fetch("/api/banners");
        const data = await res.json();
        setBanners(data);
      } catch (error) {
        console.error("Failed to fetch banners:", error);
      }
    };

    fetchCategories();
    fetchBanners();
  }, []);

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
                  src={item.image}
                  alt={item.desc || `Banner ${index + 1}`}
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
        {categories.map((item, idx) => (
          <Link
            href="/"
            key={idx}
            className="flex flex-col items-center gap-2 text-decoration-none"
            style={{ fontFamily: "Lato", fontSize: "25px", fontWeight: "bolder" }}
          >
            <Image
              src={item.image}
              alt={item.name}
              width={60}
              height={60}
              className="rounded-full shadow-sm transition-transform hover:scale-105"
              style={{ objectFit: "contain" }}
            />
            <div className="text-sm font-medium text-gray-700">{item.name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Banner;
