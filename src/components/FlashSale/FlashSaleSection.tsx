// components/FlashSale/FlashSaleSection.tsx
"use client";

import React, { useEffect, useState } from "react";
import { FlashSaleItem } from "./FlashSaleItem";
import { FlashSaleHeader } from "./FlashSaleHeader";

export interface Book {
  _id: string;
  productName: string;
  productImage: string;
  productPrice: number;
  productPriceOld: number;
  actor: string;
  description: string;
}

export const FlashSaleSection: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setBooks(data);
      } catch (err) {
        console.error("Failed to fetch books:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <p className="text-center py-4">Đang tải sản phẩm...</p>;

  return (
    <section className="bg-red-400 p-4 rounded-xl">
      <FlashSaleHeader />
      <div className="flex gap-4 overflow-x-auto">
        {books.map((book) => {
          const discount = Math.round(
            ((book.productPriceOld - book.productPrice) / book.productPriceOld) * 100
          );

          return (
            <FlashSaleItem
              key={book._id}
              title={book.productName}
              image={book.productImage}
              oldPrice={book.productPriceOld}
              newPrice={book.productPrice}
              sold={Math.floor(Math.random() * 50)} // fake sold number
              discount={discount}
            />
          );
        })}
      </div>
    </section>
  );
};
