'use client';

import { useState, Fragment, useContext, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {  useRouter } from "next/navigation";
import { Button, Dialog, Transition } from "@headlessui/react";
import { navOptions } from "@/utils";
import { FaBell, FaSearch, FaShoppingCart } from "react-icons/fa";
import AuthButtons from "../auth-buttons";
import { GlobalContext } from "@/context/page";
import { useCart } from "@/context/CartContext";


export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchBoxRef = useRef<HTMLDivElement>(null);
  const { showNavModal, setShowNavModal } = useContext(GlobalContext) || {};
  const router = useRouter();
  const { cartCount } = useCart();
    
 
  const toggleMenu = () => {
    if (setShowNavModal) setShowNavModal(!showNavModal);
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuggestions(false);
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };
  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (e.target.value.trim().length > 0) {
      const res = await fetch(`/api/products?search=${encodeURIComponent(e.target.value)}`);
      const data = await res.json();
      setSuggestions(data.slice(0, 8));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchBoxRef.current && !searchBoxRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full shadow-md font-semibold relative z-50">
      <div className="bg-red-600 text-white text-center py-2 text-sm font-semibold tracking-wide uppercase font-sans text-[18px]">
        Thứ 4 ngày vàng - Freeship ngập tràn | Áp dụng cho đơn hàng từ 50k
      </div>
      <nav className="bg-white border-b py-3">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4">
          <Link href="/">
            <Image src="/images/fahasa-logo.webp" alt="logo" width={180} height={50} />
          </Link>
          <div className="relative flex-1 mx-8" ref={searchBoxRef}>
            <form onSubmit={handleSearch} className="hidden lg:flex w-full">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                className="w-full border border-gray-300 px-4 py-2 rounded-l-full outline-none focus:border-red-500 transition-colors duration-200"
                value={searchQuery}
                onChange={handleInputChange}
                onFocus={() => { if (suggestions.length > 0) setShowSuggestions(true); }}
                autoComplete="off"
              />
              <Button
                type="submit"
                className="bg-red-600 px-4 py-2 rounded-r-full text-white hover:bg-red-700 transition-colors duration-200"
                style={{ border: "none", borderRadius: "5px" }}
              >
                <FaSearch width={30} height={30} />
              </Button>
            </form>
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute z-50 left-0 right-0 bg-white border border-gray-200 rounded-b-lg shadow-lg mt-1 max-h-96 overflow-y-auto">
                {suggestions.map((item) => (
                  <Link style={{textDecoration: "none", fontFamily: "Lato", fontSize: "20px"}}
                    key={item._id}
                    href={`/products/${encodeURIComponent(item.productcode)}`}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 transition-colors duration-150"
                    onClick={() => setShowSuggestions(false)}
                  >
                    <img
                      src={item.productImage}
                      alt={item.productName}
                      className="w-10 h-14 object-cover rounded"
                    />
                    <span className="text-gray-800 line-clamp-2">{item.productName}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div className="flex gap-2 items-center space-x-3">
            <AuthButtons />
            <Link
              href={'/cart'}
              style={{ textDecoration: "none" }}
              className="relative text-sm bg-transparent text-gray-600 border-b px-4 py-2 rounded-md uppercase hover:text-red-600 transition-colors duration-200"
            >
              <FaShoppingCart style={{ width: "20px", height: "20px", color: "gray" }} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link
              href={'/cart'}
              style={{ textDecoration: "none" }}
              className="text-sm bg-transparent text-gray-600 border-b px-4 py-2 rounded-md uppercase hover:text-red-600 transition-colors duration-200"
            >
              <FaBell style={{ width: "20px", height: "20px", color: "gray" }} />
            </Link>
            <button
              className="md:hidden p-2 text-gray-700 focus:outline-none"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 5h14M3 10h14M3 15h14" clipRule="evenodd" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>
      <div className="hidden md:flex justify-center bg-white border-t py-2">
        {navOptions.map((item) => (
          <button
            key={item.id}
            className="text-sm px-4 py-2 text-gray-700 hover:text-red-600 uppercase font-medium"
          >
            {item.label}
          </button>
        ))}
      </div>
      <Transition.Root show={showNavModal} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={toggleMenu}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <div className="fixed inset-0 flex justify-end">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="w-3/4 max-w-sm bg-white p-6">
                <div className="flex flex-col gap-4">
                  {navOptions.map((item) => (
                    <button
                      key={item.id}
                      onClick={toggleMenu}
                      className="text-left text-gray-800 hover:text-red-600 text-base font-medium"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </header>
  );
}
