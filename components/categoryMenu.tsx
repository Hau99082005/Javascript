"use client";

import { useState } from "react";
import { BiCategoryAlt } from "react-icons/bi";

const categories = [
  {
    name: "Hành Trang Đến Trường",
    columns: {
      "Sách Giáo Khoa": ["Lớp 1", "Lớp 2", "Lớp 3", "Lớp 4", "Lớp 5", "Lớp 6", "Lớp 7", "Lớp 8", "Lớp 9", "Lớp 10", "Lớp 11", "Lớp 12"],
      "Sách Tham Khảo": ["Mẫu Giáo", "Lớp 1", "Lớp 2", "Lớp 3", "Lớp 4", "Lớp 5", "Lớp 6", "Lớp 7", "Lớp 8", "Lớp 9", "Lớp 10", "Lớp 11"],
      "Luyện Thi THPTQG - Lớp 12": [
        "Toán", "Ngữ Văn", "Tiếng Anh", "Vật Lý", "Hóa Học", "Sinh Học", "Địa Lý", "Lịch Sử"
      ],
      "Đồ Nghề Đến Trường": ["Cặp, Ba Lô", "Máy Tính", "Bút Các Loại", "Tập Vở", "Compa", "Mực", "Phấn", "Gôm - Tẩy"]
    }
  },
];

export default function CategoryMenu() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-md cursor-pointer text-sm font-semibold">
        <BiCategoryAlt className="text-gray-500" />
      </div>

      {hovered && (
        <div className="absolute left-full top-0 z-50 w-[800px] bg-white shadow-lg p-6 rounded-md flex gap-8">
          {categories.map((cat, index) => (
            <div key={index} className="w-full">
              <h4 className="font-bold text-red-500 mb-2">{cat.name}</h4>
              <div className="grid grid-cols-4 gap-6 text-sm text-gray-700">
                {Object.entries(cat.columns).map(([title, items], colIndex) => (
                  <div key={colIndex}>
                    <h5 className="font-semibold text-black mb-1">{title}</h5>
                    <ul className="space-y-1">
                      {items.map((item, i) => (
                        <li key={i} className="hover:text-red-600 cursor-pointer">
                          {item}
                        </li>
                      ))}
                      <li className="text-blue-600 hover:underline cursor-pointer mt-1">Xem tất cả</li>
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
