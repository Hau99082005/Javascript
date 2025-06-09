import React from "react";

interface BrandHighlightItemProps {
  productImage: string;
  productName: string;
  productPriceOld: number;
  productPrice: number;
  sold?: string;
  tag?: string;
}

export const BrandHighlightItem: React.FC<BrandHighlightItemProps> = ({
  productImage,
  productName,
  productPriceOld,
  productPrice,
  sold,
  tag,
}) => {
  const discount =
    productPriceOld && productPriceOld > 0
      ? Math.round(((productPriceOld - productPrice) / productPriceOld) * 100)
      : 0;

  return (
    <div className="bg-white p-3 rounded-2xl shadow hover:shadow-xl transition-all duration-300 w-[210px] shrink-0 border hover:-translate-y-1">
      <div className="relative w-full h-44 flex items-center justify-center bg-gray-50 rounded-xl overflow-hidden">
        <img
          src={productImage}
          alt={productName}
          className="object-contain max-h-full"
        />
        {tag && (
          <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full shadow">
            {tag}
          </span>
        )}
        {discount > 0 && (
          <span className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full shadow">
            -{discount}%
          </span>
        )}
      </div>

      <h3
        className="mt-3 text-sm leading-5 line-clamp-2 h-10 font-semibold"
        style={{ fontFamily: "Lato" , fontSize: "18px" }}
      >
        {productName}
      </h3>

      <div className="flex items-center gap-2 mt-2">
        <span className="text-red-600 font-bold text-base" style={{fontFamily: "Lato", fontSize: "20px"}}>
          {productPrice.toLocaleString("de-DE")} đ
        </span>
      </div>

      <div className="text-gray-400 text-sm line-through" style={{fontFamily: "Lato", fontSize: "18px"}}>
        {productPriceOld.toLocaleString("de-DE")} đ
      </div>

      {sold && (
        <div className="text-xs text-gray-600 mt-1">Đã bán {sold}</div>
      )}
    </div>
  );
};
