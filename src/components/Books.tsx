'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface BooksItem {
  name: string;
  image: string;
}

export default function Books() {
  const [books, setBooks] = useState<BooksItem[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("/api/books");
        const data = await res.json();
        setBooks(data);
      } catch (error) {
        console.error("Failed to fetch Books:", error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="rounded-xl overflow-hidden shadow bg-white mt-6">
      <div className="bg-pink-100 px-4 py-3 flex items-center gap-2">
        <div className="w-5 h-5 bg-red-500 rounded-sm"></div>
        <h2 className="text-lg font-bold uppercase" style={{fontSize: "20px", fontFamily: "Lato", fontWeight: "bolder"}}>Bộ sưu tập nổi bật</h2>
      </div>

      <Swiper
        modules={[Navigation]}
        spaceBetween={10}
        slidesPerView={4}
        navigation
        breakpoints={{
          640: { slidesPerView: 4 },
          768: { slidesPerView: 5 },
          1024: { slidesPerView: 6 },
          1280: { slidesPerView: 7 },
        }}
        className="p-4"
      >
        {books.map((item, index) => (
          <SwiperSlide key={index}>
            <Link href={'/'} style={{textDecoration: "none", color: "black", fontFamily: "Lato",
                fontSize: "20px"
            }} className="flex flex-col items-center font-semibold">
             <Image
              src={item.image.startsWith('/') ? item.image : '/' + item.image}
              alt={item.name}
              width={80}
              height={80}
              className="object-contain"
             />
              <p className="text-sm mt-2 text-center">{item.name}</p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
