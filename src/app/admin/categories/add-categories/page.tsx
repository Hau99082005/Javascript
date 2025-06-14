"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FaPlusCircle } from "react-icons/fa";

export default function AdminAddNewCategories() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    image: "",
    desc: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push("/admin/categories/all-categories");
      }
    } catch (error) {
      console.error("Error adding categories:", error);
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-blue-700 flex items-center gap-2"
         style={{fontFamily: "Lato", fontSize:"25px", fontWeight: "bolder"}}>
          <FaPlusCircle className="text-blue-500" />
          Thêm Danh Mục Mới
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-semibold text-gray-700">id</label>
            <Input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              placeholder="id..."
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div></div>
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Tên Danh Mục</label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nhập tên danh mục..."
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Link Hình Ảnh</label>
            <Input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Nhập URL hình ảnh..."
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">Mô Tả</label>
            <Textarea
              name="desc"
              value={formData.desc}
              onChange={handleChange}
              placeholder="Nhập mô tả danh mục..."
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
              rows={4}
            />
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
              style={{fontFamily: "Lato", fontSize:"20px", fontWeight: "bolder", border: "none", borderRadius: "5px"}}
            >
              Thêm Danh Mục
            </button>
            <button
              type="button"
              onClick={() => router.push("/admin/categories/all-categories")}
              className="bg-gray-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-600 transition"
               style={{fontFamily: "Lato", fontSize:"20px", fontWeight: "bolder", border: "none", borderRadius: "5px"}}
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
