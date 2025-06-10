"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { IoIosAddCircle } from "react-icons/io";
import { StringToBoolean } from "class-variance-authority/types";

interface Category {
  _id: string;
  name: string;
  image: string;
  desc: string;
}

export default function AdminAllCategory() {
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching Categories:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa danh mục này?')) {
      try {
        const response = await fetch(`/api/categories/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          fetchCategories()
        }
      } catch (error) {
        console.error('Error deleting Categories:', error);
      }
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/admin/categories/edit-category/${id}`);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold" style={{fontFamily: "Lato", fontSize: "30px", fontWeight: "bold"}}>Quản lý Danh Mục</h1>
        <button
        style={{display: "flex", fontSize: "20px", fontWeight: "bolder", fontFamily: "Lato",
          border: "none", borderRadius: "5px"
        }}
          onClick={() => router.push('/admin/categories/add-categories')}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          <IoIosAddCircle width={30} height={30}/>
          Thêm Danh Mục mới
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md">
          <thead>
            <tr className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-900 uppercase text-sm">
              <th className="px-6 py-3 text-left">Hình ảnh</th>
              <th className="px-6 py-3 text-left">Tên Danh Mục</th>
              <th className="px-6 py-3 text-left">desc</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((product) => (
              <tr key={product._id} className="border-t border-gray-200 hover:bg-blue-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="relative w-16 h-16">
                    {product.image ? (
                      <Image
                        src={
                          product.image.startsWith('http')
                            ? product.image
                            : product.image.startsWith('/')
                              ? product.image
                              : '/' + product.image
                        }
                        alt={product.image}
                        fill
                        className="object-cover rounded-full border border-blue-200 shadow-sm"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 flex items-center justify-center text-gray-500 rounded-full border border-blue-100">
                        No Image
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-800 max-w-xs truncate" title={product.name}>{product.name}</td>
                <td className="px-6 py-4 font-semibold text-gray-800 max-w-xs truncate">{product.desc}</td>
            
         
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(product._id)}
                      className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-1 rounded-lg shadow hover:scale-105 hover:from-blue-600 hover:to-blue-800 transition-all duration-150"
                      style={{border: "none", borderRadius: "5px", fontFamily: "Lato", fontSize: "18px", fontWeight: "bold"}}
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="bg-gradient-to-r from-red-500 to-red-700 text-white px-4 py-1 rounded-lg shadow hover:scale-105 hover:from-red-600 hover:to-red-800 transition-all duration-150"
                      style={{border: "none", borderRadius: "5px", fontFamily: "Lato", fontSize: "18px", fontWeight: "bold"}}
                    >
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}