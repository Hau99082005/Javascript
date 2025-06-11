"use client";
import { BookOpen, BookPlus, Image, ImagePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { FaLayerGroup, FaBoxOpen, FaPlusCircle } from "react-icons/fa";

export default function AdminView() {
  const router = useRouter();

  const cards = [
    {
      label: "📦 Quản lý sản phẩm",
      icon: <FaBoxOpen size={24} className="text-blue-600" />,
      path: "/admin/products/all-products",
      bgHover: "hover:bg-blue-50",
      textColor: "text-blue-700",
    },
    {
      label: "➕ Thêm sản phẩm mới",
      icon: <FaPlusCircle size={24} className="text-red-600" />,
      path: "/admin/products/add-product",
      bgHover: "hover:bg-red-50",
      textColor: "text-red-700",
    },
    {
      label: "🗂️ Quản lý danh mục",
      icon: <FaLayerGroup size={24} className="text-indigo-600" />,
      path: "/admin/categories/all-categories",
      bgHover: "hover:bg-indigo-50",
      textColor: "text-indigo-700",
    },
    {
      label: "🆕 Thêm danh mục",
      icon: <FaPlusCircle size={24} className="text-red-600" />,
      path: "/admin/categories/add-categories",
      bgHover: "hover:bg-green-50",
      textColor: "text-red-700",
    },
    {
      label: "🖼️ Quản lý Banner",
      icon: <Image size={24} className="text-indigo-600" />,
      path: "/admin/banners/all-banners",
      bgHover: "hover:bg-indigo-50",
      textColor: "text-indigo-700",
    },
    {
      label: "🆕 Thêm Banner",
      icon: <ImagePlus size={24} className="text-red-600" />,
      path: "/admin/banners/add-banners",
      bgHover: "hover:bg-green-50",
      textColor: "text-red-700",
    },
    //books
    {
    label: "🖼️ Quản lý Sách",
    icon: <BookOpen size={24} className="text-indigo-600" />,
    path: "/admin/books/all-books",
    bgHover: "hover:bg-indigo-50",
    textColor: "text-indigo-700",
  },
  {
    label: "🆕 Thêm Sách",
    icon: <BookPlus size={24} className="text-red-600" />,
    path: "/admin/books/add-books",
    bgHover: "hover:bg-green-50",
    textColor: "text-red-700",
  },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <h1
        className="text-4xl font-extrabold mb-10 text-gray-800"
        style={{ fontFamily: "Lato", fontSize: "30px" , fontWeight: "bold"}}
      >
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl">
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={() => router.push(card.path)}
            className={`cursor-pointer p-6 bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition duration-300 flex flex-col items-center justify-center ${card.bgHover}`}
          >
            <div className="mb-3">{card.icon}</div>
            <span
              className={`text-lg font-semibold ${card.textColor}`}
              style={{ fontFamily: "Lato" }}
            >
              {card.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
