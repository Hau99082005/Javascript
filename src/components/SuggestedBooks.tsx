'use client';

import React, { useEffect, useState } from 'react';


const SuggestedBooks: React.FC = () => {
    const [suggestedbook, setsuggestedbooks] = useState<any[]>([]);
     useEffect(() => {
        const fetchSuggestedbook = async () => {
          try {
            const res = await fetch("/api/products");
            const data = await res.json();
            setsuggestedbooks(data);
          } catch (error) {
            console.error("Failed to fetch suggestedbooks:", error);
          }
        };
    
        fetchSuggestedbook();
      }, []);
  return (
    <section className="py-6 px-4">
      <div className="bg-gradient-to-r from-green-300 to-green-500 p-4 rounded-t-lg">
        <h2 className="text-xl font-bold text-white flex items-center gap-2 text-center justify-center"
        style={{fontFamily: "Lato", fontSize: "30", fontWeight: "bolder"}}>
          ✨ Gợi ý cho bạn ✨
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 bg-white p-4 rounded-b-lg shadow">
        {suggestedbook.map((book) => {
          const discount =
            book.productPriceOld > 0
              ? Math.round(
                  ((book.productPriceOld - book.productPrice) /
                    book.productPriceOld) *
                    100
                )
              : 0;
          return (
            <div
              key={book._id}
              className="bg-white border rounded hover:shadow-md transition"
            >
              <img
                src={book.productImage}
                alt={book.productName}
                className="w-full h-48 object-contain p-2"
              />
              <div className="p-2 text-sm">
                <h3 className="font-medium line-clamp-2 h-10" style={{fontFamily: "Lato", fontSize: "16px", fontWeight: "bolder"}}>
                  {book.productName} 
                </h3>
                <div className="mt-1 text-red-600 font-bold">
                  {book.productPrice.toLocaleString('vi-VN')} đ
                  {discount > 0 && (
                    <span className="bg-red-500 text-white text-xs px-1 py-0.5 ml-2 rounded">
                      -{discount}%
                    </span>
                  )}
                </div>
                <div className="text-gray-500 line-through text-xs">
                  {book.productPriceOld > 0
                    ? `${book.productPriceOld.toLocaleString('vi-VN')} đ`
                    : ''}
                </div>
                <p className="text-gray-500 text-xs mt-1">Đã bán 12</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SuggestedBooks;
