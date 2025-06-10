"use client";
import { useRouter } from "next/navigation";
import { FaLayerGroup } from "react-icons/fa";

export default function AdminView() {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
            <h1 className="text-3xl font-bold mb-8 text-gray-800"
            style={{fontFamily: "Lato", fontSize: "30px", fontWeight: "bolder"}}> Admin Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
                <div
                    onClick={() => router.push('/admin/products/all-products')}
                    className="cursor-pointer p-6 bg-white rounded-xl shadow-md border hover:shadow-lg transition duration-300 flex flex-col items-center justify-center hover:bg-blue-50"
                >
                    <span className="text-xl font-semibold text-blue-700 "
                    style={{fontFamily: "Lato", fontWeight: "bolder", fontSize: "20px"}}>📦 Quản lý sản phẩm</span>
                </div>

                <div
                    onClick={() => router.push('/admin/products/add-product')}
                    className="cursor-pointer p-6 bg-white rounded-xl shadow-md border hover:shadow-lg transition duration-300 flex flex-col items-center justify-center hover:bg-green-50"
                >
                    <span className="text-xl font-semibold text-red-700"
                    style={{fontFamily: "Lato", fontWeight: "bolder", fontSize: "20px"}}
                    >➕ Thêm sản phẩm mới</span>
                </div>
            </div>
            <div className="grid grid-cols-7 md:grid-cols-2 gap-6 w-full max-w-3xl">
                 <div style={{display: "flex"}}
                    onClick={() => router.push('/admin/categories/all-categories')}
                    className="cursor-pointer p-6 bg-white rounded-xl shadow-md border hover:shadow-lg transition duration-300 flex flex-col items-center justify-center hover:bg-blue-50"
                >
                    <span className="text-xl font-semibold text-blue-700 "
                    style={{fontFamily: "Lato", fontWeight: "bolder", fontSize: "20px"}}><FaLayerGroup />Quản Lý danh mục</span>
                </div>
                 <div style={{display: "flex"}}
                    onClick={() => router.push('/admin/categories/add-categories')}
                    className="cursor-pointer p-6 bg-white rounded-xl shadow-md border hover:shadow-lg transition duration-300 flex flex-col items-center justify-center hover:bg-blue-50"
                >
                    <span className="text-xl font-semibold text-blue-700 "
                    style={{fontFamily: "Lato", fontWeight: "bolder", fontSize: "20px"}}><FaLayerGroup />Thêm Danh Mục</span>
                </div>
            </div>
        </div>
    );
}
