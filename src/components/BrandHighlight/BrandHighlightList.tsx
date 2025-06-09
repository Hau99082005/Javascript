import React, { useEffect, useState } from "react";
import { BrandHighlightItem } from "./BrandHighlightItem";
import { FaArrowAltCircleRight } from "react-icons/fa";

interface Product {
  _id: string;
  productImage: string;
  productName: string;
  productPriceOld: number;
  productPrice: number;
  sold?: string;
  tag?: string;
}

export const BrandHighlightList = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchPopularProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchPopularProducts();
  }, []);

  return (
    <div className="p-5 bg-white rounded-2xl shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2
          className="text-xl font-bold text-gray-800"
          style={{ fontFamily: "Lato" }}
        >
          🔥 Thương hiệu nổi bật
        </h2>
        <div className="flex gap-2">
          <button
            className="text-sm text-red-600 hover:underline flex items-center gap-1"
            style={{ fontFamily: "Lato", fontWeight: "bold" }}
          >
            Xem Thêm <FaArrowAltCircleRight />
          </button>
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto scrollbar-hide">
        {products.map((product) => (
          <BrandHighlightItem key={product._id} {...product} />
        ))}
      </div>
    </div>
  );
};
