"use client";

import { useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import { FaShoppingCart, FaStar, FaStarHalfAlt, FaTruck, FaExchangeAlt, FaGift } from "react-icons/fa";
import SuggestedBooks from "@/components/SuggestedBooks";

interface ProductProps {
  product: {
    productName: string;
    productImage: string;
    productPrice: number;
    productPriceOld?: number;
    productcode: string;
    quantity: number;
    actor: string;
    pages: number;
    description: string;
    category: string;
    subcategory: string;
  };
}


 const addCart = () => {
  toast.success("Thêm giỏ hàng thành công!");
 }


export default function ProductDetail({ product }: ProductProps) {
  const [quantity, setQuantity] = useState(1);
  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const addtoCart = () => {
    toast.success("Thêm vào giỏ hàng thành công!");
  }

  return (
    <div className="container py-5">
      <div className="row g-4">
        <div className="col-md-5">
          <div className="border rounded p-3 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Image
              src={
                product.productImage.startsWith("http")
                  ? product.productImage
                  : product.productImage.startsWith("/")
                  ? product.productImage
                  : "/" + product.productImage
              }
              alt={product.productName}
              width={400}
              height={500}
              className="img-fluid rounded-3 w-100 hover:scale-105 transition-transform duration-300"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300">
              <FaTruck className="text-blue-500 text-xl mx-auto mb-2" />
              <p className="text-sm font-medium">Giao hàng nhanh</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300">
              <FaExchangeAlt className="text-green-500 text-xl mx-auto mb-2" />
              <p className="text-sm font-medium">Đổi trả miễn phí</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300">
              <FaGift className="text-red-500 text-xl mx-auto mb-2" />
              <p className="text-sm font-medium">Ưu đãi hấp dẫn</p>
            </div>
          </div>
        </div>
        <div className="col-md-7">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">{product.productName}</h2>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center">
              <FaStar className="text-yellow-400" />
              <FaStar className="text-yellow-400" />
              <FaStar className="text-yellow-400" />
              <FaStar className="text-yellow-400" />
              <FaStarHalfAlt className="text-yellow-400" />
              <span className="ml-2 text-gray-600">(0 đánh giá)</span>
            </div>
            <span className="text-gray-400">|</span>
            <span className="text-gray-600">Mã Hàng: {product.productcode}</span>
          </div>

          <p className="mb-4 text-gray-600">
            <span className="font-semibold">Tác giả:</span> {product.actor} &nbsp;&nbsp; | &nbsp;&nbsp;
            <span className="font-semibold">Hình thức bìa:</span> Bìa Mềm
          </p>

          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-red-600">
                {product.productPrice.toLocaleString("de-DE")}đ
              </span>
              {product.productPriceOld && (
                <>
                  <span className="text-lg text-gray-500 line-through">
                    {product.productPriceOld.toLocaleString("de-DE")}đ
                  </span>
                  <span className="px-2 py-1 bg-red-100 text-red-600 rounded text-sm font-medium">
                    -
                    {Math.round(
                      (1 - product.productPrice / product.productPriceOld) * 100
                    )}
                    %
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Số lượng:</label>
            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-lg overflow-hidden">
                <button 
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                  onClick={decreaseQuantity}
                >
                  -
                </button>
                <Input
                  type="text"
                  className="w-16 text-center border-0 focus:ring-0"
                  value={quantity}
                  readOnly
                />
                <button 
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                  onClick={increaseQuantity}
                >
                  +
                </button>
              </div>
              <span className="text-sm text-gray-500">
                {product.quantity} sản phẩm có sẵn
              </span>
            </div>
          </div>

          <div className="flex gap-4 mb-8">
            <button 
              onClick={() => addCart()}
              className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
              style={{border: "none", borderRadius: "5px"}}
            >
              <FaShoppingCart />
              Thêm vào giỏ hàng
            </button>
            <button className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
            style={{border: "none", borderRadius: "5px"}}>
              Mua ngay
            </button>
          </div>

          {/* More Info */}
          <div className="border-t pt-6">
            <h5 className="text-xl font-bold mb-4">Thông tin chi tiết</h5>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Mã hàng:</span> {product.productcode}
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Nhà cung cấp:</span> Đinh Tị
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Tác giả:</span> {product.actor}
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Số trang:</span> {product.pages}
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Danh mục:</span> {product.category}
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Phân loại:</span> {product.subcategory}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h5 className="text-xl font-bold mb-4">Mô tả sản phẩm</h5>
            <div className="prose max-w-none">
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-8 border-t pt-6">
            <h5 className="text-xl font-bold mb-4">Đánh giá sản phẩm</h5>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center gap-6 mb-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-800">0/5</div>
                  <div className="flex text-yellow-400 mt-2">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStarHalfAlt />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '0%' }}></div>
                    </div>
                    <span className="text-sm text-gray-600">0%</span>
                  </div>
                </div>
              </div>
              <button className="w-full py-3 border-2 border-blue-500 text-blue-500 font-medium rounded-lg hover:bg-blue-50 transition-colors duration-200">
                Viết đánh giá
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Suggested Books */}
      <div className="mt-12">
        <h4 className="text-2xl font-bold mb-6">Sản phẩm liên quan</h4>
        <SuggestedBooks />
      </div>
    </div>
  );
} 