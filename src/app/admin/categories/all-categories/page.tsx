"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { IoIosAddCircle } from "react-icons/io";
import { ArrowBigLeft } from "lucide-react";

interface Category {
  _id: string;
  id: String;
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
        if (response.ok) fetchCategories();
      } catch (error) {
        console.error('Error deleting Categories:', error);
      }
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/admin/categories/edit-category/${id}`);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
       <div className="flex gap-2">
            <button onClick={() => router.push('/admin')}
  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 shadow transition-all duration-200"
  aria-label="Go back"
>
  <ArrowBigLeft className="w-6 h-6" />
</button>



          <h1 className="text-3xl font-bold text-gray-800" style={{ fontFamily: "Lato", fontSize: "25px", fontWeight: "bolder"
         }}>
          Quản lý Danh Mục
        </h1>
       </div>
        <button
          onClick={() => router.push('/admin/categories/add-categories')}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          style={{ fontFamily: "Lato", fontWeight: "bold", fontSize: "16px", border: "none", borderRadius: "5px" }}
        >
          <IoIosAddCircle size={24} />
          Thêm Danh Mục mới
        </button>
      </div>

      <div className="overflow-x-auto shadow-md rounded-xl">
        <table className="min-w-full bg-white border border-gray-200 rounded-xl">
          <thead>
            <tr className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-900 uppercase text-sm">
              <th className="px-6 py-4 text-left">id</th>
              <th className="px-6 py-4 text-left">Hình ảnh</th>
              <th className="px-6 py-4 text-left">Tên Danh Mục</th>
              <th className="px-6 py-4 text-left">Mô Tả</th>
              <th className="px-6 py-4 text-left">Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr
                key={category._id}
                className="border-t border-gray-200 hover:bg-blue-50 transition"
              >
                <td className="px-6 py-4 font-medium text-gray-800">{category.id}</td>
                <td className="px-6 py-4">
                  <div className="w-14 h-14 relative">
                    {category.image ? (
                      <Image
                        src={
                          category.image.startsWith("http")
                            ? category.image
                            : category.image.startsWith("/")
                            ? category.image
                            : "/" + category.image
                        }
                        alt={category.name}
                        fill
                        className="object-cover rounded-full border shadow-sm"
                      />
                    ) : (
                      <div className="w-14 h-14 bg-gray-200 flex items-center justify-center rounded-full text-sm text-gray-500">
                        No Image
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-gray-800">{category.name}</td>
                <td className="px-6 py-4 text-gray-600">{category.desc}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(category._id)}
                      className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-1.5 rounded-lg shadow hover:scale-105 transition"
                      style={{ fontFamily: "Lato", fontWeight: "bold", borderRadius: "5px" }}
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(category._id)}
                      className="bg-gradient-to-r from-red-500 to-red-700 text-white px-4 py-1.5 rounded-lg shadow hover:scale-105 transition"
                      style={{ fontFamily: "Lato", fontWeight: "bold", border: "none", borderRadius: "5px" }}
                    >
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-8 text-gray-500 font-semibold">
                  Không có danh mục nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
