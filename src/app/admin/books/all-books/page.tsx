"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { IoIosAddCircle } from "react-icons/io";
import { ArrowBigLeft} from "lucide-react";

interface Books {
  _id: string;
  image: string;
  name: string;
}

export default function AdminAllBooks() {
  const [books, setBooks] = useState<Books[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch("/api/books");
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching Books:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa Books này?")) {
      try {
        const response = await fetch(`/api/books/${id}`, {
          method: "DELETE",
        });
        if (response.ok) fetchBooks();
      } catch (error) {
        console.error("Error deleting Books:", error);
      }
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/admin/books/edit-books/${id}`);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
<div className="flex gap-2">
         <button onClick={() => router.push('/admin')}
  className="p-2 rounded-full bg-gray-100 hover:bg-red-200 text-gray-700 shadow transition-all duration-200"
  aria-label="Go back"
  style={{border: "none", borderRadius: "5px"}}
    >
    <ArrowBigLeft className="w-6 h-6 hover:text-white " 
    style={{fontWeight: "bolder", fontSize: "25px", color: "red"}}/>
      </button>

        <h1 className="text-3xl font-bold text-gray-800" style={{ fontFamily: "Lato", fontSize: "25px", fontWeight: "bolder" }}>
          Quản lý Sách
        </h1>
</div>
        <button
          onClick={() => router.push("/admin/books/add-books")}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          style={{ fontFamily: "Lato", fontWeight: "bold", fontSize: "16px", border: "none", borderRadius: "5px" }}
        >
          <IoIosAddCircle size={24} />
          Thêm Sách mới
        </button>
      </div>

      <div className="overflow-x-auto shadow-md rounded-xl">
        <table className="min-w-full bg-white border border-gray-200 rounded-xl">
          <thead>
            <tr className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-900 uppercase text-sm">
              <th className="px-6 py-4 text-left">Hình ảnh</th>
              <th className="px-6 py-4 text-left">Tên</th>
              <th className="px-6 py-4 text-left">Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {books.map((banner) => (
              <tr
                key={banner._id}
                className="border-t border-gray-200 hover:bg-blue-50 transition"
              >
                <td className="px-6 py-4">
                  <div className="w-14 h-14 relative">
                    {banner.image ? (
                      <Image
                        src={
                          banner.image.startsWith("http")
                            ? banner.image
                            : banner.image.startsWith("/")
                            ? banner.image
                            : "/" + banner.image
                        }
                        alt={banner.name}
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
                <td className="px-6 py-4 text-gray-600">{banner.name}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(banner._id)}
                      className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-1.5 rounded-lg shadow hover:scale-105 transition"
                      style={{ fontFamily: "Lato", fontWeight: "bold", borderRadius: "5px" }}
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(banner._id)}
                      className="bg-gradient-to-r from-red-500 to-red-700 text-white px-4 py-1.5 rounded-lg shadow hover:scale-105 transition"
                      style={{ fontFamily: "Lato", fontWeight: "bold", border: "none", borderRadius: "5px" }}
                    >
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {books.length === 0 && (
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