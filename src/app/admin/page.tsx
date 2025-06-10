"use client";
import { useRouter } from "next/navigation"

export default function AdminView() {
    const route = useRouter();
    return(
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <button
                    onClick={() => route.push('/admin/all-products')}
                    className="p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Quản lý sản phẩm
                </button>
                <button
                    onClick={() => route.push('/admin/add-product')}
                    className="p-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                    Thêm sản phẩm mới
                </button>
            </div>
        </div>
    )
}