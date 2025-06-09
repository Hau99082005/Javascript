'use client';

import { useState, Fragment, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button, Dialog, Transition } from "@headlessui/react";
import { navOptions } from "@/utils";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import AuthButtons from "../auth-buttons";
import { GlobalContext } from "@/context/page";


export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { showNavModal, setShowNavModal } = useContext(GlobalContext);

  const toggleMenu = () => {
    setShowNavModal(!showNavModal);
    setIsMenuOpen(!isMenuOpen);
  };

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
          <div className="hidden lg:flex flex-1 mx-8">
            <input
              type="text"
              placeholder="Bút chấm đọc - Học tiếng Anh"
              className="w-full border border-gray-300 px-4 py-2 rounded-l-full outline-none"
            />
            <Button className="bg-red-600 px-4 py-2 rounded-r-full text-white" style={{ border: "none", borderRadius: "5px" }}>
              <FaSearch width={30} height={30} />
            </Button>
          </div>
          <div className="flex gap-2 items-center space-x-3">
            <AuthButtons />
            <Link
              href={'/cart'}
              style={{ textDecoration: "none" }}
              className="text-sm bg-transparent text-gray-600 border-b px-4 py-2 rounded-md uppercase"
            >
              <FaShoppingCart style={{ width: "20px", height: "20px", color: "gray" }} />
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
