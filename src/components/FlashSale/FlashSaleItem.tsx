import React from "react";

interface FlashSaleItemProps {
  title: string;
  image: string;
  oldPrice: number;
  newPrice: number;
  sold: number;
  discount: number;
}

export const FlashSaleItem: React.FC<FlashSaleItemProps> = ({
  title,
  image,
  oldPrice,
  newPrice,
  sold,
  discount,
}) => {
  const soldPercent = Math.min((sold / 50) * 100, 100);

  return (
    <div className="bg-white rounded-lg shadow-md p-3 flex flex-col w-[180px] shrink-0 transition hover:shadow-lg">
      {/* Ảnh sản phẩm */}
      <div className="w-full aspect-[3/4] bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center">
        <img
          src={image}
          alt={title}
          className="object-contain w-full h-full transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Tên sản phẩm */}
      <h3 className="mt-2 text-sm font-medium line-clamp-2"
      style={{fontFamily: "Lato", fontSize: "20px"}}>{title}</h3>

      {/* Giá và giảm giá */}
      <div className="mt-1 text-red-600 font-bold text-base">
        {newPrice.toLocaleString('de-DE')} đ
        <span className="ml-2 bg-red-500 text-white text-xs px-1 py-0.5 rounded">
          -{discount}%
        </span>
      </div>

      {/* Giá cũ */}
      <div className="text-gray-400 line-through text-sm">
        {oldPrice.toLocaleString('de-DE')} đ
      </div>

      {/* Đã bán */}
      <div className="mt-2 text-xs text-gray-700">Đã bán {sold}</div>

      {/* Thanh phần trăm đã bán */}
      <div className="w-full h-2 bg-gray-200 rounded mt-1 overflow-hidden">
        <div
          className="bg-red-500 h-full transition-all duration-300"
          style={{ width: `${soldPercent}%` }}
        />
      </div>
    </div>
  );
};
