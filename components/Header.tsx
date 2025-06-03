"use client";
import { useState } from "react";
import Image from "next/image";
import { FaBars, FaBell, FaSearch, FaShoppingCart, FaTimes } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CategoryMenu from "@/components/categoryMenu";
import AuthButtons from "./auth-buttons";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-white text-gray-700 w-full shadow-md font-sans relative z-50">
      <div
        className="bg-red-600 text-white text-center py-2 text-sm font-bold tracking-wide"
        style={{ textTransform: "uppercase", fontFamily: "Lato", fontSize: "18px" }}
      >
        Thứ 4 ngày vàng - Freeship ngập tràn | Áp dụng cho đơn hàng từ 50k
      </div>
      <nav className="flex items-center justify-between px-4 lg:px-6 py-3 relative">
        <div className="flex items-center gap-3">
          <button
            className="lg:hidden text-xl text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
          <Image src="/images/fahasa-logo.webp" alt="Fahasa Logo" width={160} height={40} />
        </div>
        <div className="hidden lg:block">
          <CategoryMenu />
        </div>
        <div className="flex-1 mx-4 max-w-2xl">
          <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
            <Input
              type="text"
              placeholder="Đắc Nhân Tâm..."
              className="flex-1 px-4 py-2 text-sm outline-none"
            />
            <Button className="bg-red-600 text-white px-4 py-2 hover:bg-red-700 rounded-none rounded-r-full">
              <FaSearch />
            </Button>
          </div>
        </div>
        <div className="hidden lg:flex items-center gap-6">
          <div className="flex items-center gap-1 cursor-pointer hover:text-red-600">
            <FaBell className="text-xl" />
            <span className="text-xs bg-red-500 text-white rounded-full px-1">0</span>
            <span className="text-sm">Thông báo</span>
          </div>
          <div className="flex items-center gap-1 cursor-pointer hover:text-red-600">
            <FaShoppingCart className="text-xl" />
            <span className="text-xs bg-red-500 text-white rounded-full px-1">0</span>
            <span className="text-sm">Giỏ hàng</span>
          </div>
          <div className="flex items-center gap-1 hover:text-red-600">
            <AuthButtons />
          </div>
          <div className="flex items-center gap-1 cursor-pointer hover:text-red-600">
            <Image src="/images/vn.png" alt="VN" width={20} height={20} className="rounded-sm" />
            <IoIosArrowDown className="text-lg" />
          </div>
        </div>
      </nav>
      {menuOpen && (
        <div className="lg:hidden absolute top-[100%] left-0 w-full bg-white shadow-md p-4 z-50">
          <CategoryMenu />
          <div className="mt-4 flex flex-col gap-3 text-sm">
            <div className="flex items-center gap-2">
              <FaBell />
              <span>Thông báo</span>
            </div>
            <div className="flex items-center gap-2">
              <FaShoppingCart />
              <span>Giỏ hàng</span>
            </div>
            <div className="flex items-center gap-2">
              <AuthButtons />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
